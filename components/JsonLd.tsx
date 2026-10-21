export default function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://janakaprasad.com");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Janaka Prasad",
    alternateName: "Janaka.Dev",
    url: siteUrl,
    image: `${siteUrl}/icon.svg`,
    jobTitle: "Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer specializing in React, Next.js, Node.js, Spring Boot, Supabase, and scalable system design.",
    sameAs: [
      "https://github.com/janakaprased99",
      "https://linkedin.com/in/janakaprased",
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "REST APIs",
      "Tailwind CSS",
      "Cloud Deployments",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
