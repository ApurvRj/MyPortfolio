/* ---------------------------------------------------------------------------
 * data/project-karmavriti.js
 * Flagship GenAI project — High-level architecture and system design case study.
 *
 * Designed to provide a secure, high-level technical overview of KarmaVriti's
 * candidate experience, hybrid retrieval AI assistant, and design principles
 * without exposing internal route maps, private endpoints, or implementation secrets.
 * ------------------------------------------------------------------------- */
window.PORTFOLIO_PROJECT_KARMAVRITI = {
  slug: 'karmavriti',
  order: 1,
  featured: true,
  name: 'KarmaVriti',
  categoryLabel: 'Generative AI / Full Stack Development',
  categories: ['ai', 'fullstack'],
  statusLabel: 'Live',
  statusTone: 'live',
  accent: 'primary',
  flagship: true,

  tagline:
    'An AI-powered government recruitment platform with document-grounded candidate intelligence and hybrid retrieval.',

  shortDescription:
    'KarmaVriti centralizes Indian government job notifications, admit cards, results, and syllabuses into one clean platform, paired with an AI assistant that answers candidate questions directly from official sources.',

  detailedDescription:
    'KarmaVriti brings disparate government recruitment notices, admit cards, exam results, and official syllabuses into a centralized, mobile-optimized experience. Powered by document-grounded AI assistance, candidates can query official notifications in plain language to instantly extract critical eligibility criteria, vacancy counts, exam schedules, and fee details — grounded strictly in verified source notices with zero speculative guessing.',

  live: 'https://karma-vriti.vercel.app/',
  github: 'https://github.com/ApurvRj/KarmaVriti',

  thumbnail: 'assets/images/projects/karmavriti.svg',
  thumbnailAlt: 'KarmaVriti — government jobs portal with an AI assistant',

  /* High-level tags shown on the homepage card. */
  techTags: ['Next.js', 'TypeScript', 'Relational Database', 'Vector Search', 'Hybrid Retrieval (RAG)', 'Bilingual OCR'],

  /* Bucket list shown under the homepage card */
  bucketList: {
    intro: 'Next-stage platform enhancements for KarmaVriti, focused on automated ingestion pipelines and multi-channel notification networks.',
    diagram: {
      src: 'assets/diagrams/karmavriti-future-improvements.svg',
      alt: 'KarmaVriti future improvements system design: ingestion, AI processing pipeline, human review, media generation and distribution'
    },
    caption: 'High-level future roadmap — automated ingestion, queued processing, and multi-channel candidate delivery.'
  },

  techStack: [
    {
      group: 'Web Application',
      items: ['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS', 'Mobile-first Responsive Design']
    },
    {
      group: 'Edge & Security',
      items: ['Secure Edge Gateway', 'Encrypted Transport (TLS)', 'Abuse & Bot Protection', 'Strict Role-Based Access Controls']
    },
    {
      group: 'Data Layer',
      items: ['Managed Relational Database', 'Isolated Schema Access', 'Least-Privilege Database Policies', 'Automated Backups']
    },
    {
      group: 'AI & Hybrid Retrieval',
      items: ['Hybrid Retrieval (Semantic + Structured)', 'Vector Similarity Search', 'Graceful Fallback Logic', 'Source Citation Grounding']
    },
    {
      group: 'Document Processing',
      items: ['Document Ingestion Pipeline', 'Bilingual Text Extraction (English + Hindi)', 'OCR for Scanned Notices', 'Structured Entity Parsing']
    },
    {
      group: 'Integrations & Services',
      items: ['Cryptographically Verified Payments', 'Privacy-first Aggregate Analytics', 'Automated CI/CD Validation', 'Cloud Hosting']
    }
  ],

  metrics: [
    { label: 'Platform Focus', value: 'Indian Public Sector', note: 'Central & State Recruitments' },
    { label: 'AI Retrieval Model', value: 'Hybrid RAG', note: 'Semantic Context + Live Records' },
    { label: 'Language Processing', value: 'Bilingual', note: 'English & Hindi Document Support' },
    { label: 'Reliability Guarantee', value: 'Deterministic Fallback', note: '100% Service Availability' }
  ],

  overview: {
    introduction:
      'KarmaVriti is an intelligent recruitment platform for Indian government job seekers. It organizes scattered, legally dense official recruitment notices into clean, searchable resources and pairs them with an interactive AI assistant that answers candidate questions directly from verified documents.',
    problem:
      'Official government recruitment notices are published in dense legal formats, frequently as scanned or photographed bilingual PDFs across hundreds of disparate portals. Aspirants struggle to decipher crucial eligibility cut-offs, exact vacancy breakdowns, syllabus changes, and critical deadlines, leading to missed opportunities or disqualifications.',
    users: [
      'Government job aspirants across India researching state and central recruitment opportunities.',
      'Candidates in tier-2 and tier-3 cities relying predominantly on mobile devices and variable internet speeds.',
      'Content curators and administrators reviewing, structuring, and verifying published recruitment data.'
    ],
    objectives: [
      'Provide a fast, centralized hub for recruitment notices, admit cards, results, answer keys, and exam syllabuses.',
      'Enable candidates to ask complex eligibility and timeline questions in plain language and receive precise, source-grounded answers.',
      'Ensure high accuracy by combining semantic document understanding with live structured database lookups.',
      'Maintain candidate trust through a human-in-the-loop review workflow before recruitment records become publicly visible.'
    ],
    solution:
      'A server-rendered, mobile-optimized web application fronted by an intelligent edge security layer. Official notices are ingested, cleaned, and indexed using a dual retrieval strategy: semantic search retrieves nuanced context from document notices, while relational queries fetch live dates and vacancies. If AI services experience latency, the platform fails gracefully to structured records so candidates never face a broken experience.'
  },

  features: [
    {
      title: 'Unified recruitment discovery',
      detail:
        'Candidates can effortlessly discover, filter, and track public sector recruitment notices across Central Government, State Departments, Railways, Banking, Defense, Police, Teaching, and PSUs with comprehensive search and structured categorizations.'
    },
    {
      title: 'Document-grounded AI assistant',
      detail:
        'Candidates ask questions in plain natural language (e.g., "What is the age relaxation for OBC candidates?" or "Am I eligible with a 3-year diploma?"). The assistant synthesizes verified answers derived exclusively from official notification documents and always cites the relevant section.'
    },
    {
      title: 'Hybrid retrieval architecture',
      detail:
        'Combines semantic vector search over document content with real-time relational lookups. This ensures the assistant understands conversational meaning while delivering 100% accurate, up-to-date vacancy figures and calendar dates.'
    },
    {
      title: 'Bilingual document intelligence (English & Hindi)',
      detail:
        'Processes both digital and scanned recruitment circulars. Scanned or low-quality document uploads automatically engage bilingual OCR pipelines to extract English and Hindi notices without manual transcription.'
    },
    {
      title: 'Human-in-the-loop validation & publishing',
      detail:
        'Extracted recruitment data undergoes an editorial verification workflow before publication. Key details such as exam dates, fee structures, and qualification criteria are cross-checked by curators to prevent misinformation.'
    },
    {
      title: 'Linked recruitment lifecycle resources',
      detail:
        'Every recruitment notice is unified with its downstream exam resources: officially released admit cards, question papers, answer keys, results, and detailed syllabuses are grouped together in one coherent timeline.'
    },
    {
      title: 'Resilient fallback answering',
      detail:
        'If language model inference is delayed or external services encounter downtime, the system automatically falls back to pre-indexed structured database records, ensuring users consistently receive reliable information without disruption.'
    },
    {
      title: 'Privacy-conscious architecture',
      detail:
        'Built with privacy-by-design principles: candidate analytics are collected strictly in aggregate without recording personal identifiers or search histories, ensuring complete confidentiality.'
    }
  ],

  architecture: {
    summary:
      'KarmaVriti is built around an edge-protected, multi-tier cloud architecture designed for high availability, zero-trust data access, and reliable AI inference. Requests flow through an edge defense layer to a server-rendered application tier, backed by managed relational storage and an intelligent hybrid retrieval service.',
    layers: [
      {
        title: 'Candidate client layer',
        node: 'Web Application',
        detail: 'Fast, server-rendered application optimized for mobile browsers and low-bandwidth networks. Delivers instant page loads for recruitment catalogs, live resource trackers, and real-time interactive AI chat.'
      },
      {
        title: 'Secure edge layer',
        node: 'Security & Edge Gateway',
        detail: 'Intercepts incoming traffic to enforce end-to-end TLS encryption, secure HTTP response headers, automated bot and DDoS mitigation, and strict perimeter isolation for administrative interfaces.'
      },
      {
        title: 'Data & storage layer',
        node: 'Managed Relational Datastore',
        detail: 'Maintains verified recruitment notifications, official resource links, and access controls. Operates on a strict least-privilege model where public queries are restricted to approved, published data.'
      },
      {
        title: 'AI assistant service',
        node: 'Hybrid Retrieval Engine',
        detail: 'Orchestrates semantic document retrieval and structured database lookups. Synthesizes concise, candidate-facing responses grounded strictly in official notification text, backed by fallback rule engines.'
      },
      {
        title: 'Data collection & processing',
        node: 'Ingestion Pipeline',
        detail: 'Handles automated notification discovery and administrative document uploads. Validates, cleans, and structures digital and scanned bilingual (English/Hindi) notices before administrative verification.'
      },
      {
        title: 'Payments & audit layer',
        node: 'Cryptographic Event Verification',
        detail: 'Processes transactional and subscription events with cryptographic signature verification. Administrative actions generate tamper-evident audit logs to safeguard content integrity.'
      }
    ],
    principles: [
      {
        principle: 'Grounded, not guessed',
        meaning: 'AI answers are strictly derived from verified notification text and database records, complete with transparent source citations. Speculative generation is prohibited.'
      },
      {
        principle: 'Fail gracefully',
        meaning: 'Every critical user journey features deterministic fallbacks. If AI inference is slow or unavailable, answers are generated directly from verified database records.'
      },
      {
        principle: 'Least privilege',
        meaning: 'Public users, background services, and administrative staff are granted only the minimal permissions required for their roles, isolating sensitive configurations.'
      },
      {
        principle: 'Defense in depth',
        meaning: 'Layered security protocols operate independently across the edge gateway, application tier, and database boundaries.'
      },
      {
        principle: 'Privacy by design',
        meaning: 'No unnecessary personal tracking or sensitive user identifiers are retained. Platform metrics are aggregated anonymously.'
      },
      {
        principle: 'Audit everything sensitive',
        meaning: 'All administrative reviews, publishing status transitions, and data modifications maintain a strict, accountable audit trail.'
      }
    ],
    notes: [
      'Designed to scale seamlessly during major national recruitment release surges when thousands of concurrent applicants check updates.',
      'Bilingual processing guarantees that regional notices containing Hindi instructions or mixed headings remain fully searchable.'
    ],
    diagram: {
      src: 'assets/diagrams/karmavriti-system-design.svg',
      alt: 'KarmaVriti High-Level System Architecture: Candidates, Secure Edge Layer, Web Application, Relational Data Layer, and AI Hybrid Retrieval Service',
      caption: 'KarmaVriti high-level system architecture — multi-tier edge protection, hybrid retrieval, and resilient data processing.'
    }
  },

  workflows: {
    rag: {
      title: 'AI assistant & hybrid retrieval workflow',
      subtitle:
        'How candidate questions are transformed into accurate, source-verified answers using dual-stream retrieval.',
      steps: [
        {
          title: 'Candidate question submission',
          detail: 'A candidate submits an inquiry in natural language regarding recruitment eligibility, syllabus coverage, fees, or exam schedules.'
        },
        {
          title: 'Intent classification & query routing',
          detail: 'The assistant analyzes whether the query requires semantic document understanding, factual database lookups, or a hybrid approach.'
        },
        {
          title: 'Semantic document retrieval',
          detail: 'Retrieves relevant clauses, qualification paragraphs, and policy terms from the official recruitment notice repository.'
        },
        {
          title: 'Structured database lookup',
          detail: 'Concurrently retrieves live, authoritative metadata from the relational database to verify current vacancy numbers, active deadlines, and official portal URLs.'
        },
        {
          title: 'Context assembly & grounding validation',
          detail: 'Synthesizes the retrieved document context with verified database facts into a grounded prompt constrained by strict factual boundary guidelines.'
        },
        {
          title: 'Candidate response with citations',
          detail: 'Delivers a clear, concise answer highlighting key conditions and providing clickable source citations back to the official notification document.'
        },
        {
          title: 'Graceful resilience fallback',
          detail: 'If the generative inference stream encounters unexpected latency or errors, the platform immediately falls back to structured database records to return an immediate, reliable answer.'
        }
      ],
      note:
        'Answers are grounded, not guessed: every AI response is verified against the official published notice so candidates can make decisions with complete confidence.'
    },

    'pdf-ocr': {
      title: 'Document processing & bilingual OCR pipeline',
      subtitle:
        'Turning complex, inconsistent government notifications into clean, machine-understandable knowledge sources.',
      steps: [
        {
          title: 'Document ingestion',
          detail: 'Recruitment notices arrive via automated data collection channels or curated administrative uploads.'
        },
        {
          title: 'Document format inspection',
          detail: 'Evaluates the incoming document structure to determine whether embedded text layers exist or if the file is a scanned physical circular.'
        },
        {
          title: 'Bilingual text extraction & OCR',
          detail: 'Digital documents undergo clean text extraction; scanned or photographed circulars pass through high-accuracy bilingual OCR supporting English and Hindi typography.'
        },
        {
          title: 'Text normalization & artifact cleaning',
          detail: 'Removes scanning noise, table border artifacts, and irregular page breaks to produce clean, coherent text blocks.'
        },
        {
          title: 'Semantic chunking & metadata enrichment',
          detail: 'Partitions documents into semantically coherent sections tagged with organization, post category, and publication date attributes for targeted retrieval.'
        },
        {
          title: 'Knowledge index synchronization',
          detail: 'Populates the hybrid retrieval knowledge store, making new information instantly available to candidate queries.'
        }
      ],
      note:
        'Robust bilingual OCR ensures regional government notifications and mixed-script circulars are as easily searchable as digital publications.'
    },

    'job-ingestion': {
      title: 'Curated publishing & validation workflow',
      subtitle:
        'Guaranteed data integrity through automated extraction and mandatory human editorial review.',
      steps: [
        {
          title: 'Notification intake',
          detail: 'Raw recruitment circulars and press releases enter the platform staging environment.'
        },
        {
          title: 'Automated entity structuring',
          detail: 'Intelligent extraction engines parse the circular to identify candidate job titles, pay scales, vacancies, age criteria, and critical milestones.'
        },
        {
          title: 'Draft record creation',
          detail: 'Extracted information is formatted into a staged draft record visible exclusively in the restricted editorial environment.'
        },
        {
          title: 'Human editorial review',
          detail: 'Qualified administrators verify extracted figures against the official source notice, correcting any ambiguities or discrepancies.'
        },
        {
          title: 'Associated resource generation',
          detail: 'The review workflow automatically links draft resource placeholders for admit cards, answer keys, results, and detailed syllabuses.'
        },
        {
          title: 'Public publication & audit recording',
          detail: 'Upon approval, the notification becomes publicly searchable across the platform, recording an immutable audit entry with timestamp and curator attribution.'
        }
      ],
      note:
        'Human oversight ensures that critical public sector recruitment dates and eligibility parameters are 100% accurate before reaching candidates.'
    }
  },

  database: {
    summary:
      'KarmaVriti utilizes a secure managed relational database paired with high-performance vector indexing. Public candidate interactions are strictly isolated from internal administrative models under least-privilege access rules.',
    tables: [
      {
        name: 'Recruitment Notices',
        key: 'Core Recruitment Store',
        fields: ['Title, Organisation, Department', 'Category, Job Classification', 'Vacancies, Pay Scale, Eligibility Rules', 'Application & Exam Timelines', 'Publication & Status State'],
        note: 'Authoritative recruitment directory. Public candidate queries only read approved and active notices.'
      },
      {
        name: 'Recruitment Resources',
        key: 'Exam Lifecycle Store',
        fields: ['Parent Recruitment Reference', 'Resource Type (Admit Card, Syllabus, Answer Key, Result)', 'Release Dates, Official Download References', 'Publication State'],
        note: 'Keeps critical post-application milestones organized and linked to the primary job notice.'
      },
      {
        name: 'Knowledge Base & Vectors',
        key: 'Semantic Document Index',
        fields: ['Document Chunks', 'Recruitment Scope Metadata', 'Vector Embeddings', 'Citation Pointers'],
        note: 'Backs the hybrid retrieval assistant, isolated behind private service boundaries.'
      },
      {
        name: 'Editorial & System Audit',
        key: 'Governance & Access Store',
        fields: ['Curator Credentials (One-way Salted Hash)', 'Role & Access Scopes', 'Modification Timestamps', 'Audit Event Logs'],
        note: 'Strictly restricted layer ensuring complete traceability of all content publishing actions.'
      }
    ],
    relationships: [
      'Recruitment Notices 1:N Recruitment Resources — every admit card, syllabus, answer key, and result links to its parent recruitment circular.',
      'Recruitment Notices 1:N Knowledge Base — document notice sections are tied to their parent notification for scoped retrieval.',
      'Editorial & Audit 1:N Recruitment Notices — all publishing transitions record author and reviewer attribution.'
    ],
    interactions: [
      'Candidate Public Reads: Fast, cached retrieval of published job circulars, resources, and mobile-friendly syllabuses.',
      'AI Assistant Inquiries: Dual-stream execution querying the semantic vector store alongside real-time relational verification.',
      'Administrative Staging: Secure submission, verification, and publication of newly ingested recruitment announcements.'
    ]
  },

  security: {
    summary:
      'KarmaVriti applies a defense-in-depth security posture spanning edge protection, strict role-based access control, cryptographic verification, and privacy-preserving data collection.',
    items: [
      {
        title: 'Secure edge perimeter',
        detail: 'All public and administrative interactions are routed through a secure edge gateway enforcing TLS encryption, DDoS resistance, automated bot filtering, and security header policies.'
      },
      {
        title: 'Least-privilege data access',
        detail: 'Candidate queries can only access approved, publicly active recruitment records. Internal administrative tables and knowledge indexing systems are isolated behind secure server environments.'
      },
      {
        title: 'Authentication & session defense',
        detail: 'Administrative access requires cryptographically hashed credentials and secure, signed session tokens configured with strict browser access protections to eliminate script interception risks.'
      },
      {
        title: 'Cryptographic event verification',
        detail: 'External subscription events and system webhooks require rigorous cryptographic signature verification before updating internal account states.'
      },
      {
        title: 'Privacy-first aggregate analytics',
        detail: 'System telemetry and search trends are tracked exclusively in aggregate without storing personal user identifiers or sensitive search profiles.'
      },
      {
        title: 'Human editorial gatekeeper',
        detail: 'AI-assisted document structuring never auto-publishes to the live site: mandatory curator review prevents hallucinations from ever reaching applicants.'
      }
    ]
  },

  challenges: [
    {
      issue: 'Inconsistent and scanned bilingual PDF notices',
      area: 'Document Processing',
      challenge: 'Government recruitment notices arrive in unpredictable layouts, ranging from modern digital exports to faint, multi-generation paper scans mixing English and Hindi.',
      solution: 'Implemented an adaptive document pipeline that automatically selects clean digital extraction or triggers bilingual OCR, normalizing text noise and preserving Hindi recruitment terms.'
    },
    {
      issue: 'Multi-post circulars mapping to different parent recruitments',
      area: 'Data Modelling',
      challenge: 'A single recruitment notice often covers multiple distinct designations (e.g., technical assistants, inspectors, clerks) with differing eligibility rules under one master exam.',
      solution: 'Structured the data model to decouple overarching recruitment campaigns from individual posts, allowing the AI assistant to isolate specific sub-post criteria accurately.'
    },
    {
      issue: 'Reconciling historical notifications with current revisions',
      area: 'Retrieval Grounding',
      challenge: 'Recruitment boards frequently issue addendums, date extensions, or vacancy revisions that contradict initial notice documents.',
      solution: 'Adopted hybrid retrieval: semantic search provides deep contextual narrative, while real-time relational lookups inject the latest verified dates and vacancy counts into the AI response.'
    },
    {
      issue: 'Unpredictable AI inference latency during traffic peaks',
      area: 'System Resilience',
      challenge: 'High concurrency during major recruitment announcements can strain third-party LLM inference, risking timeouts for mobile users.',
      solution: 'Engineered a graceful fallback mechanism that detects inference bottlenecks and instantly returns structured, rule-generated answers built directly from verified database records.'
    }
  ],

  future: {
    intro:
      'The KarmaVriti roadmap focuses on expanding automated ingestion pipelines, scaling background processing queues, and establishing multi-channel broadcast networks for candidates.',
    implementedToday: [
      'Fast, mobile-optimized public portal for jobs, admit cards, results, answer keys, and syllabuses.',
      'Interactive AI assistant with hybrid retrieval and transparent source citations.',
      'Adaptive document processing with bilingual English and Hindi OCR for scanned circulars.',
      'Human-in-the-loop editorial review and multi-stage publishing workflow.',
      'Secure edge architecture with least-privilege data isolation and privacy-first analytics.',
      'Resilient fallback architecture ensuring continuous availability regardless of AI provider load.'
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Automated notification collection',
        detail: 'Expand automated ingestion to continuously monitor official recruitment boards, automatically queuing newly published circulars for processing.'
      },
      {
        phase: 'Phase 2',
        title: 'Asynchronous queue orchestration',
        detail: 'Transition heavy document OCR and structuring workloads into distributed background queues for seamless processing of multi-hundred-page notices.'
      },
      {
        phase: 'Phase 3',
        title: 'Advanced hybrid retrieval tuning',
        detail: 'Further optimize lexical and semantic fusion algorithms for regional exam nomenclature and colloquial search phrasing.'
      },
      {
        phase: 'Phase 4',
        title: 'Multi-channel candidate alerts',
        detail: 'Deliver opt-in, privacy-preserving recruitment updates and deadline alerts via lightweight messaging networks such as Telegram and WhatsApp.'
      }
    ]
  },

  /* Ordered case-study outline for KarmaVriti */
  sections: [
    { id: 'overview',       kind: 'overview',       num: '01', label: 'Project overview' },
    { id: 'features',       kind: 'features',       num: '02', label: 'Platform capabilities' },
    { id: 'stack',          kind: 'stack',          num: '03', label: 'Core architecture components' },
    { id: 'architecture',   kind: 'architecture',   num: '04', label: 'System architecture' },
    { id: 'rag',            kind: 'workflow',       num: '05' },
    { id: 'pdf-ocr',        kind: 'workflow',       num: '06' },
    { id: 'job-ingestion',  kind: 'workflow',       num: '07' },
    { id: 'database',       kind: 'database',       num: '08', label: 'Data architecture' },
    { id: 'security',       kind: 'security',       num: '09', label: 'Security & privacy design' },
    { id: 'challenges',     kind: 'challenges',     num: '10', label: 'Design challenges & engineering solutions' },
    { id: 'future',         kind: 'future',         num: '11', label: 'System evolution' },
    { id: 'roadmap',        kind: 'roadmap',        num: '12', label: 'Implementation roadmap' }
  ]
};
