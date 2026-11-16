# Portfolio content

This branch holds the content for every portfolio design (walkthrough and journey).
Both sites load `profile.json` from here when someone opens the page.

To update your portfolio (new role, project, certificate, link):

1. Open `profile.json` on GitHub on this branch and click the pencil icon.
2. Change the text. Keep the same field names and the JSON structure.
3. Commit. Both sites show the change within a few minutes. No redeploy.

The intro numbers (internships, projects, certifications) are counted automatically.
Google Cloud badges come from Credly by themselves; you don't add them here.
If this file ever has a mistake, the sites fall back to their built-in copy.

## Adding a new role

1. Add it to `experiences` (give it a short unique `id`, e.g. `"acme"`).
   Put `Present` in its `period` and the intro will say "… and <role> at <company>".
2. For the journey design's map, also add a stop to `journey`:
   `{ "id": "j-acme", "experience": "acme", "place": "Bengaluru", "coords": [12.97, 77.59] }`
   (coords are latitude, longitude; search "<city> coordinates").
3. Optional illustration: `experience-acme.jpg` (walkthrough design).

Removing a role from `experiences` also removes it from the map.
