Mobile Cleanup v1

What changed:
- Added CSS/mobile.css as a mobile-only override layer.
- Linked CSS/mobile.css across the frontend pages.
- Cleaned mobile navbar spacing.
- Cleaned homepage mobile layout while keeping the bike hero feel.
- Cleaned maintenance mobile layout, selector cards, task board, and task cards.
- Added safer mobile layouts for garage, about, contact, auth, bikes, and updates pages.
- Desktop layout is intentionally untouched because mobile.css only runs at 900px and below.

Files changed:
- CSS/mobile.css
- index.html
- garage.html
- maintenance.html
- about.html
- contact.html
- login.html
- register.html
- bikes.html
- updates.html

Deploy notes:
- Upload the full folder as usual.
- Hard refresh on mobile after deployment.
- Test at phone width first, then desktop.

Suggested commit message:
Add mobile cleanup stylesheet
