import React from 'react';
import { 
  Trophy, 
  Heart, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { DOMAINS } from '../data/domains';

export default function LeaderboardPage({ 
  projects, 
  onSelectProject, 
  onViewAuthorProfile 
}) {
  const sortedProjects = [...projects].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  const topThree = sortedProjects.slice(0, 3);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-row">
          <h1 className="page-title">
            <Trophy className="text-amber" size={32} />
            <span>Warriors Hall of Fame</span>
          </h1>
          <div className="hero-pill-badge">
            <Sparkles size={14} />
            <span>Top Voted Student Innovations</span>
          </div>
        </div>
        <p className="page-subtitle">
          Recognizing the most innovative, impactful, and upvoted projects from the Electrical and Computer Engineering department.
          Rankings are updated dynamically based on peer votes, faculty evaluations, and deployment benchmarks.
        </p>
      </div>

      {/* Podium Section for Top 3 */}
      {topThree.length >= 3 && (
        <section className="hall-podium-section">
          {/* #2 Silver */}
          <div 
            className="podium-card second"
            onClick={() => onSelectProject(topThree[1])}
          >
            <div className="podium-crown-badge silver">2</div>
            <div className="row-domain-tag" style={{ color: DOMAINS.find(d => d.id === topThree[1].domain)?.color }}>
              {DOMAINS.find(d => d.id === topThree[1].domain)?.name}
            </div>
            <h3 className="podium-title">{topThree[1].title}</h3>
            <p className="podium-author">
              Lead: <strong>{topThree[1].authors?.[0]?.name}</strong>
            </p>
            <div className="podium-score">
              <Heart size={14} className="fill-heart" />
              <span>{topThree[1].upvotes} Upvotes</span>
            </div>
          </div>

          {/* #1 Gold */}
          <div 
            className="podium-card first"
            onClick={() => onSelectProject(topThree[0])}
          >
            <div className="podium-crown-badge gold">
              <Trophy size={26} />
            </div>
            <div className="row-domain-tag" style={{ color: DOMAINS.find(d => d.id === topThree[0].domain)?.color }}>
              {DOMAINS.find(d => d.id === topThree[0].domain)?.name}
            </div>
            <h3 className="podium-title">{topThree[0].title}</h3>
            <p className="podium-author">
              Lead: <strong>{topThree[0].authors?.[0]?.name}</strong> ({topThree[0].authors?.[0]?.rollNo})
            </p>
            <div className="podium-score">
              <Heart size={14} className="fill-heart" />
              <span>{topThree[0].upvotes} Upvotes &bull; Rank #1</span>
            </div>
          </div>

          {/* #3 Bronze */}
          <div 
            className="podium-card third"
            onClick={() => onSelectProject(topThree[2])}
          >
            <div className="podium-crown-badge bronze">3</div>
            <div className="row-domain-tag" style={{ color: DOMAINS.find(d => d.id === topThree[2].domain)?.color }}>
              {DOMAINS.find(d => d.id === topThree[2].domain)?.name}
            </div>
            <h3 className="podium-title">{topThree[2].title}</h3>
            <p className="podium-author">
              Lead: <strong>{topThree[2].authors?.[0]?.name}</strong>
            </p>
            <div className="podium-score">
              <Heart size={14} className="fill-heart" />
              <span>{topThree[2].upvotes} Upvotes</span>
            </div>
          </div>
        </section>
      )}

      {/* Complete Rankings List */}
      <div className="leaderboard-list">
        <h3 className="leaderboard-section-title">
          Complete Innovation Leaderboard
        </h3>

        {sortedProjects.map((project, idx) => {
          const domainMeta = DOMAINS.find(d => d.id === project.domain);
          const leadAuthor = project.authors?.[0] || { name: 'Innovator', rollNo: '' };

          return (
            <div 
              key={project.id}
              className="leaderboard-row"
              onClick={() => onSelectProject(project)}
            >
              <div className="rank-col">
                <div className={`rank-badge ${idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : 'default'}`}>
                  <span>#{idx + 1}</span>
                </div>
              </div>

              <div className="project-col">
                <div className="row-domain-tag" style={{ color: domainMeta?.color }}>
                  {domainMeta?.name || project.domainLabel}
                </div>
                <h4 className="row-title">{project.title}</h4>
                <div className="row-author-meta">
                  <span 
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewAuthorProfile(leadAuthor);
                    }}
                    title="View author profile"
                  >
                    Lead: <strong>{leadAuthor.name}</strong> ({leadAuthor.rollNo})
                  </span>
                  <span>&bull;</span>
                  <span>Guide: {project.mentor}</span>
                  <span>&bull;</span>
                  <span>Batch: {leadAuthor.year || 'Final Year'}</span>
                </div>
              </div>

              <div className="stats-col">
                <div className="upvote-pill">
                  <Heart size={15} className="fill-heart" />
                  <span>{project.upvotes || 0} Upvotes</span>
                </div>
                <button 
                  type="button" 
                  className="view-btn"
                  onClick={() => onSelectProject(project)}
                >
                  <span>Details</span>
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
