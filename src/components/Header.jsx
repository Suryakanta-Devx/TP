import React, { useState } from 'react';
import { 
  Home,
  PlusCircle, 
  Briefcase, 
  Trophy, 
  LogIn,
  Layers,
  LayoutGrid,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import AbitLogo from './AbitLogo';

export default function Header({ 
  currentUser,
  activePage,
  setActivePage,
  onOpenAuth,
  onOpenProfile,
  recruiterMode, 
  setRecruiterMode,
  onScrollToSection
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId, sectionId) => {
    setIsMobileMenuOpen(false);
    if (setActivePage) {
      setActivePage(pageId);
    }
    if (sectionId && pageId === 'home') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Updated ABIT Official Logo and Institution Branding */}
        <div 
          className="brand-wrapper" 
          onClick={() => handleNavClick('home', 'hero')}
          title="Ajay Binay Institute of Technology - Placement & Innovation Portal"
        >
          <AbitLogo size={44} showText={false} />
          
          <div className="brand-text">
            <div className="brand-institution">AJAY BINAY INSTITUTE OF TECHNOLOGY</div>
            <div className="brand-dept">
              <span className="dept-tag">DEPT OF ELECTRICAL &amp; COMPUTER ENGG</span>
            </div>
            <div className="brand-title">
              ABIT TECH WARRIORS <span className="brand-badge">PORTAL</span>
            </div>
          </div>
        </div>

        {/* Desktop Page / Section Navigation Links */}
        <nav className="header-nav desktop-nav">
          <button 
            type="button" 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={15} />
            <span>Home</span>
          </button>

          <button 
            type="button" 
            className={`nav-link ${activePage === 'showcase' ? 'active' : ''}`}
            onClick={() => handleNavClick('showcase')}
          >
            <LayoutGrid size={15} />
            <span>Showcase</span>
          </button>

          <button 
            type="button" 
            className={`nav-link ${activePage === 'domains' ? 'active' : ''}`}
            onClick={() => handleNavClick('domains')}
          >
            <Layers size={15} />
            <span>Domains</span>
          </button>

          <button 
            type="button" 
            className={`nav-link ${activePage === 'placement' ? 'active' : ''}`}
            onClick={() => handleNavClick('placement')}
          >
            <Briefcase size={15} />
            <span>Placement Tie-Up</span>
          </button>

          <button 
            type="button" 
            className={`nav-link ${activePage === 'leaderboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('leaderboard')}
          >
            <Trophy size={15} />
            <span>Hall of Fame</span>
          </button>

          <button 
            type="button" 
            className={`nav-link ${activePage === 'governance' ? 'active' : ''}`}
            onClick={() => handleNavClick('governance')}
          >
            <ShieldCheck size={15} />
            <span>3 Panels Hub</span>
          </button>
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="header-actions">
          {/* Recruiter / Placement Toggle (Desktop) */}
          <button 
            type="button" 
            className={`recruiter-toggle-btn desktop-only ${recruiterMode ? 'active' : ''}`}
            onClick={() => setRecruiterMode(!recruiterMode)}
            title="Toggle Recruiter &amp; Placement Showcase Highlight"
          >
            <Briefcase size={14} />
            <span>{recruiterMode ? 'Recruiter: ON' : 'Recruiter View'}</span>
            {recruiterMode && <span className="pulse-dot" />}
          </button>

          {/* Submit Project Button (Desktop) */}
          <button 
            type="button" 
            className="action-submit-btn desktop-only"
            onClick={() => handleNavClick('submit')}
          >
            <PlusCircle size={15} />
            <span>+ Submit Project</span>
          </button>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <button 
              type="button" 
              className="user-profile-header-btn"
              onClick={() => onOpenProfile(currentUser)}
              title={`View ${currentUser.name}'s Profile & Domain Projects`}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="header-avatar-img"
              />
              <div className="header-user-text">
                <span className="header-user-name">{currentUser.name.split(' ')[0]}</span>
                <span className="header-user-track">{currentUser.role || 'Student Warrior'}</span>
              </div>
            </button>
          ) : (
            <button 
              type="button" 
              className="action-login-btn"
              onClick={onOpenAuth}
            >
              <LogIn size={14} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            type="button" 
            className="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Navigation (Phone & Tablet) */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer animate-slide-down">
          <div className="mobile-nav-links">
            <button 
              type="button" 
              className={`mobile-nav-item ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home size={18} />
              <span>Home Portal</span>
            </button>

            <button 
              type="button" 
              className={`mobile-nav-item ${activePage === 'showcase' ? 'active' : ''}`}
              onClick={() => handleNavClick('showcase')}
            >
              <LayoutGrid size={18} />
              <span>Student Showcase</span>
            </button>

            <button 
              type="button" 
              className={`mobile-nav-item ${activePage === 'domains' ? 'active' : ''}`}
              onClick={() => handleNavClick('domains')}
            >
              <Layers size={18} />
              <span>9 Engineering Domains</span>
            </button>

            <button 
              type="button" 
              className={`mobile-nav-item ${activePage === 'placement' ? 'active' : ''}`}
              onClick={() => handleNavClick('placement')}
            >
              <Briefcase size={18} />
              <span>Placement Tie-Up</span>
            </button>

            <button 
              type="button" 
              className={`mobile-nav-item ${activePage === 'leaderboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('leaderboard')}
            >
              <Trophy size={18} />
              <span>Warriors Hall of Fame</span>
            </button>

            <button 
              type="button" 
              className={`mobile-nav-item ${activePage === 'governance' ? 'active' : ''}`}
              onClick={() => handleNavClick('governance')}
            >
              <ShieldCheck size={18} />
              <span>3 Panels Governance Hub</span>
            </button>
          </div>

          <div className="mobile-nav-footer">
            <button 
              type="button" 
              className={`mobile-recruiter-toggle ${recruiterMode ? 'active' : ''}`}
              onClick={() => {
                setRecruiterMode(!recruiterMode);
                setIsMobileMenuOpen(false);
              }}
            >
              <Briefcase size={16} />
              <span>{recruiterMode ? 'Recruiter Mode: Active' : 'Switch to Recruiter View'}</span>
            </button>

            <button 
              type="button" 
              className="mobile-submit-btn"
              onClick={() => handleNavClick('submit')}
            >
              <PlusCircle size={16} />
              <span>+ Submit New Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
