export const FAQS = [
  {
    q: "How much does Earthlink charge for a consultation?",
    a: "The first consultation is free — 30 minutes, in person at our Harrow office, on WhatsApp video, or by phone. We only quote service fees once we've understood your profile and confirmed a country and pathway worth pursuing.",
  },
  {
    q: "Do you only work with students in the UK?",
    a: "No. Our office is in Harrow, London, but most of our consultations happen on WhatsApp and Zoom. We currently support students applying from 20+ countries to the UK, USA, Canada, Australia, Ireland, New Zealand, Europe, and the UAE.",
  },
  {
    q: "Will you guarantee my visa?",
    a: "No serious consultant can. What we do guarantee is that we won't file an application we believe will be refused. If your profile or finances aren't visa-ready, we'll tell you on day one and map a realistic 6–12 month plan.",
  },
  {
    q: "Can you help me find a scholarship?",
    a: "Yes — we shortlist university, country, and external scholarships you actually qualify for, then prepare the supporting essays and references with you. We don't promise scholarships; we promise applications strong enough to compete.",
  },
  {
    q: "I already have an offer letter. Can you handle just the visa?",
    a: "Yes. Standalone visa support is one of our most common services. We'll review your CAS/I-20/COE, financial evidence, SOP, and prep you for the credibility interview.",
  },
  {
    q: "Do you help with jobs after graduation?",
    a: "We work with UK sponsor-licensed employers across hospitality, care, IT, and logistics and help position your CV for the Skilled Worker route. We don't sell jobs — we open doors and prep you to walk through them.",
  },
  {
    q: "What about refunds if I change my mind?",
    a: "Our service agreement details refundable and non-refundable stages clearly before you pay anything. Government and university fees are never refundable; our professional fees are refundable up to defined milestones.",
  },
  {
    q: "How do I get started?",
    a: "Message us on WhatsApp or book a free consultation from the Contact page. We'll send a short profile form, then schedule a 30-minute call.",
  },
] as const;

export const SCHOLARSHIPS = [
  { country: "United Kingdom", name: "Chevening Scholarship", level: "Postgraduate", value: "Full tuition + stipend", deadline: "November" },
  { country: "United Kingdom", name: "Commonwealth Master's Scholarship", level: "Postgraduate", value: "Full tuition + stipend", deadline: "October" },
  { country: "United Kingdom", name: "University-specific merit awards", level: "UG & PG", value: "£2,000 – £10,000", deadline: "Varies" },
  { country: "USA", name: "Fulbright Foreign Student Program", level: "Postgraduate", value: "Full funding", deadline: "May–June" },
  { country: "USA", name: "University assistantships (TA/RA)", level: "Postgraduate", value: "Tuition + stipend", deadline: "Varies" },
  { country: "Canada", name: "Vanier Canada Graduate Scholarships", level: "Doctoral", value: "CAD 50,000/year", deadline: "November" },
  { country: "Canada", name: "Ontario Graduate Scholarship", level: "Postgraduate", value: "CAD 15,000", deadline: "Varies" },
  { country: "Australia", name: "Australia Awards", level: "UG & PG", value: "Full tuition + living", deadline: "April" },
  { country: "Australia", name: "Destination Australia", level: "UG & PG", value: "AUD 15,000/year", deadline: "Varies" },
  { country: "Ireland", name: "Government of Ireland International Scholarship", level: "UG & PG", value: "€10,000 + fee waiver", deadline: "March" },
  { country: "New Zealand", name: "Manaaki New Zealand Scholarship", level: "Postgraduate", value: "Full funding", deadline: "February" },
  { country: "Europe", name: "Erasmus Mundus Joint Masters", level: "Postgraduate", value: "Full tuition + €1,400/month", deadline: "January" },
  { country: "Europe", name: "DAAD Germany Scholarships", level: "Postgraduate", value: "€850–€1,200/month", deadline: "Varies" },
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
    intro: "Before you spend a rupee, dollar, or pound on applications, you should know whether you're competitive. A 60–90 minute structured review of your academics, English score, finances, work history, and goals.",
    benefits: [
      { title: "Stop applying blind", body: "Most refusals start with the wrong university list. We tell you which countries actually fit your profile." },
      { title: "Save application fees", body: "Skip £100–£200 application fees on universities you wouldn't get into — or wouldn't attend." },
      { title: "An honest verdict", body: "If you're not ready, we'll say so and map a 6-month plan instead of taking your money." },
    ],
    included: ["Transcript and grading-scale review", "English-test gap analysis (IELTS / PTE / TOEFL / Duolingo)", "Finance and proof-of-funds readiness check", "Career-goal alignment with realistic study routes", "Written summary with country recommendations"],
    deliverables: ["A 4–6 page written evaluation report", "Country-shortlist with reasoning", "Profile-gap checklist with deadlines", "Recommended intake (now vs. next)"],
    process: [
      { title: "Share your documents", body: "Transcripts, English score, CV, finances — uploaded securely before the call." },
      { title: "60–90 min structured call", body: "Walk through your profile against each country's bar with an adviser." },
      { title: "Written report in 48h", body: "You receive the evaluation as a PDF, not a verbal summary you'll forget." },
    ],
    outcomes: ["A short list of countries worth applying to", "A clear list of profile gaps to close in the next 3–6 months", "An honest 'apply now' or 'apply next intake' verdict"],
    timeline: "1 session + written report within 48 hours.",
    idealFor: ["Students 9–18 months from departure", "Anyone unsure between UK / Canada / Australia", "Re-applicants after a previous refusal"],
    faqs: [
      { q: "Is the evaluation refundable if you tell me to wait?", a: "Yes — if our verdict is 'apply next intake' and you choose not to proceed, the evaluation fee is fully refundable within 14 days." },
      { q: "Do I need IELTS before booking?", a: "No. We can evaluate without it and tell you what score you'll need." },
    ],
    related: ["career-counselling", "university-shortlisting", "financial-planning"],
  },
  "career-counselling": {
    intro: "Most students pick a course because a cousin did it. We use structured tools and labour-market data to match your strengths to study routes that hold up five years from now.",
    benefits: [
      { title: "Defend your choice", body: "Walk into your SOP and visa interview able to explain exactly why this course." },
      { title: "Look past today's hype", body: "We use 5-year salary and PR-pathway data, not whatever's trending on LinkedIn." },
      { title: "Have a Plan B", body: "Two backup subject areas, not just one risky bet." },
    ],
    included: ["Strengths and aptitude conversation", "Industry-by-industry graduate-outcomes review", "Salary, post-study work, and PR pathway comparison", "Backup-plan mapping (Plan B and Plan C courses)"],
    deliverables: ["Career-fit report (PDF)", "Three subject areas ranked", "Salary and PR data per country", "SOP narrative outline"],
    process: [
      { title: "Aptitude conversation", body: "60-minute structured discussion — no online quiz substitutes for it." },
      { title: "Labour-market matching", body: "We pull 3–5 year outcome data for your candidate fields." },
      { title: "Recommendation session", body: "We present three subject areas with trade-offs explained." },
    ],
    outcomes: ["A defensible reason for the course you pick", "Three viable subject areas in priority order", "Confidence in your SOP narrative"],
    timeline: "1–2 sessions over a week.",
    idealFor: ["School-leavers undecided on degree", "Working professionals planning a pivot", "Parents pushing one course, student preferring another"],
    faqs: [
      { q: "Can I do this without choosing a country first?", a: "Yes — we'll show how each subject performs across all eight of our destinations." },
      { q: "Do you use psychometric tests?", a: "We use them as one input, not the verdict. Conversation does most of the work." },
    ],
    related: ["profile-evaluation", "university-shortlisting", "admission-assistance"],
  },
  "university-shortlisting": {
    intro: "We don't hand you a list of 25 universities. We hand you six to eight, each with a reason — fit, fee, ranking, city cost, graduate-route eligibility, and your real chance of admission.",
    benefits: [
      { title: "Six to eight, not twenty-five", body: "A focused list you'll actually apply to and accept — no decision paralysis." },
      { title: "Built on real chance of admission", body: "Ambitious / target / safe split based on your actual numbers, not wishful thinking." },
      { title: "Graduate-outcome data", body: "We show what graduates earn and which universities sponsor post-study visas." },
    ],
    included: ["Ambitious / target / safe split", "Cost-of-living and tuition comparison", "Graduate outcomes and employability data", "Post-study work and PR pathway notes", "City-by-city quality-of-life notes from current students"],
    deliverables: ["6–8 university shortlist with reasoning per pick", "Side-by-side fees and city-cost table", "Application-deadline calendar", "Direct contacts at our partner universities where available"],
    process: [
      { title: "Brief us on your priorities", body: "Budget, ranking weight, city preference, PR intent — we record it all." },
      { title: "Shortlist drafted", body: "We propose 8–10 candidates with reasoning before narrowing to six." },
      { title: "Final review with you", body: "You approve the final list before any application opens." },
    ],
    outcomes: ["A shortlist you can defend to your family", "No wasted application fees on universities you wouldn't attend"],
    timeline: "3–5 working days.",
    idealFor: ["Students with English scores in hand", "Applicants juggling 2–3 countries", "Anyone whose family expects a 'top 100' justification"],
    faqs: [
      { q: "Can I add universities I researched myself?", a: "Absolutely — bring them in and we'll evaluate them against the same criteria." },
      { q: "Do you only recommend partner universities?", a: "No. We recommend the best fit, partner or not. Partner status only helps with faster turnaround and occasional fee waivers." },
    ],
    related: ["profile-evaluation", "admission-assistance", "financial-planning"],
  },
  "admission-assistance": {
    intro: "SOPs that don't sound AI-written. LORs that say what universities actually want to read. A CV in the format admissions teams expect.",
    benefits: [
      { title: "One coherent narrative", body: "Your SOP, CV, and LORs all tell the same story — not three contradicting drafts." },
      { title: "Region-correct formats", body: "UK personal statement, US essays, Canadian academic CV — each in the right shape." },
      { title: "Deadline tracking", body: "We manage portals so you don't miss a January deadline because of a forgotten password." },
    ],
    included: ["SOP drafting and editing (up to 3 rounds)", "Up to 3 LOR templates and reviewer guidance", "Academic CV in the right regional format", "Application-form completion and portal management", "Deadline tracking across all chosen universities"],
    deliverables: ["Final SOP per university (tailored, not copy-paste)", "Three LOR drafts ready for your referees", "Academic CV in PDF + editable format", "Submitted applications with portal logins documented"],
    process: [
      { title: "Story-mining interview", body: "We extract the genuine narrative — career arc, motivation, fit per university." },
      { title: "Draft + 3 review rounds", body: "We write a draft, you edit, we tighten — three rounds before submission." },
      { title: "Submit and confirm", body: "We submit, screenshot the confirmation, and add it to your deadline tracker." },
    ],
    outcomes: ["A coherent application narrative across every university", "Offers from the majority of your target list"],
    timeline: "2–4 weeks per university batch.",
    idealFor: ["Students with a shortlist ready", "Working professionals short on writing time", "Anyone who's drafted an SOP and isn't sure if it lands"],
    faqs: [
      { q: "Will you write my SOP for me?", a: "We draft based on your interview, then refine with you. We won't fabricate experiences or write something you can't defend in a visa interview." },
      { q: "How many universities can you handle at once?", a: "Up to eight per batch. Beyond that we'd push back — it usually means the shortlist isn't focused enough." },
    ],
    related: ["university-shortlisting", "documentation", "student-visa"],
  },
  "documentation": {
    intro: "The least glamorous service and the one that causes 70% of refusals when done badly. We check, certify, and submit every document the right way.",
    benefits: [
      { title: "No 'missing document' refusals", body: "We file a checklist tailored to your country and verify each item before submission." },
      { title: "Translation and notarisation handled", body: "We coordinate certified translators and UK-recognised notaries directly." },
      { title: "Audit trail you can prove", body: "Every document version is dated, signed off, and stored in your case file." },
    ],
    included: ["Academic transcript and degree verification", "Bank statements and proof of funds", "Sponsor letters and affidavits", "Translations and notarisation guidance", "Document checklist tailored to each visa route"],
    deliverables: ["Country-specific document checklist", "Certified translations of academic records", "Notarised sponsor affidavits", "Final submission pack indexed and labelled"],
    process: [
      { title: "Document audit", body: "Send what you have — we list what's missing or non-compliant." },
      { title: "Certification & translation", body: "We coordinate with translators and notaries directly; you sign once." },
      { title: "Final pack assembled", body: "Indexed, sequenced, and ready for portal or VFS upload." },
    ],
    outcomes: ["No 'missing document' refusals", "Submission-ready packs the first time"],
    timeline: "1–3 weeks depending on country.",
    idealFor: ["Self-funded applicants", "Sponsored students with complex affidavits", "Applicants with gaps or non-English transcripts"],
    faqs: [
      { q: "Do you provide notarisation in-house?", a: "We coordinate with UK-recognised notaries via our partner Stonebridge Legal — you don't book separately." },
      { q: "What if my university requires WES evaluation?", a: "We handle the WES, IQAS, or ECA process end-to-end for Canadian and US applications." },
    ],
    related: ["student-visa", "admission-assistance", "financial-planning"],
  },
  "financial-planning": {
    intro: "Real numbers, not glossy brochures. Tuition, halls, food, transport, scholarships, education loans, and exactly how much you need in the bank for the visa.",
    benefits: [
      { title: "Visa-grade proof of funds", body: "Structured to UKVI / USCIS / IRCC rules so finances aren't your refusal reason." },
      { title: "No hidden costs", body: "Year-1 and year-2 budgets with halls, food, transport, insurance — not just tuition." },
      { title: "Scholarship & loan guidance", body: "We shortlist what you actually qualify for and refer to loan advisers we don't take commission from." },
    ],
    included: ["Country and city cost-of-living breakdown", "Scholarship shortlisting", "Education loan adviser referrals (no commission accepted)", "Proof-of-funds structuring for visa compliance"],
    deliverables: ["Annual budget spreadsheet (editable)", "Scholarship shortlist with deadlines", "Proof-of-funds structuring memo", "Loan-adviser referral list"],
    process: [
      { title: "Numbers session", body: "We map your current funds, sponsors, and gap to the target country." },
      { title: "Scholarship & loan strategy", body: "Shortlists by deadline; loan referrals only where needed." },
      { title: "Proof-of-funds structuring", body: "We structure deposits and statements to match visa-rule windows." },
    ],
    outcomes: ["A realistic year-1 and year-2 budget", "Visa-grade proof of funds with no surprises"],
    timeline: "1 session + 1 week of structuring.",
    idealFor: ["Self-funded students", "Families using a mix of savings and loan", "Applicants whose finances were questioned in a prior refusal"],
    faqs: [
      { q: "Do you sell education loans?", a: "No — we refer to vetted advisers and accept zero commission. You pick the loan on your terms." },
      { q: "Will you help if my parents are sponsors?", a: "Yes — sponsor affidavits, income proofs, and relationship documents are part of the structuring work." },
    ],
    related: ["documentation", "student-visa", "profile-evaluation"],
  },
  "student-visa": {
    intro: "Visa support that takes refusal-rate data seriously. We file when you're ready, not when you're impatient.",
    benefits: [
      { title: "Refusal-rate awareness", body: "We won't file an application we think will be refused — and we tell you why before you pay." },
      { title: "Mock credibility interview", body: "Recorded, reviewed, and rerun until you're calm and consistent on camera." },
      { title: "Documented reasoning", body: "Every claim in your application has supporting evidence indexed alongside it." },
    ],
    included: ["CAS / I-20 / COE / LoA review", "DS-160 / UKVI / IRCC / VFS form completion", "SOP and personal statement for visa officer", "Financial evidence structuring", "Mock credibility interview (US, UK, Canada, Australia)"],
    deliverables: ["Visa application pack indexed for the officer", "Personal statement for the visa file (separate from university SOP)", "Mock interview recording with notes", "Submission confirmation + tracking ID"],
    process: [
      { title: "Offer & financial review", body: "We confirm CAS/I-20/COE accuracy and check finances against visa rules." },
      { title: "Forms, evidence, statement", body: "We draft your visa-officer-facing statement and complete every form with you." },
      { title: "Mock interview", body: "Recorded credibility interview before biometrics, with feedback rounds." },
    ],
    outcomes: ["High first-attempt approval rate", "Documented reasoning for every claim in your application"],
    timeline: "3–8 weeks from CAS to visa stamp.",
    idealFor: ["Students with offer in hand", "Re-applicants after refusal (we'll review the refusal letter first)", "Anyone interviewing for US F-1 or UK credibility"],
    faqs: [
      { q: "What's your visa success rate?", a: "Above 95% on applications we choose to file. We measure that honestly because we decline files we don't think we can win." },
      { q: "Will you take a case after a refusal?", a: "Yes — we review the refusal letter first and tell you if a fresh application is worth it." },
    ],
    related: ["documentation", "financial-planning", "pre-departure"],
  },
  "visit-visa": {
    intro: "Visitor visas for graduations, family visits, university tours, and short courses — Schengen, UK, US B1/B2, Canada TRV.",
    benefits: [
      { title: "Strong ties-to-home evidence", body: "The #1 refusal reason for visitor visas — we build the file to address it directly." },
      { title: "Cover letter to the officer", body: "Plain-English explanation of purpose, sponsor, and return — no jargon, no fluff." },
      { title: "Biometrics scheduled for you", body: "VFS slots booked in your preferred city, not whatever's left." },
    ],
    included: ["Invitation letter and itinerary support", "Financial and ties-to-home-country evidence", "Form-filling and biometric scheduling", "Cover letter to visa officer"],
    deliverables: ["Final application pack (digital + print)", "Officer-facing cover letter", "Booked biometric appointment", "Travel itinerary and hotel/host details"],
    process: [
      { title: "Purpose & sponsor confirmed", body: "Visit reason, host, dates, and funder mapped before paperwork." },
      { title: "Evidence pack built", body: "Finances, employment, family ties, and itinerary assembled in order." },
      { title: "Submit and track", body: "We file, schedule biometrics, and track decision turnaround." },
    ],
    outcomes: ["Strong, complete applications with the lowest refusal risk"],
    timeline: "2–6 weeks depending on consulate.",
    idealFor: ["Parents attending graduation", "Family planning a UK / EU / US visit", "Working professionals attending conferences"],
    faqs: [
      { q: "Can you guarantee approval?", a: "No serious adviser can — visit visa decisions are at officer discretion. We make sure the application gives them no reason to refuse." },
      { q: "Do you cover Schengen?", a: "Yes — France, Germany, Netherlands, Italy, Spain handled most often." },
    ],
    related: ["documentation", "student-visa", "pre-departure"],
  },
  "recruitment": {
    intro: "Skilled-worker routes and UK sponsor-licensed employer matching across hospitality, care, IT, logistics, and construction.",
    benefits: [
      { title: "Sponsor-licensed employers only", body: "We work with employers verified on the UK Home Office sponsor register — no grey-market 'job packages'." },
      { title: "CV positioned for sponsorship", body: "Re-written to match the Skilled Worker SOC code and salary thresholds." },
      { title: "Interview coaching", body: "Sector-specific mock interviews — care, IT, hospitality, logistics, construction." },
    ],
    included: ["CV positioning for sponsor-licensed roles", "Sponsor employer shortlisting", "Skilled Worker visa preparation", "Interview coaching", "Relocation and settlement support"],
    deliverables: ["Sponsor-route CV (UK format)", "Shortlist of 5–10 sponsor-licensed employers per cycle", "Skilled Worker visa application pack", "Relocation and first-week-in-UK plan"],
    process: [
      { title: "Eligibility & SOC mapping", body: "We map your experience to a Skilled Worker SOC code and salary band." },
      { title: "Employer outreach", body: "Targeted outreach to vetted sponsor-licensed employers, never a CV blast." },
      { title: "Offer to visa to landing", body: "Once you have an offer, we run the CoS, visa, and relocation." },
    ],
    outcomes: ["A genuine shot at a sponsored offer, not a paid 'job package'"],
    timeline: "3–9 months, profile-dependent.",
    idealFor: ["Care workers and senior carers", "IT professionals 2+ years experience", "Hospitality, logistics, and construction skilled trades"],
    faqs: [
      { q: "Do you guarantee a job offer?", a: "No. Anyone guaranteeing a UK sponsored offer for a fee is selling something illegal. We position and introduce — employers decide." },
      { q: "Do you charge employers a finder's fee?", a: "No. We're paid by the candidate, transparently, and never take side payments from employers." },
    ],
    related: ["documentation", "student-visa", "pre-departure"],
  },
  "pre-departure": {
    intro: "A first-week-abroad briefing so nothing catches you off guard at the airport, the bank, or the halls reception.",
    benefits: [
      { title: "Land knowing what to do", body: "Airport pickup, SIM, transport card, bank appointment — all sorted before you fly." },
      { title: "Accommodation that's real", body: "We verify university halls and private housing — no off-platform scams." },
      { title: "Forex without the markup", body: "Card vs. cash strategy that doesn't leave 4% on the table to airport bureaus." },
    ],
    included: ["University accommodation guidance", "Private student housing options", "Airport pickup coordination", "UK / international SIM and banking setup", "Packing list and forex guidance", "First-week-abroad checklist"],
    deliverables: ["First-week-abroad checklist (PDF)", "Confirmed accommodation booking", "Airport pickup confirmation", "Forex and banking plan"],
    process: [
      { title: "T-4 weeks briefing", body: "60-min session covering accommodation, forex, SIM, transport, weather, food." },
      { title: "Bookings confirmed", body: "Accommodation deposit, pickup, SIM activation date locked in." },
      { title: "Landing-day support", body: "WhatsApp adviser on-call during your travel and first 48 hours." },
    ],
    outcomes: ["You land knowing what to do for the next seven days"],
    timeline: "Final 4 weeks before departure.",
    idealFor: ["First-time international flyers", "Students arriving outside university welcome week", "Anyone landing without a host or relative in-country"],
    faqs: [
      { q: "Is airport pickup included or extra?", a: "Coordination is included; the driver cost (usually £40–£70 in the UK) is paid directly to the vendor." },
      { q: "Will you help with my bank account after I land?", a: "Yes — we stay on WhatsApp through your first month, including bank, NI/SIN number, and GP registration." },
    ],
    related: ["student-visa", "documentation", "financial-planning"],
  },
};

