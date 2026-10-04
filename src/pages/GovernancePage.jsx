import React from 'react';
import ThreePanelsHub from '../components/ThreePanelsHub';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function GovernancePage({
  recruitmentDrives,
  setRecruitmentDrives,
  placements,
  setPlacements,
  jobSeekers,
  setJobSeekers,
  companies,
  setCompanies,
  currentUser,
  setCurrentUser,
  showToast,
  onViewProject
}) {
  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '50px' }}>
      <ThreePanelsHub 
        recruitmentDrives={recruitmentDrives}
        setRecruitmentDrives={setRecruitmentDrives}
        placements={placements}
        setPlacements={setPlacements}
        jobSeekers={jobSeekers}
        setJobSeekers={setJobSeekers}
        companies={companies}
        setCompanies={setCompanies}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showToast={showToast}
        onViewProject={onViewProject}
      />
    </div>
  );
}
