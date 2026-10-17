import fs from "fs";
import path from "path";

import os from "os";
import initialSiteData from "@/data/site-data.json";

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
  updatedAt?: number;
}

const BUNDLED_PATH = path.join(process.cwd(), "data", "site-data.json");
const TMP_PATH = path.join(os.tmpdir(), "scrollmate-site-data.json");

// In-memory cache for fast, seamless access within the active serverless instance
let memoryCache: SiteData | null = null;

export function getSiteData(): SiteData {
  let bestData: SiteData | null = memoryCache;
  let bestTime = bestData?.updatedAt || 0;

  // 1. Check if a newer version exists in /tmp (written during active session)
  try {
    if (fs.existsSync(TMP_PATH)) {
      const content = fs.readFileSync(TMP_PATH, "utf-8");
      const parsed = JSON.parse(content) as SiteData;
      if (parsed && parsed.brands && parsed.packages && parsed.steps) {
        const tmpTime = parsed.updatedAt || 0;
        if (!bestData || tmpTime >= bestTime) {
          bestData = parsed;
          bestTime = tmpTime;
        }
      }
    }
  } catch {
    // Ignore tmp read errors
  }

  // 2. Check local bundled file
  try {
    if (fs.existsSync(BUNDLED_PATH)) {
      const content = fs.readFileSync(BUNDLED_PATH, "utf-8");
      const parsed = JSON.parse(content) as SiteData;
      if (parsed && parsed.brands && parsed.packages && parsed.steps) {
        const bundledTime = parsed.updatedAt || 0;
        if (!bestData || bundledTime > bestTime) {
          bestData = parsed;
          bestTime = bundledTime;
        }
      }
    }
  } catch {
    // Ignore bundled file read errors
  }

  if (bestData) {
    memoryCache = bestData;
    return bestData;
  }

  // 3. Bundled import fallback
  memoryCache = initialSiteData as unknown as SiteData;
  return memoryCache;
}

export interface SaveSiteDataResult {
  success: boolean;
  persistedToDisk: boolean;
  persistedToTmp: boolean;
  persistedToGitHub: boolean;
}

export async function saveSiteData(
  newData: SiteData,
  overrideGhToken?: string
): Promise<SaveSiteDataResult> {
  // Always guarantee an updated timestamp so client and server can reconcile
  newData.updatedAt = Date.now();
  memoryCache = newData;

  let persistedToDisk = false;
  let persistedToTmp = false;
  let persistedToGitHub = false;

  // 1. Try writing to bundled path (works on local machine and non-serverless servers)
  try {
    const dir = path.dirname(BUNDLED_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BUNDLED_PATH, JSON.stringify(newData, null, 2), "utf-8");
    persistedToDisk = true;
  } catch {
    // Expected on read-only serverless filesystems (Vercel, AWS Lambda)
  }

  // 2. Always write to /tmp (always writable in Vercel & serverless environments)
  try {
    const tmpDir = path.dirname(TMP_PATH);
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(TMP_PATH, JSON.stringify(newData, null, 2), "utf-8");
    persistedToTmp = true;
  } catch (err) {
    console.error("Failed to write to /tmp:", err);
  }

  // 3. Commit to GitHub repository if token is provided
  const ghToken = overrideGhToken || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const ghRepo = process.env.GITHUB_REPO || "jrleonciowork-art/Scrollmate";
  if (ghToken) {
    try {
      persistedToGitHub = await commitToGitHub(ghRepo, ghToken, newData);
    } catch (ghErr) {
      console.warn("GitHub automated commit error:", ghErr);
    }
  }

  return {
    success: persistedToDisk || persistedToTmp || !!memoryCache,
    persistedToDisk,
    persistedToTmp,
    persistedToGitHub,
  };
}

async function commitToGitHub(repo: string, token: string, data: SiteData): Promise<boolean> {
  const filePath = "data/site-data.json";
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  let sha: string | undefined;
  try {
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Scrollmate-Admin",
      },
      cache: "no-store",
    });
    if (getRes.ok) {
      const fileInfo = await getRes.json();
      sha = fileInfo.sha;
    }
  } catch {
    // SHA retrieval failed
  }

  const contentBase64 = Buffer.from(JSON.stringify(data, null, 2), "utf-8").toString("base64");

  const putRes = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "Scrollmate-Admin",
    },
    body: JSON.stringify({
      message: "chore(cms): update site content from /ScrollmateAdmin",
      content: contentBase64,
      sha,
      branch: "main",
    }),
  });

  return putRes.ok;
}
