/**
 * Serialise structured data for an inline <script type="application/ld+json">.
 *
 * JSON.stringify leaves "<" alone, so a string value containing
 * "</script>" would end the script element early and turn the rest into
 * live HTML. Escaping every "<" as \u003c closes that off; JSON parsers
 * read the escape back as "<", so the structured data is unchanged.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders one or more JSON-LD objects as script tags (server-side). */
export function JsonLd({ data }: { data: object | readonly object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}
