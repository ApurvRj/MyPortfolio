/* ---------------------------------------------------------------------------
 * data/profile.js
 * Central profile content — single source of truth for personal information.
 * Consumed by index.html (homepage) and project.html (case studies).
 * ------------------------------------------------------------------------- */
window.PORTFOLIO_PROFILE = {
  name: 'Apurv Raj',
  initials: 'AR',
  title: 'Software Developer | GenAI Enthusiast',
  headline: 'Building scalable software products and exploring the possibilities of Generative AI.',
  location: 'India',
  availability: 'Open to opportunities',
  email: 'apurvraj101699@gmail.com',
  links: {
    github: 'https://github.com/ApurvRj/',
    linkedin: 'https://www.linkedin.com/in/apurv-raj-319960179/',
    email: 'mailto:apurvraj101699@gmail.com'
  },
  portrait: {
    src: 'assets/images/apurv-raj.jpg',
    png: 'assets/images/apurv-raj.png',
    alt: 'Portrait of Apurv Raj, software developer and GenAI enthusiast'
  },

  about: [
    'Experienced software developer transitioning towards Generative AI and AI Product Management.',
    'I am interested in building scalable software products, exploring practical applications of Generative AI, and designing technology-driven solutions to real-world problems.'
  ],

  /* The three ideas the homepage should communicate. */
  focusAreas: [
    { label: 'Software Development', icon: 'code-xml', detail: 'Enterprise commerce systems and full-stack product engineering.' },
    { label: 'Generative AI', icon: 'sparkles', detail: 'Retrieval-augmented assistants and document-grounded LLM workflows.' },
    { label: 'Product Thinking', icon: 'compass', detail: 'Turning real problems into shipped, maintainable products.' }
  ],

  /* Main navigation — one entry per section, no duplicates. */
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#stack' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ],

  footerNote: 'BUILT WITH INTENTION · 2026',
  consoleHint: 'Explore the portfolio from a terminal-style console.'
};
