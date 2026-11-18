import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { TrainingAndTransformationSection } from './components/TrainingAndTransformationSection';
import { MembershipPlansSection } from './components/MembershipPlansSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsAndHoursSection } from './components/ReviewsAndHoursSection';
import { EnquiryAndContactSection } from './components/EnquiryAndContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [selectedPlanNote, setSelectedPlanNote] = useState<string | undefined>(undefined);

  const handleLoaderComplete = useCallback(() => {}, []);

  const scrollToEnquiry = () => {
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('enquiry-full-name');
      if (nameInput instanceof HTMLInputElement) {
        window.setTimeout(() => nameInput.focus({ preventScroll: true }), 450);
      }
    }
  };

  const scrollToPrograms = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProgram = (programName: string) => {
    setSelectedProgram(programName);
    scrollToEnquiry();
  };

  const handleEnquirePlan = (planName: string) => {
    setSelectedPlanNote(`Interested in the ${planName} membership plan details.`);
    scrollToEnquiry();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#08090B] text-white">
        <LoadingScreen onComplete={handleLoaderComplete} />
        <Navbar onJoinClick={scrollToEnquiry} />

        <main>
          <HeroSection
            onJoinClick={scrollToEnquiry}
            onExploreProgramsClick={scrollToPrograms}
          />
          <TrustBar />
          <AboutSection />
          <ProgramsSection onSelectProgram={handleSelectProgram} />
          <WhyChooseSection />
          <FacilitiesSection />
          <TrainingAndTransformationSection onJoinClick={scrollToEnquiry} />
          <MembershipPlansSection onEnquirePlan={handleEnquirePlan} />
          <GallerySection />
          <ReviewsAndHoursSection />
          <EnquiryAndContactSection
            preselectedProgram={selectedProgram}
            preselectedPlanNote={selectedPlanNote}
          />
        </main>

        <Footer />
        <FloatingActions onJoinClick={scrollToEnquiry} />
      </div>
    </MotionConfig>
  );
}
