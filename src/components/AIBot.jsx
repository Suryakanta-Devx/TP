import React, { useState, useEffect, useRef } from 'react';
import aiBotImg from '../assets/ai-bot.png';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Layers,
  PlusCircle,
  Trophy,
  HelpCircle,
  Smartphone
} from 'lucide-react';

/**
 * ABIT AI Assistant Bot ("WarriorBot")
 * An intelligent, interactive campus assistant designed to guide students,
 * faculty, and corporate recruiters through the ABIT Placement & Innovation Portal.
 */
export default function AIBot({ onNavigate, currentUser, onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Namaste! 🤖 I'm your **ABIT AI Assistant**. How can I help you today?

I can assist you with:
• **Submitting Engineering Innovations**
• **Campus Placement Drives & Corporate Tie-ups**
• **Exploring 9 Engineering Domains**
• **Warriors Hall of Fame & Peer Rankings**
• **Admin, Recruiter & Student Governance Panels**
• **Mobile & Cross-Device Compatibility**`,
      actions: [
        { label: '🚀 How to submit a project?', action: 'ask_submit' },
        { label: '💼 Placement drives & Recruiters', action: 'ask_placements' },
        { label: '🔐 3 Panels Hub & Admin PIN', action: 'ask_panels' },
        { label: '📱 Mobile responsiveness', action: 'ask_responsive' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  // Hide bubble tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Knowledge base answers generator
  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Project Submission
    if (q.includes('submit') || q.includes('project') || q.includes('upload') || q.includes('jama') || q.includes('karein')) {
      return {
        text: `To submit your engineering project to **ABIT Tech Warriors**:
1. Click the **"+ Submit Project"** button in the header or button below.
2. Fill in the **Project Title**, **Tagline**, and **Abstract**.
3. Select your **Engineering Domain** (e.g., Full Stack, AI & ML, IoT, Robotics).
4. Add your **GitHub Repository Link**, **Live Demo URL**, and **Faculty Mentor Name**.
5. Add your team members with Roll Numbers and Year.
6. Click **"Submit Innovation"** — it will be immediately published to the portal!`,
        actions: [
          { label: 'Open Submit Page', page: 'submit' },
          { label: 'View Verified Innovations', page: 'showcase' }
        ]
      };
    }

    // 2. Placements & Corporate Tie-ups
    if (q.includes('placement') || q.includes('recruit') || q.includes('company') || q.includes('job') || q.includes('drive') || q.includes('naukri')) {
      return {
        text: `**ABIT Training & Placement Cell Overview**:
• **Active Recruitment Drives**: TCS, Infosys, Tech Mahindra, L&T Technology Services, Wipro, Cognizant, and startup partners.
• **Recruiter View**: Enable the "Recruiter View" toggle in the header to highlight production-ready repos, live demo links, and student contact cards.
• **Job Seeker Profiles**: Students can mark their profiles as open to opportunities with verified skills and GitHub portfolios.`,
        actions: [
          { label: 'Explore Placement Portal', page: 'placement' },
          { label: 'Open Recruiter Panel', page: 'governance' }
        ]
      };
    }

    // 3. 3 Panels Hub & Admin / Recruiter Access
    if (q.includes('panel') || q.includes('admin') || q.includes('pin') || q.includes('password') || q.includes('governance') || q.includes('login')) {
      return {
        text: `**ABIT 3 Panels Governance Hub**:
1. **Admin Panel**: For ECE HOD & Faculty coordinators to manage students, approve submissions, and monitor stats. *(Institutional PIN required for lock gate)*.
2. **Recruiter Panel**: For HRs and talent scouts to schedule drives and evaluate student code.
3. **Student Warrior Panel**: For registered engineering students to manage their portfolio and profile.`,
        actions: [
          { label: 'Go to 3 Panels Hub', page: 'governance' },
          { label: 'Login to Portal', action: 'auth' }
        ]
      };
    }

    // 4. Mobile / Responsive Web Design
    if (q.includes('mobile') || q.includes('phone') || q.includes('tablet') || q.includes('responsive') || q.includes('screen') || q.includes('dhal')) {
      return {
        text: `📱 **100% Fully Responsive Design**:
This portal is built to automatically adapt to **any screen size**:
• **Mobile Phones (Android / iPhone)**: One-column fluid cards, thumb-friendly navigation, collapsible drawer, and zero horizontal scrolling.
• **Tablets (iPads / Android Tablets)**: Dynamic 2-column grids and balanced touch controls.
• **Computers / Laptops**: Expansive widescreen experience with 3-column project showcases and side-by-side telemetry.

Try resizing your browser window or opening the URL on your mobile phone to experience the dynamic layout!`,
        actions: [
          { label: 'Back to Home', page: 'home' },
          { label: 'Browse Showcase', page: 'showcase' }
        ]
      };
    }

    // 5. Domains & Technologies
    if (q.includes('domain') || q.includes('tech') || q.includes('branch') || q.includes('iot') || q.includes('robotics') || q.includes('ai') || q.includes('web')) {
      return {
        text: `**9 Specialized Engineering Domains at ABIT ECE**:
1. **Web Development** (React, Tailwind, Node)
2. **Full Stack Engineering** (MERN, Next.js, Cloud)
3. **AI & Machine Learning** (TensorFlow, PyTorch, CV)
4. **Internet of Things (IoT)** (ESP32, Arduino, MQTT)
5. **Robotics & Automation** (ROS, Kinematics, Sensors)
6. **Embedded Systems** (ARM, Microcontrollers, RTOS)
7. **Cloud & Cybersecurity** (AWS, Docker, Network Sec)
8. **Software QA & Testing** (Selenium, Jest, Cypress)
9. **Tech Management & Systems** (Agile, DevOps, Scrum)`,
        actions: [
          { label: 'Explore All Domains', page: 'domains' }
        ]
      };
    }

    // 6. Hall of Fame / Leaderboard / Upvoting
    if (q.includes('leaderboard') || q.includes('hall of fame') || q.includes('fame') || q.includes('upvote') || q.includes('rank') || q.includes('top')) {
      return {
        text: `🏆 **Warriors Hall of Fame**:
• Student innovations are ranked transparently based on peer and recruiter upvotes, code verification, and faculty endorsement.
• The top 3 ranked innovations occupy the gold, silver, and bronze podium.
• You can upvote any project by clicking the **Upvote (▲)** button on any project card!`,
        actions: [
          { label: 'View Hall of Fame', page: 'leaderboard' }
        ]
      };
    }

    // 7. About ABIT / College
    if (q.includes('abit') || q.includes('college') || q.includes('cuttack') || q.includes('institute') || q.includes('about')) {
      return {
        text: `**Ajay Binay Institute of Technology (ABIT)**:
• **Location**: Sector-1, CDA, Cuttack, Odisha - 753014.
• **Accreditations**: NAAC Accredited, AICTE Approved, Affiliated to BPUT, Odisha.
• **Department**: Electrical & Computer Engineering (ECE).
• **Vision**: Empowering next-generation engineers with hands-on technical skills, industry tie-ups, and cutting-edge innovations.`,
        actions: [
          { label: 'Visit Home Page', page: 'home' }
        ]
      };
    }

    // Default Fallback
    return {
      text: `I'm here to help with anything on the ABIT portal! You can ask me:
• *"How do I submit an innovation project?"*
• *"Show me active recruitment drives & placements"*
• *"How does the Hall of Fame podium work?"*
• *"How to access the 3 Panels Hub?"*
• *"Is this portal compatible with mobile devices?"*

Feel free to choose an option below or type your question:`,
      actions: [
        { label: '🚀 Submit Project', page: 'submit' },
        { label: '💼 Placement Portal', page: 'placement' },
        { label: '🏆 Hall of Fame', page: 'leaderboard' },
        { label: '🛡️ 3 Panels Hub', page: 'governance' }
      ]
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Realistic bot response delay
    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply.text,
        actions: reply.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 650);
  };

  const handleActionClick = (action) => {
    if (action.page && onNavigate) {
      onNavigate(action.page);
      // Close bot on small screens when navigating to avoid blocking view
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action.action === 'auth' && onOpenAuth) {
      onOpenAuth();
    } else if (action.action) {
      let promptText = '';
      if (action.action === 'ask_submit') promptText = 'How do I submit an innovation project?';
      if (action.action === 'ask_placements') promptText = 'Tell me about placement drives and recruiters.';
      if (action.action === 'ask_panels') promptText = 'How do I use the 3 Panels Hub and Admin PIN?';
      if (action.action === 'ask_responsive') promptText = 'Is this website responsive on mobile and tablet?';
      if (promptText) handleSendMessage(promptText);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: "Conversation cleared! How can I assist you today?",
        actions: [
          { label: '🚀 Submit Project', page: 'submit' },
          { label: '💼 Placements', page: 'placement' },
          { label: '🏆 Hall of Fame', page: 'leaderboard' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="abit-ai-bot-root">
      {/* Speech Bubble Tooltip for Mascot */}
      {!isOpen && showTooltip && (
        <div className="abit-bot-tooltip animate-fade-in" onClick={() => setIsOpen(true)}>
          <div className="bot-tooltip-text">
            <span>👋 Hi! Need help with <strong>Placements</strong> or <strong>Projects</strong>? Tap me!</span>
          </div>
          <button 
            type="button" 
            className="bot-tooltip-close" 
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            title="Dismiss"
          >
            <X size={12} />
          </button>
          <div className="bot-tooltip-arrow" />
        </div>
      )}

      {/* Floating Mascot Button */}
      <button 
        type="button" 
        className={`abit-bot-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open ABIT AI Assistant"
        title="Open ABIT AI Assistant"
      >
        <div className="bot-avatar-ring">
          <img 
            src={aiBotImg} 
            alt="ABIT AI Bot Mascot" 
            className="bot-mascot-img"
          />
          <span className="bot-online-dot" />
        </div>
        
        {hasUnread && !isOpen && (
          <span className="bot-unread-badge">
            <Sparkles size={11} />
          </span>
        )}
      </button>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="abit-bot-window animate-scale-up" role="dialog" aria-label="ABIT AI Chat Window">
          {/* Chat Header */}
          <div className="abit-bot-header">
            <div className="bot-header-info">
              <div className="bot-header-avatar-wrap">
                <img src={aiBotImg} alt="AI Bot" className="bot-header-avatar" />
                <span className="bot-header-status-dot" />
              </div>
              <div>
                <div className="bot-header-title">
                  <span>ABIT AI Assistant</span>
                  <span className="bot-chip-label">COPILOT</span>
                </div>
                <div className="bot-header-subtitle">
                  Ajay Binay Institute of Technology &bull; ECE Guide
                </div>
              </div>
            </div>

            <div className="bot-header-actions">
              <button 
                type="button" 
                className="bot-icon-btn" 
                onClick={handleClearChat}
                title="Clear Conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button 
                type="button" 
                className="bot-icon-btn close-btn" 
                onClick={() => setIsOpen(false)}
                title="Close AI Assistant"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="bot-quick-topics-strip">
            <button type="button" className="quick-topic-chip" onClick={() => handleActionClick({ page: 'submit' })}>
              <PlusCircle size={12} />
              <span>Submit</span>
            </button>
            <button type="button" className="quick-topic-chip" onClick={() => handleActionClick({ page: 'placement' })}>
              <Briefcase size={12} />
              <span>Placements</span>
            </button>
            <button type="button" className="quick-topic-chip" onClick={() => handleActionClick({ page: 'governance' })}>
              <ShieldCheck size={12} />
              <span>Panels</span>
            </button>
            <button type="button" className="quick-topic-chip" onClick={() => handleActionClick({ action: 'ask_responsive' })}>
              <Smartphone size={12} />
              <span>Mobile</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="abit-bot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`bot-msg-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                {msg.sender === 'bot' && (
                  <img src={aiBotImg} alt="Bot" className="bot-msg-avatar" />
                )}
                <div className="bot-msg-bubble-wrap">
                  <div className={`bot-msg-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                    <div className="msg-text-content">
                      {msg.text.split('\n').map((line, idx) => {
                        // Basic bold parsing for markdown
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={idx} className="msg-line">
                            {parts.map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    {/* Action buttons inside bot messages */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="bot-msg-actions-grid">
                        {msg.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            type="button"
                            className="bot-action-pill"
                            onClick={() => handleActionClick(act)}
                          >
                            <span>{act.label}</span>
                            <ChevronRight size={13} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="bot-msg-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="bot-msg-row bot-row animate-fade-in">
                <img src={aiBotImg} alt="Bot" className="bot-msg-avatar" />
                <div className="bot-typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
          <form 
            className="abit-bot-input-box"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input 
              ref={inputRef}
              type="text" 
              className="bot-input-field"
              placeholder="Ask ABIT AI anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button 
              type="submit" 
              className="bot-send-btn"
              disabled={!inputText.trim() || isTyping}
              title="Send Message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
