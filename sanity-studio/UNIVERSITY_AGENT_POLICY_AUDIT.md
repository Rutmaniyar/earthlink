# University application-agent policy audit

Audit date: 5 August 2026. Scope: the original 98 published university records plus 78 deduplicated UK institutions requested for expansion, producing 176 published records. Sources were limited to official institution websites. Silence, third-party directories and general direct-application instructions were not treated as a prohibition.

## Application Support Only

| Institution | Sanity slug | Programme scope | Official evidence |
|---|---|---|---|
| University of Oxford | `university-of-oxford` | Graduate applications | [Your application account](https://www.ox.ac.uk/admissions/graduate/application-guide/starting-your-application/your-application-account): Oxford says it has no agent relationships and applicants must complete their own application. |
| University of Cambridge | `university-of-cambridge` | Undergraduate and postgraduate | [Undergraduate applications](https://www.undergraduate.study.cam.ac.uk/apply?ucam-ref=home-firstug) and [postgraduate international applications](https://www.postgraduate.study.cam.ac.uk/apply/how/international-applications): Cambridge does not work with educational agents and withdraws postgraduate applications submitted by agents. |
| Imperial College London | `imperial-college-london` | Institution-wide international recruitment | [Policy on International Agents](https://www.imperial.ac.uk/study/international-students/agents/): Imperial has no recruitment-agent agreements, commissions or endorsements. |
| London School of Economics | `london-school-of-economics` | Undergraduate recruitment and graduate application assistance | [Undergraduate applications](https://www.lse.ac.uk/study-at-lse/Undergraduate/Prospective-Students/How-to-apply) and [graduate applications](https://www.lse.ac.uk/study-at-lse/graduate/prospective-students/how-to-apply): LSE does not engage undergraduate recruitment agents and prohibits paid graduate application assistance. |
| Northeastern University | `northeastern-university` | Undergraduate first-year and transfer applications | [International Applicants](https://admissions.northeastern.edu/application-information/international-applicants/): applicants must complete the application themselves; paid agents may not complete any part. |
| University of Illinois Chicago | `university-of-illinois-chicago` | Undergraduate recruitment | [Policies and Procedures](https://admissions.uic.edu/undergraduate/policies-and-procedures): UIC does not directly partner with third-party agents; private consultants are not recognised representatives. |

The public Sanity field remains only `applicationSupportNote?: boolean`. Programme scope and policy evidence stay in this internal audit record and are not projected as a public source/note field. Official source URLs for the 78 imported institutions remain as non-published migration evidence in `scripts/import-expanded-uk-universities.mjs`.

## Audit totals

- UK baseline: 60 audited; 4 flagged, 54 official sites positively support agent use, 2 ambiguous.
- USA, Canada, Australia, Ireland and New Zealand: 24 audited; 2 flagged, 19 official sites positively support agent use, 3 ambiguous.
- Europe, UAE and Malta: 14 audited; 0 flagged, 12 official sites positively support agent use, 2 ambiguous.
- UK expansion: 78 new canonical records researched; 0 met the strict no-agent flag rule. Current UK CMS total: 138.
- Ambiguous records were not flagged: Durham University, University of Aberdeen, Arizona State University, George Mason University, University of Limerick, ThinkTalent College and MFMAC.

An institution accepting agents does not prove that Earthlink is formally appointed. Earthlink's partnership records remain the controlling evidence for any formal-partner claim.
