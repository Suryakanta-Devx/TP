import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Video, 
  FileText, 
  Share2, 
  CheckCircle, 
  Cpu, 
  Users, 
  GraduationCap, 
  Calendar, 
  Tag, 
  Check, 
  Award 
} from 'lucide-react';
import GithubIcon from './GithubIcon';
import { DOMAINS } from '../data/domains';

export default function ProjectModal({ project, onClose, onViewAuthorProfile }) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const domainMeta = DOMAINS.find(d => d.id === project.domain) || {
    name: project.domainLabel || 'Engineering',
    color: '#00D2FF',
    badge: 'Tech Track'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '?project=' + project.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-accent': domainMeta.color }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-domain-group">
            <span className="modal-domain-pill">
              {domainMeta.name}
            </span>
            {project.verified && (
              <span className="modal-verified-pill">
                <CheckCircle size={14} />
                <span>Verified by ECE Dept</span>
              </span>
            )}
            {project.status && (
              <span className="modal-status-pill">
                {project.status}
              </span>
            )}
          </div>

          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Title & Tagline */}
        <div className="modal-title-area">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-tagline">{project.tagline}</p>
        </div>

        {/* Quick Link Buttons Ribbon */}
        <div className="modal-links-ribbon">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-pill-btn github"
            >
              <GithubIcon size={16} />
              <span>Source Repository</span>
              <ExternalLink size={14} />
            </a>
          )}

          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-pill-btn live"
            >
              <ExternalLink size={16} />
              <span>Live Demonstration</span>
            </a>
          )}

          {project.demoVideoUrl && (
            <a 
              href={project.demoVideoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-pill-btn video"
            >
              <Video size={16} />
              <span>Video Walkthrough</span>
            </a>
          )}

          {project.docUrl && (
            <a 
              href={project.docUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-pill-btn doc"
            >
              <FileText size={16} />
              <span>Project Report</span>
            </a>
          )}

          <button 
            type="button" 
            className="action-pill-btn copy"
            onClick={handleCopyLink}
          >
            {copied ? <Check size={16} className="text-emerald" /> : <Share2 size={16} />}
            <span>{copied ? 'Link Copied!' : 'Share Project'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll">
          {/* Abstract / Problem Statement */}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <span>Project Abstract &amp; Engineering Solution</span>
            </h4>
            <p className="modal-abstract-text">
              {project.abstract || project.tagline}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <span>Key Technical Highlights &amp; Capabilities</span>
              </h4>
              <ul className="modal-features-list">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <CheckCircle size={16} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hardware Bill of Materials (for IoT, Robotics, Embedded) */}
          {project.hardwareComponents && project.hardwareComponents.length > 0 && (
            <div className="modal-section hardware-box">
              <h4 className="modal-section-title">
                <Cpu size={18} className="text-amber" />
                <span>Hardware Components &amp; Embedded Modules</span>
              </h4>
              <div className="hardware-tags-grid">
                {project.hardwareComponents.map((hw, idx) => (
                  <div key={idx} className="hardware-tag">
                    <span className="hw-dot" />
                    <span>{hw}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <Tag size={18} className="text-cyan" />
              <span>Technologies &amp; Libraries Used</span>
            </h4>
            <div className="modal-tech-pills">
              {project.techStack?.map((tech, idx) => (
                <span key={idx} className="modal-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Authors & Faculty Guide Grid */}
          <div className="modal-team-grid">
            <div className="team-col">
              <h4 className="modal-section-title">
                <Users size={18} className="text-indigo" />
                <span>Student Innovators</span>
              </h4>
              <div className="authors-list">
                {project.authors?.map((author, idx) => (
                  <div 
                    key={idx} 
                    className="author-card clickable-author"
                    onClick={() => {
                      if (onViewAuthorProfile) {
                        onClose();
                        onViewAuthorProfile(author);
                      }
                    }}
                    title={`View ${author.name}'s Profile & Projects by Domain`}
                  >
                    <div className="author-card-avatar">
                      {author.avatar ? (
                        <img src={author.avatar} alt={author.name} className="author-img" />
                      ) : (
                        author.name.charAt(0)
                      )}
                    </div>
                    <div className="author-card-details">
                      <span className="author-card-name">{author.name} &bull; <em className="view-profile-hint">View Domain Projects &rarr;</em></span>
                      <span className="author-card-meta">
                        Reg No: <strong>{author.rollNo}</strong> &bull; {author.year || author.branch}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="team-col">
              <h4 className="modal-section-title">
                <GraduationCap size={18} className="text-purple" />
                <span>Faculty Supervision</span>
              </h4>
              <div className="mentor-card">
                <div className="mentor-badge-icon">
                  <Award size={20} />
                </div>
                <div className="mentor-details">
                  <span className="mentor-title">Guide / Project In-charge:</span>
                  <span className="mentor-name-val">{project.mentor || 'ECE Department Faculty Council'}</span>
                  <span className="mentor-dept">Dept of Electrical &amp; Computer Engineering, ABIT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="modal-footer-date">
            <Calendar size={14} />
            <span>Submitted: {project.date || 'Current Academic Session'}</span>
          </div>

          <div className="modal-footer-actions">
            <button 
              type="button" 
              className="modal-btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-btn-primary"
              >
                <GithubIcon size={16} />
                <span>Explore Codebase</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
