import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { COMPANY } from "@/content/company";

const REGISTERED_ADDRESS = `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.city}, England, ${COMPANY.address.postcode}`;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Earthlink Consultants" },
      {
        name: "description",
        content:
          "How Earthlink Consultants collects, uses, and protects your personal data under UK GDPR.",
      },
      { property: "og:title", content: "Privacy Policy — Earthlink Consultants" },
      {
        property: "og:description",
        content:
          "How Earthlink Consultants collects, uses, and protects your personal data under UK GDPR.",
      },
      { property: "og:url", content: absUrl("/privacy") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy — Earthlink Consultants" },
      {
        name: "twitter:description",
        content:
          "How Earthlink Consultants collects, uses, and protects your personal data under UK GDPR.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/privacy") }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="container-page max-w-3xl py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Legal</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 4 August 2026</p>

      <div className="prose prose-navy mt-10 max-w-none text-navy/85 [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-navy [&>p]:mt-3 [&>p]:leading-relaxed [&_li]:mt-2 [&_li]:leading-relaxed">
        <p>
          This notice explains how {COMPANY.legalName}, trading as Earthlink Consultants
          ("Earthlink", "we", "us"), uses personal information. We are the controller for the
          processing described here. Our company number is {COMPANY.companyNumber}, our registered
          office is {REGISTERED_ADDRESS}, and our Information Commissioner's Office registration
          reference is{" "}
          <a
            className="text-brand underline"
            href={`https://ico.org.uk/ESDWebPages/Entry/${COMPANY.icoRegistration}`}
            target="_blank"
            rel="noopener"
          >
            {COMPANY.icoRegistration}
          </a>
          .
        </p>

        <h2>1. Information we collect</h2>
        <p>Depending on the service you ask for, we may collect the following information:</p>
        <ul>
          <li>
            identity and contact information, such as your name, email address and phone number;
          </li>
          <li>
            enquiry and service information, such as your preferred destination, education,
            employment history, qualifications, goals and intended travel;
          </li>
          <li>
            documents you choose to provide for an agreed service, such as academic, professional,
            financial or immigration documents;
          </li>
          <li>our communications with you and records of consultations or complaints;</li>
          <li>
            limited technical information needed to operate and secure the website, together with
            your cookie and external-media choices; and
          </li>
          <li>marketing preferences where you have chosen to receive updates.</li>
        </ul>
        <p>
          Please do not send passports, financial records, health information or other sensitive
          documents through the general enquiry form. If an agreed service genuinely requires
          special-category or criminal-offence information, we will explain the additional legal
          condition and secure submission method before collecting it.
        </p>
        <p>
          We usually collect information directly from you. We may also receive it from a person you
          authorise to act for you, or receive application responses and status information from an
          institution, employer or authority we contact at your request. Providing information is
          not normally a statutory requirement, but information identified as necessary in your
          service agreement may be required to assess or deliver that service. If it is not
          provided, we may be unable to proceed.
        </p>

        <h2>2. How and why we use information</h2>
        <p>
          We use information to respond to enquiries and take steps you request before a contract;
          deliver the education, non-UK visitor-visa or candidate-matching service set out in your
          agreement; communicate with institutions, employers or authorities at your request;
          administer our relationship and handle complaints; meet legal obligations; keep our
          services secure; and send optional marketing only where permitted.
        </p>

        <h2>3. Legal basis</h2>
        <p>
          We rely on taking steps at your request before a contract and performing our contract with
          you; our legitimate interests in answering general enquiries, administering and securing
          our services, and establishing or defending legal claims; compliance with legal
          obligations; and consent where we ask for it, including optional marketing and external
          media. You may withdraw consent at any time without affecting earlier lawful processing.
        </p>

        <h2>4. UK visa enquiries and Stonebridge</h2>
        <p>
          Earthlink does not provide advice or application processing for any UK visa route.
          Stonebridge exclusively handles all such advice and application processing under a
          separate contract with you. If information is to pass from Earthlink to Stonebridge for an
          introduction you request, the collection-point notice will identify Stonebridge, the
          purpose, the information proposed for sharing and the applicable legal basis before it is
          sent. Stonebridge must provide its own privacy information for processing carried out
          under its separate contract.
        </p>

        <h2>5. Other sharing</h2>
        <p>
          We do not sell personal information. Where necessary for your requested service, we may
          share relevant information with a university or other education provider; an employer
          considering your application; a relevant authority for a non-UK service; professional
          advisers; or suppliers that host, secure or support our business systems. We disclose only
          what is necessary for the stated purpose and require appropriate data-protection terms
          where the law requires them.
        </p>

        <h2>6. International transfers</h2>
        <p>
          Our services concern destinations worldwide, so information may need to be sent outside
          the UK when you ask us to contact an institution, employer or authority abroad. Before a
          restricted transfer, we assess the lawful transfer mechanism and will not make the
          transfer unless an adequacy regulation, an appropriate safeguard or another exception
          permitted by UK law applies. We will explain the applicable mechanism when required.
          Contact us if you would like information about the safeguard used for a particular
          transfer.
        </p>

        <h2>7. Retention</h2>
        <p>
          We keep information only for as long as the purpose requires. We consider whether an
          enquiry became a client matter, the duration of the service, legal and accounting duties,
          complaint or claim periods, and whether a shorter anonymised record is sufficient.
          Marketing information is kept until you opt out or it is no longer useful. The cookie
          preference described below expires after six months. We securely delete or anonymise
          information when it is no longer needed.
        </p>

        <h2>8. Your rights</h2>
        <p>
          Depending on the processing and its legal basis, you may have rights to be informed; ask
          for access, correction, deletion, restriction or portability; object to processing; and
          withdraw consent. The right to object applies in particular to direct marketing and may
          also apply where we rely on legitimate interests. You are not normally required to pay to
          exercise a right. Email{" "}
          <a className="text-brand underline" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>{" "}
          to make a request. We may need proportionate information to confirm identity or authority
          to act for someone else.
        </p>
        <p>
          Earthlink does not use personal information collected through this website to make solely
          automated decisions that produce legal or similarly significant effects.
        </p>

        <h2 id="cookies">9. Cookies and storage technologies</h2>
        <p>
          We use a necessary first-party cookie named <code>earthlink_cookie_consent</code> to keep
          a versioned record of your choices for six months. External media is off by default and
          may load only after you enable it. You can use the cookie-settings control to reject it or
          withdraw consent as easily as you gave it.
        </p>
        <p>
          The embedded Google Map on our contact page is external media. It is replaced by a local
          placeholder until you allow external media; opening the ordinary Google Maps link is
          always optional. If enabled, Google may store or access information on your device and
          process technical information under its own privacy terms. We do not use consent given for
          external media as consent for advertising.
        </p>
        <p>
          The floating review certificate is supplied by Trustindex from{" "}
          <code>cdn.trustindex.io</code>. It remains unloaded until you allow external media. If
          enabled, Trustindex may receive technical request information and operate the certificate
          under its own privacy terms.
        </p>
        <p>
          The site also uses first-party local storage for its display setting and a short-lived
          university-logo URL cache. These entries support the site's appearance and performance and
          are not used for advertising or cross-site tracking. We review storage technologies when
          the site or its suppliers change and request fresh consent before adding a new non-exempt
          purpose.
        </p>

        <h2>10. Data-protection complaints</h2>
        <p>
          You can make a data-protection complaint through any of our contact channels. Emailing{" "}
          <a className="text-brand underline" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>{" "}
          is the most direct route. We will acknowledge receipt within 30 days, investigate and keep
          you informed without undue delay, and provide the outcome without undue delay. You may
          also complain to the Information Commissioner's Office at any time through the{" "}
          <a
            className="text-brand underline"
            href="https://ico.org.uk/make-a-complaint/"
            target="_blank"
            rel="noopener"
          >
            ICO complaints service
          </a>
          .
        </p>

        <h2>11. Contact</h2>
        <p>
          {COMPANY.legalName}, {REGISTERED_ADDRESS}. Email {COMPANY.email}. Phone {COMPANY.phone}.
        </p>
      </div>
    </div>
  );
}
