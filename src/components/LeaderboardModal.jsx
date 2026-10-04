import React from 'react';
import { 
  X, 
  Trophy, 
  Medal, 
  Heart, 
  Award,
  ArrowRight
} from 'lucide-react';
import { DOMAINS } from '../data/domains';

export default function LeaderboardModal({ projects, onClose, onSelectProject }) {
  // Sort projects by upvotes descending
  const sortedProjects = [...projects].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  const topProjects = sortedProjects.slice(0, 5);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return <div className="rank-badge gold"><Trophy size={18} /><span>#1</span></div>;
      case 1:
        return <div className="rank-badge silver"><Medal size={18} /><span>#2</span></div>;
      case 2:
        return <div className="rank-badge bronze"><Medal size={18} /><span>#3</span></div>;
      default:
        return <div className="rank-badge default"><span>#{index + 1}</span></div>;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content leaderboard-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="leaderboard-title-group">
            <div className="trophy-sphere">
              <Trophy size={24} className="trophy-gold" />
            </div>
            <div>
              <h2 className="modal-title">Warriors Hall of Fame</h2>
              <span className="modal-sub">
                Top Voted &amp; Faculty Endorsed Innovations &bull; ECE Department, ABIT
              </span>
            </div>
          </div>

          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="leaderboard-list">
          {topProjects.map((project, idx) => {
            const domainMeta = DOMAINS.find(d => d.id === project.domain);
            const leadAuthor = project.authors?.[0] || { name: 'Innovator', rollNo: '' };

            return (
              <div 
                key={project.id}
                className="leaderboard-row"
                onClick={() => {
                  onSelectProject(project);
                  onClose();
                }}
              >
                <div className="rank-col">
                  {getRankBadge(idx)}
                </div>

                <div className="project-col">
                  <div className="row-domain-tag" style={{ color: domainMeta?.color }}>
                    {domainMeta?.name || project.domainLabel}
                  </div>
                  <h4 className="row-title">{project.title}</h4>
                  <div className="row-author-meta">
                    <span>Lead: <strong>{leadAuthor.name}</strong> ({leadAuthor.rollNo})</span>
                    <span>&bull;</span>
                    <span>Guide: {project.mentor}</span>
                  </div>
                </div>

                <div className="stats-col">
                  <div className="upvote-pill">
                    <Heart size={16} className="fill-heart" />
                    <span>{project.upvotes || 0} Upvotes</span>
                  </div>
                  <button 
                    type="button" 
                    className="view-btn"
                    title="View Project"
                  >
                    <span>View</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="modal-footer">
          <div className="faculty-spotlight-box">
            <Award size={18} className="text-amber" />
            <span>
              All ABIT students can vote for innovations to help peer projects qualify for Annual Engineering Capstone Grants and Placement showcases.
            </span>
          </div>

          <button 
            type="button" 
            className="modal-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
