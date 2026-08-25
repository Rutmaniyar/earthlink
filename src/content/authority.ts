export type SourceRef = {
  title: string;
  authority: string;
  href: string;
  description?: string;
};

export const CONTENT_REVIEW_NOTICE =
  "Study, work, immigration, and institution requirements can change. Confirm the current position with the relevant authority and contact Earthlink before you rely on this guide.";

export const COST_GUIDANCE_NOTICE =
  "Tuition, visa charges, living costs, financial-evidence rules, wages, scholarships, and salary thresholds change regularly. Use the live sources below and contact Earthlink for a current, profile-specific check.";

export const COUNTRY_SOURCES = {
  ukStudentVisa: {
    title: "Student visa",
    authority: "GOV.UK",
    href: "https://www.gov.uk/student-visa",
    description: "Current eligibility, documents, application steps, and conditions.",
  },
  ukGraduateVisa: {
    title: "Graduate visa",
    authority: "GOV.UK",
    href: "https://www.gov.uk/graduate-visa",
    description: "Current Graduate Route eligibility and application guidance.",
  },
  usaEducation: {
    title: "Your five steps to US study",
    authority: "EducationUSA",
    href: "https://educationusa.state.gov/your-5-steps-us-study",
    description:
      "Official planning framework for research, finance, applications, visas, and departure.",
  },
  usaVisa: {
    title: "Student visas",
    authority: "US Department of State",
    href: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    description: "Current student-visa process and official application links.",
  },
  usaWork: {
    title: "Working in the United States",
    authority: "Study in the States",
    href: "https://studyinthestates.dhs.gov/students/resources/working",
    description: "Official overview of employment rules for international students.",
  },
  germanyStudy: {
    title: "Visa for studying",
    authority: "Make it in Germany",
    href: "https://www.make-it-in-germany.com/en/visa-residence/types/studying/",
    description: "Official study-visa, residence, and financial-evidence overview.",
  },
  germanyProgrammes: {
    title: "Studying in Germany",
    authority: "DAAD",
    href: "https://www.daad.de/en/studying-in-germany/",
    description: "Programme research, university information, and application guidance.",
  },
  franceApplications: {
    title: "Apply for higher education in France",
    authority: "Campus France",
    href: "https://www.campusfrance.org/en/application-higher-education-france",
    description: "Official application-route guidance for international students.",
  },
  franceVisa: {
    title: "Student visa",
    authority: "France-Visas",
    href: "https://www.france-visas.gouv.fr/en/etudiant",
    description: "Current student-visa route and supporting-document guidance.",
  },
  spainStudy: {
    title: "Stay for studies",
    authority: "Spain Ministry of Inclusion, Social Security and Migration",
    href: "https://ciudadaniaexterior.inclusion.gob.es/es/web/migraciones/w/estancia-por-estudios",
    description: "Official rules for study stays and current application requirements.",
  },
  spainAdmission: {
    title: "UNEDasiss accreditation",
    authority: "UNEDasiss",
    href: "https://unedasiss.uned.es/home",
    description:
      "Admissions support and accreditation information for eligible international applicants.",
  },
  portugalAdmission: {
    title: "International students",
    authority: "Portugal DGES",
    href: "https://dges.gov.pt/en/pagina/international-students",
    description: "Official higher-education admission information for international students.",
  },
  portugalResidence: {
    title: "Residence for higher-education students",
    authority: "Portugal AIMA",
    href: "https://aima.gov.pt/pt/estudar/autorizacao-de-residencia-emitida-a-estudantes-do-ensino-superior-art-o-91",
    description: "Current residence-permit information for higher-education students.",
  },
  maltaVisa: {
    title: "Visa frequently asked questions",
    authority: "Malta Identita",
    href: "https://identita.gov.mt/frequently-asked-questions/visa/",
    description: "Current national-visa guidance and official application information.",
  },
  maltaProgrammes: {
    title: "Licensed providers and accredited programmes",
    authority: "MFHEA",
    href: "https://mfhea.mt/list-of-licensed-providers-and-accredited-programmes/",
    description: "Official register for checking providers and programme accreditation.",
  },
} satisfies Record<string, SourceRef>;
