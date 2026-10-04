import React, { useState } from 'react';
import { 
  X, 
  Send, 
  ExternalLink, 
  Video, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Cpu 
} from 'lucide-react';
import GithubIcon from './GithubIcon';
import { DOMAINS } from '../data/domains';

export default function SubmitModal({ onClose, onAddProject, currentUser }) {
  const [formData, setFormData] = useState({
    title: '',
    domain: 'full-stack',
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
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'preview'

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
    if (!formData.leadRollNo.trim()) newErrors.leadRollNo = 'Registration/Roll number is required';
    if (!formData.techStackInput.trim()) newErrors.techStackInput = 'At least 1 technology or tool must be specified';
    
    // Optional URL validation if entered
    if (formData.githubUrl && !formData.githubUrl.startsWith('http')) {
      newErrors.githubUrl = 'URL must start with http:// or https://';
    }
    if (formData.liveUrl && !formData.liveUrl.startsWith('http')) {
      newErrors.liveUrl = 'URL must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse tech stack chips
    const techStack = formData.techStackInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Parse hardware components
    const hardwareComponents = formData.hardwareInput
      ? formData.hardwareInput.split(',').map(h => h.trim()).filter(h => h.length > 0)
      : [];

    // Parse key features
    const keyFeatures = formData.featuresInput
      ? formData.featuresInput.split('\n').map(f => f.trim()).filter(f => f.length > 0)
      : [formData.tagline];

    // Build authors list
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
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content submit-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-brand">
            <div className="submit-sparkle-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="submit-modal-title">Submit ECE Student Project</h2>
              <span className="submit-modal-sub">
                ABIT Tech Warriors Innovation Repository &bull; Dept of Electrical &amp; Computer Engg
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

        {/* Tab Switcher */}
        <div className="submit-tab-switcher">
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            1. Project Details &amp; Links
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            2. Live Card Preview
          </button>
        </div>

        {/* Form Tab */}
        {activeTab === 'form' ? (
          <form className="submit-form-scroll" onSubmit={handleSubmit}>
            
            {/* Section 1: Domain & Identity */}
            <div className="form-section-card">
              <h4 className="form-section-title">
                <Layers size={16} className="text-cyan" />
                <span>1. Core Domain Track &amp; Identity</span>
              </h4>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="domain">
                    Selected Technical Domain <span className="req">*</span>
                  </label>
                  <select 
                    id="domain"
                    name="domain"
                    className="form-select"
                    value={formData.domain}
                    onChange={handleChange}
                  >
                    {availableDomains.map((dom) => (
                      <option key={dom.id} value={dom.id}>
                        {dom.name} ({dom.badge})
                      </option>
                    ))}
                  </select>
                  <span className="form-hint">Choose the primary field your project belongs to</span>
                </div>

                <div className="form-group">
                  <label htmlFor="leadYear">
                    Student Academic Year / Batch <span className="req">*</span>
                  </label>
                  <select 
                    id="leadYear"
                    name="leadYear"
                    className="form-select"
                    value={formData.leadYear}
                    onChange={handleChange}
                  >
                    <option value="4th Year (Batch 2021-25)">4th Year (Batch 2021-25) - Final Year</option>
                    <option value="3rd Year (Batch 2022-26)">3rd Year (Batch 2022-26)</option>
                    <option value="2nd Year (Batch 2023-27)">2nd Year (Batch 2023-27)</option>
                    <option value="1st Year (Batch 2024-28)">1st Year (Batch 2024-28)</option>
                    <option value="M.Tech / Research Scholar">M.Tech / Research Scholar</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  Project Title <span className="req">*</span>
                </label>
                <input 
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Autonomous Smart Irrigation &amp; Soil Telemetry System"
                  className={`form-input ${errors.title ? 'is-error' : ''}`}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tagline">
                  One-Line Tagline / Summary <span className="req">*</span>
                </label>
                <input 
                  type="text"
                  id="tagline"
                  name="tagline"
                  placeholder="e.g. Edge ESP32 device detecting soil moisture anomalies with LoRa wireless telemetry."
                  className={`form-input ${errors.tagline ? 'is-error' : ''}`}
                  value={formData.tagline}
                  onChange={handleChange}
                />
                {errors.tagline && <span className="error-text">{errors.tagline}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="abstract">
                  Comprehensive Project Abstract &amp; Solution <span className="req">*</span>
                </label>
                <textarea 
                  id="abstract"
                  name="abstract"
                  rows={4}
                  placeholder="Describe the engineering challenge, circuit/architecture design, methodology, algorithms, and experimental results..."
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
                <label htmlFor="techStackInput">
                  Technologies, Frameworks &amp; Tools <span className="req">*</span>
                </label>
                <input 
                  type="text"
                  id="techStackInput"
                  name="techStackInput"
                  placeholder="Comma separated: React 19, ESP32, Python, PyTorch, FreeRTOS, MQTT..."
                  className={`form-input ${errors.techStackInput ? 'is-error' : ''}`}
                  value={formData.techStackInput}
                  onChange={handleChange}
                />
                {errors.techStackInput && <span className="error-text">{errors.techStackInput}</span>}
                <span className="form-hint">Separate multiple technologies with commas</span>
              </div>

              <div className="form-group">
                <label htmlFor="hardwareInput">
                  Hardware Components &amp; Microcontrollers (Optional for Hardware/IoT/Robotics)
                </label>
                <input 
                  type="text"
                  id="hardwareInput"
                  name="hardwareInput"
                  placeholder="Comma separated: STM32F4, RPLiDAR A1, SCT-013, Raspberry Pi 4, Relay Board..."
                  className="form-input"
                  value={formData.hardwareInput}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="featuresInput">
                  Key Features / Capabilities (One per line)
                </label>
                <textarea 
                  id="featuresInput"
                  name="featuresInput"
                  rows={3}
                  placeholder="Sub-20ms edge detection response&#10;Integrated Grafana telemetry metrics&#10;Over-the-air firmware updates"
                  className="form-textarea"
                  value={formData.featuresInput}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Section 3: Project Links */}
            <div className="form-section-card">
              <h4 className="form-section-title">
                <GithubIcon size={16} className="text-emerald" />
                <span>3. Code &amp; Demonstration Links</span>
              </h4>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="githubUrl">
                    GitHub / GitLab Repository URL
                  </label>
                  <div className="input-with-icon">
                    <GithubIcon size={16} className="field-icon" />
                    <input 
                      type="url"
                      id="githubUrl"
                      name="githubUrl"
                      placeholder="https://github.com/username/project-repo"
                      className={`form-input pl-icon ${errors.githubUrl ? 'is-error' : ''}`}
                      value={formData.githubUrl}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.githubUrl && <span className="error-text">{errors.githubUrl}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="liveUrl">
                    Live Demo / Simulation / Web Link
                  </label>
                  <div className="input-with-icon">
                    <ExternalLink size={16} className="field-icon" />
                    <input 
                      type="url"
                      id="liveUrl"
                      name="liveUrl"
                      placeholder="https://my-project.vercel.app"
                      className={`form-input pl-icon ${errors.liveUrl ? 'is-error' : ''}`}
                      value={formData.liveUrl}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.liveUrl && <span className="error-text">{errors.liveUrl}</span>}
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="demoVideoUrl">
                    Demo Video Link (YouTube / Drive)
                  </label>
                  <div className="input-with-icon">
                    <Video size={16} className="field-icon" />
                    <input 
                      type="url"
                      id="demoVideoUrl"
                      name="demoVideoUrl"
                      placeholder="https://youtube.com/watch?v=..."
                      className="form-input pl-icon"
                      value={formData.demoVideoUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="docUrl">
                    Documentation / Report Drive Link
                  </label>
                  <div className="input-with-icon">
                    <FileText size={16} className="field-icon" />
                    <input 
                      type="url"
                      id="docUrl"
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

            {/* Section 4: Author & Faculty Guide */}
            <div className="form-section-card">
              <h4 className="form-section-title">
                <CheckCircle2 size={16} className="text-purple" />
                <span>4. Student Innovator &amp; Faculty Guide</span>
              </h4>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="leadName">
                    Lead Student Name <span className="req">*</span>
                  </label>
                  <input 
                    type="text"
                    id="leadName"
                    name="leadName"
                    placeholder="e.g. Suryakanta Senapati"
                    className={`form-input ${errors.leadName ? 'is-error' : ''}`}
                    value={formData.leadName}
                    onChange={handleChange}
                  />
                  {errors.leadName && <span className="error-text">{errors.leadName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="leadRollNo">
                    Registration / Roll Number <span className="req">*</span>
                  </label>
                  <input 
                    type="text"
                    id="leadRollNo"
                    name="leadRollNo"
                    placeholder="e.g. 2101214018"
                    className={`form-input ${errors.leadRollNo ? 'is-error' : ''}`}
                    value={formData.leadRollNo}
                    onChange={handleChange}
                  />
                  {errors.leadRollNo && <span className="error-text">{errors.leadRollNo}</span>}
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="coAuthorsInput">
                    Co-Authors / Team Members (Optional)
                  </label>
                  <input 
                    type="text"
                    id="coAuthorsInput"
                    name="coAuthorsInput"
                    placeholder="Comma separated: Soumya Mohanty, Rakesh Sahoo..."
                    className="form-input"
                    value={formData.coAuthorsInput}
                    onChange={handleChange}
                  />
                  <span className="form-hint">Separate student names by commas</span>
                </div>

                <div className="form-group">
                  <label htmlFor="mentor">
                    Faculty Guide / Supervising Professor
                  </label>
                  <input 
                    type="text"
                    id="mentor"
                    name="mentor"
                    placeholder="e.g. Dr. P. K. Rout (Prof &amp; HOD, ECE)"
                    className="form-input"
                    value={formData.mentor}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Department Submission Note */}
            <div className="submission-notice">
              <AlertCircle size={18} className="notice-icon" />
              <span>
                By submitting, your project will be published to the ABIT Tech Warriors portal and made available for campus placement drives and peer reviews.
              </span>
            </div>

            {/* Submit Action Buttons */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="modal-btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button 
                type="submit" 
                className="modal-btn-primary"
              >
                <Send size={16} />
                <span>Publish Project to Warriors</span>
              </button>
            </div>
          </form>
        ) : (
          /* Preview Tab */
          <div className="preview-container">
            <div className="preview-banner">
              <span>This is how your project card will appear in the ABIT Tech Warriors catalog:</span>
            </div>

            <div className="preview-card-wrap">
              <div className="project-card is-featured" style={{ '--card-accent': '#00D2FF' }}>
                <div className="card-top-accent" />
                <div className="card-header">
                  <span className="card-domain-badge">
                    <span className="domain-bullet" />
                    {availableDomains.find(d => d.id === formData.domain)?.name || 'Domain'}
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
                    {formData.title || 'Untitled Innovation Project'}
                  </h3>
                  <p className="card-tagline">
                    {formData.tagline || 'Short summary of the problem and engineering solution will appear here.'}
                  </p>

                  <div className="card-tech-chips">
                    {(formData.techStackInput ? formData.techStackInput.split(',') : ['React', 'ESP32', 'AI']).map((t, i) => (
                      <span key={i} className="tech-chip">{t.trim() || 'Tech'}</span>
                    ))}
                  </div>

                  <div className="card-meta">
                    <div className="author-info">
                      <div className="author-text">
                        <span className="author-name">{formData.leadName || 'Student Name'}</span>
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
                  <div className="footer-interactions">
                    <span className="explore-btn">Preview</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="modal-btn-secondary"
                onClick={() => setActiveTab('form')}
              >
                Back to Edit
              </button>

              <button 
                type="button" 
                className="modal-btn-primary"
                onClick={handleSubmit}
              >
                <Send size={16} />
                <span>Confirm &amp; Submit</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
