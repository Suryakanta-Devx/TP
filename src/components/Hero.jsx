import React from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Code2, 
  Cpu, 
  FolderGit2, 
  Users, 
  SlidersHorizontal,
  ShieldCheck,
  Briefcase,
  Layers,
  Trophy,
  PlusCircle
} from 'lucide-react';
import AbitLogo from './AbitLogo';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy, 
  totalProjects, 
  totalDomains,
  recruiterMode,
  onScrollToSection,
  onNavigate
}) {
  const handleJump = (pageId, sectionId) => {
    if (onNavigate && pageId) {
      onNavigate(pageId);
    } else if (onScrollToSection && sectionId) {
      onScrollToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && onNavigate) {
      onNavigate('showcase');
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow-sphere" />
      <div className="hero-container">
        
        {/* Institutional Accreditation Pill */}
        <div className="hero-pill-badge">
          <Sparkles size={14} className="badge-sparkle" />
          <span>NAAC Accredited &bull; AICTE Approved &bull; Affiliated to BPUT, Odisha</span>
        </div>

        {/* Hero Headlines with Official Institution Name */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
          <AbitLogo size={52} showText={false} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', color: '#1E3A8A' }}>
              AJAY BINAY INSTITUTE OF TECHNOLOGY
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0284C7' }}>
              Department of Electrical &amp; Computer Engineering (ECE)
            </div>
          </div>
        </div>

        <h1 className="hero-title">
          Tech Warriors <br />
          <span className="hero-gradient-text">Placement &amp; Innovation Portal</span>
        </h1>
        
        <p className="hero-subtitle">
          The premier technical gateway bridging ABIT student innovators with corporate recruiters and faculty mentorship.
          Explore verified engineering projects across Web Development, Full Stack, AI &amp; Machine Learning, IoT, Robotics, Embedded Systems, and Software QA.
        </p>

        {/* Quick Navigation Action Hub */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
          <button 
            type="button" 
            onClick={() => handleJump('showcase', 'projects')}
            className="filter-pill active"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', background: '#2563EB', color: '#fff', fontWeight: 700 }}
          >
            <Code2 size={16} /> View All Innovations ({totalProjects})
          </button>

          <button 
            type="button" 
            onClick={() => {
              const el = document.getElementById('domains-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else handleJump('domains');
            }}
            className="filter-pill"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontWeight: 700 }}
          >
            <Layers size={16} /> Engineering Domains ({totalDomains})
          </button>

          <button 
            type="button" 
            onClick={() => handleJump('placement')}
            className="filter-pill"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontWeight: 700 }}
          >
            <Briefcase size={16} /> Placement Tie-Up
          </button>

          <button 
            type="button" 
            onClick={() => handleJump('governance')}
            className="filter-pill"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontWeight: 700 }}
          >
            <ShieldCheck size={16} /> 3 Panels (Admin &bull; Recruiter &bull; Student)
          </button>

          <button 
            type="button" 
            onClick={() => handleJump('leaderboard')}
            className="filter-pill"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontWeight: 700 }}
          >
            <Trophy size={16} /> Hall of Fame
          </button>

          <button 
            type="button" 
            onClick={() => handleJump('submit')}
            className="filter-pill"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontWeight: 700, borderColor: 'rgba(37,99,235,0.4)', color: '#2563EB' }}
          >
            <PlusCircle size={16} /> + Submit Project
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-sort-wrapper" style={{ maxWidth: '680px' }}>
          <div className="search-bar-container" style={{ flex: 1 }}>
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="search-input"
              placeholder="Search innovations by keyword, author, roll no, tech stack (press Enter to view)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {onNavigate && (
            <button 
              type="button" 
              className="save-profile-btn"
              style={{ padding: '0 20px', height: '44px', borderRadius: '10px', fontSize: '13.5px' }}
              onClick={() => onNavigate('showcase')}
            >
              <span>Explore</span>
            </button>
          )}
        </div>

        {/* Live Metrics Strip */}
        <div className="metrics-strip">
          <div className="metric-item">
            <div className="metric-icon cyan">
              <Code2 size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-value">{totalProjects}</span>
              <span className="metric-label">Live Innovations</span>
            </div>
          </div>

          <div className="metric-divider" />

          <div className="metric-item">
            <div className="metric-icon purple">
              <Cpu size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-value">{totalDomains}</span>
              <span className="metric-label">Tech Domains</span>
            </div>
          </div>

          <div className="metric-divider" />

          <div className="metric-item">
            <div className="metric-icon emerald">
              <FolderGit2 size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-value">100%</span>
              <span className="metric-label">Verifiable Repos</span>
            </div>
          </div>

          <div className="metric-divider" />

          <div className="metric-item">
            <div className="metric-icon amber">
              <Users size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-value">ABIT Warriors</span>
              <span className="metric-label">ECE B.Tech 2021-27</span>
            </div>
          </div>
        </div>

        {/* Recruiter Active Notification */}
        {recruiterMode && (
          <div className="recruiter-alert-banner">
            <span className="recruiter-badge">RECRUITER MODE ACTIVE</span>
            <span>
              Showing placement-ready portfolios with student registration IDs, batch info, and verified code repositories.
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
