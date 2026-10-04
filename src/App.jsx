import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShowcasePage from './pages/ShowcasePage';
import DomainsPage from './pages/DomainsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import PlacementPage from './pages/PlacementPage';
import GovernancePage from './pages/GovernancePage';
import SubmitPage from './pages/SubmitPage';
import ProfilePage from './pages/ProfilePage';

// Overlays & Modals
import ProjectModal from './components/ProjectModal';
import SubmitModal from './components/SubmitModal';
import LeaderboardModal from './components/LeaderboardModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import Loading from './components/Loading';
import AIBot from './components/AIBot';

// Data
import { INITIAL_PROJECTS } from './data/initialProjects';
import { DOMAINS } from './data/domains';
import { REGISTERED_STUDENTS, DEFAULT_USER } from './data/users';
import { 
  INITIAL_RECRUITMENT_DRIVES, 
  INITIAL_PLACEMENTS, 
  INITIAL_JOB_SEEKERS, 
  INITIAL_COMPANIES 
} from './data/portalData';

// Icons & Master CSS
import { Sparkles } from 'lucide-react';
import './styles/main.css';

const LOCAL_STORAGE_KEY = 'abit_tech_warriors_projects_v4';
const USER_STORAGE_KEY = 'abit_tech_warriors_user_v4';
const RECRUITMENT_STORAGE_KEY = 'abit_recruitment_drives_v4';
const PLACEMENTS_STORAGE_KEY = 'abit_placements_v4';
const JOBSEEKERS_STORAGE_KEY = 'abit_job_seekers_v4';
const COMPANIES_STORAGE_KEY = 'abit_companies_v4';

export default function App() {
  // Initial portal boot loading state
  const [isLoading, setIsLoading] = useState(true);

  // Navigation: 'home' | 'domains' | 'leaderboard' | 'placement' | 'submit' | 'profile'
  const [activePage, setActivePage] = useState('home');

  // Load projects from localStorage or default sample projects
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored projects:', e);
    }
    return INITIAL_PROJECTS;
  });

  // Current logged in user (Default to null - no auto-logged-in demo user)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Clear any old Subhashree demo user saved in localStorage
        if (parsed?.name?.toLowerCase().includes('subhashree')) {
          localStorage.removeItem(USER_STORAGE_KEY);
          return null;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved user:', e);
    }
    return null;
  });

  // Active student whose profile is being viewed (Default to Suryakanta Senapati)
  const [activeProfileUser, setActiveProfileUser] = useState(currentUser || DEFAULT_USER);

  // Three Panels Data Stores (Admin / Recruiter / Student)
  const [recruitmentDrives, setRecruitmentDrives] = useState(() => {
    try {
      const stored = localStorage.getItem(RECRUITMENT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored recruitment drives:', e);
    }
    return INITIAL_RECRUITMENT_DRIVES;
  });

  const [placements, setPlacements] = useState(() => {
    try {
      const stored = localStorage.getItem(PLACEMENTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored placements:', e);
    }
    return INITIAL_PLACEMENTS;
  });

  const [jobSeekers, setJobSeekers] = useState(() => {
    try {
      const stored = localStorage.getItem(JOBSEEKERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored job seekers:', e);
    }
    return INITIAL_JOB_SEEKERS;
  });

  const [companies, setCompanies] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPANIES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored companies:', e);
    }
    return INITIAL_COMPANIES;
  });

  // Filter & Search states (for HomePage)
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [recruiterMode, setRecruiterMode] = useState(false);

  // Quick Modals state
  const [activeProject, setActiveProject] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [viewingProfileModalUser, setViewingProfileModalUser] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(RECRUITMENT_STORAGE_KEY, JSON.stringify(recruitmentDrives));
    } catch (e) {
      console.error('Failed to save recruitment drives:', e);
    }
  }, [recruitmentDrives]);

  useEffect(() => {
    try {
      localStorage.setItem(PLACEMENTS_STORAGE_KEY, JSON.stringify(placements));
    } catch (e) {
      console.error('Failed to save placements:', e);
    }
  }, [placements]);

  useEffect(() => {
    try {
      localStorage.setItem(JOBSEEKERS_STORAGE_KEY, JSON.stringify(jobSeekers));
    } catch (e) {
      console.error('Failed to save job seekers:', e);
    }
  }, [jobSeekers]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPANIES_STORAGE_KEY, JSON.stringify(companies));
    } catch (e) {
      console.error('Failed to save companies:', e);
    }
  }, [companies]);

  // Show temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActiveProfileUser(user);
    showToast(`Welcome back, ${user.name}! Your ABIT portal access is ready.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out of ABIT Portal.');
    setActivePage('home');
  };

  // Add new project
  const handleAddProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
    showToast(`"${newProject.title}" has been successfully submitted to ABIT Tech Warriors!`);
  };

  // Upvote project
  const handleUpvote = (projectId) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id === projectId) {
        return { ...proj, upvotes: (proj.upvotes || 0) + 1 };
      }
      return proj;
    }));
    showToast('Innovation upvoted! Thank you for supporting peer tech warriors.');
  };

  // Calculate project count per domain
  const projectCounts = useMemo(() => {
    const counts = { all: projects.length };
    DOMAINS.forEach(d => {
      if (d.id !== 'all') {
        counts[d.id] = projects.filter(p => p.domain === d.id).length;
      }
    });
    return counts;
  }, [projects]);

  // Filter and sort projects for HomePage
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedDomain !== 'all') {
      result = result.filter(p => p.domain === selectedDomain);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const titleMatch = p.title?.toLowerCase().includes(q);
        const taglineMatch = p.tagline?.toLowerCase().includes(q);
        const abstractMatch = p.abstract?.toLowerCase().includes(q);
        const mentorMatch = p.mentor?.toLowerCase().includes(q);
        const domainMatch = p.domainLabel?.toLowerCase().includes(q);
        const techMatch = p.techStack?.some(t => t.toLowerCase().includes(q));
        const authorMatch = p.authors?.some(a => 
          a.name.toLowerCase().includes(q) || 
          (a.rollNo && a.rollNo.toLowerCase().includes(q))
        );

        return (
          titleMatch ||
          taglineMatch ||
          abstractMatch ||
          mentorMatch ||
          domainMatch ||
          techMatch ||
          authorMatch
        );
      });
    }

    result.sort((a, b) => {
      if (sortBy === 'upvotes') {
        return (b.upvotes || 0) - (a.upvotes || 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.date || '2025-01-01') - new Date(a.date || '2025-01-01');
      }
      if (sortBy === 'verified') {
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      }
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return (b.upvotes || 0) - (a.upvotes || 0);
    });

    return result;
  }, [projects, selectedDomain, searchQuery, sortBy]);

  // Helper to open author profile
  const handleViewAuthorProfile = (author) => {
    const matched = REGISTERED_STUDENTS.find(u => 
      (author.rollNo && u.rollNo === author.rollNo) ||
      (author.name && u.name.toLowerCase() === author.name.toLowerCase())
    );
    const resolvedUser = matched || {
      name: author.name,
      rollNo: author.rollNo,
      year: author.year,
      branch: author.branch || 'Electrical & Computer Engineering',
      avatar: author.avatar || DEFAULT_USER.avatar,
      bio: 'Student Innovator at ABIT Department of Electrical & Computer Engineering.',
      skills: ['Engineering']
    };
    setViewingProfileModalUser(resolvedUser);
  };

  // Intelligent navigation and scroll handler
  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'domains-section') {
      if (activePage === 'home') {
        const el = document.getElementById('domains-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActivePage('domains');
      }
    } else if (sectionId === 'projects') {
      setActivePage('showcase');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'three-panels') {
      setActivePage('governance');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'leaderboard-section') {
      setActivePage('leaderboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'placement-section') {
      setActivePage('placement');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'submit-section') {
      setActivePage('submit');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      {/* ABIT Portal Initial Loading & Splash Animation */}
      {isLoading && (
        <Loading 
          isLoading={isLoading}
          duration={1800}
          onFinish={() => setIsLoading(false)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="portal-toast animate-fade-in">
          <Sparkles size={16} className="text-cyan" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Updated ABIT Logo & Name, Single-Page Navigation & Controls */}
      <Header 
        currentUser={currentUser}
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={(u) => {
          setActiveProfileUser(u || currentUser);
          setViewingProfileModalUser(u || currentUser);
        }}
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
        onScrollToSection={handleScrollToSection}
      />

      <main className="main-content">
        {/* Clean Home Screen: Hero & Department Domains Only */}
        {activePage === 'home' && (
          <HomePage 
            projects={projects}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            recruiterMode={recruiterMode}
            setRecruiterMode={setRecruiterMode}
            projectCounts={projectCounts}
            onNavigate={(pageId) => {
              setActivePage(pageId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectDomain={(domainId) => {
              setSelectedDomain(domainId);
            }}
          />
        )}

        {/* Dedicated Student Innovations Showcase */}
        {activePage === 'showcase' && (
          <ShowcasePage 
            projects={projects}
            filteredProjects={filteredProjects}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            recruiterMode={recruiterMode}
            setRecruiterMode={setRecruiterMode}
            projectCounts={projectCounts}
            onOpenDetails={setActiveProject}
            onUpvote={handleUpvote}
            onViewAuthorProfile={handleViewAuthorProfile}
            onOpenSubmit={() => {
              setActivePage('submit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Dedicated Domains Explorer */}
        {activePage === 'domains' && (
          <DomainsPage 
            projectCounts={projectCounts}
            onSelectDomainAndGoHome={(domainId) => {
              setSelectedDomain(domainId);
              setActivePage('showcase');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSubmitWithDomain={(domainId) => {
              setSelectedDomain(domainId);
              setActivePage('submit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Dedicated Placement Tie-Up Portal */}
        {activePage === 'placement' && (
          <PlacementPage 
            projects={projects}
            onSelectProject={setActiveProject}
            onViewAuthorProfile={handleViewAuthorProfile}
          />
        )}

        {/* Dedicated Warriors Hall of Fame */}
        {activePage === 'leaderboard' && (
          <LeaderboardPage 
            projects={projects}
            onSelectProject={setActiveProject}
            onViewAuthorProfile={handleViewAuthorProfile}
          />
        )}

        {/* Dedicated Institutional Governance & 3 Panels Hub */}
        {activePage === 'governance' && (
          <GovernancePage 
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
            onViewProject={setActiveProject}
          />
        )}

        {/* Dedicated Submit New Innovation Page */}
        {activePage === 'submit' && (
          <SubmitPage 
            currentUser={currentUser}
            onAddProject={handleAddProject}
            onNavigateHome={() => {
              setActivePage('showcase');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialDomain={selectedDomain !== 'all' ? selectedDomain : 'full-stack'}
          />
        )}

        {/* Dedicated Student Profile Page */}
        {activePage === 'profile' && (
          <ProfilePage 
            user={activeProfileUser}
            allProjects={projects}
            onSelectProject={setActiveProject}
            onOpenSubmit={() => {
              setActivePage('submit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={handleLogout}
            isCurrentUser={
              currentUser && 
              (currentUser.rollNo === activeProfileUser.rollNo || currentUser.name === activeProfileUser.name)
            }
          />
        )}
      </main>

      {/* Footer with Updated ABIT Logo & Name */}
      <Footer 
        setActivePage={setActivePage}
        onOpenSubmit={() => handleScrollToSection('submit-section')}
        onOpenLeaderboard={() => handleScrollToSection('leaderboard-section')}
        onScrollToSection={handleScrollToSection}
      />

      {/* Project Deep-Dive Modal */}
      {activeProject && (
        <ProjectModal 
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onUpvote={handleUpvote}
          onViewAuthorProfile={handleViewAuthorProfile}
        />
      )}

      {/* Quick Submit Modal */}
      {isSubmitModalOpen && (
        <SubmitModal 
          onClose={() => setIsSubmitModalOpen(false)}
          onAddProject={handleAddProject}
          currentUser={currentUser}
        />
      )}

      {/* Quick Leaderboard Modal */}
      {isLeaderboardModalOpen && (
        <LeaderboardModal 
          projects={projects}
          onClose={() => setIsLeaderboardModalOpen(false)}
          onSelectProject={(proj) => {
            setActiveProject(proj);
          }}
        />
      )}

      {/* Authentication & Login Modal */}
      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Profile Modal */}
      {viewingProfileModalUser && (
        <ProfileModal 
          user={viewingProfileModalUser}
          allProjects={projects}
          onClose={() => setViewingProfileModalUser(null)}
          onSelectProject={setActiveProject}
          onOpenSubmit={() => handleScrollToSection('submit-section')}
          onLogout={handleLogout}
          isCurrentUser={
            currentUser && 
            (currentUser.rollNo === viewingProfileModalUser.rollNo || currentUser.name === viewingProfileModalUser.name)
          }
        />
      )}

      {/* ABIT AI Assistant Bot & Interactive Campus Copilot */}
      <AIBot 
        onNavigate={(pageId) => {
          setActivePage(pageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
}
