import React, { useState } from 'react';
import { 
  ExternalLink, 
  Heart, 
  User, 
  CheckCircle, 
  Cpu, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import GithubIcon from './GithubIcon';
import { DOMAINS } from '../data/domains';

export default function ProjectCard({ 
  project, 
  onOpenDetails, 
  onUpvote, 
  recruiterMode,
  onViewAuthorProfile 
}) {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const domainMeta = DOMAINS.find(d => d.id === project.domain) || {
    name: project.domainLabel || 'Engineering',
    color: '#00D2FF',
    badge: 'Tech'
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!hasUpvoted) {
      setHasUpvoted(true);
      onUpvote(project.id);
    }
  };

  const leadAuthor = project.authors?.[0] || { name: 'Student Innovator', rollNo: 'N/A' };
  const teamCount = project.authors?.length || 1;

  return (
    <article 
      className={`project-card ${project.featured ? 'is-featured' : ''}`}
      onClick={() => onOpenDetails(project)}
      style={{
        '--card-accent': domainMeta.color
      }}
    >
      {/* Top Banner Accent */}
      <div className="card-top-accent" />

      {/* Card Header: Domain Tag & Badges */}
      <div className="card-header">
        <span className="card-domain-badge">
          <span className="domain-bullet" />
          {domainMeta.name}
        </span>

        <div className="card-badges-right">
          {project.verified && (
            <span className="verified-badge" title="Verified by ECE Dept Faculty">
              <CheckCircle size={13} />
              <span>ECE Verified</span>
            </span>
          )}
          {project.featured && (
            <span className="featured-pill">Featured</span>
          )}
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="card-body">
        <h3 className="card-title">
          {project.title}
        </h3>
        <p className="card-tagline">
          {project.tagline}
        </p>

        {/* Tech Stack Chips */}
        <div className="card-tech-chips">
          {project.techStack?.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-chip">
              {tech}
            </span>
          ))}
          {project.techStack?.length > 4 && (
            <span className="tech-chip-more">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Recruiter / Placement Meta Callout */}
        {recruiterMode && (
          <div className="card-recruiter-box">
            <div className="recruiter-row">
              <span className="recruiter-label">Candidate:</span>
              <span className="recruiter-val">{leadAuthor.name} ({leadAuthor.rollNo})</span>
            </div>
            <div className="recruiter-row">
              <span className="recruiter-label">Batch/Year:</span>
              <span className="recruiter-val">{leadAuthor.year || 'Final Year'}</span>
            </div>
          </div>
        )}

        {/* Author & Mentor Info */}
        <div className="card-meta">
          <div 
            className="author-info clickable-author"
            onClick={(e) => {
              if (onViewAuthorProfile) {
                e.stopPropagation();
                onViewAuthorProfile(leadAuthor);
              }
            }}
            title={`View ${leadAuthor.name}'s Profile & Projects by Domain`}
          >
            <div className="author-avatar">
              {leadAuthor.avatar ? (
                <img src={leadAuthor.avatar} alt={leadAuthor.name} className="author-img" />
              ) : (
                <User size={14} />
              )}
            </div>
            <div className="author-text">
              <span className="author-name">
                {leadAuthor.name}
                {teamCount > 1 && <span className="team-count">+{teamCount - 1} co-author</span>}
              </span>
              <span className="author-roll">{leadAuthor.rollNo}</span>
            </div>
          </div>

          {project.mentor && (
            <div className="mentor-info" title={`Faculty Mentor: ${project.mentor}`}>
              <GraduationCap size={14} className="mentor-icon" />
              <span className="mentor-name">{project.mentor}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="card-footer">
        <div className="footer-links" onClick={(e) => e.stopPropagation()}>
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="card-link-btn"
              title="View GitHub Repository"
            >
              <GithubIcon size={16} />
              <span>Code</span>
            </a>
          )}

          {project.liveUrl ? (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="card-link-btn primary"
              title="View Live Demonstration / Prototype"
            >
              <ExternalLink size={16} />
              <span>Live</span>
            </a>
          ) : (
            <button 
              type="button"
              className="card-link-btn muted"
              onClick={() => onOpenDetails(project)}
            >
              <Cpu size={16} />
              <span>Hardware</span>
            </button>
          )}
        </div>

        <div className="footer-interactions">
          {/* Upvote Button */}
          <button 
            type="button"
            className={`upvote-btn ${hasUpvoted ? 'upvoted' : ''}`}
            onClick={handleUpvote}
            title={hasUpvoted ? 'You upvoted this project' : 'Upvote this innovation'}
          >
            <Heart size={16} className={hasUpvoted ? 'fill-heart' : ''} />
            <span className="upvote-count">{project.upvotes || 0}</span>
          </button>

          {/* Details CTA */}
          <button 
            type="button"
            className="explore-btn"
            onClick={() => onOpenDetails(project)}
            title="Open comprehensive project abstract"
          >
            <span>Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
