/**
 * HK.VIRTUAL.ASSISTANT - Interactive Knowledge Bot for Harsha Kanakadandila's Portfolio
 * Powered by client-side NLP pattern matching and rich interactive responses.
 */

document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const quickChipsContainer = document.getElementById('quick-chips');

  // Harsha's Comprehensive Portfolio Knowledge Base
  const HARSHA_DATA = {
    name: "Harsha Kanakadandila",
    title: "Cloud Engineer | AWS Certified Solutions Architect | Terraform | Serverless | Python | Cloud Infrastructure",
    location: "Hyderabad, Telangana, India",
    email: "harshakanakadandila@gmail.com",
    whatsapp: "+91 9963481721",
    whatsappUrl: "https://wa.me/919963481721",
    linkedin: "https://linkedin.com/in/harsha-kanaka",
    github: "https://github.com/Kanaka-Harsha",
    instagram: "https://www.instagram.com/harsha.k.01/",
    resume: "../images/Harsha.K - Resume V11.pdf",
    
    about: `I am passionate about Cloud Computing, Software Engineering, and Application Development, with a strong interest in building scalable solutions using AWS.<br><br>My experience includes developing serverless and server-based applications, automating workflows, and building cloud-native systems. I hold the AWS Certified Cloud Practitioner & Google Cloud Associate Cloud Engineer certifications and am currently pursuing AWS Solutions Architect - Associate.`,

    topSkills: ["Cloud Computing", "Python (Programming Language)", "SQL", "Git", "Terraform"],
    
    skillsCategory: {
      cloud: ["AWS Architecture Building", "GCP", "Terraform (IaC)", "Serverless", "Git & GitHub", "EC2", "S3", "Lambda", "DynamoDB", "CloudFront", "SQS", "API Gateway", "IoT Core"],
      iot: ["IoT & Cloud Integration", "ESP32", "Raspberry Pi", "MQTT", "Edge Computing", "RTSP Protocols", "RFID"],
      dev: ["Python", "SQL", "Bash Scripting", "HTML/CSS/JS", "C", "Node.js", "PostgreSQL", "OpenCV / YOLO"]
    },

    experience: {
      role: "IoT Intern",
      company: "TokaiEbi Technologies",
      highlights: [
        "Designed and deployed a cloud-centric IoT automation platform on AWS for Recirculating Aquaculture Systems (RAS).",
        "Architected MQTT-based device communication using AWS IoT Core for real-time telemetry & actuation.",
        "Built serverless data validation & alerting pipeline using AWS Lambda, Python, DynamoDB, and Telegram alerts.",
        "Designed AWS S3 media transfer pipelines for CCTV edge footage and integrated CloudFront CDN.",
        "Integrated ESP32 and Raspberry Pi edge devices with industrial sensors and RTSP camera upload resilience."
      ]
    },

    certifications: [
      { title: "AWS Certified Solutions Architect – Associate", status: "Ongoing / Pursuing", details: "Focusing on multi-tier, highly available, and fault-tolerant system designs." },
      { title: "AWS Certified Cloud Practitioner", status: "Certified", details: "Foundational understanding of AWS cloud platform, security, and compliance." },
      { title: "Google Cloud Associate Cloud Engineer", status: "Certified", details: "Proficiency in managing GCP resources and infrastructure deployment." }
    ],

    projects: [
      {
        name: "CTC (Citizen Traffic Camera)",
        tagline: "AI & Serverless Incident Reporting",
        details: "Automated pipeline to ingest, analyze, and categorize public incident & dashcam reports using AWS EC2, S3, SQS, Lambda, and Gemini AI.",
        github: "https://github.com/Kanaka-Harsha/CTC-App",
        demo: "https://d2hr9yf28vo91a.cloudfront.net"
      },
      {
        name: "H-Drive: Pay-As-You-Store",
        tagline: "Event-Driven Storage Engine",
        details: "Cost-optimized, pay-for-what-you-use cloud storage platform architected with S3, Lambda, DynamoDB, and API Gateway.",
        github: "https://github.com/Kanaka-Harsha/H-Drive",
        demo: "https://d3kojv5ms7rmg6.cloudfront.net/"
      },
      {
        name: "Smart Attendance System",
        tagline: "IoT Hardware & DB Automation",
        details: "Automated RFID & ESP32 tracking system paired with a Node.js and PostgreSQL backend to eliminate manual entry errors.",
        github: "https://github.com/Kanaka-Harsha/RFID-Attandence-System"
      },
      {
        name: "Smart Traffic Monitoring",
        tagline: "YOLO Computer Vision",
        details: "Object detection model using Python, OpenCV, and YOLO to detect non-helmet riders and capture vehicle license plates.",
        github: "https://github.com/Kanaka-Harsha/Smart-Traffic-Monitoring"
      },
      {
        name: "Smart Mirror",
        tagline: "Raspberry Pi Assistant",
        details: "Interactive daily dashboard running behind a two-way mirror showing live weather, calendar, and news via Python & MagicMirror."
      }
    ],

    extracurriculars: [
      "🏆 **Cricket**: Champion & Runner-up representing the university cricket team in inter-college tournaments.",
      "🎮 **Esports**: Competitive esports player with strong strategic coordination.",
      "👥 **Connect Student Club**: Tech Lead & Member, mentoring student teams and organizing tech events."
    ]
  };

  // Helper to append message to chat
  function addMessage(content, sender, isHTML = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    if (isHTML) {
      msgDiv.innerHTML = content;
    } else {
      msgDiv.innerText = content;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show realistic bot typing indicator
  function showTypingIndicator(callback, delay = 600) {
    const indicator = document.createElement('div');
    indicator.classList.add('message', 'bot', 'typing-indicator');
    indicator.id = 'bot-typing';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById('bot-typing');
      if (el) el.remove();
      callback();
    }, delay);
  }

  // Generate bot response based on query keywords
  function processUserQuery(rawInput) {
    const query = rawInput.toLowerCase().trim();

    if (!query) return;

    // Direct Commands
    if (query === '/clear' || query === 'clear' || query === 'cls') {
      chatMessages.innerHTML = '';
      addMessage("Chat history cleared! How can I help you regarding Harsha?", 'bot');
      return;
    }

    // 1. Greetings
    if (/^(hi|hello|hey|namaste|yo|sup|greetings|good morning|good afternoon|good evening)/i.test(query)) {
      const response = `Hello there! 👋 I'm Harsha's Virtual Assistant.<br><br>Feel free to ask me anything about Harsha's <b>Cloud Engineering experience</b>, <b>AWS projects</b>, <b>skills</b>, or how to <b>contact him</b>!`;
      addMessage(response, 'bot', true);
      return;
    }

    // 2. Who is Harsha / About
    if (query.includes('who is') || query.includes('about') || query.includes('bio') || query.includes('summary') || query.includes('background') || query.includes('introduction')) {
      const response = `<b>Harsha Kanakadandila</b> is a <b>Cloud Engineer & AWS Certified Solutions Architect</b> based in Hyderabad, India 📍.<br><br>${HARSHA_DATA.about}<br><br>💡 <i>Tagline:</i> "print(\"Nature Ka Pyaar Aur Logon Ka Yaar\")"`;
      addMessage(response, 'bot', true);
      return;
    }

    // 3. Specific Project: CTC
    if (query.includes('ctc') || query.includes('citizen traffic') || query.includes('dashcam')) {
      const p = HARSHA_DATA.projects[0];
      const response = `<b>🚀 ${p.name}</b> (${p.tagline})<br><br>${p.details}<br><br><b>Tech Stack:</b> Python, AWS EC2, S3, SQS, Lambda, RDS, Gemini AI<br>🔗 <a href="${p.github}" target="_blank" class="bot-link"><i class="fab fa-github"></i> GitHub Code</a>`;
      addMessage(response, 'bot', true);
      return;
    }

    // 4. Specific Project: H-Drive
    if (query.includes('h-drive') || query.includes('hdrive') || query.includes('pay-as-you-store') || query.includes('storage')) {
      const p = HARSHA_DATA.projects[1];
      const response = `<b>☁️ ${p.name}</b> (${p.tagline})<br><br>${p.details}<br><br><b>Tech Stack:</b> AWS S3, AWS Lambda, DynamoDB, API Gateway<br>🔗 <a href="${p.github}" target="_blank" class="bot-link"><i class="fab fa-github"></i> GitHub Code</a>`;
      addMessage(response, 'bot', true);
      return;
    }

    // 5. Projects Overview
    if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('built')) {
      let response = `<b>🛠️ Harsha's Featured Projects:</b><br><ol style="margin-left: 18px; margin-top: 8px;">`;
      HARSHA_DATA.projects.forEach(p => {
        response += `<li style="margin-bottom: 8px;"><b>${p.name}:</b> ${p.tagline} ${p.github ? `<a href="${p.github}" target="_blank" class="bot-link">[Code]</a>` : ''}</li>`;
      });
      response += `</ol><br>Which project would you like to know more about? (e.g., CTC, H-Drive, Attendance System)`;
      addMessage(response, 'bot', true);
      return;
    }

    // 6. Work Experience / Internship
    if (query.includes('experience') || query.includes('intern') || query.includes('job') || query.includes('company') || query.includes('tokaiebi')) {
      const exp = HARSHA_DATA.experience;
      let response = `<b>💼 ${exp.role} @ ${exp.company}</b><br><ul style="margin-left: 18px; margin-top: 6px;">`;
      exp.highlights.forEach(h => {
        response += `<li style="margin-bottom: 4px;">${h}</li>`;
      });
      response += `</ul>`;
      addMessage(response, 'bot', true);
      return;
    }

    // 7. Skills & Tech Stack
    if (query.includes('skill') || query.includes('stack') || query.includes('python') || query.includes('terraform') || query.includes('sql') || query.includes('git') || query.includes('gcp') || query.includes('bash')) {
      let response = `<b>⚡ Harsha's Top Skills:</b><br>${HARSHA_DATA.topSkills.map(s => `<span class="bot-tag">${s}</span>`).join(' ')}<br><br>`;
      response += `<b>☁️ Cloud & Architecture:</b> ${HARSHA_DATA.skillsCategory.cloud.join(', ')}<br><br>`;
      response += `<b>📡 IoT & Edge:</b> ${HARSHA_DATA.skillsCategory.iot.join(', ')}<br><br>`;
      response += `<b>💻 Languages & Tools:</b> ${HARSHA_DATA.skillsCategory.dev.join(', ')}`;
      addMessage(response, 'bot', true);
      return;
    }

    // 8. AWS / Cloud Expertise
    if (query.includes('aws') || query.includes('cloud') || query.includes('serverless') || query.includes('architecture')) {
      const response = `<b>☁️ AWS & Cloud Expertise:</b><br>Harsha specializes in designing serverless, event-driven architectures, automated pipelines, and IaC with Terraform. He holds the <b>AWS Certified Cloud Practitioner</b> badge and is pursuing the <b>AWS Solutions Architect - Associate</b> certification!`;
      addMessage(response, 'bot', true);
      return;
    }

    // 9. Certifications
    if (query.includes('certif') || query.includes('degree') || query.includes('qualification')) {
      let response = `<b>📜 Validated Certifications:</b><br><ul style="margin-left: 18px; margin-top: 6px;">`;
      HARSHA_DATA.certifications.forEach(c => {
        response += `<li style="margin-bottom: 6px;"><b>${c.title}</b> (${c.status}) - ${c.details}</li>`;
      });
      response += `</ul>`;
      addMessage(response, 'bot', true);
      return;
    }

    // 10. Contact / Email / Phone / Socials
    if (query.includes('contact') || query.includes('email') || query.includes('mail') || query.includes('phone') || query.includes('whatsapp') || query.includes('reach') || query.includes('hire') || query.includes('linkedin') || query.includes('github') || query.includes('instagram')) {
      const response = `<b>📬 Get in touch with Harsha:</b><br><br>` +
        `📧 <b>Email:</b> <a href="mailto:${HARSHA_DATA.email}" class="bot-link">${HARSHA_DATA.email}</a><br>` +
        `💬 <b>WhatsApp:</b> <a href="${HARSHA_DATA.whatsappUrl}" target="_blank" class="bot-link">${HARSHA_DATA.whatsapp}</a><br>` +
        `💼 <b>LinkedIn:</b> <a href="${HARSHA_DATA.linkedin}" target="_blank" class="bot-link">harsha-kanaka</a><br>` +
        `💻 <b>GitHub:</b> <a href="${HARSHA_DATA.github}" target="_blank" class="bot-link">Kanaka-Harsha</a><br>` +
        `📸 <b>Instagram:</b> <a href="${HARSHA_DATA.instagram}" target="_blank" class="bot-link">@harsha.k.01</a>`;
      addMessage(response, 'bot', true);
      return;
    }

    // 11. Resume / CV
    if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
      const response = `📄 You can download Harsha's latest resume here:<br><br><a href="${HARSHA_DATA.resume}" target="_blank" class="bot-btn"><i class="fas fa-file-download"></i> Download Resume (PDF)</a>`;
      addMessage(response, 'bot', true);
      return;
    }

    // 12. Extracurriculars / Sports / Hobbies
    if (query.includes('cricket') || query.includes('esports') || query.includes('club') || query.includes('hobby') || query.includes('hobbies') || query.includes('sport') || query.includes('extra')) {
      const response = `<b>🏆 Extra Curriculars & Hobbies:</b><br><br>${HARSHA_DATA.extracurriculars.join('<br><br>')}`;
      addMessage(response, 'bot', true);
      return;
    }

    // Default Fallback
    const fallbackResponse = `I'm not completely sure about that, but here is what I can tell you:<br><br>` +
      `Harsha Kanakadandila is a <b>Cloud Engineer & AWS Certified Solutions Architect</b> specializing in Terraform, Serverless, and Python.<br><br>` +
      `Try asking about: <b>Projects</b>, <b>Skills</b>, <b>Experience</b>, <b>Certifications</b>, or <b>Contact details</b>!<br><br>` +
      `Or chat directly with Harsha on <a href="${HARSHA_DATA.whatsappUrl}" target="_blank" class="bot-link">WhatsApp</a> or <a href="mailto:${HARSHA_DATA.email}" class="bot-link">Email</a>.`;
    addMessage(fallbackResponse, 'bot', true);
  }

  // Handle user send action
  function handleSendMessage(textOverride = null) {
    const text = textOverride || userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    if (!textOverride) userInput.value = '';

    showTypingIndicator(() => {
      processUserQuery(text);
    });
  }

  // Event Listeners
  sendBtn.addEventListener('click', () => handleSendMessage());

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Quick Action Chip Clicks
  if (quickChipsContainer) {
    quickChipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (chip && chip.dataset.query) {
        handleSendMessage(chip.dataset.query);
      }
    });
  }
});
