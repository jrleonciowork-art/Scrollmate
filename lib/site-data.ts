import fs from "fs";
import path from "path";

export interface HeroData {
  eyebrow: string;
  headline: string;
  lead: string;
  marquee: string[];
}

export interface StepData {
  number: string;
  phase: string;
  name: string;
  lead: string;
  copy: string;
  deliverables: string[];
  tags: string[];
  image: string;
  color: string;
  glow: string;
  borderHover: string;
  tagColor: string;
  statusText: string;
}

export type BrandStatus = "Ongoing" | "Managed";

export interface BrandData {
  name: string;
  category: string;
  highlight: string;
  tags: string[];
  image: string;
  accent: string;
  borderHover: string;
  tagColor: string;
  status?: BrandStatus | string;
}

export interface PartnerData {
  name: string;
  lead: string;
  tags: string[];
  image: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PackageData {
  tier: string;
  tierLabel: string;
  name: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface ContactData {
  email: string;
  facebook: string;
  heading: string;
  subheading: string;
  promises: string[];
}

export interface SiteData {
  hero: HeroData;
  steps: StepData[];
  brands: BrandData[];
  partner: PartnerData;
  packages: PackageData[];
  contact: ContactData;
}

const DATA_PATH = path.join(process.cwd(), "data", "site-data.json");

export function getSiteData(): SiteData {
  try {
    if (fs.existsSync(DATA_PATH)) {
      const fileContent = fs.readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(fileContent) as SiteData;
    }
  } catch (error) {
    console.error("Error reading site-data.json:", error);
  }

  // Fallback defaults
  return {
    hero: {
      eyebrow: "Social media management that feels like magic",
      headline: "Stop scrolling by.<br />Start standing out.",
      lead: "Scrollmate helps growing brands win every scroll through content, community, and strategy.",
      marquee: [
        "GROWTH THAT MATTERS",
        "AUTHENTIC CONNECTIONS",
        "CONTENT THAT STICKS",
        "MORE CONVERSIONS",
        "EFFORTLESS ENGAGEMENT",
      ],
    },
    steps: [],
    brands: [],
    partner: {
      name: "Hero Editor Studios",
      lead: "A creative multimedia and production studio based in the Philippines.",
      tags: ["Graphic Design", "Branding", "Video Animation"],
      image: "/hero-editor-studios.png",
      badge: "Creative & Production Partner",
      ctaLabel: "Work with us",
      ctaHref: "#contact",
    },
    packages: [],
    contact: {
      email: "Scrollmate.business@gmail.com",
      facebook: "Scrollmate",
      heading: "Ready to put your brand on the map?",
      subheading: "Tell us where your brand is now—and where you want it to go.",
      promises: ["Friendly strategy", "Clear deliverables", "Built for growth"],
    },
  };
}

export function saveSiteData(newData: SiteData): boolean {
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(newData, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving site-data.json:", error);
    return false;
  }
}
