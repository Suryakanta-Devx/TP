import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Lock, 
  Mail, 
  User,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { REGISTERED_STUDENTS } from '../data/users';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
];

export default function AuthModal({ onClose, onLoginSuccess }) {
  // Only two tabs: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState('login');
  
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    rollNo: '',
    email: '',
    branch: 'Electrical & Computer Engineering',
    year: '4th Year (Batch 2021-25)',
    avatar: AVATAR_OPTIONS[0],
    bio: '',
    password: ''
  });
  
  const [errorMsg, setErrorMsg] = useState('');

  // Student Sign In
  const handleFormLogin = (e) => {
    e.preventDefault();
    if (!loginForm.identifier.trim()) {
      setErrorMsg('Please enter your university roll number or college email');
      return;
    }

    const q = loginForm.identifier.trim().toLowerCase();

    // Check if matches any registered student by email, rollNo, or name
    const foundUser = REGISTERED_STUDENTS.find(u => 
      u.email?.toLowerCase() === q ||
      u.rollNo === loginForm.identifier.trim() ||
      u.regNo === loginForm.identifier.trim() ||
      u.name?.toLowerCase() === q
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
      onClose();
    } else {
      // Create authenticated user session for the entered credentials
      const generatedUser = {
        id: 'user-' + Date.now(),
        name: loginForm.identifier.includes('@') 
          ? loginForm.identifier.split('@')[0].replace('.', ' ') 
          : 'Suryakanta Senapati',
        email: loginForm.identifier.includes('@') 
          ? loginForm.identifier 
          : `${loginForm.identifier}@abit.edu.in`,
        rollNo: loginForm.identifier.trim(),
        regNo: loginForm.identifier.trim(),
        branch: 'Electrical & Computer Engineering',
        year: '4th Year (Batch 2021-25)',
        avatar: AVATAR_OPTIONS[0],
        bio: 'ECE Student Innovator & ABIT Tech Warrior.',
        skills: ['React', 'Python', 'C++'],
        role: 'Tech Warrior'
      };
      onLoginSuccess(generatedUser);
      onClose();
    }
  };

  // Student Registration
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signupForm.name.trim() || !signupForm.rollNo.trim()) {
      setErrorMsg('Full name and university registration / roll number are required');
      return;
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: signupForm.name.trim(),
      email: signupForm.email.trim() || `${signupForm.rollNo.trim()}@abit.edu.in`,
      rollNo: signupForm.rollNo.trim(),
      regNo: signupForm.rollNo.trim(),
      branch: signupForm.branch,
      year: signupForm.year,
      avatar: signupForm.avatar,
      bio: signupForm.bio.trim() || 'Electrical & Computer Engineering Student Innovator at ABIT.',
      skills: ['Full Stack', 'AI/ML', 'IoT'],
      role: 'Registered Tech Warrior'
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content auth-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="auth-header-title">
            <div className="auth-icon-hex">
              {activeTab === 'login' ? (
                <LogIn size={20} className="text-cyan" />
              ) : (
                <UserPlus size={20} className="text-blue" />
              )}
            </div>
            <div>
              <h2 className="modal-title">
                {activeTab === 'login' ? 'Student Login' : 'Student Registration'}
              </h2>
              <span className="modal-sub">
                ABIT Department of Electrical &amp; Computer Engineering
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

        {/* Tab switcher: ONLY Student Login & Student Registration */}
        <div className="auth-tab-bar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <button 
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
          >
            <LogIn size={15} />
            <span>Student Login</span>
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
          >
            <UserPlus size={15} />
            <span>Student Registration</span>
          </button>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" style={{ margin: '16px 24px 0' }}>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Student Sign In Form */}
        {activeTab === 'login' && (
          <form className="auth-form" onSubmit={handleFormLogin} style={{ padding: '24px' }}>
            <div className="form-group">
              <label htmlFor="login-id">University Roll No / Reg No / College Email <span className="req">*</span></label>
              <div className="input-with-icon">
                <Mail size={16} className="field-icon" />
                <input 
                  type="text"
                  id="login-id"
                  className="form-input pl-icon"
                  placeholder="e.g. 2101214045 or suryakanta.21ece@abit.edu.in"
                  value={loginForm.identifier}
                  onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-pwd">Portal Password <span className="req">*</span></label>
              <div className="input-with-icon">
                <Lock size={16} className="field-icon" />
                <input 
                  type="password"
                  id="login-pwd"
                  className="form-input pl-icon"
                  placeholder="Enter your student password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" style={{ marginTop: '10px' }}>
              <LogIn size={16} />
              <span>Sign In to Student Portal</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Don&apos;t have an activated account?{' '}
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
              >
                Register Here
              </button>
            </div>
          </form>
        )}

        {/* 2. Student Registration Form */}
        {activeTab === 'signup' && (
          <form className="auth-form" onSubmit={handleSignUp} style={{ padding: '24px' }}>
            <div className="form-group">
              <label>Select Profile Picture</label>
              <div className="avatar-picker-row">
                {AVATAR_OPTIONS.map((av, idx) => (
                  <img 
                    key={idx}
                    src={av}
                    alt={`Avatar option ${idx + 1}`}
                    className={`avatar-choice ${signupForm.avatar === av ? 'selected' : ''}`}
                    onClick={() => setSignupForm({ ...signupForm, avatar: av })}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-name">Full Student Name <span className="req">*</span></label>
              <div className="input-with-icon">
                <User size={16} className="field-icon" />
                <input 
                  type="text"
                  id="reg-name"
                  className="form-input pl-icon"
                  placeholder="e.g. Suryakanta Senapati"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="reg-roll">Roll / Reg Number <span className="req">*</span></label>
                <div className="input-with-icon">
                  <GraduationCap size={16} className="field-icon" />
                  <input 
                    type="text"
                    id="reg-roll"
                    className="form-input pl-icon"
                    placeholder="e.g. 2101214045"
                    value={signupForm.rollNo}
                    onChange={(e) => setSignupForm({ ...signupForm, rollNo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">College Email</label>
                <div className="input-with-icon">
                  <Mail size={16} className="field-icon" />
                  <input 
                    type="email"
                    id="reg-email"
                    className="form-input pl-icon"
                    placeholder="e.g. suryakanta.21ece@abit.edu.in"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="reg-year">Academic Batch</label>
                <select 
                  id="reg-year"
                  className="form-select"
                  value={signupForm.year}
                  onChange={(e) => setSignupForm({ ...signupForm, year: e.target.value })}
                >
                  <option value="4th Year (Batch 2021-25)">4th Year (Batch 2021-25)</option>
                  <option value="3rd Year (Batch 2022-26)">3rd Year (Batch 2022-26)</option>
                  <option value="2nd Year (Batch 2023-27)">2nd Year (Batch 2023-27)</option>
                  <option value="1st Year (Batch 2024-28)">1st Year (Batch 2024-28)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reg-pwd">Create Password <span className="req">*</span></label>
                <div className="input-with-icon">
                  <Lock size={16} className="field-icon" />
                  <input 
                    type="password"
                    id="reg-pwd"
                    className="form-input pl-icon"
                    placeholder="Create a password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-bio">Short Engineering Bio</label>
              <input 
                type="text"
                id="reg-bio"
                className="form-input"
                placeholder="e.g. ECE student passionate about Full Stack, IoT and AI systems."
                value={signupForm.bio}
                onChange={(e) => setSignupForm({ ...signupForm, bio: e.target.value })}
              />
            </div>

            <button type="submit" className="auth-submit-btn" style={{ marginTop: '10px' }}>
              <UserPlus size={16} />
              <span>Complete Registration &amp; Sign In</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
