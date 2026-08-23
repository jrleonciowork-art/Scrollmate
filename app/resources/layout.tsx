import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources & Knowledge Hub | Scrollmate",
  description:
    "Curated talks, strategic frameworks, and insights on why social media management and digital storefronts are essential for modern business growth.",
  openGraph: {
    title: "Resources & Knowledge Hub | Scrollmate",
    description:
      "Explore keynote talks and strategic frameworks on social media management for growing businesses.",
    type: "article",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
