# Vloid — illustration prompts

Two slots on the landing page take an illustration. Drop the finished files into `public/images/` with these exact names and the page picks them up automatically (no code change):

| Slot | File | Size | Notes |
|---|---|---|---|
| Hero | `public/images/hero.webp` | 2400 × 1500 (16:10) | Loaded with priority — keep it **under ~350 KB** |
| Closing CTA | `public/images/cta.webp` | 2400 × 1200 (2:1) | Lazy-loaded — keep it under ~300 KB |

`.avif`, `.jpg` and `.png` also work. Export at quality ~75–80; `next/image` then serves resized AVIF/WebP per device.

**Composition rule for both:** the **top 40% must be calm, dark sky** with nothing important in it — the headline, subhead and email field sit there. All the detail lives in the bottom half, and the centre-bottom should stay slightly lower/quieter than the sides so it frames the text.

---

## Shared style block (paste after every prompt)

> Flat-shaded editorial illustration with subtle grain, crisp geometric shapes, soft volumetric light, semi-isometric 3/4 view. Palette: deep night indigo (#0a0c22, #151a3f, #2a2f8f), warm ember orange accents (#ff5420, #ff9b73), small pops of warm window light. Calm, optimistic, premium tech-brand feel. No text, no logos, no people's faces in close-up, no lens flare, no neon cyberpunk. Wide 16:10 composition, top 40% empty dark gradient sky with a few faint stars.

Midjourney suffix: `--ar 16:10 --style raw --v 7` (use `--ar 2:1` for the CTA).

---

## Hero — pick one concept

**A. "The city that gets called back"**
A calm West African coastal city at blue hour, seen from slightly above. Low-rise and mid-rise buildings with warm lit windows, palm trees, rooftops with water tanks and small satellite dishes. A single slender radio mast rises on the left third, its tip glowing ember orange. Thin, elegant arcs of soft orange light travel from the mast to a handful of individual lit windows across the city, like calls being answered. Gentle sea horizon on the far right. Bottom-centre is a quiet plaza, darker and lower than the sides.

**B. "The quiet office after hours"**
An airy, open-plan support office at dusk with floor-to-ceiling windows looking out over a city at blue hour. Empty desks with closed laptops and neatly stacked papers; one wall-mounted screen glows with soft orange bars like a voice waveform. Plants, warm desk lamps, long shadows. The feeling: the work is being handled, the team has gone home. Detail concentrated low in the frame, ceiling and upper windows fade into dark indigo.

**C. "Voice over the landscape"** (most abstract)
A vast, calm night landscape of rolling hills and a river valley, viewed from a high vantage point. Small villages and towns with warm lit windows scattered across the hills. A soft ember-orange sound wave — like an audio waveform made of light — ripples gently across the horizon, touching each town. Dark indigo sky above, faint stars.

## Closing CTA — matches whichever hero you pick

**A.** Same city as hero A, now at first light: sky shifting from indigo to soft ember at the horizon, most windows still warm, the radio mast's arcs fading as the last calls finish. Wider and lower than the hero; the skyline sits in the bottom third.

**B.** The same office from hero B seen from outside at dawn: the building's windows warm, the city waking, a soft orange sunrise along the bottom edge.

**C.** The same landscape as hero C at sunrise: the waveform has settled into the horizon line, which glows ember orange; towns still lit.

---

## Tips

- Generate 4–8 variations and pick the one with the **cleanest empty sky** — that matters more than detail.
- If a result has text, faces or logos, re-roll; don't try to edit them out.
- Upscale once, then export WebP. Check the file size before dropping it in.
- Want me to tune crops or the darkening gradient once the images are in? Just drop them in and ask.
