/* ---------------------------------------------------------------------------
 * data/project-karmavriti.js
 * Flagship GenAI project — Platform Overview & Live Link.
 *
 * Provides a clean, candidate-focused overview of KarmaVriti: what the platform does,
 * what users can do, how the AI assistant helps them, and the live website URL.
 * All internal implementation details, architecture diagrams, and bucket lists
 * have been removed to protect system security and intellectual property.
 * ------------------------------------------------------------------------- */
window.PORTFOLIO_PROJECT_KARMAVRITI = {
  slug: 'karmavriti',
  order: 1,
  featured: true,
  name: 'KarmaVriti',
  categoryLabel: 'Generative AI / Public Sector Jobs Portal',
  categories: ['ai', 'fullstack'],
  statusLabel: 'Live',
  statusTone: 'live',
  accent: 'primary',
  flagship: true,

  tagline:
    'An AI-powered government jobs portal that centralizes notifications and answers candidate questions directly from official sources.',

  shortDescription:
    'KarmaVriti brings Indian government job notifications, admit cards, results, and syllabuses into one clean platform, paired with an AI assistant that answers candidate questions directly from official sources.',

  detailedDescription:
    'KarmaVriti is an intelligent recruitment portal designed for Indian public sector job seekers. It organizes scattered, lengthy official recruitment circulars, admit cards, exam schedules, results, and syllabuses into a unified, mobile-friendly experience. With its document-grounded AI assistant, candidates can ask questions in plain language to instantly check eligibility cut-offs, vacancy breakdowns, fees, and exam dates — grounded strictly in official government notices with transparent source citations.',

  live: 'https://karma-vriti.vercel.app/',
  github: null,

  thumbnail: 'assets/images/projects/karmavriti.svg',
  thumbnailAlt: 'KarmaVriti — government jobs portal with an AI assistant',

  techTags: ['Government Jobs Portal', 'AI Assistant', 'Document Intelligence', 'Exam Lifecycle', 'Mobile-First'],
  caseStudyLabel: 'About KarmaVriti',

  metrics: [
    { label: 'Platform Scope', value: 'Indian Public Sector', note: 'Central & State Recruitments' },
    { label: 'Intelligence', value: 'AI Assistant', note: 'Grounded in Official Notices' },
    { label: 'Language Support', value: 'Bilingual', note: 'English & Hindi Circulars' },
    { label: 'Interface', value: 'Mobile-First', note: 'Optimized for Phone Browsers' }
  ],

  overview: {
    introduction:
      'KarmaVriti is an intelligent information platform and AI assistant for Indian government job aspirants. It brings scattered notifications, admit cards, exam results, and official syllabuses into a single, mobile-optimized experience, while offering an interactive AI assistant that answers candidate questions directly from official circulars.',
    problem:
      'Government job notifications in India are published across hundreds of separate department portals, typically as dense 50–100+ page bilingual (English & Hindi) PDFs with complex legal jargon. Candidates struggle to find crucial cut-offs, eligibility rules, exact vacancies, and critical deadlines, leading to confusion and missed dates.',
    users: [
      'Government job aspirants across India researching national and state-level recruitment opportunities.',
      'Candidates who need fast clarification on eligibility cut-offs, fee exemptions, and exam patterns without reading 100-page notices.',
      'Aspirants accessing notifications from mobile devices on 3G/4G networks who need fast, uncluttered access.'
    ],
    objectives: [
      'Centralize public recruitment updates across Central, State, Railway, Banking, Defense, and Police departments.',
      'Provide a conversational AI assistant that extracts precise eligibility criteria, age limits, and deadlines from official documents.',
      'Eliminate guesswork and hallucination by grounding every answer strictly in published government circulars.',
      'Deliver a lightweight, lightning-fast experience optimized for mobile users on varying network speeds.'
    ],
    solution:
      'A clean, mobile-first web portal that brings official notices and updates together with an AI assistant. Candidates can easily browse job categories or ask questions in plain language. Every answer is grounded directly in the published circular with citations, eliminating guessing and saving candidates hours of searching through complex PDFs.'
  },

  features: [
    {
      title: 'Centralized recruitment discovery',
      detail:
        'Candidates can easily browse, search, and filter public sector job notifications across Central Government, State Departments, Railways, Banking, Defense, Police, Teaching, and PSUs in one clean, searchable place.'
    },
    {
      title: 'Plain-language AI assistant',
      detail:
        'Candidates can ask questions naturally in plain language (e.g., "What is the age limit for OBC candidates in this post?", "What is the syllabus for the preliminary exam?", or "Is final-year graduation eligible?").'
    },
    {
      title: 'Grounded strictly in official documents (No guessing)',
      detail:
        'The assistant answers questions exclusively using verified information from official recruitment circulars. It never speculates or invents details — if a condition is not mentioned in the official notice, it tells the candidate clearly.'
    },
    {
      title: 'Direct source citations',
      detail:
        'Every response references the specific official notice or circular section so candidates can verify facts independently with complete peace of mind.'
    },
    {
      title: 'Full exam lifecycle tracking',
      detail:
        'Beyond initial job listings, candidates can track the entire exam journey in one place: official syllabuses, admit card announcements, exam dates, answer keys, and declared results.'
    },
    {
      title: 'Mobile-first accessibility',
      detail:
        'Designed from the ground up for mobile screens and varying internet speeds, allowing aspirants across India to stay updated without downloading heavy PDF documents.'
    }
  ],

  sections: [
    { id: 'overview', kind: 'overview', num: '01', label: 'What KarmaVriti does' },
    { id: 'features', kind: 'features', num: '02', label: 'How the AI assistant helps candidates' }
  ]
};
