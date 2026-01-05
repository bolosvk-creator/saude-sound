import React, { useState } from 'react';
import { useTimer } from './hooks/useTimer';
import UrgencyBar from './components/UrgencyBar';
import Header from './components/Header';
import Hero from './components/Hero';
import ComparisonSection from './components/ComparisonSection';
import StorySection from './components/StorySection';
import DemoSection from './components/DemoSection';
import PlatformExplainer from './components/PlatformExplainer';
import SubjectsGrid from './components/SubjectsGrid';
import TargetAudienceSection from './components/TargetAudienceSection';
import RequestSection from './components/RequestSection';
import Testimonials from './components/Testimonials';
import OfferSection from './components/OfferSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminUploadModal from './components/AdminUploadModal';

function App() {
  const timer = useTimer(4);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="pt-10">
      <UrgencyBar timer={timer} />
      <Header />
      <Hero />
      <ComparisonSection />
      <StorySection />
      <DemoSection />
      <PlatformExplainer />
      <SubjectsGrid />
      <TargetAudienceSection />
      <RequestSection />
      <Testimonials />
      <OfferSection timer={timer} />
      <FAQ />
      <Footer onSecretTrigger={() => setIsAdminOpen(true)} />
      
      <AdminUploadModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}

export default App;