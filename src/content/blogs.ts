import { COUNTRY_SOURCES, type SourceRef } from "./authority";

export type BlogQuestionSection = {
  question: string;
  answer: string;
  points?: string[];
};

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  category: "UK" | "USA" | "Canada" | "Australia" | "Visa" | "Scholarships" | "Careers" | "Guides";
  author: string;
  date: string; // ISO
  updatedAt?: string;
  readMinutes: number;
  cover: string;
  coverCaption?: string;
  tags: string[];
  body: string[]; // paragraphs (markdown-lite)
  questionSections?: BlogQuestionSection[];
  sources?: SourceRef[];
  updateNotice?: string;
  relatedDestinations?: string[];
};

export const BLOG_CATEGORIES: Blog["category"][] = [
  "UK",
  "USA",
  "Canada",
  "Australia",
  "Visa",
  "Scholarships",
  "Careers",
  "Guides",
];

export const BLOGS: Blog[] = (
  [
    {
      slug: "uk-graduate-route-2026",
      title: "UK Graduate Route in 2026: What international students need to know",
      excerpt:
        "A practical guide to Graduate Route eligibility, timing, work planning, and the checks to make before applying.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-06-18",
      updatedAt: "2026-08-25",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "UK Graduate Route in 2026: What international students need to know",
      tags: ["Graduate Route", "Post-Study Work", "UK"],
      body: [
        "The Graduate Route is a post-study immigration route for eligible graduates who have successfully completed an eligible UK qualification and meet the rules in force when they apply. It is not tied to a sponsoring employer, but eligibility depends on your course, provider, current permission, location, and the university's reporting.",
        "Do not treat an old article or another student's permission as your rulebook. Check the live GOV.UK guidance before you plan travel, submit an application, or accept work that could affect your status.",
        "Use the route as a structured career period. Start employer research before graduation, keep an evidence-based application tracker, and compare roles by skills gained, progression, and any future immigration requirements.",
        "Earthlink can support university and career planning. Stonebridge Legal Solutions alone provides UK immigration advice and handles Graduate Route or Skilled Worker applications for Earthlink clients.",
      ],
      questionSections: [
        {
          question: "Who should check Graduate Route eligibility?",
          answer:
            "Every prospective applicant should check the live rules, even if classmates appear eligible. Qualification type, provider reporting, current immigration status, and where you apply can all matter.",
        },
        {
          question: "When should I prepare?",
          answer:
            "Begin before course completion. Confirm the university reporting process, review your passport and digital status details, and plan around the application window shown in the official guidance.",
        },
        {
          question: "Does the Graduate Route guarantee a sponsored job later?",
          answer:
            "No. It can provide time to build experience, but later immigration eligibility is separate. Research realistic roles and seek regulated advice before relying on a future route.",
        },
      ],
      sources: [COUNTRY_SOURCES.ukGraduateVisa, COUNTRY_SOURCES.ukStudentVisa],
      updateNotice:
        "Graduate Route and Student route rules can change. Confirm the current position on GOV.UK and contact Earthlink before making study or career decisions.",
      relatedDestinations: ["uk"],
    },
    {
      slug: "sop-that-actually-works",
      title: "The SOP that actually works: a UK admissions officer's checklist",
      excerpt:
        "Forget generic templates. Here's what a Russell Group reviewer looks for in the first 90 seconds.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-30",
      readMinutes: 9,
      cover:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "The SOP that actually works: a UK admissions officer's checklist",
      tags: ["SOP", "Applications", "Writing"],
      body: [
        "A strong Statement of Purpose answers three questions in order: why this subject, why this university, and why now. Everything else is supporting evidence.",
        "Open with a specific moment, not a quote. Tie every paragraph back to a module, a professor's research, or a lab at the target university. Close with what you'll do in the first 12 months after graduation.",
        "Length: 800–1000 words for most UK programmes. Cut every sentence that could apply to any applicant.",
      ],
    },
    {
      slug: "canada-pgwp-changes",
      title: "Canada PGWP changes: which programmes still qualify",
      excerpt:
        "IRCC tightened the Post-Graduation Work Permit list. Check your programme before you apply.",
      category: "Canada",
      author: "Earthlink Editorial",
      date: "2026-05-12",
      readMinutes: 6,
      cover:
        "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Canada PGWP changes: which programmes still qualify",
      tags: ["PGWP", "Canada", "IRCC"],
      body: [
        "As of 2025, PGWP eligibility for college programmes is tied to a field-of-study list aligned with Canada's labour shortages. University degree programmes are largely unaffected.",
        "Before you accept a college offer, cross-check the CIP code against the IRCC eligible field list. A wrong programme choice can cost you the work permit entirely.",
      ],
    },
    {
      slug: "us-f1-visa-interview-prep",
      title: "US F-1 visa interview: 12 questions you must rehearse",
      excerpt:
        "Consular officers decide in under three minutes. Be ready for the ties, funds, and intent questions.",
      category: "Visa",
      author: "Earthlink Editorial",
      date: "2026-04-22",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "US F-1 visa interview: 12 questions you must rehearse",
      tags: ["F-1", "USA", "Visa Interview"],
      body: [
        "The officer is testing three things: genuine student intent, financial capacity, and ties to your home country. Every answer should reinforce at least one.",
        "Practise out loud. Keep answers to two sentences. Carry your I-20, financial documents, and SEVIS receipt on top of the file.",
      ],
    },
    {
      slug: "chevening-vs-commonwealth",
      title: "Chevening vs Commonwealth: which UK scholarship fits you?",
      excerpt:
        "Both are fully funded. The selection criteria and eligible countries differ sharply.",
      category: "Scholarships",
      author: "Earthlink Editorial",
      date: "2026-04-05",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Chevening vs Commonwealth: which UK scholarship fits you?",
      tags: ["Chevening", "Commonwealth", "UK Scholarships"],
      body: [
        "Chevening favours mid-career professionals with 2+ years of work experience and clear leadership potential. Commonwealth prioritises developmental impact and academic merit.",
        "Chevening applications open in August; Commonwealth timelines vary by country. Start your reference conversations three months before the deadline, not three weeks.",
      ],
    },
    {
      slug: "australia-500-visa-financials",
      title: "Australia Subclass 500: getting your financials right the first time",
      excerpt: "The Genuine Student test now weighs financial evidence more heavily than ever.",
      category: "Australia",
      author: "Earthlink Editorial",
      date: "2026-03-18",
      readMinutes: 6,
      cover:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Australia Subclass 500: getting your financials right the first time",
      tags: ["Subclass 500", "Australia", "GS"],
      body: [
        "If Home Affairs asks for financial evidence, use the current document checklist to identify the tuition, living-cost, and travel evidence that applies to your case. Check the live official figures rather than relying on an amount copied from an older guide.",
        "Loan letters are accepted but must come from an approved financial institution and specify disbursement terms.",
      ],
    },
    {
      slug: "career-after-msc-uk",
      title: "Career after an MSc in the UK: routes that beat the salary threshold",
      excerpt:
        "How to research graduate roles while checking the live Skilled Worker requirements that apply to your occupation.",
      category: "Careers",
      author: "Earthlink Editorial",
      date: "2026-02-27",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Career after an MSc in the UK: routes that beat the salary threshold",
      tags: ["Skilled Worker", "Salary Threshold", "UK Jobs"],
      body: [
        "Technology, financial services, healthcare, and engineering routinely pay above threshold for graduate roles. Marketing, HR, and generalist consulting often do not.",
        "New-entrant discounts and shortage-occupation reductions apply for many roles — check the Immigration Salary List before ruling out an offer.",
        "Earthlink can help jobseekers research suitable employers, improve their CV, and prepare for interviews. Stonebridge Legal Solutions alone provides UK immigration advice and handles any visa application.",
      ],
    },
    {
      slug: "ielts-vs-pte-2026",
      title: "IELTS vs PTE Academic in 2026: which test to pick",
      excerpt:
        "Both are accepted by nearly every UK, Australian, and Canadian institution. The right pick depends on your strengths.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-02-08",
      readMinutes: 5,
      cover:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "IELTS vs PTE Academic in 2026: which test to pick",
      tags: ["IELTS", "PTE", "English Test"],
      body: [
        "PTE is computer-scored, faster to book, and results arrive within 48 hours. IELTS is human-scored with a wider global footprint and stronger Speaking preparation resources.",
        "If you write faster than you speak, PTE usually scores higher. If you handle live conversation well, IELTS Academic can play to your strength.",
      ],
    },
    {
      slug: "study-in-uk-complete-guide-2026",
      title: "Study in UK 2026: Costs, Applications and Visa Overview",
      excerpt:
        "Universities, costs, visas, scholarships, and post-study work — everything you need in one place.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-06-25",
      readMinutes: 12,
      cover:
        "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in UK 2026: Costs, Applications and Visa Overview",
      tags: ["Study in UK", "Guide", "International Students"],
      body: [
        "UK tuition and living costs vary by institution, programme, city, accommodation, and personal circumstances. Build a budget from current university pages, GOV.UK requirements, and realistic housing and travel categories, then contact Earthlink for a current profile-specific check.",
        "Application windows: UCAS opens in September for the following autumn intake. Oxbridge and medicine close in mid-October; most other courses accept until late January, with clearing running through summer.",
        "The Student route requires a CAS, the required financial evidence and English-language evidence where applicable. For the Graduate Route, eligible non-doctoral applications made by 31 December 2026 receive 2 years; applications from 1 January 2027 receive 18 months. Doctoral graduates receive 3 years.",
        "Earthlink may help with the university application. Stonebridge Legal Solutions alone provides UK immigration advice and handles every UK visa form and application.",
      ],
    },
    {
      slug: "study-in-usa-complete-guide",
      title: "Study in USA: university choice, applications, and the F-1 roadmap",
      excerpt:
        "How to compare accredited institutions, build an application plan, prepare funding evidence, and follow the official student-visa process.",
      category: "USA",
      author: "Earthlink Editorial",
      date: "2026-06-20",
      updatedAt: "2026-08-25",
      readMinutes: 11,
      cover:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in USA: Universities, Costs, and F-1 Visa Roadmap",
      tags: ["Study in USA", "F-1 Visa", "Universities"],
      body: [
        "The right US institution is one that is accredited, authorised to enrol international students, academically suitable, and affordable across the full study plan. Compare the programme curriculum, campus setting, support services, internship access, and published graduate outcomes instead of starting with prestige alone.",
        "Admissions requirements vary. Check each institution for academic records, English-language evidence, testing policy, essays, references, portfolio requirements, and deadlines. Do not assume that a test requested by one university is required everywhere.",
        "After an eligible offer, follow the institution and official government process for the Form I-20, financial evidence, SEVIS steps, visa application, and interview. The consular decision is separate from university admission.",
        "Employment during and after study is regulated. Confirm what your status permits with your designated school official and the live Study in the States guidance before accepting any work or practical training.",
      ],
      questionSections: [
        {
          question: "How should I shortlist US universities?",
          answer:
            "Begin with accreditation and programme fit. Then compare entry requirements, teaching format, location, student support, career access, and the complete cost categories published by each institution.",
        },
        {
          question: "Which documents should I prepare?",
          answer:
            "Common categories include academic records, English-language evidence, identity documents, recommendations, written statements, and programme-specific materials. Your university and visa checklist are the controlling sources.",
        },
        {
          question: "Can I work while studying in the USA?",
          answer:
            "Some employment or practical-training options may be available, but the conditions are specific to student status and authorisation. Speak with the designated school official before beginning work.",
        },
        {
          question: "How do I plan changing costs?",
          answer:
            "Use current institution estimates and official fee pages for tuition, insurance, housing, travel, visa-related charges, and financial evidence. Contact Earthlink for a current comparison based on your shortlist.",
        },
      ],
      sources: [COUNTRY_SOURCES.usaEducation, COUNTRY_SOURCES.usaVisa, COUNTRY_SOURCES.usaWork],
      updateNotice:
        "Admission, visa, employment, and financial-evidence requirements can change. Confirm the current position with your institution and the relevant US authority.",
      relatedDestinations: ["usa"],
    },
    {
      slug: "study-in-canada-complete-guide",
      title: "Study in Canada: Study permits, PGWP, and pathways after graduation",
      excerpt:
        "Canada’s regular study-permit process, financial evidence, work rights and PGWP eligibility for international students.",
      category: "Canada",
      author: "Earthlink Editorial",
      date: "2026-06-15",
      readMinutes: 10,
      cover:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in Canada: Study permits, PGWP, and pathways after graduation",
      tags: ["Canada", "Study Permit", "PGWP", "Post-Study Options"],
      body: [
        "New applications use Canada’s regular study-permit process. Applicants must show funds for tuition, living expenses and return travel; a GIC is one accepted form of evidence, not a mandatory route requirement.",
        "Graduating from a designated learning institution does not automatically make a student eligible for a PGWP. Current rules can include language and, for some non-degree programmes, field-of-study requirements. Permit length depends on qualification level and programme length; a qualifying master’s programme of at least eight months may lead to a three-year PGWP.",
        "A PGWP does not guarantee permanent residence. Graduates must qualify separately for Express Entry or a provincial programme under the rules in force when they apply.",
      ],
    },
    {
      slug: "study-in-australia-complete-guide",
      title: "Study in Australia: Group of Eight, costs, and 485 visa",
      excerpt:
        "Australia's top universities, tuition, GS requirements, and post-study work rights.",
      category: "Australia",
      author: "Earthlink Editorial",
      date: "2026-06-10",
      readMinutes: 10,
      cover:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in Australia: Group of Eight, costs, and 485 visa",
      tags: ["Australia", "Group of Eight", "485 Visa"],
      body: [
        "The Group of Eight includes major research universities, but course fit, accreditation, location, teaching format, and the institution's current cost pages should drive your shortlist.",
        "The Genuine Student (GS) test replaced GTE in 2024. Answer clearly why this course, why Australia, and what you plan next — vague answers get refused.",
        "Subclass 485 duration depends on stream and qualification. Post-Vocational Education Work is up to 18 months; Post-Higher Education Work is generally 2 years for bachelor’s and coursework master’s qualifications and 3 years for research master’s and doctoral qualifications. Eligible regional graduates may separately qualify for a 1- or 2-year second visa.",
      ],
    },
    {
      slug: "study-in-ireland-guide",
      title: "Study in Ireland: Trinity, UCD, and the Third Level Graduate Scheme",
      excerpt:
        "English-taught degrees, EU-adjacent lifestyle, and a 2-year post-study work permit.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-06-05",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in Ireland: Trinity, UCD, and the Third Level Graduate Scheme",
      tags: ["Ireland", "Trinity", "Post-Study Work"],
      body: [
        "Ireland offers a 24-month Third Level Graduate Scheme for master's and PhD graduates — one of the longest in Europe. Undergraduate graduates get 12 months.",
        "Tuition and living costs vary by institution, programme, city, and housing choice. Check current university and official immigration sources, then contact Earthlink for a current budget review.",
      ],
    },
    {
      slug: "study-in-new-zealand-guide",
      title: "Study in New Zealand: quality of life meets post-study work",
      excerpt:
        "Eight government-funded universities, work rights, and a clear pathway to residency.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-28",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in New Zealand: quality of life meets post-study work",
      tags: ["New Zealand", "Post-Study Work", "Residency"],
      body: [
        "New Zealand's universities offer a broad range of programmes. Compare programme accreditation, teaching format, location, career support, and current institution cost information before deciding.",
        "Post-study work visa duration matches your qualification: up to 3 years for bachelor's and above. Skilled Migrant Category offers a direct residency route for graduates on the Green List.",
      ],
    },
    {
      slug: "study-in-germany-free-tuition",
      title: "Study in Germany: the public tuition model and study costs explained",
      excerpt:
        "Why 'free tuition' is an incomplete description, which exceptions to check, and how to plan the full cost of study.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-22",
      updatedAt: "2026-08-25",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Study in Germany: free tuition and Blocked Account explained",
      tags: ["Germany", "Tuition Model", "Study Costs"],
      body: [
        "The phrase 'free tuition' can hide important differences. Many public programmes follow a low-tuition model, but the institution, federal state, degree type, study history, and programme can create exceptions. Private providers set their own charges.",
        "Every applicant should budget for the categories that sit outside tuition, including semester contributions, health insurance, housing, food, study materials, travel, residence processes, and any programme-specific charges.",
        "For programme verification, use the institution's official page and established German study portals. For visa and financial-evidence requirements, use the live Make it in Germany guidance. Never rely on an amount from an old article or social post.",
        "Earthlink can help compare programmes and build a current planning checklist. The relevant German authority and institution remain the controlling sources for eligibility and costs.",
      ],
      questionSections: [
        {
          question: "Is university study in Germany always tuition-free?",
          answer:
            "No. The model varies by institution, state, programme, and applicant circumstances. Check the official fee page for every programme on your shortlist.",
        },
        {
          question: "What should a Germany study budget include?",
          answer:
            "Plan for institution charges, semester contributions, housing, health insurance, food, local travel, study materials, residence processes, and contingency costs.",
        },
        {
          question: "Do all applicants use the same proof of funds?",
          answer:
            "No. Acceptable evidence and the current requirement depend on the official process and applicant circumstances. Use the live authority guidance and seek advice before transferring funds.",
        },
      ],
      sources: [COUNTRY_SOURCES.germanyProgrammes, COUNTRY_SOURCES.germanyStudy],
      updateNotice:
        "University charges and financial-evidence requirements change. Confirm live figures with the institution and German authority, then contact Earthlink for a current comparison.",
      relatedDestinations: ["germany"],
    },
    {
      slug: "sop-samples-that-got-admits",
      title: "5 SOP samples that got admits to top UK universities",
      excerpt:
        "Real openings, structures, and closings from students admitted to UCL, Imperial, Warwick, and Edinburgh.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-18",
      readMinutes: 10,
      cover:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "5 SOP samples that got admits to top UK universities",
      tags: ["SOP", "Samples", "UK Admissions"],
      body: [
        "Sample 1 (UCL MSc Data Science): opened with a debugging story from an internship. Tied every paragraph to a specific UCL module.",
        "Sample 2 (Imperial MSc Finance): opened with a specific market event. Named two professors and referenced their published work.",
        "Sample 3 (Warwick MSc Business Analytics): led with a failed A/B test and what it taught the applicant about causal inference.",
      ],
    },
    {
      slug: "lor-guide-recommenders",
      title: "Letters of Recommendation: choosing the right recommenders",
      excerpt: "A famous professor who doesn't know you loses to a junior faculty member who does.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-14",
      readMinutes: 6,
      cover:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Letters of Recommendation: choosing the right recommenders",
      tags: ["LOR", "Recommendations", "Applications"],
      body: [
        "Admissions committees can spot a generic LOR in seconds. Pick recommenders who can name a specific project you did, a paper you presented, or a decision you made under pressure.",
        "Give them a one-page brief: the programme, the deadline, three achievements you want highlighted, and your draft SOP for context.",
      ],
    },
    {
      slug: "gre-vs-gmat-2026",
      title: "GRE vs GMAT in 2026: which one for MBA and MS applications?",
      excerpt: "GRE now accepted at 1,300+ business schools. Here's when GMAT still wins.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-08",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "GRE vs GMAT in 2026: which one for MBA and MS applications?",
      tags: ["GRE", "GMAT", "MBA"],
      body: [
        "For MS programmes in STEM, GRE remains the standard. For MBA, the GMAT Focus Edition (2024+) is still the preferred test at M7 schools, though GRE is widely accepted.",
        "GRE quant is easier; GMAT quant tests business logic. If you're stronger in verbal reasoning, GRE usually gives a higher percentile.",
      ],
    },
    {
      slug: "ielts-band-8-strategy",
      title: "IELTS Band 8 strategy: what actually moves your score",
      excerpt: "Speaking and Writing are where most candidates lose points. Here's the fix.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-05-02",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "IELTS Band 8 strategy: what actually moves your score",
      tags: ["IELTS", "Band 8", "Test Prep"],
      body: [
        "Writing Task 2 rewards clear structure over fancy vocabulary. Use a 4-paragraph model: intro, two body paragraphs with a specific example each, and a decisive conclusion.",
        "Speaking Part 2 is where you buy time: use the full minute to plan bullet points, then speak for the full two minutes without pausing to search for perfect words.",
      ],
    },
    {
      slug: "uk-student-visa-checklist",
      title: "UK Student Visa: the complete document checklist",
      excerpt: "CAS, financial evidence, TB test, ATAS — miss one and your application stalls.",
      category: "Visa",
      author: "Earthlink Editorial",
      date: "2026-04-28",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "UK Student Visa: the complete document checklist",
      tags: ["UK Visa", "Checklist", "CAS"],
      body: [
        "Core documents: valid passport, CAS statement, tuition + first year living funds held for 28 consecutive days, English proficiency evidence, and TB test certificate (for most countries).",
        "ATAS certificate is required for research-heavy STEM courses. Start it 3+ months before your visa application — processing can take 4–8 weeks.",
        "This checklist is general information, not individual immigration advice. Stonebridge Legal Solutions alone reviews UK visa evidence and handles every UK immigration application for Earthlink clients.",
      ],
    },
    {
      slug: "us-opt-stem-extension",
      title: "US OPT and STEM OPT extension: your 36 months explained",
      excerpt: "12 months of OPT plus 24 months of STEM extension — how to use them for H-1B odds.",
      category: "USA",
      author: "Earthlink Editorial",
      date: "2026-04-20",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "US OPT and STEM OPT extension: your 36 months explained",
      tags: ["OPT", "STEM OPT", "H-1B"],
      body: [
        "OPT gives 12 months of work authorisation after graduation. STEM-designated degree holders get an additional 24 months by working at an E-Verify employer.",
        "Three H-1B lottery attempts across 36 months significantly improve selection odds. Apply during each March filing window.",
      ],
    },
    {
      slug: "canada-express-entry-crs",
      title: "Canada Express Entry CRS: how graduates hit 470+",
      excerpt:
        "Education, work experience, language, and provincial nomination — the CRS math for international students.",
      category: "Canada",
      author: "Earthlink Editorial",
      date: "2026-04-14",
      readMinutes: 9,
      cover:
        "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Canada Express Entry CRS: how graduates hit 470+",
      tags: ["Express Entry", "CRS", "Canada PR"],
      body: [
        "Baseline for a single 25-year-old with a Canadian master's, CLB 9, and 1 year of Canadian work experience: around 470–490. Add a spouse and it drops slightly; add a PNP nomination and it jumps by 600.",
        "Category-based draws in tech, healthcare, and French language now clear at 430–470 — often below the general draw cutoff.",
      ],
    },
    {
      slug: "russell-group-vs-non-russell",
      title: "Russell Group vs non-Russell Group: does it matter for jobs?",
      excerpt:
        "The 24 research-intensive universities carry brand weight — but not always where you'd expect.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-04-08",
      readMinutes: 6,
      cover:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Russell Group vs non-Russell Group: does it matter for jobs?",
      tags: ["Russell Group", "UK Universities", "Careers"],
      body: [
        "Investment banking, MBB consulting, and Magic Circle law firms recruit predominantly from Russell Group + Oxbridge + LSE. Tech, engineering, and healthcare employers care more about your project portfolio.",
        "Bath, Loughborough, and St Andrews rank comparably in employability despite being outside the Russell Group.",
      ],
    },
    {
      slug: "top-mba-programs-europe",
      title: "How to compare leading MBA programmes in Europe",
      excerpt:
        "A fit-first framework for comparing format, curriculum, career access, location, and verified outcomes.",
      category: "Careers",
      author: "Earthlink Editorial",
      date: "2026-04-02",
      updatedAt: "2026-08-25",
      readMinutes: 10,
      cover:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "How to compare leading MBA programmes in Europe",
      tags: ["MBA", "Europe", "Business School"],
      body: [
        "There is no single best European MBA. The right shortlist depends on your target function, target geography, prior experience, preferred course pace, language plans, and tolerance for career and immigration uncertainty.",
        "Start with the programme's official curriculum and employment report. Compare the evidence behind headline outcomes, including the reporting cohort, response rate, employment definitions, location of roles, and the industries that actually recruited graduates.",
        "Then evaluate access. Look at internship timing, employer events, alumni density in your target market, language expectations, work-authorisation context, and whether the programme format gives you enough time to change sector or location.",
        "Tuition, living costs, scholarships, and salary reports change regularly. Use each school and authority's current pages, model the full cost categories, and ask Earthlink to pressure-test the shortlist against your profile.",
      ],
      questionSections: [
        {
          question:
            "Which European MBA is best for consulting, finance, technology, or entrepreneurship?",
          answer:
            "Use recent school employment reports and recruiter evidence rather than reputation alone. A school can be strong overall but offer limited access to your target market, language, or hiring cycle.",
        },
        {
          question: "Should I choose a shorter or longer MBA?",
          answer:
            "A shorter format can reduce time away from work, while a longer format may offer more internship and career-switching space. Compare the academic calendar with your target industry's recruitment calendar.",
        },
        {
          question: "How should I compare MBA return on investment without salary claims?",
          answer:
            "Model total cost categories, time away from employment, realistic target roles, geographic mobility, and the strength of programme-specific career access. Treat school salary data as contextual evidence, not a personal guarantee.",
        },
      ],
      sources: [
        COUNTRY_SOURCES.ukStudentVisa,
        COUNTRY_SOURCES.franceApplications,
        COUNTRY_SOURCES.spainStudy,
        COUNTRY_SOURCES.germanyStudy,
      ],
      updateNotice:
        "Programme details, school charges, scholarships, employment reports, and immigration rules change. Confirm them with the school and relevant authority before deciding.",
      relatedDestinations: ["uk", "france", "spain", "germany", "portugal"],
    },
    {
      slug: "cost-of-living-uk-cities",
      title: "UK student living costs: how to compare cities without stale figures",
      excerpt:
        "A practical method for comparing housing, transport, food, utilities, study, and contingency costs across UK cities.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-03-26",
      updatedAt: "2026-08-25",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "How international students can compare living costs across UK cities",
      tags: ["Cost of Living", "UK Cities", "Budgeting"],
      body: [
        "Housing usually creates the largest difference between UK student budgets, but a city label is not enough. Compare the exact campus, likely neighbourhood, contract length, included bills, deposit terms, commute, and whether you will need temporary accommodation.",
        "Build the rest of the budget by category: utilities, food, local transport, study materials, phone and internet, health-related costs, society or sport participation, travel home, and an emergency reserve.",
        "Use live university accommodation pages, student-union guidance, local transport operators, and current listings to create a date-stamped comparison. Replace each estimate when you receive an offer or change campus.",
        "A cheaper room can become more expensive after utilities and commuting. Compare the full weekly routine and contract commitments, not just advertised rent.",
      ],
      questionSections: [
        {
          question: "Is London always the most expensive student option?",
          answer:
            "London often requires careful housing and transport planning, but the practical result depends on campus location, contract type, commuting, and your lifestyle. Compare actual options near each shortlisted campus.",
        },
        {
          question: "Which costs do students often miss?",
          answer:
            "Common omissions include deposits, advance rent, utilities, laundry, course materials, local travel, temporary accommodation, travel home, and the gap between contract dates.",
        },
        {
          question: "Where should I get current figures?",
          answer:
            "Use official university accommodation and budgeting pages, current transport operators, and verified housing listings. Contact Earthlink to review the categories against your programme and city shortlist.",
        },
      ],
      sources: [COUNTRY_SOURCES.ukStudentVisa],
      updateNotice:
        "Living costs and financial-evidence rules change. Use live local and official sources and contact Earthlink for a current budget review.",
      relatedDestinations: ["uk"],
    },
    {
      slug: "scholarships-for-indian-students-uk",
      title: "Top scholarships for Indian students in the UK",
      excerpt:
        "Chevening, Commonwealth, GREAT, Rhodes, and university-specific awards worth applying for.",
      category: "Scholarships",
      author: "Earthlink Editorial",
      date: "2026-03-20",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Top scholarships for Indian students in the UK",
      tags: ["Scholarships", "Indian Students", "UK"],
      body: [
        "Chevening, Commonwealth Shared Scholarships, GREAT Scholarships, and university awards use different eligibility, coverage, and application processes. Check the live award page for current value and conditions.",
        "University-specific: Oxford Reach, Cambridge Trust, Warwick Chancellor's, Edinburgh Global. Most deadlines fall between October and February.",
      ],
    },
    {
      slug: "scholarships-usa-fulbright",
      title: "Fulbright, Knight-Hennessy, and top scholarships for USA",
      excerpt:
        "Fully funded master's and PhD scholarships every international student should consider.",
      category: "Scholarships",
      author: "Earthlink Editorial",
      date: "2026-03-14",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Fulbright, Knight-Hennessy, and top scholarships for USA",
      tags: ["Fulbright", "Scholarships", "USA"],
      body: [
        "Fulbright Foreign Student Program: fully funded master's/PhD in any subject, administered through USIEF in India.",
        "Knight-Hennessy Scholars at Stanford: full funding for any Stanford graduate programme. Cohort of 100 selected annually from 8,000+ applicants.",
      ],
    },
    {
      slug: "part-time-work-uk-students",
      title: "Part-time work rules for UK international students",
      excerpt:
        "How to check your own work conditions, understand term time, and avoid common compliance mistakes.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-03-08",
      updatedAt: "2026-08-25",
      readMinutes: 6,
      cover:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Part-time work rules for UK international students",
      tags: ["Part-time Work", "UK Students", "Compliance"],
      body: [
        "Your right to work is defined by the conditions on your own immigration permission and the rules that apply to your course and sponsor. Do not copy another student's schedule or rely on a general headline.",
        "Term time is determined by the university, not by whether you have classes that week. Obtain the official term dates for your course and keep them with your employment records.",
        "Before accepting work, check permitted hours and activity types, including restrictions that can apply to self-employment, business activity, professional sport, and certain training roles. Ask for clarification before starting if the arrangement is unclear.",
        "Earthlink can help students plan study and career preparation. Stonebridge Legal Solutions alone provides case-specific UK immigration advice for Earthlink clients.",
      ],
      questionSections: [
        {
          question: "How many hours can I work during term time?",
          answer:
            "Check the conditions attached to your own permission and the current GOV.UK guidance. The answer can depend on course level, sponsor type, and whether the university defines the period as term time.",
        },
        {
          question: "Can I work more when I have no classes?",
          answer:
            "A reading week or quiet timetable is not automatically a vacation. Use the official course-specific term dates supplied by your university.",
        },
        {
          question: "Can part-time work fund my full UK study plan?",
          answer:
            "Do not build an essential tuition or living-cost plan around uncertain employment. Roles, hours, wages, and availability vary, while immigration financial evidence is assessed separately.",
        },
      ],
      sources: [COUNTRY_SOURCES.ukStudentVisa],
      updateNotice:
        "Student work conditions can change and are case-specific. Check your digital status or decision documents, GOV.UK guidance, and your university before beginning work.",
      relatedDestinations: ["uk"],
    },
    {
      slug: "how-to-choose-uk-university",
      title: "How to shortlist UK universities: 7 filters that matter",
      excerpt:
        "Rankings tell you 30% of the story. Here are the other filters admissions gurus use.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-03-02",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "How to shortlist UK universities: 7 filters that matter",
      tags: ["University Selection", "UK", "Rankings"],
      body: [
        "Filter by: subject rank (not overall), graduate outcomes, teaching quality (TEF gold/silver), city cost of living, student:staff ratio, industry links, and post-study city job market.",
        "A silver-TEF university with strong industry placements often beats a higher-ranked institution with weak career services.",
      ],
    },
    {
      slug: "canada-vs-uk-vs-usa",
      title: "Canada vs UK vs USA: which country for your master's?",
      excerpt: "Cost, duration, post-study work, and PR pathways compared side by side.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-02-24",
      readMinutes: 9,
      cover:
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Canada vs UK vs USA: which country for your master's?",
      tags: ["Comparison", "Study Abroad", "Country Choice"],
      body: [
        "UK: compare course length, programme fit, current Student route requirements, and the Graduate Route guidance shown on GOV.UK.",
        "USA: compare programme structure, institutional accreditation, the current student-visa process, and any employment authorisation that applies to your status.",
        "Canada: compare programme eligibility, the current study-permit process, and post-graduation work rules using official Canadian sources.",
      ],
    },
    {
      slug: "student-accommodation-uk",
      title: "Student accommodation UK: halls vs private vs homestay",
      excerpt: "Costs, contracts, and how to avoid deposit scams as an international student.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-02-18",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Student accommodation UK: halls vs private vs homestay",
      tags: ["Accommodation", "Halls", "UK Housing"],
      body: [
        "University halls can simplify a first arrival because contracts and bills are often clearer. Compare each provider's current contract, included services, cancellation terms, and location.",
        "Private house-shares may lower some costs, but deposits, guarantor requirements, bills, transport, and tenancy terms can change the full budget.",
      ],
    },
    {
      slug: "profile-evaluation-explained",
      title: "Profile Evaluation: what actually gets you into top universities",
      excerpt:
        "How admissions officers weigh academics, extracurriculars, essays, and recommendations.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-02-12",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Profile Evaluation: what actually gets you into top universities",
      tags: ["Profile Evaluation", "Admissions", "Application"],
      body: [
        "Top universities read for depth, not breadth. One project shipped end-to-end beats five clubs listed with no impact.",
        "Academics are the qualifying round: if you clear the threshold, essays and recommendations decide the outcome. Spend more time on those than on chasing an extra 2% in your final grade.",
      ],
    },
    {
      slug: "uk-dependent-visa-guide",
      title: "UK Dependent Visa: bringing your spouse and children",
      excerpt: "Rules tightened in 2024 — here's who still qualifies and how to prepare.",
      category: "Visa",
      author: "Earthlink Editorial",
      date: "2026-02-06",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "UK Dependent Visa: bringing your spouse and children",
      tags: ["Dependent Visa", "UK", "Family"],
      body: [
        "Since January 2024, only research-based postgraduate students (PhD, DPhil, other doctoral research) and government-sponsored students can bring dependents on the Student route.",
        "Dependant eligibility and financial evidence depend on the current route and each family member's circumstances. Use GOV.UK and regulated advice before making a family application plan.",
        "Rules and financial requirements can change. Stonebridge Legal Solutions alone advises on eligibility and handles UK dependant visa applications for Earthlink clients.",
      ],
    },
    {
      slug: "australia-cost-of-living-2026",
      title: "Australia cost of living 2026: Sydney vs Melbourne vs Brisbane",
      excerpt: "Rent, groceries, and transport in Australia's top student cities.",
      category: "Australia",
      author: "Earthlink Editorial",
      date: "2026-01-31",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Australia cost of living 2026: Sydney vs Melbourne vs Brisbane",
      tags: ["Cost of Living", "Australia", "Sydney"],
      body: [
        "Housing, transport, insurance, food, utilities, and travel vary widely across Sydney, Melbourne, Brisbane, Adelaide, and regional locations. Build the comparison from current local sources.",
        "Rent is often the largest category, but contract length, deposits, utilities, commute, and eligibility for concessions can change the real total.",
      ],
    },
    {
      slug: "conditional-vs-unconditional-offer",
      title: "Conditional vs unconditional offer: what each means for you",
      excerpt: "How to convert a conditional offer and when to escalate to firm status.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-01-25",
      readMinutes: 5,
      cover:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Conditional vs unconditional offer: what each means for you",
      tags: ["Offer Letter", "Admissions", "UCAS"],
      body: [
        "Conditional offer: admission subject to meeting stated conditions (e.g. IELTS 6.5, final year GPA, pending transcript). Unconditional: seat confirmed with no further requirements.",
        "Submit outstanding documents promptly through the university portal. Most universities auto-convert to unconditional within 2 weeks of receipt.",
      ],
    },
    {
      slug: "credential-evaluation-wes-eca",
      title: "WES ECA and credential evaluation: step-by-step",
      excerpt:
        "Required for Canada Express Entry and many US universities — here's how to file it right.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-01-19",
      readMinutes: 6,
      cover:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "WES ECA and credential evaluation: step-by-step",
      tags: ["WES", "ECA", "Credential Evaluation"],
      body: [
        "WES (World Education Services) evaluates foreign credentials against Canadian and US education standards. Turnaround: 20 business days after documents arrive.",
        "Follow the evaluator's current document-delivery instructions. Service and courier charges change, so check the live order page before paying.",
      ],
    },
    {
      slug: "how-to-write-personal-statement-ucas",
      title: "UCAS personal statement: the 4,000-character formula",
      excerpt: "What to include, what to cut, and how to write for 5 universities at once.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-01-13",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "UCAS personal statement: the 4,000-character formula",
      tags: ["UCAS", "Personal Statement", "Undergraduate"],
      body: [
        "80% subject-focused, 20% super-curricular and extracurricular. Admissions tutors decide within the first paragraph whether to keep reading.",
        "Structure: hook, academic curiosity with evidence (books, MOOCs, projects), super-curricular exploration, extracurricular skills, closing forward-look.",
      ],
    },
    {
      slug: "post-arrival-checklist-uk",
      title: "Post-arrival UK checklist: first 30 days as an international student",
      excerpt:
        "BRP collection, bank account, NHS registration, and NI number — the order that saves weeks.",
      category: "UK",
      author: "Earthlink Editorial",
      date: "2026-01-07",
      readMinutes: 7,
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Post-arrival UK checklist: first 30 days as an international student",
      tags: ["Post-Arrival", "UK Checklist", "BRP"],
      body: [
        "Week 1: collect BRP within 10 days, register with university, get UK SIM card, open a bank account (Monzo, Starling, or Revolut work without proof of address).",
        "Week 2–3: register with local GP, apply for NI number (needed for part-time work), get Council Tax exemption certificate from university.",
      ],
    },
    {
      slug: "scholarship-application-guide",
      title: "How to secure fully-funded international scholarships: a step-by-step guide",
      excerpt:
        "A practical playbook for winning Chevening, Commonwealth, Fulbright, DAAD and university-funded awards — plus how Earthlink screens eligibility and shapes essays.",
      category: "Scholarships",
      author: "Earthlink Editorial",
      date: "2026-06-25",
      readMinutes: 12,
      cover:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "How to secure fully-funded international scholarships: a step-by-step guide",
      tags: ["Scholarships", "Chevening", "Commonwealth", "Fulbright", "DAAD", "Funding"],
      body: [
        "Fully-funded scholarships are competitive, but they follow a predictable pattern. Awards like Chevening (UK), Commonwealth (UK), Fulbright (USA), Vanier (Canada), Australia Awards, Government of Ireland IES, DAAD (Germany) and Erasmus Mundus all reward the same underlying profile: a clear leadership story, a specific study plan, measurable impact you've already delivered, and a credible plan to return home and apply what you learn. Your job as an applicant is to make that pattern visible in every essay, referee brief and interview answer.",
        "Step 1 — Eligibility pre-screening. Before you write a single essay, confirm you meet the hard filters: minimum GPA/percentage, degree class, years of work experience, country nationality, English test score, and the award's field-of-study restrictions. Earthlink runs a free eligibility pre-screen against every award in our scholarships directory so you don't spend six weeks on an application you were never eligible for. This alone eliminates 30–40% of wasted applications.",
        "Step 2 — Build a target list of 6–10 awards. Mix three tiers: (a) 2–3 flagship government awards (Chevening, Commonwealth, Fulbright, DAAD), (b) 3–4 university-specific scholarships tied to programmes you're already applying to (Rhodes, Gates Cambridge, Clarendon, Oxford-Weidenfeld, Edinburgh Global, Warwick Chancellor's), and (c) 2–3 subject or country-of-origin awards (Aga Khan, OFID, Inlaks, Rotary Peace). Applying to fewer than 5 is a strategic mistake; applying to more than 10 dilutes essay quality.",
        "Step 3 - Master the four essay archetypes. Many scholarships ask variants of Leadership, Networking, Study Plan, and Career Plan. Write each essay around one verifiable story and explain your own contribution without inventing impact figures.",
        "Step 4 — Referees and endorsements. Give each referee a one-page brief: the award's selection criteria, the two or three qualities you want them to evidence, and a specific project you worked on together. Chevening and Commonwealth in particular weight referee letters heavily; a generic 'good student' letter kills a competitive application. Earthlink drafts referee briefs alongside your essays so the story stays consistent across every document a panel reads.",
        "Step 5 — The interview. Roughly 25–30% of shortlisted candidates convert at interview. Panels test three things: is your study plan real, will you actually return home, and can you speak about your leadership story without a script. Rehearse aloud, record yourself, and cut every answer to under 90 seconds. We run mock interviews with UK-based advisers who have sat on selection panels.",
        "Common mistakes include applying only to famous awards, overlooking smaller institution or subject awards, reusing the same essay across different criteria, missing referee deadlines, and choosing a study plan the panel cannot verify. Always name the relevant modules, supervisors, and research groups.",
        "Do study abroad consultants help with scholarships? Honestly, most don't — they focus on admissions and hand you a template. Earthlink treats scholarships as a separate workstream: we pre-screen eligibility against every award in our directory, map your profile to the 6–10 best-fit awards, draft and iterate essays through three review rounds, prepare referees, and run mock interviews. There is no extra fee for scholarship support when you're already on an Earthlink admissions plan.",
        "Timelines to plan around (2026 intake): Chevening opens August, closes early November; Commonwealth opens October, closes December; Fulbright deadlines vary by country (typically May–October the year before intake); DAAD deadlines vary by programme (many close October–November); most university scholarships close January–March. Start eligibility screening 12–15 months before your intended intake.",
        "Next step: browse our scholarships directory for the current award list, then book a free 20-minute eligibility call. We'll tell you honestly which awards are realistic for your profile — and which aren't worth the six weeks of essay work.",
      ],
    },
    {
      slug: "germany-student-visa-blocked-account",
      title: "Germany student visa blocked account: what to check before funding it",
      excerpt:
        "How blocked accounts fit into Germany's study-residence evidence and which live checks to make before choosing a provider.",
      category: "Visa",
      author: "Earthlink Editorial",
      date: "2026-08-25",
      updatedAt: "2026-08-25",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Planning financial evidence for study in Germany",
      tags: ["Germany", "Blocked Account", "Student Visa"],
      body: [
        "A blocked account is one method that may be used to show living funds for a German study-residence application. It is not a substitute for admission, insurance, identity, academic, or other route documents.",
        "Start with the live Make it in Germany guidance. Confirm whether the method applies to your route, the current evidence requirement, accepted alternatives, timing, and the instructions used by the authority handling your application.",
        "If you use a commercial provider, compare regulatory status, opening requirements, transfer method, access after arrival, support, refunds, closure, and what happens if the visa is delayed or refused. Do not choose on advertising alone.",
        "Keep the account confirmation, transfer record, source-of-funds evidence, and provider terms together. Ask Earthlink to review how the evidence fits your admission and travel timeline, while relying on the German authority for the controlling rule.",
      ],
      questionSections: [
        {
          question: "Is a blocked account always mandatory?",
          answer:
            "Not necessarily. Accepted evidence can depend on the route and circumstances. Use the live official guidance to check the available methods before opening an account.",
        },
        {
          question: "How much should I transfer?",
          answer:
            "The required amount can change. Check the live German authority guidance and the instructions for your application immediately before transferring funds.",
        },
        {
          question: "How do I compare blocked-account providers?",
          answer:
            "Compare authorisation, onboarding, transfer, access, support, refund, closure, and refusal terms. Read the current contract rather than a third-party summary.",
        },
      ],
      sources: [COUNTRY_SOURCES.germanyStudy, COUNTRY_SOURCES.germanyProgrammes],
      updateNotice:
        "Financial-evidence requirements and provider terms change. Confirm the current position with the German authority and your chosen provider before transferring funds.",
      relatedDestinations: ["germany"],
    },
    {
      slug: "france-university-application-routes",
      title:
        "France university application routes: Campus France, platforms, and direct applications",
      excerpt:
        "How nationality, residence, study level, and programme determine the route for applying to higher education in France.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-08-25",
      updatedAt: "2026-08-25",
      readMinutes: 9,
      cover:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Choosing the correct application route for study in France",
      tags: ["France", "Campus France", "Applications"],
      body: [
        "There is no single application route for every international student in France. The correct path can depend on nationality, country of residence, previous education, study level, institution type, and programme.",
        "Begin with the exact programme. Verify the institution, awarding authority, qualification level, teaching language, campus, recognition, and entry requirements before deciding which platform to use.",
        "Use Campus France to identify whether the Etudes en France process applies to you. The programme may then direct you to a national platform, a school platform, or a direct institutional application. Follow the current instruction for that course.",
        "Admission and immigration are separate. After a valid offer, use France-Visas for the current student-visa route and supporting documents. Contact Earthlink for a profile and document check before submitting.",
      ],
      questionSections: [
        {
          question: "Do all international students apply through Campus France?",
          answer:
            "No. Campus France helps identify the route, but the platform depends on your profile and programme. Check the current process for your nationality and residence.",
        },
        {
          question: "Can I apply directly to a French institution?",
          answer:
            "Some programmes use direct applications. Only use that route when the official course or Campus France guidance tells you to do so.",
        },
        {
          question: "How do I verify a private school award?",
          answer:
            "Confirm the institution, awarding authority, qualification level, national recognition, and any professional accreditation for the exact programme.",
        },
      ],
      sources: [COUNTRY_SOURCES.franceApplications, COUNTRY_SOURCES.franceVisa],
      updateNotice:
        "French application and visa routes can change. Confirm the current route with Campus France, the institution, and France-Visas.",
      relatedDestinations: ["france"],
    },
    {
      slug: "spain-university-application-student-visa",
      title: "Spain university application and student visa: a route-by-route guide",
      excerpt:
        "How to verify a Spanish degree, choose the admissions route, and prepare for the current study-stay process.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-08-25",
      updatedAt: "2026-08-25",
      readMinutes: 9,
      cover:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Planning a university application and study route for Spain",
      tags: ["Spain", "University Applications", "Student Visa"],
      body: [
        "Start with the exact university and degree. Confirm whether the award is an official qualification, who awards it, where it is taught, the language of teaching and assessment, and whether professional recognition matters for your intended career.",
        "Undergraduate admissions can require an academic credential or subject-based process that depends on the previous education system and university. UNEDasiss is relevant to many applicants, but the university's current instructions decide what is required.",
        "Postgraduate and private-institution applications may follow a direct route. Check prerequisites, language evidence, document recognition, translations, portfolio or test requirements, deadlines, deposits, and refund terms before accepting.",
        "After admission, use Spain's official migration and consular guidance for the current study-stay route. Financial evidence, insurance, accommodation, criminal-record, medical, translation, and application-location rules can differ by case.",
      ],
      questionSections: [
        {
          question: "Do I need UNEDasiss?",
          answer:
            "It depends on your education system, degree level, and university. Follow the current admissions page for the exact programme and UNEDasiss guidance where directed.",
        },
        {
          question: "Can I study in English?",
          answer:
            "English-taught options exist. Verify the language for every module, assessment, placement, and later year rather than relying on a general course label.",
        },
        {
          question: "When should I prepare the visa documents?",
          answer:
            "Begin the checklist while the academic application is progressing, but use the live authority guidance before ordering documents or making non-refundable commitments.",
        },
      ],
      sources: [COUNTRY_SOURCES.spainAdmission, COUNTRY_SOURCES.spainStudy],
      updateNotice:
        "Spanish admissions and study-stay rules vary by applicant and can change. Confirm the current university and authority instructions.",
      relatedDestinations: ["spain"],
    },
    {
      slug: "portugal-university-application-residence",
      title: "Portugal university application and higher-education residence guide",
      excerpt:
        "How to compare Portuguese institutions, follow the international application route, and use current AIMA residence guidance.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-08-25",
      updatedAt: "2026-08-25",
      readMinutes: 9,
      cover:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Planning a higher-education application and residence route for Portugal",
      tags: ["Portugal", "University Applications", "Residence"],
      body: [
        "Portugal's international-student framework sits alongside institution-specific admissions. DGES explains the higher-education context, while each university or polytechnic publishes the exact course entry and selection rules.",
        "Compare universities and polytechnics by curriculum, teaching approach, recognition, credits, campus, language, placements, and outcomes. Check whether any professional recognition is needed for the career you intend to enter.",
        "Prepare academic records, recognition or equivalence documents, language evidence, and programme-specific materials in the format requested by the institution. Review deposits, refund terms, and enrolment conditions before paying.",
        "Admission does not complete the immigration process. Use AIMA and the relevant consular guidance for the current higher-education residence route, supporting documents, financial evidence, insurance, accommodation, and application steps.",
      ],
      questionSections: [
        {
          question: "Do I apply through DGES?",
          answer:
            "DGES explains the national framework. The institution normally publishes the exact international application route for the programme.",
        },
        {
          question: "University or polytechnic: which is better?",
          answer:
            "Neither label is automatically better. Compare the exact curriculum, teaching, facilities, recognition, placements, and fit with your academic and career goals.",
        },
        {
          question: "Where do I check the residence route?",
          answer:
            "Use the live AIMA higher-education page and any current consular instructions that apply to your application location.",
        },
      ],
      sources: [COUNTRY_SOURCES.portugalAdmission, COUNTRY_SOURCES.portugalResidence],
      updateNotice:
        "Portuguese admissions and residence requirements can change. Confirm the current position with the institution, DGES, AIMA, and the relevant consular source.",
      relatedDestinations: ["portugal"],
    },
    {
      slug: "verify-malta-university-course",
      title: "How to verify a Malta university, college, and course",
      excerpt:
        "A practical MFHEA verification method for checking the provider, programme, qualification, campus, and offer before paying.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-08-25",
      updatedAt: "2026-08-25",
      readMinutes: 8,
      cover:
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Verifying a provider and course before studying in Malta",
      tags: ["Malta", "MFHEA", "Course Verification"],
      body: [
        "Do not verify a Malta course from the college name alone. Search the live MFHEA register for the provider and the exact programme, then match the result to the offer letter.",
        "Check the qualification title, level, credits, awarding body, delivery mode, teaching location, study schedule, attendance, assessment, and course duration. Ask the provider to correct any mismatch in writing.",
        "Read the admissions, tuition, deposit, refund, progression, complaints, and withdrawal terms before paying. Use the provider's live documents and keep copies of the version you accepted.",
        "After the academic checks, use Identita's live guidance for the visa stage. Provider admission does not guarantee a visa, and visa evidence should be prepared against the current checklist.",
      ],
      questionSections: [
        {
          question: "Is the provider name enough to verify a course?",
          answer:
            "No. Check both the licensed provider and the exact accredited programme. A provider can offer multiple awards with different status and delivery details.",
        },
        {
          question: "What should match the offer letter?",
          answer:
            "The provider, programme title, qualification level, credits, awarding body, campus, delivery mode, and other key study details should match the official record and provider terms.",
        },
        {
          question: "Does an accredited course guarantee a visa?",
          answer:
            "No. Accreditation and immigration are separate checks. Follow Identita's current visa guidance for your own circumstances.",
        },
      ],
      sources: [COUNTRY_SOURCES.maltaProgrammes, COUNTRY_SOURCES.maltaVisa],
      updateNotice:
        "Provider, programme, and visa information can change. Recheck the live MFHEA and Identita pages before paying or applying.",
      relatedDestinations: ["malta"],
    },
    {
      slug: "germany-vs-france-vs-spain-vs-portugal",
      title: "Germany vs France vs Spain vs Portugal for international students",
      excerpt:
        "Compare programme fit, institution types, application routes, language, recognition, and residence planning without using stale cost figures.",
      category: "Guides",
      author: "Earthlink Editorial",
      date: "2026-08-25",
      updatedAt: "2026-08-25",
      readMinutes: 10,
      cover:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=70&auto=format&fit=crop",
      coverCaption: "Comparing study routes across Germany, France, Spain, and Portugal",
      tags: ["Europe", "Germany", "France", "Spain", "Portugal"],
      body: [
        "Choose between Germany, France, Spain, and Portugal by the exact programme and route, not by a single country slogan. Institution type, qualification recognition, application system, teaching language, city, and residence process all affect fit.",
        "Germany is often strongest for applicants comparing research universities and applied-science institutions, especially in technical subjects. France offers universities, grandes ecoles, and specialist schools with multiple application routes. Spain and Portugal combine public and private choices with institution-specific admissions and distinct recognition steps.",
        "Language matters beyond the classroom. An English-taught course may still involve local-language administration, housing, placements, healthcare, networking, and graduate work. Check the module and placement language, then make a realistic learning plan.",
        "Build four live-source comparisons: programme and recognition, application route, full budget categories, and immigration or residence steps. Contact Earthlink with your academic profile and shortlist for a current comparison.",
      ],
      questionSections: [
        {
          question: "Which country is cheapest?",
          answer:
            "There is no stable country-wide answer. Compare the exact programme charges, compulsory fees, housing, insurance, transport, travel, and current immigration evidence for your shortlist.",
        },
        {
          question: "Which country has the easiest application?",
          answer:
            "Ease depends on your prior education, recognition needs, language, programme, nationality, and residence. Compare the real route for your profile rather than a general country claim.",
        },
        {
          question: "Can I study entirely in English?",
          answer:
            "English-taught programmes exist in all four countries. Verify every module, assessment, placement, and later year, and consider the local language needed outside class.",
        },
        {
          question: "Which country is best for post-study work?",
          answer:
            "Post-study rules change and depend on the qualification, status, timing, and employment. Use the live national source for each country before making this the deciding factor.",
        },
      ],
      sources: [
        COUNTRY_SOURCES.germanyStudy,
        COUNTRY_SOURCES.franceApplications,
        COUNTRY_SOURCES.spainStudy,
        COUNTRY_SOURCES.portugalAdmission,
      ],
      updateNotice:
        "Application, cost, work, and residence rules change. Recheck the live country sources and the exact programme pages before deciding.",
      relatedDestinations: ["germany", "france", "spain", "portugal", "europe"],
    },
  ] satisfies Blog[]
).map((blog) => ({
  ...blog,
  readMinutes: Math.max(1, Math.ceil(blog.body.join(" ").trim().split(/\s+/).length / 200)),
}));

export function getBlog(slug: string) {
  return BLOGS.find((b) => b.slug === slug);
}
