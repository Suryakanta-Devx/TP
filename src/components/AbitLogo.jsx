import React from 'react';
import abitLogoImg from '../assets/AbitLogo.png';

/**
 * Official ABIT Institutional Logo
 * Uses the user-provided AbitLogo.png asset
 * Ajay Binay Institute of Technology - Cuttack, Odisha
 * Dept of Electrical & Computer Engineering
 */
export default function AbitLogo({ size = 44, className = '', showText = false, textVariant = 'full', alt = 'ABIT Logo' }) {
  return (
    <div className={`abit-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <img 
        src={abitLogoImg} 
        alt={alt}
        className="abit-crest-img"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          objectFit: 'contain',
          flexShrink: 0
        }}
      />

      {showText && (
        <div className="abit-brand-text-block">
          <div className="abit-inst-name" style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', color: '#1E3A8A', textTransform: 'uppercase' }}>
            AJAY BINAY INSTITUTE OF TECHNOLOGY
          </div>
          {textVariant === 'full' && (
            <>
              <div className="abit-dept-label" style={{ fontSize: '11px', fontWeight: 600, color: '#0284C7' }}>
                Dept of Electrical &amp; Computer Engineering
              </div>
              <div className="abit-portal-sub" style={{ fontSize: '10px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Training, Placement &amp; Innovation Cell &bull; Cuttack
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
