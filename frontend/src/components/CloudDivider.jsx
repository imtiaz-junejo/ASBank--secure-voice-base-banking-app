import React from 'react';

/**
 * Prominent layered cloudy theme: organic, undulating white clouds
 * between blue welcome and white form (matches previous reference image).
 * Desktop: vertical multi-layer cloud on right edge of blue.
 * Mobile: horizontal multi-layer cloud at bottom of blue section.
 */
export function CloudDividerDesktop() {
  return (
    <div className="auth-cloud-desktop" aria-hidden>
      <svg viewBox="0 0 140 800" preserveAspectRatio="none" className="auth-cloud-svg-desktop">
        {/* Layer 1 - largest bumps (main cloud body) */}
        <path
          fill="#fff"
          d="M 0,0 L 140,0 L 140,800 L 0,800 Z
             M 0,0
             Q 90,60 0,140 Q 100,180 0,260 Q 95,310 0,380 Q 100,430 0,500
             Q 92,560 0,620 Q 98,680 0,750 Q 90,800 0,800 L 0,0 Z"
        />
        {/* Layer 2 - medium bumps (depth) */}
        <path
          fill="#fff"
          fillOpacity="0.97"
          d="M 0,40 Q 75,100 0,180 Q 85,220 0,300 Q 78,350 0,430 Q 88,480 0,560 Q 80,610 0,690 L 0,40 Z"
        />
        {/* Layer 3 - smaller undulations (soft edge) */}
        <path
          fill="#fff"
          fillOpacity="0.94"
          d="M 0,80 Q 65,130 0,210 Q 72,260 0,340 Q 68,390 0,470 Q 75,520 0,600 Q 70,650 0,730 L 0,80 Z"
        />
      </svg>
    </div>
  );
}

export function CloudDividerMobile() {
  return (
    <div className="auth-cloud-mobile" aria-hidden>
      <svg viewBox="0 0 500 48" preserveAspectRatio="none" className="auth-cloud-svg-mobile">
        {/* Layered clouds - multiple wavy layers for organic look */}
        <path
          fill="#fff"
          d="M 0,48 L 0,28 Q 60,18 120,28 Q 180,14 240,28 Q 300,18 360,28 Q 420,14 480,28 L 500,28 L 500,48 Z
             M 0,48 L 0,34 Q 55,24 110,34 Q 165,22 220,34 Q 275,24 330,34 Q 385,22 440,34 L 500,34 L 500,48 Z
             M 0,48 L 0,40 Q 50,32 100,40 Q 150,30 200,40 Q 250,32 300,40 Q 350,30 400,40 L 500,40 L 500,48 Z"
        />
      </svg>
    </div>
  );
}

export default CloudDividerDesktop;
