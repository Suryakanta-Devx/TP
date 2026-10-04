import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  ArrowRight, 
  Filter 
} from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { DOMAINS } from '../data/domains';

export default function PlacementPage({ 
  projects, 
  onSelectProject, 
  onViewAuthorProfile 
}) {
  const [selectedBatch, setSelectedBatch] = useState('4th Year (Batch 2021-25)');
  const [placementSearch, setPlacementSearch] = useState('');

  // Filter projects by placement batch & search
  const filteredCandidates = useMemo(() => {
    let result = [...projects];

    if (selectedBatch !== 'all') {
      result = result.filter(p => 
        p.authors?.some(a => a.year?.includes(selectedBatch) || a.year?.includes('4th Year'))
      );
    }

    if (placementSearch.trim()) {
      const q = placementSearch.toLowerCase().trim();
      result = result.filter(p => 
        p.title?.toLowerCase().includes(q) ||
        p.authors?.some(a => a.name.toLowerCase().includes(q) || a.rollNo?.toLowerCase().includes(q)) ||
        p.techStack?.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [projects, selectedBatch, placementSearch]);

  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-row">
          <h1 className="page-title">
            <Briefcase className="text-emerald" size={32} />
            <span>Training &amp; Placement Tie-Up Portal</span>
          </h1>
          <div className="placement-badge-top">
            <span>Corporate Recruitment &bull; ECE Department</span>
          </div>
        </div>
        <p className="page-subtitle">
          Direct recruitment pipeline for companies, industry sponsors, and placement officers.
          Browse placement-ready final-year students of Ajay Binay Institute of Technology equipped with production-grade code, live demos, and faculty-verified credentials.
        </p>
      </div>

      {/* Recruiter Banner & Stats */}
      <section className="placement-recruiter-banner">
        <div className="placement-banner-left">
          <div className="placement-badge-top">
            <Building2 size={13} />
            <span>Industry Tie-Up Portal</span>
          </div>
          <h2 className="placement-heading">Pre-Vetted Technical Talent Pool</h2>
          <p className="placement-sub">
            Every candidate below has proven hands-on capability with complete verifiable Git repositories, functional prototypes, and faculty mentorship from ABIT ECE labs.
          </p>
        </div>

        <div className="placement-stats-row">
          <div className="p-metric">
            <span className="p-metric-val">{filteredCandidates.length}</span>
            <span className="p-metric-lbl">Placement Ready</span>
          </div>
          <div className="p-metric">
            <span className="p-metric-val">100%</span>
            <span className="p-metric-lbl">Verified Code</span>
          </div>
          <div className="p-metric">
            <span className="p-metric-val">9</span>
            <span className="p-metric-lbl">Tech Tracks</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="placement-filter-bar">
        <div className="filter-left-group">
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} /> Batch Filter:
          </span>
          <button 
            type="button" 
            className={`batch-filter-btn ${selectedBatch === '4th Year (Batch 2021-25)' ? 'active' : ''}`}
            onClick={() => setSelectedBatch('4th Year (Batch 2021-25)')}
          >
            Final Year (Batch 2021-25)
          </button>
          <button 
            type="button" 
            className={`batch-filter-btn ${selectedBatch === '3rd Year (Batch 2022-26)' ? 'active' : ''}`}
            onClick={() => setSelectedBatch('3rd Year (Batch 2022-26)')}
          >
            Pre-Final Year (Internships)
          </button>
          <button 
            type="button" 
            className={`batch-filter-btn ${selectedBatch === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedBatch('all')}
          >
            All Year Groups
          </button>
        </div>

        <div style={{ flex: 1, maxWidth: '340px' }}>
          <input 
            type="text"
            className="form-input"
            placeholder="Search by skill (React, ESP32, Python) or student name..."
            value={placementSearch}
            onChange={(e) => setPlacementSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Candidate Project Cards Grid */}
      <div className="projects-grid">
        {filteredCandidates.map((project) => {
          const leadAuthor = project.authors?.[0] || { name: 'Student', rollNo: 'N/A' };
          const domainMeta = DOMAINS.find(d => d.id === project.domain);

          return (
            <div 
              key={project.id} 
              className="project-card is-featured"
              style={{ '--card-accent': domainMeta?.color || '#00D2FF' }}
              onClick={() => onSelectProject(project)}
            >
              <div className="card-top-accent" />

              <div className="card-header">
                <span className="card-domain-badge">
                  <span className="domain-bullet" />
                  {domainMeta?.name || project.domainLabel}
                </span>

                <div className="card-badges-right">
                  <span className="verified-badge">
                    <CheckCircle2 size={13} />
                    <span>Placement Ready</span>
                  </span>
                </div>
              </div>

              <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-tagline">{project.tagline}</p>

                {/* Candidate Highlight Box */}
                <div className="card-recruiter-box">
                  <div className="recruiter-row">
                    <span className="recruiter-label">Candidate Name:</span>
                    <span className="recruiter-val">{leadAuthor.name}</span>
                  </div>
                  <div className="recruiter-row">
                    <span className="recruiter-label">Registration No:</span>
                    <span className="recruiter-val">{leadAuthor.rollNo}</span>
                  </div>
                  <div className="recruiter-row">
                    <span className="recruiter-label">Academic Batch:</span>
                    <span className="recruiter-val">{leadAuthor.year || '4th Year (Batch 2021-25)'}</span>
                  </div>
                </div>

                <div className="card-tech-chips">
                  {project.techStack?.slice(0, 5).map((tech, idx) => (
                    <span key={idx} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="card-footer" onClick={(e) => e.stopPropagation()}>
                <div className="footer-links">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="card-link-btn"
                      title="Inspect Source Code on GitHub"
                    >
                      <GithubIcon size={16} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="card-link-btn primary"
                      title="Inspect Live Deployment"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <button 
                  type="button"
                  className="explore-btn"
                  onClick={() => onViewAuthorProfile(leadAuthor)}
                  title="View Student Full Portfolio by Domain"
                >
                  <span>Student Profile</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
