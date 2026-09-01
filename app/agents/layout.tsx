import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team & Agents | Scrollmate",
  description:
    "Meet the leadership and creative operatives behind Scrollmate. Rob Leoncio (Founder & Managing Director) and Jen Leoncio (Digital Campaigns Director).",
  openGraph: {
    title: "Meet the Team & Agents | Scrollmate",
    description:
      "Meet the leadership, strategists, and creative operatives behind Scrollmate's growth engine.",
    type: "profile",
  },
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
