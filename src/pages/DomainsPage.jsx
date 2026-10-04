import React from 'react';
import { 
  Grid, 
  Globe, 
  Layers, 
  Brain, 
  Radio, 
  Bot, 
  Cpu, 
  CheckCircle2, 
  Kanban, 
  Shield,
  ArrowRight,
  PlusCircle
} from 'lucide-react';
import { DOMAINS } from '../data/domains';

const iconMap = {
  Grid,
  Globe,
  Layers,
  Brain,
  Radio,
  Bot,
  Cpu,
  CheckCircle2,
  Kanban,
  Shield
};

export default function DomainsPage({ 
  projectCounts, 
  onSelectDomainAndGoHome, 
  onOpenSubmitWithDomain 
}) {
  const domainsList = DOMAINS.filter(d => d.id !== 'all');

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-row">
          <h1 className="page-title">
            <Layers className="text-cyan" size={32} />
            <span>Technical Domains Explorer</span>
          </h1>
          <div className="hero-pill-badge">
            <span>ECE Department Specialization Tracks</span>
          </div>
        </div>
        <p className="page-subtitle">
          Explore specialized engineering domains cultivated by the Department of Electrical &amp; Computer Engineering.
          Students build cross-disciplinary projects from low-level silicon firmware up to enterprise full-stack cloud and AI architectures.
        </p>
      </div>

      {/* Domains Grid */}
      <div className="domains-page-grid">
        {domainsList.map((domain) => {
          const IconComponent = iconMap[domain.icon] || Grid;
          const count = projectCounts[domain.id] || 0;

          return (
            <div 
              key={domain.id} 
              className="domain-explorer-card"
              style={{ '--domain-color': domain.color }}
            >
              <div className="domain-card-accent-bar" />

              <div>
                <div className="domain-explorer-header">
                  <div className="domain-icon-box">
                    <IconComponent size={24} />
                  </div>
                  <span className="domain-badge-pill">{domain.badge}</span>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <h3 className="domain-explorer-title">{domain.name}</h3>
                  <p className="domain-explorer-desc" style={{ marginTop: '8px' }}>
                    {domain.description}
                  </p>
                </div>
              </div>

              <div className="domain-explorer-footer">
                <div className="domain-count-badge">
                  <span>{count} Live Innovation{count === 1 ? '' : 's'}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    className="domain-view-btn"
                    onClick={() => onSelectDomainAndGoHome(domain.id)}
                    title={`View ${domain.name} projects`}
                  >
                    <span>Browse</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    type="button" 
                    className="domain-view-btn"
                    onClick={() => onOpenSubmitWithDomain(domain.id)}
                    title={`Submit project in ${domain.name}`}
                  >
                    <PlusCircle size={14} />
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
