import { getCliClient } from "sanity/cli";

const u = (name, slug, domain, website, city, speciality, highlights, auditSource) => ({
  name,
  slug,
  domain,
  website,
  city,
  speciality,
  highlights,
  auditSource,
});

// Sources remain migration evidence only; they are deliberately not written to the public schema.
const additions = [
  u("Aberystwyth University", "aberystwyth-university", "aber.ac.uk", "https://www.aber.ac.uk", "Aberystwyth", "Environmental Science, Agriculture & Welsh Studies", ["First university in Wales", "Founded in 1872", "Research across climate, food, health, AI and space"], "https://www.aber.ac.uk/en/about-us/about/"),
  u("Anglia Ruskin University", "anglia-ruskin-university", "aru.ac.uk", "https://www.aru.ac.uk", "Cambridge, Chelmsford, Peterborough & Writtle", "Health, Business & Engineering", ["Campuses across four locations", "Students from 185 countries", "Professionally accredited courses"], "https://www.aru.ac.uk/about-us"),
  u("Bangor University", "bangor-university", "bangor.ac.uk", "https://www.bangor.ac.uk", "Bangor", "Ocean Science, Environment & Welsh Studies", ["Founded in 1884", "Major environmental-science community", "Research in oceans, low-carbon energy and Celtic studies"], "https://www.bangor.ac.uk/about"),
  u("Bath Spa University", "bath-spa-university", "bathspa.ac.uk", "https://www.bathspa.ac.uk", "Bath", "Art, Design, Culture & Education", ["Origins in the Bath School of Art", "Creative and applied focus", "Social Enterprise UK member"], "https://www.bathspa.ac.uk/about-us/"),
  u("Birkbeck, University of London", "birkbeck-university-of-london", "bbk.ac.uk", "https://www.bbk.ac.uk", "London", "Evening, Flexible & Professional Study", ["Founded in 1823", "Evening teaching model", "Bloomsbury campus"], "https://www.bbk.ac.uk/about-us/history"),
  u("Birmingham City University", "birmingham-city-university", "bcu.ac.uk", "https://www.bcu.ac.uk", "Birmingham", "Creative Arts, Computing & Health", ["31,000+ students", "Four academic faculties", "Home to Royal Birmingham Conservatoire"], "https://www.bcu.ac.uk/about-us"),
  u("Cardiff Metropolitan University", "cardiff-metropolitan-university", "cardiffmet.ac.uk", "https://www.cardiffmet.ac.uk", "Cardiff", "Art, Sport, Management & Technology", ["Llandaff and Cyncoed campuses", "Five academic schools", "Applied teaching and research"], "https://www.cardiffmet.ac.uk/about/"),
  u("Edge Hill University", "edge-hill-university", "edgehill.ac.uk", "https://www.edgehill.ac.uk", "Ormskirk", "Education, Health & Public Services", ["Founded in 1885", "Outstanding teacher education", "Green Flag campus"], "https://www.edgehill.ac.uk/about/"),
  u("Edinburgh Napier University", "edinburgh-napier-university", "napier.ac.uk", "https://www.napier.ac.uk", "Edinburgh", "Computing, Engineering & Creative Industries", ["Three Edinburgh campuses", "Five academic schools", "Applied research focus"], "https://www.napier.ac.uk/about-us"),
  u("Glasgow Caledonian University", "glasgow-caledonian-university", "gcu.ac.uk", "https://www.gcu.ac.uk", "Glasgow", "Health, Business & Engineering", ["Glasgow and London campuses", "Students from 100+ countries", "300+ industry partners"], "https://www.gcu.ac.uk/aboutgcu"),
  u("Goldsmiths, University of London", "goldsmiths-university-of-london", "gold.ac.uk", "https://www.gold.ac.uk", "London", "Arts, Media, Design & Social Sciences", ["New Cross campus", "University of London member", "International creative community"], "https://www.gold.ac.uk/about/about-goldsmiths/"),
  u("Keele University", "keele-university", "keele.ac.uk", "https://www.keele.ac.uk", "Keele", "Medicine, Sciences & Interdisciplinary Study", ["15,000+ students", "600-acre campus", "Founded in 1949"], "https://www.keele.ac.uk/about/"),
  u("Lancaster University", "lancaster-university", "lancaster.ac.uk", "https://www.lancaster.ac.uk", "Lancaster", "Management, Environment & Research", ["Collegiate university", "Students from 130+ countries", "International teaching partnerships"], "https://www.lancaster.ac.uk/about-us/"),
  u("Leeds Beckett University", "leeds-beckett-university", "leedsbeckett.ac.uk", "https://www.leedsbeckett.ac.uk", "Leeds", "Business, Sport & Professional Education", ["City and Headingley campuses", "Employer-connected courses", "Placement opportunities"], "https://www.leedsbeckett.ac.uk/courses/"),
  u("Liverpool Hope University", "liverpool-hope-university", "hope.ac.uk", "https://www.hope.ac.uk", "Liverpool", "Education, Humanities & Creative Arts", ["175+ years of history", "Hope Park and Creative Campus", "Ecumenical foundation"], "https://www.hope.ac.uk/aboutus/index.html"),
  u("London South Bank University", "london-south-bank-university", "lsbu.ac.uk", "https://www.lsbu.ac.uk", "London", "Engineering, Health & Built Environment", ["Founded in 1892", "Professionally accredited degrees", "Southwark campus"], "https://www.lsbu.ac.uk/about-us"),
  u("Northumbria University", "northumbria-university", "northumbria.ac.uk", "https://www.northumbria.ac.uk", "Newcastle upon Tyne", "Design, Business, Engineering & Health", ["Newcastle and London campuses", "Origins in 1880", "Students from 130+ countries"], "https://www.northumbria.ac.uk/about-us/"),
  u("Oxford Brookes University", "oxford-brookes-university", "brookes.ac.uk", "https://www.brookes.ac.uk", "Oxford", "Architecture, Business & Motorsport Engineering", ["Strong industry links", "Design-led architecture education", "Formula Student opportunities"], "https://www.brookes.ac.uk/about-brookes"),
  u("Queen Margaret University", "queen-margaret-university", "qmu.ac.uk", "https://www.qmu.ac.uk", "Musselburgh", "Healthcare, Education & Creative Industries", ["Founded in 1875", "Purpose-built campus", "Allied-health expertise"], "https://www.qmu.ac.uk/about-the-university"),
  u("Robert Gordon University", "robert-gordon-university", "rgu.ac.uk", "https://www.rgu.ac.uk", "Aberdeen", "Business, Engineering & Professional Study", ["Garthdee riverside campus", "Eight academic schools", "Practical industry experience"], "https://www.rgu.ac.uk/about"),
  u("Royal Holloway, University of London", "royal-holloway-university-of-london", "royalholloway.ac.uk", "https://www.royalholloway.ac.uk", "Egham", "Humanities, Sciences & Business", ["Historic women's-college roots", "135-acre Egham campus", "Research across climate, health, culture and AI"], "https://www.royalholloway.ac.uk/about-us/our-history/"),
  u("University of Staffordshire", "university-of-staffordshire", "staffs.ac.uk", "https://www.staffs.ac.uk", "Stoke-on-Trent", "Computing, Games & Creative Technology", ["Renamed in 2024", "Early computing-degree provider", "Stoke-on-Trent and London campuses"], "https://www.staffs.ac.uk/news/2024/09/university-of-staffordshire-unveils-new-brand-identity"),
  u("Swansea University", "swansea-university", "swansea.ac.uk", "https://www.swansea.ac.uk", "Swansea", "Engineering, Medicine & Marine Science", ["Founded in 1920", "Singleton Park and Bay campuses", "Strong industry collaboration"], "https://www.swansea.ac.uk/about-us/"),
  u("University for the Creative Arts", "university-for-the-creative-arts", "uca.ac.uk", "https://www.uca.ac.uk", "Canterbury, Epsom & Farnham", "Art, Design & Creative Industries", ["Specialist creative university", "160 years of creative education", "Campuses across Surrey and Kent"], "https://www.uca.ac.uk/about-us/"),
  u("University of Greater Manchester", "university-of-greater-manchester", "greatermanchester.ac.uk", "https://greatermanchester.ac.uk", "Bolton", "Engineering, Health & Professional Education", ["Formerly University of Bolton", "Renamed in 2024", "Bolton remains its main base"], "https://greatermanchester.ac.uk/news/university-of-bolton-announces-historic-name-change-to-university-of-greater-manchester"),
  u("University of Bradford", "university-of-bradford", "bradford.ac.uk", "https://www.bradford.ac.uk", "Bradford", "Peace Studies, Pharmacy & Engineering", ["University status since 1966", "Pioneering Peace Studies department", "University of Sanctuary"], "https://www.bradford.ac.uk/about/"),
  u("University of Brighton", "university-of-brighton", "brighton.ac.uk", "https://www.brighton.ac.uk", "Brighton", "Art, Design, Health & Engineering", ["Roots in an 1859 art school", "Three Brighton campuses", "Work-related undergraduate learning"], "https://www.brighton.ac.uk/about-us/index.aspx"),
  u("University of Buckingham", "university-of-buckingham", "buckingham.ac.uk", "https://www.buckingham.ac.uk", "Buckingham", "Law, Business & Medicine", ["Independent Royal Charter university", "Two-year degree pioneer", "Small-group teaching"], "https://www.buckingham.ac.uk/about/"),
  u("University of Lancashire", "university-of-lancashire", "lancashire.ac.uk", "https://www.lancashire.ac.uk", "Preston", "Engineering, Health & Veterinary Sciences", ["Formerly UCLan", "Roots dating to 1828", "Preston, Burnley and Westlakes campuses"], "https://www.lancashire.ac.uk/about-us/history"),
  u("University of Chester", "university-of-chester", "chester.ac.uk", "https://www.chester.ac.uk", "Chester", "Business, Health & Creative Industries", ["Founded in 1839", "Specialist Chester sites", "Regional university centres"], "https://www.chester.ac.uk/about/"),
  u("University of Chichester", "university-of-chichester", "chi.ac.uk", "https://www.chi.ac.uk", "Chichester", "Education, Sport & Performing Arts", ["Roots dating to 1839", "Chichester and Bognor Regis campuses", "Student-centred learning"], "https://www.chi.ac.uk/about-us/"),
  u("University of Cumbria", "university-of-cumbria", "cumbria.ac.uk", "https://www.cumbria.ac.uk", "Carlisle", "Health, Education & Outdoor Studies", ["Seven campuses", "Lake District location", "North West and London presence"], "https://www.cumbria.ac.uk/student-life/locations/"),
  u("University of Derby", "university-of-derby", "derby.ac.uk", "https://www.derby.ac.uk", "Derby", "Engineering, Business & Creative Arts", ["Industry-connected teaching", "Multiple Derby sites", "Derby, Chesterfield and Buxton presence"], "https://www.derby.ac.uk/about"),
  u("University of Essex", "university-of-essex", "essex.ac.uk", "https://www.essex.ac.uk", "Colchester", "Social Sciences, Law & Data Science", ["Wivenhoe Park campus", "Students from 140+ countries", "Strong knowledge-transfer activity"], "https://www.essex.ac.uk/about/facts-and-figures"),
  u("University of Gloucestershire", "university-of-gloucestershire", "glos.ac.uk", "https://www.glos.ac.uk", "Cheltenham & Gloucester", "Education, Cyber & Creative Arts", ["Teaching heritage since 1847", "Four campuses", "Work-experience focus"], "https://www.glos.ac.uk/about-us/"),
  u("University of Huddersfield", "university-of-huddersfield", "hud.ac.uk", "https://www.hud.ac.uk", "Huddersfield", "Engineering, Business & Music Technology", ["Town-centre campus", "Triple Gold TEF 2023", "Undergraduate work experience"], "https://www.hud.ac.uk/about/"),
  u("University of Hull", "university-of-hull", "hull.ac.uk", "https://www.hull.ac.uk", "Hull", "Marine Science, Health & Business", ["Single-site campus", "Opened in 1928", "Royal Charter awarded in 1954"], "https://www.hull.ac.uk/about/our-history"),
  u("University of Kent", "university-of-kent", "kent.ac.uk", "https://www.kent.ac.uk", "Canterbury", "Law, Business & Biosciences", ["Canterbury campus", "Medway campus", "Regional and global research"], "https://www.kent.ac.uk/about"),
  u("The University of Law", "university-of-law", "law.ac.uk", "https://www.law.ac.uk", "Multiple UK cities", "Law, Business & Professional Education", ["Legal-education roots from 1876", "University status since 2012", "Multiple campuses and online study"], "https://www.law.ac.uk/about/"),
  u("University of Lincoln", "university-of-lincoln", "lincoln.ac.uk", "https://www.lincoln.ac.uk", "Lincoln", "Agri-food, Engineering & Health", ["Brayford Pool campus", "Established in 1996", "Queen's Anniversary Prize recipient"], "https://www.lincoln.ac.uk/abouttheuniversity/"),
  u("University of London", "university-of-london", "london.ac.uk", "https://www.london.ac.uk", "London", "Distance, Online & Federal Education", ["Federation of 17 institutions", "Global distance and online provision", "Royal Charter roots in 1836"], "https://www.london.ac.uk/about"),
  u("University of Northampton", "university-of-northampton", "northampton.ac.uk", "https://www.northampton.ac.uk", "Northampton", "Health, Business & Social Impact", ["Waterside Campus", "Social-impact focus", "Modern university"], "https://www.northampton.ac.uk/about-us/"),
  u("University of Salford", "university-of-salford", "salford.ac.uk", "https://www.salford.ac.uk", "Salford", "Media, Engineering & Health", ["MediaCity campus", "Close to major broadcasters", "Industry-standard media facilities"], "https://www.salford.ac.uk/our-facilities/mediacity-campus"),
  u("University of South Wales", "university-of-south-wales", "southwales.ac.uk", "https://www.southwales.ac.uk", "Pontypridd, Cardiff & Newport", "Cyber Security, Engineering & Creative Industries", ["Campuses across South Wales", "Practice-led courses", "Professional study focus"], "https://www.southwales.ac.uk/our-agents/"),
  u("University of St Andrews", "university-of-st-andrews", "st-andrews.ac.uk", "https://www.st-andrews.ac.uk", "St Andrews", "Sciences, Humanities & Medicine", ["Founded in 1413", "Scotland's first university", "Historic coastal setting"], "https://www.st-andrews.ac.uk/about/"),
  u("University of Stirling", "university-of-stirling", "stir.ac.uk", "https://www.stir.ac.uk", "Stirling", "Sport, Aquaculture & Business", ["Loch-side campus", "Scotland's University for Sporting Excellence", "International community"], "https://www.stir.ac.uk/about/"),
  u("University of Suffolk", "university-of-suffolk", "uos.ac.uk", "https://www.uos.ac.uk", "Ipswich", "Business, Computing & Health", ["Ipswich Waterfront campus", "Opened in 2007", "Career-focused degrees"], "https://www.uos.ac.uk/about/"),
  u("University of Sunderland", "university-of-sunderland", "sunderland.ac.uk", "https://www.sunderland.ac.uk", "Sunderland & London", "Pharmacy, Media & Business", ["Roots dating to 1901", "Sunderland and London locations", "International study community"], "https://www.sunderland.ac.uk/about/"),
  u("University of the Arts London", "university-of-the-arts-london", "arts.ac.uk", "https://www.arts.ac.uk", "London", "Art, Design, Fashion & Communication", ["Six specialist colleges", "Creative courses across London", "International creative network"], "https://www.arts.ac.uk/about-ual"),
  u("UWE Bristol", "uwe-bristol", "uwe.ac.uk", "https://www.uwe.ac.uk", "Bristol", "Engineering, Business, Health & Creative Industries", ["Frenchay, City and Glenside campuses", "Placement options", "Professional-learning focus"], "https://www.uwe.ac.uk/about"),
  u("University of the West of Scotland", "university-of-the-west-of-scotland", "uws.ac.uk", "https://www.uws.ac.uk", "Paisley, Ayr, Lanarkshire, Dumfries & London", "Business, Computing & Health", ["Five campus locations", "Scottish and London study options", "Applied course portfolio"], "https://www.uws.ac.uk/about-uws/"),
  u("University of Wales Trinity Saint David", "university-of-wales-trinity-saint-david", "uwtsd.ac.uk", "https://www.uwtsd.ac.uk", "Carmarthen, Lampeter & Swansea", "Education, Design & Business", ["Multi-campus Welsh university", "Lampeter heritage dating to 1822", "Applied study options"], "https://www.uwtsd.ac.uk/about"),
  u("University of Winchester", "university-of-winchester", "winchester.ac.uk", "https://www.winchester.ac.uk", "Winchester", "Education, Humanities & Health", ["Roots dating to 1840", "Historic-city campus", "International community"], "https://www.winchester.ac.uk/about-us/"),
  u("University of Wolverhampton", "university-of-wolverhampton", "wlv.ac.uk", "https://www.wlv.ac.uk", "Wolverhampton, Walsall & Telford", "Engineering, Business & Health", ["Roots dating to 1827", "Multiple West Midlands locations", "Applied professional learning"], "https://www.wlv.ac.uk/about-us/"),
  u("University of Worcester", "university-of-worcester", "worcester.ac.uk", "https://www.worcester.ac.uk", "Worcester", "Education, Health & Sport", ["St John's and City campuses", "Health and sport facilities", "Professional course portfolio"], "https://www.worcester.ac.uk/about/"),
  u("York St John University", "york-st-john-university", "yorksj.ac.uk", "https://www.yorksj.ac.uk", "York & London", "Education, Psychology & Business", ["Roots dating to 1841", "York city-centre campus", "York and London locations"], "https://www.yorksj.ac.uk/about/"),
  u("Buckinghamshire New University", "buckinghamshire-new-university", "bucks.ac.uk", "https://www.bucks.ac.uk", "High Wycombe & Uxbridge", "Nursing, Aviation & Creative Industries", ["High Wycombe main campus", "Uxbridge healthcare campus", "Employment-focused teaching"], "https://www.bucks.ac.uk/home"),
  u("Ravensbourne University London", "ravensbourne-university-london", "ravensbourne.ac.uk", "https://www.ravensbourne.ac.uk", "London", "Digital Media, Design & Creative Technology", ["North Greenwich campus", "Creativity and technology focus", "Industry-shaped courses"], "https://www.ravensbourne.ac.uk/about-us"),
  u("Richmond American University London", "richmond-american-university-london", "richmond.ac.uk", "https://www.richmond.ac.uk", "London", "Liberal Arts, Business & International Relations", ["UK and US degrees", "American liberal-arts curriculum", "Chiswick Park campus"], "https://www.richmond.ac.uk/about-richmond/"),
  u("University College Birmingham", "university-college-birmingham", "ucb.ac.uk", "https://www.ucb.ac.uk", "Birmingham", "Hospitality, Culinary Arts & Business", ["City-centre campuses", "Specialist practical facilities", "Industry-led courses"], "https://www.ucb.ac.uk/about-us/"),
  u("Southampton Solent University", "southampton-solent-university", "solent.ac.uk", "https://www.solent.ac.uk", "Southampton", "Maritime, Media & Sport", ["Warsash Maritime School", "City-centre location", "Renamed in 2024"], "https://www.solent.ac.uk/media-hub/news/southampton-solent-university-celebrates-city-roots-with-new-name"),
  u("Cranfield University", "cranfield-university", "cranfield.ac.uk", "https://www.cranfield.ac.uk", "Cranfield & Shrivenham", "Aerospace, Defence, Engineering & Management", ["Postgraduate specialist university", "Campus airport", "Industry-linked research"], "https://www.cranfield.ac.uk/about"),
  u("Canterbury Christ Church University", "canterbury-christ-church-university", "canterbury.ac.uk", "https://www.canterbury.ac.uk", "Canterbury & Medway", "Education, Health & Arts", ["Founded in 1962", "Canterbury and Medway locations", "Agent Quality Framework member"], "https://www.canterbury.ac.uk/about-us"),
  u("Regent's University London", "regents-university-london", "regents.ac.uk", "https://www.regents.ac.uk", "London", "Business, Fashion & Liberal Arts", ["Regent's Park campus", "Independent university", "International student community"], "https://www.regents.ac.uk/about"),
  u("University of West London", "university-of-west-london", "uwl.ac.uk", "https://www.uwl.ac.uk", "London", "Hospitality, Music, Nursing & Business", ["Ealing and Brentford locations", "London College of Music", "Career-focused courses"], "https://www.uwl.ac.uk/about-us"),
  u("Leeds Trinity University", "leeds-trinity-university", "leedstrinity.ac.uk", "https://www.leedstrinity.ac.uk", "Leeds", "Journalism, Education & Business", ["Horsforth main campus", "Leeds City campus", "Workplace learning"], "https://www.leedstrinity.ac.uk/about/"),
  u("Lincoln Bishop University", "lincoln-bishop-university", "lincolnbishop.ac.uk", "https://www.lincolnbishop.ac.uk", "Lincoln", "Education, Humanities & Social Sciences", ["Founded in 1862", "Campus near Lincoln Cathedral", "Renamed in 2025"], "https://www.lincolnbishop.ac.uk/name-change-faqs"),
  u("Norwich University of the Arts", "norwich-university-of-the-arts", "norwichuni.ac.uk", "https://norwichuni.ac.uk", "Norwich", "Art, Design, Architecture, Media & Performance", ["Specialist creative university", "Origins dating to 1845", "Practice-based courses"], "https://norwichuni.ac.uk/"),
  u("Istituto Marangoni London", "istituto-marangoni-london", "istitutomarangoni.com", "https://www.istitutomarangoni.com/en/schools/london", "London", "Fashion, Design & Luxury Business", ["Specialist London school", "International school network", "London validated programmes"], "https://www.istitutomarangoni.com/en/schools/london"),
  u("Northeastern University London", "northeastern-university-london", "nulondon.ac.uk", "https://www.nulondon.ac.uk", "London", "Humanities, Computing & Business", ["Part of Northeastern's global system", "Central London locations", "Experiential learning"], "https://www.nulondon.ac.uk/"),
  u("St Mary's University, London", "st-marys-university-london", "stmarys.ac.uk", "https://www.stmarys.ac.uk", "Twickenham, London", "Sport, Education & Humanities", ["Founded in 1850", "Strawberry Hill campus", "Sport and teacher-education strengths"], "https://www.stmarys.ac.uk/about/"),
  u("University Centre Leeds", "university-centre-leeds", "ucleeds.ac.uk", "https://www.ucleeds.ac.uk", "Leeds", "Vocational Higher Education, Health & Creative Arts", ["Leeds city-centre provider", "Foundation and top-up degrees", "Small-class work-related learning"], "https://www.ucleeds.ac.uk/about-us/welcome-to-uc-leeds/about-university-centre-leeds/"),
  u("Wrexham University", "wrexham-university", "wrexham.ac.uk", "https://wrexham.ac.uk", "Wrexham", "Engineering, Creative Arts & Sport", ["North Wales location", "Roots dating to 1887", "Renamed in 2023"], "https://wrexham.ac.uk/news/articles/prifysgol-wrecsamwrexham-university-unveils-rebrand-and-new-name/"),
  u("Abertay University", "abertay-university", "abertay.ac.uk", "https://www.abertay.ac.uk", "Dundee", "Computer Games, Cyber Security & Business", ["City-centre campus", "Specialist games education", "Students from 60+ countries"], "https://www.abertay.ac.uk/about/"),
  u("BIMM University", "bimm-university", "bimm.ac.uk", "https://www.bimm.ac.uk", "Multiple UK cities", "Music, Film & Performing Arts", ["Specialist creative education", "Multiple UK locations", "Industry-informed teaching"], "https://www.bimm.ac.uk/about-bimm/"),
  u("Falmouth University", "falmouth-university", "falmouth.ac.uk", "https://www.falmouth.ac.uk", "Falmouth & Penryn", "Creative Arts, Design & Media", ["Falmouth and Penryn campuses", "Creative specialist", "Industry-connected learning"], "https://www.falmouth.ac.uk/about-us"),
  u("Harper Adams University", "harper-adams-university", "harper-adams.ac.uk", "https://www.harper-adams.ac.uk", "Newport, Shropshire", "Agriculture, Food, Animal Health & Land Management", ["Specialist rural university", "Teaching and research farm", "Opened in 1901"], "https://www.harper-adams.ac.uk/about/840/about-us/"),
  u("Leeds Arts University", "leeds-arts-university", "leeds-art.ac.uk", "https://www.leeds-art.ac.uk", "Leeds", "Art, Design, Fashion & Creative Technology", ["Specialist arts university", "Roots dating to 1846", "Blenheim Walk campus"], "https://www.leeds-art.ac.uk/"),
];

const client = getCliClient({ apiVersion: "2026-08-05" });
const current = await client.fetch(
  `*[_type == "university" && !(_id in path("drafts.**"))]{_id, name, domain, "slug": slug.current}`,
);
const bySlug = new Map(current.map((record) => [record.slug, record]));
const byDomain = new Map(current.filter((record) => record.domain).map((record) => [record.domain.toLowerCase(), record]));
const slugs = new Set();
const domains = new Set();
for (const entry of additions) {
  if (slugs.has(entry.slug)) throw new Error(`Duplicate import slug: ${entry.slug}`);
  if (domains.has(entry.domain)) throw new Error(`Duplicate import domain: ${entry.domain}`);
  slugs.add(entry.slug);
  domains.add(entry.domain);
}

const pending = [];
for (const [index, entry] of additions.entries()) {
  const existing = bySlug.get(entry.slug);
  if (existing) {
    if (existing.domain?.toLowerCase() !== entry.domain.toLowerCase()) {
      throw new Error(`Slug ${entry.slug} already exists with domain ${existing.domain}`);
    }
    continue;
  }
  const domainMatch = byDomain.get(entry.domain.toLowerCase());
  if (domainMatch) throw new Error(`${entry.domain} already belongs to ${domainMatch.slug}`);
  const { auditSource, slug, ...fields } = entry;
  pending.push({
    _id: `university-${slug}`,
    _type: "university",
    ...fields,
    slug: { _type: "slug", current: slug },
    country: { _type: "reference", _ref: "country-uk" },
    description: [
      {
        _type: "block",
        _key: "official-summary",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "official-summary-text",
            marks: [],
            text: `${fields.speciality}. ${fields.highlights.join(". ")}.`,
          },
        ],
      },
    ],
    order: 610 + index * 10,
  });
}

let transaction = client.transaction();
for (const document of pending) transaction = transaction.createIfNotExists(document);
transaction = transaction
  .patch("university-city-university-of-london", (patch) =>
    patch.set({
      name: "City St George's, University of London",
      domain: "citystgeorges.ac.uk",
      website: "https://www.citystgeorges.ac.uk",
    }),
  )
  .patch("university-london-school-of-economics", (patch) =>
    patch.set({ name: "London School of Economics and Political Science" }),
  );
await transaction.commit();

const total = await client.fetch(`count(*[_type == "university" && !(_id in path("drafts.**"))])`);
console.log(`Created ${pending.length} universities; published total is ${total}.`);
