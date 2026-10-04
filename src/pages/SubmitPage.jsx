import React, { useState } from 'react';
import { 
  Send, 
  ExternalLink, 
  Video, 
  FileText, 
  Sparkles, 
  Layers, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  User 
} from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { DOMAINS } from '../data/domains';

export default function SubmitPage({ 
  currentUser, 
  onAddProject, 
  onNavigateHome,
  initialDomain = 'full-stack' 
}) {
  const [formData, setFormData] = useState({
    title: '',
    domain: initialDomain,
    tagline: '',
    abstract: '',
    techStackInput: '',
    hardwareInput: '',
    featuresInput: '',
    leadName: currentUser?.name || 'Suryakanta Senapati',
    leadRollNo: currentUser?.rollNo || '2101214045',
    leadYear: currentUser?.year || '4th Year (Batch 2021-25)',
    leadBranch: currentUser?.branch || 'Electrical & Computer Engineering',
    coAuthorsInput: '',
    mentor: '',
    githubUrl: '',
    liveUrl: '',
    demoVideoUrl: '',
    docUrl: ''
  });

  const [errors, setErrors] = useState({});
  const availableDomains = DOMAINS.filter(d => d.id !== 'all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.tagline.trim()) newErrors.tagline = 'Short tagline is required';
    if (!formData.abstract.trim()) newErrors.abstract = 'Detailed abstract is required';
    if (!formData.leadName.trim()) newErrors.leadName = 'Lead student name is required';
    if (!formData.leadRollNo.trim()) newErrors.leadRollNo = 'Registration number is required';
    if (!formData.techStackInput.trim()) newErrors.techStackInput = 'At least 1 technology must be entered';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const techStack = formData.techStackInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const hardwareComponents = formData.hardwareInput
      ? formData.hardwareInput.split(',').map(h => h.trim()).filter(h => h.length > 0)
      : [];

    const keyFeatures = formData.featuresInput
      ? formData.featuresInput.split('\n').map(f => f.trim()).filter(f => f.length > 0)
      : [formData.tagline];

    const authors = [
      {
        name: formData.leadName.trim(),
        rollNo: formData.leadRollNo.trim(),
        year: formData.leadYear,
        branch: formData.leadBranch,
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      }
    ];

    if (formData.coAuthorsInput.trim()) {
      const coList = formData.coAuthorsInput.split(',').map(c => c.trim()).filter(c => c.length > 0);
      coList.forEach((co, idx) => {
        authors.push({
          name: co,
          rollNo: `Team Member ${idx + 2}`,
          year: formData.leadYear,
          branch: formData.leadBranch
        });
      });
    }

    const domainObj = availableDomains.find(d => d.id === formData.domain) || availableDomains[0];

    const newProject = {
      id: 'proj-' + Date.now(),
      title: formData.title.trim(),
      domain: formData.domain,
      domainLabel: domainObj.name,
      tagline: formData.tagline.trim(),
      abstract: formData.abstract.trim(),
      techStack,
      hardwareComponents,
      keyFeatures,
      authors,
      mentor: formData.mentor.trim() || 'ECE Faculty Council',
      githubUrl: formData.githubUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      demoVideoUrl: formData.demoVideoUrl.trim(),
      docUrl: formData.docUrl.trim(),
      upvotes: 1,
      verified: true,
      featured: false,
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted / Department Verified'
    };

    onAddProject(newProject);
    onNavigateHome();
  };

  const domainObj = availableDomains.find(d => d.id === formData.domain) || availableDomains[0];

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-row">
          <h1 className="page-title">
            <Sparkles className="text-cyan" size={32} />
            <span>Project Submission Studio</span>
          </h1>
          <div className="hero-pill-badge">
            <span>ABIT ECE Department Innovation Repository</span>
          </div>
        </div>
        <p className="page-subtitle">
          Submit your capstone, research, or hackathon innovation to the ABIT Tech Warriors catalog.
          Your project will be listed across the college portal, eligible for departmental grants and verified for campus placement tie-ups.
        </p>
      </div>

      {/* Split Studio Grid: Form (Left) + Sticky Live Card Preview (Right) */}
      <div className="submit-studio-grid">
        {/* Form Left */}
        <form className="studio-form-card" onSubmit={handleSubmit}>
          
          {/* Section 1: Domain & Identity */}
          <div className="form-section-card">
            <h4 className="form-section-title">
              <Layers size={16} className="text-cyan" />
              <span>1. Technical Domain Track &amp; Identity</span>
            </h4>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="p-domain">Selected Technical Domain <span className="req">*</span></label>
                <select 
                  id="p-domain"
                  name="domain"
                  className="form-select"
                  value={formData.domain}
                  onChange={handleChange}
                >
                  {availableDomains.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.badge})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="p-leadYear">Batch / Academic Year <span className="req">*</span></label>
                <select 
                  id="p-leadYear"
                  name="leadYear"
                  className="form-select"
                  value={formData.leadYear}
                  onChange={handleChange}
                >
                  <option value="4th Year (Batch 2021-25)">4th Year (Batch 2021-25) - Final Year</option>
                  <option value="3rd Year (Batch 2022-26)">3rd Year (Batch 2022-26)</option>
                  <option value="2nd Year (Batch 2023-27)">2nd Year (Batch 2023-27)</option>
                  <option value="1st Year (Batch 2024-28)">1st Year (Batch 2024-28)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="p-title">Project Title <span className="req">*</span></label>
              <input 
                type="text"
                id="p-title"
                name="title"
                placeholder="e.g. AI-Powered Autonomous Rover for Precision Agriculture"
                className={`form-input ${errors.title ? 'is-error' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="p-tagline">One-Line Tagline <span className="req">*</span></label>
              <input 
                type="text"
                id="p-tagline"
                name="tagline"
                placeholder="e.g. ROS2-driven autonomous wheeled rover equipped with computer vision."
                className={`form-input ${errors.tagline ? 'is-error' : ''}`}
                value={formData.tagline}
                onChange={handleChange}
              />
              {errors.tagline && <span className="error-text">{errors.tagline}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="p-abstract">Project Abstract &amp; Engineering Solution <span className="req">*</span></label>
              <textarea 
                id="p-abstract"
                name="abstract"
                rows={4}
                placeholder="Describe the engineering challenge, hardware/circuit architecture, software stack, algorithms, and experimental results..."
                className={`form-textarea ${errors.abstract ? 'is-error' : ''}`}
                value={formData.abstract}
                onChange={handleChange}
              />
              {errors.abstract && <span className="error-text">{errors.abstract}</span>}
            </div>
          </div>

          {/* Section 2: Tech Stack & Components */}
          <div className="form-section-card">
            <h4 className="form-section-title">
              <Cpu size={16} className="text-amber" />
              <span>2. Tech Stack, Libraries &amp; Hardware</span>
            </h4>

            <div className="form-group">
              <label htmlFor="p-tech">Technologies, Frameworks &amp; Tools <span className="req">*</span></label>
              <input 
                type="text"
                id="p-tech"
                name="techStackInput"
                placeholder="Comma separated: React 19, ESP32, Python, PyTorch, FreeRTOS..."
                className={`form-input ${errors.techStackInput ? 'is-error' : ''}`}
                value={formData.techStackInput}
                onChange={handleChange}
              />
              {errors.techStackInput && <span className="error-text">{errors.techStackInput}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="p-hardware">Hardware Components (Optional for IoT/Robotics/Embedded)</label>
              <input 
                type="text"
                id="p-hardware"
                name="hardwareInput"
                placeholder="Comma separated: STM32F4, RPLiDAR A1, SCT-013, Relay Board..."
                className="form-input"
                value={formData.hardwareInput}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-features">Key Highlights (One per line)</label>
              <textarea 
                id="p-features"
                name="featuresInput"
                rows={3}
                placeholder="Sub-20ms edge detection response&#10;Integrated Grafana telemetry metrics&#10;Over-the-air firmware updates"
                className="form-textarea"
                value={formData.featuresInput}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 3: Links */}
          <div className="form-section-card">
            <h4 className="form-section-title">
              <GithubIcon size={16} className="text-emerald" />
              <span>3. Code &amp; Demonstration Links</span>
            </h4>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="p-github">GitHub / GitLab Repository URL</label>
                <div className="input-with-icon">
                  <GithubIcon size={16} className="field-icon" />
                  <input 
                    type="url"
                    id="p-github"
                    name="githubUrl"
                    placeholder="https://github.com/username/project"
                    className="form-input pl-icon"
                    value={formData.githubUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="p-live">Live Demo / Prototype URL</label>
                <div className="input-with-icon">
                  <ExternalLink size={16} className="field-icon" />
                  <input 
                    type="url"
                    id="p-live"
                    name="liveUrl"
                    placeholder="https://my-project.vercel.app"
                    className="form-input pl-icon"
                    value={formData.liveUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="p-video">Demo Video Link (YouTube / Drive)</label>
                <div className="input-with-icon">
                  <Video size={16} className="field-icon" />
                  <input 
                    type="url"
                    id="p-video"
                    name="demoVideoUrl"
                    placeholder="https://youtube.com/watch?v=..."
                    className="form-input pl-icon"
                    value={formData.demoVideoUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="p-doc">Project Report / Paper Link</label>
                <div className="input-with-icon">
                  <FileText size={16} className="field-icon" />
                  <input 
                    type="url"
                    id="p-doc"
                    name="docUrl"
                    placeholder="https://drive.google.com/file/..."
                    className="form-input pl-icon"
                    value={formData.docUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Author & Guide */}
          <div className="form-section-card">
            <h4 className="form-section-title">
              <CheckCircle2 size={16} className="text-purple" />
              <span>4. Student Innovator &amp; Faculty Guide</span>
            </h4>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="p-leadName">Lead Student Name <span className="req">*</span></label>
                <input 
                  type="text"
                  id="p-leadName"
                  name="leadName"
                  placeholder="e.g. Suryakanta Senapati"
                  className={`form-input ${errors.leadName ? 'is-error' : ''}`}
                  value={formData.leadName}
                  onChange={handleChange}
                />
                {errors.leadName && <span className="error-text">{errors.leadName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="p-leadRoll">Registration / Roll Number <span className="req">*</span></label>
                <input 
                  type="text"
                  id="p-leadRoll"
                  name="leadRollNo"
                  placeholder="e.g. 2101214045"
                  className={`form-input ${errors.leadRollNo ? 'is-error' : ''}`}
                  value={formData.leadRollNo}
                  onChange={handleChange}
                />
                {errors.leadRollNo && <span className="error-text">{errors.leadRollNo}</span>}
              </div>
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="p-co">Co-Authors / Team Members (Optional)</label>
                <input 
                  type="text"
                  id="p-co"
                  name="coAuthorsInput"
                  placeholder="Comma separated: Ayush Mohapatra, Priyanshu Das..."
                  className="form-input"
                  value={formData.coAuthorsInput}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="p-mentor">Faculty Guide / Mentor</label>
                <input 
                  type="text"
                  id="p-mentor"
                  name="mentor"
                  placeholder="e.g. Dr. P. K. Rout (Prof &amp; HOD, ECE)"
                  className="form-input"
                  value={formData.mentor}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="submission-notice">
            <AlertCircle size={18} className="notice-icon" />
            <span>
              By submitting, your project will be published to the ABIT Tech Warriors portal and made available for campus placement drives and peer reviews.
            </span>
          </div>

          <button type="submit" className="auth-submit-btn">
            <Send size={16} />
            <span>Publish Project to ABIT Tech Warriors</span>
          </button>
        </form>

        {/* Sticky Live Card Preview (Right Side) */}
        <div className="studio-preview-sticky">
          <div className="preview-title-box">
            <Sparkles size={16} className="text-cyan" />
            <span>Live Catalog Card Preview</span>
          </div>

          <div 
            className="project-card is-featured"
            style={{ '--card-accent': domainObj.color }}
          >
            <div className="card-top-accent" />

            <div className="card-header">
              <span className="card-domain-badge">
                <span className="domain-bullet" />
                {domainObj.name}
              </span>
              <div className="card-badges-right">
                <span className="verified-badge">
                  <CheckCircle2 size={13} />
                  <span>ECE Verified</span>
                </span>
              </div>
            </div>

            <div className="card-body">
              <h3 className="card-title">
                {formData.title || 'Untitled Project Innovation'}
              </h3>
              <p className="card-tagline">
                {formData.tagline || 'Short summary of problem statement and engineering solution will be displayed here.'}
              </p>

              <div className="card-tech-chips">
                {(formData.techStackInput ? formData.techStackInput.split(',') : ['React', 'ESP32', 'Python']).map((t, idx) => (
                  <span key={idx} className="tech-chip">{t.trim() || 'Tech'}</span>
                ))}
              </div>

              <div className="card-meta">
                <div className="author-info">
                  <div className="author-avatar">
                    <User size={14} />
                  </div>
                  <div className="author-text">
                    <span className="author-name">{formData.leadName || 'Student Innovator'}</span>
                    <span className="author-roll">{formData.leadRollNo || '2101214XXX'} &bull; {formData.leadYear}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="footer-links">
                <span className="card-link-btn primary">
                  <ExternalLink size={16} />
                  <span>Links Ready</span>
                </span>
              </div>
              <span className="explore-btn">Preview</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
