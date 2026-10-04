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
  Shield 
} from 'lucide-react';
import { DOMAINS } from '../data/domains';

const iconMap = {
  Grid: Grid,
  Globe: Globe,
  Layers: Layers,
  Brain: Brain,
  Radio: Radio,
  Bot: Bot,
  Cpu: Cpu,
  CheckCircle2: CheckCircle2,
  Kanban: Kanban,
  Shield: Shield
};

export default function DomainFilter({ 
  selectedDomain, 
  onSelectDomain, 
  projectCounts 
}) {
  return (
    <div className="domain-filter-section">
      <div className="domain-filter-header">
        <div className="domain-filter-title">
          <span>Filter by Technical Domain</span>
          <span className="domain-filter-sub">Select a track to narrow down student innovations</span>
        </div>
      </div>

      <div className="domain-pills-container">
        {DOMAINS.map((domain) => {
          const IconComponent = iconMap[domain.icon] || Grid;
          const isSelected = selectedDomain === domain.id;
          const count = projectCounts[domain.id] || 0;

          return (
            <button
              key={domain.id}
              type="button"
              className={`domain-pill ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectDomain(domain.id)}
              style={{
                '--domain-accent': domain.color
              }}
            >
              <div className="pill-icon-wrapper">
                <IconComponent size={16} />
              </div>
              <span className="pill-name">{domain.name}</span>
              <span className="pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
