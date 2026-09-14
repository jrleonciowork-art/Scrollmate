"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import LoadingScreen from "./components/LoadingScreen";

const brands = [
  {
    name: "Authentic MNL",
    category: "Fashion & Lifestyle",
    highlight: "Curated aesthetic & organic engagement",
    tags: ["Grid Design", "Copywriting", "SEO"],
    image: "/authentic-mnl.webp",
    accent: "rgba(226, 180, 72, 0.35)",
    borderHover: "rgba(226, 180, 72, 0.55)",
    tagColor: "#f6d582",
  },
  {
    name: "Cuisineer!",
    category: "Food & Community",
    highlight: "Thumb-stopping food reels & community hype",
    tags: ["Short-form Video", "Community", "Growth"],
    image: "/cuisineer.webp",
    accent: "rgba(215, 60, 45, 0.35)",
    borderHover: "rgba(230, 80, 60, 0.55)",
    tagColor: "#ff9d8c",
  },
  {
    name: "Gunita: Print & Crafts",
    category: "Prints & Crafts",
    highlight: "Product showcases & high-converting ads",
    tags: ["Ad Strategy", "Visual Assets", "A/B Testing"],
    image: "/sintra-board.webp",
    accent: "rgba(235, 110, 145, 0.35)",
    borderHover: "rgba(245, 130, 165, 0.55)",
    tagColor: "#fbcfe8",
  },
  {
    name: "Empleo",
    category: "Careers & Employment",
    highlight: "Brand positioning & modern audience reach",
    tags: ["Strategy", "Audience Growth", "Branding"],
    image: "/empleo.png",
    accent: "rgba(44, 130, 241, 0.35)",
    borderHover: "rgba(60, 145, 255, 0.55)",
    tagColor: "#93c5fd",
  },
];

const packages = [
  {
    tier: "Tier 01",
    tierLabel: "Organic Foundation",
    name: "The Optimizer",
    description: "For brands that need a stronger, more consistent social presence and storefront credibility.",
    features: [
      "Profile uplift & bio SEO optimization",
      "Content scheduling & copywriting",
      "Aesthetic grid direction & feed planning",
      "Community management & proactive response",
      "Monthly comprehensive performance report",
    ],
  },
  {
    tier: "Tier 02",
    tierLabel: "Content Engine",
    name: "The Creator",
    description: "For brands ready to turn strategy into high-volume, thumb-stopping creative assets.",
    features: [
      "Everything included in The Optimizer",
      "Custom visual asset creation & carousel design",
      "Short-form video & reel editing (with hooks)",
      "Monthly content strategy plan & roadmap",
      "Priority creative revision rounds",
    ],
    featured: true,
  },
  {
    tier: "Tier 03",
    tierLabel: "Growth & Paid Scale",
    name: "The Accelerator",
    description: "For growing brands ready to pair high-impact organic content with paid acquisition.",
    features: [
      "Everything included in The Creator",
      "Paid ad campaign strategy & setup",
      "Creative & copy A/B hook testing",
      "Full-funnel campaign management & optimization",
      "Dedicated ROAS scaling & growth reporting",
    ],
  },
];

function IconArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
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

function IconArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}


function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconPlay({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function IconTrending({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "3px" }}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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


const steps = [
  {
    number: "01",
    phase: "Discovery & Blueprint",
    name: "Blueprint",
    lead: "Laying the strategic foundation for your digital storefront.",
    copy: "We align on your commercial revenue targets, ideal buyer personas, brand voice, content pillars, and aesthetic visual grid before designing or shooting a single asset.",
    deliverables: [
      "Target Buyer Persona & Competitor Benchmark",
      "Brand Voice, Tone & Messaging Matrix",
      "Core Content Pillars & Hook Strategy",
      "Aesthetic Grid & Moodboard Direction",
    ],
    tags: ["Audience Persona", "Brand Voice", "Content Pillars", "Grid Moodboard"],
    image: "/process-blueprint.webp",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.4)",
    borderHover: "rgba(168, 85, 247, 0.65)",
    tagColor: "#d8b4fe",
    statusText: "Strategic Initiation",
  },
  {
    number: "02",
    phase: "Creative Production",
    name: "Build",
    lead: "Transforming strategy into high-converting multimedia assets.",
    copy: "We engineer a high-volume, structured content engine—combining thumb-stopping video reels, carousel graphics, persuasive direct-response copy, and polished branding.",
    deliverables: [
      "Custom Graphic Design & Carousels",
      "Short-form Video & Reel Motion Editing",
      "Direct-Response Copywriting & Captions",
      "Batch Asset Staging & Review",
    ],
    tags: ["Feed Architecture", "Copy Library", "Short-form Reels", "Motion Graphics"],
    image: "/process-build.webp",
    color: "#ec4899",
    glow: "rgba(236, 72, 153, 0.4)",
    borderHover: "rgba(236, 72, 153, 0.65)",
    tagColor: "#f472b6",
    statusText: "Asset Manufacturing",
  },
  {
    number: "03",
    phase: "Deployment & Growth",
    name: "Launch",
    lead: "Executing continuous distribution and active community nurture.",
    copy: "We schedule, publish at peak algorithmic windows, engage your audience in comments and direct messages 24/7, and turn casual scrollers into loyal repeat customers.",
    deliverables: [
      "Peak-Time Multi-Channel Scheduling",
      "24/7 Direct Message & Inbound Lead Nurture",
      "Proactive Comment Engagement & Brand Hype",
      "Story Sequences & Interactive Polls",
    ],
    tags: ["Smart Scheduling", "Community DMs", "Grid Management", "Active Nurture"],
    image: "/process-launch.webp",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.4)",
    borderHover: "rgba(249, 115, 22, 0.65)",
    tagColor: "#fb923c",
    statusText: "Active Distribution",
  },
  {
    number: "04",
    phase: "Analytics & Scale",
    name: "Optimize",
    lead: "Iterative performance testing to double down on what converts.",
    copy: "We track conversion KPIs, retention rates, and engagement data to run A/B hook tests, refine creative angles, and scale winning organic posts into profitable paid ad funnels.",
    deliverables: [
      "Monthly KPI & Executive Revenue Reports",
      "A/B Hook & Creative Angle Iteration",
      "Top-Performing Organic Asset Boosting",
      "Paid Ad Funnel Scale & ROAS Tracking",
    ],
    tags: ["Monthly Reporting", "A/B Hook Testing", "Paid Ad Scale", "ROAS Growth"],
    image: "/process-optimize.webp",
    color: "#22c55e",
    glow: "rgba(34, 197, 94, 0.4)",
    borderHover: "rgba(34, 197, 94, 0.65)",
    tagColor: "#4ade80",
    statusText: "Compounding Growth",
  },
];

const pulseItems = [
  { day: "MON", title: "Brand story", className: "post-one", hasPlay: false },
  { day: "WED", title: "Reel edit", className: "post-two", hasPlay: true },
  { day: "FRI", title: "Promo drop", className: "post-three", hasPlay: false },
];

export default function Home() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [activePulse, setActivePulse] = useState(0);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const systemTrackRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOverviewOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = systemTrackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startTrigger = windowHeight * 0.75;
      const scrollableDistance = rect.height;

      if (scrollableDistance <= 0) return;

      const scrolled = startTrigger - rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVisualMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const visual = visualRef.current;
    if (!visual) return;

    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    visual.style.setProperty("--move-x", `${x * 14}px`);
    visual.style.setProperty("--move-y", `${y * 10}px`);
    visual.style.setProperty("--stat-x", `${x * -20}px`);
    visual.style.setProperty("--stat-y", `${y * -16}px`);
    visual.style.setProperty("--tilt-x", `${x * 4}deg`);
    visual.style.setProperty("--tilt-y", `${y * -4}deg`);
  };

  const resetVisual = () => {
    const visual = visualRef.current;
    if (!visual) return;

    visual.style.setProperty("--move-x", "0px");
    visual.style.setProperty("--move-y", "0px");
    visual.style.setProperty("--stat-x", "0px");
    visual.style.setProperty("--stat-y", "0px");
    visual.style.setProperty("--tilt-x", "0deg");
    visual.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <main>
      <LoadingScreen />

      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand-link" href="#home" aria-label="Scrollmate home">
            <Image
              src="/scrollmate-logo-white.png"
              width={650}
              height={138}
              alt="Scrollmate"
              priority
            />
          </a>
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
                <a
                  href="#about"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">About Scrollmate</span>
                  <span className="dropdown-desc">Vision & value pillars</span>
                </a>
                <a
                  href="#system"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">The System</span>
                  <span className="dropdown-desc">4-stage content pipeline</span>
                </a>
                <a
                  href="#brands"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">Brands We Manage</span>
                  <span className="dropdown-desc">Portfolio spotlight</span>
                </a>
                <a
                  href="#partner"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">Creative Partner</span>
                  <span className="dropdown-desc">Hero Editor Studios</span>
                </a>
                <a
                  href="#packages"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setIsOverviewOpen(false)}
                >
                  <span className="dropdown-title">Packages</span>
                  <span className="dropdown-desc">Tier setups & inclusions</span>
                </a>
              </div>
            </div>
            <a href="/resources" className="nav-link">
              Resources
            </a>
            <a href="#contact" className="nav-cta-btn">
              Get in touch
            </a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><span></span><span></span></summary>
            <nav aria-label="Mobile navigation">
              <div className="mobile-nav-section">
                <span className="mobile-section-title">Pages</span>
                <a href="#home" className="mobile-page-link">Home</a>
                <a href="/resources" className="mobile-page-link">Resources</a>
              </div>
              <div className="mobile-nav-divider" />
              <div className="mobile-nav-section">
                <span className="mobile-section-title">Overview Sections</span>
                <a href="#about" className="mobile-sub-link">About</a>
                <a href="#system" className="mobile-sub-link">System</a>
                <a href="#brands" className="mobile-sub-link">Brands</a>
                <a href="#partner" className="mobile-sub-link">Partner</a>
                <a href="#packages" className="mobile-sub-link">Packages</a>
                <a href="#contact" className="mobile-sub-link">Contact</a>
              </div>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="section-shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow light"><span /> Social media management, made personal</div>
            <h1>Your soulmate for every <em>scroll</em> you take.</h1>
            <p>
              We help brands grow through content that connects, communities that care,
              and strategies built to convert.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#contact">Get a quote <IconArrowUpRight /></a>
              <a className="button button-ghost" href="#packages">View packages <IconArrowDown /></a>
            </div>
            <div className="hero-proof" aria-label="Scrollmate experience highlights">
              <div><strong>10</strong><span>years of Facebook<br />management experience</span></div>
              <div><strong>{brands.length}</strong><span>brands currently<br />under our care</span></div>
            </div>
          </div>

          <div
            className="hero-visual"
            ref={visualRef}
            onPointerMove={handleVisualMove}
            onPointerLeave={resetVisual}
            aria-label="An interactive preview of Scrollmate's content management system"
          >
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="strategy-card">
              <div className="strategy-top">
                <div>
                  <span className="mini-label">This month</span>
                  <strong>Content pulse</strong>
                </div>
                <span className="status-dot">{activePulse === 1 ? "In edit" : "On track"}</span>
              </div>
              <div className="mini-grid" aria-label="Select a content item">
                {pulseItems.map((item, index) => (
                  <button
                    type="button"
                    className={`post ${item.className}${activePulse === index ? " is-active" : ""}`}
                    key={item.day}
                    aria-pressed={activePulse === index}
                    onClick={() => setActivePulse(index)}
                  >
                    <span>{item.day}</span>
                    <b>{item.title}</b>
                    <i aria-hidden="true">{item.hasPlay ? <IconPlay /> : null}</i>
                  </button>
                ))}
              </div>
              <div className="strategy-bottom">
                <div className="avatar-stack" aria-hidden="true"><i>S</i><i><IconCheck /></i><i><IconArrowUpRight /></i></div>
                <span>Plan. Create. Connect. Grow.</span>
              </div>
            </div>
            <div className="floating-stat stat-reach">
              <span>Monthly reach</span><strong>+38%</strong><small><IconTrending /> growing</small>
            </div>
            <div className="floating-stat stat-community">
              <span>Community</span><strong>Active daily</strong><small>Comments + DMs</small>
            </div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div>STRATEGY <b>+</b> CONTENT <b>+</b> COMMUNITY <b>+</b> GROWTH <b>+</b> STRATEGY <b>+</b> CONTENT <b>+</b> COMMUNITY <b>+</b> GROWTH</div>
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="section-shell">
          <div className="section-heading two-col-heading">
            <div>
              <div className="eyebrow"><span /> About us</div>
              <h2>Not just a pretty feed. A digital storefront that <em className="works-word">works.</em></h2>
            </div>
            <div className="heading-copy">
              <p className="lead">
                Scrollmate engineers personalized content and community strategies that give
                businesses a commanding social presence.
              </p>
              <p>
                Backed by nearly 10 years of Facebook management experience and a corporate
                media buying background, we balance creative instinct with commercial thinking.
              </p>
              <a className="text-link" href="#contact">Build with Scrollmate <IconArrowUpRight /></a>
            </div>
          </div>

          <div className="value-grid">
            <article className="value-card value-card-dark">
              <div className="value-number">01</div>
              <div className="value-icon"><Image src="/pillar-purpose.png" width={320} height={320} alt="" aria-hidden="true" /></div>
              <h3>Content with purpose</h3>
              <p>Every post has a job—from stopping the scroll to moving a customer closer.</p>
            </article>
            <article className="value-card value-card-lilac">
              <div className="value-number">02</div>
              <div className="value-icon"><Image src="/pillar-community.png" width={320} height={320} alt="" aria-hidden="true" /></div>
              <h3>Community that sticks</h3>
              <p>We build genuine interactions that turn casual followers into loyal customers.</p>
            </article>
            <article className="value-card value-card-white">
              <div className="value-number">03</div>
              <div className="value-icon"><Image src="/pillar-growth.png" width={320} height={320} alt="" aria-hidden="true" /></div>
              <h3>Growth you can see</h3>
              <p>Clear reporting, smarter decisions, and a strategy that evolves with your brand.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Unified Dark Realm Continuum: The System & Managed Brands */}
      <div className="dark-realm-wrapper">
        {/* Natural Vertical Scroll Pipeline & Animated Line Graph */}
        <section className="system-section section-pad" id="system" ref={systemTrackRef}>
          <div className="system-ambient-glow" aria-hidden="true" />
          <div className="section-shell">
            <div className="section-heading two-col-heading system-heading">
              <div>
                <div className="eyebrow light"><span /> The Scrollmate system</div>
                <h2>A clear path from<br /><em>idea to impact.</em></h2>
              </div>
              <div className="heading-copy">
                <p className="lead" style={{ color: "#d5ccff" }}>
                  A proven four-stage framework designed to take the guesswork out of social media and deliver sustainable, compounding brand growth.
                </p>
                <p>
                  From foundational research to high-volume asset production, daily distribution, and iterative data refinement.
                </p>
              </div>
            </div>

            {/* Vertical Pipeline Container */}
            <div className="system-timeline-pipeline">
              {/* The Continuous Glowing Vertical Line Graph */}
              <div className="timeline-vertical-line-track" aria-hidden="true">
                <div className="timeline-vertical-line-bg" />
                <div
                  className="timeline-vertical-line-fill"
                  style={{ height: `${scrollProgress * 100}%` }}
                />
                <div
                  className="timeline-vertical-line-beacon"
                  style={{ top: `${scrollProgress * 100}%` }}
                />
              </div>

              {/* 4 Sequential Scroll Phase Cards (Rise & animate up as you scroll) */}
              <div className="system-phases-stack">
                {steps.map((step, idx) => (
                  <article
                    key={step.number}
                    className="system-phase-card"
                    style={{
                      "--phase-color": step.color,
                      "--phase-glow": step.glow,
                      "--phase-border": step.borderHover,
                      "--phase-tag": step.tagColor,
                    } as React.CSSProperties}
                  >
                    <div className="phase-card-glow" aria-hidden="true" />

                    {/* Top Node Connector on the Line Graph */}
                    <div className="phase-node-header">
                      <div className="phase-node-marker">
                        <span className="phase-node-ring" />
                        <span className="phase-node-number">{step.number}</span>
                      </div>
                      <div className="phase-node-meta">
                        <span className="phase-node-badge">PHASE {step.number} {"//"} 04</span>
                        <span className="phase-node-status">{step.statusText}</span>
                      </div>
                    </div>

                    <div className="phase-card-grid">
                      {/* Left/Dossier Column */}
                      <div className="phase-dossier">
                        <div className="phase-title-group">
                          <span className="phase-sub-title">{step.phase}</span>
                          <h3 className="phase-heading">{step.name}</h3>
                          <p className="phase-lead">{step.lead}</p>
                        </div>

                        <p className="phase-copy">{step.copy}</p>

                        <div className="phase-deliverables-box">
                          <h4 className="deliverables-box-title">Key Phase Deliverables</h4>
                          <ul className="deliverables-box-list">
                            {step.deliverables.map((item) => (
                              <li key={item}>
                                <span className="deliverable-check-icon" aria-hidden="true">
                                  <IconCheck />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="phase-tag-row">
                          {step.tags.map((tag) => (
                            <span key={tag} className="phase-tag-pill">{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* Right/Cinema Column */}
                      <div className="phase-cinema-wrap">
                        <div className="phase-cinema-frame">
                          <Image
                            src={step.image}
                            width={720}
                            height={480}
                            alt={`${step.name} stage visual`}
                            className="phase-cinema-img"
                          />
                          <div className="phase-cinema-overlay" />
                          <div className="phase-cinema-hud-top">
                            <span>STAGE 0{idx + 1} {"//"} OPERATIVE HUD</span>
                          </div>
                          <div className="phase-cinema-hud-bottom">
                            <strong>{step.name} Focus</strong>
                            <span>{step.lead}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creative Kinetic Transition Conduit */}
        <div className="system-brands-conduit" aria-hidden="true">
          <div className="conduit-stream-line" />
          <div className="conduit-core-node">
            <span className="conduit-ring-pulse" />
            <span className="conduit-core-dot" />
          </div>
          <div className="conduit-stream-label">
            <span className="conduit-sparkle">✦</span>
            <span>SYSTEM IN MOTION // MANAGED BRANDS</span>
            <span className="conduit-sparkle">✦</span>
          </div>
        </div>

        <section className="brands-section section-pad" id="brands">
          <div className="brands-ambient-glow" aria-hidden="true" />
          <div className="brands-mesh-glow brands-mesh-one" aria-hidden="true" />
          <div className="brands-mesh-glow brands-mesh-two" aria-hidden="true" />
          <div className="section-shell">
            <div className="section-heading centered-heading">
              <div className="eyebrow light"><span /> Brands we manage</div>
              <h2>Different stories.<br />One thoughtful <em>strategy.</em></h2>
              <p>We show up as an extension of every team—and make every brand feel unmistakably its own.</p>
            </div>
            <div className="brands-grid">
              {brands.map((brand, index) => (
                <article
                  className="brand-card"
                  key={brand.name}
                  style={{
                    "--brand-glow": brand.accent,
                    "--brand-border": brand.borderHover,
                    "--brand-tag": brand.tagColor,
                  } as React.CSSProperties}
                >
                  <div className="brand-card-glow" aria-hidden="true" />
                  <div className="brand-card-top">
                    <span className="brand-index">0{index + 1}</span>
                    <span className="brand-status"><span className="status-indicator" />Active</span>
                  </div>
                  <div className="brand-image-wrap">
                    <Image
                      src={brand.image}
                      width={437}
                      height={437}
                      alt={`${brand.name} logo`}
                      className="brand-image"
                    />
                    <div className="brand-image-overlay" />
                  </div>
                  <div className="brand-card-copy">
                    <span className="brand-category">{brand.category}</span>
                    <div className="brand-title-row">
                      <h3>{brand.name}</h3>
                      <span className="brand-arrow" aria-hidden="true"><IconArrowUpRight /></span>
                    </div>
                    <p className="brand-highlight">{brand.highlight}</p>
                    <div className="brand-tag-list">
                      {brand.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="partner-section section-pad" id="partner">
        <div className="section-shell">
          <div className="partner-card">
            <div className="partner-glow partner-glow-one" aria-hidden="true" />
            <div className="partner-glow partner-glow-two" aria-hidden="true" />
            <div className="partner-content">
              <div className="partner-eyebrow">
                <span /> Meet our partner
              </div>
              <h2>Hero Editor Studios</h2>
              <p className="partner-lead">
                A creative multimedia and production studio based in the Philippines that specializes in graphic design, branding, video animation, and event media coverage.
              </p>
              <div className="partner-tags" aria-label="Hero Editor Studios specializations">
                <span>+ Graphic Design</span>
                <span>+ Branding</span>
                <span>+ Video Animation</span>
                <span>+ Event Media Coverage</span>
              </div>
              <div className="partner-actions">
                <a className="button button-light" href="#contact">
                  Work with us <IconArrowUpRight />
                </a>
              </div>
            </div>
            <div className="partner-visual">
              <div className="partner-logo-box">
                <Image
                  src="/hero-editor-studios.png"
                  width={440}
                  height={440}
                  alt="Hero Editor Studios logo"
                  className="partner-logo-img"
                />
                <div className="partner-badge">
                  <span>Creative &amp; Production Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="packages-section section-pad" id="packages">
        <div className="packages-ambient-glow" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-heading package-heading">
            <div>
              <div className="eyebrow"><span /> Packages &amp; Investment</div>
              <h2>Pick your pace.<br />We&apos;ll bring the <em>momentum.</em></h2>
            </div>
            <div className="heading-copy">
              <p className="lead" style={{ color: "var(--purple-950)" }}>
                Clear scopes. Practical deliverables. No confusing agency speak.
              </p>
              <p>
                Transparent packages designed to meet your business exactly where it is—from foundational storefront consistency to multi-channel organic and paid scale.
              </p>
            </div>
          </div>
          <div className="pricing-grid">
            {packages.map((item) => (
              <article className={`price-card${item.featured ? " featured" : ""}`} key={item.name}>
                {item.featured && (
                  <div className="popular-badge">
                    <span>Highly recommended</span>
                  </div>
                )}
                <div className="package-card-top">
                  <div className="package-tier-row">
                    <span className="package-tier-code">{item.tier}</span>
                    <span className="package-tier-tag">{item.tierLabel}</span>
                  </div>
                  <h3 className="package-name">{item.name}</h3>
                  <p className="package-desc">{item.description}</p>
                </div>
                <div className="rule" />
                <div className="package-features-label">Core Deliverables &amp; Inclusions</div>
                <ul className="package-features-list">
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <span className="feature-check-icon" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="package-card-action">
                  <a className={`button ${item.featured ? "button-featured-cta" : "button-purple"}`} href="#contact">
                    Choose {item.name.replace("The ", "")} <IconArrowUpRight />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="pricing-tailored-banner">
            <div className="tailored-badge">Custom Engagements</div>
            <div className="tailored-content">
              <strong>Need something more tailored to your brand?</strong>
              <p>We craft bespoke enterprise scopes, high-volume production sprints, and dedicated fractional growth teams.</p>
            </div>
            <a href="#contact" className="button button-tailored">
              Let&apos;s shape your setup <IconArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-grid">
          <div className="contact-copy">
            <div className="eyebrow light"><span /> Contact us</div>
            <h2>Ready to put your brand on the <em>map?</em></h2>
            <p>Tell us where your brand is now—and where you want it to go. We&apos;ll reply with the smartest next step.</p>
            <a className="email-link" href="mailto:Scrollmate.business@gmail.com">
              <span aria-hidden="true">@</span>
              <div><small>Email us directly</small>Scrollmate.business@gmail.com</div>
            </a>
            <div className="contact-promise">
              <span>Friendly strategy</span><span>Clear deliverables</span><span>Built for growth</span>
            </div>
          </div>
          <div className="contact-details" aria-label="Scrollmate contact details">
            <div className="contact-detail-row">
              <span>Email</span>
              <a href="mailto:Scrollmate.business@gmail.com">Scrollmate.business@gmail.com</a>
            </div>
            <div className="contact-detail-row">
              <span>Facebook</span>
              <p>Scrollmate</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-top">
          <a className="footer-brand" href="#home" aria-label="Back to top">
            <Image src="/scrollmate-logo-white.png" width={650} height={138} alt="Scrollmate" />
          </a>
          <p>Your soulmate for every scroll you take.</p>
          <nav aria-label="Footer navigation">
            <a href="#about">About</a><a href="#system">System</a><a href="#brands">Brands</a><a href="#partner">Partner</a><a href="#packages">Packages</a><a href="/resources">Resources</a><a href="#contact">Contact</a>
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
