import React from 'react';
import Hero from '../components/Hero';
import { DOMAINS } from '../data/domains';
import { 
  Layers, 
  Cpu, 
  ArrowRight, 
  Code2, 
  Briefcase, 
  PlusCircle, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function HomePage({
  projects,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  recruiterMode,
  setRecruiterMode,
  projectCounts,
  onNavigate,
  onSelectDomain
}) {
  const domainsList = DOMAINS.filter(d => d.id !== 'all');

  const handleDomainCardClick = (domainId) => {
    if (onSelectDomain) {
      onSelectDomain(domainId);
    }
    if (onNavigate) {
      onNavigate('showcase');
    }
  };

  return (
    <div className="home-page animate-fade-in" style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION (Official ABIT Logo, Title, Quick Jump Hub, Search Bar, Live Metrics) */}
      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalProjects={projects.length}
        totalDomains={domainsList.length}
        recruiterMode={recruiterMode}
        onNavigate={onNavigate}
      />

      {/* 2. DEPARTMENT DOMAINS & TECHNOLOGIES SECTION */}
      <section className="domains-section-wrapper" id="domains-section" style={{ marginTop: '20px', paddingBottom: '60px' }}>
        <div className="section-head-row" style={{ marginBottom: '28px' }}>
          <div>
            <div className="hub-header-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} className="text-blue" />
              <span>Multi-Disciplinary Engineering Tracks</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px', letterSpacing: '-0.02em' }}>
              Department Domains &amp; Technologies
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', maxWidth: '720px', lineHeight: 1.6 }}>
              Explore specialized labs, software platforms, and active research clusters within Electrical and Computer Engineering at ABIT. Select any domain below to browse verified student innovations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              type="button" 
              className="action-submit-btn"
              style={{ padding: '8px 18px', fontSize: '13.5px' }}
              onClick={() => onNavigate && onNavigate('showcase')}
            >
              <Code2 size={16} />
              <span>Browse All {projects.length} Innovations</span>
            </button>
          </div>
        </div>

        {/* 9 Engineering Track Cards Grid */}
        <div className="domains-page-grid">
          {domainsList.map((domain) => {
            const count = projectCounts[domain.id] || 0;
            return (
              <div 
                key={domain.id} 
                className="domain-explorer-card"
                style={{ '--domain-color': domain.color, cursor: 'pointer' }}
                onClick={() => handleDomainCardClick(domain.id)}
                title={`Click to view innovations in ${domain.name}`}
              >
                <div className="domain-card-accent-bar" />

                <div className="domain-explorer-header">
                  <div className="domain-icon-box">
                    <Cpu size={24} />
                  </div>
                  <span className="domain-badge-pill">{domain.badge}</span>
                </div>

                <div>
                  <h3 className="domain-explorer-title">{domain.name}</h3>
                  <p className="domain-explorer-desc">{domain.description}</p>
                </div>

                <div className="domain-explorer-footer">
                  <span className="domain-count-badge">{count} Project{count === 1 ? '' : 's'}</span>
                  <button 
                    type="button" 
                    className="domain-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDomainCardClick(domain.id);
                    }}
                  >
                    <span>Explore Track</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal High-End Gateway Bar Linking to Dedicated Hubs */}
        <div style={{
          marginTop: '48px',
          padding: '28px 32px',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(14,165,233,0.06) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(37,99,235,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={14} />
              <span>Placement &amp; Institutional Governance</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              Explore the Complete ABIT Technical Ecosystem
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Access corporate campus recruitment tie-ups, student merit leaderboards, or administrative governance portals.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="action-submit-btn"
              style={{ padding: '9px 18px', fontSize: '13px' }}
              onClick={() => onNavigate && onNavigate('placement')}
            >
              <Briefcase size={15} />
              <span>Placement Tie-Up Portal</span>
            </button>

            <button 
              type="button" 
              className="action-login-btn"
              style={{ padding: '9px 18px', fontSize: '13px', background: '#FFFFFF' }}
              onClick={() => onNavigate && onNavigate('governance')}
            >
              <ShieldCheck size={15} />
              <span>3 Panels Hub</span>
            </button>

            <button 
              type="button" 
              className="save-profile-btn"
              style={{ padding: '9px 18px', fontSize: '13px' }}
              onClick={() => onNavigate && onNavigate('submit')}
            >
              <PlusCircle size={15} />
              <span>Submit Project</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
