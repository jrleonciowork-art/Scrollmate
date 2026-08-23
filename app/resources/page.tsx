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

const frameworks = [
  {
    number: "01",
    title: "The 3-Second Hook Architecture",
    category: "Visual Engagement",
    description:
      "How to design the first 3 frames of every reel and post to interrupt passive scrolling and capture high-intent viewer attention.",
    deliverables: ["Curiosity Gaps", "Dynamic Motion", "Text On-Screen"],
  },
  {
    number: "02",
    title: "The Digital Storefront Audit",
    category: "Profile Optimization",
    description:
      "A complete inspection framework covering profile SEO keywords, high-converting bio copy, pinned proof assets, and organized highlights.",
    deliverables: ["Bio Conversion Hooks", "SEO Search Tags", "Highlights Architecture"],
  },
  {
    number: "03",
    title: "The Content-to-Conversion Flywheel",
    category: "Growth Strategy",
    description:
      "Structuring top-of-funnel reach, mid-funnel education, and bottom-of-funnel offers so every piece of content drives measurable business outcomes.",
    deliverables: ["Awareness Hooks", "Nurture Content", "Direct-Response CTA"],
  },
];

export default function ResourcesPage() {
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
    <main className="resources-page">
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
            <Link href="/agents" className="nav-link">
              Agents
            </Link>
            <Link href="/resources" className="nav-link nav-active">
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
                <Link href="/agents" className="mobile-page-link">Agents</Link>
                <Link href="/resources" className="mobile-page-link nav-active">Resources</Link>
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
      <section className="resources-hero section-pad">
        <div className="resources-glow resources-glow-one" aria-hidden="true" />
        <div className="resources-glow resources-glow-two" aria-hidden="true" />
        <div className="section-shell">
          <div className="resources-breadcrumb">
            <Link href="/" className="back-link">
              <IconArrowLeft /> Back to Home
            </Link>
          </div>
          <div className="resources-hero-copy">
            <div className="eyebrow light">
              <span></span> Knowledge & Research Hub
            </div>
            <h1>
              Why digital storefronts <em>win every scroll.</em>
            </h1>
            <p className="resources-hero-lead">
              Curated keynote talks and strategic frameworks on why a structured social media
              presence is the most crucial growth engine for modern businesses.
            </p>

            <div className="resources-nav-pills">
              <a href="#keynote">TEDx Keynote Talk</a>
              <a href="#frameworks">Strategic Frameworks</a>
              <a href="#faq">Digital Storefront FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Keynote Section */}
      <section className="keynote-section section-pad" id="keynote">
        <div className="section-shell">
          <div className="keynote-container">
            <div className="keynote-header">
              <div className="keynote-badge-row">
                <span className="tedx-badge">TEDx Talk</span>
                <span className="keynote-topic">Keynote Spotlight</span>
              </div>
              <h2>How Social Media is Changing the Way We Do Business</h2>
              <p className="keynote-speaker-line">
                Presented by <strong>Austin Falter</strong> at <em>TEDxBountiful</em>
              </p>
            </div>

            <div className="keynote-video-frame">
              <div className="video-responsive-wrapper">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/GFgFhsfKc_0?rel=0"
                  title="TEDx Talk: How Social Media is Changing the Way We Do Business - Austin Falter"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="embedded-video-player"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="keynote-takeaways-wrap">
              <div className="takeaways-heading">
                <h3>Key Takeaways for Growing Businesses</h3>
              </div>
              <div className="takeaways-grid">
                <article className="takeaway-card">
                  <div className="takeaway-num">01</div>
                  <h4>The Death of Generic Ads</h4>
                  <p>
                    Modern buyers tune out corporate advertising. They gravitate toward brands
                    that showcase genuine stories, behind-the-scenes authenticity, and relatable
                    human interactions.
                  </p>
                </article>
                <article className="takeaway-card">
                  <div className="takeaway-num">02</div>
                  <h4>Zero-Friction Discovery</h4>
                  <p>
                    Social media has collapsed the traditional multi-step marketing funnel into a
                    single scroll. Customers discover, evaluate credibility, and make buying
                    decisions inside the feed.
                  </p>
                </article>
                <article className="takeaway-card">
                  <div className="takeaway-num">03</div>
                  <h4>The Speed & Agility Edge</h4>
                  <p>
                    Growing brands have a decisive advantage over massive corporations: they can
                    engage customers personally, adapt content rapidly, and foster loyal community
                    relationships.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Playbooks / Frameworks Section */}
      <section className="frameworks-section section-pad" id="frameworks">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <div className="eyebrow light">
              <span></span> Strategic Playbooks
            </div>
            <h2>
              How Scrollmate operationalizes <em>momentum.</em>
            </h2>
            <p>
              We translate strategic growth principles into systematic daily workflows for our
              managed brands.
            </p>
          </div>

          <div className="frameworks-grid">
            {frameworks.map((framework) => (
              <article className="framework-card" key={framework.title}>
                <div className="framework-card-top">
                  <span className="framework-num">{framework.number}</span>
                  <span className="framework-category">{framework.category}</span>
                </div>
                <h3>{framework.title}</h3>
                <p>{framework.description}</p>
                <div className="framework-deliverables">
                  {framework.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Storefront FAQ */}
      <section className="faq-section section-pad" id="faq">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <div className="eyebrow light">
              <span></span> Common Questions
            </div>
            <h2>
              Frequently asked about <em>digital storefronts.</em>
            </h2>
          </div>

          <div className="faq-grid">
            <article className="faq-card">
              <h4>What exactly is a &quot;digital storefront&quot;?</h4>
              <p>
                Your digital storefront is the complete ecosystem of your public-facing social
                profiles (Instagram, Facebook, TikTok). It serves as your modern reception area,
                product showcase, portfolio, and immediate customer service channel.
              </p>
            </article>
            <article className="faq-card">
              <h4>Why is consistency more important than viral one-hit posts?</h4>
              <p>
                A viral post brings brief attention, but consistency builds compounding trust.
                When a prospective customer visits your profile, an active, cohesive feed proves
                your business is healthy, reputable, and attentive.
              </p>
            </article>
            <article className="faq-card">
              <h4>How does social management support physical or local businesses?</h4>
              <p>
                Local customers search social media for location atmosphere, real customer photos,
                and current offerings before visiting. A managed feed turns casual local browsers
                into foot traffic.
              </p>
            </article>
            <article className="faq-card">
              <h4>What is the difference between posting content and managing a brand?</h4>
              <p>
                Posting is simply uploading files. Brand management includes strategic audience
                positioning, proactive DM responses, profile SEO, aesthetic grid curation, and
                continual A/B metric refinement.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Resources Call To Action Banner */}
      <section className="resources-cta-section section-pad">
        <div className="section-shell">
          <div className="resources-cta-box">
            <div className="cta-glow" aria-hidden="true" />
            <div className="eyebrow light">
              <span></span> Put Strategy into Practice
            </div>
            <h2>Ready to build a digital storefront that converts?</h2>
            <p>
              Let&apos;s turn strategic frameworks into sustainable momentum and brand equity for
              your business.
            </p>
            <div className="cta-buttons">
              <Link href="/#packages" className="button button-white">
                View Packages <IconArrowUpRight />
              </Link>
              <Link href="/#contact" className="button button-outline-light">
                Get in Touch
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
