export const FAQS = [
  {
    q: "How much does Earthlink charge for a consultation?",
    a: "The first consultation is free — 30 minutes, in person at our Harrow office, on WhatsApp video, or by phone. We only quote service fees once we've understood your profile and confirmed a country and pathway worth pursuing.",
  },
  {
    q: "Do you only work with students in the UK?",
    a: "No. Our office is in Harrow, London, but most consultations happen on WhatsApp and Zoom. We serve applicants in 120+ countries worldwide; the UK, USA, Canada, Australia, Ireland, New Zealand, Malta, Europe, and the UAE are our featured study destinations.",
  },
  {
    q: "Will you guarantee my visa?",
    a: "No serious adviser can guarantee a decision. Earthlink supports non-UK routes within scope and explains readiness concerns; Stonebridge alone advises on, prepares, and submits every UK immigration application.",
  },
  {
    q: "Can you help me find a scholarship?",
    a: "Yes — we shortlist university, country, and external scholarships you actually qualify for, then prepare the supporting essays and references with you. We don't promise scholarships; we promise applications strong enough to compete.",
  },
  {
    q: "I already have an offer letter. Can you handle just the visa?",
    a: "Yes, subject to the destination. Earthlink supports non-UK visa preparation. For every UK visa route, advice and application work are handled only by Stonebridge Legal Solutions under their own engagement.",
  },
  {
    q: "Do you help with jobs after graduation?",
    a: "Yes. We help jobseekers identify suitable employers, improve their CV, organise applications, and prepare for interviews. We do not procure sponsorship, sell jobs, arrange sponsor licences, or guarantee an offer.",
  },
  {
    q: "What about refunds if I change my mind?",
    a: "Your service agreement explains fees, cancellation and refund arrangements before you pay. Those terms do not remove any cancellation or refund right that applies under consumer law.",
  },
  {
    q: "How do I get started?",
    a: "Message us on WhatsApp or book a free consultation from the Contact page. We'll send a short profile form, then schedule a 30-minute call.",
  },
] as const;

export const SCHOLARSHIPS = [
  {
    country: "United Kingdom",
    name: "Chevening Scholarship",
    level: "Postgraduate",
    value: "Full tuition + stipend",
    deadline: "November",
  },
  {
    country: "United Kingdom",
    name: "Commonwealth Master's Scholarship",
    level: "Postgraduate",
    value: "Full tuition + stipend",
    deadline: "October",
  },
  {
    country: "United Kingdom",
    name: "University-specific merit awards",
    level: "UG & PG",
    value: "Amount varies by institution",
    deadline: "Varies",
  },
  {
    country: "USA",
    name: "Fulbright Foreign Student Program",
    level: "Postgraduate",
    value: "Full funding",
    deadline: "May–June",
  },
  {
    country: "USA",
    name: "University assistantships (TA/RA)",
    level: "Postgraduate",
    value: "Tuition + stipend",
    deadline: "Varies",
  },
  {
    country: "Canada",
    name: "Vanier Canada Graduate Scholarships",
    level: "Doctoral",
    value: "Check the live award page",
    deadline: "November",
  },
  {
    country: "Canada",
    name: "Ontario Graduate Scholarship",
    level: "Postgraduate",
    value: "Check the live award page",
    deadline: "Varies",
  },
  {
    country: "Australia",
    name: "Australia Awards",
    level: "UG & PG",
    value: "Full tuition + living",
    deadline: "April",
  },
  {
    country: "Australia",
    name: "Destination Australia",
    level: "UG & PG",
    value: "Check the live award page",
    deadline: "Varies",
  },
  {
    country: "Ireland",
    name: "Government of Ireland International Scholarship",
    level: "UG & PG",
    value: "Funding and fee support",
    deadline: "March",
  },
  {
    country: "New Zealand",
    name: "Manaaki New Zealand Scholarship",
    level: "Postgraduate",
    value: "Full funding",
    deadline: "February",
  },
  {
    country: "Europe",
    name: "Erasmus Mundus Joint Masters",
    level: "Postgraduate",
    value: "Full funding where awarded",
    deadline: "January",
  },
  {
    country: "Europe",
    name: "DAAD Germany Scholarships",
    level: "Postgraduate",
    value: "Programme-specific support",
    deadline: "Varies",
  },
] as const;

export type ServiceDetail = {
  intro: string;
  benefits: { title: string; body: string }[];
  included: string[];
  deliverables: string[];
  process: { title: string; body: string }[];
  outcomes: string[];
  timeline: string;
  idealFor: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "profile-evaluation": {
    intro:
      "Before you spend a rupee, dollar, or pound on applications, you should know whether you're competitive. A 60–90 minute structured review of your academics, English score, finances, work history, and goals.",
    benefits: [
      {
        title: "Stop applying blind",
        body: "Most refusals start with the wrong university list. We tell you which countries actually fit your profile.",
      },
      {
        title: "Save application fees",
        body: "Avoid paying application charges for universities that do not fit your profile or goals.",
      },
      {
        title: "An honest verdict",
        body: "If you're not ready, we'll say so and map a 6-month plan instead of taking your money.",
      },
    ],
    included: [
      "Transcript and grading-scale review",
      "English-test gap analysis (IELTS / PTE / TOEFL / Duolingo)",
      "Finance and proof-of-funds readiness check",
      "Career-goal alignment with realistic study routes",
      "Written summary with country recommendations",
    ],
    deliverables: [
      "A 4–6 page written evaluation report",
      "Country-shortlist with reasoning",
      "Profile-gap checklist with deadlines",
      "Recommended intake (now vs. next)",
    ],
    process: [
      {
        title: "Share your documents",
        body: "Transcripts, English score, CV, finances — uploaded securely before the call.",
      },
      {
        title: "60–90 min structured call",
        body: "Walk through your profile against each country's bar with an adviser.",
      },
      {
        title: "Written report in 48h",
        body: "You receive the evaluation as a PDF, not a verbal summary you'll forget.",
      },
    ],
    outcomes: [
      "A short list of countries worth applying to",
      "A clear list of profile gaps to close in the next 3–6 months",
      "An honest 'apply now' or 'apply next intake' verdict",
    ],
    timeline: "1 session + written report within 48 hours.",
    idealFor: [
      "Students 9–18 months from departure",
      "Anyone unsure between UK / Canada / Australia",
      "Re-applicants after a previous refusal",
    ],
    faqs: [
      {
        q: "Is the evaluation refundable if you tell me to wait?",
        a: "Yes — if our verdict is 'apply next intake' and you choose not to proceed, the evaluation fee is fully refundable within 14 days.",
      },
      {
        q: "Do I need IELTS before booking?",
        a: "No. We can evaluate without it and tell you what score you'll need.",
      },
    ],
    related: ["career-counselling", "university-shortlisting", "financial-planning"],
  },
  "career-counselling": {
    intro:
      "Most students pick a course because a cousin did it. We use structured tools and labour-market data to match your strengths to study routes that hold up five years from now.",
    benefits: [
      {
        title: "Defend your choice",
        body: "Walk into your SOP and visa interview able to explain exactly why this course.",
      },
      {
        title: "Look past today's hype",
        body: "We use 5-year salary and PR-pathway data, not whatever's trending on LinkedIn.",
      },
      { title: "Have a Plan B", body: "Two backup subject areas, not just one risky bet." },
    ],
    included: [
      "Strengths and aptitude conversation",
      "Industry-by-industry graduate-outcomes review",
      "Salary, post-study work, and PR pathway comparison",
      "Backup-plan mapping (Plan B and Plan C courses)",
    ],
    deliverables: [
      "Career-fit report (PDF)",
      "Three subject areas ranked",
      "Salary and PR data per country",
      "SOP narrative outline",
    ],
    process: [
      {
        title: "Aptitude conversation",
        body: "60-minute structured discussion — no online quiz substitutes for it.",
      },
      {
        title: "Labour-market matching",
        body: "We pull 3–5 year outcome data for your candidate fields.",
      },
      {
        title: "Recommendation session",
        body: "We present three subject areas with trade-offs explained.",
      },
    ],
    outcomes: [
      "A defensible reason for the course you pick",
      "Three viable subject areas in priority order",
      "Confidence in your SOP narrative",
    ],
    timeline: "1–2 sessions over a week.",
    idealFor: [
      "School-leavers undecided on degree",
      "Working professionals planning a pivot",
      "Parents pushing one course, student preferring another",
    ],
    faqs: [
      {
        q: "Can I do this without choosing a country first?",
        a: "Yes — we'll compare each subject across relevant markets, including our featured study destinations and wider worldwide coverage.",
      },
      {
        q: "Do you use psychometric tests?",
        a: "We use them as one input, not the verdict. Conversation does most of the work.",
      },
    ],
    related: ["profile-evaluation", "university-shortlisting", "admission-assistance"],
  },
  "university-shortlisting": {
    intro:
      "We don't hand you a list of 25 universities. We hand you six to eight, each with a reason — fit, fee, ranking, city cost, graduate-route eligibility, and your real chance of admission.",
    benefits: [
      {
        title: "Six to eight, not twenty-five",
        body: "A focused list you'll actually apply to and accept — no decision paralysis.",
      },
      {
        title: "Built on real chance of admission",
        body: "Ambitious / target / safe split based on your actual numbers, not wishful thinking.",
      },
      {
        title: "Graduate-outcome data",
        body: "We compare published graduate outcomes and destination-specific post-study options.",
      },
    ],
    included: [
      "Ambitious / target / safe split",
      "Cost-of-living and tuition comparison",
      "Graduate outcomes and employability data",
      "Post-study work and PR pathway notes",
      "City-by-city quality-of-life notes from current students",
    ],
    deliverables: [
      "6–8 university shortlist with reasoning per pick",
      "Side-by-side fees and city-cost table",
      "Application-deadline calendar",
      "Official application route and contact details for each university",
    ],
    process: [
      {
        title: "Brief us on your priorities",
        body: "Budget, ranking weight, city preference, PR intent — we record it all.",
      },
      {
        title: "Shortlist drafted",
        body: "We propose 8–10 candidates with reasoning before narrowing to six.",
      },
      {
        title: "Final review with you",
        body: "You approve the final list before any application opens.",
      },
    ],
    outcomes: [
      "A shortlist you can defend to your family",
      "No wasted application fees on universities you wouldn't attend",
    ],
    timeline: "3–5 working days.",
    idealFor: [
      "Students with English scores in hand",
      "Applicants juggling 2–3 countries",
      "Anyone whose family expects a 'top 100' justification",
    ],
    faqs: [
      {
        q: "Can I add universities I researched myself?",
        a: "Absolutely — bring them in and we'll evaluate them against the same criteria.",
      },
      {
        q: "Do you only recommend universities that work with agents?",
        a: "No. We recommend universities based on course fit, entry requirements, budget, location, and the applicant's goals.",
      },
    ],
    related: ["profile-evaluation", "admission-assistance", "financial-planning"],
  },
  "admission-assistance": {
    intro:
      "SOPs that don't sound AI-written. LORs that say what universities actually want to read. A CV in the format admissions teams expect.",
    benefits: [
      {
        title: "One coherent narrative",
        body: "Your SOP, CV, and LORs all tell the same story — not three contradicting drafts.",
      },
      {
        title: "Region-correct formats",
        body: "UK personal statement, US essays, Canadian academic CV — each in the right shape.",
      },
      {
        title: "Deadline tracking",
        body: "We manage portals so you don't miss a January deadline because of a forgotten password.",
      },
    ],
    included: [
      "SOP drafting and editing (up to 3 rounds)",
      "Up to 3 LOR templates and reviewer guidance",
      "Academic CV in the right regional format",
      "Application-form preparation and portal guidance",
      "Deadline tracking across all chosen universities",
    ],
    deliverables: [
      "Final SOP per university (tailored, not copy-paste)",
      "Three LOR drafts ready for your referees",
      "Academic CV in PDF + editable format",
      "Application tracker and submission evidence documented",
    ],
    process: [
      {
        title: "Story-mining interview",
        body: "We extract the genuine narrative — career arc, motivation, fit per university.",
      },
      {
        title: "Draft + 3 review rounds",
        body: "We write a draft, you edit, we tighten — three rounds before submission.",
      },
      {
        title: "Submit and confirm",
        body: "We follow the university's official process. Where direct submission is required, you submit personally; we record the confirmation in your tracker.",
      },
    ],
    outcomes: [
      "A coherent application narrative across every university",
      "Offers from the majority of your target list",
    ],
    timeline: "2–4 weeks per university batch.",
    idealFor: [
      "Students with a shortlist ready",
      "Working professionals short on writing time",
      "Anyone who's drafted an SOP and isn't sure if it lands",
    ],
    faqs: [
      {
        q: "Will you write my SOP for me?",
        a: "We draft based on your interview, then refine with you. We won't fabricate experiences or write something you can't defend in a visa interview.",
      },
      {
        q: "How many universities can you handle at once?",
        a: "Up to eight per batch. Beyond that we'd push back — it usually means the shortlist isn't focused enough.",
      },
      {
        q: "Can I get university admission help in Harrow or online?",
        a: "Yes. You can meet us in Harrow or complete the same application-support process by phone, WhatsApp, and video from anywhere in the world.",
      },
    ],
    related: ["university-shortlisting", "documentation", "student-visa"],
  },
  documentation: {
    intro:
      "The least glamorous service and the one that causes 70% of refusals when done badly. We check, certify, and submit every document the right way.",
    benefits: [
      {
        title: "No 'missing document' refusals",
        body: "We file a checklist tailored to your country and verify each item before submission.",
      },
      {
        title: "Translation and notarisation handled",
        body: "We coordinate certified translators and UK-recognised notaries directly.",
      },
      {
        title: "Audit trail you can prove",
        body: "Every document version is dated, signed off, and stored in your case file.",
      },
    ],
    included: [
      "Academic transcript and degree verification",
      "Bank statements and proof of funds",
      "Sponsor letters and affidavits",
      "Translations and notarisation guidance",
      "Document checklist tailored to each visa route",
    ],
    deliverables: [
      "Country-specific document checklist",
      "Certified translations of academic records",
      "Notarised sponsor affidavits",
      "Final submission pack indexed and labelled",
    ],
    process: [
      {
        title: "Document audit",
        body: "Send what you have — we list what's missing or non-compliant.",
      },
      {
        title: "Certification & translation",
        body: "We coordinate with translators and notaries directly; you sign once.",
      },
      {
        title: "Final pack assembled",
        body: "Indexed, sequenced, and ready for portal or VFS upload.",
      },
    ],
    outcomes: ["No 'missing document' refusals", "Submission-ready packs the first time"],
    timeline: "1–3 weeks depending on country.",
    idealFor: [
      "Self-funded applicants",
      "Sponsored students with complex affidavits",
      "Applicants with gaps or non-English transcripts",
    ],
    faqs: [
      {
        q: "Do you provide notarisation in-house?",
        a: "No. We explain the university's published document requirements and can introduce you to an appropriate independent provider. Any UK immigration document advice comes only from Stonebridge.",
      },
      {
        q: "What if my university requires WES evaluation?",
        a: "We handle the WES, IQAS, or ECA process end-to-end for Canadian and US applications.",
      },
    ],
    related: ["student-visa", "admission-assistance", "financial-planning"],
  },
  "financial-planning": {
    intro:
      "Real numbers, not glossy brochures. Tuition, halls, food, transport, scholarships, education loans, and exactly how much you need in the bank for the visa.",
    benefits: [
      {
        title: "Evidence planning",
        body: "We organise non-UK proof-of-funds evidence against published requirements; Stonebridge alone advises on UK immigration evidence.",
      },
      {
        title: "No hidden costs",
        body: "Year-1 and year-2 budgets with halls, food, transport, insurance — not just tuition.",
      },
      {
        title: "Scholarship & loan guidance",
        body: "We shortlist what you actually qualify for and refer to loan advisers we don't take commission from.",
      },
    ],
    included: [
      "Country and city cost-of-living breakdown",
      "Scholarship shortlisting",
      "Education loan adviser referrals (no commission accepted)",
      "Non-UK proof-of-funds preparation and UK referral to Stonebridge",
    ],
    deliverables: [
      "Annual budget spreadsheet (editable)",
      "Scholarship shortlist with deadlines",
      "Proof-of-funds structuring memo",
      "Loan-adviser referral list",
    ],
    process: [
      {
        title: "Numbers session",
        body: "We map your current funds, sponsors, and gap to the target country.",
      },
      {
        title: "Scholarship & loan strategy",
        body: "Shortlists by deadline; loan referrals only where needed.",
      },
      {
        title: "Proof-of-funds structuring",
        body: "We structure deposits and statements to match visa-rule windows.",
      },
    ],
    outcomes: [
      "A realistic year-1 and year-2 budget",
      "Visa-grade proof of funds with no surprises",
    ],
    timeline: "1 session + 1 week of structuring.",
    idealFor: [
      "Self-funded students",
      "Families using a mix of savings and loan",
      "Applicants whose finances were questioned in a prior refusal",
    ],
    faqs: [
      {
        q: "Do you sell education loans?",
        a: "No — we refer to vetted advisers and accept zero commission. You pick the loan on your terms.",
      },
      {
        q: "Will you help if my parents are sponsors?",
        a: "Yes — sponsor affidavits, income proofs, and relationship documents are part of the structuring work.",
      },
    ],
    related: ["documentation", "student-visa", "profile-evaluation"],
  },
  "student-visa": {
    intro:
      "Earthlink supports non-UK student-visa preparation and applications. Every UK immigration route, advice matter, form, and application is handled only by Stonebridge Legal Solutions.",
    benefits: [
      {
        title: "Destination-specific scope",
        body: "Earthlink supports non-UK routes; UK matters are referred to and owned by Stonebridge.",
      },
      {
        title: "Interview preparation",
        body: "For non-UK routes, practice is recorded and reviewed until you're calm and consistent.",
      },
      {
        title: "Organised evidence",
        body: "For non-UK routes, supporting documents are checked against the published checklist.",
      },
    ],
    included: [
      "I-20 / COE / LoA review for non-UK routes",
      "Non-UK form preparation and submission support",
      "Non-UK financial-evidence organisation",
      "Mock interview preparation for supported non-UK routes",
      "Direct referral to Stonebridge for every UK immigration matter",
    ],
    deliverables: [
      "Non-UK visa application pack",
      "Mock interview recording with notes where relevant",
      "Submission confirmation and tracking details",
      "Stonebridge handover for UK cases",
    ],
    process: [
      {
        title: "Confirm the destination",
        body: "We establish whether Earthlink can support the non-UK route or whether the UK matter must go straight to Stonebridge.",
      },
      {
        title: "Prepare the non-UK file",
        body: "For supported non-UK routes, forms and evidence are organised against official requirements.",
      },
      {
        title: "Submit or hand over",
        body: "Earthlink supports the non-UK submission; Stonebridge owns every UK advice and application step.",
      },
    ],
    outcomes: [
      "A clearly scoped, destination-appropriate application process",
      "A complete non-UK file or a documented UK handover to Stonebridge",
    ],
    timeline: "Varies by destination and official processing times.",
    idealFor: [
      "Students with an offer in hand",
      "Applicants preparing a supported non-UK route",
      "UK applicants who need a direct Stonebridge referral",
    ],
    faqs: [
      {
        q: "Who handles a UK Student visa?",
        a: "Stonebridge Legal Solutions alone provides the advice and handles the application. Earthlink may continue helping with the university admission side.",
      },
      {
        q: "Will you take a case after a refusal?",
        a: "For a UK refusal, Stonebridge reviews the matter directly. For supported non-UK routes, Earthlink first checks whether a fresh application is appropriate.",
      },
    ],
    related: ["documentation", "financial-planning", "pre-departure"],
  },
  "visit-visa": {
    intro:
      "Visitor and short-stay visa support for destinations worldwide. Every UK visitor route, advice matter, form, and application is handled only by Stonebridge Legal Solutions.",
    benefits: [
      {
        title: "Worldwide destination coverage",
        body: "Earthlink supports non-UK visitor routes; Stonebridge owns every UK visitor matter.",
      },
      {
        title: "Clear evidence preparation",
        body: "For non-UK routes, purpose, funding, itinerary, and return evidence are organised against official requirements.",
      },
      {
        title: "Application coordination",
        body: "For supported non-UK routes, forms, appointments, and tracking are coordinated with you.",
      },
    ],
    included: [
      "Invitation letter and itinerary support for non-UK routes",
      "Financial and ties-to-home-country evidence organisation",
      "Non-UK form and biometric coordination",
      "Direct Stonebridge referral for every UK visitor route",
    ],
    deliverables: [
      "Non-UK application pack",
      "Application cover note where permitted",
      "Appointment and tracking details",
      "Stonebridge handover for UK cases",
    ],
    process: [
      {
        title: "Purpose & sponsor confirmed",
        body: "Visit reason, host, dates, and funder mapped before paperwork.",
      },
      {
        title: "Evidence pack built",
        body: "Finances, employment, family ties, and itinerary assembled in order.",
      },
      {
        title: "Submit or hand over",
        body: "Earthlink supports the non-UK submission; Stonebridge owns every UK visitor advice and application step.",
      },
    ],
    outcomes: ["Strong, complete applications with the lowest refusal risk"],
    timeline: "2–6 weeks depending on consulate.",
    idealFor: [
      "Parents attending graduation",
      "Families planning an international visit",
      "Working professionals attending conferences",
    ],
    faqs: [
      {
        q: "Can you guarantee approval?",
        a: "No serious adviser can — visit visa decisions are at officer discretion. We make sure the application gives them no reason to refuse.",
      },
      {
        q: "Do you cover the UK and Schengen?",
        a: "Earthlink supports Schengen and other non-UK visitor routes. Stonebridge alone advises on and handles all UK visitor applications.",
      },
    ],
    related: ["documentation", "student-visa", "pre-departure"],
  },
  recruitment: {
    intro:
      "Practical job-search support for jobseekers who want to identify suitable employers, present their experience clearly, and prepare for interviews.",
    benefits: [
      {
        title: "Suitable-employer research",
        body: "We help you build a focused list based on your role, experience, location, and career goals.",
      },
      {
        title: "Clear CV positioning",
        body: "Your CV and profile are tailored to the jobs you are genuinely qualified to pursue.",
      },
      {
        title: "Interview coaching",
        body: "Role-specific practice helps you explain your experience with confidence.",
      },
    ],
    included: [
      "CV and professional-profile review",
      "Suitable-employer research",
      "Application planning",
      "Interview coaching",
      "Job-search organisation",
    ],
    deliverables: [
      "Role-targeted CV",
      "Suitable-employer shortlist",
      "Application tracker",
      "Interview preparation notes",
    ],
    process: [
      {
        title: "Profile and role review",
        body: "We identify suitable job families from your experience and stated goals.",
      },
      {
        title: "Employer research",
        body: "We help you find relevant employers and organise focused applications.",
      },
      {
        title: "Application and interview support",
        body: "We refine your CV, track applications, and practise interviews; employers make every hiring decision.",
      },
    ],
    outcomes: ["A focused employer list", "Stronger applications", "Better interview readiness"],
    timeline: "Profile- and market-dependent; no hiring timeline is guaranteed.",
    idealFor: [
      "Graduates entering the job market",
      "Professionals changing roles",
      "International jobseekers who need a structured search",
    ],
    faqs: [
      {
        q: "Do you guarantee a job offer?",
        a: "No. We help with research, applications, CV positioning, and interview preparation; employers alone decide whom to hire.",
      },
      {
        q: "Do you arrange sponsorship or sponsor licences?",
        a: "No. Earthlink does not procure sponsorship, arrange sponsor licences, sell jobs, or represent an employer in immigration matters.",
      },
    ],
    related: ["documentation", "student-visa", "pre-departure"],
  },
  "pre-departure": {
    intro:
      "A first-week-abroad briefing so nothing catches you off guard at the airport, the bank, or the halls reception.",
    benefits: [
      {
        title: "Land knowing what to do",
        body: "Airport pickup, SIM, transport card, bank appointment — all sorted before you fly.",
      },
      {
        title: "Accommodation that's real",
        body: "We verify university halls and private housing — no off-platform scams.",
      },
      {
        title: "Forex without the markup",
        body: "Card vs. cash strategy that doesn't leave 4% on the table to airport bureaus.",
      },
    ],
    included: [
      "University accommodation guidance",
      "Private student housing options",
      "Airport pickup coordination",
      "UK / international SIM and banking setup",
      "Packing list and forex guidance",
      "First-week-abroad checklist",
    ],
    deliverables: [
      "First-week-abroad checklist (PDF)",
      "Confirmed accommodation booking",
      "Airport pickup confirmation",
      "Forex and banking plan",
    ],
    process: [
      {
        title: "T-4 weeks briefing",
        body: "60-min session covering accommodation, forex, SIM, transport, weather, food.",
      },
      {
        title: "Bookings confirmed",
        body: "Accommodation deposit, pickup, SIM activation date locked in.",
      },
      {
        title: "Landing-day support",
        body: "WhatsApp adviser on-call during your travel and first 48 hours.",
      },
    ],
    outcomes: ["You land knowing what to do for the next seven days"],
    timeline: "Final 4 weeks before departure.",
    idealFor: [
      "First-time international flyers",
      "Students arriving outside university welcome week",
      "Anyone landing without a host or relative in-country",
    ],
    faqs: [
      {
        q: "Is airport pickup included or extra?",
        a: "Coordination is included. The driver quotes the current transport charge, which is paid directly to the vendor.",
      },
      {
        q: "Will you help with my bank account after I land?",
        a: "Yes — we stay on WhatsApp through your first month, including bank, NI/SIN number, and GP registration.",
      },
    ],
    related: ["student-visa", "documentation", "financial-planning"],
  },
};
