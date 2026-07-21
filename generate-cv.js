const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Users\\callo\\.cache\\puppeteer\\chrome\\win64-150.0.7871.24\\chrome-win64\\chrome.exe"
  });
  const page = await browser.newPage();

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
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Open Sans', sans-serif;
      color: #333;
      background-color: white;
      font-size: 9pt;
      line-height: 1.45;
      width: 100%;
      height: 100%;
    }

    .resume-container {
      display: flex;
      width: 100%;
      height: 1122px;
      overflow: hidden;
    }

    /* Left Column */
    .left-col {
      width: 32%;
      background-color: #e8e8e7;
      padding: 35px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .profile-pic-container {
      width: 125px;
      height: 125px;
      border-radius: 50%;
      border: 4px solid #a3b1c6;
      overflow: hidden;
      margin-bottom: 25px;
    }

    .profile-pic {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Simple flat section badge */
    .section-badge {
      background-color: #2b2b2b;
      color: white;
      width: 100%;
      padding: 8px 20px 8px 30px;
      font-family: 'Montserrat', sans-serif;
      font-size: 13pt;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 12px;
      margin-top: 18px;
    }

    .left-content {
      width: 100%;
      padding: 0 30px;
    }

    .contact-item {
      margin-bottom: 14px;
    }
    .contact-item strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 10pt;
      color: #111;
      display: block;
      margin-bottom: 2px;
    }
    .contact-item span {
      font-size: 9pt;
      color: #444;
    }

    .education-item {
      margin-bottom: 14px;
    }
    .education-item strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 10pt;
      color: #111;
      display: block;
      margin-bottom: 2px;
    }
    .education-item span {
      font-size: 9pt;
      color: #444;
      display: block;
    }

    .skills-list {
      list-style: none;
      margin-bottom: 8px;
    }
    .skills-list li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 12px;
      color: #444;
      font-size: 9pt;
    }
    .skills-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: 0;
      color: #2b2b2b;
      font-weight: bold;
    }
    .skills-list strong {
      color: #111;
      display: block;
      font-size: 9.5pt;
    }

    /* Right Column */
    .right-col {
      width: 68%;
      padding: 40px 35px;
    }

    h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 34pt;
      font-weight: 800;
      color: #222;
      line-height: 1;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .job-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 13pt;
      font-weight: 600;
      color: #555;
      letter-spacing: 2px;
      margin-bottom: 18px;
    }

    .summary-text {
      font-size: 9.5pt;
      color: #444;
      text-align: justify;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .right-section-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 15pt;
      font-weight: 700;
      color: #222;
      margin-bottom: 12px;
      margin-top: 18px;
    }

    .timeline-item {
      display: flex;
      margin-bottom: 12px;
    }
    .timeline-date {
      width: 55px;
      flex-shrink: 0;
      font-weight: 700;
      font-size: 9pt;
      color: #333;
      text-align: center;
      padding-right: 12px;
      position: relative;
      line-height: 1.4;
    }

    .timeline-content {
      flex-grow: 1;
      padding-left: 12px;
      border-left: 2px solid #ccc;
      padding-bottom: 5px;
    }

    .timeline-content-no-border {
      flex-grow: 1;
      padding-left: 0;
      padding-bottom: 5px;
    }

    .item-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 11pt;
      font-weight: 700;
      color: #222;
    }

    .item-subtitle {
      font-size: 9.5pt;
      color: #555;
      margin-bottom: 4px;
    }

    .item-desc {
      font-size: 9pt;
      color: #444;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .bullets {
      padding-left: 15px;
      color: #444;
      font-size: 9pt;
    }
    .bullets li {
      margin-bottom: 3px;
      line-height: 1.4;
    }

  </style>
</head>
<body>
  <div class="resume-container">

    <!-- Left Column -->
    <div class="left-col">
      <div class="profile-pic-container">
        ${base64Image ? `<img src="${base64Image}" class="profile-pic" alt="Profile Picture" />` : ''}
      </div>

      <div class="section-badge" style="margin-top: 0;">Contact</div>
      <div class="left-content">
        <div class="contact-item">
          <strong>Phone</strong>
          <span>0967825821</span>
        </div>
        <div class="contact-item">
          <strong>Email</strong>
          <span>adambegizew@gmail.com</span>
        </div>
        <div class="contact-item">
          <strong>Address</strong>
          <span>Addis Ababa, Ethiopia</span>
        </div>
      </div>

      <div class="section-badge">Education</div>
      <div class="left-content">
        <div class="education-item">
          <strong>BSc Computer Science</strong>
          <span>Unity University</span>
          <span>Sep 2022 – Apr 2026</span>
        </div>
      </div>

      <div class="section-badge">Skills</div>
      <div class="left-content">
        <ul class="skills-list">
          <li><strong>Frontend & Mobile</strong>Next.js, React, TailwindCSS, TypeScript, HTML/CSS, React Native, Flutter, Redux</li>
          <li><strong>Backend & Databases</strong>Node.js, Express.js, Python, FastAPI, PostgreSQL, MongoDB, GraphQL, Supabase, Neon, Convex</li>
          <li><strong>Tools & DevOps</strong>Git, GitHub, Docker, AWS, Vercel, Postman, CI/CD</li>
          <li><strong>Soft Skills</strong>Project Management, Team Leadership, Communication, Fast Learner, Problem Solving</li>
        </ul>
      </div>

      <div class="section-badge">Language</div>
      <div class="left-content">
        <ul class="skills-list">
          <li>Amharic (Native)</li>
          <li>English (C1)</li>
        </ul>
      </div>
    </div>

    <!-- Right Column -->
    <div class="right-col">
      <h1>ADAM<br/>WONDALE</h1>
      <div class="job-title">Software Engineer</div>

      <p class="summary-text">
        Recent Computer Science graduate building full-stack web and mobile applications. Works primarily with Next.js, React Native, and Node.js. Led backend development on a community crowdsourcing platform for final year project, plus built e-commerce apps and AI-powered exam prep tools. Focuses on practical, working software and adapts quickly to new stacks.
      </p>

      <div class="right-section-title">Professional Experience</div>

      <div class="timeline-item">
        <div class="timeline-date">May<br>–<br>Jul 2026</div>
        <div class="timeline-content">
          <div class="item-title">Data Encoder (Volunteer)</div>
          <div class="item-subtitle">CAWEE, Addis Ababa</div>
          <ul class="bullets">
            <li>Managed data entry, ensured data integrity, and maintained digital records.</li>
            <li>Streamlined data collection processes and improved accuracy with team.</li>
          </ul>
        </div>
      </div>

      <div class="right-section-title">Personal Projects</div>

      <div class="timeline-item">
        <div class="timeline-content-no-border">
          <div class="item-title">Community Issue Crowdsourcing Platform <span style="font-weight: normal; font-size: 9.5pt; color: #555;">— Backend Engineer & PM</span></div>
          <div class="item-desc">Platform for community members to report local issues. Final year university project.</div>
          <ul class="bullets">
            <li>Led backend dev and managed project lifecycle from ideation to delivery.</li>
            <li>Implemented scalable RESTful APIs and optimized DB queries for concurrent reports.</li>
            <li>Collaborated with frontend team for seamless API integration.</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content-no-border">
          <div class="item-title">Shoe Store E-Commerce Platform <span style="font-weight: normal; font-size: 9.5pt; color: #555;">— Full Stack Developer</span></div>
          <div class="item-desc">Digital catalog and ordering web app for a local shoe store.</div>
          <ul class="bullets">
            <li>Built custom cart, product filtering, and secure admin dashboard.</li>
            <li>Integrated Supabase for real-time data syncing and auth.</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content-no-border">
          <div class="item-title">AI-Powered Exit Exam Tool <span style="font-weight: normal; font-size: 9.5pt; color: #555;">— Developer</span></div>
          <div class="item-desc">Educational platform generating targeted exit exam prep questions via AI.</div>
          <ul class="bullets">
            <li>Implemented filtering and mock data rendering with Drizzle ORM and PostgreSQL.</li>
            <li>AI-generated step-by-step explanations for incorrect answers.</li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content-no-border">
          <div class="item-title">Interactive Developer Portfolio <span style="font-weight: normal; font-size: 9.5pt; color: #555;">— Frontend Developer</span></div>
          <div class="item-desc">Modern, responsive portfolio using Next.js to showcase projects and skills.</div>
          <ul class="bullets">
            <li>Implemented micro-animations and responsive layout without generic templates.</li>
            <li>Scored 100 on Lighthouse performance by optimizing images, fonts, and scripts.</li>
          </ul>
        </div>
      </div>

    </div>
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