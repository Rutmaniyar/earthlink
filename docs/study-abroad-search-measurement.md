# Study-abroad search measurement

## Provisional baseline

Baseline window: 16-22 August 2026, from the Search Console CSV exports supplied with this implementation.

The exports form two likely report sets, but both `Filters` files contain only Web and Last 7 days. Confirm the report names in Search Console before treating the sets as a formal comparison.

- Likely Generative AI set: `Chart.csv`, `Pages.csv`, `Countries.csv`, `Devices.csv`, and `Filters.csv`. These files contain impressions only. Total: 86 impressions.
- Likely overall Web Performance set: the matching `(1)` files, plus `Queries.csv` and `Search appearance.csv`. Total: 930 impressions and 10 clicks.

The pairing above is an inference from the file schemas and names, not a label present in either filter export.

### Priority-page baseline

| Page                             | Likely Generative AI impressions | Overall Web impressions |
| -------------------------------- | -------------------------------: | ----------------------: |
| `/blog/cost-of-living-uk-cities` |                               29 |                      81 |
| `/blog/top-mba-programs-europe`  |                               24 |                      82 |

These two pages lead the likely Generative AI set and were therefore included in the first content refresh.

## Review cadence

Run reviews 28, 56, and 90 days after the changes are deployed to production. Record the deployment date alongside every comparison.

At each review, capture:

- impressions and clicks for each new country hub and priority guide;
- number of countries and non-brand queries producing impressions;
- index and canonical status for all new routes;
- average position for study-abroad question clusters;
- internal-link and crawl findings for the Europe-to-country hub structure;
- Generative AI visibility from Google's dedicated report where it is available;
- leads from the existing email and WhatsApp CTAs, retaining page and country context.

Do not compare partial windows, mix the two report sets, add a new analytics vendor, or treat visibility changes as a ranking guarantee.
