export const INITIAL_PROJECTS = [
  {
    id: 'proj-001',
    title: 'Smart Microgrid & IoT Energy Monitor for Campus Labs',
    tagline: 'Real-time three-phase electrical consumption monitoring with anomaly detection and automated load shedding.',
    domain: 'iot',
    domainLabel: 'Internet of Things (IoT)',
    techStack: ['ESP32', 'FreeRTOS', 'MQTT', 'Node.js', 'Grafana', 'InfluxDB', 'Current Transformers'],
    authors: [
      { 
        name: 'Ayush Mohapatra', 
        rollNo: '2101214012', 
        year: '4th Year (Batch 2021-25)', 
        branch: 'Electrical & Computer Engg',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Suryakanta Senapati', 
        rollNo: '2101214045', 
        year: '4th Year (Batch 2021-25)', 
        branch: 'Electrical & Computer Engg',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    ],
    mentor: 'Dr. P. K. Rout (Prof & HOD, ECE)',
    githubUrl: 'https://github.com/abit-tech-warriors/smart-microgrid-iot',
    liveUrl: 'https://smartgrid-demo.abit-ece.ac.in',
    demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    docUrl: 'https://drive.google.com/file/d/sample-smartgrid-paper',
    abstract: 'This project introduces an edge-computed IoT smart microgrid telemetry system deployed across ABIT department labs. Utilizing ESP32 microcontrollers with SCT-013 current sensors, it measures phase voltages, reactive power, power factor, and harmonics in real time. Anomalies such as overvoltage or phase unbalance trigger automated solid-state relays within 15ms.',
    keyFeatures: [
      'Sub-20ms edge detection of line surges and phase unbalances',
      'Dual communication fallback: Wi-Fi MQTT and LoRa 868MHz',
      'Interactive Grafana telemetry dashboard with predictive peak-demand alerts',
      '18% lab energy cost reduction during campus operational testing'
    ],
    hardwareComponents: ['ESP32-WROOM-32D', 'SCT-013 Non-invasive AC Sensors', 'ZMPT101B Voltage Modules', 'Solid State Relays', 'OLED 0.96 Display'],
    upvotes: 42,
    verified: true,
    featured: true,
    date: '2025-02-14',
    semester: 'Semester 8',
    status: 'Completed / Deployed in ABIT Labs'
  },
  {
    id: 'proj-002',
    title: 'ABIT VisionAssist: Indian Sign Language Real-Time Interpreter',
    tagline: 'Deep learning pipeline with spatial hand-landmark tracking translating ISL gestures into synthesized speech.',
    domain: 'ai-ml',
    domainLabel: 'AI & Machine Learning',
    techStack: ['Python', 'YOLOv8', 'MediaPipe', 'PyTorch', 'FastAPI', 'React', 'WebRTC'],
    authors: [
      { name: 'Debashis Panda', rollNo: '2201214028', year: '3rd Year (Batch 2022-26)', branch: 'Electrical & Computer Engg' },
      { name: 'Ritesh Kumar Sahoo', rollNo: '2201214061', year: '3rd Year (Batch 2022-26)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Prof. S. R. Mishra (Assistant Prof, ECE)',
    githubUrl: 'https://github.com/abit-tech-warriors/vision-assist-isl',
    liveUrl: 'https://visionassist-abit.web.app',
    demoVideoUrl: 'https://www.youtube.com/watch?v=sample-visionassist',
    docUrl: 'https://drive.google.com/file/d/sample-isl-paper',
    abstract: 'VisionAssist is an AI-driven accessibility tool engineered to bridge communication gaps for the deaf and hard-of-hearing community. The system leverages 21 3D hand landmarks via MediaPipe and a customized bidirectional LSTM neural network to decode complex continuous Indian Sign Language (ISL) gestures into real-time speech and bilingual subtitles (Odia & English).',
    keyFeatures: [
      '96.4% gesture recognition accuracy across 85 distinct ISL symbols',
      'Sub-60ms inference latency running directly on consumer webcams',
      'Bilingual text-to-speech synthesis supporting English and regional Odia audio',
      'WebRTC streaming engine with zero cloud latency during edge mode'
    ],
    hardwareComponents: ['Webcam / HD Camera', 'NVIDIA Jetson Nano (Edge Kit)'],
    upvotes: 58,
    verified: true,
    featured: true,
    date: '2025-01-20',
    semester: 'Semester 6',
    status: 'Prototype Validated'
  },
  {
    id: 'proj-003',
    title: 'Autonomous AgroBot: Rover with Weed Detection & Precision Spraying',
    tagline: 'ROS2-driven autonomous wheeled rover equipped with computer vision for targeted agrochemical spraying.',
    domain: 'robotics',
    domainLabel: 'Robotics',
    techStack: ['ROS2 Humble', 'Raspberry Pi 4', 'Arduino Mega', 'OpenCV', 'SLAM', 'LiDAR', 'Differential Drive'],
    authors: [
      { name: 'Priyanshu Das', rollNo: '2101214088', year: '4th Year (Batch 2021-25)', branch: 'Electrical & Computer Engg' },
      { name: 'Ankita Senapati', rollNo: '2101214009', year: '4th Year (Batch 2021-25)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Dr. M. Behera (Associate Prof, ECE)',
    githubUrl: 'https://github.com/abit-tech-warriors/agrobot-ros2',
    liveUrl: 'https://agrobot.abit-projects.live',
    demoVideoUrl: 'https://youtube.com/watch?v=agrobot-field-test',
    docUrl: 'https://drive.google.com/file/d/agrobot-report',
    abstract: 'AgroBot addresses sustainable agricultural pest management. Running on ROS2 navigation stack with 2D RPLiDAR, the four-wheel rover autonomously maps crop rows using Cartographer SLAM, identifies invasive weed species via an onboard Raspberry Pi camera, and actuates localized micro-nozzles, cutting chemical pesticide run-off by 72%.',
    keyFeatures: [
      'Autonomous waypoint navigation and obstacle avoidance using 360° RPLiDAR',
      'Real-time weed segmentation model trained on local agricultural crop datasets',
      'PWM controlled solenoid valves for targeted micro-droplet delivery',
      'Failsafe emergency braking and manual tele-operation via 2.4GHz RF control'
    ],
    hardwareComponents: ['Raspberry Pi 4 (4GB)', 'RPLiDAR A1', 'L298N High-Torque Motor Drivers', '12V DC Planetary Gear Motors', '12V Diaphragm Solenoid Pump'],
    upvotes: 49,
    verified: true,
    featured: true,
    date: '2025-02-01',
    semester: 'Semester 8',
    status: 'Field Tested'
  },
  {
    id: 'proj-004',
    title: 'STM32 CAN-Bus Vehicle Telemetry & Battery Health Predictor',
    tagline: 'Automotive telemetry logger monitoring battery cell voltage balance, temperatures, and OBD-II diagnostics.',
    domain: 'embedded',
    domainLabel: 'Embedded Systems',
    techStack: ['C / Embedded C', 'STM32CubeIDE', 'FreeRTOS', 'CAN 2.0B', 'UART', 'SPI Flash', 'KiCAD'],
    authors: [
      { name: 'Siddharth Biswal', rollNo: '2201214073', year: '3rd Year (Batch 2022-26)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Er. Tanmay Mohanty (ECE Dept)',
    githubUrl: 'https://github.com/abit-tech-warriors/stm32-canbus-telemetry',
    liveUrl: '',
    demoVideoUrl: 'https://youtube.com/watch?v=stm32-bms-benchtest',
    docUrl: 'https://drive.google.com/file/d/canbus-thesis',
    abstract: 'Engineered for electric vehicles and experimental EV powertrains, this embedded module interfaces with vehicle Controller Area Network (CAN) bus protocols. Based on an STM32F401RET6 running FreeRTOS with preemptive task scheduling, it samples 16-channel cell voltages, calculates State-of-Charge (SoC) via Coulomb counting, and logs blackbox records onto 64MB SPI NOR flash memory.',
    keyFeatures: [
      'Dual CAN 2.0B transceiver support with configurable 500kbps / 1Mbps baud rate',
      'FreeRTOS task segregation for sensor acquisition, logging, and diagnostics',
      'Under-voltage and thermal runaway cut-off within 5 milliseconds',
      'Custom 2-layer PCB designed in KiCad with isolation and ESD protection'
    ],
    hardwareComponents: ['STM32F401RE Nucleo', 'MCP2551 CAN Transceiver', 'W25Q64 SPI Flash', 'DS18B20 Temp Array', 'Custom KiCad PCB'],
    upvotes: 37,
    verified: true,
    featured: false,
    date: '2025-01-11',
    semester: 'Semester 6',
    status: 'Hardware Fabricated'
  },
  {
    id: 'proj-005',
    title: 'CampuSync: Training & Placement Corporate Drive Automation Portal',
    tagline: 'Full-stack platform streamlining company drives, eligibility filtering, resume parsing, and interview scheduling.',
    domain: 'full-stack',
    domainLabel: 'Full Stack Development',
    techStack: ['React 19', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Redis', 'TailwindCSS', 'Docker'],
    authors: [
      { name: 'Om Prakash Jena', rollNo: '2101214036', year: '4th Year (Batch 2021-25)', branch: 'Electrical & Computer Engg' },
      { name: 'Soumya Ranjan Kar', rollNo: '2101214059', year: '4th Year (Batch 2021-25)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Prof. K. C. Pradhan (Placement Officer & Faculty)',
    githubUrl: 'https://github.com/abit-tech-warriors/campusync-portal',
    liveUrl: 'https://campusync.abit.ac.in',
    demoVideoUrl: 'https://youtube.com/watch?v=campusync-walkthrough',
    docUrl: 'https://drive.google.com/file/d/campusync-docs',
    abstract: 'CampuSync centralizes campus placement operations for ABIT. Students maintain verified academic records, resume versions, and skill credentials. T&P administrators create recruiter company drives with strict GPA/backlog criteria, dispatching automated SMS/email notifications and managing multi-round technical interview schedules seamlessly.',
    keyFeatures: [
      'One-click student eligibility validation matching company criteria in seconds',
      'Automated PDF resume parser extracting skill tags and project links',
      'Real-time interview slot booking with Google Calendar integration',
      'Role-based access control (Admin, Student, Faculty Guide, Corporate Recruiter)'
    ],
    hardwareComponents: ['Cloud Hosted on AWS EC2 & RDS'],
    upvotes: 64,
    verified: true,
    featured: true,
    date: '2025-02-18',
    semester: 'Semester 8',
    status: 'In Active Campus Beta'
  },
  {
    id: 'proj-006',
    title: 'SimuCircuits: Interactive Virtual Lab & Circuit Simulator Studio',
    tagline: 'In-browser interactive schematic editor and SPICE circuit simulation studio for ECE engineering labs.',
    domain: 'web-dev',
    domainLabel: 'Web Development',
    techStack: ['React 19', 'Canvas API', 'Web Audio API', 'TypeScript', 'Vite', 'CSS Grid', 'MathJS'],
    authors: [
      { name: 'Aditya Narayan Tripathy', rollNo: '2301214004', year: '2nd Year (Batch 2023-27)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Er. R. N. Swain (ECE Lab In-charge)',
    githubUrl: 'https://github.com/abit-tech-warriors/simu-circuits-studio',
    liveUrl: 'https://simucircuits.vercel.app',
    demoVideoUrl: 'https://youtube.com/watch?v=simucircuits-demo',
    docUrl: '',
    abstract: 'SimuCircuits brings hardware laboratory experimentation directly into modern web browsers. Students can drag-and-drop resistors, capacitors, inductors, diodes, op-amps, and signal generators onto an infinite interactive grid, connecting virtual probes and virtual dual-channel oscilloscopes that simulate transient and AC analysis in real time.',
    keyFeatures: [
      'Interactive wire-routing engine with automatic node snapping and loop calculation',
      'Real-time dual-trace oscilloscope with time-base and trigger level controls',
      'Pre-built ABIT lab experiment templates (RLC Resonance, Half-Wave Rectifier, BJT Amplifier)',
      'Export schematics to PNG, SVG, or Netlist format'
    ],
    hardwareComponents: ['Pure Web Browser (No Installation Required)'],
    upvotes: 51,
    verified: true,
    featured: false,
    date: '2025-01-30',
    semester: 'Semester 4',
    status: 'Live & Used by 200+ Students'
  },
  {
    id: 'proj-007',
    title: 'Automated CI/CD Test Harness & Stress Engine for Banking APIs',
    tagline: 'End-to-end automated testing framework with contract validation, mock servers, and k6 stress scripts.',
    domain: 'testing',
    domainLabel: 'Software Testing & QA',
    techStack: ['Cypress', 'Playwright', 'k6', 'Postman / Newman', 'Docker', 'GitHub Actions', 'Allure Reports'],
    authors: [
      { name: 'Tanushree Barik', rollNo: '2101214078', year: '4th Year (Batch 2021-25)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Prof. B. K. Satpathy (ECE Dept)',
    githubUrl: 'https://github.com/abit-tech-warriors/fintech-qa-harness',
    liveUrl: 'https://qa-harness-demo.netlify.app',
    demoVideoUrl: '',
    docUrl: 'https://drive.google.com/file/d/qa-harness-whitepaper',
    abstract: 'This project implements a multi-tier test automation suite simulating high-concurrency core banking transactions. It combines contract-driven API tests, security authentication edge testing (OAuth2/JWT token fuzzing), UI end-to-end flows, and automated performance degradation benchmarking generating visual Allure test reports.',
    keyFeatures: [
      'Comprehensive suite of 340+ automated test cases executed in under 4 minutes',
      'Synthetic load testing handling up to 1,500 requests/sec with k6 engine',
      'Automated visual regression testing detecting layout breakages across viewport sizes',
      'Zero-touch continuous integration pipeline triggered on every Git pull request'
    ],
    hardwareComponents: ['Docker Container Runner', 'Self-Hosted Runner Node'],
    upvotes: 31,
    verified: true,
    featured: false,
    date: '2025-02-05',
    semester: 'Semester 8',
    status: 'CI Pipeline Deployed'
  },
  {
    id: 'proj-008',
    title: 'SprintForge: Agile Hardware-Software Product Lifecycle Manager',
    tagline: 'Specialized agile sprint tracker managing hardware bills of materials, PCB revisions, and firmware sprints.',
    domain: 'management',
    domainLabel: 'Tech Management',
    techStack: ['React', 'Zustand', 'Chart.js', 'Firebase', 'CSS Modules', 'Web Export'],
    authors: [
      { name: 'Karan Sharma', rollNo: '2201214032', year: '3rd Year (Batch 2022-26)', branch: 'Electrical & Computer Engg' },
      { name: 'Manisha Mohanty', rollNo: '2201214041', year: '3rd Year (Batch 2022-26)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Dr. S. K. Dash (Dean Academics & ECE)',
    githubUrl: 'https://github.com/abit-tech-warriors/sprintforge-mgmt',
    liveUrl: 'https://sprintforge.abit.app',
    demoVideoUrl: 'https://youtube.com/watch?v=sprintforge-pitch',
    docUrl: 'https://drive.google.com/file/d/sprintforge-case-study',
    abstract: 'Unlike traditional software-only Kanban boards, SprintForge integrates hardware procurement lead times, component bill-of-materials (BOM) cost tracking, and microcontroller firmware release milestones into unified agile sprints. Designed specifically for multidisciplinary university engineering capstone teams.',
    keyFeatures: [
      'Unified hardware BOM vs. software story point burn-down charts',
      'Supplier lead-time buffer tracking and budget threshold notifications',
      'Gantt chart generation with critical path method (CPM) scheduling',
      'One-click generation of ABIT Department Capstone progress reports'
    ],
    hardwareComponents: ['Cloud / Progressive Web App'],
    upvotes: 39,
    verified: true,
    featured: false,
    date: '2025-01-18',
    semester: 'Semester 6',
    status: 'Adopted in Final Year Projects'
  },
  {
    id: 'proj-009',
    title: 'SecIoT: Zero-Trust Intrusion Detection System for Campus IoT Nodes',
    tagline: 'Network edge intrusion detection utilizing packet signature inspection and honeypots against Mirai botnets.',
    domain: 'cloud-cyber',
    domainLabel: 'Cloud & Cybersecurity',
    techStack: ['Go', 'eBPF', 'Docker', 'WireGuard', 'Prometheus', 'Grafana', 'Snort IDS'],
    authors: [
      { name: 'Bikash Chandra Rout', rollNo: '2101214018', year: '4th Year (Batch 2021-25)', branch: 'Electrical & Computer Engg' }
    ],
    mentor: 'Prof. A. K. Jena (Cybersecurity Lab)',
    githubUrl: 'https://github.com/abit-tech-warriors/seciot-zero-trust',
    liveUrl: 'https://seciot-status.abit.ac.in',
    demoVideoUrl: '',
    docUrl: 'https://drive.google.com/file/d/seciot-paper',
    abstract: 'SecIoT protects heterogeneous microcontroller nodes across campus networks against lateral movement attacks. Running lightweight eBPF probes at the gateway layer, it identifies unauthorized port knocking, ARP spoofing, and brute-force Telnet attempts common in IoT botnet attacks, instantly isolating compromised MAC addresses into an isolated quarantine VLAN.',
    keyFeatures: [
      'Low-overhead eBPF packet inspection taking less than 2% CPU overhead',
      'Automated quarantine containment isolating compromised hardware within 300ms',
      'Encrypted WireGuard overlay tunnel linking remote field sensors securely',
      'Live attack map and incident forensic logs exportable for compliance'
    ],
    hardwareComponents: ['Custom Gateway Linux SBC', 'Dual Gigabit Ethernet NICs'],
    upvotes: 45,
    verified: true,
    featured: true,
    date: '2025-02-10',
    semester: 'Semester 8',
    status: 'Deployed on ECE Department Gateway'
  },
  {
    id: 'proj-010',
    title: 'HireMatrix: Automated Technical Code Evaluation & Placement Portal',
    tagline: 'Full-stack enterprise recruitment portal featuring isolated Docker sandbox code execution and live interview telemetry.',
    domain: 'full-stack',
    domainLabel: 'Full Stack Development',
    techStack: ['React 19', 'Node.js', 'Express', 'Docker Sandbox', 'PostgreSQL', 'Monaco Editor', 'WebSockets', 'Redis'],
    authors: [
      { 
        name: 'Suryakanta Senapati', 
        rollNo: '2101214045', 
        year: '4th Year (Batch 2021-25)', 
        branch: 'Electrical & Computer Engg',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    ],
    mentor: 'Prof. K. C. Pradhan (Placement Officer & Faculty)',
    githubUrl: 'https://github.com/abit-tech-warriors/hirematrix-evaluator',
    liveUrl: 'https://hirematrix-abit.vercel.app',
    demoVideoUrl: 'https://youtube.com/watch?v=hirematrix-walkthrough',
    docUrl: 'https://drive.google.com/file/d/hirematrix-documentation',
    abstract: 'HireMatrix is a production-grade recruitment and placement automation platform created for ABIT. It integrates in-browser code editor (Monaco) with secure containerized Docker runners that evaluate student C++, Python, and Java submissions against hidden test suites with strict CPU and memory limits.',
    keyFeatures: [
      'Isolated Docker containers executing multi-language code with sub-200ms latency',
      'WebSocket synchronized live pair-programming interview room with audio/video',
      'Automated plagiarism detection and algorithmic time-complexity profiler',
      'Role-based dashboards for recruiters, students, and ECE placement coordinators'
    ],
    hardwareComponents: ['Cloud Hosted on AWS & Docker Containers'],
    upvotes: 68,
    verified: true,
    featured: true,
    date: '2025-02-22',
    semester: 'Semester 8',
    status: 'Production Ready'
  },
  {
    id: 'proj-011',
    title: 'NeuroVoice: Edge AI Deep Speech Denoising & Acoustic Feature Extractor',
    tagline: 'Lightweight convolutional neural network filtering high-noise industrial signals into crystal-clear synthesized audio.',
    domain: 'ai-ml',
    domainLabel: 'AI & Machine Learning',
    techStack: ['Python', 'PyTorch', 'ONNX Runtime', 'Conv-TasNet', 'FastAPI', 'Web Audio API', 'React'],
    authors: [
      { 
        name: 'Suryakanta Senapati', 
        rollNo: '2101214045', 
        year: '4th Year (Batch 2021-25)', 
        branch: 'Electrical & Computer Engg',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ayush Mohapatra',
        rollNo: '2101214012',
        year: '4th Year (Batch 2021-25)',
        branch: 'Electrical & Computer Engg',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    ],
    mentor: 'Dr. P. K. Rout (Prof & HOD, ECE)',
    githubUrl: 'https://github.com/abit-tech-warriors/neurovoice-denoiser',
    liveUrl: 'https://neurovoice.web.app',
    demoVideoUrl: 'https://youtube.com/watch?v=neurovoice-audio-benchmark',
    docUrl: 'https://drive.google.com/file/d/neurovoice-ieee-paper',
    abstract: 'NeuroVoice deploys an optimized deep learning model running on edge microprocessors and web browsers via ONNX WebAssembly. It isolates human speech frequencies from extreme industrial noise (fan hum, electrical motor buzzing, wind interference), achieving an SNR improvement of +18.4 dB with under 25ms processing latency.',
    keyFeatures: [
      'Conv-TasNet architecture quantized to 8-bit for real-time edge CPU inference',
      '+18.4 dB Signal-to-Noise Ratio (SNR) enhancement on standard benchmark datasets',
      'Zero-latency WebAudio API integration running client-side with no cloud dependency',
      'Dual model weights: Ultra-fast 4MB model for IoT chips and Hi-Fi 18MB model for PCs'
    ],
    hardwareComponents: ['Tested on Raspberry Pi 4 & ESP32-S3 Audio Kit'],
    upvotes: 74,
    verified: true,
    featured: true,
    date: '2025-02-28',
    semester: 'Semester 8',
    status: 'IEEE Paper Under Review'
  }
];
