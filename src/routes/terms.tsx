import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { COMPANY } from "@/content/company";

const REGISTERED_ADDRESS = `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.city}, England, ${COMPANY.address.postcode}`;

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Earthlink Consultants" },
      {
        name: "description",
        content: "Terms governing use of Earthlink Consultants' website and consultancy services.",
      },
      { property: "og:title", content: "Terms of Service — Earthlink Consultants" },
      {
        property: "og:description",
        content: "Terms governing use of Earthlink Consultants' website and consultancy services.",
      },
      { property: "og:url", content: absUrl("/terms") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Terms of Service — Earthlink Consultants" },
      {
        name: "twitter:description",
        content: "Terms governing use of Earthlink Consultants' website and consultancy services.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/terms") }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="container-page max-w-3xl py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Legal</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 4 August 2026</p>

      <div className="prose prose-navy mt-10 max-w-none text-navy/85 [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-navy [&>p]:mt-3 [&>p]:leading-relaxed [&_li]:mt-2 [&_li]:leading-relaxed">
        <h2>1. Who we are</h2>
        <p>
          {COMPANY.legalName}, trading as Earthlink Consultants ("Earthlink", "we", "us"), is
          registered in England and Wales under company number {COMPANY.companyNumber}. Our
          registered office is {REGISTERED_ADDRESS}.
        </p>

        <h2>2. Scope of Earthlink's services</h2>
        <p>
          The precise service is the service described in your written agreement. Earthlink may
          provide education counselling and university-application assistance within each
          institution's published rules; visitor-visa assistance for destinations outside the UK;
          and candidate-focused recruitment support.
        </p>

        <h2>3. Every UK visa route is handled by Stonebridge</h2>
        <p>
          Earthlink does not provide advice or application processing for any UK visa route.
          Stonebridge exclusively provides all such advice and application processing under a
          separate contract directly with you. Stonebridge's scope, fees, cancellation terms,
          complaints process and responsibilities are not part of your Earthlink contract. An
          introduction by Earthlink does not make Earthlink responsible for Stonebridge's separate
          service or alter your statutory rights against either business.
        </p>
        <p>
          Stonebridge must provide its own pre-contract information and complaint, cancellation and
          refund route. If its service is contracted at a distance or off premises, any applicable
          14-day consumer cancellation right applies to that separate contract. Work during that
          period may begin only after the consumer expressly requests it; any permitted charge for
          work supplied before cancellation must be proportionate. Cancellation or service
          complaints concerning Stonebridge must be sent through the contact route in Stonebridge's
          agreement.
        </p>

        <h2>4. Recruitment and jobs</h2>
        <p>
          Our recruitment service helps a job seeker identify suitable employers and opportunities
          and may assist with CV or application preparation. Earthlink does not provide sponsor
          licences, arrange sponsorship, act as a sponsor-licensed employer, issue certificates of
          sponsorship, or guarantee an interview, offer, employment or immigration outcome.
        </p>
        <p>
          Earthlink does not charge a work-seeker for finding or trying to find work. Any optional
          paid CV or interview-preparation service is separate, is not a condition of work-finding
          help, and will have written fees, cancellation information and service terms before it is
          supplied.
        </p>

        <h2>5. Forming a contract</h2>
        <p>
          A consultation or enquiry does not by itself create a paid engagement. Before a consumer
          contract is made at a distance or away from our office, we will provide, in clear terms,
          our identity and contact details; the service description; total price and any applicable
          taxes; payment and performance arrangements; contract duration and ending conditions;
          cancellation information; and our complaints route. Your agreement and confirmation will
          be provided on paper, by email or in another format you can keep unchanged for future
          reference.
        </p>

        <h2>6. Fees and third-party charges</h2>
        <p>
          Your agreement must state Earthlink's charges, the services they cover, when payment is
          due, and any separately payable third-party charge known before the contract. A payment to
          an authority, institution or other third party is governed by that recipient's terms, but
          no description of a third-party payment as non-refundable removes a refund or remedy that
          UK consumer law gives you against Earthlink.
        </p>

        <h2>7. Consumer cancellation rights</h2>
        <p>
          If you are a consumer and make a service contract with Earthlink online, by phone or
          email, or away from our business premises, you normally have 14 days to cancel without
          giving a reason. For a service contract, the period starts on the day after the contract
          is made. You may cancel by emailing {COMPANY.email} or making any other clear statement
          that you wish to cancel; you do not have to use the model form below.
        </p>
        <p>
          We will not begin a paid service during that period unless you expressly ask us to. If you
          cancel after making that request, you may have to pay a proportionate amount for the part
          properly supplied before cancellation. You lose the cancellation right after the service
          has been fully performed during the cancellation period only if you expressly requested
          the early start and acknowledged that full performance would end that right. Any refund
          due will be made without undue delay and no later than 14 days after we are told of the
          cancellation, using the original payment method unless you expressly agree otherwise.
        </p>

        <h2>8. Model cancellation form</h2>
        <div className="mt-4 rounded border hairline bg-card p-5 text-sm leading-relaxed">
          <p>
            To: {COMPANY.legalName}, {REGISTERED_ADDRESS}; {COMPANY.email}
          </p>
          <p className="mt-2">
            I give notice that I cancel my contract for the following service: [service].
          </p>
          <p className="mt-2">Contract date: [date]</p>
          <p className="mt-2">Consumer name and address: [details]</p>
          <p className="mt-2">Date of notice: [date]</p>
        </div>

        <h2>9. Service standards and statutory remedies</h2>
        <p>
          We will perform our service with reasonable care and skill, within an agreed time or a
          reasonable time, and for the agreed price or a reasonable price where no price was fixed.
          Information we give you about Earthlink or the service and which you rely on may form part
          of the contract. If the service does not conform, consumer law may entitle you to repeat
          performance, a price reduction or another remedy. Nothing in these terms excludes or
          restricts those statutory rights.
        </p>

        <h2>10. Your responsibilities</h2>
        <p>
          You must provide complete, accurate and authentic information, review documents before
          submission, meet deadlines notified to you, and tell us promptly of relevant changes. We
          will not knowingly prepare or submit false or misleading information. A delay caused by
          missing or inaccurate information may affect an agreed timetable.
        </p>

        <h2>11. Third-party decisions and outcomes</h2>
        <p>
          Universities, employers and public authorities make their own decisions and may change
          their rules. Earthlink cannot guarantee admission, a scholarship, a visa, an interview or
          employment. That does not reduce our duty to perform Earthlink's agreed work with
          reasonable care and skill or your rights if we fail to do so.
        </p>

        <h2>12. Liability</h2>
        <p>
          Nothing in these terms excludes liability that cannot lawfully be excluded, including
          liability for fraud, fraudulent misrepresentation, or death or personal injury caused by
          negligence, and nothing limits your statutory consumer rights. Subject to those
          protections, Earthlink is not responsible for a third party's independent decision or for
          a delay caused solely by events outside our reasonable control. Any further limitation in
          a service agreement applies only to the extent it is fair and permitted by law.
        </p>

        <h2>13. Complaints</h2>
        <p>
          Please send a service complaint to {COMPANY.email} or contact us using the details below.
          We will confirm receipt, investigate it fairly and explain the outcome. Data-protection
          complaints are handled under the separate process described in our privacy policy.
          Complaints about Stonebridge's UK visa service must be sent through Stonebridge's separate
          complaints route stated in its agreement.
        </p>

        <h2>14. Intellectual property</h2>
        <p>
          Unless stated otherwise, Earthlink owns or licenses the website's design and original
          content. You may use it for personal, non-commercial reference but may not reproduce or
          exploit it without permission.
        </p>

        <h2>15. Governing law</h2>
        <p>
          These terms are governed by the law of England and Wales. If you are a consumer, you keep
          any mandatory protections of the law where you live and may bring proceedings in any court
          the law permits. If one term is unenforceable, the remaining terms continue.
        </p>

        <h2>16. Contact</h2>
        <p>
          {COMPANY.legalName}, {REGISTERED_ADDRESS}. Email {COMPANY.email}. Phone {COMPANY.phone}.
        </p>
      </div>
    </div>
  );
}
