import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  ExternalLink, 
  CheckCircle2, 
  PlusCircle, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { DOMAINS } from '../data/domains';

export default function ProfilePage({ 
  user, 
  allProjects, 
  onSelectProject, 
  onOpenSubmit,
  onLogout,
  isCurrentUser = false
}) {
  const [activeDomainTab, setActiveDomainTab] = useState('all');

  // Find all projects where this user is an author
  const userProjects = useMemo(() => {
    if (!user) return [];
    return allProjects.filter(project => {
      return project.authors?.some(author => 
        (user.rollNo && author.rollNo === user.rollNo) ||
        (user.name && author.name?.toLowerCase() === user.name?.toLowerCase())
      );
    });
  }, [allProjects, user]);

  // Group user's projects by domain
  const projectsByDomain = useMemo(() => {
    const grouped = {};
    userProjects.forEach(proj => {
      const d = proj.domain || 'other';
      if (!grouped[d]) {
        grouped[d] = [];
      }
      grouped[d].push(proj);
    });
    return grouped;
  }, [userProjects]);

  const userDomainIds = Object.keys(projectsByDomain);

  if (!user) {
    return (
      <div className="page-container animate-fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No user selected</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Please sign in to view your profile and domain-wise projects.
        </p>
      </div>
    );
  }

  const displayedProjects = activeDomainTab === 'all'
    ? userProjects
    : (projectsByDomain[activeDomainTab] || []);

  const totalUpvotes = userProjects.reduce((sum, p) => sum + (p.upvotes || 0), 0);

  return (
    <div className="page-container animate-fade-in">
      <div className="profile-modal" style={{ width: '100%', margin: '0 auto' }}>
        
        {/* Profile Banner */}
        <div className="profile-banner">
          <div className="profile-banner-glow" />
        </div>

        {/* Profile Header Info */}
        <div className="profile-header-content">
          <div className="profile-avatar-wrap">
            <img 
              src={user.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'} 
              alt={user.name} 
              className="profile-main-avatar"
            />
            <div className="profile-status-online" title="Verified ECE Student Warrior" />
          </div>

          <div className="profile-credentials">
            <div className="profile-name-row">
              <h2 className="profile-name">{user.name}</h2>
              <span className="profile-verified-badge">
                <CheckCircle2 size={14} />
                <span>ECE Tech Warrior</span>
              </span>
            </div>

            <div className="profile-academic-meta">
              <span className="meta-pill">Reg No: <strong>{user.rollNo || '2101214045'}</strong></span>
              <span className="meta-pill">{user.year || '4th Year (Batch 2021-25)'}</span>
              <span className="meta-pill">{user.branch || 'Electrical & Computer Engineering'}</span>
            </div>

            <p className="profile-bio-text">
              {user.bio || 'Talented student innovator engineering projects across multiple technical domains.'}
            </p>

            <div className="profile-skills-row">
              {user.skills?.map((skill, idx) => (
                <span key={idx} className="profile-skill-chip">{skill}</span>
              ))}
              {user.github && (
                <a 
                  href={user.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="profile-social-link"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          <div className="profile-stats-col">
            <div className="profile-stat-box">
              <span className="p-stat-number">{userProjects.length}</span>
              <span className="p-stat-label">Total Projects</span>
            </div>
            <div className="profile-stat-box">
              <span className="p-stat-number text-rose">{totalUpvotes}</span>
              <span className="p-stat-label">Total Upvotes</span>
            </div>
            <div className="profile-stat-box">
              <span className="p-stat-number text-cyan">{userDomainIds.length}</span>
              <span className="p-stat-label">Domains Mastered</span>
            </div>

            {isCurrentUser && (
              <button 
                type="button" 
                className="profile-logout-btn"
                onClick={onLogout}
              >
                Log Out
              </button>
            )}
          </div>
        </div>

        {/* DOMAIN-WISE SHOWCASE */}
        <div className="profile-domain-section">
          <div className="p-domain-header">
            <div>
              <h3 className="p-domain-title">
                <Layers size={18} className="text-cyan" />
                <span>Domain-Wise Project Showcase</span>
              </h3>
              <span className="p-domain-subtitle">
                Projects organized categorically by technical track
              </span>
            </div>

            <button 
              type="button" 
              className="add-domain-project-btn"
              onClick={onOpenSubmit}
            >
              <PlusCircle size={16} />
              <span>+ Add Project in this Domain</span>
            </button>
          </div>

          {/* Domain Tabs */}
          <div className="profile-domain-tabs">
            <button
              type="button"
              className={`p-domain-tab ${activeDomainTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveDomainTab('all')}
            >
              <span>All Projects</span>
              <span className="p-tab-count">{userProjects.length}</span>
            </button>

            {userDomainIds.map(domainId => {
              const domInfo = DOMAINS.find(d => d.id === domainId);
              const count = projectsByDomain[domainId]?.length || 0;
              return (
                <button
                  key={domainId}
                  type="button"
                  className={`p-domain-tab ${activeDomainTab === domainId ? 'active' : ''}`}
                  onClick={() => setActiveDomainTab(domainId)}
                  style={{ '--tab-accent': domInfo?.color || '#00D2FF' }}
                >
                  <span className="tab-dot" style={{ backgroundColor: domInfo?.color || '#00D2FF' }} />
                  <span>{domInfo?.name || domainId}</span>
                  <span className="p-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Domain-wise Project List */}
          <div className="profile-projects-list">
            {displayedProjects.length > 0 ? (
              displayedProjects.map((project) => {
                const dom = DOMAINS.find(d => d.id === project.domain);
                return (
                  <div 
                    key={project.id} 
                    className="profile-project-card"
                    style={{ '--domain-line-color': dom?.color || '#00D2FF' }}
                    onClick={() => onSelectProject(project)}
                  >
                    <div className="p-proj-left">
                      <div className="p-proj-domain-badge" style={{ color: dom?.color }}>
                        {dom?.name || project.domainLabel}
                      </div>
                      <h4 className="p-proj-title">{project.title}</h4>
                      <p className="p-proj-tagline">{project.tagline}</p>

                      <div className="p-proj-tech">
                        {project.techStack?.map((t, idx) => (
                          <span key={idx} className="tech-chip mini">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-proj-right" onClick={(e) => e.stopPropagation()}>
                      <div className="p-proj-upvotes">
                        <Heart size={14} className="fill-heart" />
                        <span>{project.upvotes || 0}</span>
                      </div>

                      <div className="p-proj-links">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-btn-link"
                          >
                            <GithubIcon size={14} />
                            <span>Code</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-btn-link live"
                          >
                            <ExternalLink size={14} />
                            <span>Live</span>
                          </a>
                        )}

                        <button 
                          type="button" 
                          className="p-btn-details"
                          onClick={() => onSelectProject(project)}
                        >
                          <span>Explore</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-profile-projects">
                <span>No projects found in this domain for {user.name}.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
