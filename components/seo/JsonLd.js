/**
 * Renders a JSON-LD graph. Server-rendered so crawlers and AI systems can read
 * it without executing JavaScript.
 */
export default function JsonLd({ data, id }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
