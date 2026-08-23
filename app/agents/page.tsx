"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function IconArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="chevron-icon"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const upcomingDivisions = [
  {
    role: "Creative & Production",
    code: "Division 01",
    description:
      "Visual designers, motion editors, and reel animators transforming raw brand ideas into high-converting social media assets.",
    tags: ["Motion Design", "Short-form Reels", "Grid Aesthetics"],
    glow: "rgba(236, 72, 153, 0.25)",
    tagColor: "#f472b6",
  },
  {
    role: "Community & Retention",
    code: "Division 02",
    description:
      "Dedicated response operatives managing customer inquiries, comments, and direct messages to turn interest into immediate conversions.",
    tags: ["DM Funnels", "24/7 Response", "Audience Nurture"],
    glow: "rgba(249, 115, 22, 0.25)",
    tagColor: "#fdba74",
  },
  {
    role: "Growth & Analytics",
    code: "Division 03",
    description:
      "Media buyers and funnel strategists running paid campaigns, performance reporting, and monthly A/B optimizations.",
    tags: ["Paid Ads Scale", "A/B Hook Testing", "ROI Tracking"],
    glow: "rgba(34, 197, 94, 0.25)",
    tagColor: "#4ade80",
  },
];

export default function AgentsPage() {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOverviewOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="agents-page">
      {/* Site Navigation Header */}
      <header className="site-header">
        <div className="nav-wrap">
          <Link className="brand-link" href="/" aria-label="Scrollmate home">
            <Image
              src="/scrollmate-logo-white.png"
              width={650}
              height={138}
              alt="Scrollmate"
              priority
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <div
              className={`nav-dropdown${isOverviewOpen ? " is-open" : ""}`}
              ref={dropdownRef}
              onMouseEnter={() => setIsOverviewOpen(true)}
              onMouseLeave={() => setIsOverviewOpen(false)}
            >
              <button
                className="nav-dropdown-trigger"
                type="button"
                aria-haspopup="true"
                aria-expanded={isOverviewOpen}
                onClick={() => setIsOverviewOpen((prev) => !prev)}
              >
                <span>Overview</span>
                <IconChevronDown />
              </button>
              <div className="nav-dropdown-menu" role="menu">
                <Link
                  href="/#about"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">About Scrollmate</span>
                  <span className="dropdown-desc">Vision & value pillars</span>
                </Link>
                <Link
                  href="/#system"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">The System</span>
                  <span className="dropdown-desc">4-stage content pipeline</span>
                </Link>
                <Link
                  href="/#brands"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">Brands We Manage</span>
                  <span className="dropdown-desc">Portfolio spotlight</span>
                </Link>
                <Link
                  href="/#partner"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">Creative Partner</span>
                  <span className="dropdown-desc">Hero Editor Studios</span>
                </Link>
                <Link
                  href="/#packages"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">Packages</span>
                  <span className="dropdown-desc">Tier setups & inclusions</span>
                </Link>
              </div>
            </div>
            <Link href="/agents" className="nav-link nav-active">
              Agents
            </Link>
            <Link href="/resources" className="nav-link">
              Resources
            </Link>
            <Link href="/#contact" className="nav-cta-btn">
              Get in touch
            </Link>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <span></span>
              <span></span>
            </summary>
            <nav aria-label="Mobile navigation">
              <div className="mobile-nav-section">
                <span className="mobile-section-title">Pages</span>
                <Link href="/" className="mobile-page-link">Home</Link>
                <Link href="/agents" className="mobile-page-link nav-active">Agents</Link>
                <Link href="/resources" className="mobile-page-link">Resources</Link>
              </div>
              <div className="mobile-nav-divider" />
              <div className="mobile-nav-section">
                <span className="mobile-section-title">Overview Sections</span>
                <Link href="/#about" className="mobile-sub-link">About</Link>
                <Link href="/#system" className="mobile-sub-link">System</Link>
                <Link href="/#brands" className="mobile-sub-link">Brands</Link>
                <Link href="/#partner" className="mobile-sub-link">Partner</Link>
                <Link href="/#packages" className="mobile-sub-link">Packages</Link>
                <Link href="/#contact" className="mobile-sub-link">Contact</Link>
              </div>
            </nav>
          </details>
        </div>
      </header>

      {/* Hero Section */}
      <section className="agents-hero section-pad">
        <div className="agents-glow agents-glow-one" aria-hidden="true" />
        <div className="agents-glow agents-glow-two" aria-hidden="true" />
        <div className="section-shell">
          <div className="agents-breadcrumb">
            <Link href="/" className="back-link">
              <IconArrowLeft /> Back to Home
            </Link>
          </div>
          <div className="agents-hero-copy">
            <div className="eyebrow light">
              <span></span> Scrollmate Operatives & Leadership
            </div>
            <h1>
              The minds behind <em>every scroll.</em>
            </h1>
            <p className="agents-hero-lead">
              A specialized collective of brand strategists, creative directors, and growth
              architects dedicated to making every brand feel unmistakably its own.
            </p>
          </div>
        </div>
      </section>

      {/* Founder & Managing Director Spotlight */}
      <section className="founder-section section-pad" id="founder">
        <div className="section-shell">
          <div className="founder-card">
            <div className="founder-card-glow" aria-hidden="true" />
            <div className="founder-grid">
              <div className="founder-visual">
                <div className="founder-popout-stage">
                  <div className="founder-popout-glow" aria-hidden="true" />
                  <Image
                    src="/rob-leoncio-popout.png"
                    width={600}
                    height={600}
                    alt="Rob Leoncio — Founder & Managing Director"
                    className="founder-popout-img"
                    priority
                  />
                  <div className="founder-status-badge">
                    <span className="status-indicator" /> Executive Leadership
                  </div>
                </div>
              </div>

              <div className="founder-info">
                <div className="founder-role-badge">
                  <span>Founder &amp; Managing Director</span>
                </div>
                <h2>Rob Leoncio</h2>
                <p className="founder-title-sub">
                  Head of Brand Strategy, Creative Direction &amp; Agency Growth
                </p>

                <div className="founder-specialties">
                  <h4>Core Focus &amp; Specializations</h4>
                  <div className="specialties-grid">
                    <div className="specialty-item">
                      <span className="specialty-icon" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>Brand Architecture &amp; Strategic Voice</span>
                    </div>
                    <div className="specialty-item">
                      <span className="specialty-icon" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>High-Converting Content Engines</span>
                    </div>
                    <div className="specialty-item">
                      <span className="specialty-icon" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>Paid Ad Funnel &amp; Growth Scaling</span>
                    </div>
                    <div className="specialty-item">
                      <span className="specialty-icon" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>Aesthetic Direction &amp; Grid Strategy</span>
                    </div>
                  </div>
                </div>

                <div className="founder-actions">
                  <Link href="/#contact" className="button button-white">
                    Work Directly with Rob <IconArrowUpRight />
                  </Link>
                  <a
                    href="mailto:Scrollmate.business@gmail.com"
                    className="button button-outline-light"
                  >
                    Email Leadership
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operative Divisions / Team Architecture */}
      <section className="divisions-section section-pad" id="divisions">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <div className="eyebrow light">
              <span></span> Specialized Operatives
            </div>
            <h2>
              A multidisciplinary <em>growth engine.</em>
            </h2>
            <p>
              Every brand we manage is backed by dedicated functional specialists across creative
              production, community management, and data analysis.
            </p>
          </div>

          <div className="divisions-grid">
            {upcomingDivisions.map((division) => (
              <article
                className="division-card"
                key={division.role}
                style={
                  {
                    "--division-glow": division.glow,
                    "--division-tag": division.tagColor,
                  } as React.CSSProperties
                }
              >
                <div className="division-card-glow" aria-hidden="true" />
                <div className="division-top">
                  <span className="division-code">{division.code}</span>
                  <span className="division-status">Active Squad</span>
                </div>
                <h3>{division.role}</h3>
                <p>{division.description}</p>
                <div className="division-tags">
                  {division.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="expanding-roster-banner">
            <div className="roster-badge">Join the Squad</div>
            <h3>Want to join the Scrollmate team?</h3>
            <p>
              We are always looking for creative talent, video animators, short-form reel editors,
              and community managers. Send your portfolio and resume to our email:
            </p>
            <div className="roster-email-box">
              <a href="mailto:Scrollmate.business@gmail.com" className="roster-email-link">
                Scrollmate.business@gmail.com <IconArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Call to Action */}
      <section className="agents-cta-section section-pad">
        <div className="section-shell">
          <div className="agents-cta-box">
            <div className="cta-glow" aria-hidden="true" />
            <div className="eyebrow light">
              <span></span> Partner with Us
            </div>
            <h2>Ready to put our team behind your brand?</h2>
            <p>
              Choose a monthly package or get in touch for a custom roadmap tailored to your
              business goals.
            </p>
            <div className="cta-buttons">
              <Link href="/#packages" className="button button-white">
                Explore Packages <IconArrowUpRight />
              </Link>
              <Link href="/#contact" className="button button-outline-light">
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="section-shell footer-top">
          <Link className="footer-brand" href="/" aria-label="Back to home">
            <Image src="/scrollmate-logo-white.png" width={650} height={138} alt="Scrollmate" />
          </Link>
          <p>Your soulmate for every scroll you take.</p>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#system">System</Link>
            <Link href="/#brands">Brands</Link>
            <Link href="/#partner">Partner</Link>
            <Link href="/#packages">Packages</Link>
            <Link href="/agents">Agents</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} Scrollmate. All rights reserved.</span>
          <span>Content. Community. Growth.</span>
        </div>
      </footer>
    </main>
  );
}
