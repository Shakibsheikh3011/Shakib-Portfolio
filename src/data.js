// All editable content lives here. Edit text, links and lists; the UI updates automatically.

export const profile = {
  name: 'Shakib Sheikh',
  short: 'SHAKIB',
  // Lines on the opening screen: the name above comes from `name`.
  shutterTitle: 'Full Stack Developer',
  shutterTag: 'B.Tech CSE // Portfolio',
  email: 'shakibshaikhs88@gmail.com',
  linkedin: 'https://linkedin.com/in/shakib-sheikh',
  github: 'https://github.com/Shakibsheikh3011',
  resume: '/Shakib_Resume.pdf',
  // Contact form is sent through EmailJS (https://www.emailjs.com). Paste your three values here.
  // The public key is meant to be public (it is safe in browser code). If a value is empty or sending
  // fails, the form offers a mailto fallback instead.
  emailjs: {
    serviceId: 'service_4cu7br2', // e.g. 'service_xxxxxxx'  (Email Services)
    templateId: 'template_xh8clnq', // e.g. 'template_xxxxxxx' (Email Templates)
    publicKey: '1_0Nq-Zmle6UWRYKh', // e.g. 'AbCdEf123...'     (Account > General > Public Key)
  },
  // Your photo lives at public/portrait.png (transparent background). Until then a placeholder is shown.
  portrait: '/portrait.png',
  // Photo used in the About section (public/portrait-seated.png, transparent background).
  // The earlier standing photo is still in public/portrait-full.png if you want to switch back.
  portraitAbout: '/portrait-seated.png',
  // Photo on the right of the Experience section (public/portrait-standing.png, transparent background).
  portraitStanding: '/portrait-standing.png',
  intro:
    'I build responsive web applications and full-stack products using Java, Spring Boot, React, and PostgreSQL.',
  aboutTitle: 'Hello, I’m Shakib Sheikh',
  about:
    'I’m a Java Full-Stack Developer and B.Tech Computer Science student at Mahakal Institute of Technology, expected to graduate in 2027. I enjoy building practical web applications with responsive interfaces, secure authentication, REST APIs, and database-backed features. I’m seeking software development and full-stack internship opportunities.',
  availability: 'Open to Software Development / Full-Stack Internship Opportunities',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const roles = ['Java Full-Stack Developer', 'Backend Developer', 'Software Developer']

export const skills = [
  { group: 'Programming', items: ['Java', 'OOP', 'Collections', 'Exception Handling'] },
  { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap'] },
  {
    group: 'Backend',
    items: ['JDBC', 'Servlets', 'JSP', 'REST APIs', 'Hibernate', 'Spring Framework', 'Spring Boot', 'MVC'],
  },
  { group: 'Databases', items: ['MySQL', 'SQL', 'PostgreSQL'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Eclipse', 'Tomcat'] },
]

export const projects = [
  {
    name: 'BhoomiConnect',
    link: 'https://bhoomiconnect.vercel.app/',
    description:
      'Full-stack real-estate platform built with React.js, Spring Boot, and PostgreSQL on Neon. Supports Buyer, Seller, and Admin roles. Includes property listings, inquiries, appointments, chat, auctions, payments, JWT authentication with refresh tokens, email verification, password reset, property search, filters, wishlist, admin moderation, analytics, and recommendations. Includes 90+ REST APIs across 20 modules, documented with Swagger/OpenAPI. Deployed on Vercel and Render.',
    tech: ['React.js', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'JWT', 'Swagger/OpenAPI'],
  },
  {
    name: 'CareerHive',
    link: 'https://careerhive-xi.vercel.app/',
    description:
      'AI-powered career guidance platform built with React.js, Supabase, and PostgreSQL. Includes job search, filtering, personalized roadmaps, and real-time backend updates. Developed collaboratively using Git.',
    tech: ['React.js', 'Supabase', 'PostgreSQL', 'Git'],
  },
]

export const experience = [
  {
    role: 'Java Intern',
    org: 'Affimintus Technologies, Ujjain',
    date: 'Aug 2025 to Oct 2025',
    points: [
      'Built Java web applications using Servlets, JSP, Bootstrap, jQuery, MySQL, and JDBC for CRUD operations.',
      'Developed MVC-based modules using Core Java, Collections, Exception Handling, and Multithreading.',
      'Helped test, debug, and deploy Java web applications.',
    ],
  },
  {
    role: 'IT Support & Management Lead',
    org: 'AWS Cloud Club',
    date: 'Dec 2025 to Present',
    current: true,
    points: [
      'Managed technical operations and event support.',
      'Assisted with troubleshooting technical issues.',
      'Coordinated with student teams for smooth event execution.',
    ],
  },
]

export const education = {
  school: 'Mahakal Institute of Technology',
  degree: 'B.Tech in Computer Science Engineering',
  date: 'Expected graduation: 2027',
}

export const achievements = [
  { title: 'Semi-Finalist, Odoo x NMIT Hackathon', date: 'June 2025' },
  { title: 'Finalist, Smart India Hackathon (Internal Hackathon)', date: 'August 2025' },
  { title: 'Deloitte Australia Data Analytics Job Simulation on Forage', date: 'November 2025' },
]