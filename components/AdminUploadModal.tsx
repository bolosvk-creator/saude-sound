import React, { useState, useRef, useEffect } from 'react';
import { saveFileToDB, getFilesFromDB, deleteFileFromDB, StoredFile, dispatchUpdate } from '../utils/storage';

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Wrapper for the file being uploaded in the UI
interface PendingFile {
  id: string;
  fileObj: File; // The raw file object
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

const AdminUploadModal: React.FC<AdminUploadModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Files waiting to be uploaded or currently uploading
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  
  // Files actually saved in the "database"
  const [dbFiles, setDbFiles] = useState<StoredFile[]>([]);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingGlobal, setIsUploadingGlobal] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load files from DB when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadDbFiles();
    }
  }, [isAuthenticated]);

  const loadDbFiles = async () => {
    try {
      const files = await getFilesFromDB();
      setDbFiles(files);
    } catch (error) {
      console.error("Erro ao carregar banco de dados", error);
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPasswordInput('');
      setLoginError('');
      setPendingFiles([]);
      setIsUploadingGlobal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Anps3343') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Senha incorreta. Acesso negado.');
      setPasswordInput('');
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  // File Processing
  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: PendingFile[] = Array.from(fileList)
      .filter(file => {
        const name = file.name.toLowerCase();
        return name.endsWith('.mp3') || name.endsWith('.wav');
      })
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        fileObj: file,
        progress: 0,
        status: 'pending'
      }));

    setPendingFiles(prev => [...prev, ...newFiles]);

    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const updateFileStatus = (id: string, status: PendingFile['status'], progress?: number) => {
      setPendingFiles(prev => prev.map(f => {
          if (f.id === id) {
              return { 
                  ...f, 
                  status, 
                  progress: progress !== undefined ? progress : f.progress 
              };
          }
          return f;
      }));
  };

  // The "Salvar no Servidor" Action
  const handleUploadToDatabase = async () => {
    if (pendingFiles.length === 0) return;
    
    setIsUploadingGlobal(true);

    // Get current list of pending files
    const filesToUpload = pendingFiles.filter(f => f.status === 'pending' || f.status === 'error');

    for (const pFile of filesToUpload) {
        // Mark as uploading
        updateFileStatus(pFile.id, 'uploading', 50);

        try {
            // Actual save operation (with timeout protection in utils)
            const storedFile = await saveFileToDB(pFile.fileObj);
            
            // Success
            updateFileStatus(pFile.id, 'completed', 100);
            
            // Optimistic Update: Add to local list immediately without fetching full DB
            setDbFiles(prev => [...prev, storedFile]);
            
        } catch (error) {
            console.error("Upload failed for file:", pFile.fileObj.name, error);
            updateFileStatus(pFile.id, 'error', 0);
        }
    }

    setIsUploadingGlobal(false);
    
    // Notify the rest of the app (DemoSection) only once after all files are processed
    dispatchUpdate();

    // Optional: Auto clear completed after a delay
    setTimeout(() => {
        setPendingFiles(prev => prev.filter(f => f.status !== 'completed'));
    }, 2000);
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Tem certeza que deseja excluir este arquivo do servidor?')) {
        try {
            await deleteFileFromDB(id);
            // Manually remove from local state to be snappy
            setDbFiles(prev => prev.filter(f => f.id !== id));
            // Notify app
            dispatchUpdate();
        } catch (e) {
            console.error("Erro ao deletar", e);
            alert("Erro ao excluir arquivo.");
        }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={isUploadingGlobal ? undefined : onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative z-10 animate-fade-in-up flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <i className={`ph-fill ${isAuthenticated ? 'ph-database text-green-400' : 'ph-lock-key text-red-400'}`}></i>
            <h3 className="font-bold text-lg">Servidor de Arquivos (Database)</h3>
          </div>
          <button 
            onClick={onClose}
            disabled={isUploadingGlobal}
            className="text-gray-400 hover:text-white transition disabled:opacity-50"
          >
            <i className="ph-bold ph-x text-xl"></i>
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-0 flex-1 custom-scrollbar">
            {!isAuthenticated ? (
                // Login Screen
                <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                        <i className="ph-fill ph-shield-check text-4xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Acesso Restrito</h3>
                    <p className="text-gray-500 text-center mb-8 max-w-xs">Gerenciamento do Banco de Dados. Identifique-se.</p>
                    
                    <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                        <input 
                            type="password" 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Senha Master"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center tracking-widest focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                            autoFocus
                        />
                        {loginError && (
                            <p className="text-red-500 text-xs text-center font-bold flex items-center justify-center gap-1">
                                <i className="ph-bold ph-warning-circle"></i> {loginError}
                            </p>
                        )}
                        <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-lg shadow-lg">
                            Entrar
                        </button>
                    </form>
                </div>
            ) : (
                // Authenticated View
                <div className="p-6 space-y-8">
                    
                    {/* Upload Area */}
                    <section>
                        <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <i className="ph-bold ph-cloud-arrow-up text-brand"></i> Nova Upload
                        </h4>
                        <div 
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                            isDragging ? 'border-brand bg-brand-light/10' : 'border-gray-300 hover:border-brand hover:bg-gray-50'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !isUploadingGlobal && fileInputRef.current?.click()}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept=".mp3,.wav" 
                                multiple 
                                onChange={(e) => processFiles(e.target.files)}
                            />
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-brand">
                                <i className="ph-fill ph-upload-simple text-2xl"></i>
                            </div>
                            <p className="text-sm font-medium text-gray-600">Arraste arquivos ou clique para selecionar</p>
                        </div>

                        {/* Pending Files List */}
                        {pendingFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {pendingFiles.map((file) => (
                                    <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${file.status === 'error' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                                            {file.status === 'error' ? <i className="ph-bold ph-warning"></i> : file.fileObj.name.split('.').pop()?.toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-sm font-medium text-gray-700 truncate">{file.fileObj.name}</p>
                                                {file.status === 'error' && <span className="text-xs text-red-500 font-bold">Erro</span>}
                                                {file.status === 'uploading' && <span className="text-xs text-brand font-bold animate-pulse">Salvando...</span>}
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1">
                                                <div 
                                                    className={`h-1 rounded-full transition-all duration-300 ${file.status === 'error' ? 'bg-red-500' : 'bg-brand'}`} 
                                                    style={{ width: `${file.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-bold ${file.status === 'error' ? 'text-red-500' : 'text-brand'}`}>{file.progress}%</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="h-px bg-gray-200"></div>

                    {/* Database Files List */}
                    <section>
                        <div className="flex justify-between items-end mb-4">
                            <h4 className="font-bold text-gray-700 flex items-center gap-2">
                                <i className="ph-fill ph-hard-drives text-gray-500"></i> Arquivos no Servidor
                            </h4>
                            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {dbFiles.length} arquivos
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden min-h-[150px]">
                            {dbFiles.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                    <i className="ph-duotone ph-ghost text-3xl mb-2"></i>
                                    <p className="text-sm">Nenhum arquivo no banco de dados.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100 text-gray-500 font-semibold border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3">Nome</th>
                                            <th className="px-4 py-3 w-24">Data</th>
                                            <th className="px-4 py-3 w-24">Tamanho</th>
                                            <th className="px-4 py-3 w-16 text-center">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {dbFiles.map((file) => (
                                            <tr key={file.id} className="hover:bg-white transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-700 flex items-center gap-2">
                                                    <i className="ph-fill ph-music-note text-brand-dark"></i>
                                                    <span className="truncate max-w-[200px] md:max-w-xs" title={file.name}>{file.name}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">{file.date}</td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">{file.size}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button 
                                                        onClick={() => handleDelete(file.id)}
                                                        className="text-gray-400 hover:text-red-500 transition p-1"
                                                        title="Excluir do Banco de Dados"
                                                    >
                                                        <i className="ph-fill ph-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>

        {/* Footer Actions (Only visible when authenticated) */}
        {isAuthenticated && (
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200 shrink-0">
                <button 
                    onClick={() => setIsAuthenticated(false)} 
                    className="text-xs font-bold text-gray-500 hover:text-gray-800"
                >
                    Fazer Logout
                </button>
                <div className="flex gap-3">
                    <button 
                        onClick={onClose}
                        disabled={isUploadingGlobal}
                        className="px-4 py-2 text-gray-600 font-bold text-sm hover:text-gray-800 disabled:opacity-50"
                    >
                        Fechar
                    </button>
                    <button 
                        onClick={handleUploadToDatabase}
                        disabled={pendingFiles.filter(f => f.status === 'pending').length === 0 || isUploadingGlobal}
                        className={`px-6 py-2 rounded-lg font-bold text-sm shadow-lg transition flex items-center gap-2 ${
                            pendingFiles.filter(f => f.status === 'pending').length === 0 || isUploadingGlobal
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-brand hover:bg-brand-dark text-white transform hover:-translate-y-0.5'
                        }`}
                    >
                        {isUploadingGlobal ? (
                            <><i className="ph-bold ph-spinner animate-spin"></i> Salvando...</>
                        ) : (
                            <><i className="ph-bold ph-floppy-disk"></i> Salvar no Servidor</>
                        )}
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminUploadModal;