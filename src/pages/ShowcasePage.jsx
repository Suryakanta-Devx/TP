import React from 'react';
import DomainFilter from '../components/DomainFilter';
import ProjectCard from '../components/ProjectCard';
import { DOMAINS } from '../data/domains';
import { 
  Code2, 
  FolderSearch, 
  Search, 
  X, 
  SlidersHorizontal, 
  PlusCircle, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ShowcasePage({
  projects,
  filteredProjects,
  selectedDomain,
  setSelectedDomain,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  recruiterMode,
  setRecruiterMode,
  projectCounts,
  onOpenDetails,
  onUpvote,
  onViewAuthorProfile,
  onOpenSubmit
}) {
  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div className="page-title-row">
          <h1 className="page-title">
            <Code2 className="text-blue" size={32} />
            <span>Student Innovations Showcase</span>
          </h1>
          <div className="hero-pill-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>Peer-Reviewed Engineering Prototypes</span>
          </div>
        </div>
        <p className="page-subtitle">
          Explore and inspect production software, edge IoT hardware, AI architectures, and cross-disciplinary prototypes built by B.Tech students of Ajay Binay Institute of Technology (ECE Department).
        </p>

        {/* Quick Search & Filter Toolbar inside Showcase Header */}
        <div className="search-sort-wrapper" style={{ marginTop: '20px' }}>
          <div className="search-bar-container">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="search-input"
              placeholder="Search innovations by keyword, author, tech stack (e.g. React, ESP32, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          <div className="sort-container">
            <SlidersHorizontal size={16} className="sort-icon" />
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="upvotes">Most Upvoted</option>
              <option value="newest">Newest First</option>
              <option value="verified">Verified First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Domain Filter Ribbon */}
      <div style={{ marginBottom: '16px' }}>
        <DomainFilter 
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
          projectCounts={projectCounts}
        />
      </div>

      {/* Filter Info & Project Count Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: '12px',
        padding: '12px 18px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Showing <strong>{filteredProjects.length}</strong> of {projects.length} Innovations
          {selectedDomain !== 'all' && (
            <span> in <span style={{ color: DOMAINS.find(d => d.id === selectedDomain)?.color || '#2563EB', fontWeight: 700 }}>{DOMAINS.find(d => d.id === selectedDomain)?.name}</span></span>
          )}
          {searchQuery && (
            <span> matching &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {(selectedDomain !== 'all' || searchQuery) && (
            <button 
              type="button" 
              className="reset-filter-btn"
              style={{ padding: '6px 14px', fontSize: '12.5px' }}
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('all');
              }}
            >
              Reset Filters
            </button>
          )}

          {onOpenSubmit && (
            <button 
              type="button" 
              className="action-submit-btn"
              style={{ padding: '7px 16px', fontSize: '13px' }}
              onClick={onOpenSubmit}
            >
              <PlusCircle size={15} />
              <span>+ Submit Innovation</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onOpenDetails={onOpenDetails}
              onUpvote={onUpvote}
              recruiterMode={recruiterMode}
              onViewAuthorProfile={onViewAuthorProfile}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FolderSearch size={48} className="text-muted" />
          <h3>No innovations found</h3>
          <p>
            No engineering projects matched your query &ldquo;{searchQuery}&rdquo; in this track.
            Try clearing filters or be the first to submit a project!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <button 
              type="button" 
              className="reset-filter-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('all');
              }}
            >
              Reset All Filters
            </button>
            {onOpenSubmit && (
              <button 
                type="button" 
                className="action-submit-btn"
                onClick={onOpenSubmit}
              >
                <PlusCircle size={15} />
                <span>Submit New Project</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
