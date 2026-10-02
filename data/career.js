/* ---------------------------------------------------------------------------
 * data/career.js
 * Professional experience, education, skills and certifications.
 * Only verified information is listed. Certifications stay empty until a
 * genuine certificate (name, issuer, date, URL) is supplied.
 * ------------------------------------------------------------------------- */
window.PORTFOLIO_CAREER = {
  /* Skill context is deliberately explicit so professional work is never
   * confused with project work or with technologies still being explored. */
  skillContexts: {
    professional: { label: 'At work', tone: 'professional' },
    project: { label: 'Personal projects', tone: 'project' },
    exploring: { label: 'Currently exploring', tone: 'exploring' }
  },

  experience: [
    {
      company: 'Infosys',
      designation: 'Senior System Engineer',
      duration: 'January 2023 – March 2026',
      domain: 'B2B E-commerce / Healthcare and Medical Technology',
      summary:
        'Worked on an enterprise B2B e-commerce platform for Global Client (a US-based healthcare and medical technology company). The platform was built on SAP Commerce Cloud (Hybris) and supported online commerce operations for healthcare and medical products.',
      responsibilities: [
        'SAP Commerce Cloud / Hybris development.',
        'Cart and checkout workflows.',
        'Payment-related flows.',
        'WCMS and content management.',
        'OCC APIs and integrations.',
        'Commerce extensions and storefront-related components.',
        'Troubleshooting and maintenance of application functionality.'
      ],
      stack: ['SAP Commerce Cloud', 'Hybris', 'Java', 'Spring', 'WCMS', 'OCC APIs']
    }
  ],

  education: [
    {
      degree: 'Bachelor of Engineering',
      branch: 'Computer Science and Engineering',
      graduationYear: '2022',
      institution: 'M.S. Engineering College, Bangalore',
      institutionNote: 'Completed',
      status: 'graduated'
    },
    {
      degree: 'MBA in Generative AI and Product Management',
      branch: null,
      graduationYear: '2028 (expected)',
      institution: 'IIT Patna',
      institutionNote: 'In progress.',
      status: 'ongoing'
    }
  ],

  skills: [
    {
      category: 'Programming Languages',
      icon: 'braces',
      items: [
        { name: 'Java', context: 'professional' },
        { name: 'TypeScript', context: 'project' },
        { name: 'JavaScript', context: 'project' },
        { name: 'Python', context: 'exploring' },
        { name: 'SQL', context: 'professional' }
      ]
    },
    {
      category: 'Frontend Development',
      icon: 'layout-panel-left',
      items: [
        { name: 'React', context: 'project' },
        { name: 'Next.js (App Router)', context: 'project' },
        { name: 'Tailwind CSS', context: 'project' },
        { name: 'HTML & CSS', context: 'professional' },
        { name: 'framer-motion', context: 'project' },
        { name: 'lucide-react', context: 'project' }
      ]
    },
    {
      category: 'Backend Development',
      icon: 'server',
      items: [
        { name: 'Node.js', context: 'project' },
        { name: 'Next.js Route Handlers', context: 'project' },
        { name: 'REST APIs', context: 'professional' },
        { name: 'Spring', context: 'professional' },
        { name: 'TanStack Query', context: 'project' }
      ]
    },
    {
      category: 'SAP Commerce / Hybris',
      icon: 'shopping-cart',
      items: [
        { name: 'SAP Commerce Cloud', context: 'professional' },
        { name: 'Hybris', context: 'professional' },
        { name: 'WCMS', context: 'professional' },
        { name: 'OCC APIs', context: 'professional' },
        { name: 'Commerce extensions', context: 'professional' }
      ]
    },
    {
      category: 'Databases',
      icon: 'database',
      items: [
        { name: 'PostgreSQL', context: 'project' },
        { name: 'Prisma ORM', context: 'project' },
        { name: 'Supabase (Postgres, Auth, Storage)', context: 'project' },
        { name: 'pgvector', context: 'project' },
        { name: 'Row Level Security', context: 'project' }
      ]
    },
    {
      category: 'Generative AI',
      icon: 'sparkles',
      items: [
        { name: 'Retrieval-Augmented Generation (RAG)', context: 'project' },
        { name: 'LangChain (JS)', context: 'project' },
        { name: 'HuggingFace Inference', context: 'project' },
        { name: 'Embeddings & vector search', context: 'project' },
        { name: 'LLM structured extraction (OpenAI / Gemini)', context: 'project' },
        { name: 'Prompt design & grounding', context: 'project' }
      ]
    },
    {
      category: 'Machine Learning',
      icon: 'brain-circuit',
      items: [
        { name: 'Sentence embeddings (MiniLM)', context: 'project' },
        { name: 'Semantic search & reranking', context: 'exploring' },
        { name: 'Recommendation systems', context: 'exploring' },
        { name: 'Model evaluation & A/B testing', context: 'exploring' }
      ]
    },
    {
      category: 'Cloud & Deployment',
      icon: 'cloud',
      items: [
        { name: 'Vercel (serverless)', context: 'project' },
        { name: 'Supabase Cloud', context: 'project' },
        { name: 'Regional deployment (Mumbai / bom1)', context: 'project' }
      ]
    },
    {
      category: 'DevOps',
      icon: 'refresh-cw',
      items: [
        { name: 'GitHub Actions (CI)', context: 'project' },
        { name: 'Production build pipelines', context: 'project' },
        { name: 'Environment & secret management', context: 'project' }
      ]
    },
    {
      category: 'Developer Tools',
      icon: 'wrench',
      items: [
        { name: 'Git & GitHub', context: 'professional' },
        { name: 'VS Code', context: 'professional' },
        { name: 'ESLint & TypeScript checks', context: 'project' },
        { name: 'Prisma Studio', context: 'project' },
        { name: 'OCR tooling (Tesseract.js)', context: 'project' }
      ]
    }
  ],

  /* No verified certification data has been supplied yet.
   * Add entries as { name, issuer, date, url } to enable the section. */
  certifications: []
};

