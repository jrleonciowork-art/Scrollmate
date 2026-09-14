"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

export default function LoadingScreen({
  onComplete,
  durationMs = 3200,
}: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    // Lock scroll during loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Trigger smooth fade-out before full duration
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      const removeTimer = setTimeout(() => {
        setIsGone(true);
        document.body.style.overflow = originalOverflow;
        if (onComplete) onComplete();
      }, 700);
      return () => clearTimeout(removeTimer);
    }, Math.max(durationMs - 700, 1000));

    return () => {
      clearTimeout(fadeTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [durationMs, onComplete]);

  if (isGone) return null;

  return (
    <div
      className={`app-loading-screen ${isFadingOut ? "loading-fade-out" : ""}`}
      aria-label="Loading Scrollmate"
      role="status"
    >
      {/* Cyber Ambient Atmosphere */}
      <div className="loader-ambient-glow" aria-hidden="true" />
      <div className="loader-mesh-grid" aria-hidden="true" />

      <div className="loader-content">
        {/* Minimalist Centerpiece: Dual Capsule Scrollbar Logo */}
        <div className="loader-emblem-wrap">
          <div className="loader-emblem-glow" aria-hidden="true" />

          {/* Left Capsule */}
          <div className="loader-capsule">
            <svg
              className="loader-capsule-arrow top-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <div className="loader-track">
              <div className="loader-white-bar bar-left" />
            </div>
            <svg
              className="loader-capsule-arrow bottom-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Right Capsule */}
          <div className="loader-capsule">
            <svg
              className="loader-capsule-arrow top-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <div className="loader-track">
              <div className="loader-white-bar bar-right" />
            </div>
            <svg
              className="loader-capsule-arrow bottom-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
