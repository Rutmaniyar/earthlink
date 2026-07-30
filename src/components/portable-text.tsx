import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { imgUrl } from "@/lib/sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = imgUrl(value, 1400);
      if (!src) return null;
      return (
        <figure className="my-6">
          <img src={src} alt={value?.alt ?? ""} loading="lazy" className="w-full rounded-md" />
          {value?.alt ? (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">{value.alt}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="mt-10 font-serif text-2xl text-navy md:text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-serif text-xl text-navy md:text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand pl-4 italic text-navy/80">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-brand underline underline-offset-2 hover:text-gold"
      >
        {children}
      </a>
    ),
  },
};

export function PortableBody({ value }: { value: unknown }) {
  if (!value) return null;
  return (
    <div className="prose max-w-none">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
