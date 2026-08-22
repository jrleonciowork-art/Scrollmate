"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

const brands = [
  {
    name: "Authentic MNL",
    category: "Fashion & lifestyle",
    image: "/authentic-mnl.webp",
  },
  {
    name: "Cuisineer!",
    category: "Food & community",
    image: "/cuisineer.webp",
  },
  {
    name: "Sintra Board Print & Crafts",
    category: "Prints & crafts",
    image: "/sintra-board.webp",
  },
  {
    name: "Empleo",
    category: "Careers & employment",
    image: "/empleo.png",
  },
];

const packages = [
  {
    name: "The Optimizer",
    description: "For brands that need a stronger, more consistent social presence.",
    features: [
      "Profile uplift & SEO",
      "Content scheduling & copywriting",
      "Grid management",
      "Community management",
      "Monthly performance report",
    ],
  },
  {
    name: "The Creator",
    description: "For brands ready to turn strategy into thumb-stopping content.",
    features: [
      "Everything in The Optimizer",
      "Visual asset creation",
      "Short-form video editing",
      "Monthly content strategy plan",
    ],
    featured: true,
  },
  {
    name: "The Accelerator",
    description: "For growing brands ready to pair organic content with paid scale.",
    features: [
      "Everything in The Creator",
      "Ad campaign strategy & setup",
      "A/B testing",
      "Campaign management",
    ],
  },
];

const steps = [
  { number: "01", name: "Blueprint", copy: "We align on your goals, audience, voice, and offer.", image: "/process-blueprint.webp" },
  { number: "02", name: "Build", copy: "We turn the plan into a purposeful content system.", image: "/process-build.webp" },
  { number: "03", name: "Launch", copy: "We publish, engage, and keep every detail moving.", image: "/process-launch.webp" },
  { number: "04", name: "Optimize", copy: "We learn from the numbers and sharpen what works.", image: "/process-optimize.webp" },
];

const pulseItems = [
  { day: "MON", title: "Brand story", className: "post-one" },
  { day: "WED", title: "Reel edit", className: "post-two", icon: "▶" },
  { day: "FRI", title: "Promo drop", className: "post-three" },
];

export default function Home() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [activePulse, setActivePulse] = useState(0);

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
            <a href="#about">About</a>
            <a href="#brands">Brands</a>
            <a href="#packages">Packages</a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><span></span><span></span></summary>
            <nav aria-label="Mobile navigation">
              <a href="#about">About</a>
              <a href="#brands">Brands</a>
              <a href="#packages">Packages</a>
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
              <a className="button button-light" href="#contact">Get a quote <span aria-hidden="true">↗</span></a>
              <a className="button button-ghost" href="#packages">View packages <span aria-hidden="true">↓</span></a>
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
                    <i aria-hidden="true">{item.icon}</i>
                  </button>
                ))}
              </div>
              <div className="strategy-bottom">
                <div className="avatar-stack" aria-hidden="true"><i>S</i><i>✓</i><i>↗</i></div>
                <span>Plan. Create. Connect. Grow.</span>
              </div>
            </div>
            <div className="floating-stat stat-reach">
              <span>Monthly reach</span><strong>+38%</strong><small>↗ growing</small>
            </div>
            <div className="floating-stat stat-community">
              <span>Community</span><strong>Active daily</strong><small>Comments + DMs</small>
            </div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div>STRATEGY <b>✦</b> CONTENT <b>✦</b> COMMUNITY <b>✦</b> GROWTH <b>✦</b> STRATEGY <b>✦</b> CONTENT <b>✦</b> COMMUNITY <b>✦</b> GROWTH</div>
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
              <a className="text-link" href="#contact">Build with Scrollmate <span aria-hidden="true">↗</span></a>
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

      <section className="system-section">
        <div className="section-shell">
          <div className="system-intro">
            <div className="eyebrow light"><span /> The Scrollmate system</div>
            <h2>A clear path from idea to impact.</h2>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step" key={step.number} style={{ backgroundImage: `url(${step.image})` }}>
                <div className="step-top"><span>{step.number}</span><i aria-hidden="true">→</i></div>
                <h3>{step.name}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section section-pad" id="brands">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <div className="eyebrow"><span /> Brands we manage</div>
            <h2>Different stories.<br />One thoughtful <em>strategy.</em></h2>
            <p>We show up as an extension of every team—and make every brand feel unmistakably its own.</p>
          </div>
          <div className="brands-grid">
            {brands.map((brand, index) => (
              <article className="brand-card" key={brand.name}>
                <div className="brand-image-wrap">
                  <Image src={brand.image} width={437} height={437} alt={`${brand.name} logo`} />
                </div>
                <div className="brand-card-copy">
                  <span>0{index + 1} / {brand.category}</span>
                  <h3>{brand.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="packages-section section-pad" id="packages">
        <div className="section-shell">
          <div className="section-heading package-heading">
            <div>
              <div className="eyebrow"><span /> Packages</div>
              <h2>Pick your pace.<br />We&apos;ll bring the <em>momentum.</em></h2>
            </div>
            <p>Clear packages. Practical deliverables. No confusing agency speak.</p>
          </div>
          <div className="pricing-grid">
            {packages.map((item) => (
              <article className={`price-card${item.featured ? " featured" : ""}`} key={item.name}>
                {item.featured && <div className="popular-badge">Highly recommended</div>}
                <h3 className="package-name">{item.name}</h3>
                <p className="package-desc">{item.description}</p>
                <div className="rule" />
                <ul>
                  {item.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}
                </ul>
                <a className={`button ${item.featured ? "button-light" : "button-purple"}`} href="#contact">
                  Choose {item.name.replace("The ", "")} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="pricing-note">Need something more tailored? <a href="#contact">Let&apos;s shape the right setup together.</a></p>
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
            <a href="#about">About</a><a href="#brands">Brands</a><a href="#packages">Packages</a><a href="#contact">Contact</a>
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
