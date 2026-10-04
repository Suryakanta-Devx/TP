import React, { useState, useEffect } from 'react';
import abitLogoImg from '../assets/AbitLogo.png';
import { Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

/**
 * ABIT Official Loading Component & Splash Animation
 * Features:
 * - High-precision dual-ring orbital spinner
 * - Floating ABIT crest with ambient reactive glow
 * - Dynamic campus status ticker
 * - Monospace progress bar with live percentage
 * - Full-screen splash mode or inline component mode
 */
export default function Loading({
  isLoading = true,
  duration = 1800,
  fullScreen = true,
  title = "Ajay Binay Institute of Technology",
  subtitle = "Dept of Electrical & Computer Engineering",
  badgeText = "Training, Placement & Innovation Cell",
  onFinish = null,
  allowSkip = true,
  customMessage = null
}) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const statusMessages = [
    "Initializing ABIT Portal Core...",
    "Loading Student Innovations & Repositories...",
    "Syncing Placement & Recruiter Network...",
    "Connecting Verified Student Warriors...",
    "Portal Ready!"
  ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setIsFinished(true);
        if (onFinish) onFinish();
      }, 500);
      return () => clearTimeout(timer);
    }

    const intervalTime = 25;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPct = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentPct);

      // Status text progression based on percentage
      if (currentPct < 25) {
        setStatusIndex(0);
      } else if (currentPct < 55) {
        setStatusIndex(1);
      } else if (currentPct < 80) {
        setStatusIndex(2);
      } else if (currentPct < 98) {
        setStatusIndex(3);
      } else {
        setStatusIndex(4);
      }

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsFadingOut(true);
        setTimeout(() => {
          setIsFinished(true);
          if (onFinish) onFinish();
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLoading, duration, onFinish]);

  const handleSkip = (e) => {
    e.stopPropagation();
    setProgress(100);
    setIsFadingOut(true);
    setTimeout(() => {
      setIsFinished(true);
      if (onFinish) onFinish();
    }, 200);
  };

  if (isFinished && fullScreen) {
    return null;
  }

  const currentMessage = customMessage || statusMessages[statusIndex];

  const content = (
    <div className="abit-loader-card" onClick={(e) => e.stopPropagation()}>
      {/* Dynamic Animated Orbit & Institutional Crest */}
      <div className="abit-loader-crest-wrapper">
        <div className="loader-orbit-ring" />
        <div className="loader-inner-ring" />
        <div className="loader-glow-halo" />
        <img 
          src={abitLogoImg} 
          alt="ABIT Crest" 
          className="abit-loader-img"
        />
      </div>

      {/* Brand & Department Hierarchy */}
      <div className="abit-loader-brand">
        <div className="abit-loader-title">{title}</div>
        <div className="abit-loader-dept">{subtitle}</div>
        <div className="abit-loader-badge">
          <span className="loader-badge-dot" />
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Progress & Live Status Tracker */}
      <div className="abit-loader-progress-box">
        <div className="abit-loader-progress-info">
          <div className="abit-loader-status-text">
            <Sparkles size={13} className="text-blue" style={{ flexShrink: 0 }} />
            <span>{currentMessage}</span>
          </div>
          <span className="abit-loader-percentage">{progress}%</span>
        </div>

        <div className="abit-loader-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div 
            className="abit-loader-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* System Telemetry Metadata */}
      <div className="abit-loader-meta">
        <div className="loader-meta-item">
          <ShieldCheck size={12} color="#059669" />
          <span>SECURE PORTAL</span>
        </div>
        <span>&bull;</span>
        <div className="loader-meta-item">
          <Zap size={12} color="#D97706" />
          <span>TECH WARRIORS v4.0</span>
        </div>
        <span>&bull;</span>
        <div className="loader-meta-item">
          <span>CUTTACK</span>
        </div>
      </div>

      {/* Fast Skip Option */}
      {allowSkip && fullScreen && (
        <button 
          type="button" 
          className="abit-loader-skip-btn"
          onClick={handleSkip}
          title="Directly enter portal"
        >
          <span>Enter Portal</span>
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );

  if (!fullScreen) {
    return (
      <div className="abit-loader-inline">
        {content}
      </div>
    );
  }

  return (
    <div 
      className={`abit-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}
      onClick={allowSkip ? handleSkip : undefined}
      aria-live="polite"
      aria-busy={!isFinished}
    >
      {/* Background Animated Ambience */}
      <div className="abit-loader-ambient">
        <div className="loader-glow-circle-1" />
        <div className="loader-glow-circle-2" />
        <div className="loader-grid-pattern" />
      </div>

      {content}
    </div>
  );
}
