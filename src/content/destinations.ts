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
  costs: { tuition: string; living: string; visa: string };
  workRights: string;
  scholarships: string[];
  faqs: { q: string; a: string }[];
  landmark: string; // for 3D scene
  source?: { title: string; version: string; href?: string };
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
        body: "Most taught Masters finish in 12 months — half the tuition of equivalent US programmes.",
      },
      {
        title: "Globally ranked",
        body: "Four of the world's top ten universities and over 150 institutions with strong international placement.",
      },
      {
        title: "Direct UK office support",
        body: "We're in Harrow. Walk-in document checks, in-person CAS handover, and post-arrival help.",
      },
      {
        title: "Pathways for every profile",
        body: "Foundation, top-up, PG Diploma, and direct entry — we'll pick the route your transcript actually qualifies for.",
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
    costs: {
      tuition: "£12,000 – £28,000 per year",
      living:
        "Up to £10,539 outside London or £13,761 in London under the Student visa maintenance rule",
      visa: "£558 application fee + Immigration Health Surcharge",
    },
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
    short: "Research depth, generous funding, the deepest job market in the world.",
    eyebrow: "Study in the",
    headline: "United States",
    intro:
      "STEM-OPT, research assistantships, and the broadest course catalogue on the planet. We handle profile shortlisting, SOP, and the F1 interview prep that actually matters.",
    heroImage: heroFor("1485871981521-5b1fd3805eee"),
    landmark: "liberty",
    whyStudy: [
      {
        title: "STEM OPT — 3 years",
        body: "Twelve months OPT plus a 24-month STEM extension means three years of legal work post-degree.",
      },
      {
        title: "Assistantships & funding",
        body: "RA/TA positions can cover tuition plus a stipend — common at the PhD level and selective at Masters.",
      },
      {
        title: "Course flexibility",
        body: "Take electives outside your major. Switch concentrations after a semester. The system rewards exploration.",
      },
      {
        title: "Research output",
        body: "More patents, more publications, more lab funding than any other study destination.",
      },
    ],
    education:
      "Four-year Bachelors, two-year Masters (mostly), PhDs of 4–6 years. Credit system means part-time and acceleration are both possible.",
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
    costs: {
      tuition: "$18,000 – $58,000 per year",
      living: "$12,000 – $20,000 per year",
      visa: "$185 + $350 SEVIS",
    },
    workRights:
      "On-campus 20 hrs/week from day one. CPT during studies, OPT for 12 months after, plus 24-month STEM extension.",
    scholarships: [
      "Fulbright (foreign students)",
      "University assistantships",
      "Inlaks & need-based aid",
      "External fellowships per field",
    ],
    faqs: [
      {
        q: "Do I need the GRE for a US Masters in 2026?",
        a: "Many top-tier universities have permanently waived the GRE for Masters programmes in CS, DS, and Analytics. We confirm waiver status per programme before you spend $220 on the exam.",
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
        a: "One full year of tuition plus living expenses, typically $45,000–$75,000. Funds can be liquid assets, education loans (sanctioned), or a mix. Property is not accepted as F1 evidence.",
      },
      {
        q: "What is STEM OPT and which courses qualify?",
        a: "STEM OPT is a 24-month extension on top of the standard 12-month OPT for graduates of DHS-designated STEM programmes — CS, DS, Analytics, Engineering, and most Applied Maths programmes qualify. Business Analytics increasingly qualifies; MBA does not.",
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
        body: "Most diplomas under CAD 18,000/year; degrees CAD 18–35k/year.",
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
    costs: {
      tuition: "CAD 15,000 – CAD 35,000 per year",
      living:
        "From CAD 22,895 for one applicant (IRCC living-cost minimum; tuition and travel excluded, Quebec differs)",
      visa: "CAD 150 + biometrics CAD 85",
    },
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
        a: "For applications made on or after 1 September 2025, one applicant studying outside Quebec must show CAD 22,895 for first-year living expenses, plus first-year tuition and transportation. For programmes longer than one year, applicants must also explain how they plan to fund the remaining period. Quebec sets separate amounts, and IRCC updates these figures annually.",
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
    costs: {
      tuition: "AUD 22,000 – AUD 50,000 per year",
      living: "AUD 29,710 for 12 months (current Student visa living-cost minimum)",
      visa: "From AUD 2,500 for a primary Subclass 500 applicant from 1 July 2026; concessions may apply",
    },
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
        a: "If Home Affairs asks for financial evidence, calculate at least AUD 29,710 for 12 months of the student’s living costs, plus travel and up to 12 months of tuition, with additional amounts for accompanying family. The document checklist determines which evidence must be attached.",
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
      "Financial evidence €10,000+",
      "Passport",
      "Medical and TB screening",
    ],
    intakes: ["September", "January (limited)"],
    courses: ["MSc Data Analytics", "International Business", "Pharma & Biotech", "Cybersecurity"],
    costs: {
      tuition: "€10,000 – €25,000 per year",
      living: "€10,000 – €13,000 per year",
      visa: "€60 single entry, €100 multi",
    },
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
        a: "You must show €10,000 for the first year on top of the tuition fee, either as a bank balance or an approved study-abroad loan.",
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
      "Plan a Malta study route with the official national-visa checklist: timing, enrolment evidence, funds, insurance, travel, accommodation, and fees.",
    eyebrow: "Study in",
    headline: "Malta",
    intro:
      "A Mediterranean study destination with a detailed national-visa checklist for courses lasting more than 90 days. This guide follows Identità Central Visa Unit Version 2.1 dated 13 August 2025.",
    heroImage: heroFor("1514222134-b57cbb8ce073"),
    landmark: "cliffs",
    whyStudy: [
      {
        title: "Official 12-part checklist",
        body: "The Central Visa Unit sets out the required form, passport, enrolment, funds, insurance, travel, accommodation, and supporting documents.",
      },
      {
        title: "Plan at least 9 weeks ahead",
        body: "The supplied checklist says the application must be submitted at least nine weeks before the course begins.",
      },
      {
        title: "Clear financial evidence",
        body: "Applicants provide three months of bank statements plus a recent bank certificate showing funds for the stay.",
      },
      {
        title: "MFHEA course verification",
        body: "The enrolment letter must identify the registered institution, course, MQF level, ECTS, duration, schedule, and lecture address.",
      },
    ],
    education:
      "Choose a programme at an institution registered with the Malta Further and Higher Education Authority (MFHEA). The enrolment letter must state the full course name, MQF level, ECTS, duration, study mode, hiatus periods, weekly and contact hours, and teaching address.",
    documents: [
      "Completed and signed visa application form",
      "Passport valid for at least 10 months",
      "One ICAO-standard passport photo",
      "VFS appointment letter; apply at least 9 weeks before the course",
      "Detailed MFHEA institution enrolment letter and proof of payment",
      "Last 3 months of bank statements plus a recent bank certificate",
      "Sponsor documents where applicable: statements, declaration, and ID",
      "Copy of the international bank card used to access funds in Malta",
      "Schengen-valid medical and travel insurance with at least €30,000 cover",
      "Full flight itinerary and return ticket where the course is under 6 months",
      "Accommodation in the applicant's name for at least the first 14 nights",
      "Additional legalised and translated documents for applicants under 18",
    ],
    intakes: ["Institution-dependent; allow at least 9 weeks for the visa application"],
    courses: ["MFHEA-registered programmes", "MQF Level 5 and above", "MQF Level 4 and below"],
    costs: {
      tuition: "Institution and course-dependent",
      living: "Show at least 75% of Malta's national minimum wage for each month of study",
      visa: "Age 12+: €100 standard or €150 extended; lower age bands apply",
    },
    workRights:
      "The supplied Central Visa Unit checklist does not state student work rights. Confirm current conditions with the official Maltese authorities before relying on employment income.",
    scholarships: [
      "Check awards offered by the chosen MFHEA-registered institution",
      "Confirm current national schemes through official Maltese sources",
    ],
    faqs: [
      {
        q: "When should I submit a Malta student national-visa application?",
        a: "The supplied Central Visa Unit checklist says to submit at least nine weeks before the course commencement date.",
      },
      {
        q: "What must the Malta school enrolment letter include?",
        a: "It must identify the MFHEA-registered institution, full course name, MQF level, ECTS, course duration and mode, hiatus periods, weekly and contact hours, lecture address, and proof of payment.",
      },
      {
        q: "How much money must I show?",
        a: "The checklist requires three months of bank statements and a recent bank certificate showing funds equal to at least 75% of the national minimum wage for every month of study. Sponsor evidence is also required where relevant.",
      },
      {
        q: "What insurance is required?",
        a: "Insurance must cover the Schengen area, be valid for study, and provide at least €30,000 medical cover. MQF Level 5+ applicants eligible for a residence permit need at least 91 consecutive days; MQF Level 4 and below need cover for the full stay.",
      },
      {
        q: "What accommodation proof is accepted?",
        a: "Provide at least the first 14 consecutive nights in the applicant's name. The checklist permits documented school accommodation, a registered lease, notarised free-host accommodation with supporting evidence, or a hotel or short-term booking.",
      },
      {
        q: "Do all documents have to be in English?",
        a: "Yes. The checklist says all documents must be submitted in English and translations must come from the approved list of authorised translators.",
      },
      {
        q: "What are the visa fees?",
        a: "For applicants aged 12+, the supplied checklist lists €100 for a standard appointment and €150 for an extended next-day appointment. Ages 6–11 are €50 and ages 0–5 are free. Check current fees before applying.",
      },
    ],
    source: {
      title:
        "Identità Central Visa Unit — Documentation Required for Student National Visa (more than 90 days)",
      version: "Version 2.1 dated 13 August 2025",
      href: "/malta-student-national-visa-checklist.pdf",
    },
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
      "Financial evidence NZD 20,000/year",
      "Medical and chest X-ray",
    ],
    intakes: ["February", "July"],
    courses: [
      "Construction Management",
      "Information Technology",
      "Healthcare",
      "Agriculture & Environment",
    ],
    costs: {
      tuition: "NZD 22,000 – NZD 35,000 per year",
      living: "NZD 20,000 per year",
      visa: "From NZD 850 for a Fee Paying Student Visa",
    },
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
        a: "NZD 20,000 per year in living costs (INZ rule) plus one year of tuition. Funds must be held in your account, a parent's account, or as part of an approved education loan.",
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
      "Low or zero tuition in Germany, Czech Republic, Poland, Portugal, Lithuania and beyond.",
    eyebrow: "Study in",
    headline: "Europe",
    intro:
      "If budget is the constraint, mainland Europe is where the maths starts to work. Public universities in Germany, Czech Republic, Poland, and Portugal offer English-taught programmes at a fraction of UK fees.",
    heroImage: heroFor("1467269204594-9661b134dd2b"),
    landmark: "eiffel",
    whyStudy: [
      {
        title: "Low or no tuition",
        body: "Germany public universities charge admin fees only. Portugal, Poland, Czech Republic and Lithuania run programmes under €4,000/year.",
      },
      {
        title: "Schengen access",
        body: "Travel, internships, and conferences across 27 countries on a single residence permit.",
      },
      {
        title: "English-taught programmes",
        body: "Hundreds of Bachelors and Masters fully in English — no German or Polish required.",
      },
      {
        title: "Post-study stay",
        body: "Germany offers an 18-month job-seeker visa after graduation; most EU countries offer 9–12 months.",
      },
    ],
    education:
      "Bologna-aligned: three-year Bachelors, two-year Masters across all EU member states.",
    documents: [
      "Transcripts (apostilled)",
      "English/German proficiency",
      "Motivation letter",
      "APS certificate (for Germany)",
      "Blocked account / financial evidence",
    ],
    intakes: ["September / October", "February / March"],
    courses: [
      "Engineering (Germany)",
      "Computer Science",
      "International Business",
      "Architecture",
      "Medicine (selected)",
    ],
    costs: {
      tuition: "€0 – €6,000 per year (public)",
      living: "€800 – €1,200 per month",
      visa: "€75 – €100",
    },
    workRights:
      "Typically 20 hrs/week during term across EU member states. 18-month Job Seeker visa in Germany after graduation.",
    scholarships: [
      "DAAD (Germany)",
      "Erasmus Mundus",
      "Eiffel Excellence (France)",
      "National-government bursaries",
    ],
    faqs: [
      {
        q: "Is Germany really free for international students?",
        a: "Most public universities are tuition-free at Bachelors level for all nationalities. Some Masters programmes charge, and Baden-Württemberg charges €1,500 per semester for non-EU students. Semester contributions of €150–€350 still apply everywhere.",
      },
      {
        q: "Do I need to speak German to study in Europe?",
        a: "Not for the hundreds of English-taught Bachelors and Masters programmes in Germany, Netherlands, Poland, Czech Republic, and the Nordics. A2-level German unlocks part-time work and cheaper daily life.",
      },
      {
        q: "What is the German blocked account (Sperrkonto) and how much do I need?",
        a: "€11,904 per year (2024 rate) held in a Sperrkonto through Fintiba, Expatrio, or Deutsche Bank. The account releases €992 per month once you arrive.",
      },
      {
        q: "Which European country is cheapest for international students?",
        a: "Poland, Lithuania, Czech Republic, and Portugal offer public tuition under €4,000/year with living costs of €500–€800/month. Germany and Norway offer tuition-free public options with higher living costs.",
      },
      {
        q: "What is the 18-month Job Seeker Visa in Germany?",
        a: "After graduating from a recognised German university you get an 18-month residence permit to look for a job matching your qualifications. Any employment (including non-degree-related) is allowed during this period.",
      },
      {
        q: "Can I transfer between EU universities under Erasmus?",
        a: "Yes — Erasmus+ mobility lets enrolled students spend 3–12 months at a partner university and transfer credits automatically. Erasmus Mundus Joint Masters cover 2 years across multiple countries.",
      },
      {
        q: "Do European degrees lead to Blue Card and EU permanent residency?",
        a: "Yes — an EU degree plus a qualifying job (salary threshold varies by country) qualifies you for the EU Blue Card, with permanent residency after 21–33 months depending on language level.",
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
    costs: {
      tuition: "AED 35,000 – AED 95,000 per year",
      living: "AED 4,000 – AED 7,000 per month",
      visa: "AED 3,000 – AED 5,000 (student route)",
    },
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
        a: "The Green Visa gives 5 years of self-sponsored residency to graduates of accredited UAE universities with a Bachelors or higher and a minimum monthly income of AED 15,000, or a valid job offer.",
      },
      {
        q: "Can I get a Golden Visa as a student?",
        a: "Top-ranked graduates (GPA 3.5+ from Grade A universities, or 3.8+ from Grade B) can apply for a 10-year Golden Visa immediately after graduation. We help students target the eligible institutions from day one.",
      },
      {
        q: "How much does it cost to study in Dubai?",
        a: "Tuition ranges from AED 35,000 to AED 95,000 per year, with living costs of AED 4,000–7,000 per month in shared accommodation. Sharjah and Ajman are 30–40% cheaper than Dubai.",
      },
      {
        q: "Do UAE universities accept Indian and Pakistani boards directly?",
        a: "Yes — CBSE, ICSE, State Boards, and Pakistani HSSC/FSc are accepted with attestation from the country of origin, the UAE embassy, and MOFA Dubai. We handle the attestation chain.",
      },
    ],
  },
];

export const destBySlug = (slug: string) => DESTINATIONS.find((d) => d.slug === slug);
