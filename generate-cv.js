const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Users\\callo\\.cache\\puppeteer\\chrome\\win64-150.0.7871.24\\chrome-win64\\chrome.exe"
  });
  const page = await browser.newPage();

  // We read the local image to embed it as base64 so it works offline/in puppeteer easily
  const imagePath = path.join(__dirname, 'public', 'images', 'profile', 'adam.jpg');
  let base64Image = '';
  if (fs.existsSync(imagePath)) {
    const imgData = fs.readFileSync(imagePath);
    const ext = path.extname(imagePath).replace('.', '');
    base64Image = `data:image/${ext};base64,${imgData.toString('base64')}`;
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      color: #333;
      background-color: white;
      padding: 60px;
      font-size: 11pt;
      line-height: 1.5;
    }
    
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .profile-pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 30px;
      border: 3px solid #eee;
    }
    
    .header-info {
      flex: 1;
    }
    
    h1 {
      font-size: 28pt;
      font-weight: 700;
      color: #222;
      margin-bottom: 5px;
    }
    
    .job-title {
      font-size: 14pt;
      color: #555;
      margin-bottom: 10px;
    }
    
    .contact-info {
      display: flex;
      gap: 20px;
      font-size: 10pt;
      color: #444;
      align-items: center;
    }
    
    .contact-info span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    /* SVG icons */
    .icon {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }
    
    hr {
      border: none;
      border-top: 2px solid #ccc;
      margin: 20px 0;
    }
    
    .section-title {
      font-size: 14pt;
      font-weight: 700;
      color: #222;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    
    .summary-text {
      text-align: justify;
    }
    
    .item-header {
      margin-bottom: 5px;
    }
    
    .item-title {
      font-weight: 700;
      color: #222;
      font-size: 12pt;
    }
    
    .item-subtitle {
      font-size: 10.5pt;
      color: #444;
      margin-bottom: 5px;
    }
    
    .bullets {
      padding-left: 20px;
      margin-bottom: 15px;
    }
    
    .bullets li {
      margin-bottom: 5px;
    }
    
    .skills-list {
      list-style-type: none;
    }
    
    .skills-list li {
      margin-bottom: 5px;
    }
    
    .skills-category {
      font-weight: 600;
      color: #222;
    }
  </style>
</head>
<body>
  <div class="header">
    ${base64Image ? `<img src="${base64Image}" class="profile-pic" alt="Profile Picture" />` : ''}
    <div class="header-info">
      <h1>Adam Wondale</h1>
      <div class="job-title">Software Engineer</div>
      <div class="contact-info">
        <span>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          0967825821
        </span>
        <span>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          adambegizew@gmail.com
        </span>
        <span>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Addis Ababa, Ethiopia
        </span>
      </div>
    </div>
  </div>
  
  <hr />
  
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-text">
      I'm a recent Computer Science graduate who builds full-stack web and mobile applications. I work primarily with Next.js, React Native, and Node.js. For my final year project, I led backend development on a community crowdsourcing platform, and I've also built e-commerce Telegram bots and AI-powered exam prep tools. I care most about building practical software that actually works. I adapt quickly to new stacks and prefer straightforward communication.
    </p>
  </div>
  
  <hr />
  
  <div class="section">
    <div class="section-title">Projects & Experience</div>
    
    <div class="item">
      <div class="item-header">
        <div class="item-title">Backend Engineer & Project Manager</div>
        <div class="item-subtitle">Community Issue Crowdsourcing Platform (Final Year Project) | Sep 2025 – Apr 2026</div>
      </div>
      <ul class="bullets">
        <li>Led backend development and managed the project lifecycle from ideation to delivery.</li>
        <li>Built a robust platform allowing community members to report local issues, implemented with scalable API endpoints.</li>
      </ul>
    </div>
    
    <div class="item">
      <div class="item-header">
        <div class="item-title">Full Stack Developer</div>
        <div class="item-subtitle">Shoe Store Telegram Bot | May 2024 – Aug 2024</div>
      </div>
      <ul class="bullets">
        <li>Developed a digital catalog and seamless ordering system integrated directly into Telegram for a local shoe store.</li>
      </ul>
    </div>
    
    <div class="item">
      <div class="item-header">
        <div class="item-title">Developer</div>
        <div class="item-subtitle">AI-Powered Exit Exam Tool | Sep 2024 – Jan 2025</div>
      </div>
      <ul class="bullets">
        <li>Created an application that generates targeted exit exam preparation questions powered by AI algorithms.</li>
      </ul>
    </div>
    
    <div class="item">
      <div class="item-header">
        <div class="item-title">Frontend Developer</div>
        <div class="item-subtitle">Personal Portfolio Website | Jun 2026 – Present</div>
      </div>
      <ul class="bullets">
        <li>Built a modern, responsive portfolio website using Next.js to showcase projects, skills, and professional experience.</li>
      </ul>
    </div>
    
    <div class="item">
      <div class="item-header">
        <div class="item-title">Data Encoder (Volunteer)</div>
        <div class="item-subtitle">CAWEE, Addis Ababa | Jan 2024 – Feb 2024</div>
      </div>
      <ul class="bullets">
        <li>Volunteered for 1.5 months to manage data entry, ensure data integrity, and maintain digital records.</li>
      </ul>
    </div>
  </div>
  
  <hr />
  
  <div class="section">
    <div class="section-title">Education</div>
    <div class="item">
      <div class="item-header">
        <div class="item-title">Bachelor of Science in Computer Science</div>
        <div class="item-subtitle">Unity University | Sep 2022 – Apr 2026</div>
      </div>
    </div>
  </div>
  
  <hr />
  
  <div class="section">
    <div class="section-title">Skills</div>
    <ul class="skills-list">
      <li><span class="skills-category">Frontend & Mobile:</span> Next.js, TailwindCSS, React Native, Flutter</li>
      <li><span class="skills-category">Backend & Databases:</span> Express.js, GraphQL, Supabase, Neon DB, Convex</li>
      <li><span class="skills-category">Tools & DevOps:</span> Git, GitHub, Docker, Vercel</li>
    </ul>
  </div>
  
</body>
</html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const outputPath = path.join(__dirname, 'public', 'images', 'profile', 'Adam_Wondale_CV.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('PDF generated at ' + outputPath);
})();
