import { CONTENT_REVIEW_NOTICE, COUNTRY_SOURCES, type SourceRef } from "./authority";

export type BudgetCategory = {
  title: string;
  guidance: string;
};

export type Destination = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  intro: string;
  heroImage: string;
  whyStudy: { title: string; body: string }[];
  education: string;
  documents: string[];
  intakes: string[];
  courses: string[];
  budget: BudgetCategory[];
  workRights: string;
  scholarships: string[];
  faqs: { q: string; a: string }[];
  landmark: string; // for 3D scene
  directAnswer?: string;
  applicantFit?: string[];
  programmeChecks?: string[];
  applicationRoute?: string[];
  nationalityNotes?: { title: string; body: string }[];
  sources?: SourceRef[];
  relatedDestinations?: string[];
  relatedGuides?: string[];
  reviewedAt?: string;
  reviewNotice?: string;
};

const heroFor = (kw: string) =>
  `https://images.unsplash.com/photo-${kw}?auto=format&fit=crop&w=1800&q=70`;

export const DESTINATIONS: Destination[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    short:
      "Graduate Route: 2 years for applications by 31 December 2026, 18 months from 1 January 2027; 3 years for doctoral graduates.",
    eyebrow: "Study in the",
    headline: "United Kingdom",
    intro:
      "Earthlink helps with UK university applications, from Russell Group MScs to foundation pathways. Stonebridge Legal Solutions alone handles all UK immigration advice, routes, forms, and applications.",
    heroImage: heroFor("1529655683826-aba9b3e77383"),
    landmark: "bigben",
    whyStudy: [
      {
        title: "Graduate Route",
        body: "Eligible non-doctoral graduates receive 2 years if they apply on or before 31 December 2026 and 18 months if they apply on or after 1 January 2027. PhD and other doctoral graduates receive 3 years. Stonebridge advises on eligibility and handles UK immigration applications.",
      },
      {
        title: "One-year Masters",
        body: "Many taught Masters follow an intensive one-year format. Compare workload, placement options, assessment, and progression before choosing.",
      },
      {
        title: "Globally ranked",
        body: "The UK has a broad mix of research-intensive, specialist, modern, and pathway institutions. Compare the exact subject and course, not overall rank alone.",
      },
      {
        title: "Direct UK office support",
        body: "We're in Harrow. Walk-in document checks, in-person CAS handover, and post-arrival help.",
      },
      {
        title: "Pathways for every profile",
        body: "Foundation, top-up, postgraduate diploma, and direct-entry routes can fit different academic backgrounds. We check the actual entry rules before shortlisting.",
      },
    ],
    education:
      "Three-year Bachelors, one-year taught Masters and typically three-year research degrees. Sandwich and placement years are available on many courses.",
    documents: [
      "Academic transcripts and degree certificate",
      "IELTS / PTE / TOEFL score",
      "Statement of Purpose",
      "Two academic or work references",
      "Passport bio page",
      "Financial evidence (28-day rule)",
      "ATAS for relevant STEM subjects",
    ],
    intakes: ["September (main)", "January / February", "May (limited)"],
    courses: [
      "Business Analytics & MBA",
      "Computer Science & AI",
      "Data Science",
      "Nursing & Public Health",
      "Engineering (Civil, Mech, Aero)",
      "International Law",
      "Hospitality & Tourism Management",
      "Creative Arts & Architecture",
    ],
    budget: [
      {
        title: "Tuition and course charges",
        guidance:
          "Compare the current university fee page, deposit terms, and any placement or laboratory charges for each offer.",
      },
      {
        title: "Living and travel",
        guidance:
          "Plan for accommodation, household bills, food, local travel, study materials, and arrival costs in the city you choose.",
      },
      {
        title: "Immigration and health",
        guidance:
          "Check the live GOV.UK pages for the current visa charge, health surcharge, and financial-evidence requirement.",
      },
    ],
    directAnswer:
      "The UK can suit applicants who want a wide course choice, intensive postgraduate study, and a clearly documented university application route. Course entry, Student visa conditions, dependant rules, and post-study options must be checked against the live rules for your circumstances.",
    applicantFit: [
      "Applicants who can explain why a specific course supports a credible academic or career plan",
      "Students comparing intensive taught Masters, research degrees, foundation routes, or placement options",
      "Applicants prepared to verify course entry, English evidence, finances, and immigration conditions before accepting an offer",
    ],
    programmeChecks: [
      "Confirm the awarding university, campus, course level, modules, assessment, and delivery mode",
      "Check entry and English-language requirements on the exact course page",
      "Review placement wording, professional accreditation, and any subject-specific clearance requirements",
    ],
    applicationRoute: [
      "Choose the course and confirm the university's application route",
      "Prepare academic, English-language, reference, and purpose documents",
      "Accept the offer only after checking conditions, deposits, and refund terms",
      "Use the CAS and current GOV.UK guidance for the Student visa stage",
    ],
    nationalityNotes: [
      {
        title: "Nationality and residence checks",
        body: "English evidence, tuberculosis testing, document format, and application location can differ by nationality or residence. Check the current GOV.UK route and use Stonebridge for UK immigration advice.",
      },
    ],
    sources: [COUNTRY_SOURCES.ukStudentVisa, COUNTRY_SOURCES.ukGraduateVisa],
    relatedDestinations: ["ireland", "malta", "germany", "france"],
    relatedGuides: [
      "cost-of-living-uk-cities",
      "part-time-work-uk-students",
      "uk-graduate-route-2026",
    ],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Published Student-route conditions commonly permit limited term-time work and more during official vacations. Stonebridge alone confirms individual conditions and handles UK immigration matters.",
    scholarships: [
      "Chevening (FCDO, fully funded)",
      "GREAT Scholarships",
      "University-specific merit awards",
      "Commonwealth Scholarships",
    ],
    faqs: [
      {
        q: "Will I get the Graduate Route?",
        a: "The Graduate Route is not automatic. Subject to eligibility, non-doctoral applications made on or before 31 December 2026 receive 2 years; applications made from 1 January 2027 receive 18 months. PhD and other doctoral graduates receive 3 years. Stonebridge alone provides case-specific UK immigration advice and handles the application.",
      },
      {
        q: "Do I need IELTS for every UK university?",
        a: "Not always. MOI (Medium of Instruction) letters work for some universities; others accept Duolingo English Test or a UKVI-verified PTE. We confirm requirements per university and per course before you book an exam slot.",
      },
      {
        q: "How much money do I need in the bank for a UK student visa?",
        a: "The amount and evidence window depend on current UK rules and your CAS. Stonebridge alone confirms the requirement for your circumstances and prepares the UK visa application.",
      },
      {
        q: "Is the January intake real, or is it a filler intake?",
        a: "It is real. Around 60% of UK universities run a January intake for business, computing, data science, and public health. Class sizes are smaller and September rejections often convert to January offers.",
      },
      {
        q: "Can I switch from a Student visa to a Skilled Worker visa without leaving the UK?",
        a: "Switching depends on the immigration rules and your individual circumstances. Stonebridge alone advises on eligibility and handles any UK switch application.",
      },
      {
        q: "Can my spouse and children come with me to the UK?",
        a: "Dependant eligibility is restricted and changes with the Student-route rules. Stonebridge alone advises on your family circumstances and handles UK dependant applications.",
      },
      {
        q: "How long does a UK student visa take to process?",
        a: "Processing and priority availability change by location and season. Stonebridge confirms the current service options and manages every UK visa application directly.",
      },
      {
        q: "Do UK universities accept 3-year Indian Bachelors for a Masters?",
        a: "Yes — the vast majority accept 3-year Bachelors from NAAC A/A+/A++ or UGC-recognised universities. A few require 15 years of prior education and we flag those before you shortlist.",
      },
      {
        q: "What happens if my UK visa is refused?",
        a: "Keep the refusal notice and do not assume a fresh application is the right response. Stonebridge alone reviews UK refusals, provides advice, and handles any next application or challenge.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    short:
      "Broad programme choice, major research networks, and a structured F-1 study route that must be checked course by course.",
    eyebrow: "Study in the",
    headline: "United States",
    intro:
      "The United States offers broad programme choice, flexible curricula, and major research networks. Earthlink helps applicants research accredited institutions, prepare applications, and organise F-1 interview preparation.",
    heroImage: heroFor("1485871981521-5b1fd3805eee"),
    landmark: "liberty",
    whyStudy: [
      {
        title: "Practical training pathways",
        body: "Eligible students may use curriculum-related or post-completion practical training. The programme, school record, authorisation, and current DHS rules all matter.",
      },
      {
        title: "Assistantships & funding",
        body: "Research and teaching assistantships exist, especially in research-led programmes. Availability, duties, eligibility, and funding terms vary by department.",
      },
      {
        title: "Course flexibility",
        body: "Take electives outside your major. Switch concentrations after a semester. The system rewards exploration.",
      },
      {
        title: "Research output",
        body: "Research strength varies by institution, department, laboratory, and supervisor. Compare current projects, facilities, funding terms, and student outcomes.",
      },
    ],
    education:
      "US institutions use a credit-based system with different undergraduate, graduate, and research structures. Programme length, transfer credit, full-time status, and practical-training eligibility must be checked course by course.",
    documents: [
      "Transcripts (WES evaluation if asked)",
      "GRE / GMAT (subject-dependent)",
      "TOEFL / IELTS / Duolingo",
      "SOP and 2–3 LORs",
      "Resume",
      "I-20 once admitted",
      "DS-160 and SEVIS receipts for visa",
    ],
    intakes: ["Fall (August/September)", "Spring (January)", "Summer (limited)"],
    courses: [
      "Computer Science & AI/ML",
      "Data Science & Analytics",
      "MBA",
      "Electrical & Computer Engineering",
      "Biotechnology",
      "Public Health",
      "Finance & Quant",
    ],
    budget: [
      {
        title: "University charges",
        guidance:
          "Use each institution's current cost-of-attendance page and separate tuition, mandatory fees, insurance, and course materials.",
      },
      {
        title: "Living and travel",
        guidance:
          "Budget by campus location for housing, food, local transport, health cover, books, and travel to the United States.",
      },
      {
        title: "Visa and SEVIS",
        guidance:
          "Check the live Department of State and DHS pages before paying or preparing financial evidence.",
      },
    ],
    directAnswer:
      "The USA can suit applicants who want a broad accredited-institution choice, course flexibility, research access, and a campus-based academic experience. The right decision depends on accreditation, programme fit, the institution's current cost of attendance, and the F-1 requirements for your case.",
    applicantFit: [
      "Applicants ready to compare institutional accreditation, programme outcomes, curriculum, and campus location",
      "Students who can explain a coherent academic plan and how the chosen programme fits it",
      "Applicants prepared to document their education and funding plan consistently across the I-20 and visa process",
    ],
    programmeChecks: [
      "Confirm institutional accreditation and the exact degree, campus, delivery mode, and start term",
      "Check prerequisites, testing policy, transfer-credit rules, and assistantship conditions on the programme page",
      "Ask the designated school official how the programme is recorded for practical-training purposes",
    ],
    applicationRoute: [
      "Research accredited institutions and build an academic and financial shortlist",
      "Submit the institution-specific application and required academic evidence",
      "After admission, review the I-20 carefully and follow the official SEVIS and visa steps",
      "Prepare for the interview using consistent, truthful answers and current official guidance",
    ],
    nationalityNotes: [
      {
        title: "Consular process",
        body: "Appointment availability, document handling, and local instructions can differ by embassy or consulate. Use the official page for the place where you will apply.",
      },
    ],
    sources: [COUNTRY_SOURCES.usaEducation, COUNTRY_SOURCES.usaVisa, COUNTRY_SOURCES.usaWork],
    relatedDestinations: ["uk", "canada", "germany", "france"],
    relatedGuides: ["study-in-usa-complete-guide"],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "F-1 employment is controlled by the student's status, school record, work type, timing, and authorisation. Do not start work or practical training based on a general summary; confirm the current DHS rules and speak to the designated school official.",
    scholarships: [
      "Fulbright (foreign students)",
      "University assistantships",
      "Inlaks & need-based aid",
      "External fellowships per field",
    ],
    faqs: [
      {
        q: "Do I need the GRE for a US Masters in 2026?",
        a: "Testing policies vary by programme and intake. We confirm the current GRE position for every course before you book an exam.",
      },
      {
        q: "What are the most common F1 visa refusal reasons?",
        a: "Weak ties to home country, unclear or inconsistent funding, and vague answers about course choice. Our mock interviews target exactly these three, based on 214(b) refusal patterns from 2024–25.",
      },
      {
        q: "Can my spouse work on an F2 dependant visa?",
        a: "No — F2 dependants cannot work or study full-time. We'll discuss H4 or J2 alternatives if your spouse's employment matters.",
      },
      {
        q: "How much bank balance do I need to show for an F1 visa?",
        a: "The required evidence is tied to the institution's current cost estimate and your circumstances. Check the I-20, official visa guidance, and the consulate instructions, then ask Earthlink to review the document plan.",
      },
      {
        q: "What is STEM OPT and which courses qualify?",
        a: "STEM OPT is an additional practical-training route for eligible graduates of qualifying programmes. Check the programme's current classification, your school record, employer requirements, timing, and the live DHS rules with the designated school official.",
      },
      {
        q: "Can I apply to US universities with a 3-year Bachelors?",
        a: "Some accept it directly, some require a 4-year equivalency via WES, and some ask for a completed PG Diploma. We build your shortlist around your specific transcript, not a generic list.",
      },
      {
        q: "How early should I start the US application?",
        a: "12–14 months before intake for Fall, 9–10 for Spring. GRE/TOEFL bookings, LOR chasers, SOP drafts, and I-20 processing all take longer than students expect.",
      },
      {
        q: "What's the difference between SEVIS I-20 and DS-160?",
        a: "The I-20 is issued by your admitted university and proves your programme, funding, and SEVIS ID. The DS-160 is the US State Department visa application you fill in yourself before the consulate interview.",
      },
      {
        q: "Are US education loans easier to get than UK loans?",
        a: "Yes, provided you have a strong US-based co-signer or use non-cosigner lenders like MPOWER and Prodigy. We introduce students to both without any referral fee.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    short: "PG-Work-Permit, clear PR pathways, and tuition still under control.",
    eyebrow: "Study in",
    headline: "Canada",
    intro:
      "Post-Graduation Work Permit of up to 3 years, Express Entry pathways, and a college system designed around employability.",
    heroImage: heroFor("1517935706615-2717063c2225"),
    landmark: "cntower",
    whyStudy: [
      {
        title: "PGWP up to 3 years",
        body: "PGWP length matches your study programme — open work permit, no sponsor needed.",
      },
      {
        title: "Express Entry / PNP",
        body: "Canadian credentials add CRS points and unlock province-specific PR streams.",
      },
      {
        title: "Quality colleges",
        body: "Conestoga, Seneca, Humber, BCIT — credentials employers genuinely respect.",
      },
      {
        title: "Lower tuition than US/UK",
        body: "Public colleges and universities publish different fee schedules. Compare the current programme fee, living plan, and permit eligibility together.",
      },
    ],
    education:
      "Four-year Bachelors, one to two-year Masters, two to three-year PG Diplomas at public colleges. PG Diplomas are explicitly designed for skilled-migration outcomes.",
    documents: [
      "Transcripts and degree",
      "IELTS Academic / CELPIP / PTE",
      "SOP",
      "Proof of funds for tuition, living expenses and return travel",
      "Medical exam",
      "Biometrics",
      "PAL — Provincial Attestation Letter (new requirement)",
    ],
    intakes: ["Fall (September)", "Winter (January)", "Summer (May, limited)"],
    courses: [
      "Business Analytics",
      "Project Management",
      "Hospitality & Tourism",
      "Computer Networking",
      "Healthcare Administration",
      "Supply Chain",
    ],
    budget: [
      {
        title: "Tuition and compulsory fees",
        guidance:
          "Use the institution's current programme page and confirm whether ancillary, health, and placement charges are included.",
      },
      {
        title: "Living and travel",
        guidance:
          "Build a location-specific plan for accommodation, food, transport, winter clothing, insurance, and travel.",
      },
      {
        title: "Study-permit evidence",
        guidance:
          "Use IRCC's live proof-of-financial-support page because requirements are reviewed and can differ for Quebec.",
      },
    ],
    workRights:
      "Eligible students may work off campus for up to 24 hours per week during regular academic sessions and unlimited hours during scheduled breaks, subject to their study-permit conditions. PGWP eligibility is separate.",
    scholarships: [
      "Vanier (PhD)",
      "Trudeau Scholarships",
      "Institutional entry awards",
      "Province-specific bursaries",
    ],
    faqs: [
      {
        q: "Is the GIC mandatory for a Canadian study permit?",
        a: "No. A GIC is one accepted form of proof of financial support under the regular study-permit process, but it is not mandatory. Applicants must show enough for tuition, living expenses and transportation.",
      },
      {
        q: "What is the Provincial Attestation Letter (PAL) and how do I get one?",
        a: "Since 2024 most undergraduate and college applicants need a PAL from the province before IRCC will process their study permit. The college requests it on your behalf after you accept the offer — we track the request end-to-end.",
      },
      {
        q: "Will my PG Diploma qualify for the PGWP?",
        a: "Not automatically. Check that both the DLI and programme are PGWP-eligible. Current applications can also require language results and, for some non-degree programmes, an eligible field of study. Bachelor’s, master’s and doctoral graduates do not have a field-of-study requirement.",
      },
      {
        q: "How much money do I need to show for a Canada study permit?",
        a: "IRCC requires evidence for tuition, living expenses, and transportation, with separate Quebec rules. Use the live government page for the current requirement and ask Earthlink to review how the evidence fits your study plan.",
      },
      {
        q: "Can I bring my spouse to Canada as a student?",
        a: "A spouse or common-law partner may qualify for an open work permit if the student is in a master’s programme of at least 16 months, a doctoral programme, or certain listed professional or eligible programmes. Eligibility is not automatic and other requirements apply.",
      },
      {
        q: "How long does a Canada study permit take?",
        a: "New applications use the regular study-permit process. Check IRCC’s live processing-times tool for the current estimate; times vary by application and are not a maximum or guarantee. The published estimate includes biometrics.",
      },
      {
        q: "Can I apply for PR while on a PGWP?",
        a: "Yes — Express Entry (CEC), Provincial Nominee Programs, and the new category-based draws (health, STEM, trades, French) are all valid PR routes once you have one year of skilled Canadian work experience.",
      },
      {
        q: "Which Canadian provinces are best for PR after study?",
        a: "Ontario, British Columbia, and Alberta lead by employer volume. Manitoba, Saskatchewan, and Atlantic provinces have easier PNP thresholds. We match province to your occupation, not to marketing brochures.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    short: "485 Graduate Visa, strong nursing/IT demand, and a real lifestyle dividend.",
    eyebrow: "Study in",
    headline: "Australia",
    intro:
      "Genuine Student requirement, regional study incentives, and skilled-migration pathways that still work in 2026.",
    heroImage: heroFor("1506973035872-a4ec16b8e8d9"),
    landmark: "opera",
    whyStudy: [
      {
        title: "485 Graduate Visa",
        body: "Duration depends on stream and qualification: up to 18 months in the Post-Vocational Education Work stream, and generally 2 or 3 years in the Post-Higher Education Work stream.",
      },
      {
        title: "Regional bonuses",
        body: "Eligible regional graduates may qualify for a second Post-Higher Education Work visa lasting 1 or 2 years, depending on where they studied and lived.",
      },
      {
        title: "Skilled-migration alignment",
        body: "Nursing, IT, engineering, and teaching map directly to occupation lists.",
      },
      {
        title: "Group of Eight",
        body: "Eight research-intensive universities consistently in global top 100.",
      },
    ],
    education:
      "Three-year Bachelors (four with Honours), one to two-year Masters. Diplomas and Advanced Diplomas at TAFE feed into degree credit transfers.",
    documents: [
      "Transcripts and certificates",
      "IELTS / PTE",
      "Genuine Student (GS) statement",
      "Financial evidence",
      "OSHC health cover",
      "Passport",
    ],
    intakes: ["February (main)", "July", "November (some courses)"],
    courses: [
      "Nursing & Healthcare",
      "IT & Cybersecurity",
      "Engineering",
      "Construction Management",
      "Hospitality",
    ],
    budget: [
      {
        title: "Tuition and course costs",
        guidance:
          "Compare the current course fee, required health cover, materials, and placement costs on the provider's website.",
      },
      {
        title: "Living and travel",
        guidance: "Plan by city for housing, food, transport, utilities, insurance, and travel.",
      },
      {
        title: "Visa and financial evidence",
        guidance:
          "Use the live Department of Home Affairs checklist for current charges and evidence requirements.",
      },
    ],
    workRights:
      "Most students may work up to 48 hours per fortnight while their course is in session and unlimited hours during scheduled breaks; research master’s and doctoral students have an exception. Temporary Graduate visa duration depends on stream, qualification and eligibility.",
    scholarships: [
      "Australia Awards",
      "Destination Australia (regional)",
      "University international scholarships",
    ],
    faqs: [
      {
        q: "Has the Genuine Student (GS) requirement replaced the GTE?",
        a: "Yes — the Genuine Student requirement replaced the Genuine Temporary Entrant test in March 2024 and is now the central assessment in the visa decision. Answers must be specific to your course, city, and career plan.",
      },
      {
        q: "Is regional study in Australia worth it?",
        a: "Eligible graduates who studied and lived in a designated regional area may qualify for a second Post-Higher Education Work visa: generally 1 extra year for Category 2 areas or 2 years for Category 3 areas. Separate skilled-migration points rules may apply.",
      },
      {
        q: "How much bank balance do I need for an Australian student visa?",
        a: "The Department of Home Affairs document checklist determines whether financial evidence is required and what it must cover. Check the live checklist for your application and family circumstances.",
      },
      {
        q: "Can I bring my spouse on an Australian student visa?",
        a: "Yes — spouses of Masters by Coursework and higher can apply for a Subclass 500 dependant visa with full work rights. Bachelor and Diploma students face tighter conditions.",
      },
      {
        q: "What is the 485 Graduate Visa and who qualifies?",
        a: "Duration depends on stream and qualification. Post-Vocational Education Work is up to 18 months. Post-Higher Education Work is generally 2 years for bachelor’s, coursework master’s and extended master’s qualifications, and 3 years for research master’s and doctoral qualifications. Eligible regional graduates may separately qualify for a 1- or 2-year second visa. The former select-degree extension ended on 1 July 2024.",
      },
      {
        q: "Which Australian occupations lead to permanent residency?",
        a: "Nursing, secondary teaching (STEM/languages), civil/mechanical/electrical engineering, IT (cybersecurity, software), and social work are on the Core Skills Occupation List with the fastest PR outcomes.",
      },
      {
        q: "How long does an Australian student visa take?",
        a: "Processing times vary by priority, application volume, checks and completeness. Use Home Affairs’ live visa processing-time guide; it is indicative and not specific to an individual application.",
      },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    short: "Two-year Stay Back, EU access, and an English-speaking tech hub.",
    eyebrow: "Study in",
    headline: "Ireland",
    intro:
      "European study with English instruction, Tier-1 employers in Dublin, and a two-year Stay Back option after Masters.",
    heroImage: heroFor("1590089415225-401ed6f9db8e"),
    landmark: "cliffs",
    whyStudy: [
      {
        title: "Two-year Stay Back",
        body: "Third Level Graduate Programme lets Masters graduates remain for 24 months.",
      },
      {
        title: "Tech employer hub",
        body: "Google, Meta, LinkedIn, Stripe, Pfizer — European headquarters cluster in Dublin and Cork.",
      },
      {
        title: "English-medium EU degree",
        body: "EU-recognised qualifications without learning another European language.",
      },
    ],
    education:
      "Three-year honours Bachelors, one to two-year Masters. Strong industry partnerships in Dublin, Galway, Limerick, and Cork.",
    documents: [
      "Transcripts",
      "IELTS 6.5 typical",
      "SOP",
      "Current financial evidence",
      "Passport",
      "Medical and TB screening",
    ],
    intakes: ["September", "January (limited)"],
    courses: ["MSc Data Analytics", "International Business", "Pharma & Biotech", "Cybersecurity"],
    budget: [
      {
        title: "Tuition and course charges",
        guidance:
          "Use the institution's live fee schedule and confirm deposits, insurance, materials, and placement charges.",
      },
      {
        title: "Living and travel",
        guidance:
          "Compare housing availability and daily costs across Dublin and regional study cities.",
      },
      {
        title: "Immigration costs and evidence",
        guidance:
          "Check the live Irish authority guidance for current charges and financial requirements.",
      },
    ],
    workRights:
      "20 hrs/week term, 40 hrs in holidays. Stay Back of 24 months after Masters, 12 after Bachelors.",
    scholarships: ["Government of Ireland Scholarship", "Walsh Scholarships", "University awards"],
    faqs: [
      {
        q: "Will I find student housing in Dublin?",
        a: "It's tight and expensive. We help students shortlist Maynooth, Limerick, Galway, and Cork as alternatives with 30–40% lower rent and the same Third Level Graduate Programme rights.",
      },
      {
        q: "What is the Third Level Graduate Programme (Stay Back)?",
        a: "Masters graduates get 24 months and Bachelors graduates get 12 months of open work rights after their course. It's an unsponsored permit — you can work for any employer while you look for a Critical Skills or General Employment Permit.",
      },
      {
        q: "Do I need IELTS for Irish universities?",
        a: "IELTS 6.5 (with no band below 6.0) is the standard requirement. Some universities accept PTE 63, TOEFL iBT 90, or Duolingo 115. A verified MOI letter is accepted by a handful of institutions.",
      },
      {
        q: "How much money do I need for an Irish student visa?",
        a: "Use the live Irish immigration guidance for the current evidence requirement and accepted sources of funds, then ask Earthlink to review your document plan.",
      },
      {
        q: "Can I work part-time while studying in Ireland?",
        a: "Yes — 20 hours per week during term and 40 hours per week during official holidays (June to end of September, and 15 December to 15 January).",
      },
      {
        q: "Is Ireland cheaper than the UK for international students?",
        a: "Tuition is broadly comparable, but Dublin rent is higher than most UK cities. Regional Irish cities (Galway, Cork, Limerick) come out cheaper than London and Manchester on total cost of living.",
      },
    ],
  },
  {
    slug: "malta",
    name: "Malta",
    short:
      "Verify the provider and programme first, then build the application and visa plan from live Maltese sources.",
    eyebrow: "Study in",
    headline: "Malta",
    intro:
      "Malta offers English-medium higher education in a compact European setting. Earthlink helps applicants verify the provider, programme, academic route, and application documents before they rely on the current Identita visa process.",
    heroImage: heroFor("1514222134-b57cbb8ce073"),
    landmark: "cliffs",
    whyStudy: [
      {
        title: "Provider verification",
        body: "MFHEA publishes the official register used to check whether a provider is licensed and a programme is accredited.",
      },
      {
        title: "English-medium options",
        body: "Many institutions teach in English. Applicants still need to confirm the exact language, attendance, and assessment requirements for the programme.",
      },
      {
        title: "Documented visa route",
        body: "Identita publishes the live visa guidance. Use it to confirm timing, documents, insurance, travel, accommodation, and financial evidence.",
      },
      {
        title: "Compact study location",
        body: "A smaller destination can suit students who value short travel distances and a Mediterranean environment, subject to programme fit and housing plans.",
      },
    ],
    education:
      "Start with the MFHEA register. Confirm the provider, programme title, qualification level, credits, delivery mode, teaching location, attendance, assessment, and awarding body against the offer letter.",
    documents: [
      "Passport and identity documents",
      "Academic records and English-language evidence required by the provider",
      "Offer or enrolment evidence with programme and provider details",
      "Current tuition-payment evidence requested for the application",
      "Financial and sponsor evidence required by the live checklist",
      "Insurance, accommodation, and travel evidence required for the route",
      "Consent, custody, translation, or legalisation documents where applicable",
    ],
    intakes: ["Institution-dependent", "Apply early enough for the current visa process"],
    courses: ["Business and management", "Computing", "Hospitality", "Health and social care"],
    budget: [
      {
        title: "Tuition and provider charges",
        guidance:
          "Confirm the current fee, deposit, refund policy, and all compulsory course charges directly with the licensed provider.",
      },
      {
        title: "Living, insurance, and travel",
        guidance:
          "Plan for accommodation, food, transport, insurance, and travel using current local and provider sources.",
      },
      {
        title: "Visa and financial evidence",
        guidance:
          "Use the live Identita guidance for current charges, evidence rules, and application arrangements.",
      },
    ],
    directAnswer:
      "Malta can suit applicants seeking English-medium study in a compact European destination, but the decision should begin with provider and programme verification. Do not rely on a college name or agent brochure alone; check the live MFHEA register and then follow Identita's current visa guidance.",
    applicantFit: [
      "Applicants who have verified the exact provider and programme on the MFHEA register",
      "Students comfortable with a smaller destination and a programme-led rather than ranking-led shortlist",
      "Applicants who can document their study, accommodation, insurance, travel, and funding plan",
    ],
    programmeChecks: [
      "Match the provider and programme to the current MFHEA register",
      "Confirm the qualification level, credits, delivery mode, campus, and awarding body",
      "Read the provider's attendance, progression, refund, and complaints terms before paying",
    ],
    applicationRoute: [
      "Verify the provider and programme on the MFHEA register",
      "Complete the provider's academic application and check every offer condition",
      "Prepare the current Identita visa evidence for your course and circumstances",
      "Recheck the official guidance before booking travel or making non-refundable commitments",
    ],
    nationalityNotes: [
      {
        title: "Document and application location",
        body: "Translation, legalisation, parental-consent, and application-centre steps can differ by age, nationality, and residence. Follow the live checklist for the place where you apply.",
      },
    ],
    sources: [COUNTRY_SOURCES.maltaProgrammes, COUNTRY_SOURCES.maltaVisa],
    relatedDestinations: ["uk", "ireland", "spain", "portugal"],
    relatedGuides: ["verify-malta-university-course"],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Do not use possible part-time work to make an unaffordable plan appear viable. Confirm your own conditions and the current official rules before accepting any employment.",
    scholarships: [
      "Check awards offered by the chosen MFHEA-registered institution",
      "Confirm current national schemes through official Maltese sources",
    ],
    faqs: [
      {
        q: "How do I verify a Malta university or college?",
        a: "Search the live MFHEA register for both the provider and the exact programme. Confirm the qualification level, credits, delivery location, and awarding body against the offer.",
      },
      {
        q: "What must the Malta school enrolment letter include?",
        a: "It should identify the licensed provider and exact programme clearly enough to match the official register and current visa checklist. Ask the provider to correct any mismatch before applying.",
      },
      {
        q: "What financial evidence is required?",
        a: "The live Identita guidance sets the current calculation and accepted evidence. Ask Earthlink to review how your own funds, sponsor documents, course payments, and travel plan fit the checklist.",
      },
      {
        q: "What insurance is required?",
        a: "Use the live Identita guidance to confirm the required territory, purpose, duration, and coverage before buying a policy.",
      },
      {
        q: "When should I apply for the visa?",
        a: "Application timing and appointment availability can change. Work backwards from the course start date using the live Identita and application-centre guidance, and leave time to correct documents.",
      },
      {
        q: "Do all documents have to be in English?",
        a: "Follow the language and translation rules in the current checklist. Do not assume an informal translation or a document accepted by the college will also satisfy the visa process.",
      },
      {
        q: "What are the visa fees?",
        a: "Visa charges and service options change. Check the live Identita and application-centre pages immediately before paying.",
      },
    ],
  },
  {
    slug: "newzealand",
    name: "New Zealand",
    short: "Post-Study Work Visa, skill-shortage list jobs, and unmatched quality of life.",
    eyebrow: "Study in",
    headline: "New Zealand",
    intro:
      "Eight government-funded universities, accredited Institutes of Technology, and a Post-Study Work Visa that maps to graduation level.",
    heroImage: heroFor("1469521669194-babb45599def"),
    landmark: "skytower",
    whyStudy: [
      {
        title: "Post-Study Work Visa",
        body: "Up to 3 years depending on qualification and study length; degree-level 7 or higher can allow open work, while eligible non-degree qualifications carry study-related work conditions.",
      },
      {
        title: "Skill-shortage pathways",
        body: "Construction, engineering, healthcare, and IT route to residency.",
      },
      { title: "All public, all ranked", body: "All eight NZ universities sit in the QS top 500." },
    ],
    education:
      "Three-year Bachelors, one to two-year Masters, with Postgraduate Diplomas widely available.",
    documents: [
      "Transcripts",
      "IELTS 6.0/6.5",
      "Statement of Purpose",
      "Current financial evidence",
      "Medical and chest X-ray",
    ],
    intakes: ["February", "July"],
    courses: [
      "Construction Management",
      "Information Technology",
      "Healthcare",
      "Agriculture & Environment",
    ],
    budget: [
      {
        title: "Tuition and provider charges",
        guidance:
          "Use the provider's current course page for tuition, compulsory fees, insurance, and materials.",
      },
      {
        title: "Living and travel",
        guidance:
          "Build a city-specific plan for accommodation, food, transport, insurance, and flights.",
      },
      {
        title: "Visa and financial evidence",
        guidance:
          "Use Immigration New Zealand's live guidance for current charges and evidence requirements.",
      },
    ],
    workRights:
      "Eligible students with the relevant visa condition may work up to 25 hours per week during study and full-time during scheduled breaks. Holders of an older visa that still states 20 hours must obtain a variation of conditions or a new visa before working the extra hours. Post Study Work Visa duration depends on qualification and study length.",
    scholarships: ["New Zealand Excellence Awards", "University-specific entry scholarships"],
    faqs: [
      {
        q: "Does studying in New Zealand help with Australian PR?",
        a: "Indirectly — NZ citizenship (obtainable after 5 years of residency) unlocks near-automatic Australian residency under the trans-Tasman agreement and the 2023 direct-citizenship pathway.",
      },
      {
        q: "How much money do I need for a New Zealand student visa?",
        a: "Use Immigration New Zealand's live guidance for the current amount, coverage period, and accepted evidence, then ask Earthlink to review the document plan.",
      },
      {
        q: "What is the Post-Study Work Visa duration?",
        a: "A Post Study Work Visa can last up to 3 years, depending on qualification level and how long the applicant studied in New Zealand. A degree-level 7 or higher qualification studied full-time in New Zealand for at least 30 weeks can allow open work. A non-degree level 7 or lower qualification must be on INZ’s eligible list and the work must relate to the study.",
      },
      {
        q: "Which NZ occupations lead to residency the fastest?",
        a: "The Green List (Tier 1) offers Straight to Residence for construction, engineering, healthcare, ICT (senior roles), and teaching. Tier 2 offers Work to Residence after two years of qualifying employment.",
      },
      {
        q: "Can I bring my partner and children to New Zealand?",
        a: "Masters and PhD students can bring a partner on an open work visa and school-age children who attend as domestic students. Bachelors and Diploma students face restrictions.",
      },
      {
        q: "Are New Zealand universities good enough for a global career?",
        a: "All eight public NZ universities sit in the QS Top 500. Auckland is Top 100, and Otago, Wellington, Canterbury, and Massey are consistently Top 300 in their subject areas.",
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    short:
      "Compare country-specific study systems, application routes, programme checks, and residence rules before choosing a European destination.",
    eyebrow: "Study in",
    headline: "Europe",
    intro:
      "Europe is a comparison hub, not a single admissions or visa system. Start with programme fit, teaching language, recognition, application route, housing, and the live national rules for Germany, France, Spain, Portugal, or another country.",
    heroImage: heroFor("1467269204594-9661b134dd2b"),
    landmark: "eiffel",
    whyStudy: [
      {
        title: "Different national systems",
        body: "Admissions, academic calendars, recognition, visas, residence, and work conditions are country-specific. Compare them separately.",
      },
      {
        title: "Programme-led choice",
        body: "The strongest shortlist begins with the exact curriculum, language, accreditation, entry route, and graduate outcomes, not a continent-wide claim.",
      },
      {
        title: "English-taught programmes",
        body: "English-taught options exist across Europe, but applicants should verify teaching, assessment, placements, and daily-life language needs.",
      },
      {
        title: "Country-specific next steps",
        body: "Student work and post-study routes differ and can change. Use each country's official source before treating employment as part of the decision.",
      },
    ],
    education:
      "European higher education shares some common qualification frameworks, but degree structures, admission routes, professional recognition, language, and institution types still vary by country and programme.",
    documents: [
      "Transcripts (apostilled)",
      "English/German proficiency",
      "Motivation letter",
      "APS certificate (for Germany)",
      "Blocked account / financial evidence",
    ],
    intakes: ["September / October", "February / March"],
    courses: [
      "Engineering",
      "Computer Science",
      "International Business",
      "Architecture",
      "Arts and social sciences",
    ],
    budget: [
      {
        title: "Tuition model",
        guidance:
          "Compare public and private institutions country by country. Confirm tuition, semester contributions, and compulsory course charges on the live programme page.",
      },
      {
        title: "Living and travel",
        guidance:
          "Plan by city and country for accommodation, food, transport, insurance, study materials, and travel.",
      },
      {
        title: "Visa and residence",
        guidance:
          "Use the relevant national authority for current charges, proof-of-funds rules, insurance, and residence steps.",
      },
    ],
    directAnswer:
      "There is no single Europe application, visa, work, or post-study rule. Use this page to compare destinations and move into the relevant country hub before choosing a programme or preparing documents.",
    applicantFit: [
      "Applicants willing to compare countries on programme fit, recognition, language, application route, and daily life",
      "Students who will verify the exact provider and programme before paying",
      "Applicants prepared to follow a country-specific visa and residence process",
    ],
    programmeChecks: [
      "Confirm the institution's legal status and the programme's recognition in the destination country",
      "Check the teaching and assessment language, course structure, placement terms, and awarding body",
      "For regulated careers, confirm professional recognition in the country where you may work",
    ],
    applicationRoute: [
      "Choose a country and course based on academic and career fit",
      "Identify the national or institution-specific application route",
      "Verify document format, recognition, translation, and language requirements",
      "Use the country's live visa or residence source after admission",
    ],
    nationalityNotes: [
      {
        title: "EU, EEA, Swiss, and other applicants",
        body: "Application, tuition status, visa, and residence steps can differ by citizenship and residence. Use the destination hub and live national source for your category.",
      },
    ],
    sources: [
      COUNTRY_SOURCES.germanyStudy,
      COUNTRY_SOURCES.franceApplications,
      COUNTRY_SOURCES.spainStudy,
      COUNTRY_SOURCES.portugalAdmission,
    ],
    relatedDestinations: ["germany", "france", "spain", "portugal"],
    relatedGuides: ["germany-vs-france-vs-spain-vs-portugal", "top-mba-programs-europe"],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Student employment and post-study residence are national matters. Check the official country source, your residence conditions, and any required authorisation before working.",
    scholarships: [
      "DAAD (Germany)",
      "Erasmus Mundus",
      "Eiffel Excellence (France)",
      "National-government bursaries",
    ],
    faqs: [
      {
        q: "Is Germany really free for international students?",
        a: "German public-university funding models are often favourable, but exceptions and compulsory student charges exist. Check the live university page and relevant regional rules for the exact programme.",
      },
      {
        q: "Do I need to speak German to study in Europe?",
        a: "Some programmes are taught in English, but language expectations differ by country, course, placement, profession, and daily-life context. Verify both teaching and assessment language on the exact programme page.",
      },
      {
        q: "What is the German blocked account (Sperrkonto) and how much do I need?",
        a: "A blocked account can be one way to evidence living funds. The required amount and acceptable alternatives can change, so use the live German authority guidance before opening or funding an account.",
      },
      {
        q: "Which European country is cheapest for international students?",
        a: "There is no single cheapest answer. Compare the live programme charges, compulsory fees, housing market, transport, insurance, and visa evidence for your shortlist.",
      },
      {
        q: "Can I stay after graduation in Europe?",
        a: "Post-study routes are country-specific and eligibility can depend on the qualification, institution, timing, employment, and application status. Check the destination hub and live authority source.",
      },
      {
        q: "Can I transfer between EU universities under Erasmus?",
        a: "Mobility depends on the universities' agreements, the programme, funding, and academic approval. Ask the home and host institutions how credits and enrolment will be handled before relying on a transfer.",
      },
      {
        q: "Do European degrees lead to Blue Card and EU permanent residency?",
        a: "A degree does not automatically create a work or permanent-residence right. National and EU routes have separate qualification, employment, salary, residence, and timing rules that must be checked when you apply.",
      },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    short:
      "Verify the programme, application route, tuition model, and current study-residence evidence before applying to Germany.",
    eyebrow: "Study in",
    headline: "Germany",
    intro:
      "Germany offers public and private universities, research-led courses, universities of applied sciences, and English-taught options. Earthlink helps applicants match the programme, institution type, application route, and current residence requirements.",
    heroImage: heroFor("1467269204594-9661b134dd2b"),
    landmark: "cliffs",
    whyStudy: [
      {
        title: "Different institution types",
        body: "Research universities and universities of applied sciences serve different academic and career goals. Choose on curriculum and delivery, not label alone.",
      },
      {
        title: "Strong technical ecosystem",
        body: "Engineering, computing, science, business, and research programmes connect to a large European academic and industrial network.",
      },
      {
        title: "English-taught options",
        body: "Many programmes are available in English, especially at postgraduate level. Daily life, placements, and some admissions steps may still require German.",
      },
      {
        title: "Document-led process",
        body: "Recognition, application portals, language evidence, and residence documents require early checking and consistent records.",
      },
    ],
    education:
      "Compare research universities, universities of applied sciences, public and private providers. Check recognition, the exact degree, admission status, teaching language, accreditation where relevant, and the programme's application route.",
    documents: [
      "Passport and identity documents",
      "Academic records in the required format",
      "Language evidence required by the programme",
      "Motivation, references, CV, or portfolio where requested",
      "Recognition or verification documents required for the applicant's education system",
      "Admission evidence, insurance, and current financial evidence for the residence process",
    ],
    intakes: ["Winter semester", "Summer semester where offered"],
    courses: [
      "Engineering",
      "Computer science",
      "Natural sciences",
      "Business",
      "Renewable energy",
    ],
    budget: [
      {
        title: "Tuition model and student charges",
        guidance:
          "Public and private models differ, with regional and programme exceptions. Check tuition, semester contributions, and compulsory charges on the exact university page.",
      },
      {
        title: "Living, insurance, and travel",
        guidance:
          "Plan by city for housing, health insurance, food, transport, study materials, and arrival costs.",
      },
      {
        title: "Residence and financial evidence",
        guidance:
          "Use the live Make it in Germany guidance for the current requirement and accepted evidence, including any blocked-account option.",
      },
    ],
    directAnswer:
      "Germany can suit applicants seeking technical, research, or applied study in a large European economy. Start by verifying the institution, exact programme, teaching language, application route, and current residence evidence. Do not treat 'public university' as a guarantee that every programme has the same charges or process.",
    applicantFit: [
      "Applicants who can match their prior studies to the programme prerequisites",
      "Students willing to compare research and applied-science institutions",
      "Applicants prepared to organise recognition, language, insurance, and residence evidence early",
    ],
    programmeChecks: [
      "Confirm the institution and programme through the university and recognised German study sources",
      "Check teaching language, prerequisites, restricted-admission status, and application portal",
      "Read tuition, semester-contribution, refund, enrolment, and insurance terms on the live university pages",
    ],
    applicationRoute: [
      "Research the exact programme and institution type",
      "Confirm whether the application goes to the university, uni-assist, or another stated route",
      "Prepare recognition, academic, language, and programme-specific documents",
      "After admission, follow the live residence guidance and local enrolment steps",
    ],
    nationalityNotes: [
      {
        title: "Education-system checks",
        body: "Recognition, verification, and document-format steps can differ by the country where a qualification was earned. Follow the university and official German guidance for your education system.",
      },
    ],
    sources: [COUNTRY_SOURCES.germanyProgrammes, COUNTRY_SOURCES.germanyStudy],
    relatedDestinations: ["france", "spain", "portugal", "europe"],
    relatedGuides: ["study-in-germany-free-tuition", "germany-student-visa-blocked-account"],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Study-related work and post-study residence depend on current law, residence conditions, study status, and the route used. Check the live authority guidance before working or planning a graduate transition.",
    scholarships: [
      "DAAD funding database",
      "University and foundation awards",
      "Programme-specific research funding",
    ],
    faqs: [
      {
        q: "Is university tuition free in Germany?",
        a: "Germany has a favourable public-university model, but regional, institutional, programme, continuing-education, and private-provider exceptions exist. All students should check live tuition and compulsory charges for the exact course.",
      },
      {
        q: "What is a German blocked account?",
        a: "A blocked account can be used to evidence living funds for a study-residence application. The required amount, provider terms, and acceptable alternatives can change, so begin with the live official guidance.",
      },
      {
        q: "Do I apply through uni-assist?",
        a: "Some institutions use uni-assist, some accept direct applications, and some specify another route. The exact programme page is the controlling application instruction.",
      },
      {
        q: "Can I study in English?",
        a: "Yes, English-taught programmes exist. Verify the teaching and assessment language, entry evidence, and whether German is needed for placements, regulated careers, or daily life.",
      },
      {
        q: "Can students work in Germany?",
        a: "Work conditions depend on the residence permission, study status, activity, and current rules. Check the official source and your own document before accepting work.",
      },
    ],
  },
  {
    slug: "france",
    name: "France",
    short:
      "Choose the correct Campus France, platform, or direct application route for the exact French programme and applicant profile.",
    eyebrow: "Study in",
    headline: "France",
    intro:
      "France combines public universities, grandes ecoles, specialist schools, and English- or French-taught programmes. Earthlink helps applicants verify the institution, qualification, language, and correct application route before the visa stage.",
    heroImage: heroFor("1502602898657-3e91760cbb34"),
    landmark: "eiffel",
    whyStudy: [
      {
        title: "Multiple institution types",
        body: "Universities, grandes ecoles, and specialist schools have different admissions models, selectivity, recognition, and career links.",
      },
      {
        title: "International programmes",
        body: "English-taught options exist, while French ability can expand daily-life, placement, and employment choices.",
      },
      {
        title: "Central and direct routes",
        body: "The application route can depend on nationality, residence, study level, and programme. Confirm it before submitting.",
      },
      {
        title: "Broad academic range",
        body: "Applicants can compare programmes in business, engineering, arts, sciences, hospitality, and social sciences.",
      },
    ],
    education:
      "Check the institution's legal status, awarding authority, qualification level, recognition, teaching language, and professional accreditation where relevant. Do not assume every private-school award has the same recognition as a national degree.",
    documents: [
      "Passport and identity documents",
      "Academic records and required translations",
      "Language evidence for the programme",
      "Motivation, CV, references, portfolio, or tests where requested",
      "Admission and financial evidence required for the visa route",
      "Accommodation, insurance, and residence documents requested by the live checklist",
    ],
    intakes: ["Autumn", "Other starts where the programme offers them"],
    courses: [
      "Business and management",
      "Engineering",
      "Fashion and design",
      "Hospitality",
      "Data and computer science",
    ],
    budget: [
      {
        title: "Tuition and compulsory charges",
        guidance:
          "Compare public and private models on the exact programme page and check enrolment, student-service, materials, and deposit terms.",
      },
      {
        title: "Living and travel",
        guidance:
          "Plan by city for housing, food, transport, insurance, study materials, and arrival costs.",
      },
      {
        title: "Visa and financial evidence",
        guidance:
          "Use France-Visas and the applicable Campus France route for current charges and evidence requirements.",
      },
    ],
    directAnswer:
      "France can suit applicants who want a broad choice of public, elite, and specialist institutions. The key is choosing a recognised qualification and the correct application route for your nationality, residence, study level, and programme.",
    applicantFit: [
      "Applicants willing to distinguish universities, grandes ecoles, and specialist schools",
      "Students who will verify qualification recognition and teaching language",
      "Applicants prepared to follow the Campus France, national platform, or direct route specified for them",
    ],
    programmeChecks: [
      "Confirm institution status, awarding authority, qualification level, and professional recognition",
      "Check teaching and assessment language, internship terms, and campus location",
      "Read the current admissions, deposit, refund, and enrolment terms before paying",
    ],
    applicationRoute: [
      "Identify the exact programme and qualification",
      "Use Campus France to determine the route for your profile",
      "Submit through the stated platform or directly to the institution",
      "After admission, follow the live France-Visas and residence steps",
    ],
    nationalityNotes: [
      {
        title: "Etudes en France countries",
        body: "Applicants resident in countries covered by the Etudes en France process may have different platform and interview steps. Confirm the current route through Campus France.",
      },
    ],
    sources: [COUNTRY_SOURCES.franceApplications, COUNTRY_SOURCES.franceVisa],
    relatedDestinations: ["germany", "spain", "portugal", "europe"],
    relatedGuides: [
      "france-university-application-routes",
      "germany-vs-france-vs-spain-vs-portugal",
    ],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Student work and post-study residence depend on current law, the residence document, study status, qualification, and any required authorisation. Verify the live French rules before relying on employment.",
    scholarships: [
      "Campus France funding catalogue",
      "Eiffel Excellence programme",
      "Institution and regional awards",
    ],
    faqs: [
      {
        q: "Do I apply through Campus France?",
        a: "Campus France helps applicants identify the correct route. The answer depends on nationality or residence, study level, and programme, so check the current process for your profile.",
      },
      {
        q: "How do I verify a French qualification?",
        a: "Check the institution, awarding authority, qualification level, and any professional recognition. Ask for the exact award title and verify it through official French sources.",
      },
      {
        q: "Can I study in France in English?",
        a: "English-taught programmes exist. Confirm the teaching and assessment language, entry evidence, and whether French is expected for placements or regulated careers.",
      },
      {
        q: "What financial evidence is required?",
        a: "Use France-Visas and the applicable Campus France process for the current requirement and accepted documents. Contact Earthlink for a profile-specific document check.",
      },
      {
        q: "Can students work in France?",
        a: "Conditions depend on current law and the student's residence status. Check the live authority guidance and the conditions attached to your permission.",
      },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    short:
      "Match the Spanish university application route, qualification recognition, programme language, and current study-stay rules.",
    eyebrow: "Study in",
    headline: "Spain",
    intro:
      "Spain offers public and private universities, programmes in Spanish and regional languages, and a growing English-taught portfolio. Earthlink helps applicants verify the degree and use the correct admission and study-stay route.",
    heroImage: heroFor("1539037116277-4db20889f2d4"),
    landmark: "cliffs",
    whyStudy: [
      {
        title: "Varied programme languages",
        body: "Applicants should verify the teaching and assessment language, not infer it from an English marketing page.",
      },
      {
        title: "Public and private routes",
        body: "Admissions, entrance credentials, timelines, and fees differ by university type, region, level, and programme.",
      },
      {
        title: "Accredited degrees",
        body: "Official and institution-specific awards can serve different goals. Recognition matters for further study and regulated careers.",
      },
      {
        title: "Regional choices",
        body: "Madrid, Barcelona, Valencia, Andalusia, and other regions offer different housing, language, industry, and campus contexts.",
      },
    ],
    education:
      "Confirm whether the programme leads to an official recognised degree, the awarding university, teaching language, campus, credit structure, and professional recognition. International undergraduate applicants may need a credential or admissions route such as UNEDasiss where applicable.",
    documents: [
      "Passport and identity documents",
      "Academic records and required recognition or accreditation documents",
      "Language evidence",
      "Programme-specific motivation, CV, references, or portfolio",
      "Admission evidence",
      "Current study-stay financial, insurance, accommodation, and other supporting documents",
    ],
    intakes: ["Autumn", "Other starts where offered"],
    courses: [
      "Business",
      "Tourism and hospitality",
      "Architecture",
      "Engineering",
      "Arts and design",
    ],
    budget: [
      {
        title: "Tuition and university charges",
        guidance:
          "Use the exact university programme page and confirm public or private status, deposits, enrolment charges, materials, and refund terms.",
      },
      {
        title: "Living and travel",
        guidance:
          "Plan by city for housing, transport, food, insurance, study materials, and arrival costs.",
      },
      {
        title: "Study-stay evidence",
        guidance:
          "Use Spain's live migration guidance for current visa or stay requirements, charges, and financial evidence.",
      },
    ],
    directAnswer:
      "Spain can suit applicants who match the programme language, recognised qualification, application route, and city context to their goals. Start with the exact university and degree, then use the live migration guidance for the study-stay stage.",
    applicantFit: [
      "Applicants ready to verify teaching and assessment language",
      "Students who understand the distinction between official and institution-specific awards",
      "Applicants prepared for recognition, translation, or admissions-credential steps where required",
    ],
    programmeChecks: [
      "Verify the awarding university and whether the qualification is official",
      "Confirm language, campus, curriculum, assessment, and internship terms",
      "For regulated careers, check professional recognition before applying",
    ],
    applicationRoute: [
      "Choose the exact degree and university",
      "Confirm whether direct application, UNEDasiss, or another stated route applies",
      "Complete recognition, language, and university documents",
      "After admission, follow the live study-stay guidance for your application location",
    ],
    nationalityNotes: [
      {
        title: "Undergraduate credentials",
        body: "The admissions credential, recognition, and subject-scoring route can differ by prior education system. Check the university and UNEDasiss guidance for your qualification.",
      },
    ],
    sources: [COUNTRY_SOURCES.spainAdmission, COUNTRY_SOURCES.spainStudy],
    relatedDestinations: ["france", "portugal", "germany", "europe"],
    relatedGuides: [
      "spain-university-application-student-visa",
      "germany-vs-france-vs-spain-vs-portugal",
    ],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Work and post-study options depend on the current study-stay or residence rules, the activity, and any authorisation. Check Spain's live migration guidance before accepting work.",
    scholarships: [
      "University awards",
      "Regional and national programmes",
      "Erasmus-related opportunities where eligible",
    ],
    faqs: [
      {
        q: "Do I need UNEDasiss?",
        a: "It depends on the university, degree level, and prior education system. Use the university's current admissions page and UNEDasiss guidance before starting the credential process.",
      },
      {
        q: "Can I study in Spain in English?",
        a: "Yes, some programmes are taught in English. Verify the teaching and assessment language for every year and module, plus language expectations for placements.",
      },
      {
        q: "How do I check whether the degree is recognised?",
        a: "Confirm the awarding university and whether the programme is an official qualification. For regulated careers, check the professional recognition route as well.",
      },
      {
        q: "What financial evidence is required?",
        a: "Use the live Spanish migration and consular guidance for the current calculation and accepted evidence, then contact Earthlink for a document review.",
      },
      {
        q: "Can students work in Spain?",
        a: "Conditions depend on current law, study status, the activity, and the student's permission. Check the live official rules before working.",
      },
    ],
  },
  {
    slug: "portugal",
    name: "Portugal",
    short:
      "Compare Portuguese university entry, qualification recognition, programme language, and the current higher-education residence route.",
    eyebrow: "Study in",
    headline: "Portugal",
    intro:
      "Portugal offers public and private higher education, programmes in Portuguese and English, and distinct admissions routes for international applicants. Earthlink helps verify the programme, institution, application, and residence process.",
    heroImage: heroFor("1555881400-74d7acaacd8b"),
    landmark: "cliffs",
    whyStudy: [
      {
        title: "International applicant route",
        body: "DGES explains the national framework, while institutions publish their own programme entry and selection rules.",
      },
      {
        title: "Public and private choices",
        body: "Universities and polytechnics have different course profiles. Compare curriculum, recognition, teaching, and outcomes.",
      },
      {
        title: "Language choice",
        body: "English-taught programmes exist, but applicants should check module language, assessment, placements, and daily-life needs.",
      },
      {
        title: "Distinct residence process",
        body: "Admission and residence are separate stages. AIMA publishes the live higher-education residence guidance.",
      },
    ],
    education:
      "Compare universities and polytechnics, public and private institutions, and the exact qualification. Verify recognition, credits, teaching language, campus, application rules, and professional status where relevant.",
    documents: [
      "Passport and identity documents",
      "Academic records and any recognition or equivalence documents",
      "Language evidence required by the programme",
      "Programme-specific motivation, CV, references, or portfolio",
      "Admission evidence",
      "Current residence financial, insurance, accommodation, and other supporting documents",
    ],
    intakes: ["Autumn", "Other starts where offered"],
    courses: [
      "Business",
      "Engineering",
      "Tourism and hospitality",
      "Computer science",
      "Arts and design",
    ],
    budget: [
      {
        title: "Tuition and institutional charges",
        guidance:
          "Use the exact institution's live programme and international-student pages for tuition, application, enrolment, materials, and refund terms.",
      },
      {
        title: "Living and travel",
        guidance:
          "Plan by city for housing, transport, food, insurance, study materials, and arrival costs.",
      },
      {
        title: "Residence and financial evidence",
        guidance:
          "Use AIMA's live higher-education guidance for current requirements and accepted evidence.",
      },
    ],
    directAnswer:
      "Portugal can suit applicants who find the right university or polytechnic programme and verify its language, recognition, application rules, and city context. Use DGES for the higher-education framework and AIMA for the current residence stage.",
    applicantFit: [
      "Applicants ready to compare university and polytechnic programmes",
      "Students who will verify teaching language and qualification recognition",
      "Applicants prepared to follow institution-specific admissions and a separate residence process",
    ],
    programmeChecks: [
      "Confirm the provider, exact qualification, credits, and awarding authority",
      "Check language, campus, curriculum, assessment, and placement terms",
      "For regulated careers, verify professional recognition before applying",
    ],
    applicationRoute: [
      "Research the programme through DGES and the institution",
      "Follow the institution's stated international application route",
      "Complete academic, recognition, language, and programme documents",
      "After admission, follow AIMA's live higher-education residence guidance",
    ],
    nationalityNotes: [
      {
        title: "International-student status",
        body: "Admission categories and document recognition can differ by citizenship, residence, prior education, and any applicable bilateral or EU status. Confirm the institution's category before applying.",
      },
    ],
    sources: [COUNTRY_SOURCES.portugalAdmission, COUNTRY_SOURCES.portugalResidence],
    relatedDestinations: ["spain", "france", "germany", "europe"],
    relatedGuides: [
      "portugal-university-application-residence",
      "germany-vs-france-vs-spain-vs-portugal",
    ],
    reviewedAt: "2026-08-25",
    reviewNotice: CONTENT_REVIEW_NOTICE,
    workRights:
      "Student work and post-study residence depend on current Portuguese law, residence status, study conditions, and any required authorisation. Check AIMA and other official sources before relying on employment.",
    scholarships: [
      "Institutional awards",
      "Portuguese and international funding programmes",
      "Erasmus-related opportunities where eligible",
    ],
    faqs: [
      {
        q: "Do I apply through DGES?",
        a: "DGES explains the national international-student framework, while institutions publish the exact application route and selection rules. Follow the programme's current instructions.",
      },
      {
        q: "Should I choose a university or polytechnic?",
        a: "Choose by curriculum, teaching approach, facilities, recognition, placements, and career fit. The institution label alone does not decide quality for a specific applicant.",
      },
      {
        q: "Can I study in Portugal in English?",
        a: "English-taught programmes exist. Verify the language for every module, assessment, placement, and later year of the course.",
      },
      {
        q: "What financial evidence is required?",
        a: "Use AIMA and the relevant consular guidance for the current calculation and accepted documents. Contact Earthlink for a profile-specific review.",
      },
      {
        q: "Can students work in Portugal?",
        a: "Conditions depend on the current residence rules and the student's circumstances. Check the live official guidance before accepting work.",
      },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    short: "Hub-of-the-Gulf education, low tax, strong post-study work routes.",
    eyebrow: "Study in the",
    headline: "United Arab Emirates",
    intro:
      "Branch campuses of UK and US universities, plus strong domestic institutions in Dubai, Sharjah, and Abu Dhabi.",
    heroImage: heroFor("1512453979798-5ea266f8880c"),
    landmark: "burj",
    whyStudy: [
      {
        title: "Global campus presence",
        body: "Heriot-Watt, Middlesex, Birmingham, NYU Abu Dhabi — degree from the home university, awarded in the UAE.",
      },
      {
        title: "Post-study Green Visa",
        body: "Six-month job seeker visa, with longer Golden Visa options for top graduates.",
      },
      {
        title: "Tax-free salaries",
        body: "Graduate starting salaries in Dubai are competitive and untaxed.",
      },
    ],
    education:
      "Mostly four-year Bachelors and one to two-year Masters. Many programmes taught on a UK or US calendar.",
    documents: [
      "Transcripts attested by MOFA",
      "IELTS / TOEFL",
      "Passport and visa photo",
      "Medical fitness test on arrival",
      "Sponsorship documents",
    ],
    intakes: ["September", "January"],
    courses: [
      "Business & Finance",
      "Hospitality & Tourism",
      "Aviation",
      "Engineering",
      "Computer Science",
    ],
    budget: [
      {
        title: "Tuition and campus charges",
        guidance:
          "Use the institution's live course page and confirm whether the award, campus, deposit, and compulsory charges match the offer.",
      },
      {
        title: "Living and travel",
        guidance:
          "Compare housing, transport, food, insurance, and travel across Dubai, Sharjah, and Abu Dhabi.",
      },
      {
        title: "Visa and sponsorship",
        guidance:
          "Confirm current charges and sponsorship arrangements with the institution and relevant UAE authority.",
      },
    ],
    workRights:
      "Part-time work permitted with employer sponsorship. Post-graduation Green or Golden Visa unlocks open work rights.",
    scholarships: ["University merit awards", "Sheikh Mohammed bin Rashid scholarships"],
    faqs: [
      {
        q: "Is a UAE branch-campus degree valid back home?",
        a: "Yes — the awarding body is the home university (UK, US, Australia), so the degree certificate is identical to the one issued on the main campus. It's recognised by UGC, WES, and NARIC evaluations.",
      },
      {
        q: "Can international students work part-time in the UAE?",
        a: "Yes, with employer sponsorship and a student work permit issued through MOHRE. Free-zone universities (Dubai Knowledge Park, Dubai International Academic City) handle the paperwork through the university.",
      },
      {
        q: "What is the Green Visa and how do I qualify after graduation?",
        a: "Eligibility depends on the current UAE route, qualification, employment, and other criteria. Check the live authority guidance before treating it as a post-study plan.",
      },
      {
        q: "Can I get a Golden Visa as a student?",
        a: "Top-ranked graduates (GPA 3.5+ from Grade A universities, or 3.8+ from Grade B) can apply for a 10-year Golden Visa immediately after graduation. We help students target the eligible institutions from day one.",
      },
      {
        q: "How much does it cost to study in Dubai?",
        a: "Compare the current course fee and compulsory charges with a location-specific housing, transport, food, insurance, and travel plan. Ask Earthlink for a current comparison based on your shortlist.",
      },
      {
        q: "Do UAE universities accept Indian and Pakistani boards directly?",
        a: "Yes — CBSE, ICSE, State Boards, and Pakistani HSSC/FSc are accepted with attestation from the country of origin, the UAE embassy, and MOFA Dubai. We handle the attestation chain.",
      },
    ],
  },
];

export const destBySlug = (slug: string) => DESTINATIONS.find((d) => d.slug === slug);
