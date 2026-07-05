Mobile App v2 cleanup

This is a mobile-only redesign layer.

Main change:
- CSS/mobile.css was rebuilt from scratch as an app-style mobile override.

Desktop:
- Desktop styling is not intentionally changed.
- The mobile CSS only activates at max-width: 900px.

What it fixes:
- Mobile header/nav layout
- Home page mobile app feel
- Garage cards on mobile
- Maintenance page mobile flow
- Removes the ugly squeezed desktop behavior
- Reduces awkward black/empty areas
- Makes cards and buttons feel more intentional on phone

Files changed:
- CSS/mobile.css
- HTML files updated only to bump mobile.css cache to mobile-app-v2

Commit message:
Rebuild mobile app stylesheet
