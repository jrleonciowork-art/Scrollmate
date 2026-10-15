"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { BrandData, PackageData, SiteData, StepData } from "@/lib/site-data";
import "./admin.css";

export default function ScrollmateAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Content state
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<"brands" | "packages" | "system" | "partner" | "general">("brands");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper for brand tag input
  const [brandTagInputs, setBrandTagInputs] = useState<{ [key: number]: string }>({});

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load content:", err);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    let isMounted = true;

    fetch("/api/admin/auth")
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          setIsAuthenticated(true);
          fetch("/api/admin/content")
            .then((r) => (r.ok ? r.json() : null))
            .then((json) => {
              if (isMounted && json) setData(json);
            })
            .catch(() => {});
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsAuthenticated(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setIsAuthenticated(true);
        loadContent();
      } else {
        setLoginError(json.error || "Incorrect password. Try again.");
      }
    } catch {
      setLoginError("Connection failed. Please check server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setData(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        showToast("Changes published live successfully!");
      } else {
        alert("Failed to save changes: " + (json.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error saving: " + String(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scrollmate-site-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Brand actions
  const handleAddBrand = () => {
    if (!data) return;
    const newBrand: BrandData = {
      name: "New Managed Brand",
      category: "Category Name",
      status: "Ongoing",
      highlight: "Brief highlight result or aesthetic achievement",
      tags: ["Strategy", "Content"],
      image: "/authentic-mnl.webp",
      accent: "rgba(168, 85, 247, 0.35)",
      borderHover: "rgba(168, 85, 247, 0.55)",
      tagColor: "#d8b4fe",
    };
    setData({
      ...data,
      brands: [newBrand, ...data.brands],
    });
  };

  const handleDeleteBrand = (index: number) => {
    if (!data) return;
    if (confirm(`Are you sure you want to delete "${data.brands[index].name}"?`)) {
      const updated = [...data.brands];
      updated.splice(index, 1);
      setData({ ...data, brands: updated });
    }
  };

  const handleMoveBrand = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.brands.length) return;
    const updated = [...data.brands];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setData({ ...data, brands: updated });
  };

  const handleUpdateBrand = (index: number, field: keyof BrandData, val: BrandData[keyof BrandData]) => {
    if (!data) return;
    const updated = [...data.brands];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, brands: updated });
  };

  const handleAddBrandTag = (brandIndex: number) => {
    const tag = (brandTagInputs[brandIndex] || "").trim();
    if (!tag || !data) return;
    const currentTags = data.brands[brandIndex].tags || [];
    if (!currentTags.includes(tag)) {
      handleUpdateBrand(brandIndex, "tags", [...currentTags, tag]);
    }
    setBrandTagInputs({ ...brandTagInputs, [brandIndex]: "" });
  };

  const handleRemoveBrandTag = (brandIndex: number, tagIndex: number) => {
    if (!data) return;
    const updatedTags = [...data.brands[brandIndex].tags];
    updatedTags.splice(tagIndex, 1);
    handleUpdateBrand(brandIndex, "tags", updatedTags);
  };

  // Package actions
  const handleUpdatePackage = (index: number, field: keyof PackageData, val: PackageData[keyof PackageData]) => {
    if (!data) return;
    const updated = [...data.packages];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, packages: updated });
  };

  const handleUpdatePackageFeature = (pkgIndex: number, featureIndex: number, val: string) => {
    if (!data) return;
    const updatedFeatures = [...data.packages[pkgIndex].features];
    updatedFeatures[featureIndex] = val;
    handleUpdatePackage(pkgIndex, "features", updatedFeatures);
  };

  const handleAddPackageFeature = (pkgIndex: number) => {
    if (!data) return;
    const updatedFeatures = [...data.packages[pkgIndex].features, "New inclusion deliverable"];
    handleUpdatePackage(pkgIndex, "features", updatedFeatures);
  };

  const handleRemovePackageFeature = (pkgIndex: number, featureIndex: number) => {
    if (!data) return;
    const updatedFeatures = [...data.packages[pkgIndex].features];
    updatedFeatures.splice(featureIndex, 1);
    handleUpdatePackage(pkgIndex, "features", updatedFeatures);
  };

  // System step actions
  const handleUpdateStep = (index: number, field: keyof StepData, val: StepData[keyof StepData]) => {
    if (!data) return;
    const updated = [...data.steps];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, steps: updated });
  };

  const handleUpdateStepDeliverable = (stepIndex: number, dIndex: number, val: string) => {
    if (!data) return;
    const updated = [...data.steps[stepIndex].deliverables];
    updated[dIndex] = val;
    handleUpdateStep(stepIndex, "deliverables", updated);
  };

  const handleAddStepDeliverable = (stepIndex: number) => {
    if (!data) return;
    const updated = [...data.steps[stepIndex].deliverables, "New Key Deliverable Item"];
    handleUpdateStep(stepIndex, "deliverables", updated);
  };

  const handleRemoveStepDeliverable = (stepIndex: number, dIndex: number) => {
    if (!data) return;
    const updated = [...data.steps[stepIndex].deliverables];
    updated.splice(dIndex, 1);
    handleUpdateStep(stepIndex, "deliverables", updated);
  };

  // Loading gate
  if (isAuthenticated === null) {
    return (
      <div className="admin-body admin-gate-wrap">
        <div className="admin-gate-card">
          <p>Verifying secure session...</p>
        </div>
      </div>
    );
  }

  // Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-body admin-gate-wrap">
        <div className="admin-gate-card">
          <div className="admin-gate-emblem" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1>Scrollmate Control</h1>
          <p>Enter your master passcode to access the website management center.</p>

          {loginError && <div className="admin-error-box">{loginError}</div>}

          <form onSubmit={handleLogin}>
            <div className="admin-input-group">
              <label className="admin-input-label" htmlFor="admin-pass">Master Passcode</label>
              <input
                id="admin-pass"
                type="password"
                className="admin-input"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={isLoggingIn || !password}
            >
              {isLoggingIn ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-body admin-gate-wrap">
        <div className="admin-gate-card">
          <p>Loading site data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast" role="status">
          <span>✓</span> {toastMessage}
        </div>
      )}

      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-topbar-brand">
            <div className="admin-topbar-badge">
              <span className="admin-live-dot" />
              <span>Scrollmate Admin Control</span>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <Link
              href="/"
              target="_blank"
              className="admin-btn-secondary"
              title="Open public website in a new tab"
            >
              <span>View Live Site</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={handleExportJson}
              className="admin-btn-secondary"
              title="Download a backup JSON of your site content"
            >
              Export JSON
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="admin-btn-secondary"
            >
              Lock
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="admin-btn-save"
            >
              {isSaving ? "Publishing..." : "Save & Publish Live"}
            </button>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main className="admin-shell">
        {/* Navigation Tabs */}
        <nav className="admin-tabs-nav" aria-label="Dashboard sections">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "brands" ? "active" : ""}`}
            onClick={() => setActiveTab("brands")}
          >
            <span>Brands Showcase</span>
            <small>({data.brands.length})</small>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "packages" ? "active" : ""}`}
            onClick={() => setActiveTab("packages")}
          >
            <span>Packages &amp; Pricing</span>
            <small>({data.packages.length})</small>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "system" ? "active" : ""}`}
            onClick={() => setActiveTab("system")}
          >
            <span>The 4-Stage System</span>
            <small>(4)</small>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "partner" ? "active" : ""}`}
            onClick={() => setActiveTab("partner")}
          >
            <span>Partner Studio</span>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            <span>Hero &amp; Contact Info</span>
          </button>
        </nav>

        {/* Tab 1: Brands Showcase */}
        {activeTab === "brands" && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div className="admin-panel-title">
                <h2>Brands Showcase Manager</h2>
                <p>Manage the brands displayed in the &quot;Brands we manage&quot; grid on the homepage.</p>
              </div>
              <button
                type="button"
                onClick={handleAddBrand}
                className="admin-btn-primary"
                style={{ width: "auto" }}
              >
                + Add Brand Card
              </button>
            </div>

            <div className="admin-cards-grid">
              {data.brands.map((brand, bIdx) => (
                <div key={bIdx} className="admin-item-card">
                  <div className="admin-item-top">
                    <div className="admin-item-meta">
                      <strong>{brand.name || "Untitled Brand"}</strong>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                        <span>{brand.category || "Uncategorized"}</span>
                        <span className={`admin-status-badge ${(brand.status || "").toLowerCase() === "managed" ? "managed" : "ongoing"}`}>
                          <span className="admin-status-dot" />
                          {(brand.status || "").toLowerCase() === "managed" ? "Managed" : "Ongoing"}
                        </span>
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <button
                        type="button"
                        onClick={() => handleMoveBrand(bIdx, "up")}
                        disabled={bIdx === 0}
                        className="admin-btn-icon"
                        title="Move Up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveBrand(bIdx, "down")}
                        disabled={bIdx === data.brands.length - 1}
                        className="admin-btn-icon"
                        title="Move Down"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBrand(bIdx)}
                        className="admin-btn-icon danger"
                        title="Delete Brand"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Client Status (Changeable)</span>
                    <div className="admin-status-segmented">
                      <button
                        type="button"
                        className={`admin-status-seg-btn ${(brand.status || "").toLowerCase() !== "managed" ? "active-ongoing" : ""}`}
                        onClick={() => handleUpdateBrand(bIdx, "status", "Ongoing")}
                      >
                        <span className="admin-status-dot ongoing" />
                        Ongoing
                      </button>
                      <button
                        type="button"
                        className={`admin-status-seg-btn ${(brand.status || "").toLowerCase() === "managed" ? "active-managed" : ""}`}
                        onClick={() => handleUpdateBrand(bIdx, "status", "Managed")}
                      >
                        <span className="admin-status-dot managed" />
                        Managed
                      </button>
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Brand Name</span>
                    <input
                      type="text"
                      className="admin-input"
                      value={brand.name}
                      onChange={(e) => handleUpdateBrand(bIdx, "name", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Category</span>
                    <input
                      type="text"
                      className="admin-input"
                      value={brand.category}
                      onChange={(e) => handleUpdateBrand(bIdx, "category", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Highlight Achievement</span>
                    <input
                      type="text"
                      className="admin-input"
                      value={brand.highlight}
                      onChange={(e) => handleUpdateBrand(bIdx, "highlight", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Logo / Image Path</span>
                    <input
                      type="text"
                      className="admin-input"
                      value={brand.image}
                      onChange={(e) => handleUpdateBrand(bIdx, "image", e.target.value)}
                      placeholder="/example-brand.png"
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Tags</span>
                    <div className="admin-tag-chips" style={{ marginBottom: "8px" }}>
                      {brand.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="admin-chip">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveBrandTag(bIdx, tIdx)}
                            className="admin-chip-remove"
                            title="Remove tag"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Add tag and press +"
                        value={brandTagInputs[bIdx] || ""}
                        onChange={(e) =>
                          setBrandTagInputs({ ...brandTagInputs, [bIdx]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddBrandTag(bIdx);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddBrandTag(bIdx)}
                        className="admin-btn-secondary"
                        style={{ padding: "0 16px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Packages & Pricing */}
        {activeTab === "packages" && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div className="admin-panel-title">
                <h2>Packages &amp; Investment Tiers</h2>
                <p>Modify package tier names, descriptions, and deliverable checklists.</p>
              </div>
            </div>

            <div className="admin-cards-grid">
              {data.packages.map((pkg, pIdx) => (
                <div key={pIdx} className="admin-item-card">
                  <div className="admin-item-top">
                    <div className="admin-item-meta">
                      <strong>{pkg.name}</strong>
                      <span>{pkg.tier} — {pkg.tierLabel}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <input
                        id={`pkg-featured-${pIdx}`}
                        type="checkbox"
                        checked={pkg.featured || false}
                        onChange={(e) => handleUpdatePackage(pIdx, "featured", e.target.checked)}
                      />
                      <label htmlFor={`pkg-featured-${pIdx}`} style={{ fontSize: "12px", color: "#f472b6", cursor: "pointer" }}>
                        Featured
                      </label>
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Tier Code &amp; Subtitle</span>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8px" }}>
                      <input
                        type="text"
                        className="admin-input"
                        value={pkg.tier}
                        onChange={(e) => handleUpdatePackage(pIdx, "tier", e.target.value)}
                        placeholder="Tier 01"
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={pkg.tierLabel}
                        onChange={(e) => handleUpdatePackage(pIdx, "tierLabel", e.target.value)}
                        placeholder="Content Engine"
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Package Name</span>
                    <input
                      type="text"
                      className="admin-input"
                      value={pkg.name}
                      onChange={(e) => handleUpdatePackage(pIdx, "name", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Overview Description</span>
                    <textarea
                      className="admin-input admin-textarea"
                      value={pkg.description}
                      onChange={(e) => handleUpdatePackage(pIdx, "description", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">
                      Deliverables Checklist ({pkg.features.length})
                    </span>
                    <div className="admin-checklist">
                      {pkg.features.map((feature, fIdx) => (
                        <div key={fIdx} className="admin-checklist-row">
                          <input
                            type="text"
                            className="admin-input admin-checklist-input"
                            value={feature}
                            onChange={(e) => handleUpdatePackageFeature(pIdx, fIdx, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePackageFeature(pIdx, fIdx)}
                            className="admin-btn-icon danger"
                            title="Remove feature"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddPackageFeature(pIdx)}
                      className="admin-btn-secondary"
                      style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
                    >
                      + Add Deliverable
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: The 4-Stage System */}
        {activeTab === "system" && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div className="admin-panel-title">
                <h2>The Scrollmate System (4 Phases)</h2>
                <p>Customize the 4-stage vertical pipeline cards displayed on the homepage.</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {data.steps.map((step, sIdx) => (
                <div key={sIdx} className="admin-section-box">
                  <div className="admin-box-title">
                    <span style={{ color: step.color, fontWeight: 900 }}>PHASE {step.number}</span>
                    <span>{"//"}</span>
                    <span>{step.name} ({step.phase})</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                    <div className="admin-input-group">
                      <span className="admin-input-label">Phase Name &amp; Subtitle</span>
                      <input
                        type="text"
                        className="admin-input"
                        value={step.name}
                        onChange={(e) => handleUpdateStep(sIdx, "name", e.target.value)}
                        style={{ marginBottom: "8px" }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={step.phase}
                        onChange={(e) => handleUpdateStep(sIdx, "phase", e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <span className="admin-input-label">Status HUD Badge</span>
                      <input
                        type="text"
                        className="admin-input"
                        value={step.statusText}
                        onChange={(e) => handleUpdateStep(sIdx, "statusText", e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <span className="admin-input-label">Stage Visual Image</span>
                      <input
                        type="text"
                        className="admin-input"
                        value={step.image}
                        onChange={(e) => handleUpdateStep(sIdx, "image", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Lead Hook Line</span>
                    <input
                      type="text"
                      className="admin-input"
                      value={step.lead}
                      onChange={(e) => handleUpdateStep(sIdx, "lead", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">Detailed Strategy Copy</span>
                    <textarea
                      className="admin-input admin-textarea"
                      value={step.copy}
                      onChange={(e) => handleUpdateStep(sIdx, "copy", e.target.value)}
                    />
                  </div>

                  <div className="admin-input-group">
                    <span className="admin-input-label">
                      Phase Deliverables Checklist ({step.deliverables.length})
                    </span>
                    <div className="admin-checklist">
                      {step.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="admin-checklist-row">
                          <input
                            type="text"
                            className="admin-input admin-checklist-input"
                            value={deliv}
                            onChange={(e) => handleUpdateStepDeliverable(sIdx, dIdx, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveStepDeliverable(sIdx, dIdx)}
                            className="admin-btn-icon danger"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddStepDeliverable(sIdx)}
                      className="admin-btn-secondary"
                      style={{ marginTop: "10px" }}
                    >
                      + Add Key Deliverable
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Partner Studio */}
        {activeTab === "partner" && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div className="admin-panel-title">
                <h2>Partner Profile Manager</h2>
                <p>Edit the &quot;Meet our partner&quot; highlight section.</p>
              </div>
            </div>

            <div className="admin-section-box">
              <div className="admin-input-group">
                <span className="admin-input-label">Partner Studio Name</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.partner.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      partner: { ...data.partner, name: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Partner Description / Lead</span>
                <textarea
                  className="admin-input admin-textarea"
                  value={data.partner.lead}
                  onChange={(e) =>
                    setData({
                      ...data,
                      partner: { ...data.partner, lead: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Partner Badge Text</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.partner.badge}
                  onChange={(e) =>
                    setData({
                      ...data,
                      partner: { ...data.partner, badge: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Logo Image Path</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.partner.image}
                  onChange={(e) =>
                    setData({
                      ...data,
                      partner: { ...data.partner, image: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Specialization Tags (Comma-separated)</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.partner.tags.join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      partner: {
                        ...data.partner,
                        tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                />
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: Hero, Marquee & Contact */}
        {activeTab === "general" && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div className="admin-panel-title">
                <h2>Hero, Marquee &amp; Contact Info</h2>
                <p>Update headline copy, running banner ticker items, and primary contact email.</p>
              </div>
            </div>

            <div className="admin-section-box">
              <h3 className="admin-box-title">Hero Section</h3>

              <div className="admin-input-group">
                <span className="admin-input-label">Hero Eyebrow</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.eyebrow}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, eyebrow: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Hero Lead Paragraph</span>
                <textarea
                  className="admin-input admin-textarea"
                  value={data.hero.lead}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, lead: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Running Marquee Ticker Words (Comma-separated)</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.marquee.join(", ")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: {
                        ...data.hero,
                        marquee: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="admin-section-box" style={{ marginTop: "20px" }}>
              <h3 className="admin-box-title">Contact Information</h3>

              <div className="admin-input-group">
                <span className="admin-input-label">Inquiry Email</span>
                <input
                  type="email"
                  className="admin-input"
                  value={data.contact.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, email: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Facebook Profile / Page Name</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.contact.facebook}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, facebook: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Contact Heading</span>
                <input
                  type="text"
                  className="admin-input"
                  value={data.contact.heading}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, heading: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <span className="admin-input-label">Contact Subheading</span>
                <textarea
                  className="admin-input admin-textarea"
                  value={data.contact.subheading}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, subheading: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
