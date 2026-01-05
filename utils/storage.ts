const DB_NAME = 'SaudeSoundDB';
const DB_VERSION = 3; // Increment version to force upgrade/check
const STORE_NAME = 'MusicFiles';

export const DB_UPDATE_EVENT = 'saudesound_db_update';

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  blob: Blob; // The actual file data
}

// Export dispatchUpdate so components can control when to notify the app
export const dispatchUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(DB_UPDATE_EVENT));
  }
};

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
        console.error("IndexedDB error:", (event.target as any).error);
        reject('Erro ao abrir banco de dados');
    };

    request.onblocked = () => {
        console.warn("IndexedDB blocked. Close other tabs.");
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const saveFileToDB = async (file: File): Promise<StoredFile> => {
    if (!file) {
        return Promise.reject(new Error("Arquivo inválido."));
    }

    // Increased timeout to 20s for safety
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Tempo limite de salvamento excedido (20s).')), 20000);
    });

    const operation = (async () => {
        const db = await openDB();
        const id = Math.random().toString(36).substr(2, 9);
        
        const storedFile: StoredFile = {
            id,
            name: file.name,
            type: file.name.toLowerCase().endsWith('.wav') ? 'WAV' : 'MP3',
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            date: new Date().toLocaleDateString('pt-BR'),
            blob: file
        };

        return new Promise<StoredFile>((resolve, reject) => {
            try {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.add(storedFile);

                transaction.oncomplete = () => {
                    // Removed automatic dispatchUpdate() to allow batch processing control
                    db.close();
                    resolve(storedFile);
                };

                transaction.onerror = (event) => {
                    console.error("Transaction error:", (event.target as any).error);
                    db.close();
                    reject('Erro na transação ao salvar arquivo.');
                };
                
                request.onerror = (e) => {
                    console.error("Error adding to store:", (e.target as any).error);
                    db.close();
                    reject((e.target as any).error);
                };
            } catch (e) {
                db.close();
                reject(e);
            }
        });
    })();

    return Promise.race([operation, timeout]);
};

export const getFilesFromDB = async (): Promise<StoredFile[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    try {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
            db.close();
        };
        request.onerror = () => {
            reject('Erro ao buscar arquivos');
            db.close();
        };
    } catch (e) {
        db.close();
        reject(e);
    }
  });
};

export const deleteFileFromDB = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    try {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        transaction.oncomplete = () => {
            // Removed automatic dispatchUpdate()
            resolve();
            db.close();
        };
        
        transaction.onerror = () => {
            reject('Erro ao deletar arquivo');
            db.close();
        };
    } catch (e) {
        db.close();
        reject(e);
    }
  });
};