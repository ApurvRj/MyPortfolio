/* ---------------------------------------------------------------------------
 * data/project-sutra.js
 * Second featured project — full-stack e-commerce case study.
 *
 * Source of truth: the "Sūtra Atelier System Design Specification" (v2.0.0)
 * and the product-recommendation planning documents supplied in this
 * workspace. Anything under `future` is explicitly NOT implemented today.
 * ------------------------------------------------------------------------- */
window.PORTFOLIO_PROJECT_SUTRA = {
  slug: 'sutra-atelier',
  order: 2,
  featured: true,
  name: 'Sūtra Atelier',
  categoryLabel: 'Full Stack Development / E-commerce',
  categories: ['fullstack', 'ecommerce'],
  statusLabel: 'Live website',
  statusTone: 'live',
  accent: 'secondary',

  tagline:
    'A modern fashion e-commerce platform built with Next.js, Supabase and Razorpay.',

  shortDescription:
    'A modern fashion e-commerce platform featuring product discovery, customer accounts, shopping cart, checkout and payment integration.',

  detailedDescription:
    'Sūtra Atelier is a fashion e-commerce application designed to provide customers with a modern online shopping experience. It includes product browsing, category-based navigation, customer authentication, cart management, address and checkout workflows, and payment integration. Supabase provides authentication, database services and storage, with Razorpay integration for online payments.',

  live: 'https://sutra-atelier.vercel.app/',
  github: 'https://github.com/ApurvRj/sutra-atelier',

  thumbnail: 'assets/images/projects/sutra-atelier.svg',
  thumbnailAlt: 'Sūtra Atelier — fashion e-commerce storefront',

  techTags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'PostgreSQL + RLS', 'Razorpay'],

  techStack: [
    {
      group: 'Frontend',
      items: ['Next.js 15 App Router', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'lucide-react', 'framer-motion', 'jspdf (GST invoice generation)']
    },
    {
      group: 'Backend',
      items: ['Next.js Route Handlers (/api/*)', 'Server Components for SEO catalog and admin shell', 'Node.js runtime on Vercel serverless']
    },
    {
      group: 'Database',
      items: ['Supabase PostgreSQL 15', 'PostgREST with transactional RPCs', 'Row Level Security policies', 'SQL triggers for state and default-address enforcement']
    },
    {
      group: 'Authentication',
      items: ['Supabase Auth', 'Email + password registration', 'Phone OTP login (via provider configuration)', '@supabase/ssr cookie-based sessions', 'Isolated admin session cookie (sb-admin-auth-token)']
    },
    {
      group: 'Storage',
      items: ['Supabase Storage buckets: product-images, banners', 'Public read via Cloudflare CDN cache', 'Admin-only writes, 5 MB / 10 MB per-file limits']
    },
    {
      group: 'Payments',
      items: ['Razorpay order creation', 'HMAC SHA-256 signature verification', 'Asynchronous webhook handling (payment.captured, payment.failed)', 'Cash on Delivery option']
    },
    {
      group: 'Integrations',
      items: ['India Post PIN code API (server proxy)', 'Leaflet + OpenStreetMap map pin picker', 'Twilio SMS messaging service (optional)']
    },
    {
      group: 'Deployment',
      items: ['Vercel serverless, India-optimised region', 'Preview deployments on pull requests, production on main', 'CI: npm run typecheck, npm run lint, npm run build']
    }
  ],

  metrics: [
    { label: 'Storefront pages', value: '10+', note: 'Shop, category, product, content' },
    { label: 'Transactional RPCs', value: '1 atomic', note: 'create_order locks stock' },
    { label: 'Order states', value: '7', note: 'enforced by trigger' },
    { label: 'Return stages', value: '6', note: 'separate from orders' }
  ],

  /* Verification status — kept explicit so the case study never overstates
   * what is running in the live deployment. */
  verification: {
    heading: 'Verification status',
    note:
      'This case study is written from the Sūtra Atelier system design specification and the project documentation supplied for this portfolio. Live production services depend on environment configuration and provider approval, so they are described as implemented-or-configured, never as independently verified in the public deployment.',
    verified: [
      'Documented system design covering architecture, data model, API surface, RLS policies and deployment.',
      'Commerce data model: profiles, addresses, products, product_variants, orders, order_items, order_status_history.',
      'Transactional order creation via the create_order RPC with pessimistic stock locking.',
      'Row Level Security policies on customer-owned and admin-owned tables.'
    ],
    pending: [
      'Phone OTP and SMS delivery require a configured messaging provider in the deployment environment; treat OTP as implemented-but-configuration-dependent rather than verified live.',
      'Online payments require Razorpay key, secret and webhook secret to be present in the production environment; treat live payment capture as configuration-dependent.',
      'Server-validated authorization on every administrative handler is a hardening item, not a claim.',
      'Audit logging, transactional email/SMS order notifications and transactional refund workflows are pending production hardening.',
      'Guest demo checkout is a local UI-testing flow only. It is not a real payment transaction, not a database-backed order, and not a real stock reservation.'
    ]
  },

  overview: {
    introduction:
      'Sūtra Atelier is a modern digital flagship for artisanal Indian handloom and ready-to-wear. The platform pairs an editorial luxury storefront with an order management, inventory control and customer returns engine behind it.',
    problem:
      'Small luxury labels need the operational depth of an enterprise commerce platform — stock that is accurate per size, orders that cannot be tampered with on the client, returns that do not corrupt order history, and a storefront that still feels calm and editorial — without the cost and weight of a conventional commerce suite.',
    users: [
      'Shoppers browsing and buying handloom and ready-to-wear pieces on mobile.',
      'Returning customers tracking orders and returns from a customer portal.',
      'Store administrators managing catalog, inventory, orders, coupons and returns.'
    ],
    objectives: [
      'Deliver fast, server-rendered editorial product pages with responsive client interactivity.',
      'Provide a checkout pipeline with real-time stock locking, coupon application and Razorpay or COD support.',
      'Keep a strictly separated, tamper-proof return and refund workflow with secure capture of payout details.',
      'Degrade gracefully: if backend services are unavailable, catalog browsing falls back to an embedded collection.',
      'Strictly segregate administrative authority from customer accounts using isolated token cookies and server-side role validation.'
    ],
    solution:
      'A single Next.js 15 App Router deployment on Vercel serves the storefront, the customer portal and the admin console, with Supabase providing Postgres, Auth and object storage. Prices, discounts and stock are always recomputed on the server: order creation goes through one transactional create_order RPC that locks variant rows, re-derives the subtotal from database prices, deducts stock and writes the order, its items and its first status row together.'
  },

  features: [
    { title: 'Editorial storefront', detail: 'A server-rendered home page, category headers and campaign banners give the brand an editorial feel while keeping first paint fast and the markup indexable.' },
    { title: 'Product discovery', detail: 'Category-based navigation, featured and sale collections, product listing with filters, keyword search and product detail pages with size and colour variants.' },
    { title: 'Product detail experience', detail: 'Variant-aware pricing, per-size stock visibility, image gallery, fabric and care information, and add-to-bag or add-to-wishlist actions.' },
    { title: 'Shopping bag', detail: 'A mini bag drawer for quick edits. Guests get a browser-persisted bag; signing in syncs the bag to the database so it follows the customer across devices.' },
    { title: 'Wishlist', detail: 'Saved pieces stored per customer in the wishlist_items table and surfaced in the customer portal.' },
    { title: 'Customer accounts', detail: 'Registration with email and password, phone-number identifier resolution, profile management and a portal covering order history and return tracking.' },
    { title: 'Address management', detail: 'Up to five saved addresses with 6-digit Indian postal-code validation, a Leaflet map pin picker, and a trigger that keeps exactly one default address.' },
    { title: 'Checkout', detail: 'Address selection, coupon validation, server-recalculated totals, Razorpay or Cash on Delivery, and an order confirmation step with an order number.' },
    { title: 'Order tracking', detail: 'Seven order states from payment_pending through placed, packed, shipped, out_for_delivery and delivered, with cancellation and a status history timeline.' },
    { title: 'Returns and refunds', detail: 'A six-step return workflow kept separate from the order lifecycle, with a seven-day post-delivery eligibility window and secure capture of UPI or bank payout details.' },
    { title: 'GST invoice', detail: 'Order invoices are generated as PDFs with GST details and streamed from the orders API.' },
    { title: 'Content pages', detail: 'Editorial content pages backed by the banners bucket for lookbooks and campaign imagery.' },
    { title: 'Admin console', detail: 'A server-rendered admin console with an inventory watch list, recent orders, order and return lifecycle actions, and CRUD for products, categories and coupons.' }
  ],

  architecture: {
    summary:
      'Three layers: a browser client, a Next.js 15 App Router application on Vercel, and managed Supabase services plus a payment gateway and two external APIs. The application layer is stateless; everything durable lives in Supabase or with the gateway.',
    layers: [
      { title: 'Client layer', node: 'Browser',
        detail: 'Mobile web and desktop browser running React 19 and Tailwind CSS. Holds the storefront, the mini bag drawer, the wishlist, the Leaflet map picker, the customer portal (profile, order history, return tracking) and the admin console shell.' },
      { title: 'Application layer', node: 'Next.js 15 on Vercel',
        detail: 'Server Components render the SEO-optimised catalog and the admin shell; Client Components own the cart drawer and the checkout steps. Route Handlers under /api/* serve auth, orders, payments, catalog and admin operations. Server-side auth parsers read the sb-*-auth-token cookies before any privileged work.' },
      { title: 'Data layer', node: 'Supabase Cloud',
        detail: 'PostgreSQL 15 holds the commerce tables, Supabase Auth issues and validates identities, Supabase Storage hosts product images and banners, and PostgREST exposes transactional RPCs such as create_order.' },
      { title: 'Payment layer', node: 'Razorpay',
        detail: 'Server SDK creates the order, the client completes checkout, and the server verifies the HMAC SHA-256 signature before any database commit. A separate webhook endpoint handles asynchronous payment.captured and payment.failed events.' },
      { title: 'Third-party APIs', node: 'India Post · OSM · Twilio',
        detail: 'India Post PIN code lookup is proxied server-side through /api/pincode/[pin] to avoid browser CORS and is cached in memory. OpenStreetMap tiles back the Leaflet map picker. Twilio is an optional messaging service configured through environment variables.' },
      { title: 'Resilience layer', node: 'Fallbacks',
        detail: 'src/lib/products.ts provides a curated embedded catalog when the Supabase connection fails, so browsing degrades instead of breaking. The admin console uses a dual-layer credential fallback (service-role first, authenticated session second) with try/catch prefetching so a backend hiccup does not crash the page with a 500.' }
    ],
    notes: [
      'Customer orders and the return lifecycle are stored and progressed independently, so historical order records stay intact while a return is in flight.',
      'All order totals, discounts and inventory counts are authoritatively evaluated on the server; the client is never trusted for money or stock.'
    ],
    diagram: {
      src: 'assets/diagrams/sutra-atelier-system-design.svg',
      alt: 'Sūtra Atelier system design: client layer, Next.js application layer on Vercel, Supabase, Razorpay and third-party APIs'
    }
  },

  workflows: {
    auth: {
      title: 'Authentication workflow',
      subtitle:
        'Two independent session namespaces: customers authenticate through Supabase Auth, administrators through a separate cookie and an is_admin check.',
      steps: [
        { title: 'Registration', detail: 'POST /api/auth/register accepts email, password, full_name and phone. It creates the Supabase Auth user and auto-provisions the matching profiles row in the same flow.' },
        { title: 'Identifier resolution', detail: 'POST /api/auth/resolve-identifier accepts either an email or a 10-digit Indian phone number and resolves a phone number to the primary auth email, so a customer can sign in with the identifier they remember.' },
        { title: 'Sign in', detail: 'Supabase Auth validates the credential and returns a session. With @supabase/ssr the tokens are written into sb-*-auth-token cookies, which is what makes server-side rendering aware of the signed-in customer.' },
        { title: 'Phone OTP', detail: 'Phone OTP login is part of the auth surface and is handled by the Supabase Auth provider. It requires messaging credentials to be configured in the deployment environment, so it is implemented-but-configuration-dependent rather than verified live.' },
        { title: 'Server-side session read', detail: 'Server Components and Route Handlers read the cookie through the server Supabase client. From there auth.uid() is populated and the Row Level Security policies on profiles, addresses, orders and wishlist_items apply automatically.' },
        { title: 'Customer profile', detail: 'The profiles table is the customer record: email, phone, full_name, is_admin, plus the refund payout fields that are only readable during an active refund.' },
        { title: 'Admin session', detail: 'Admin authentication uses its own cookie namespace (sb-admin-auth-token) and its own browser and server clients, so a customer session can never be mistaken for an admin session. Admin handlers then check is_admin = true on the profile.' },
        { title: 'Admin resilience', detail: 'The admin console tries the service-role client first and falls back to the authenticated session client inside try/catch, so a partial backend outage degrades the dashboard instead of returning a 500.' }
      ]
    },

    'cart-checkout': {
      title: 'Cart and checkout workflow',
      subtitle:
        'From a guest bag in the browser to an atomic, server-verified order.',
      steps: [
        { title: 'Guest bag', detail: 'An anonymous visitor adds pieces to the bag. The bag lives in the browser, so browsing works before any account exists.' },
        { title: 'Sign in and sync', detail: 'On sign-in the browser bag is synchronised into cart_items, linked to specific product_variants rows rather than to the product, so size and colour are part of the line item.' },
        { title: 'Address selection', detail: 'The customer picks a saved address or creates one. POST /api/addresses validates a 6-digit Indian pincode and enforces a maximum of five addresses per customer; PATCH and DELETE maintain them, and a trigger promotes the newest remaining address to default when the default is removed.' },
        { title: 'Coupon validation', detail: 'POST /api/coupons/validate checks the coupon expiry, its minimum order value and its active flag, and returns the discount or a reason for rejection.' },
        { title: 'Price calculation', detail: 'The server recomputes the subtotal from the database price of each variant, applies the discount and shipping fee, and derives the total. Client-side totals are a display convenience only.' },
        { title: 'Stock validation and order creation', detail: 'POST /api/payments/create-order calls the create_order RPC, which runs as one database transaction: validate the profile, SELECT ... FOR UPDATE the product_variants rows to lock them, verify stock, recompute the subtotal from database prices, deduct stock, then insert the order, all order_items and the first order_status_history row.' },
        { title: 'Payment branch', detail: 'For Razorpay the RPC result is followed by a gateway order; for Cash on Delivery the order is created with payment_method cod and payment_status pending.' },
        { title: 'Order confirmation', detail: 'The customer receives the generated order_number and the order appears in the portal with its status history.' },
        { title: 'Cancellation', detail: 'POST /api/orders/cancel cancels a placed or packed order with a reason and restores the reserved stock back into product_variants.' }
      ],
      note:
        'The guest demo checkout on the public site is a local UI-testing flow. It exercises the interface without creating a real payment transaction, a database-backed order or a real stock reservation.'
    },

    payments: {
      title: 'Payment integration',
      subtitle:
        'Razorpay order creation, server-side signature verification and asynchronous webhook handling.',
      steps: [
        { title: 'Order creation', detail: 'The server SDK calls razorpay.orders.create with the server-computed amount in INR. The returned razorpay_order_id is stored on the order row alongside the internal order id.' },
        { title: 'Client checkout', detail: 'The browser opens Razorpay checkout and, on completion, receives razorpay_payment_id, razorpay_order_id and razorpay_signature.' },
        { title: 'Server-side verification', detail: 'POST /api/payments/verify recomputes the HMAC SHA-256 signature using RAZORPAY_KEY_SECRET and compares it before trusting anything. On success the order transitions to placed and the payment status to paid, and the response returns the order number.' },
        { title: 'Webhook processing', detail: 'POST /api/payments/webhook is a separate, secret-authenticated endpoint for asynchronous events, primarily payment.captured and payment.failed. This is what keeps order state correct when the browser never returns to the site.' },
        { title: 'Cash on Delivery', detail: 'COD orders skip the gateway entirely and start with payment_status pending, so the order flow and the payment flow stay decoupled.' },
        { title: 'Refunds', detail: 'Refunds are not part of the order lifecycle. They run through the separate six-stage return workflow (requested, acknowledged, pickup scheduled, pickup done, refund initiated, refund completed), with payout details captured only when a return begins.' }
      ],
      note:
        'Live payment capture depends on Razorpay keys and the webhook secret being present in the production environment. Treat the gateway path as implemented and configuration-dependent rather than verified in the public deployment.'
    }
  },

  database: {
    summary:
      'Supabase PostgreSQL 15 with nine commerce tables, transactional RPCs and SQL triggers. Customer identity comes from auth.users; everything commercial hangs off the profiles row.',
    relationships: [
      'auth.users 1:1 profiles — identity and the public customer record.',
      'profiles 1:N addresses, cart_items, wishlist_items, orders — all customer-owned data.',
      'products N:1 categories — catalog taxonomy.',
      'products 1:N product_variants — per size and colour rows that own the stock count.',
      'orders 1:N order_items and 1:N order_status_history — line items and the audit timeline.',
      'order_items N:1 product_variants — which exact variant was purchased.'
    ],
    tables: [
      { name: 'profiles', key: 'auth.users(id)', fields: ['id uuid PK -> auth.users', 'email, phone, full_name', 'is_admin boolean', 'refund_upi_id, refund_bank_acc, refund_ifsc, refund_holder', 'created_at, updated_at'], note: 'Refund payout fields are scoped: readable only by admins during an active refund state.' },
      { name: 'addresses', key: 'profiles(id)', fields: ['recipient_name, phone', 'street_address, landmark', 'city, state', 'postal_code varchar(6) CHECK ^[1-9][0-9]{5}$', 'latitude, longitude numeric(10,7)', 'is_default'], note: 'Maximum five per customer. Pincode format is enforced by a CHECK constraint, not only in the UI.' },
      { name: 'categories', key: '—', fields: ['id uuid PK', 'name, slug'], note: 'Taxonomy for storefront navigation.' },
      { name: 'products', key: 'categories(id)', fields: ['name, slug (unique), description', 'fabric, care', 'price numeric(10,2) CHECK >= 0', 'compare_at_price CHECK >= price', 'image_urls text[]', 'status: active | draft | archived', 'is_featured, is_sale'], note: 'Price truth for the order pipeline.' },
      { name: 'product_variants', key: 'products(id)', fields: ['size varchar(10)', 'color, color_hex', 'sku (unique)', 'stock integer CHECK >= 0'], note: 'The row that create_order locks with SELECT ... FOR UPDATE.' },
      { name: 'orders', key: 'profiles(id)', fields: ['order_number (unique)', 'status: payment_pending | placed | packed | shipped | out_for_delivery | delivered | cancelled', 'payment_method: razorpay | cod', 'payment_status: pending | paid | failed | refunded', 'subtotal, discount, shipping_fee, total', 'address jsonb (immutable snapshot)', 'razorpay_order_id, razorpay_payment_id', 'tracking_number, courier_name', 'return_status, return_reason, return_pickup_date, return_refund_details jsonb', 'delivered_at'], note: 'The address is an immutable JSONB snapshot, so editing a saved address never rewrites order history.' },
      { name: 'order_items', key: 'orders(id)', fields: ['product_id, variant_id', 'name, size, color', 'price, quantity CHECK > 0', 'image_url'], note: 'Snapshots the display fields so an invoice stays readable even if the product is later renamed.' },
      { name: 'order_status_history', key: 'orders(id)', fields: ['status', 'note', 'created_at'], note: 'Append-only timeline shown to the customer as order tracking.' },
      { name: 'wishlist_items', key: 'profiles(id)', fields: ['product_id', 'created_at'], note: 'Saved pieces per customer.' },
      { name: 'cart_items', key: 'profiles(id)', fields: ['variant_id -> product_variants', 'quantity'], note: 'The signed-in, server-persisted bag.' }
    ],
    rpc: {
      name: 'create_order',
      note: 'Runs entirely inside one database transaction, which is what makes stock locking and order creation atomic.',
      steps: [
        'Validate the user profile.',
        'Query product_variants with SELECT ... FOR UPDATE to take a pessimistic lock and verify availability.',
        'Recompute the order subtotal from database prices, so a tampered client payload cannot change the amount.',
        'Deduct stock from product_variants.',
        'Insert the orders row, bulk insert order_items, and record the initial order_status_history entry.'
      ]
    },
    triggers: [
      { name: 'update_default_address', detail: 'Flips the previous default address to false when a new default is designated, so exactly one default always exists.' },
      { name: 'enforce_order_state_transition', detail: 'Rejects invalid jumps in the order lifecycle, for example from delivered back to packed.' }
    ]
  },

  security: {
    summary:
      'A zero-trust server architecture: Row Level Security decides what a customer token can reach, the server recomputes anything involving money or stock, and every secret stays out of the browser.',
    implemented: [
      { title: 'Row Level Security policies', detail: 'profiles: SELECT and UPDATE allowed when auth.uid() = id, or for an admin. addresses: all operations scoped to auth.uid() = user_id. orders and order_items: SELECT for the owner or an admin, INSERT through the server service role or the create_order RPC, UPDATE for admins or for an owner cancelling a still-placed order. products and categories: public SELECT for the active catalog, all operations for admins.' },
      { title: 'Server-side price authority', detail: 'Order subtotals, discounts and totals are recomputed from database prices inside the create_order RPC. A modified client payload cannot change the amount charged.' },
      { title: 'Pessimistic stock locking', detail: 'Variant rows are locked with SELECT ... FOR UPDATE before stock is verified and deducted, which prevents two concurrent checkouts from selling the same last piece.' },
      { title: 'State-transition enforcement', detail: 'A trigger blocks invalid order status jumps, so a stale admin action cannot move a delivered order back to packed.' },
      { title: 'Separate admin session namespace', detail: 'Administrators use isolated sb-admin-auth-token cookies and separate browser and server clients, so customer and admin authority never share a session.' },
      { title: 'Payment signature verification', detail: 'Razorpay signatures are recomputed with HMAC SHA-256 on the server and compared before the order is marked paid. Webhooks are authenticated with a dedicated webhook secret.' },
      { title: 'Secret hygiene', detail: 'SUPABASE_SERVICE_ROLE_KEY, RAZORPAY_KEY_SECRET and RAZORPAY_WEBHOOK_SECRET exist only in Vercel encrypted environment variables and are never bundled into client-side JavaScript as NEXT_PUBLIC_* values.' },
      { title: 'Cookie policy', detail: 'Customer and admin sessions use SameSite=Lax with Secure in production.' },
      { title: 'PII scoping', detail: 'Refund bank and UPI details are captured only during a return and are queryable only by administrators while the return is in an active refund state.' },
      { title: 'Storage access control', detail: 'product-images (5 MB, jpeg/png/webp/avif) and banners (10 MB) are public-read for delivery but restricted to administrators for write, update and delete.' }
    ],
    hardening: [
      'Server-validated authorization on every administrative handler should be audited end to end, not only at the session layer.',
      'Audit logging of administrative actions is pending.',
      'Transactional email and SMS order notifications are pending (Twilio is optional and configuration-dependent).',
      'Stock restoration and refund payouts should be wrapped in fully transactional workflows with idempotency keys.',
      'A customer address and order privacy review is pending, including retention and data-minimisation rules.'
    ]
  },

  deployment: {
    summary:
      'Deployed on Vercel serverless infrastructure with an India-optimised region, fronted by Supabase-managed Postgres, Auth and Storage. No server is provisioned or maintained by hand.',
    items: [
      { title: 'Hosting', detail: 'Frontend and API run on Vercel serverless (Node.js 20.x runtime). Static assets are served from the Vercel edge network, and the deployment region is chosen for Indian traffic latency.' },
      { title: 'TLS', detail: 'Custom domains receive automatic TLS certificates through Vercel DNS.' },
      { title: 'Database and auth', detail: 'Supabase Cloud provides managed PostgreSQL 15, Supabase Auth and object storage, reached with @supabase/supabase-js and @supabase/ssr.' },
      { title: 'Media delivery', detail: 'Product images and banners are served from Supabase Storage through its Cloudflare CDN cache layer, which keeps origin egress low.' },
      { title: 'Pipelines', detail: 'Pull requests produce Vercel preview deployments; commits merged to main produce production deployments. Pre-flight verification runs npm run typecheck, npm run lint and npm run build.' },
      { title: 'Operational note', detail: 'On the Vercel Hobby plan a private repository rejects automatic deployments when the commit author does not own the Vercel account, so collaborator work is merged under the owner Git credentials or deployed through GitHub Actions with a personal token.' }
    ]
  },

  challenges: [
    { issue: 'Selling the same last piece twice.', area: 'Inventory integrity',
      challenge: 'Two shoppers can add the final piece of a size to their bags at the same time. Checking stock at read time and deducting it at write time leaves a window where both orders succeed.',
      solution: 'Stock is only ever committed inside the create_order database transaction, which locks the relevant product_variants rows with SELECT ... FOR UPDATE, verifies availability and deducts in the same transaction. A failing condition rolls the whole order back rather than creating a half-formed record.' },
    { issue: 'Never trusting the client with money.', area: 'Order integrity',
      challenge: 'Cart totals travel through the browser, so any price, discount or shipping figure can be edited before the order request is sent.',
      solution: 'The RPC recomputes the subtotal from the database price of each variant and re-derives the discount and total on the server. The client-side total exists only to render the checkout summary.' },
    { issue: 'Returns that corrupt order history.', area: 'Domain modelling',
      challenge: 'Folding refunds into the order status column would overwrite the fulfilment story. A delivered order that is later returned would lose the fact that it was delivered.',
      solution: 'The return lifecycle is modelled as its own set of fields on the order (return_status, return_reason, return_pickup_date, return_refund_details) with six explicit stages kept separate from the seven order statuses. Order history stays intact while a return progresses independently.' },
    { issue: 'Saved addresses rewriting the past.', area: 'Data immutability',
      challenge: 'A customer editing a saved address would, with a foreign-key read, change what an old invoice appears to say.',
      solution: 'The order stores an immutable JSONB snapshot of the address at purchase time, along with snapshotted name, size, colour, price and image on each order_item. Later catalog or address edits cannot rewrite history.' },
    { issue: 'Invalid lifecycle jumps.', area: 'State machine',
      challenge: 'Order status spans support actions, courier updates and cancellation. Without a guard, a stale admin action or a retried request can move an order backwards.',
      solution: 'The enforce_order_state_transition trigger rejects invalid transitions in the database itself, so protection does not depend on every handler remembering the rule.' },
    { issue: 'A backend outage breaking the storefront.', area: 'Resilience',
      challenge: 'An unavailable database endpoint would otherwise take down catalog browsing and the admin dashboard at the same time.',
      solution: 'Two fallbacks: src/lib/products.ts serves a curated embedded catalog when Supabase is unreachable, and the admin console uses a dual-layer credential fallback with try/catch prefetching so a failure degrades the dashboard instead of throwing a rendering error.' },
    { issue: 'Two kinds of session in one application.', area: 'Authorization',
      challenge: 'The storefront and the admin console share a deployment. If a customer token could ever satisfy an admin check, the separation would exist only in the UI.',
      solution: 'Sessions are separated at the cookie level (sb-*-auth-token for customers, sb-admin-auth-token for admins) with separate browser and server client factories, and handlers authorise against is_admin on the profile rather than against anything the client claims.' },
    { issue: 'Serverless constraints on real integrations.', area: 'Infrastructure',
      challenge: 'Postal-code lookups and map geocoding are third-party calls that a browser cannot make directly without CORS problems and inconsistent latency.',
      solution: 'The India Post PIN endpoint is proxied through /api/pincode/[pin] with in-memory caching, and map tiles are lazy-loaded client-side, so no third-party endpoint is called from the page itself.' }
  ],

  future: {
    intro:
      'Everything in this section is planned work. It describes the product-recommendation system designed for Sūtra Atelier and the production hardening that is still outstanding. None of it is implemented in the repository today.',
    implementedToday: [
      'Editorial storefront with product discovery, categories and search.',
      'Customer accounts, profiles, up to five saved addresses and map-pin selection.',
      'Browser bag for guests, database-synced bag for signed-in customers, and wishlist.',
      'Atomic order creation with pessimistic stock locking and server-recomputed pricing.',
      'Razorpay order creation, HMAC signature verification and webhook handling, plus COD.',
      'Seven-state order lifecycle with enforced transitions, and a separate six-stage return workflow.',
      'GST invoice PDF generation, public catalog API, coupon validation and PIN code validation.',
      'Row Level Security policies, admin-only storage writes and secret hygiene.'
    ],
    hardeningPending: [
      'Server-validated authorization on every administrative handler, verified end to end.',
      'Audit logging of administrative actions.',
      'Transactional email and SMS order notifications.',
      'Transactional stock restoration and refund workflows with idempotency.',
      'Customer address and order privacy review under India\'s DPDP Act, including consent for behaviour tracking.'
    ],
    recommendationSystem: {
      title: 'Product recommendation system',
      strategy:
        'The first release uses product data only — similar pieces and "complete the look" — so it works before there is meaningful purchase history. Personalisation comes later, only once there is enough data to justify it. Everything runs on the existing Next.js and Supabase stack, with no new servers to start.',
      alreadyAvailable: [
        { component: 'Product catalog', have: 'Products with images, categories and prices', add: 'Consistent attributes such as fabric, weave, colour and occasion, because similarity depends on them' },
        { component: 'Sizes and stock', have: 'Variants with stock, locked during order creation', add: 'Reuse live stock to hide unavailable sizes in recommendations' },
        { component: 'Orders', have: 'Full order history', add: 'Co-purchase pairs, once there are enough orders' },
        { component: 'Returns', have: 'Six-step workflow, kept separate from orders', add: 'Return rate per product as a quality signal' },
        { component: 'Wishlist and bag', have: 'Guest bag in the browser, signed-in bag synced to the database', add: 'Use wishlist and bag adds as interest signals' },
        { component: 'Behaviour events', have: 'Not built', add: 'An events table for views, clicks and impressions, with an anonymous ID joined to the account at login' },
        { component: 'Similarity search', have: 'Supabase Postgres supports the pgvector extension', add: 'Enable it and store a product embedding per item' },
        { component: 'Fallback', have: 'Embedded catalog collection when the database is down', add: 'Reuse the same pattern for a curated fallback recommendation list' }
      ],
      placements: [
        { page: 'Product page', shows: 'Similar pieces', data: 'Product attributes and image embeddings', phase: 'Phase 2' },
        { page: 'Product page', shows: 'Complete the look', data: 'Admin-curated pairings, later co-purchase data', phase: 'Phase 1, then 3' },
        { page: 'Bag drawer', shows: 'Often bought together', data: 'Order history', phase: 'Phase 3' },
        { page: 'Home', shows: 'New arrivals and featured pieces, later "recommended for you"', data: 'Recency and popularity first, personal history later', phase: 'Phase 1, then 4' },
        { page: 'Category page', shows: 'Popular in this category', data: 'Views and purchases', phase: 'Phase 1' },
        { page: 'Email or WhatsApp (if added)', shows: 'Back-in-stock and re-order nudges', data: 'Wishlist plus shopper opt-in', phase: 'Phase 4' }
      ],
      howItWorks: [
        'Collect events. Log product views, wishlist adds, bag adds, purchases, and which recommendations were shown and where. Guests get an anonymous ID that is joined to their account on login.',
        'Build candidates. Gather pieces from three sources: similar products (embedding plus attribute match), pieces bought together, and new or popular items.',
        'Apply hard rules. Remove sold-out items and sizes, items already in the bag or already bought, and inactive products. Push down pieces with a high return rate.',
        'Rank. Start with a weighted SQL score (similarity, popularity, recency, return rate). Add a learned ranking model only once there is enough data to train one.',
        'Diversify and cap. Show four to eight pieces with a mix of categories and prices and no near-duplicates.',
        'Serve safely. A read-only API route returns the list with caching. If it fails or times out, the page shows the curated fallback.',
        'Measure. Track impressions, clicks and add-to-bag rate against a small holdout group that sees no recommendations.'
      ],
      constraints: [
        'Customer and admin sessions stay unchanged.',
        'Refund details such as UPI or bank accounts must never be used as a signal.',
        'Hard rules must be 100% accurate: no out-of-stock, wrong-size or already-purchased items in a recommendation row.'
      ]
    },

    proposedArchitecture: {
      summary:
        'The planned recommendation layer sits beside the existing commerce system without changing it. It reads the catalog, orders, returns, bag and wishlist that already exist, adds one events table and one vector index, and exposes a single read-only API route that the storefront can call or ignore.',
      components: [
        { n: '01', title: 'Behaviour collection', detail: 'A lightweight client tracker posts product views, clicks, wishlist adds, bag adds and purchases, plus an impression event for every recommendation shown including its source and position. Guests carry an anonymous ID that is joined to their account on login.' },
        { n: '02', title: 'Storage', detail: 'A new behaviour events table in the existing Supabase Postgres, alongside the current product catalog, orders and returns tables. No separate data warehouse is introduced at this scale.' },
        { n: '03', title: 'Feature preparation', detail: 'Scheduled SQL normalises events into interaction scores and product attribute vectors. Product attributes (fabric, weave, colour, occasion) are cleaned up first, because similarity quality depends on them.' },
        { n: '04', title: 'Similarity index', detail: 'The pgvector extension is enabled in Supabase and a product embedding is stored per item, giving similar-piece retrieval with no external vector service.' },
        { n: '05', title: 'Candidate generation', detail: 'Candidates come from three sources: embedding similarity plus attribute match, curated pairings (later co-purchase pairs), and new or popular items. Cold-start items and new visitors are covered by the product-based and curated sources.' },
        { n: '06', title: 'Ranking and rule filtering', detail: 'A weighted SQL score combines similarity, popularity, recency and return rate. Hard rules remove sold-out items and sizes, items already in the bag or already bought, and inactive products.' },
        { n: '07', title: 'Serving route', detail: 'One read-only, cached API route returns the diversified, capped list. It fails soft: on error or timeout the page renders a curated fallback list instead of an empty row.' },
        { n: '08', title: 'Measurement', detail: 'Impressions, clicks and add-to-bag rate are compared against a small holdout group that sees no recommendations, so lift is measured rather than assumed.' }
      ],
      diagram: {
        src: 'assets/diagrams/sutra-atelier-recommendation-architecture.svg',
        alt: 'Proposed recommendation architecture: behaviour collection, Supabase storage, feature preparation, pgvector index, candidate generation, ranking, serving route, measurement',
        caption: 'Proposed future architecture — planned work, not implemented today.'
      },
      boundaries: [
        'Customer and admin sessions are unchanged; the recommendation layer never touches session handling.',
        'Refund and payout data is out of scope and must never be a signal.',
        'Recommendations are additive: if the route is disabled, the storefront behaves exactly as it does today.'
      ]
    },

    roadmap: [
      { phase: 'Phase 0', title: 'Foundations', detail: 'Add the behaviour events table and anonymous ID, clean up product attributes (fabric, weave, colour, occasion), and let admins pair pieces for "complete the look".' },
      { phase: 'Phase 1', title: 'Rules and curation', detail: 'Ship new arrivals, popular-in-category and admin-curated pairings. This establishes the baseline that later phases must beat.' },
      { phase: 'Phase 2', title: 'Similar pieces', detail: 'Embed product images and descriptions, enable pgvector, and show similar pieces on the product page. Compare against the Phase 1 baseline before replacing it.' },
      { phase: 'Phase 3', title: 'Behaviour signals', detail: 'Add "often bought together" once there are enough orders, and use per-product return rate as a ranking signal.' },
      { phase: 'Phase 4', title: 'Personalisation', detail: 'Rank by each shopper\'s history and add opt-in back-in-stock messaging, but only if the data volume supports it.' },
      { phase: 'Phase 5', title: 'Production hardening', detail: 'Close the outstanding items: server-validated admin authorization, audit logging, transactional notifications, and transactional stock and refund handling.' }
    ],

    risks: [
      { risk: 'Data volume', detail: 'Behaviour-based recommendations need thousands of purchases to work well. The early phases deliberately lean on curation and product data so the feature is useful before that volume exists.' },
      { risk: 'Privacy', detail: 'Event tracking needs a clear consent notice under India\'s DPDP Act. Events stay pseudonymous and never include addresses, phone numbers or payment details.' },
      { risk: 'Build or buy', detail: 'Building inside Supabase keeps cost and stack simple. A hosted recommendation service is the alternative; the decision should wait until the Phase 1 baseline exists.' },
      { risk: 'Brand feel', detail: 'A few well-chosen pieces suit a luxury store better than endless carousels, so administrators need a way to pin or block items.' },
      { risk: 'Limited stock', detail: 'Limited-run pieces sell out, and recommending a sold-out item frustrates shoppers, so recommendations must always filter on live stock.' }
    ]
  },

  /* Ordered case-study outline. `kind` selects the renderer; `id` binds a
   * section to a workflow entry where one exists. */
  sections: [
    { id: 'overview',      kind: 'overview',     num: '01', label: 'Project overview' },
    { id: 'features',      kind: 'features',     num: '02', label: 'Feature walkthrough' },
    { id: 'stack',         kind: 'stack',        num: '03', label: 'Technology stack' },
    { id: 'architecture',  kind: 'architecture', num: '04', label: 'System architecture' },
    { id: 'database',      kind: 'database',     num: '05', label: 'Database design' },
    { id: 'auth',          kind: 'workflow',     num: '06' },
    { id: 'cart-checkout', kind: 'workflow',     num: '07' },
    { id: 'payments',      kind: 'workflow',     num: '08' },
    { id: 'security',      kind: 'security',     num: '09', label: 'Security' },
    { id: 'deployment',    kind: 'deployment',   num: '10', label: 'Deployment architecture' },
    { id: 'challenges',    kind: 'challenges',   num: '11', label: 'Technical challenges and solutions' },
    { id: 'future',        kind: 'future',       num: '12', label: 'Future improvements' },
    { id: 'proposed',      kind: 'proposed',     num: '13', label: 'Proposed future architecture' },
    { id: 'roadmap',       kind: 'roadmap',      num: '14', label: 'Roadmap' }
  ]
};
