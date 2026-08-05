// Partner universities grouped by destination country.
// Logos are served via logo.dev using each institution's primary domain.

export type University = {
  name: string;
  domain: string; // used for logo.dev
  city: string;
  speciality: string; // what they're best known for
  highlights: string[]; // 3 short bullets on the back of the card
  website: string;
  applicationSupportNote?: boolean;
};

export type UniversityCountry = {
  country: string;
  slug: string;
  flag: string;
  blurb: string;
  universities: University[];
};

export const UNIVERSITY_PARTNERS: UniversityCountry[] = [
  {
    country: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    blurb:
      "Earthlink supports university selection and applications across recognised UK institutions. Stonebridge alone handles every UK visa route; Earthlink's university-application work remains separate.",
    universities: [
      // Russell Group
      {
        name: "University of Oxford",
        domain: "ox.ac.uk",
        city: "Oxford",
        speciality: "PPE, Medicine & Research",
        highlights: ["Russell Group", "Est. 1096", "World top-5"],
        website: "https://www.ox.ac.uk",
      },
      { name: "University of Cambridge", domain: "cam.ac.uk", city: "Cambridge", speciality: "Sciences, Engineering & Economics", highlights: ["Russell Group", "Est. 1209", "World top-5"], website: "https://www.cam.ac.uk" },
      { name: "Imperial College London", domain: "imperial.ac.uk", city: "London", speciality: "Engineering, Medicine & Business", highlights: ["Russell Group", "STEM specialist", "Top-10 (QS)"], website: "https://www.imperial.ac.uk" },
      { name: "University College London", domain: "ucl.ac.uk", city: "London", speciality: "Arts, Sciences & AI", highlights: ["Russell Group", "Central London", "Top-10 (QS)"], website: "https://www.ucl.ac.uk" },
      { name: "King's College London", domain: "kcl.ac.uk", city: "London", speciality: "Law, Medicine & War Studies", highlights: ["Russell Group", "Central London", "Top-40 (QS)"], website: "https://www.kcl.ac.uk" },
      { name: "London School of Economics", domain: "lse.ac.uk", city: "London", speciality: "Economics, Finance & Policy", highlights: ["Russell Group", "World-leading social sciences", "Top-50 (QS)"], website: "https://www.lse.ac.uk" },
      { name: "University of Edinburgh", domain: "ed.ac.uk", city: "Edinburgh", speciality: "AI, Informatics & Medicine", highlights: ["Russell Group", "Ancient (1583)", "Top-30 (QS)"], website: "https://www.ed.ac.uk" },
      { name: "University of Manchester", domain: "manchester.ac.uk", city: "Manchester", speciality: "Engineering, Business & Sciences", highlights: ["Russell Group", "Largest single-site UK campus", "25+ Nobel laureates"], website: "https://www.manchester.ac.uk" },
      { name: "University of Warwick", domain: "warwick.ac.uk", city: "Coventry", speciality: "Business (WBS), Maths & Economics", highlights: ["Russell Group", "Top-10 UK", "WBS triple-accredited"], website: "https://www.warwick.ac.uk" },
      { name: "University of Bristol", domain: "bristol.ac.uk", city: "Bristol", speciality: "Engineering, Law & Medicine", highlights: ["Russell Group", "Top-60 (QS)", "Strong research"], website: "https://www.bristol.ac.uk" },
      { name: "University of Leeds", domain: "leeds.ac.uk", city: "Leeds", speciality: "Data Science & Business Analytics", highlights: ["Russell Group", "Top-15 UK research", "Strong graduate outcomes"], website: "https://www.leeds.ac.uk" },
      { name: "University of Birmingham", domain: "birmingham.ac.uk", city: "Birmingham", speciality: "Engineering & Business", highlights: ["Russell Group", "Founding red-brick", "Excellent industry links"], website: "https://www.birmingham.ac.uk" },
      { name: "University of Glasgow", domain: "gla.ac.uk", city: "Glasgow", speciality: "Computing Science & Life Sciences", highlights: ["Russell Group", "Est. 1451", "£1bn campus investment"], website: "https://www.gla.ac.uk" },
      { name: "University of Sheffield", domain: "sheffield.ac.uk", city: "Sheffield", speciality: "Engineering & Journalism", highlights: ["Russell Group", "AMRC industry hub", "Affordable city"], website: "https://www.sheffield.ac.uk" },
      { name: "University of Southampton", domain: "southampton.ac.uk", city: "Southampton", speciality: "Electronics & Marine Engineering", highlights: ["Russell Group", "Top for engineering", "Coastal campus"], website: "https://www.southampton.ac.uk" },
      { name: "University of Nottingham", domain: "nottingham.ac.uk", city: "Nottingham", speciality: "Pharmacy, Engineering & Business", highlights: ["Russell Group", "Global campuses (China, Malaysia)", "Green campus"], website: "https://www.nottingham.ac.uk" },
      { name: "Newcastle University", domain: "ncl.ac.uk", city: "Newcastle", speciality: "Medicine, Marine & Business", highlights: ["Russell Group", "Affordable Northern city", "Strong graduate rate"], website: "https://www.ncl.ac.uk" },
      { name: "Cardiff University", domain: "cardiff.ac.uk", city: "Cardiff", speciality: "Journalism, Medicine & Business", highlights: ["Russell Group", "Welsh capital", "Top-25 UK research"], website: "https://www.cardiff.ac.uk" },
      { name: "Queen Mary University of London", domain: "qmul.ac.uk", city: "London", speciality: "Law, Medicine & Computer Science", highlights: ["Russell Group", "East London campus", "Diverse student body"], website: "https://www.qmul.ac.uk" },
      { name: "Durham University", domain: "durham.ac.uk", city: "Durham", speciality: "Business, Law & Sciences", highlights: ["Russell Group", "Collegiate system", "Top-10 UK"], website: "https://www.durham.ac.uk" },
      { name: "University of York", domain: "york.ac.uk", city: "York", speciality: "Computer Science & Management", highlights: ["Russell Group", "Historic city", "Top-30 UK"], website: "https://www.york.ac.uk" },
      { name: "University of Exeter", domain: "exeter.ac.uk", city: "Exeter", speciality: "Business, Environment & Sport", highlights: ["Russell Group", "South-West UK", "Top-15 UK"], website: "https://www.exeter.ac.uk" },
      { name: "University of Liverpool", domain: "liverpool.ac.uk", city: "Liverpool", speciality: "Engineering, Vet & Business", highlights: ["Russell Group", "Original red-brick", "Affordable city"], website: "https://www.liverpool.ac.uk" },
      // Strong post-92 & modern universities (frequent Earthlink filings)
      { name: "University of Strathclyde", domain: "strath.ac.uk", city: "Glasgow", speciality: "Business & Engineering", highlights: ["AACSB business school", "Innovation-led", "Central Glasgow"], website: "https://www.strath.ac.uk" },
      { name: "University of Aberdeen", domain: "abdn.ac.uk", city: "Aberdeen", speciality: "Petroleum, Law & Medicine", highlights: ["Ancient (1495)", "Energy hub", "Regional scholarships"], website: "https://www.abdn.ac.uk" },
      { name: "University of Dundee", domain: "dundee.ac.uk", city: "Dundee", speciality: "Life Sciences & Design", highlights: ["Top for biosciences", "V&A city", "Scholarships"], website: "https://www.dundee.ac.uk" },
      { name: "Heriot-Watt University", domain: "hw.ac.uk", city: "Edinburgh", speciality: "Engineering, Business & Actuarial", highlights: ["Campuses in Dubai & Malaysia", "STEM focus", "Industry links"], website: "https://www.hw.ac.uk" },
      { name: "University of Surrey", domain: "surrey.ac.uk", city: "Guildford", speciality: "Hospitality, Engineering & AI", highlights: ["Near London", "Top for placements", "5G research"], website: "https://www.surrey.ac.uk" },
      { name: "University of Sussex", domain: "sussex.ac.uk", city: "Brighton", speciality: "AI, Media & Development Studies", highlights: ["Coastal campus", "Top-40 UK", "International outlook"], website: "https://www.sussex.ac.uk" },
      { name: "University of Reading", domain: "reading.ac.uk", city: "Reading", speciality: "Real Estate, Meteorology & Business", highlights: ["Near London", "Henley Business School", "Green campus"], website: "https://www.reading.ac.uk" },
      { name: "University of Leicester", domain: "le.ac.uk", city: "Leicester", speciality: "Space, Genetics & Business", highlights: ["Space Park", "DNA fingerprinting discovery", "Affordable"], website: "https://www.le.ac.uk" },
      { name: "University of East Anglia", domain: "uea.ac.uk", city: "Norwich", speciality: "Creative Writing & Climate", highlights: ["Top-30 UK", "Campus university", "Research park"], website: "https://www.uea.ac.uk" },
      { name: "Loughborough University", domain: "lboro.ac.uk", city: "Loughborough", speciality: "Sport, Engineering & Design", highlights: ["World #1 for sport", "London 2nd campus", "Top-10 UK"], website: "https://www.lboro.ac.uk" },
      { name: "University of Bath", domain: "bath.ac.uk", city: "Bath", speciality: "Management, Engineering & Sport", highlights: ["Top-10 UK", "Placement year focus", "Beautiful city"], website: "https://www.bath.ac.uk" },
      { name: "SOAS University of London", domain: "soas.ac.uk", city: "London", speciality: "Asian, African & Middle-Eastern studies", highlights: ["Unique specialism", "Central London", "Small cohorts"], website: "https://www.soas.ac.uk" },
      { name: "City, University of London", domain: "city.ac.uk", city: "London", speciality: "Business (Bayes), Law & Journalism", highlights: ["Bayes Business School", "Central London", "Industry links"], website: "https://www.city.ac.uk" },
      { name: "Brunel University London", domain: "brunel.ac.uk", city: "London", speciality: "Engineering, Design & Business", highlights: ["West London campus", "Sandwich placements", "Diverse cohort"], website: "https://www.brunel.ac.uk" },
      { name: "Aston University", domain: "aston.ac.uk", city: "Birmingham", speciality: "Business, Pharmacy & Engineering", highlights: ["City-centre campus", "Integrated placements", "Aston Business School"], website: "https://www.aston.ac.uk" },
      { name: "Coventry University", domain: "coventry.ac.uk", city: "Coventry", speciality: "Automotive & Business", highlights: ["Modern London campus", "Strong placements", "Sponsor of Graduate Route"], website: "https://www.coventry.ac.uk" },
      { name: "University of Hertfordshire", domain: "herts.ac.uk", city: "Hatfield", speciality: "Computer Science & Aerospace", highlights: ["Near London", "Industry-embedded courses", "Scholarships available"], website: "https://www.herts.ac.uk" },
      { name: "De Montfort University", domain: "dmu.ac.uk", city: "Leicester", speciality: "Cyber Security & Design", highlights: ["Gold TEF rating", "Global-outlook courses", "Affordable living"], website: "https://www.dmu.ac.uk" },
      { name: "University of Greenwich", domain: "gre.ac.uk", city: "London", speciality: "Business, Engineering & Pharmacy", highlights: ["Historic riverside campus", "Central London reach", "Scholarships"], website: "https://www.gre.ac.uk" },
      { name: "University of Westminster", domain: "westminster.ac.uk", city: "London", speciality: "Media, Architecture & Business", highlights: ["Central London", "Creative industries", "Diverse"], website: "https://www.westminster.ac.uk" },
      { name: "London Metropolitan University", domain: "londonmet.ac.uk", city: "London", speciality: "Business, Law & Computing", highlights: ["Two London campuses", "Career-focused", "Affordable London option"], website: "https://www.londonmet.ac.uk" },
      { name: "University of East London", domain: "uel.ac.uk", city: "London", speciality: "Business, Sport & Psychology", highlights: ["Docklands campus", "Scholarships", "Diverse cohort"], website: "https://www.uel.ac.uk" },
      { name: "Middlesex University", domain: "mdx.ac.uk", city: "London", speciality: "Business, Design & Nursing", highlights: ["North London campus", "Global campuses", "Career support"], website: "https://www.mdx.ac.uk" },
      { name: "Kingston University", domain: "kingston.ac.uk", city: "London", speciality: "Design, Business & Nursing", highlights: ["SW London", "Top for art & design", "Placement year"], website: "https://www.kingston.ac.uk" },
      { name: "University of Roehampton", domain: "roehampton.ac.uk", city: "London", speciality: "Education, Psychology & Dance", highlights: ["Parkland campus in London", "Small cohorts", "Scholarships"], website: "https://www.roehampton.ac.uk" },
      { name: "Ulster University", domain: "ulster.ac.uk", city: "Belfast", speciality: "Business, Computing & Nursing", highlights: ["Belfast + Birmingham + London campuses", "Growing intl. cohort", "Affordable"], website: "https://www.ulster.ac.uk" },
      { name: "Queen's University Belfast", domain: "qub.ac.uk", city: "Belfast", speciality: "Law, Medicine & Engineering", highlights: ["Russell Group", "Historic city", "Low cost of living"], website: "https://www.qub.ac.uk" },
      { name: "Bournemouth University", domain: "bournemouth.ac.uk", city: "Bournemouth", speciality: "Media, Animation & Tourism", highlights: ["National Centre for Computer Animation", "Coastal city", "Placement year"], website: "https://www.bournemouth.ac.uk" },
      { name: "University of Portsmouth", domain: "port.ac.uk", city: "Portsmouth", speciality: "Forensics, Cybersecurity & Business", highlights: ["Waterfront city", "Top-30 UK modern uni", "Scholarships"], website: "https://www.port.ac.uk" },
      { name: "University of Plymouth", domain: "plymouth.ac.uk", city: "Plymouth", speciality: "Marine, Health & Business", highlights: ["Coastal campus", "Applied research", "Affordable"], website: "https://www.plymouth.ac.uk" },
      { name: "Nottingham Trent University", domain: "ntu.ac.uk", city: "Nottingham", speciality: "Fashion, Business & Sport", highlights: ["University of the Year multiple times", "Strong graduate rate", "Modern facilities"], website: "https://www.ntu.ac.uk" },
      { name: "Manchester Metropolitan University", domain: "mmu.ac.uk", city: "Manchester", speciality: "Business, Design & Sport", highlights: ["Central Manchester", "Placement focus", "Diverse"], website: "https://www.mmu.ac.uk" },
      { name: "Liverpool John Moores University", domain: "ljmu.ac.uk", city: "Liverpool", speciality: "Engineering, Sport & Astrophysics", highlights: ["Applied focus", "Affordable city", "Industry links"], website: "https://www.ljmu.ac.uk" },
      { name: "Sheffield Hallam University", domain: "shu.ac.uk", city: "Sheffield", speciality: "Business, Sport & Health", highlights: ["Career-focused", "One of UK's largest", "Affordable"], website: "https://www.shu.ac.uk" },
      { name: "Teesside University", domain: "tees.ac.uk", city: "Middlesbrough", speciality: "Digital, Games & Engineering", highlights: ["Low cost of living", "Scholarships", "Middlesbrough + London campuses"], website: "https://www.tees.ac.uk" },
      { name: "University of Bedfordshire", domain: "beds.ac.uk", city: "Luton", speciality: "Business, Nursing & Media", highlights: ["Near London", "Scholarships", "Diverse cohort"], website: "https://www.beds.ac.uk" },
      { name: "BPP University", domain: "bpp.com", city: "London", speciality: "Law, Business & Accountancy", highlights: ["Professional-focused", "Multiple UK centres", "Industry-recognised"], website: "https://www.bpp.com" },
    ],
  },
  {
    country: "United States",
    slug: "usa",
    flag: "🇺🇸",
    blurb: "OPT + STEM extension, world-leading research, and generous scholarships.",
    universities: [
      { name: "Northeastern University", domain: "northeastern.edu", city: "Boston, MA", speciality: "CS & Co-op Programs", highlights: ["Signature co-op model", "STEM-designated", "Boston tech hub"], website: "https://www.northeastern.edu" },
      { name: "Arizona State University", domain: "asu.edu", city: "Tempe, AZ", speciality: "Innovation & Engineering", highlights: ["#1 in Innovation (US News)", "Large intl. community", "Merit scholarships"], website: "https://www.asu.edu" },
      { name: "University of Illinois Chicago", domain: "uic.edu", city: "Chicago, IL", speciality: "Computer Science & Health", highlights: ["R1 research", "Urban campus", "STEM OPT eligible"], website: "https://www.uic.edu" },
      { name: "SUNY Buffalo", domain: "buffalo.edu", city: "Buffalo, NY", speciality: "Engineering & Management", highlights: ["AAU member", "Affordable tuition", "Strong CPT/OPT"], website: "https://www.buffalo.edu" },
      { name: "George Mason University", domain: "gmu.edu", city: "Fairfax, VA", speciality: "Cybersecurity & Policy", highlights: ["DC-metro access", "NSA-designated CAE", "Fed jobs pipeline"], website: "https://www.gmu.edu" },
      { name: "Pace University", domain: "pace.edu", city: "New York, NY", speciality: "Finance & Cybersecurity", highlights: ["Wall Street corridor", "Seidenberg school", "STEM OPT"], website: "https://www.pace.edu" },
    ],
  },
  {
    country: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    blurb: "PGWP-eligible programs, PR pathways, and affordable public colleges.",
    universities: [
      { name: "University of Windsor", domain: "uwindsor.ca", city: "Windsor, ON", speciality: "Automotive & Engineering", highlights: ["PGWP eligible", "Border to Detroit", "Co-op programs"], website: "https://www.uwindsor.ca" },
      { name: "Trent University", domain: "trentu.ca", city: "Peterborough, ON", speciality: "Environmental & Business", highlights: ["#1 undergrad experience", "Small class sizes", "PGWP eligible"], website: "https://www.trentu.ca" },
      { name: "Seneca Polytechnic", domain: "senecapolytechnic.ca", city: "Toronto, ON", speciality: "Business & IT Diplomas", highlights: ["Toronto GTA", "Applied learning", "Strong employer network"], website: "https://www.senecapolytechnic.ca" },
      { name: "Conestoga College", domain: "conestogac.on.ca", city: "Kitchener, ON", speciality: "Engineering & Health", highlights: ["Fastest-growing polytechnic", "PGWP eligible", "Waterloo tech corridor"], website: "https://www.conestogac.on.ca" },
      { name: "Cape Breton University", domain: "cbu.ca", city: "Sydney, NS", speciality: "Business & Public Health", highlights: ["Atlantic Immigration Pilot", "Small city, low cost", "PGWP eligible"], website: "https://www.cbu.ca" },
      { name: "Fanshawe College", domain: "fanshawec.ca", city: "London, ON", speciality: "IT & Interactive Media", highlights: ["Applied programs", "Co-op placements", "Affordable tuition"], website: "https://www.fanshawec.ca" },
    ],
  },
  {
    country: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    blurb: "Group of Eight research, up to 4-year post-study work, coastal city living.",
    universities: [
      { name: "University of Technology Sydney", domain: "uts.edu.au", city: "Sydney, NSW", speciality: "Design, IT & Business", highlights: ["Top-100 (QS)", "Industry-focused", "Central Sydney campus"], website: "https://www.uts.edu.au" },
      { name: "Monash University", domain: "monash.edu", city: "Melbourne, VIC", speciality: "Pharmacy, Engineering & Business", highlights: ["Group of Eight", "Top-50 (QS)", "Large intl. cohort"], website: "https://www.monash.edu" },
      { name: "University of Adelaide", domain: "adelaide.edu.au", city: "Adelaide, SA", speciality: "Wine, AI & Health Sciences", highlights: ["Group of Eight", "Regional city bonus", "MRT points advantage"], website: "https://www.adelaide.edu.au" },
      { name: "Deakin University", domain: "deakin.edu.au", city: "Melbourne, VIC", speciality: "Cyber & Sports Science", highlights: ["5-star teaching", "Cloud campus option", "Strong graduate rate"], website: "https://www.deakin.edu.au" },
      { name: "La Trobe University", domain: "latrobe.edu.au", city: "Melbourne, VIC", speciality: "Health & Biosciences", highlights: ["Top-1% globally", "Scholarships up to 25%", "Metro & regional campuses"], website: "https://www.latrobe.edu.au" },
    ],
  },
  {
    country: "Ireland",
    slug: "ireland",
    flag: "🇮🇪",
    blurb: "EU degrees, 2-year Stay Back visa, and a booming tech + pharma industry.",
    universities: [
      { name: "Dublin City University", domain: "dcu.ie", city: "Dublin", speciality: "Business, Computing & Communications", highlights: ["Top-100 young university", "Industry placements", "EU-recognised"], website: "https://www.dcu.ie" },
      { name: "University of Limerick", domain: "ul.ie", city: "Limerick", speciality: "Engineering & Business", highlights: ["Ireland's #1 for co-op", "8-month placements", "Modern campus"], website: "https://www.ul.ie" },
      { name: "Griffith College", domain: "griffith.ie", city: "Dublin", speciality: "Business & Computing", highlights: ["Private, industry-led", "Central Dublin", "Scholarships available"], website: "https://www.griffith.ie" },
      { name: "National College of Ireland", domain: "ncirl.ie", city: "Dublin", speciality: "Fintech & Data Analytics", highlights: ["IFSC location", "Employer partnerships", "Small cohorts"], website: "https://www.ncirl.ie" },
    ],
  },
  {
    country: "New Zealand",
    slug: "new-zealand",
    flag: "🇳🇿",
    blurb: "3-year open post-study work visa, safe cities, and world-recognised degrees.",
    universities: [
      { name: "University of Auckland", domain: "auckland.ac.nz", city: "Auckland", speciality: "Engineering & Business", highlights: ["Top-100 (QS)", "NZ's largest research uni", "3-yr PSW visa"], website: "https://www.auckland.ac.nz" },
      { name: "Massey University", domain: "massey.ac.nz", city: "Palmerston North", speciality: "Agriculture, Aviation & Design", highlights: ["World-top for agri", "Distance learning options", "Practical focus"], website: "https://www.massey.ac.nz" },
      { name: "Auckland University of Technology", domain: "aut.ac.nz", city: "Auckland", speciality: "Hospitality, IT & Health", highlights: ["Rising in QS", "Applied research", "Industry co-designed"], website: "https://www.aut.ac.nz" },
    ],
  },
  {
    country: "Europe",
    slug: "europe",
    flag: "🇪🇺",
    blurb: "English-taught masters, low/zero tuition in select countries, Schengen mobility.",
    universities: [
      { name: "IU International University", domain: "iu.org", city: "Berlin, Germany", speciality: "Business, Data Science & Tech", highlights: ["English-taught", "Flexible online + on-campus", "18-month job-seeker visa"], website: "https://www.iu.org" },
      { name: "EU Business School", domain: "euruni.edu", city: "Barcelona / Munich / Geneva", speciality: "Business & Management", highlights: ["Multi-campus mobility", "Small English classes", "Global network"], website: "https://www.euruni.edu" },
      { name: "University of Europe for Applied Sciences", domain: "ue-germany.com", city: "Berlin / Hamburg", speciality: "Design, Media & Business", highlights: ["English-taught BA/MA", "Industry projects", "EU degree"], website: "https://www.ue-germany.com" },
      { name: "Wittenborg University", domain: "wittenborg.eu", city: "Apeldoorn, Netherlands", speciality: "International Business", highlights: ["6 start dates a year", "NVAO-accredited", "1-year MBA options"], website: "https://www.wittenborg.eu" },
    ],
  },
  {
    country: "UAE",
    slug: "uae",
    flag: "🇦🇪",
    blurb: "Tax-free hub for business, aviation, and hospitality — with UK/US satellite campuses.",
    universities: [
      { name: "Heriot-Watt University Dubai", domain: "hw.ac.uk", city: "Dubai", speciality: "Engineering, Business & AI", highlights: ["UK degree in Dubai", "Transfer to Edinburgh", "Scholarships"], website: "https://www.hw.ac.uk/dubai" },
      { name: "University of Birmingham Dubai", domain: "birmingham.ac.uk", city: "Dubai", speciality: "Business, Engineering & Computer Science", highlights: ["Russell Group degree", "Dubai Knowledge Park", "UK teaching standards"], website: "https://www.birmingham.ac.uk/dubai" },
      { name: "Middlesex University Dubai", domain: "mdx.ac.ae", city: "Dubai", speciality: "Business, Media & Psychology", highlights: ["UK degree issued", "Diverse campus", "Career services"], website: "https://www.mdx.ac.ae" },
      { name: "Curtin University Dubai", domain: "curtindubai.ac.ae", city: "Dubai", speciality: "Business, Logistics & IT", highlights: ["Australian degree", "Global rankings", "Industry partners"], website: "https://www.curtindubai.ac.ae" },
    ],
  },
];
