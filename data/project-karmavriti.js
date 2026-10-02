/* ---------------------------------------------------------------------------
 * data/project-karmavriti.js
 * Flagship GenAI project — full case-study content.
 *
 * Source of truth: the KarmaVriti repository README supplied in this
 * workspace (checked at commit fdd7182) plus the "Planned Improvements"
 * document. Anything under `future` is explicitly NOT implemented today.
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
    'Building a Government Jobs Portal with an AI Assistant using Next.js, PostgreSQL and Retrieval-Augmented Generation (RAG).',

  shortDescription:
    'An AI-powered government jobs portal that helps users discover government job opportunities and understand official recruitment notices through document-grounded AI assistance.',

  detailedDescription:
    'KarmaVriti is a government jobs information platform designed to make recruitment information easier to discover and understand. It combines job listings and recruitment updates with AI-powered document processing and retrieval. The application uses uploaded recruitment notices as a knowledge source for its AI assistant, and it explores automated information extraction from PDFs, OCR for scanned notices, and an administrative publishing workflow.',

  live: 'https://karma-vriti.vercel.app/',
  github: 'https://github.com/ApurvRj/KarmaVriti',

  thumbnail: 'assets/images/projects/karmavriti.svg',
  thumbnailAlt: 'KarmaVriti — government jobs portal with a RAG-powered assistant',

  /* Short tags shown on the homepage card. */
  techTags: ['Next.js', 'TypeScript', 'PostgreSQL + Prisma', 'Supabase pgvector', 'RAG', 'Tesseract OCR'],

  techStack: [
    {
      group: 'Frontend',
      items: ['Next.js 16 (App Router)', 'React 19', 'TypeScript 5', 'Tailwind CSS 4', 'framer-motion', 'lucide-react', 'TanStack Query']
    },
    {
      group: 'Backend',
      items: ['Next.js Route Handlers (Node.js runtime)', 'Stateless compute on Vercel', 'Server-side request validation']
    },
    {
      group: 'Database',
      items: ['PostgreSQL', 'Prisma 7 with @prisma/adapter-pg', 'Schema push via prisma db push']
    },
    {
      group: 'AI & retrieval',
      items: ['LangChain (JS)', 'HuggingFace Inference API', 'all-MiniLM-L6-v2 (384-dim)', 'Supabase pgvector', 'Qwen2.5-7B-Instruct']
    },
    {
      group: 'Document processing',
      items: ['unpdf (PDF text extraction)', 'Tesseract.js OCR (English + Hindi)', 'OpenAI gpt-4o-mini / Gemini 1.5 Flash', 'Ollama llama3 (local development)']
    },
    {
      group: 'Auth & payments',
      items: ['bcryptjs password hashing', 'JWT via jose in an httpOnly cookie', 'Roles: ADMIN and SUPER_ADMIN', 'Razorpay (Stripe is legacy)']
    },
    {
      group: 'Deployment & CI',
      items: ['Vercel, Mumbai region (bom1)', 'GitHub Actions: tsc --noEmit + ESLint on every PR']
    }
  ],

  metrics: [
    { label: 'Primary datastore', value: 'PostgreSQL', note: 'Prisma 7 + pg adapter' },
    { label: 'Vector store', value: 'pgvector', note: '384-dim, match_documents RPC' },
    { label: 'OCR languages', value: 'English + Hindi', note: 'Tesseract.js fallback' }
  ],

  overview: {
    introduction:
      'KarmaVriti is a job portal for Indian government recruitment. Visitors browse notifications, results, admit cards, answer keys and syllabus pages, and can ask an AI assistant about a notice in plain language. Admins publish content through a protected console, with AI help to turn notice PDFs into structured job data.',
    problem:
      'Government recruitment information is scattered across official PDF notices, written in dense legal language and published in inconsistent formats. Job seekers struggle to find a relevant opening, and even when they find the notice they struggle to extract the details that matter: eligibility, dates, vacancy counts and fee structure. Scanned notices are not searchable at all.',
    users: [
      'Job seekers looking for Indian government recruitment opportunities.',
      'Candidates in tier 2 and tier 3 cities searching on mobile devices.',
      'Administrators who publish and curate recruitment content.'
    ],
    objectives: [
      'Centralise government job listings, results, admit cards, answer keys and syllabus in one searchable place.',
      'Let users ask questions in plain language and receive answers grounded in the official notice.',
      'Reduce the manual effort of turning a recruitment PDF into a structured, publishable job record.',
      'Keep a human in the loop so an incorrect date or vacancy count never reaches the public site.',
      'Make public pages fast and discoverable through server rendering and structured data.'
    ],
    solution:
      'A single Next.js 16 deployment serves both the public site and an admin console. Public pages are server-rendered for SEO. Admins upload notice PDFs; text is extracted with an OCR fallback, chunked, embedded and stored in Supabase pgvector. When a visitor asks the assistant a question, the question is embedded, the top 5 chunks are retrieved, matching job rows are pulled from PostgreSQL for fresh dates and vacancies, and an LLM answers from that combined context with source links.'
  },

  features: [
    {
      title: 'RAG-based AI assistant',
      detail:
        'Uploaded recruitment notices become the assistant knowledge source. Document chunks and embeddings are stored in Supabase pgvector. Retrieval combines vector search over the notice text with live PostgreSQL lookups, so an answer is grounded in the notice and can cite the current database record.',
      code: 'POST /api/ai/query\nGET  /api/ai/search\nGET  /api/ai/health',
      codeLabel: 'api/ai/*'
    },
    {
      title: 'Semantic search',
      detail:
        'Visitors search by meaning instead of exact keywords, so a query such as "railway group d age limit" still surfaces the right notice.',
      code: 'GET /api/ai/search?q=...',
      codeLabel: 'api/ai/search'
    },
    {
      title: 'OCR for scanned notices',
      detail:
        'Recruitment notices are frequently scanned images. When normal PDF text extraction returns too little content, Tesseract.js OCR runs as a fallback and handles English and Hindi text.',
      code: "extractText(file)\n  -> unpdf\n  -> if (text too short) tesseract.recognize(file, 'eng+hin')",
      codeLabel: 'document pipeline'
    },
    {
      title: 'AI-assisted job ingestion',
      detail:
        'A PDF is converted to text and an LLM extracts structured job information, which is submitted as a draft for administrative review rather than published directly.',
      code: 'POST /api/admin/jobs/parse-pdf',
      codeLabel: 'api/admin/jobs/parse-pdf'
    },
    {
      title: 'Bulk JSON import with field mapping',
      detail:
        'Admins can import many jobs at once from JSON using a field mapping, which is faster than one-by-one entry during large recruitment drives.',
      code: 'POST /api/admin/jobs/bulk-upload',
      codeLabel: 'api/admin/jobs/bulk-upload'
    },
    {
      title: 'Controlled publishing workflow',
      detail:
        'New jobs are saved as preview drafts. An administrator reviews and edits the extracted data, then approves it. Content only reaches the public site from preview to upcoming or active through that approval route, which records who approved and when.',
      code: 'preview -> (admin review) -> upcoming / active',
      codeLabel: 'job lifecycle'
    },
    {
      title: 'Related recruitment information',
      detail:
        'Each new job gets linked draft resource pages for syllabus, admit card, answer key and result, so related information stays connected to the job it belongs to.',
      code: 'GET /api/results\nGET /api/admit-cards\nGET /api/answer-keys\nGET /api/syllabus',
      codeLabel: 'public resource routes'
    },
    {
      title: 'Discovery, filters and SEO',
      detail:
        'Category filters (SSC, Railway, Banking, UPSC, Defence, Police, Teaching, State and Central Government, PSU) plus search, status filters and infinite scroll. Public pages are server-rendered with a sitemap, robots rules and JSON-LD structured data.',
      codeLabel: 'server-rendered pages'
    },
    {
      title: 'Administrative security',
      detail:
        'Admins authenticate with a password hashed using bcryptjs. A JWT signed with jose is issued in an httpOnly cookie and the user is verified against the database on protected routes, using ADMIN and SUPER_ADMIN roles.',
      code: 'POST /api/admin/login\nrole in { ADMIN, SUPER_ADMIN }',
      codeLabel: 'admin auth'
    }
  ],

  architecture: {
    summary:
      'One Next.js 16 deployment on Vercel serves the public site and the admin console. The compute layer is stateless; all state lives in managed services (PostgreSQL, Supabase pgvector, external AI APIs).',
    layers: [
      { title: 'Frontend architecture', node: 'Next.js App Router',
        detail: 'Public pages are server-rendered for SEO and first-paint speed. Interactive surfaces such as category filters, infinite scroll, the admin console and the AI assistant are client components hydrated with TanStack Query for caching and request de-duplication.' },
      { title: 'Backend architecture', node: 'Route Handlers (serverless)',
        detail: 'All backend logic lives in Next.js Route Handlers, deployed as serverless functions. There is no long-lived session store: each request carries its own authentication cookie and re-reads state from the database. Admin handlers verify the JWT and the matching user record before doing any work.' },
      { title: 'Database architecture', node: 'PostgreSQL + Prisma',
        detail: 'PostgreSQL stores jobs, the linked resource pages (results, admit cards, answer keys, syllabus), admin users and notifications. Prisma 7 with the pg adapter is the data-access layer, and the schema is applied with prisma db push because the repository does not ship migration files.' },
      { title: 'AI integration', node: 'HuggingFace / OpenAI / Gemini',
        detail: 'Embeddings use sentence-transformers/all-MiniLM-L6-v2 and chat uses Qwen2.5-7B-Instruct, both through the HuggingFace Inference API. Turning a notice into structured job data uses OpenAI gpt-4o-mini or Gemini 1.5 Flash in production, with a local Ollama llama3 model during development.' },
      { title: 'Vector storage', node: 'Supabase pgvector',
        detail: 'A documents table with a 384-dimension embedding column lives in Supabase Postgres. A match_documents SQL function performs cosine-distance search and accepts a metadata filter, so retrieval can be scoped to a specific notice or job.' },
      { title: 'Authentication', node: 'JWT + httpOnly cookie',
        detail: 'Passwords are hashed with bcryptjs. On login the server signs a JWT with jose and sets it as an httpOnly cookie. Protected routes re-verify the token and the user record on the server, then check the ADMIN or SUPER_ADMIN role. A separate cookie namespace keeps admin sessions away from visitor state.' },
      { title: 'External services', node: 'Supabase · HF · OpenAI · Razorpay',
        detail: 'Supabase provides the vector tables and the server-side service-role key. HuggingFace provides embeddings and chat. OpenAI or Gemini performs PDF-to-JSON structuring. Razorpay handles payment-order creation and webhooks (Stripe is legacy).' },
      { title: 'Deployment', node: 'Vercel (bom1)',
        detail: 'Deployed to Vercel with the build command prisma generate && next build and a 60-second, 1 GB limit on the PDF-parsing route. GitHub Actions runs tsc --noEmit and ESLint on every push and pull request to main.' }
    ],
    notes: [
      'The application is deliberately a single deployment: UI and API are the same Next.js project, which keeps the surface area small.',
      'A Python/FastAPI + Chroma prototype of the same RAG idea exists in the repository backend/ folder. It is a prototype and is not used by the web app.'
    ],
    diagram: {
      src: 'assets/diagrams/karmavriti-system-design.svg',
      alt: 'KarmaVriti system design: visitors and admins, Next.js 16 App Router on Vercel, PostgreSQL, pgvector, AI services'
    }
  },

  workflows: {
    rag: {
      title: 'RAG architecture',
      subtitle:
        'How a recruitment notice becomes an answer. The ingestion half runs when an admin uploads a PDF; the query half runs on every visitor question.',
      groups: [
        { label: 'Ingestion (admin, offline)', from: 0, to: 5 },
        { label: 'Retrieval and answering (visitor, per query)', from: 6, to: 9 }
      ],
      steps: [
        { title: 'Document upload', detail: 'An administrator uploads a recruitment notice PDF through the admin console at /admin/ai-upload. The file is kept as the source document for citations.' },
        { title: 'PDF processing', detail: 'The PDF buffer is passed to the extraction pipeline. Scanned notices and born-digital notices take different paths from here.' },
        { title: 'Text extraction / OCR', detail: 'unpdf extracts embedded text. If the result is too short to be useful (a scanned page), the pipeline falls back to Tesseract.js OCR configured for English and Hindi.' },
        { title: 'Chunking', detail: 'The extracted text is split into approximately 1000-character chunks with 200 characters of overlap, so a sentence spanning a boundary is still retrievable.' },
        { title: 'Embedding generation', detail: 'Each chunk is sent to the HuggingFace Inference API using sentence-transformers/all-MiniLM-L6-v2, producing a 384-dimension vector.' },
        { title: 'Vector storage', detail: 'The chunk text, its metadata and its embedding are written to the Supabase documents table (vector(384)), ready for the match_documents RPC.' },
        { title: 'User query', detail: 'A visitor asks a question in the AI assistant. POST /api/ai/query receives the text.' },
        { title: 'Retrieval', detail: 'The question is embedded with the same model and match_documents returns the top 5 chunks by cosine similarity, filtered by metadata when scoped.' },
        { title: 'Live database lookup', detail: 'In parallel, matching job rows are read from PostgreSQL. This is what keeps dates, vacancy counts and status fresh even if the notice text is older than the database record.' },
        { title: 'Contextual AI response', detail: 'The retrieved chunks and the live job data are assembled into the prompt for Qwen/Qwen2.5-7B-Instruct. The answer is returned with source links back to the notice it came from.' }
      ],
      note:
        'Active jobs and syllabus pages can also be indexed through POST /api/ai/index (admin only). Running that endpoint more than once adds duplicates, so it is run sparingly.'
    },

    'pdf-ocr': {
      title: 'PDF processing and OCR',
      subtitle:
        'Government notices arrive in two shapes: text-based PDFs exported from publishing tools, and flat scans or photos of a printed notice. The pipeline handles both without the admin having to say which one it is.',
      steps: [
        { title: 'PDF upload', detail: 'The admin uploads a notice PDF. The file never leaves the request in a permanent form today: it is processed in-memory inside the route handler.' },
        { title: 'Text extraction', detail: 'unpdf reads the embedded text layer of the PDF. For a born-digital notice this alone is usually enough.' },
        { title: 'Scanned-document detection', detail: 'There is no separate classifier. The fallback is content-driven: if the extracted text is too short to be meaningful for the page count, the document is treated as scanned.' },
        { title: 'OCR processing', detail: 'Tesseract.js runs over the rendered pages and returns plain text. This is the expensive path, which is why it only runs as a fallback.' },
        { title: 'English and Hindi support', detail: 'Tesseract is initialised with the eng+hin language set, so notices that mix English headings with Hindi body text remain readable.' },
        { title: 'Extracted content handling', detail: 'The resulting text becomes the input for both downstream paths: embedding into the vector store for the assistant, and LLM structuring into a job draft.' }
      ],
      note:
        'The parse route runs inside a serverless function capped at 60 seconds and 1 GB on Vercel. Long OCR jobs are the reason background queue processing appears in the planned improvements.'
    },

    'job-ingestion': {
      title: 'AI job ingestion',
      subtitle:
        'Turning a notice into a publishable job record, with a human gate in the middle.',
      steps: [
        { title: 'PDF', detail: 'An admin uploads a recruitment notice through POST /api/admin/jobs/parse-pdf.' },
        { title: 'Text', detail: 'The document pipeline extracts text, falling back to OCR when the notice is a scan.' },
        { title: 'LLM extraction', detail: 'The notice text is truncated to fit the context window and sent to OpenAI gpt-4o-mini or Gemini 1.5 Flash with a prompt that asks for structured job fields. During development a local Ollama llama3 model is used instead.' },
        { title: 'Structured job data', detail: 'The model returns structured JSON: title, organisation, dates, vacancies, eligibility and related fields.' },
        { title: 'Admin review', detail: 'The record is saved as a preview draft. The admin opens the edit page, corrects anything the model got wrong and fills the gaps. Today only title and organisation are hard-required by validation, so the review step carries most of the correctness burden.' },
        { title: 'Publishing', detail: 'On approval the job moves to upcoming or active through the approve route, which records who approved it and when. Linked draft pages for syllabus, admit card, answer key and result are created alongside the job.' }
      ],
      note:
        'The human review gate is deliberate: publishing a wrong exam date or vacancy count is the highest-impact failure mode in this product.'
    }
  },

  database: {
    summary:
      'One PostgreSQL database holds the business data and a Supabase Postgres instance holds the AI knowledge base. They are separate stores reached by different clients, which is why a query can be answered from a document chunk and a live row at the same time.',
    tables: [
      { name: 'Job', key: 'Prisma model', fields: ['id, slug', 'title, organisation', 'category, location', 'status (preview / upcoming / active / closed)', 'dates, vacancies, eligibility, fee', 'approvedBy, approvedAt'], note: 'The core recruitment record. Public pages read only active rows; the admin console reads every draft.' },
      { name: 'Resource pages (Result, AdmitCard, AnswerKey, Syllabus)', key: 'Prisma models', fields: ['jobId -> Job', 'content fields', 'publish state'], note: 'Linked to their parent job and auto-drafted when a job is created.' },
      { name: 'AdminUser', key: 'Prisma model', fields: ['email (unique)', 'passwordHash (bcryptjs)', 'role (ADMIN | SUPER_ADMIN)', 'createdAt'], note: 'Seeded with a super admin via npm run db:seed.' },
      { name: 'Notification', key: 'Prisma model', fields: ['type', 'payload', 'createdAt'], note: 'Exists today; distribution to social and messaging channels is planned, not built.' },
      { name: 'documents', key: 'Supabase (raw SQL)', fields: ['id bigserial', 'content text', 'metadata jsonb', 'embedding vector(384)'], note: 'The LangChain-standard vector table. Kept in Supabase so the service-role key stays server-side.' }
    ],
    relationships: [
      'Job 1:N Result, AdmitCard, AnswerKey, Syllabus — every resource page belongs to exactly one job.',
      'Job 1:N documents.metadata.jobId — notice chunks are tagged with the job they describe, so retrieval can be scoped.',
      'AdminUser 1:N Job — the approve route writes approvedBy and approvedAt back onto the job.'
    ],
    vector: {
      extension: 'create extension if not exists vector;',
      table: 'create table documents (\n  id bigserial primary key,\n  content text,\n  metadata jsonb,\n  embedding vector(384)\n);',
      fn: 'create function match_documents(\n  query_embedding vector(384),\n  match_count int default null,\n  filter jsonb default \'{}\'\n) returns table (\n  id bigint, content text, metadata jsonb,\n  embedding jsonb, similarity float\n) language plpgsql as $$\nbegin\n  return query\n  select id, content, metadata,\n    (embedding::text)::jsonb as embedding,\n    1 - (documents.embedding <=> query_embedding) as similarity\n  from documents\n  where metadata @> filter\n  order by documents.embedding <=> query_embedding\n  limit match_count;\nend;\n$$;'
    },
    interactions: [
      'Public reads: /api/jobs, /api/jobs/[slug], /api/results, /api/admit-cards, /api/answer-keys, /api/syllabus.',
      'Admin writes: job create/edit/approve, PDF parse, bulk import, AI upload and re-index.',
      'AI question time: one vector query against Supabase plus one relational read against PostgreSQL.'
    ]
  },

  security: {
    summary:
      'Public pages are open by design. Everything that can change content sits behind a server-verified admin session, and the service-role key never reaches the browser.',
    items: [
      { title: 'Authentication', detail: 'Admin passwords are hashed with bcryptjs and never stored in plain text. POST /api/admin/login verifies the hash and, on success, issues a JWT signed with jose.' },
      { title: 'Session handling', detail: 'The JWT is written to an httpOnly cookie, so client-side JavaScript cannot read it. Cookies are the only session carrier; there is no server-side session table to keep in sync.' },
      { title: 'Authorization', detail: 'Every protected handler re-verifies the token and loads the matching user record before acting, then checks the role. ADMIN can manage content; SUPER_ADMIN additionally manages other administrators.' },
      { title: 'Role model', detail: 'Two roles only: ADMIN and SUPER_ADMIN. The super admin is created by the seed script using SUPER_ADMIN_PASSWORD, which must be at least 8 characters with upper case, lower case, a number and a special character.' },
      { title: 'Secret management', detail: 'JWT_SECRET, SUPABASE_SERVICE_ROLE_KEY, HUGGINGFACEHUB_API_TOKEN, OPENAI_API_KEY / GEMINI_API_KEY and the Razorpay secrets live only in environment variables. The Supabase service-role key is used server-side exclusively. .env is gitignored.' },
      { title: 'Database exposure', detail: 'The vector table is reached through a server-side Supabase client and the match_documents function. Vector search is therefore never called directly from the browser.' },
      { title: 'Human review as a control', detail: 'Because AI extraction can be wrong, draft content is not publicly readable. The approve route is the only path from preview to a published page, and it records who approved the change and when.' }
    ],
    hardening: [
      'Rate limiting on the public AI endpoints is planned, not implemented.',
      'A validation layer that cross-checks extracted fields against the source text is planned, not implemented.',
      'Admin edit history (a feedback loop for prompt improvement) is planned, not implemented.'
    ]
  },

  challenges: [
    { issue: 'Scanned notices carry no machine-readable text.',
      area: 'Document processing',
      challenge: 'A large share of government notices are scans or photographs. PDF text extraction returns an empty or near-empty string, which silently produces useless embeddings and an empty job draft.',
      solution: 'The pipeline treats OCR as a content-driven fallback rather than a separate mode: when the extracted text is too short to be meaningful, Tesseract.js runs over the pages with the eng+hin language set, so Hindi text in the notice is preserved rather than dropped.' },
    { issue: 'Retrieved notice text can disagree with the current record.',
      area: 'RAG grounding',
      challenge: 'A notice PDF is a snapshot. Vacancy counts get revised and dates move, so an assistant answering purely from embedded chunks will confidently state yesterday\'s facts.',
      solution: 'Retrieval is deliberately two-source. The vector search supplies the narrative context a notice is good at, and a live PostgreSQL lookup supplies the fields the database owns (dates, vacancies, status). Both go into the prompt, so the answer is grounded in the notice but current on the numbers.' },
    { issue: 'Applying the schema without migrations.',
      area: 'Database workflow',
      challenge: 'The repository ships no migration files, which makes the usual migrate-then-deploy path unavailable and risks drift between environments.',
      solution: 'The schema lives in prisma/schema.prisma as the single definition and is applied with prisma db push, with npm run prisma:studio used to inspect the live shape. This is a deliberate trade-off for a fast-moving solo project and is a known limitation rather than a hidden one.' },
    { issue: 'Long OCR jobs cannot finish inside a serverless request.',
      area: 'Infrastructure',
      challenge: 'The PDF parsing route is capped at 60 seconds and 1 GB on Vercel. A multi-page scan through Tesseract can exceed that, so a large notice fails in a way that is hard for the admin to understand.',
      solution: 'The parsing route is given an explicit, documented limit and is kept to the work it can finish: a single notice at a time. Moving parsing into a background worker with retries and a visible status is the first item in the planned build order, because the current ceiling is a real constraint, not a theoretical one.' },
    { issue: 'Indexing the same content twice.',
      area: 'Data hygiene',
      challenge: 'Re-running the indexing endpoint appends duplicate chunks, which degrades retrieval quality and inflates the vector table.',
      solution: 'This is documented as a known constraint with an explicit instruction to run the index endpoint sparingly, rather than pretending re-indexing is idempotent. Idempotent indexing belongs in the planned work.' },
    { issue: 'AI output that looks right but is wrong.',
      area: 'Correctness and trust',
      challenge: 'The highest-impact failure in a recruitment portal is publishing a wrong exam date or vacancy count. An LLM that returns plausible JSON makes that failure more likely, not less.',
      solution: 'Two design choices address it: extracted data always lands as a preview draft that an administrator edits, and today only title and organisation are hard-required by validation, which makes the human review step the intentional correctness gate rather than an afterthought.' }
  ],

  future: {
    intro:
      'Everything in this section is planned work. None of it describes a capability that exists in the repository today. It is shown separately so the difference between what the product does now and what it is designed to become stays visible.',
    implementedToday: [
      'Public pages: jobs, results, admit cards, answer keys and syllabus, server-rendered with SEO metadata.',
      'Admin console with JWT httpOnly cookie authentication and ADMIN / SUPER_ADMIN roles.',
      'PDF to job parsing (unpdf with Tesseract OCR fallback, LLM structuring).',
      'Bulk JSON job import with field mapping.',
      'RAG assistant and semantic search over uploaded notices plus live job data.',
      'Human review gate: preview, then approve, with approver and timestamp recorded.'
    ],
    notImplemented: [
      { stage: 'Admin input', planned: 'PDF, URL or pasted text.', today: 'PDF through the parse-pdf route plus bulk JSON upload. No URL or free-text input.' },
      { stage: 'Automated scraper', planned: 'Pulls notices from official sites.', today: 'Not built.' },
      { stage: 'Processing queue', planned: 'Object storage plus RabbitMQ or Kafka.', today: 'Not built. Parsing runs inside a single request with a 60-second ceiling on Vercel.' },
      { stage: 'Raw text extraction', planned: 'PDF text and OCR.', today: 'Built: unpdf with Tesseract.js OCR (English and Hindi) as fallback.' },
      { stage: 'Data cleaning', planned: 'A separate normalisation step.', today: 'Not separate. Text is only truncated before the LLM call.' },
      { stage: 'AI structuring engine', planned: 'Notice text to structured fields.', today: 'Built: OpenAI or Gemini in production, Ollama in development.' },
      { stage: 'Validation layer', planned: 'Rules plus an AI cross-check against the source text.', today: 'Partial: only title and organisation are hard-required.' },
      { stage: 'Structured job JSON', planned: 'A standard output format.', today: 'Built.' },
      { stage: 'Draft and edit panel', planned: 'A draft the admin can edit.', today: 'Built: jobs save as preview, with admin edit pages and auto-created draft resources.' },
      { stage: 'Human review', planned: 'Approval before publishing.', today: 'Built: the approve route records who approved and when.' },
      { stage: 'Thumbnail and short video', planned: 'Canva for thumbnails, Runway for short video.', today: 'Not built.' },
      { stage: 'Cloud storage, CDN and social posting', planned: 'Media in cloud storage behind a CDN, posted to Telegram, Instagram and YouTube.', today: 'Not built. Only a Notification table exists.' },
      { stage: 'Website and SEO pages', planned: 'Published job pages.', today: 'Built: server-rendered pages, sitemap and structured data.' },
      { stage: 'Prompt and UX feedback loop', planned: 'What reviewers change feeds back into prompts and interface.', today: 'Not built. Admin edits are not recorded.' },
      { stage: 'Rate limiting and hybrid retrieval', planned: 'Protect public AI endpoints; combine semantic and keyword search.', today: 'Not built.' }
    ],

    proposedArchitecture: {
      summary:
        'The planned pipeline turns a manual, request-bound flow into a queue-driven one: ingest a notice, structure it with AI, keep the human review gate, then publish to the website and to social channels. Nothing reaches the public site without passing that gate.',
      stages: [
        { n: '01', title: 'Ingestion', detail: 'Admins submit a PDF, a URL or pasted text. An automated scraper adds notices from official sources into the same queue.' },
        { n: '02', title: 'Processing queue', detail: 'Original files go to object storage (S3) and every notice becomes a queued job. A two-way path lets failed or corrected jobs be reprocessed.' },
        { n: '03', title: 'AI processing', detail: 'Four steps in order: raw text extraction (PDF text with OCR for scans), a data cleaning step, the AI structuring engine, and a validation layer that combines deterministic rules with an AI cross-check against the source text.' },
        { n: '04', title: 'Job draft creation', detail: 'The structured JSON becomes a draft job that an admin can fix in an edit panel.' },
        { n: '05', title: 'Human review', detail: 'A person checks the draft before anything is published. This remains the safeguard for dates, vacancy counts and eligibility.' },
        { n: '06', title: 'Media generation', detail: 'Canva produces a thumbnail template and Runway produces a short video for each published job.' },
        { n: '07', title: 'Distribution', detail: 'Media and links are stored in cloud storage behind a CDN and posted to Telegram, Instagram and YouTube.' },
        { n: '08', title: 'Website and SEO pages', detail: 'The approved job is published as a search-optimised page on the site.' },
        { n: '09', title: 'Prompt and UX improvements', detail: 'What reviewers change and how users respond feeds back into better prompts and a better interface.' }
      ],
      openQuestions: [
        'Queue choice: the planning diagram shows both RabbitMQ and Kafka. At this scale one queue is enough; the open question is managed service versus self-hosting.',
        'Serverless limits: long OCR jobs and scrapers need a worker outside the request cycle.',
        'Cost per notice: OCR, LLM calls and video generation add up, so a budget per notice should be set and measured.',
        'Should trusted official sources ever skip manual review, or should every notice always pass it?'
      ],
      diagram: {
        src: 'assets/diagrams/karmavriti-automated-pipeline.svg',
        alt: 'Proposed automated content pipeline: ingestion, queue, AI processing, draft, human review, media generation, distribution, website',
        caption: 'Proposed future architecture — planned work, not implemented today.'
      }
    },

    roadmap: [
      { phase: 'Phase 1', title: 'Queue and inputs', detail: 'Add URL and pasted-text input, store original files in object storage, and move parsing into a background job with retries and a visible status in the admin panel.' },
      { phase: 'Phase 2', title: 'Cleaning and validation', detail: 'Add a dedicated cleaning step, check required fields and date sanity, compare extracted values against the source text, flag low-confidence fields in the edit panel, and start recording admin edits.' },
      { phase: 'Phase 3', title: 'Automated scraper', detail: 'Begin with a few official sites, de-duplicate by URL or content hash, and let every scraped notice land as a preview draft.' },
      { phase: 'Phase 4', title: 'Media and distribution', detail: 'Start with thumbnail templates, then short video. Post to Telegram first because it is the simplest, then Instagram and YouTube.' },
      { phase: 'Phase 5', title: 'Feedback loop', detail: 'Use the recorded admin edits to find where extraction gets fields wrong, and refine the prompts against that list.' },
      { phase: 'Phase 6', title: 'Retrieval quality', detail: 'Add rate limiting to the public AI endpoints and improve retrieval by combining semantic and keyword-based search.' }
    ]
  },

  /* Ordered case-study outline. `kind` selects the renderer; `id` binds a
   * section to a workflow entry where one exists. */
  sections: [
    { id: 'overview',       kind: 'overview',   num: '01', label: 'Project overview' },
    { id: 'features',       kind: 'features',   num: '02', label: 'Feature walkthrough' },
    { id: 'stack',          kind: 'stack',      num: '03', label: 'Technology stack' },
    { id: 'architecture',   kind: 'architecture', num: '04', label: 'System architecture' },
    { id: 'rag',            kind: 'workflow',   num: '05' },
    { id: 'pdf-ocr',        kind: 'workflow',   num: '06' },
    { id: 'job-ingestion',  kind: 'workflow',   num: '07' },
    { id: 'database',       kind: 'database',   num: '08', label: 'Database architecture' },
    { id: 'security',       kind: 'security',   num: '09', label: 'Security' },
    { id: 'challenges',     kind: 'challenges', num: '10', label: 'Technical challenges and solutions' },
    { id: 'future',         kind: 'future',     num: '11', label: 'Future scope' },
    { id: 'proposed',       kind: 'proposed',   num: '12', label: 'Proposed future architecture' },
    { id: 'roadmap',        kind: 'roadmap',    num: '13', label: 'Future workflow and roadmap' }
  ]
};

