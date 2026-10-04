import React from 'react';
import { ExternalLink, Mail, MapPin, Shield } from 'lucide-react';
import AbitLogo from './AbitLogo';

export default function Footer({ 
  setActivePage,
  onOpenSubmit, 
  onOpenLeaderboard,
  onScrollToSection
}) {
  const handleNav = (pageName) => {
    if (setActivePage) {
      setActivePage(pageName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-glow" />
      <div className="footer-container">
        
        {/* Col 1: Brand & Department */}
        <div className="footer-col brand-col">
          <div className="footer-brand" style={{ cursor: 'pointer' }} onClick={() => handleNav('home')}>
            <AbitLogo size={38} showText={false} />
            <div>
              <div className="footer-brand-title">AJAY BINAY INSTITUTE OF TECHNOLOGY</div>
              <div className="footer-brand-sub">Dept of Electrical &amp; Computer Engg</div>
            </div>
          </div>
          <p className="footer-desc">
            Official Innovation, Recruitment &amp; Placement Tie-Up Portal of Ajay Binay Institute of Technology, Cuttack. 
            Empowering students to design, develop, and showcase verifiable engineering solutions.
          </p>
          <div className="footer-accreditation">
            <span>Approved by AICTE &bull; Affiliated to BPUT, Odisha &bull; NAAC Accredited</span>
          </div>
        </div>

        {/* Col 2: Three Panels & Governance */}
        <div className="footer-col">
          <h4 className="footer-heading">Portals &amp; Panels</h4>
          <ul className="footer-links-list clickable">
            <li>
              <button type="button" onClick={() => handleNav('governance')}>
                Admin Governance Panel
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('governance')}>
                Corporate Recruiter Workspace
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('governance')}>
                Enrolled Student Login
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('governance')}>
                Activate Existing Student Account
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('governance')}>
                New User Registration
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Portal Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links-list clickable">
            <li>
              <button type="button" onClick={() => handleNav('showcase')}>
                Showcase Innovations
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('domains')}>
                Domains Explorer
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('placement')}>
                Placement Tie-Up Portal
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('leaderboard')}>
                Warriors Hall of Fame
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNav('submit')}>
                Submit Project
              </button>
            </li>
            <li>
              <a href="https://abit.edu.in" target="_blank" rel="noopener noreferrer">
                Official ABIT Website <ExternalLink size={12} />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Campus Address & Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Department Campus</h4>
          <div className="contact-item">
            <MapPin size={16} className="contact-icon text-cyan" />
            <span>Ajay Binay Institute of Technology, Sector 1, CDA, Markat Nagar, Cuttack, Odisha - 753014</span>
          </div>
          <div className="contact-item">
            <Mail size={16} className="contact-icon text-amber" />
            <span>ece.techwarriors@abit.edu.in &bull; placement@abit.edu.in</span>
          </div>
          <div className="contact-item">
            <Shield size={16} className="contact-icon text-emerald" />
            <span>Industry Tie-Up &amp; Placement Cell</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Ajay Binay Institute of Technology (ABIT), Cuttack. All rights reserved. 
            NAAC Accredited Institution.
          </p>
          <div className="made-with">
            <span>ABIT Placement &amp; Innovation Cell</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
