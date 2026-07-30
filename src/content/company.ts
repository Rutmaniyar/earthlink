export const COMPANY = {
  name: "Earthlink Consultants",
  legalName: "Earthlink Consultants LTD",
  tagline: "Dream it. Say it. Get it sorted.",
  email: "office@earthlink.org.uk",
  // Display formats
  phone: "+44 7721 069 814",           // International display (E.123 grouped)
  phoneDomestic: "07721 069 814",      // UK domestic display
  // Machine-readable (E.164, no spaces) — use for tel:, WhatsApp APIs, schema.org
  phoneHref: "+447721069814",
  whatsapp: "447721069814",
  address: {
    line1: "Unit 1, 2 Fitzgerald House",
    line2: "Willowcourt Avenue",
    city: "Harrow",
    postcode: "HA3 8ES",
    country: "United Kingdom",
  },
  solicitors: {
    name: "Stonebridge Legal Solutions",
    line1: "64 Boardman House",
    city: "London",
    postcode: "E15 1NT",
  },
  rating: { score: 4.9, reviews: 398 },
  founded: 2018,
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/destinations", label: "Destinations" },
  { to: "/partner-universities", label: "Universities" },
  { to: "/partners/stonebridge", label: "Solicitor Partner" },
  
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  { slug: "profile-evaluation", title: "Profile Evaluation", icon: "ClipboardCheck", blurb: "An honest read of your academic record, finances, and goals before we recommend a single university." },
  { slug: "career-counselling", title: "Career Counselling", icon: "Compass", blurb: "Map your strengths to study routes and careers that actually pay off long-term." },
  { slug: "university-shortlisting", title: "University Shortlisting", icon: "GraduationCap", blurb: "Six to eight realistic universities matched to your profile, budget, and city preferences." },
  { slug: "admission-assistance", title: "Admission Assistance", icon: "FileText", blurb: "SOP, LORs, CV, and application packs written to the standard each university expects." },
  { slug: "documentation", title: "Documentation", icon: "FolderCheck", blurb: "Transcripts, financials, evidence packs — checked twice before anything leaves our office." },
  { slug: "financial-planning", title: "Financial Planning", icon: "PoundSterling", blurb: "Tuition, living costs, scholarships, loans, and proof-of-funds laid out in plain numbers." },
  { slug: "student-visa", title: "Student Visa", icon: "BadgeCheck", blurb: "End-to-end UKVI, USCIS, IRCC and equivalent visa support with interview prep." },
  { slug: "visit-visa", title: "Visit Visa", icon: "Plane", blurb: "Visitor and short-stay visas for family, conferences, university tours, and graduations." },
  { slug: "recruitment", title: "Recruitment & Jobs", icon: "Briefcase", blurb: "Skilled-worker routes, UK sponsor matching, and CV positioning for international roles." },
  { slug: "pre-departure", title: "Pre-Departure Support", icon: "Luggage", blurb: "Accommodation, airport pickup, SIM, banking, and a first-week checklist — nothing left to chance." },
] as const;

export const JOURNEY = [
  { step: 1, title: "Eligibility Review", body: "30-minute call. We look at your transcripts, English score, finances, and timeline." },
  { step: 2, title: "Country & Pathway", body: "We compare two or three countries against your goals — not just whichever has the easiest visa." },
  { step: 3, title: "Course & University", body: "A shortlist you can defend to your family, with cost, ranking, and graduate outcomes." },
  { step: 4, title: "Document Preparation", body: "Application pack assembled, proofread, and submitted on schedule." },
  { step: 5, title: "Application Submission", body: "We track every portal, deadline, and university query on your behalf." },
  { step: 6, title: "Visa Guidance", body: "CAS/I-20, biometrics, financial evidence, and mock interview included." },
  { step: 7, title: "Pre-Departure", body: "Accommodation, flights, forex, packing list, and first-week briefing." },
  { step: 8, title: "Arrival & Beyond", body: "We stay on call after you land. Most clients message us in their second year too." },
] as const;

export const VALUES = [
  { title: "Honest counselling", body: "If a country or course isn't right for you, we'll say so on day one." },
  { title: "Student-first advice", body: "We're paid to get you the right outcome, not the easiest commission." },
  { title: "Course matching that holds up", body: "Shortlists are built on rankings, fees, fit, and graduate-route eligibility." },
  { title: "Visa support that doesn't gamble", body: "Refusal-rate awareness baked into every application we file." },
  { title: "Long-term support", body: "We're still here after you land — accommodation issues, bank accounts, second-year CAS, all of it." },
] as const;

export const WHY = [
  { stat: "8 years", label: "Operating from our Harrow, UK office since 2018." },
  { stat: "4.9 ★", label: "398+ verified student reviews across destinations." },
  { stat: "20+", label: "Countries with active university and visa pathways." },
  { stat: "UK office", label: "Real people, real consultations — phone, video, or in person." },
];

export const TESTIMONIALS = [
  { name: "Anjali R.", country: "United Kingdom", course: "MSc Data Science, University of Leeds", quote: "Earthlink picked the three universities I should actually apply to instead of the twelve I'd shortlisted. Saved me thousands in application fees and a lot of stress." },
  { name: "Tomasz K.", country: "Canada", course: "PG Diploma, Seneca College", quote: "They flagged a gap in my financials before submission and rebuilt my proof-of-funds — visa approved in 18 days." },
  { name: "Faiza M.", country: "Ireland", course: "MSc International Business, DCU", quote: "Felt like having an older sibling who'd done this before. Honest about the cost of Dublin, honest about job prospects." },
  { name: "Daniel O.", country: "Australia", course: "Bachelor of Nursing, UTS", quote: "I was set on Melbourne; they showed me UTS Sydney made more sense for my budget and graduate route. They were right." },
  { name: "Sneha P.", country: "USA", course: "MS Computer Science, NEU Boston", quote: "Interview prep was brutal in the best way. F1 approved first attempt." },
];
