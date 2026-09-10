# WeLovePDF — Future AdSense Monetization & Placement Policy

**Document Status:** Approved Architecture Guideline  
**Applicability:** Future Ad Placement & Monetization Layouts  
**Author:** WeLovePDF Engineering & Compliance  
**Date:** September 10, 2026  

---

## 1. Executive Summary & Philosophy
WeLovePDF operates as a browser-first, privacy-respecting document utility. When third-party display advertisements (such as Google AdSense) are introduced to sustain server infrastructure, ad integrations must strictly uphold user trust, tool clarity, and full Google AdSense Publisher Policy compliance.

Under no circumstances should advertising interfere with or deceive a user attempting to process a document.

---

## 2. Core Prohibited Practices (Zero-Tolerance)
1. **No Fake Download / Action Buttons:** Ads must never mimic or resemble the primary tool CTA buttons (e.g. "Download PDF", "Convert File", "Choose File"). Any creative or ad unit mimicking UI action controls is strictly banned.
2. **No Accidental Click Zones:** Advertisements must never be placed in close proximity to file dropzones, file picker inputs, or download triggers. A minimum safety buffer of 48px must be maintained between any interactive tool control and an ad container.
3. **No Interstitial / Forced Engagement:** Processing must never be gated behind countdown timers, survey walls, forced clicks, or unclosable popovers.
4. **No Above-the-Fold Content Displacement:** The primary H1, tool workspace, and core input controls must remain immediately visible above the fold on both mobile (390px) and desktop (1366px) viewports.

---

## 3. Approved Future Placement Zones
When the site owner decides to activate display ads, only the following designated zones are permitted:

### Zone A: In-Content Editorial Margin (Desktop Sidebar)
- **Position:** Right-hand margin on desktop screens (>= 1280px viewport width), isolated from the main workspace canvas.
- **Recommended Formats:** 300x250 Medium Rectangle or 160x600 Wide Skyscraper.
- **Visual Distinction:** Must carry a clear "Sponsored" or "Advertisement" label in 10px uppercase text (#9C9488).

### Zone B: Post-Execution Results Panel (Below Download Area)
- **Position:** Placed below the conversion completion card, separated by a distinct horizontal rule and 32px vertical margin.
- **Recommended Formats:** 728x90 Leaderboard or responsive fluid banner.
- **Rule:** The primary "Download Converted File" button must remain prominent and unambiguous.

### Zone C: Blog Guides & Informational Articles
- **Position:** Embedded within long-form editorial guides (e.g. between H2 sections in guides exceeding 1,200 words).
- **Rule:** Maximum of 2 in-article display units per guide; must not break up code snippets, step-by-step numbered lists, or security warnings.

---

## 4. Policy Compliance Checklist for Future Rollout
- [ ] Ad containers clearly labeled with "Advertisement" or "Sponsored".
- [ ] Responsive CSS ensures ads collapse gracefully on mobile without shifting document dropzones.
- [ ] Ads.txt file verified at `https://www.welovepdf.best/ads.txt`.
- [ ] Consent Mode v2 active for all ad tracking tags (`ad_storage`, `ad_user_data`, `ad_personalization`).
- [ ] Zero layout shifts (CLS < 0.05) by reserving container min-height for ad units.
