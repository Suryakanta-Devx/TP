import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  UserPlus, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Power, 
  Building2, 
  GraduationCap, 
  FileText, 
  Check, 
  X, 
  ExternalLink, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Key, 
  Eye, 
  ArrowRight,
  Filter,
  RefreshCw,
  Award,
  AlertCircle
} from 'lucide-react';
import { PRE_REGISTERED_STUDENTS } from '../data/portalData';
import AdminLockGate from './AdminLockGate';

export default function ThreePanelsHub({
  recruitmentDrives,
  setRecruitmentDrives,
  placements,
  setPlacements,
  jobSeekers,
  setJobSeekers,
  companies,
  setCompanies,
  currentUser,
  setCurrentUser,
  showToast,
  onViewProject
}) {
  // Main Top-level View: 'login-panels' | 'signup' | 'existing-register'
  const [hubTab, setHubTab] = useState('login-panels');

  // Sub-panel under 'login-panels': 'admin' | 'recruiter' | 'user'
  const [activePanel, setActivePanel] = useState('admin');

  // Admin Security Lock & Audit Session State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminSession, setAdminSession] = useState(null);

  // Admin sub-modules: 'recruitment' | 'placement' | 'jobseekers' | 'companies'
  const [adminModule, setAdminModule] = useState('recruitment');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilter, setAdminFilter] = useState('all'); // 'all' | 'verified' | 'enabled' | 'disabled'

  // Admin Modals for Add/Edit
  const [editingItem, setEditingItem] = useState(null); // { type, item }
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalType, setAddModalType] = useState('recruitment'); // 'recruitment' | 'placement' | 'jobseekers' | 'companies'

  // Recruiter States
  const [selectedRecruiterCompany, setSelectedRecruiterCompany] = useState('Tata Consultancy Services (TCS)');
  const [recruiterCandidateFilter, setRecruiterCandidateFilter] = useState('all');
  const [recruiterCandidateSearch, setRecruiterCandidateSearch] = useState('');

  // Existing User Registration States
  const [existingRollLookup, setExistingRollLookup] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [existingPassword, setExistingPassword] = useState('');
  const [existingPhone, setExistingPhone] = useState('');

  // Signup Form States
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    role: 'student', // 'student' | 'recruiter' | 'admin'
    rollNo: '',
    phone: '',
    password: '',
    branch: 'Electrical & Computer Engineering',
    domain: 'Full Stack Development'
  });

  // User Profile Edit States (for Student Login Panel)
  const [userProfileData, setUserProfileData] = useState({
    name: currentUser?.name || 'Suryakanta Senapati',
    email: currentUser?.email || 'suryakanta.21ece@abit.edu.in',
    phone: '+91 98610 23451',
    rollNo: currentUser?.rollNo || '2101214045',
    branch: currentUser?.branch || 'Electrical & Computer Engineering',
    year: currentUser?.year || '4th Year (Batch 2021-25)',
    cgpa: '9.24',
    bio: currentUser?.bio || 'Passionate Full Stack engineer & Deep Learning researcher at ABIT ECE.',
    skills: currentUser?.skills || ['React 19', 'FastAPI', 'PyTorch', 'Node.js', 'PostgreSQL'],
    newSkillInput: '',
    resumeUrl: 'https://abit.edu.in/resumes/2101214045.pdf',
    github: currentUser?.github || 'https://github.com/suryakanta-senapati',
    linkedin: currentUser?.linkedin || 'https://linkedin.com/in/suryakanta-senapati',
    preferredRole: 'Full Stack Developer / AI Engineer',
    expectedCtc: '8.0 - 12.0 LPA',
    preferredLocation: 'Bhubaneswar / Bengaluru / Hyderabad'
  });

  // Sync userProfileData when currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setUserProfileData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        rollNo: currentUser.rollNo || prev.rollNo,
        bio: currentUser.bio || prev.bio,
        skills: currentUser.skills || prev.skills,
        github: currentUser.github || prev.github,
        linkedin: currentUser.linkedin || prev.linkedin
      }));
    }
  }, [currentUser]);

  /* =========================================================================
     ADMIN PANEL ACTIONS (VERIFY, ENABLE/DISABLE, DELETE, UPDATE, ADD)
     ========================================================================= */

  // 1. Toggle Verify
  const handleToggleVerify = (type, id) => {
    if (type === 'recruitment') {
      setRecruitmentDrives(prev => prev.map(item => 
        item.id === id ? { ...item, verified: !item.verified } : item
      ));
      showToast('Recruitment Drive verification status updated!');
    } else if (type === 'placement') {
      setPlacements(prev => prev.map(item => 
        item.id === id ? { ...item, offerVerified: !item.offerVerified } : item
      ));
      showToast('Placement offer verification status updated!');
    } else if (type === 'jobseekers') {
      setJobSeekers(prev => prev.map(item => 
        item.id === id ? { ...item, verified: !item.verified } : item
      ));
      showToast('Job Seeker profile verification status updated!');
    } else if (type === 'companies') {
      setCompanies(prev => prev.map(item => 
        item.id === id ? { ...item, verified: !item.verified } : item
      ));
      showToast('Company partnership verification updated!');
    }
  };

  // 2. Toggle Enable / Disable
  const handleToggleEnable = (type, id) => {
    if (type === 'recruitment') {
      setRecruitmentDrives(prev => prev.map(item => 
        item.id === id ? { ...item, status: item.status === 'active' ? 'disabled' : 'active' } : item
      ));
      showToast('Recruitment Drive status toggled (Active / Disabled)!');
    } else if (type === 'placement') {
      setPlacements(prev => prev.map(item => 
        item.id === id ? { ...item, status: item.status === 'active' ? 'disabled' : 'active' } : item
      ));
      showToast('Placement record status toggled (Active / Disabled)!');
    } else if (type === 'jobseekers') {
      setJobSeekers(prev => prev.map(item => 
        item.id === id ? { ...item, status: item.status === 'active' ? 'disabled' : 'active' } : item
      ));
      showToast('Job Seeker candidate status toggled (Active / Disabled)!');
    } else if (type === 'companies') {
      setCompanies(prev => prev.map(item => 
        item.id === id ? { ...item, status: item.status === 'active' ? 'disabled' : 'active' } : item
      ));
      showToast('Company tie-up status toggled (Active / Disabled)!');
    }
  };

  // 3. Delete Item
  const handleDeleteItem = (type, id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name || id}"?`)) {
      if (type === 'recruitment') {
        setRecruitmentDrives(prev => prev.filter(item => item.id !== id));
      } else if (type === 'placement') {
        setPlacements(prev => prev.filter(item => item.id !== id));
      } else if (type === 'jobseekers') {
        setJobSeekers(prev => prev.filter(item => item.id !== id));
      } else if (type === 'companies') {
        setCompanies(prev => prev.filter(item => item.id !== id));
      }
      showToast(`Deleted ${name || id} successfully!`);
    }
  };

  // 4. Save Edited Item
  const handleSaveEdit = (updatedItem) => {
    const { type } = editingItem;
    if (type === 'recruitment') {
      setRecruitmentDrives(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    } else if (type === 'placement') {
      setPlacements(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    } else if (type === 'jobseekers') {
      setJobSeekers(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    } else if (type === 'companies') {
      setCompanies(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    }
    setEditingItem(null);
    showToast('Record updated successfully by Admin!');
  };

  // 5. Add New Item
  const handleAddNewItem = (newItem) => {
    const id = `${addModalType.substring(0, 3)}-${Date.now()}`;
    const preparedItem = { ...newItem, id, status: 'active', verified: true };
    if (addModalType === 'recruitment') {
      setRecruitmentDrives(prev => [preparedItem, ...prev]);
    } else if (addModalType === 'placement') {
      setPlacements(prev => [preparedItem, ...prev]);
    } else if (addModalType === 'jobseekers') {
      setJobSeekers(prev => [preparedItem, ...prev]);
    } else if (addModalType === 'companies') {
      setCompanies(prev => [preparedItem, ...prev]);
    }
    setIsAddModalOpen(false);
    showToast(`New ${addModalType} record added successfully!`);
  };

  /* =========================================================================
     RECRUITER PANEL ACTIONS
     ========================================================================= */
  const handleUpdateCandidateStage = (candidateId, newStage) => {
    setJobSeekers(prev => prev.map(c => 
      c.id === candidateId ? { ...c, placementStatus: newStage } : c
    ));
    showToast(`Candidate status updated to: "${newStage}"`);
  };

  const handleVerifyCandidate = (candidateId) => {
    setJobSeekers(prev => prev.map(c => 
      c.id === candidateId ? { ...c, verified: true } : c
    ));
    showToast('Candidate verified by Recruiter!');
  };

  /* =========================================================================
     USER PROFILE PANEL ACTIONS (STUDENT UPDATE)
     ========================================================================= */
  const handleSaveUserProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      name: userProfileData.name,
      email: userProfileData.email,
      rollNo: userProfileData.rollNo,
      branch: userProfileData.branch,
      year: userProfileData.year,
      bio: userProfileData.bio,
      skills: userProfileData.skills,
      github: userProfileData.github,
      linkedin: userProfileData.linkedin
    };
    setCurrentUser(updatedUser);

    // Also update in jobSeekers list if matching rollNo
    setJobSeekers(prev => prev.map(s => 
      s.rollNo === userProfileData.rollNo ? {
        ...s,
        name: userProfileData.name,
        email: userProfileData.email,
        phone: userProfileData.phone,
        bio: userProfileData.bio,
        skills: userProfileData.skills
      } : s
    ));

    showToast('Your official ABIT student profile has been verified & updated!');
  };

  const handleAddSkill = () => {
    if (userProfileData.newSkillInput.trim() && !userProfileData.skills.includes(userProfileData.newSkillInput.trim())) {
      setUserProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkillInput.trim()],
        newSkillInput: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setUserProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  /* =========================================================================
     EXISTING USER REGISTRATION LOOKUP & ACTIVATION
     ========================================================================= */
  const handleExistingRollLookup = (e) => {
    e.preventDefault();
    setLookupError('');
    setLookupResult(null);

    const q = existingRollLookup.trim();
    if (!q) {
      setLookupError('Please enter a valid college registration roll number');
      return;
    }

    // Check PRE_REGISTERED_STUDENTS list
    const found = PRE_REGISTERED_STUDENTS.find(s => s.rollNo === q || s.regNo === q);
    if (found) {
      setLookupResult(found);
      setExistingPhone(found.phone || '');
    } else {
      // Check in initial job seekers
      const foundInJobSeekers = jobSeekers.find(s => s.rollNo === q);
      if (foundInJobSeekers) {
        setLookupResult({
          rollNo: foundInJobSeekers.rollNo,
          regNo: foundInJobSeekers.rollNo,
          name: foundInJobSeekers.name,
          branch: foundInJobSeekers.branch,
          year: foundInJobSeekers.year,
          collegeEmail: foundInJobSeekers.email,
          cgpa: foundInJobSeekers.cgpa,
          phone: foundInJobSeekers.phone,
          isActivated: false,
          orgVerificationSeal: `ABIT-ECE-REG-${foundInJobSeekers.rollNo}`
        });
        setExistingPhone(foundInJobSeekers.phone || '');
      } else {
        setLookupError(`Roll Number "${q}" not found in current pre-enrolled records. Check with ABIT ECE department office or use Signup.`);
      }
    }
  };

  const handleCompleteExistingActivation = (e) => {
    e.preventDefault();
    if (!existingPassword) {
      showToast('Please set your portal password');
      return;
    }

    const activatedUser = {
      id: `user-${lookupResult.rollNo}`,
      name: lookupResult.name,
      email: lookupResult.collegeEmail,
      rollNo: lookupResult.rollNo,
      regNo: lookupResult.rollNo,
      branch: lookupResult.branch,
      year: lookupResult.year,
      cgpa: lookupResult.cgpa,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: `Verified student registered by ABIT Department of Electrical & Computer Engineering. CGPA: ${lookupResult.cgpa}`,
      skills: ['Full Stack', 'AI/ML', 'Embedded Systems'],
      role: 'Registered Tech Warrior'
    };

    setCurrentUser(activatedUser);
    showToast(`Account successfully activated for ${lookupResult.name}! Redirecting to User Profile...`);
    setHubTab('login-panels');
    setActivePanel('user');
  };

  /* =========================================================================
     SIGNUP FORM ACTION
     ========================================================================= */
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      showToast('Please fill all required fields');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: signupData.name,
      email: signupData.email,
      rollNo: signupData.rollNo || `2301214${Math.floor(1000 + Math.random() * 9000)}`,
      branch: signupData.branch,
      year: 'Academic Batch 2021-25',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: `Student Innovator in ${signupData.domain}. Registered through ABIT Portal.`,
      skills: [signupData.domain, 'React', 'Problem Solving'],
      role: signupData.role === 'recruiter' ? 'Corporate Recruiter' : signupData.role === 'admin' ? 'Administrator' : 'Student Warrior'
    };

    setCurrentUser(newUser);
    showToast(`Account successfully created for ${signupData.name}! Welcome to ABIT Portal.`);
    setHubTab('login-panels');
    if (signupData.role === 'admin') setActivePanel('admin');
    else if (signupData.role === 'recruiter') setActivePanel('recruiter');
    else setActivePanel('user');
  };

  return (
    <div className="three-panels-hub-wrapper" id="three-panels">
      {/* HUB HEADER & NAVIGATION TABS */}
      <div className="panels-hub-header">
        <div className="hub-header-badge">
          <Sparkles size={14} className="text-blue" />
          <span>ABIT Integrated Portal Management &bull; 3 Panels Hub</span>
        </div>
        <h2 className="hub-title">
          Institutional Governance &amp; Access Center
        </h2>
        <p className="hub-subtitle">
          Seamless single-page management for Administration, Corporate Recruiters, and Registered Students of Ajay Binay Institute of Technology.
        </p>

        {/* PRIMARY 3 TABS: 1. Login Panels (Admin, Recruiter, User) | 2. Signup | 3. Existing User Register */}
        <div className="hub-primary-nav">
          <button 
            type="button"
            className={`hub-nav-btn ${hubTab === 'login-panels' ? 'active' : ''}`}
            onClick={() => setHubTab('login-panels')}
          >
            <ShieldCheck size={18} />
            <span>1. Login &amp; Three Panels</span>
            <span className="hub-count-chip">3 Panels</span>
          </button>

          <button 
            type="button"
            className={`hub-nav-btn ${hubTab === 'signup' ? 'active' : ''}`}
            onClick={() => setHubTab('signup')}
          >
            <UserPlus size={18} />
            <span>2. Sign Up</span>
          </button>

          <button 
            type="button"
            className={`hub-nav-btn ${hubTab === 'existing-register' ? 'active' : ''}`}
            onClick={() => setHubTab('existing-register')}
          >
            <GraduationCap size={18} />
            <span>3. Register for Existing Users</span>
            <span className="hub-badge-pill">College Roll No</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: THREE PANELS (ADMIN, RECRUITER, USER LOGIN)
          ===================================================================== */}
      {hubTab === 'login-panels' && (
        <div className="panels-view-container animate-fade-in">
          {/* THREE SUB-PANEL SELECTOR BUTTONS */}
          <div className="three-subpanels-bar">
            <button 
              type="button"
              className={`subpanel-toggle-btn ${activePanel === 'admin' ? 'active admin-active' : ''}`}
              onClick={() => setActivePanel('admin')}
            >
              <div className="subpanel-btn-icon admin-bg">
                {isAdminUnlocked ? <ShieldCheck size={20} /> : <Lock size={20} />}
              </div>
              <div className="subpanel-btn-text">
                <span className="subpanel-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Admin Panel</span>
                  {!isAdminUnlocked ? (
                    <span style={{ fontSize: '10px', background: '#EF4444', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>LOCKED</span>
                  ) : (
                    <span style={{ fontSize: '10px', background: '#10B981', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>ACTIVE</span>
                  )}
                </span>
                <span className="subpanel-hint">
                  {isAdminUnlocked ? 'Authenticated with Photo Audit' : 'Password & Automated Photo Audit'}
                </span>
              </div>
            </button>

            <button 
              type="button"
              className={`subpanel-toggle-btn ${activePanel === 'recruiter' ? 'active recruiter-active' : ''}`}
              onClick={() => setActivePanel('recruiter')}
            >
              <div className="subpanel-btn-icon recruiter-bg">
                <Briefcase size={20} />
              </div>
              <div className="subpanel-btn-text">
                <span className="subpanel-name">Recruiter Panel</span>
                <span className="subpanel-hint">Talent Pool, Postings &amp; Updates</span>
              </div>
            </button>

            <button 
              type="button"
              className={`subpanel-toggle-btn ${activePanel === 'user' ? 'active user-active' : ''}`}
              onClick={() => setActivePanel('user')}
            >
              <div className="subpanel-btn-icon user-bg">
                <UserCheck size={20} />
              </div>
              <div className="subpanel-btn-text">
                <span className="subpanel-name">User Login</span>
                <span className="subpanel-hint">Enrolled Student Profile &amp; Verify</span>
              </div>
            </button>
          </div>

          {/* -----------------------------------------------------------------
              SUBPANEL A: ADMIN PANEL (LOCKED BEHIND ENCRYPTED PASSWORD & AUTOMATED PHOTO CAPTURE)
              ----------------------------------------------------------------- */}
          {activePanel === 'admin' && !isAdminUnlocked && (
            <AdminLockGate 
              onUnlock={(session) => {
                setIsAdminUnlocked(true);
                setAdminSession(session);
                showToast(`Admin Authorized! Photo captured at ${session.timestamp}`);
              }}
            />
          )}

          {activePanel === 'admin' && isAdminUnlocked && (
            <div className="panel-card admin-panel-card animate-fade-in">
              {/* Authorized Admin Security Audit Session Bar */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(37, 99, 235, 0.06) 100%)',
                borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Automated Captured Photo */}
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={adminSession?.photoUrl} 
                      alt="Authorized Admin Audit" 
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #10B981',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#10B981',
                      border: '2px solid #FFFFFF'
                    }} title="Verified Security Session" />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Administrator: {adminSession?.loginId}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        background: 'rgba(5, 150, 105, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <CheckCircle size={12} /> Photo Verified &amp; Audit Logged
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Automated audit photo logged at <strong style={{ color: '#0F172A' }}>{adminSession?.timestamp}</strong> ({adminSession?.date})
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsAdminUnlocked(false);
                      setAdminSession(null);
                      showToast('Admin Panel locked securely.');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 15px',
                      borderRadius: '8px',
                      background: '#FFFFFF',
                      border: '1px solid #EF4444',
                      color: '#EF4444',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    title="Lock Admin Panel immediately"
                  >
                    <Lock size={13} />
                    <span>Lock Admin Panel</span>
                  </button>
                </div>
              </div>

              <div className="panel-header-banner admin-banner">
                <div className="panel-header-title-box">
                  <div className="panel-crest-badge">
                    <ShieldCheck size={24} className="text-blue" />
                  </div>
                  <div>
                    <h3 className="panel-card-title">ABIT Central Placement &amp; Innovation Administration</h3>
                    <p className="panel-card-sub">
                      Governance authority: See, verify, update, delete, enable, or disable records across drives, placements, candidates, and tie-up companies.
                    </p>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="add-record-btn"
                  onClick={() => {
                    setAddModalType(adminModule);
                    setIsAddModalOpen(true);
                  }}
                >
                  <Plus size={16} />
                  <span>+ Add New {adminModule === 'recruitment' ? 'Drive' : adminModule === 'placement' ? 'Placement' : adminModule === 'jobseekers' ? 'Candidate' : 'Company'}</span>
                </button>
              </div>

              {/* 4 MODULE SELECTOR TABS IN ADMIN */}
              <div className="admin-modules-nav">
                <button 
                  type="button"
                  className={`admin-mod-btn ${adminModule === 'recruitment' ? 'active' : ''}`}
                  onClick={() => { setAdminModule('recruitment'); setAdminSearch(''); }}
                >
                  <Briefcase size={16} />
                  <span>1. Recruitment Details</span>
                  <span className="count-pill">{recruitmentDrives.length}</span>
                </button>

                <button 
                  type="button"
                  className={`admin-mod-btn ${adminModule === 'placement' ? 'active' : ''}`}
                  onClick={() => { setAdminModule('placement'); setAdminSearch(''); }}
                >
                  <GraduationCap size={16} />
                  <span>2. Placement Details</span>
                  <span className="count-pill">{placements.length}</span>
                </button>

                <button 
                  type="button"
                  className={`admin-mod-btn ${adminModule === 'jobseekers' ? 'active' : ''}`}
                  onClick={() => { setAdminModule('jobseekers'); setAdminSearch(''); }}
                >
                  <UserCheck size={16} />
                  <span>3. Job Seeker Details</span>
                  <span className="count-pill">{jobSeekers.length}</span>
                </button>

                <button 
                  type="button"
                  className={`admin-mod-btn ${adminModule === 'companies' ? 'active' : ''}`}
                  onClick={() => { setAdminModule('companies'); setAdminSearch(''); }}
                >
                  <Building2 size={16} />
                  <span>4. Companies Details</span>
                  <span className="count-pill">{companies.length}</span>
                </button>
              </div>

              {/* FILTER & SEARCH BAR */}
              <div className="admin-controls-strip">
                <div className="admin-search-box">
                  <Search size={16} className="search-icon-subtle" />
                  <input 
                    type="text" 
                    className="admin-search-input"
                    placeholder={`Search in ${adminModule}...`}
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                  />
                  {adminSearch && (
                    <button type="button" className="clear-btn" onClick={() => setAdminSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="admin-filter-pills">
                  <span className="filter-label"><Filter size={14} /> Status:</span>
                  <button 
                    type="button" 
                    className={`filter-pill ${adminFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setAdminFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    type="button" 
                    className={`filter-pill ${adminFilter === 'verified' ? 'active' : ''}`}
                    onClick={() => setAdminFilter('verified')}
                  >
                    Verified Only
                  </button>
                  <button 
                    type="button" 
                    className={`filter-pill ${adminFilter === 'enabled' ? 'active' : ''}`}
                    onClick={() => setAdminFilter('enabled')}
                  >
                    Active / Enabled
                  </button>
                  <button 
                    type="button" 
                    className={`filter-pill ${adminFilter === 'disabled' ? 'active' : ''}`}
                    onClick={() => setAdminFilter('disabled')}
                  >
                    Disabled Only
                  </button>
                </div>
              </div>

              {/* ----------------- MODULE 1: RECRUITMENT DETAILS ----------------- */}
              {adminModule === 'recruitment' && (
                <div className="admin-table-container">
                  <div className="table-responsive-wrapper">
                    <table className="portal-table">
                      <thead>
                        <tr>
                          <th>Recruiting Company</th>
                          <th>Job Role &amp; CTC</th>
                          <th>Drive Date</th>
                          <th>Eligibility</th>
                          <th>Verify Status</th>
                          <th>Enable / Disable</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recruitmentDrives
                          .filter(item => {
                            const matchSearch = item.companyName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                              item.role.toLowerCase().includes(adminSearch.toLowerCase());
                            if (!matchSearch) return false;
                            if (adminFilter === 'verified') return item.verified;
                            if (adminFilter === 'enabled') return item.status === 'active';
                            if (adminFilter === 'disabled') return item.status === 'disabled';
                            return true;
                          })
                          .map((drive) => (
                            <tr key={drive.id} className={drive.status === 'disabled' ? 'row-disabled' : ''}>
                              <td>
                                <div className="table-entity-cell">
                                  <img src={drive.companyLogo} alt={drive.companyName} className="table-logo-thumb" />
                                  <div>
                                    <div className="cell-primary-text">{drive.companyName}</div>
                                    <div className="cell-sub-text">{drive.location}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="cell-primary-text">{drive.role}</div>
                                <div className="cell-badge-emerald">{drive.ctc}</div>
                              </td>
                              <td>
                                <div className="cell-primary-text">{drive.driveDate}</div>
                                <div className="cell-sub-text">{drive.vacancies} Openings</div>
                              </td>
                              <td>
                                <div className="cell-primary-text">Min CGPA: {drive.eligibilityCgpa}</div>
                                <div className="cell-sub-text">{drive.appliedCount} Registered</div>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`verify-toggle-btn ${drive.verified ? 'is-verified' : 'is-unverified'}`}
                                  onClick={() => handleToggleVerify('recruitment', drive.id)}
                                  title="Click to toggle verify status"
                                >
                                  {drive.verified ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                  <span>{drive.verified ? 'Verified' : 'Pending'}</span>
                                </button>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`status-toggle-btn ${drive.status === 'active' ? 'status-enabled' : 'status-disabled'}`}
                                  onClick={() => handleToggleEnable('recruitment', drive.id)}
                                  title="Click to Enable / Disable"
                                >
                                  <Power size={13} />
                                  <span>{drive.status === 'active' ? 'Enabled' : 'Disabled'}</span>
                                </button>
                              </td>
                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    type="button" 
                                    className="icon-action-btn edit-btn"
                                    onClick={() => setEditingItem({ type: 'recruitment', item: drive })}
                                    title="Edit Recruitment Details"
                                  >
                                    <Edit3 size={15} />
                                  </button>
                                  <button 
                                    type="button" 
                                    className="icon-action-btn delete-btn"
                                    onClick={() => handleDeleteItem('recruitment', drive.id, drive.companyName)}
                                    title="Delete Recruitment Drive"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- MODULE 2: PLACEMENT DETAILS ----------------- */}
              {adminModule === 'placement' && (
                <div className="admin-table-container">
                  <div className="table-responsive-wrapper">
                    <table className="portal-table">
                      <thead>
                        <tr>
                          <th>Placed Student</th>
                          <th>Roll Number</th>
                          <th>Company Placed</th>
                          <th>Package (LPA)</th>
                          <th>Offer Verification</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {placements
                          .filter(item => {
                            const matchSearch = item.studentName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                              item.rollNo.includes(adminSearch) ||
                              item.companyName.toLowerCase().includes(adminSearch.toLowerCase());
                            if (!matchSearch) return false;
                            if (adminFilter === 'verified') return item.offerVerified;
                            if (adminFilter === 'enabled') return item.status === 'active';
                            if (adminFilter === 'disabled') return item.status === 'disabled';
                            return true;
                          })
                          .map((plc) => (
                            <tr key={plc.id} className={plc.status === 'disabled' ? 'row-disabled' : ''}>
                              <td>
                                <div className="cell-primary-text font-bold">{plc.studentName}</div>
                                <div className="cell-sub-text">{plc.branch}</div>
                              </td>
                              <td>
                                <div className="cell-mono-chip">{plc.rollNo}</div>
                              </td>
                              <td>
                                <div className="cell-primary-text font-semibold">{plc.companyName}</div>
                                <div className="cell-sub-text">{plc.role}</div>
                              </td>
                              <td>
                                <div className="cell-badge-emerald font-bold">{plc.packageLpa}</div>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`verify-toggle-btn ${plc.offerVerified ? 'is-verified' : 'is-unverified'}`}
                                  onClick={() => handleToggleVerify('placement', plc.id)}
                                  title="Verify Student Offer Letter"
                                >
                                  {plc.offerVerified ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                  <span>{plc.offerVerified ? 'Offer Verified' : 'Unverified'}</span>
                                </button>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`status-toggle-btn ${plc.status === 'active' ? 'status-enabled' : 'status-disabled'}`}
                                  onClick={() => handleToggleEnable('placement', plc.id)}
                                >
                                  <Power size={13} />
                                  <span>{plc.status === 'active' ? 'Enabled' : 'Disabled'}</span>
                                </button>
                              </td>
                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    type="button" 
                                    className="icon-action-btn edit-btn"
                                    onClick={() => setEditingItem({ type: 'placement', item: plc })}
                                    title="Edit Placement Record"
                                  >
                                    <Edit3 size={15} />
                                  </button>
                                  <button 
                                    type="button" 
                                    className="icon-action-btn delete-btn"
                                    onClick={() => handleDeleteItem('placement', plc.id, plc.studentName)}
                                    title="Delete Placement Record"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- MODULE 3: JOB SEEKER DETAILS ----------------- */}
              {adminModule === 'jobseekers' && (
                <div className="admin-table-container">
                  <div className="table-responsive-wrapper">
                    <table className="portal-table">
                      <thead>
                        <tr>
                          <th>Job Seeker Candidate</th>
                          <th>Roll No &amp; Batch</th>
                          <th>Academic CGPA</th>
                          <th>Primary Domain &amp; Skills</th>
                          <th>Verification</th>
                          <th>Account Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobSeekers
                          .filter(item => {
                            const matchSearch = item.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
                              item.rollNo.includes(adminSearch) ||
                              item.domain.toLowerCase().includes(adminSearch.toLowerCase());
                            if (!matchSearch) return false;
                            if (adminFilter === 'verified') return item.verified;
                            if (adminFilter === 'enabled') return item.status === 'active';
                            if (adminFilter === 'disabled') return item.status === 'disabled';
                            return true;
                          })
                          .map((seeker) => (
                            <tr key={seeker.id} className={seeker.status === 'disabled' ? 'row-disabled' : ''}>
                              <td>
                                <div className="cell-primary-text font-bold">{seeker.name}</div>
                                <div className="cell-sub-text">{seeker.email}</div>
                                <div className="cell-sub-text text-muted">{seeker.placementStatus}</div>
                              </td>
                              <td>
                                <div className="cell-mono-chip">{seeker.rollNo}</div>
                                <div className="cell-sub-text">{seeker.year}</div>
                              </td>
                              <td>
                                <div className="cell-badge-blue font-bold">{seeker.cgpa} CGPA</div>
                              </td>
                              <td>
                                <div className="cell-primary-text font-semibold">{seeker.domain}</div>
                                <div className="skill-pills-row">
                                  {seeker.skills?.slice(0, 3).map((sk, idx) => (
                                    <span key={idx} className="mini-skill-tag">{sk}</span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`verify-toggle-btn ${seeker.verified ? 'is-verified' : 'is-unverified'}`}
                                  onClick={() => handleToggleVerify('jobseekers', seeker.id)}
                                >
                                  {seeker.verified ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                  <span>{seeker.verified ? 'Verified' : 'Pending'}</span>
                                </button>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`status-toggle-btn ${seeker.status === 'active' ? 'status-enabled' : 'status-disabled'}`}
                                  onClick={() => handleToggleEnable('jobseekers', seeker.id)}
                                >
                                  <Power size={13} />
                                  <span>{seeker.status === 'active' ? 'Enabled' : 'Disabled'}</span>
                                </button>
                              </td>
                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    type="button" 
                                    className="icon-action-btn edit-btn"
                                    onClick={() => setEditingItem({ type: 'jobseekers', item: seeker })}
                                    title="Edit Candidate Details"
                                  >
                                    <Edit3 size={15} />
                                  </button>
                                  <button 
                                    type="button" 
                                    className="icon-action-btn delete-btn"
                                    onClick={() => handleDeleteItem('jobseekers', seeker.id, seeker.name)}
                                    title="Delete Candidate Record"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- MODULE 4: COMPANIES DETAILS ----------------- */}
              {adminModule === 'companies' && (
                <div className="admin-table-container">
                  <div className="table-responsive-wrapper">
                    <table className="portal-table">
                      <thead>
                        <tr>
                          <th>Company Name</th>
                          <th>Industry &amp; Tier</th>
                          <th>Tie-Up Since</th>
                          <th>HR Contact</th>
                          <th>Partnership Status</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies
                          .filter(item => {
                            const matchSearch = item.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
                              item.industry.toLowerCase().includes(adminSearch.toLowerCase());
                            if (!matchSearch) return false;
                            if (adminFilter === 'verified') return item.verified;
                            if (adminFilter === 'enabled') return item.status === 'active';
                            if (adminFilter === 'disabled') return item.status === 'disabled';
                            return true;
                          })
                          .map((comp) => (
                            <tr key={comp.id} className={comp.status === 'disabled' ? 'row-disabled' : ''}>
                              <td>
                                <div className="cell-primary-text font-bold">{comp.name}</div>
                                <a href={comp.website} target="_blank" rel="noreferrer" className="cell-link">
                                  {comp.website} <ExternalLink size={11} />
                                </a>
                              </td>
                              <td>
                                <div className="cell-primary-text">{comp.industry}</div>
                                <div className="cell-badge-blue">{comp.tier}</div>
                              </td>
                              <td>
                                <div className="cell-primary-text">Year {comp.tieUpYear}</div>
                                <div className="cell-sub-text">{comp.drivesCount} Drives Conducted</div>
                              </td>
                              <td>
                                <div className="cell-primary-text font-semibold">{comp.hrContact}</div>
                                <div className="cell-sub-text">{comp.hrEmail}</div>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`verify-toggle-btn ${comp.verified ? 'is-verified' : 'is-unverified'}`}
                                  onClick={() => handleToggleVerify('companies', comp.id)}
                                >
                                  {comp.verified ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                  <span>{comp.verified ? 'Verified Tie-Up' : 'Pending MoU'}</span>
                                </button>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className={`status-toggle-btn ${comp.status === 'active' ? 'status-enabled' : 'status-disabled'}`}
                                  onClick={() => handleToggleEnable('companies', comp.id)}
                                >
                                  <Power size={13} />
                                  <span>{comp.status === 'active' ? 'Active' : 'Disabled'}</span>
                                </button>
                              </td>
                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    type="button" 
                                    className="icon-action-btn edit-btn"
                                    onClick={() => setEditingItem({ type: 'companies', item: comp })}
                                    title="Edit Company Details"
                                  >
                                    <Edit3 size={15} />
                                  </button>
                                  <button 
                                    type="button" 
                                    className="icon-action-btn delete-btn"
                                    onClick={() => handleDeleteItem('companies', comp.id, comp.name)}
                                    title="Delete Company"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SUBPANEL B: RECRUITER PANEL
              "Recrutior Pannel He See and verfiy and update"
              ----------------------------------------------------------------- */}
          {activePanel === 'recruiter' && (
            <div className="panel-card recruiter-panel-card animate-fade-in">
              <div className="panel-header-banner recruiter-banner">
                <div className="panel-header-title-box">
                  <div className="panel-crest-badge recruiter-badge-bg">
                    <Briefcase size={24} className="text-emerald" />
                  </div>
                  <div>
                    <h3 className="panel-card-title">Corporate Recruiter &amp; Talent Acquisition Workspace</h3>
                    <p className="panel-card-sub">
                      Discover pre-vetted ECE candidates, verify engineering portfolios, update interview shortlist pipelines, and manage campus drives.
                    </p>
                  </div>
                </div>

                <div className="recruiter-company-picker">
                  <span className="picker-lbl">Recruiter Persona:</span>
                  <select 
                    className="form-select recruiter-select"
                    value={selectedRecruiterCompany}
                    onChange={(e) => setSelectedRecruiterCompany(e.target.value)}
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RECRUITER STATS */}
              <div className="recruiter-metrics-grid">
                <div className="recruiter-stat-card">
                  <div className="r-stat-number">{jobSeekers.length}</div>
                  <div className="r-stat-label">Active Job Seekers</div>
                  <div className="r-stat-sub">Final &amp; Pre-Final Year</div>
                </div>
                <div className="recruiter-stat-card">
                  <div className="r-stat-number">{jobSeekers.filter(j => j.placementStatus?.includes('Shortlist')).length + 1}</div>
                  <div className="r-stat-label">Shortlisted Candidates</div>
                  <div className="r-stat-sub">Technical Round Ready</div>
                </div>
                <div className="recruiter-stat-card">
                  <div className="r-stat-number">{jobSeekers.filter(j => j.verified).length}</div>
                  <div className="r-stat-label">Faculty Verified</div>
                  <div className="r-stat-sub">Proven Git Repositories</div>
                </div>
                <div className="recruiter-stat-card">
                  <div className="r-stat-number">
                    {recruitmentDrives.filter(r => r.companyName.includes(selectedRecruiterCompany.split(' ')[0])).length || 1}
                  </div>
                  <div className="r-stat-label">My Active Drives</div>
                  <div className="r-stat-sub">Campus Openings</div>
                </div>
              </div>

              {/* RECRUITER CANDIDATE TALENT POOL */}
              <div className="recruiter-talent-section">
                <div className="section-head-row">
                  <div>
                    <h4 className="section-sub-title">1. Review &amp; Verify Talent Pool Candidates</h4>
                    <p className="section-sub-desc">
                      Evaluate candidates, inspect their verified domain projects, and update their recruitment stage.
                    </p>
                  </div>

                  <div className="recruiter-filter-row">
                    <input 
                      type="text" 
                      className="form-input"
                      style={{ maxWidth: '240px' }}
                      placeholder="Search skill (e.g. React, ESP32) or roll no..."
                      value={recruiterCandidateSearch}
                      onChange={(e) => setRecruiterCandidateSearch(e.target.value)}
                    />
                    <select 
                      className="form-select"
                      value={recruiterCandidateFilter}
                      onChange={(e) => setRecruiterCandidateFilter(e.target.value)}
                    >
                      <option value="all">All Domains</option>
                      <option value="Full Stack Development">Full Stack</option>
                      <option value="Internet of Things (IoT)">IoT &amp; Hardware</option>
                      <option value="Robotics & AI">Robotics &amp; AI</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Software Testing & QA">Testing &amp; QA</option>
                    </select>
                  </div>
                </div>

                <div className="recruiter-candidates-grid">
                  {jobSeekers
                    .filter(c => {
                      if (recruiterCandidateFilter !== 'all' && c.domain !== recruiterCandidateFilter) return false;
                      if (recruiterCandidateSearch.trim()) {
                        const q = recruiterCandidateSearch.toLowerCase();
                        return c.name.toLowerCase().includes(q) || 
                          c.rollNo.includes(q) || 
                          c.skills.some(s => s.toLowerCase().includes(q));
                      }
                      return true;
                    })
                    .map((candidate) => (
                      <div key={candidate.id} className="recruiter-candidate-card">
                        <div className="candidate-card-top">
                          <div className="candidate-avatar-wrap">
                            <UserCheck size={20} className="text-blue" />
                          </div>
                          <div className="candidate-name-box">
                            <div className="candidate-name">{candidate.name}</div>
                            <div className="candidate-roll">Roll: {candidate.rollNo} &bull; {candidate.branch}</div>
                          </div>
                          <div className="candidate-cgpa-pill">
                            {candidate.cgpa} CGPA
                          </div>
                        </div>

                        <div className="candidate-domain-row">
                          <span className="domain-tag-badge">{candidate.domain}</span>
                          <button 
                            type="button" 
                            className={`candidate-verify-btn ${candidate.verified ? 'verified' : 'unverified'}`}
                            onClick={() => handleVerifyCandidate(candidate.id)}
                            title="Recruiter Verification"
                          >
                            <CheckCircle size={13} />
                            <span>{candidate.verified ? 'Verified Candidate' : 'Verify'}</span>
                          </button>
                        </div>

                        <div className="candidate-skills-chips">
                          {candidate.skills?.map((sk, idx) => (
                            <span key={idx} className="recruiter-skill-chip">{sk}</span>
                          ))}
                        </div>

                        <div className="candidate-recruitment-update-box">
                          <span className="stage-lbl">Update Recruitment Status:</span>
                          <select 
                            className="form-select status-select-dropdown"
                            value={candidate.placementStatus}
                            onChange={(e) => handleUpdateCandidateStage(candidate.id, e.target.value)}
                          >
                            <option value="Seeking">Under Review (Seeking)</option>
                            <option value="Shortlisted">Shortlisted for Technical Assessment</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Offer Extended">Offer Letter Extended</option>
                            <option value={`Placed (${selectedRecruiterCompany.split(' ')[0]})`}>
                              Selected &amp; Placed at {selectedRecruiterCompany.split(' ')[0]}
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* RECRUITER POSTING MANAGEMENT */}
              <div className="recruiter-postings-section">
                <div className="section-head-row">
                  <div>
                    <h4 className="section-sub-title">2. Campus Drive Openings Posted by {selectedRecruiterCompany}</h4>
                    <p className="section-sub-desc">
                      Update eligibility criteria, package CTC, vacancies, and interview schedule for this drive.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="add-record-btn"
                    onClick={() => {
                      setAddModalType('recruitment');
                      setIsAddModalOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>+ Post New Campus Drive</span>
                  </button>
                </div>

                <div className="recruiter-drives-list">
                  {recruitmentDrives
                    .filter(d => d.companyName.toLowerCase().includes(selectedRecruiterCompany.split(' ')[0].toLowerCase()))
                    .map((drive) => (
                      <div key={drive.id} className="recruiter-drive-item">
                        <div className="drive-item-main">
                          <div className="drive-role-title">{drive.role}</div>
                          <div className="drive-meta-row">
                            <span className="meta-badge">{drive.ctc}</span>
                            <span className="meta-sub">Date: {drive.driveDate}</span>
                            <span className="meta-sub">Location: {drive.location}</span>
                            <span className="meta-sub">Min CGPA: {drive.eligibilityCgpa}</span>
                          </div>
                          <p className="drive-desc">{drive.description}</p>
                        </div>

                        <div className="drive-item-actions">
                          <button 
                            type="button" 
                            className="edit-drive-btn"
                            onClick={() => setEditingItem({ type: 'recruitment', item: drive })}
                          >
                            <Edit3 size={15} />
                            <span>Update Requirements</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              SUBPANEL C: USER LOGIN (STUDENT PANEL)
              "User Login he See and verfiy and update the profile of register user by the organisation"
              ----------------------------------------------------------------- */}
          {activePanel === 'user' && (
            <div className="panel-card user-panel-card animate-fade-in">
              <div className="panel-header-banner user-banner">
                <div className="panel-header-title-box">
                  <div className="panel-crest-badge user-badge-bg">
                    <UserCheck size={24} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="panel-card-title">Enrolled Student Profile &amp; Verification Center</h3>
                    <p className="panel-card-sub">
                      Official credentials registered by Ajay Binay Institute of Technology. Verify your academic record and update domain skills, projects, and placement preferences.
                    </p>
                  </div>
                </div>

                <div className="org-verified-seal">
                  <Award size={18} className="text-gold" />
                  <span>Verified by ABIT ECE Dept</span>
                </div>
              </div>

              {/* OFFICIAL REGISTRATION CREDENTIALS (READ-ONLY COLLEGE SEAL) */}
              <div className="org-record-box">
                <div className="org-record-title">
                  <GraduationCap size={18} className="text-blue" />
                  <span>College Registered Enrolment Record</span>
                </div>

                <div className="org-record-grid">
                  <div className="org-field">
                    <span className="org-field-lbl">University Reg / Roll No:</span>
                    <span className="org-field-val mono">{userProfileData.rollNo}</span>
                  </div>
                  <div className="org-field">
                    <span className="org-field-lbl">Academic Institution:</span>
                    <span className="org-field-val">Ajay Binay Institute of Technology</span>
                  </div>
                  <div className="org-field">
                    <span className="org-field-lbl">Enrolled Department:</span>
                    <span className="org-field-val">{userProfileData.branch}</span>
                  </div>
                  <div className="org-field">
                    <span className="org-field-lbl">Current Academic Batch:</span>
                    <span className="org-field-val">{userProfileData.year}</span>
                  </div>
                  <div className="org-field">
                    <span className="org-field-lbl">Cumulative CGPA:</span>
                    <span className="org-field-val emerald-val">{userProfileData.cgpa} (Official)</span>
                  </div>
                  <div className="org-field">
                    <span className="org-field-lbl">Verification Status:</span>
                    <span className="org-field-val verified-val">
                      <CheckCircle size={14} /> Officially Accredited
                    </span>
                  </div>
                </div>
              </div>

              {/* EDITABLE PROFILE FORM */}
              <form onSubmit={handleSaveUserProfile} className="user-profile-edit-form">
                <div className="form-section-title">
                  <Edit3 size={16} className="text-blue" />
                  <span>Update Candidate Profile &amp; Placement Information</span>
                </div>

                <div className="form-grid-two">
                  <div className="form-group">
                    <label>Full Student Name <span className="req">*</span></label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={userProfileData.name}
                      onChange={(e) => setUserProfileData({ ...userProfileData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Official College Email <span className="req">*</span></label>
                    <input 
                      type="email" 
                      className="form-input"
                      value={userProfileData.email}
                      onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Phone Number</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={userProfileData.phone}
                      onChange={(e) => setUserProfileData({ ...userProfileData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Target Job Role / Placement Specialization</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={userProfileData.preferredRole}
                      onChange={(e) => setUserProfileData({ ...userProfileData, preferredRole: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Professional Engineering Bio &amp; Career Objective</label>
                  <textarea 
                    className="form-textarea"
                    rows={3}
                    value={userProfileData.bio}
                    onChange={(e) => setUserProfileData({ ...userProfileData, bio: e.target.value })}
                  />
                </div>

                {/* SKILLS TAGS */}
                <div className="form-group">
                  <label>Technical Skills &amp; Domain Capabilities</label>
                  <div className="skills-interactive-container">
                    <div className="skills-tags-wrap">
                      {userProfileData.skills.map((skill, idx) => (
                        <span key={idx} className="skill-bubble">
                          <span>{skill}</span>
                          <button 
                            type="button" 
                            className="remove-skill-x"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="add-skill-inline-row">
                      <input 
                        type="text" 
                        className="form-input skill-inline-input"
                        placeholder="Add skill (e.g. Next.js, STM32, PyTorch)..."
                        value={userProfileData.newSkillInput}
                        onChange={(e) => setUserProfileData({ ...userProfileData, newSkillInput: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        className="skill-add-btn"
                        onClick={handleAddSkill}
                      >
                        <Plus size={14} /> Add Skill
                      </button>
                    </div>
                  </div>
                </div>

                {/* PORTFOLIO & REPOSITORIES */}
                <div className="form-grid-three">
                  <div className="form-group">
                    <label>GitHub Profile URL</label>
                    <input 
                      type="url" 
                      className="form-input"
                      value={userProfileData.github}
                      onChange={(e) => setUserProfileData({ ...userProfileData, github: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input 
                      type="url" 
                      className="form-input"
                      value={userProfileData.linkedin}
                      onChange={(e) => setUserProfileData({ ...userProfileData, linkedin: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Verifiable Resume Document Link</label>
                    <input 
                      type="url" 
                      className="form-input"
                      value={userProfileData.resumeUrl}
                      onChange={(e) => setUserProfileData({ ...userProfileData, resumeUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* PREFERENCES */}
                <div className="form-grid-two">
                  <div className="form-group">
                    <label>Expected CTC Range</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={userProfileData.expectedCtc}
                      onChange={(e) => setUserProfileData({ ...userProfileData, expectedCtc: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Work Locations</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={userProfileData.preferredLocation}
                      onChange={(e) => setUserProfileData({ ...userProfileData, preferredLocation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="profile-submit-strip">
                  <button type="submit" className="save-profile-btn">
                    <CheckCircle size={18} />
                    <span>Save &amp; Update Official Profile</span>
                  </button>

                  <div className="profile-update-note">
                    Changes are automatically verified &amp; reflected in the Recruiter Talent Pool.
                  </div>
                </div>
              </form>

              {/* ELIGIBLE CAMPUS DRIVES FOR THIS USER */}
              <div className="user-campus-drives-section">
                <div className="section-head-row">
                  <div>
                    <h4 className="section-sub-title">Eligible On-Campus Recruitment Drives</h4>
                    <p className="section-sub-desc">
                      Based on your CGPA ({userProfileData.cgpa}) and ECE branch accreditation.
                    </p>
                  </div>
                </div>

                <div className="user-drives-grid">
                  {recruitmentDrives
                    .filter(d => d.status === 'active' && parseFloat(userProfileData.cgpa) >= d.eligibilityCgpa)
                    .map((drive) => (
                      <div key={drive.id} className="user-drive-card">
                        <div className="u-drive-head">
                          <img src={drive.companyLogo} alt={drive.companyName} className="u-drive-logo" />
                          <div>
                            <div className="u-drive-comp">{drive.companyName}</div>
                            <div className="u-drive-role">{drive.role}</div>
                          </div>
                        </div>

                        <div className="u-drive-details">
                          <span className="u-drive-badge">{drive.ctc}</span>
                          <span className="u-drive-date">Drive: {drive.driveDate}</span>
                        </div>

                        <button 
                          type="button" 
                          className="express-interest-btn"
                          onClick={() => showToast(`Interest submitted for ${drive.companyName} campus drive!`)}
                        >
                          <Check size={14} /> Express Interest / Apply
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: SIGN UP
          "2.Signup"
          ===================================================================== */}
      {hubTab === 'signup' && (
        <div className="panel-card signup-card animate-fade-in">
          <div className="signup-header-banner">
            <div className="signup-icon-box">
              <UserPlus size={28} className="text-blue" />
            </div>
            <div>
              <h3 className="signup-title">New User Registration</h3>
              <p className="signup-sub">
                Create your verified portal account under Ajay Binay Institute of Technology. Select your designated role below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSignUpSubmit} className="signup-form">
            <div className="role-selector-row">
              <span className="role-lbl">Select Your Account Type:</span>
              <div className="role-radios">
                <label className={`role-radio-pill ${signupData.role === 'student' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="student"
                    checked={signupData.role === 'student'}
                    onChange={() => setSignupData({ ...signupData, role: 'student' })}
                  />
                  <span>Student Innovator / Job Seeker</span>
                </label>

                <label className={`role-radio-pill ${signupData.role === 'recruiter' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="recruiter"
                    checked={signupData.role === 'recruiter'}
                    onChange={() => setSignupData({ ...signupData, role: 'recruiter' })}
                  />
                  <span>Corporate Recruiter</span>
                </label>

                <label className={`role-radio-pill ${signupData.role === 'admin' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="admin"
                    checked={signupData.role === 'admin'}
                    onChange={() => setSignupData({ ...signupData, role: 'admin' })}
                  />
                  <span>Department Administrator</span>
                </label>
              </div>
            </div>

            <div className="form-grid-two">
              <div className="form-group">
                <label>Full Name <span className="req">*</span></label>
                <div className="input-with-icon-wrap">
                  <User size={16} className="inp-icon" />
                  <input 
                    type="text" 
                    className="form-input pl-icon"
                    placeholder="e.g. Priyanshu Mohanty"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address <span className="req">*</span></label>
                <div className="input-with-icon-wrap">
                  <Mail size={16} className="inp-icon" />
                  <input 
                    type="email" 
                    className="form-input pl-icon"
                    placeholder="student@abit.edu.in or recruiter@tcs.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  {signupData.role === 'recruiter' ? 'Company Name / Organization' : 'College Roll / Registration Number'} <span className="req">*</span>
                </label>
                <div className="input-with-icon-wrap">
                  <GraduationCap size={16} className="inp-icon" />
                  <input 
                    type="text" 
                    className="form-input pl-icon"
                    placeholder={signupData.role === 'recruiter' ? 'e.g. Tata Consultancy Services' : 'e.g. 2101214045'}
                    value={signupData.rollNo}
                    onChange={(e) => setSignupData({ ...signupData, rollNo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <div className="input-with-icon-wrap">
                  <Phone size={16} className="inp-icon" />
                  <input 
                    type="tel" 
                    className="form-input pl-icon"
                    placeholder="+91 98765 43210"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Academic Department / Branch</label>
                <select 
                  className="form-select"
                  value={signupData.branch}
                  onChange={(e) => setSignupData({ ...signupData, branch: e.target.value })}
                >
                  <option value="Electrical & Computer Engineering">Dept of Electrical &amp; Computer Engineering (ECE)</option>
                  <option value="Computer Science & Engineering">Dept of Computer Science &amp; Engineering (CSE)</option>
                  <option value="Electrical Engineering">Dept of Electrical Engineering (EE)</option>
                  <option value="Electronics & Telecommunication">Dept of Electronics &amp; Telecomm (ETC)</option>
                  <option value="Mechanical Engineering">Dept of Mechanical Engineering</option>
                </select>
              </div>

              <div className="form-group">
                <label>Primary Technical Domain</label>
                <select 
                  className="form-select"
                  value={signupData.domain}
                  onChange={(e) => setSignupData({ ...signupData, domain: e.target.value })}
                >
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                  <option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
                  <option value="Robotics">Robotics &amp; ROS</option>
                  <option value="Embedded Systems">Embedded Systems &amp; ARM</option>
                  <option value="Software Testing & QA">Software Testing &amp; QA</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Set Secure Password <span className="req">*</span></label>
              <div className="input-with-icon-wrap">
                <Lock size={16} className="inp-icon" />
                <input 
                  type="password" 
                  className="form-input pl-icon"
                  placeholder="Create a password for your account"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-signup-btn">
              <UserPlus size={18} />
              <span>Create Account &amp; Enter Portal</span>
            </button>
          </form>
        </div>
      )}

      {/* =====================================================================
          TAB 3: REGISTER FOR THE EXISTING USERS
          "3.Register for the existing users"
          ===================================================================== */}
      {hubTab === 'existing-register' && (
        <div className="panel-card existing-register-card animate-fade-in">
          <div className="existing-header-banner">
            <div className="existing-icon-box">
              <GraduationCap size={28} className="text-amber" />
            </div>
            <div>
              <h3 className="existing-title">Account Activation for Existing Enrolled Students</h3>
              <p className="existing-sub">
                Students pre-enrolled by Ajay Binay Institute of Technology: Enter your university registration roll number to verify your college record and activate full portal access.
              </p>
            </div>
          </div>

          {/* QUICK SAMPLE ROLL NUMBERS TO TRY */}
          <div className="demo-roll-suggestions">
            <span className="sugg-lbl">Quick Demo University Roll Numbers to test activation:</span>
            <div className="sugg-chips-row">
              {['2101214045', '2101214012', '2201214028', '2101214001', '2101214015', '2201214099'].map(roll => (
                <button 
                  key={roll} 
                  type="button" 
                  className="sugg-chip"
                  onClick={() => {
                    setExistingRollLookup(roll);
                    setLookupError('');
                    setLookupResult(null);
                  }}
                >
                  Roll: {roll}
                </button>
              ))}
            </div>
          </div>

          {/* LOOKUP FORM */}
          <form onSubmit={handleExistingRollLookup} className="existing-lookup-form">
            <div className="lookup-input-group">
              <div className="input-with-icon-wrap flex-1">
                <Search size={18} className="inp-icon" />
                <input 
                  type="text" 
                  className="form-input pl-icon large-inp"
                  placeholder="Enter ABIT University Roll No (e.g. 2101214045, 2101214012)..."
                  value={existingRollLookup}
                  onChange={(e) => setExistingRollLookup(e.target.value)}
                />
              </div>
              <button type="submit" className="lookup-verify-btn">
                <CheckCircle size={18} />
                <span>Verify College Record</span>
              </button>
            </div>
          </form>

          {lookupError && (
            <div className="lookup-error-banner animate-fade-in">
              <AlertCircle size={18} />
              <span>{lookupError}</span>
            </div>
          )}

          {/* LOOKUP SUCCESS & ACTIVATION FORM */}
          {lookupResult && (
            <div className="activation-box animate-fade-in">
              <div className="verified-success-header">
                <CheckCircle size={22} className="text-emerald" />
                <div>
                  <h4 className="verified-head-title">Official ABIT Student Record Verified!</h4>
                  <p className="verified-head-sub">
                    Enrolment Seal: <strong>{lookupResult.orgVerificationSeal}</strong> &bull; Dept of Electrical &amp; Computer Engineering
                  </p>
                </div>
              </div>

              <div className="verified-details-grid">
                <div className="v-card">
                  <span className="v-lbl">Student Name:</span>
                  <span className="v-val font-bold">{lookupResult.name}</span>
                </div>
                <div className="v-card">
                  <span className="v-lbl">Roll / Reg Number:</span>
                  <span className="v-val mono">{lookupResult.rollNo}</span>
                </div>
                <div className="v-card">
                  <span className="v-lbl">Branch / Track:</span>
                  <span className="v-val">{lookupResult.branch}</span>
                </div>
                <div className="v-card">
                  <span className="v-lbl">Academic Batch:</span>
                  <span className="v-val">{lookupResult.year}</span>
                </div>
                <div className="v-card">
                  <span className="v-lbl">Recorded CGPA:</span>
                  <span className="v-val emerald-val font-bold">{lookupResult.cgpa} CGPA</span>
                </div>
                <div className="v-card">
                  <span className="v-lbl">Institutional Email:</span>
                  <span className="v-val">{lookupResult.collegeEmail}</span>
                </div>
              </div>

              <form onSubmit={handleCompleteExistingActivation} className="activation-form">
                <div className="form-grid-two">
                  <div className="form-group">
                    <label>Confirm Contact Mobile Number</label>
                    <input 
                      type="tel" 
                      className="form-input"
                      value={existingPhone}
                      onChange={(e) => setExistingPhone(e.target.value)}
                      placeholder="+91 98610 00000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Set Portal Password for this Account <span className="req">*</span></label>
                    <div className="input-with-icon-wrap">
                      <Key size={16} className="inp-icon" />
                      <input 
                        type="password" 
                        className="form-input pl-icon"
                        placeholder="Choose a password for your account"
                        value={existingPassword}
                        onChange={(e) => setExistingPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="activate-account-btn">
                  <CheckCircle size={18} />
                  <span>Activate &amp; Enter My Student Profile</span>
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ADMIN EDIT MODAL
          ===================================================================== */}
      {editingItem && (
        <AdminEditModal 
          editingItem={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* =====================================================================
          ADMIN ADD MODAL
          ===================================================================== */}
      {isAddModalOpen && (
        <AdminAddModal 
          type={addModalType}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddNewItem}
        />
      )}
    </div>
  );
}

/**
 * Modal to Edit existing records in Admin Panel
 */
function AdminEditModal({ editingItem, onClose, onSave }) {
  const { type, item } = editingItem;
  const [formData, setFormData] = useState({ ...item });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content admin-edit-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Edit {type === 'recruitment' ? 'Recruitment Drive' : type === 'placement' ? 'Placement Record' : type === 'jobseekers' ? 'Job Seeker' : 'Company'}</h3>
            <span className="modal-sub">Admin ID: {item.id}</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          {type === 'recruitment' && (
            <>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.companyName || ''}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              <div className="form-grid-two">
                <div className="form-group">
                  <label>Role</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CTC Package</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.ctc || ''}
                    onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Drive Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.driveDate || ''}
                    onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Min Eligibility CGPA</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="form-input"
                    value={formData.eligibilityCgpa || 7.0}
                    onChange={(e) => setFormData({ ...formData, eligibilityCgpa: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
            </>
          )}

          {type === 'placement' && (
            <>
              <div className="form-grid-two">
                <div className="form-group">
                  <label>Student Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.studentName || ''}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.rollNo || ''}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Placed</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.companyName || ''}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Package (LPA)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.packageLpa || ''}
                    onChange={(e) => setFormData({ ...formData, packageLpa: e.target.value })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {type === 'jobseekers' && (
            <>
              <div className="form-grid-two">
                <div className="form-group">
                  <label>Candidate Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.rollNo || ''}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CGPA</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-input"
                    value={formData.cgpa || 8.0}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label>Domain</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.domain || ''}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          {type === 'companies' && (
            <>
              <div className="form-grid-two">
                <div className="form-group">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.industry || ''}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input 
                    type="url" 
                    className="form-input"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>HR Contact</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.hrContact || ''}
                    onChange={(e) => setFormData({ ...formData, hrContact: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          <div className="modal-actions-bar">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              <Check size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Modal to Add New records in Admin Panel
 */
function AdminAddModal({ type, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    ctc: '',
    driveDate: '2025-05-15',
    eligibilityCgpa: 7.0,
    vacancies: 10,
    location: 'Bhubaneswar / On-Campus',
    studentName: '',
    rollNo: '',
    packageLpa: '7.5 LPA',
    branch: 'Electrical & Computer Engineering',
    name: '',
    email: '',
    cgpa: 8.5,
    domain: 'Full Stack Development',
    industry: 'Information Technology',
    website: 'https://',
    hrContact: '',
    hrEmail: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content admin-add-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">
              + Add New {type === 'recruitment' ? 'Recruitment Drive' : type === 'placement' ? 'Placement Record' : type === 'jobseekers' ? 'Job Seeker' : 'Partner Company'}
            </h3>
            <span className="modal-sub">ABIT Central Administration</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          {type === 'recruitment' && (
            <div className="form-grid-two">
              <div className="form-group">
                <label>Company Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Cisco Systems"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Job Role <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Software Engineer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>CTC Package</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 8.5 LPA"
                  value={formData.ctc}
                  onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Drive Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={formData.driveDate}
                  onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                />
              </div>
            </div>
          )}

          {type === 'placement' && (
            <div className="form-grid-two">
              <div className="form-group">
                <label>Student Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sneha Mohanty"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Roll Number <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 2101214045"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company Placed <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Tata Consultancy Services"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Package (LPA)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 9.0 LPA"
                  value={formData.packageLpa}
                  onChange={(e) => setFormData({ ...formData, packageLpa: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {type === 'jobseekers' && (
            <div className="form-grid-two">
              <div className="form-group">
                <label>Candidate Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Debashis Panda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Roll Number <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 2201214028"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="form-input" 
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Domain</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Robotics & AI"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>
            </div>
          )}

          {type === 'companies' && (
            <div className="form-grid-two">
              <div className="form-group">
                <label>Company Name <span className="req">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Qualcomm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Industry</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Semiconductors & Wireless"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>HR Contact Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sandeep Mishra"
                  value={formData.hrContact}
                  onChange={(e) => setFormData({ ...formData, hrContact: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>HR Contact Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="campus@company.com"
                  value={formData.hrEmail}
                  onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="modal-actions-bar">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              <Plus size={16} /> Create Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
