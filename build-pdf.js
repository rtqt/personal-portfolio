const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50 });

const outPath = path.join(__dirname, 'public', 'images', 'profile', 'Adam_Wondale_CV.pdf');
const outStream = fs.createWriteStream(outPath);
doc.pipe(outStream);

const imagePath = path.join(__dirname, 'public', 'images', 'profile', 'adam.jpg');
const hasImage = fs.existsSync(imagePath);

let yOffset = 50;

if (hasImage) {
  doc.save();
  doc.circle(95, 95, 45).clip();
  doc.image(imagePath, 50, 50, { width: 90, height: 90 });
  doc.restore();
}

doc.font('Helvetica-Bold').fontSize(26).fillColor('#333333').text('Adam Wondale', 160, 60);
doc.font('Helvetica').fontSize(14).fillColor('#666666').text('Software Engineer', 160, 95);
doc.fontSize(10).fillColor('#555555').text('0967825821  •  adambegizew@gmail.com  •  Addis Ababa, Ethiopia', 160, 115);

doc.moveTo(50, 160).lineTo(550, 160).lineWidth(1).strokeColor('#cccccc').stroke();

doc.font('Helvetica-Bold').fontSize(12).fillColor('#222222').text('PROFESSIONAL SUMMARY', 50, 180);

const summary = "I'm a recent Computer Science graduate who builds full-stack web and mobile applications. I work primarily with Next.js, React Native, and Node.js. For my final year project, I led backend development on a community crowdsourcing platform, and I've also built e-commerce Telegram bots and AI-powered exam prep tools. I care most about building practical software that actually works. I adapt quickly to new stacks and prefer straightforward communication.";

doc.font('Helvetica').fontSize(10).fillColor('#333333').text(summary, 50, 200, { width: 500, align: 'justify', lineGap: 3 });

doc.moveTo(50, 260).lineTo(550, 260).strokeColor('#cccccc').stroke();

doc.font('Helvetica-Bold').fontSize(12).fillColor('#222222').text('WORK EXPERIENCE & PROJECTS', 50, 280);

let curY = 305;

function addExp(title, org, dates, bullets) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#222222').text(title, 50, curY);
  curY += 15;
  doc.font('Helvetica').fontSize(10).fillColor('#555555').text(`${org} | ${dates}`, 50, curY);
  curY += 15;
  
  bullets.forEach(bullet => {
    doc.circle(58, curY + 5, 2).fillColor('#555555').fill();
    doc.font('Helvetica').fontSize(10).fillColor('#333333').text(bullet, 68, curY, { width: 480, lineGap: 2 });
    curY += doc.heightOfString(bullet, { width: 480 }) + 5;
  });
  curY += 10;
}

addExp('Backend Engineer & Project Manager', 'Community Issue Crowdsourcing Platform', 'Sep 2025 – Apr 2026', [
  'Led backend development and managed the project lifecycle from ideation to delivery for final year university project.',
  'Built a robust platform allowing community members to report local issues, implemented with scalable API endpoints.'
]);

addExp('Full Stack Developer', 'Shoe Store Telegram Bot', 'May 2024 – Aug 2024', [
  'Developed a digital catalog and seamless ordering system integrated directly into Telegram for a local shoe store.'
]);

addExp('Developer', 'AI-Powered Exit Exam Tool', 'Sep 2024 – Jan 2025', [
  'Created an application that generates targeted exit exam preparation questions powered by AI algorithms.'
]);

addExp('Frontend Developer', 'Personal Portfolio Website', 'Jun 2026 – Present', [
  'Built a modern, responsive portfolio website using Next.js to showcase projects, skills, and professional experience.'
]);

addExp('Data Encoder (Volunteer)', 'CAWEE, Addis Ababa', 'Jan 2024 – Feb 2024', [
  'Volunteered for 1.5 months to manage data entry, ensure data integrity, and maintain digital records.'
]);


doc.moveTo(50, curY).lineTo(550, curY).strokeColor('#cccccc').stroke();
curY += 20;

doc.font('Helvetica-Bold').fontSize(12).fillColor('#222222').text('EDUCATION', 50, curY);
curY += 20;
doc.font('Helvetica-Bold').fontSize(11).fillColor('#222222').text('Bachelor of Science in Computer Science', 50, curY);
curY += 15;
doc.font('Helvetica').fontSize(10).fillColor('#555555').text('Unity University | Sep 2022 – Apr 2026', 50, curY);
curY += 25;

doc.moveTo(50, curY).lineTo(550, curY).strokeColor('#cccccc').stroke();
curY += 20;

doc.font('Helvetica-Bold').fontSize(12).fillColor('#222222').text('SKILLS', 50, curY);
curY += 20;

function addSkill(category, skills) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#333333').text(category + ':', 50, curY, { continued: true });
  doc.font('Helvetica').fillColor('#444444').text(' ' + skills);
  curY += 15;
}

addSkill('Frontend & Mobile', 'Next.js, TailwindCSS, React Native, Flutter');
addSkill('Backend & Databases', 'Express.js, GraphQL, Supabase, Neon DB, Convex');
addSkill('Tools & DevOps', 'Git, GitHub, Docker, Vercel');

doc.end();

outStream.on('finish', () => {
  console.log('PDF generated at ' + outPath);
});
