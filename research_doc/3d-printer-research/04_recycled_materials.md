# Research Angle 4: Recycled Nylon/Plastic for 3D Printing

## Executive Summary

Recycling plastic waste into 3D printer filament is technically feasible and increasingly practical at both industrial and small scales. PET bottles (water/soda bottles) are the most accessible feedstock, followed by post-industrial PLA/ABS waste, and nylon from fishing nets, carpets, and fabric scraps. The core challenge is not whether recycled plastic can be extruded — it can — but whether the resulting filament meets the tight diameter tolerances (±0.05 mm) needed for reliable 3D printing. Achieving this requires careful sorting, cleaning, shredding, drying, and controlled extrusion.

For Iraq specifically, the abundant PET bottle waste stream presents the most realistic near-term opportunity. Recycled nylon from fishing nets (available along the Shatt al-Arab and southern marshlands) and carpet/fabric waste is viable but requires higher processing temperatures, meticulous drying (nylon is extremely hygroscopic), and more specialized equipment. The capital cost of a desktop extruder system (USD $1,400–3,000) can be recouped if the printer consumes >10 kg/month of filament, given that imported filament costs roughly $20–30/kg while recycled feedstock is nearly free.

The verdict: home-scale recycling is worth pursuing for high-volume users, educational settings, and projects where environmental impact matters. For occasional printing, buying recycled filament from companies like Reflow, Filamentive, or Fishy Filaments is more practical than DIY extrusion.

## Feasibility Overview

**Recycled plastic can absolutely be used in 3D printing.** Most FDM/FFF printers work with recycled filament as long as it meets the same diameter tolerance and moisture standards as virgin material. The key is not *whether* it can be done but *how well it is processed.*

The practical reality:
- Commercial-grade recycled filament (Reflow, Filamentive, Fishy Filaments) performs within 85–95% of virgin material
- DIY recycled filament is achievable but has higher variability
- The main failure modes are inconsistent diameter (causing jams), moisture (causing bubbles/weak parts), and contamination (causing nozzle clogs or weak layer adhesion)
- For functional/non-cosmetic parts, recycled filament is often "good enough"

## Recyclable Plastics for 3D Printing

| Plastic Type | Source | Recyclability | Print Difficulty | Common Uses |
|-------------|--------|--------------|-----------------|-------------|
| PET (bottles) | Water/soda bottles | Excellent | Medium-High | Bottles → filament directly |
| PETG (glycol-modified) | Packaging, medical trays | Excellent | Low-Medium | Preferred over PET for printing |
| PLA | Failed prints, packaging | Good (mechanical) | Low | Most common 3D printing plastic |
| ABS | Electronics housings, car parts | Moderate | Medium | Functional parts (needs enclosure) |
| Nylon 6/PA6 | Fishing nets, carpets, fabric | Good | High | Strong, durable engineering parts |
| Nylon 66/PA66 | Industrial fabrics, ropes | Moderate | High | Higher temp, harder to process |
| Polypropylene (PP) | Packaging, bottles | Good | High | Flexible parts (adhesion issues) |
| HDPE | Milk jugs, shampoo bottles | Good | High | Warps severely, hard to print |
| PS (polystyrene) | Packaging, disposable cups | Moderate | Medium | Brittle, limited use |

### Key Notes on Each:

- **PET** — Requires drying at 140–160°C for 4–6 hours before extrusion. PET and PETG cannot be mixed. Print temperature: 255–265°C, bed at 80°C. Strips from bottles need to be specific widths based on bottle wall thickness (10mm for 0.1mm wall, 8mm for 0.3mm wall).

- **PETG** — Much easier to print than PET. More forgiving with moisture. Common recycled option from companies like Reflow (Seaglass rPETG line).

- **PLA** — Recycling PLA reduces tensile strength by ~10–15% based on studies. Shear strength actually increased ~7% in one study. More variability in results. PLA degrades with each thermal cycle — can usually be recycled 2–3 times before properties degrade significantly.

- **ABS** — Produces styrene fumes when melted. Requires ventilation. Recycled ABS from automotive/e-waste sources often contains flame retardants and fillers that complicate processing.

- **Nylon/PA** — The most challenging but also the most rewarding recycled material. Nylon 6 is easier to recycle than Nylon 66 because it's made from a single monomer (caprolactam) that can be chemically depolymerized.

- **PP & HDPE** — Both shrink significantly during cooling, making dimensional accuracy difficult. PEI/textured build surfaces help. PP floats in water (useful for sink-float separation in recycling).

## Recycling Workflow

### Step 1: Collection & Sorting
- Identify plastic type by recycling symbol (#1 PET, #2 HDPE, #5 PP, #6 PS, #7 Other)
- Separate by color if color consistency matters
- Remove non-target materials (metal, paper, other plastic types)
- For PET bottles: remove caps, labels, and safety seals
- Small amounts of contamination (1–2% of a different plastic) can ruin a batch

### Step 2: Cleaning
- Wash with hot water and detergent to remove residue
- Labels and glue require extra scrubbing; brake cleaner or isopropyl alcohol helps
- Rinse thoroughly — any sugar/residue will carbonize during extrusion and cause clogs
- For fishing nets: remove salt, algae, marine biofouling, and metal hardware
- Dry cleaned plastic at room temperature or low heat before shredding
- **In Iraq:** PET bottles from households need thorough rinsing to remove sugary drink residue

### Step 3: Shredding
- PET bottles are thin and flexible — they don't catch well in small shredders
- Pre-compression (e.g., vacuum shrinking or mechanical crushing) helps
- Target flake size: 5–10 mm
- Equipment options:
  - Precious Plastic shredder (open source, ~$200–400 DIY, $1,000–2,000 pre-built)
  - Felfil Shredder+ (€1,899 / ~$2,050)
  - 3devo GP20 Shredder (industrial grade, ~$3,000+)
  - Industrial plastic granulators (for higher volume)
- Uneven flake size causes inconsistent feeding and diameter variation

### Step 4: Drying — CRITICAL STEP
- Most thermoplastics are hygroscopic (absorb atmospheric moisture)
- Moisture causes hydrolysis — polymer chains break, creating weak, brittle filament

| Plastic | Drying Temp | Drying Time | Target Moisture |
|---------|------------|-------------|-----------------|
| PLA | 45°C | 6 hours | <250 ppm |
| PETG | 55–65°C | 4–6 hours | <100 ppm |
| PET | 140–160°C | 4–6 hours | <50 ppm |
| ABS | 80°C | 4 hours | <200 ppm |
| Nylon 6 | 80–90°C | 6–12 hours | <50 ppm |
| Nylon 66 | 90–100°C | 8–16 hours | <50 ppm |
| HDPE | 60–70°C | 3–4 hours | <100 ppm |
| PP | 60–70°C | 3–4 hours | <100 ppm |

Equipment: food dehydrator, filament dryer (eSun eBOX, Sunlu S2, etc.), or lab oven with precise temperature control. **Never use a household kitchen oven** — temperature fluctuations will ruin the plastic.

### Step 5: Extrusion
- Feed dried flakes/pellets into extruder hopper
- Plastic is melted via heated barrel (screw-driven or plunger)
- Four heating zones typical: feed, compression, metering, die
- Molten plastic exits through a nozzle (typically 1.75mm or 2.85mm)
- Diameter is measured by laser sensor and puller speed adjusts to maintain tolerance
- **Critical:** flakes have low bulk density (0.2–0.3 g/cm³ vs 0.8 g/cm³ for pellets) — hopper bridging and surging are common problems

Typical extrusion temperatures:
| Plastic | Extrusion Temp |
|---------|---------------|
| PLA | 170–190°C |
| PETG | 220–250°C |
| PET | 255–265°C |
| ABS | 210–240°C |
| Nylon 6 | 240–260°C |
| Nylon 66 | 260–290°C |
| PP | 190–230°C |
| HDPE | 180–220°C |

### Step 6: Spooling
- Filament must be cooled (air path or water bath) before winding
- Puller wheels regulate speed to match extrusion rate
- Automatic spooler winds filament evenly onto spool
- Laser micrometer provides real-time diameter feedback (should target 1.75mm ±0.05mm)
- For DIY: a motorized winder with traversing mechanism is needed for even spooling
- Spools should be stored in sealed bags with desiccant immediately

## Focus: Recycled Nylon

### Sources
- **Fishing nets** — Nylon 6 (monofilament) and Nylon 66 (multifilament). ~1 million tons of nets discarded globally per year. Fishy Filaments (Cornwall, UK) produces 100% recycled nylon 6 filament from fishing nets. Chulalongkorn University (Thailand) has a research project recycling ghost nets into 1.75mm filament.
- **Carpet waste** — Both nylon 6 and nylon 66. Post-consumer carpets are a massive waste stream. Nylon 6 can be chemically recycled back to caprolactam monomer (Aquafil's Econyl process).
- **Fabric scraps** — Textile manufacturing waste. Often blended with cotton or elastane — requires separation.
- **Industrial waste** — Nylon pellets, rejected parts, sprues from injection molding.

### Processing Requirements
- **Drying is non-negotiable.** Nylon absorbs up to 8–10% moisture by weight. Even small amounts cause bubbling, stringing, and severe strength reduction.
- Drying: 80–90°C for 6–12 hours in a dehumidifying dryer — standard home dryers rarely reach these temperatures continuously
- Extrusion temperature: 240–260°C for nylon 6, 260–290°C for nylon 66
- Requires an all-metal hotend (standard PTFE-lined hotends degrade above ~250°C)
- Enclosed printer or heated chamber recommended (45°C ambient minimum)
- Can be printed directly onto PEI, garolite, or with adhesive (glue stick, Magigoo)

### Print Settings for Recycled Nylon
| Parameter | Recommended |
|-----------|------------|
| Nozzle temp | 250–270°C |
| Bed temp | 70–90°C |
| Bed surface | PEI, garolite, or PVA glue stick |
| Enclosure | Required (45°C+) |
| Print speed | 30–60 mm/s |
| Fan | 0–30% (minimal cooling) |
| Retraction | 1–3mm at 25–40mm/s |
| Storage | Airtight with desiccant, or print directly from dry box |

### Mechanical Properties
Recycled nylon 6 can achieve mechanical properties competitive with virgin material when properly processed:
- Tensile strength: 45–65 MPa (virgin nylon 6: ~63 MPa)
- Tensile modulus: ~2,000–2,300 MPa
- Elongation at break: Typically lower than virgin (polymer chain shortening from thermal degradation)
- Impact resistance: Slightly lower than virgin but still superior to PLA, ABS, and PETG
- Studies show properly formulated recycled nylon compounds can achieve heat deflection temperatures within 5–8°C of virgin nylon

Key finding from literature: AQ27000 R-Nylon-6 filaments exhibited tensile yield strength from 8% *below* to 90% *above* commercial nylon blends, depending on formulation additives. This demonstrates that recycled nylon can match or exceed virgin nylon with proper compounding.

### Cost Analysis

| Item | Cost |
|------|------|
| Virgin nylon 6 filament (1kg) | $25–45 |
| Recycled nylon filament (Fishy Filaments) | ~£30–40 / $38–50 |
| Nylon pellets (virgin, 1kg) | $5–10 |
| Nylon waste (fishing nets, fabric) | Free to very low cost |
| DIY extrusion cost (electricity + equipment amortized) | ~$3–8/kg |
| Filabot EX6 (professional desktop extruder) | ~$15,000 |
| Felfil Evo + Spooler (DIY desktop) | ~$1,400 |
| Cheap Chinese desktop extruder (Wellzoom) | ~$680 |

**Takeaway:** At current prices, DIY recycling makes economic sense at >10 kg/month consumption. Below that, the equipment cost and time investment exceed the savings.

## Filament Extruder Options

| Machine | Type | Price (USD) | Capacity | Pros | Cons |
|---------|------|------------|----------|------|------|
| Filastruder | DIY Kit | ~$300 | ~0.5 kg/day | Cheap, open-source | Slow, single temp zone |
| Felfil Evo Basic Kit | DIY Kit | ~$400 | ~0.5 kg/day | Italian design, open source | Needs assembly |
| Felfil Evo Complete Kit | DIY Kit | ~$789 | ~0.8 kg/day | Full kit, multiple zones | Manual diameter control |
| Felfil Evo Assembled | Pre-built | ~$959 | ~0.8 kg/day | Ready to use | Expensive for output |
| Felfil Evo + Spooler+ Bundle | Pre-built | ~$1,700 | ~1 kg/day | Integrated winding | Requires separate shredder |
| Felfil Full Bundle (Evo+Spooler+Shredder) | Pre-built | ~$3,200 | ~1 kg/day | Complete ecosystem | High upfront cost |
| Wellzoom B2 Desktop | Pre-built | ~$680 | ~1 kg/10hr | Cheap, 300°C max | Inconsistent diameter, poor reviews |
| Noztek Pro | Pre-built | ~$1,200 | ~1-2 kg/day | Good quality, dual nozzles | Limited material range |
| 3devo Filament Maker ONE | Pre-built | ~$6,000 | ~1-2 kg/day | 4 heating zones, 450°C max, professional | Expensive for hobbyists |
| 3devo Filament Maker TWO | Pre-built | ~$15,000+ | ~3-5 kg/day | Industrial grade, data logging, consistent | Very expensive |
| Filabot EX6 | Pre-built | ~$15,000 | ~4.5 kg/hr | Professional grade, PEEK capable | Overkill for home use |
| Precious Plastic Extruder | DIY (open source) | ~$200-500+ | Variable | Free plans, community support | Requires fabrication skills |
| QiTech JARVIS Extruder | Pre-built | ~$24,000 | Industrial | Full production line | Commercial only |
| RoboPET TinyPET | Pre-built | ~$360 | ~1 spool/day | Cheap, PET-focused | PET bottles only, specialized |

## Challenges & Solutions

| Challenge | Impact | Solution |
|-----------|--------|----------|
| Inconsistent filament diameter | Jams, under/over extrusion, weak parts | Laser diameter sensor + closed-loop puller speed control; mix pellets for consistency |
| Moisture absorption (esp. nylon) | Bubbles, popping, weak layers, surface defects | Dehumidifying dryer (80-90°C for 6-12h); print from dry box |
| Contamination | Nozzle clogs, weak layer bonds, degradation | Meticulous sorting; hot wash; melt filtration during extrusion |
| Thermal degradation (polymer chain shortening) | Brittle filament, lower strength | Limit to 2-3 recycle cycles; blend with virgin material |
| Hopper bridging (flake feed issues) | Inconsistent extrusion rate | Use crammer feeder; mix with pellets; cut flakes smaller |
| Nozzle wear (recycled materials) | Enlarged nozzle, poor dimensional accuracy | Use hardened steel or ruby nozzle |
| Color inconsistency from mixed waste | Unpredictable aesthetics | Sort by color; use dark pigments for uniformity |
| PET bottle shredding difficulty | Inconsistent flake size | Vacuum shrink bottles first; use industrial shredder |
| Nylon warping during print | Print detachment, curling | Heated enclosure (45-50°C); proper bed adhesion (garolite/PEI) |
| PP/HDPE shrinkage | Dimensional inaccuracy | Slow cooling; minimize part size; use PP-specific build surface |

## Quality: Recycled vs Virgin

| Property | Virgin Filament | Recycled (well-processed) | Recycled (DIY/poorly processed) |
|----------|----------------|--------------------------|--------------------------------|
| Tensile strength | Baseline | 85–95% of virgin | 50–80% of virgin |
| Dimensional accuracy | ±0.03mm | ±0.05mm | ±0.1mm or worse |
| Surface finish | Smooth, consistent | Slightly textured | Rough, inconsistent |
| Color consistency | Excellent | Good (commercial) / variable (DIY) | Very variable |
| Layer adhesion | Excellent | Good | Fair to poor |
| Moisture sensitivity | Moderate | Higher | Very high |
| Cost per kg | $20–30 | $20–30 (commercial) / $3–8 (DIY) | $3–8 (DIY) |
| Environmental impact | High (virgin plastic) | Low (diverts waste) | Low |
| Batch-to-batch consistency | Excellent | Good (commercial) / variable (DIY) | Poor |

**When recycled is good enough:**
- Prototypes and test prints
- Non-cosmetic functional parts
- Educational/demonstration purposes
- Parts where strength requirements are <80% of virgin material
- Projects with environmental messaging
- Large prints where material cost is significant

**When recycled is NOT recommended:**
- Medical devices
- Food contact items (recycled may contain unknown contaminants)
- Safety-critical structural components
- Parts requiring precise tolerances (<0.1mm)
- Cosmetically demanding visible parts (unless color-managed)

## Iraq-Specific Opportunities

### Available Waste Streams
- **PET bottles are everywhere.** Iraq consumes millions of plastic water bottles daily. Collection infrastructure is informal but the material is abundant and free.
- **Nylon from fishing nets.** Southern Iraq (Basra, Faw, Shatt al-Arab marshlands) has fishing communities with discarded nets. The Chulalongkorn University model (Thailand) is directly relevant — small-scale net collection → cleaning → shredding → extrusion.
- **Carpet waste.** Both residential and commercial carpet replacement creates significant nylon waste.
- **Fabric scraps.** Textile markets and garment manufacturing produce nylon/polyester waste.
- **Failed 3D prints/ support material.** As 3D printing grows, so will PLA/ABS waste from failed prints.

### Cost Comparison: Recycled vs Imported (Iraq)
- Imported PLA filament (via UAE/Turkey): ~$20–30/kg delivered to Iraq
- Imported nylon filament: ~$35–50/kg
- Homemade recycled PET filament: ~$3–7/kg (electricity + consumables only)
- Homemade recycled nylon filament: ~$5–10/kg

With a Felfil Evo + Spooler bundle (~$1,700 including shipping), at a savings of ~$15–25/kg vs imported filament, the payback period is:
- 70–115 kg of filament (6–10 months for a user printing 10–15 kg/month)

### DIY Culture and Maker Community
- Science Camp (Iraqi Makerspace) based in Basra since 2013 — part of the global FabLab network
- Iraqi 3D Printer Owners and Makers Facebook group (active community)
- Suli Innovation House in Sulaymaniyah — GIZ-supported plastic waste recycling initiatives
- Save Living (Netherlands-Iraq) — provides custom recycling machines for hard-to-recycle plastics in Iraq
- The Iraqi maker scene is growing but small. A recycled filament initiative could anchor a local circular economy project.

### Environmental Benefit
- Iraq has limited formal recycling infrastructure — most plastic waste goes to landfills or open burning
- Converting waste to filament creates a direct economic incentive for collection
- 120 PET bottles = 1 kg of filament (Reflow data)
- Avoided CO2: ~0.5 kg per kg of recycled filament vs virgin
- Reduces plastic leakage into waterways (Tigris, Euphrates, Shatt al-Arab)

## Projects & Communities

### Precious Plastic
- Founded 2013 by Dave Hakkens (Eindhoven)
- Open source blueprints for 4 machines: shredder, extruder, injection molder, compression press
- Machines can be built for ~€2,000–4,000
- Global community of 1,000+ active groups
- Bazaar marketplace for buying/selling machines and products
- Relevant to Iraq: designs can be built locally with welding and machining skills
- Limitations: Precious Plastic extruder makes 3-6mm "filament" (for compression/injection), not 1.75mm printer filament — requires modification

### Fishy Filaments (Cornwall, UK)
- Ian Falconer, founded 2017
- 100% recycled nylon 6 from end-of-life fishing nets
- Products: 1.75mm filament + micro-pellets for injection molding
- Works with Newlyn harbour fishing fleet
- Containerized micro-factory model — relevant for port communities
- Website: fishyfilaments.com

### Chulalongkorn University (Thailand)
- Dr. Nuttapol Risangud, Petroleum and Petrochemical College
- "Development of a Prototype Innovation for Recycling Nylon from Fishing Nets in 3D Printing Technology"
- Supported by PETROMAT and Ube Technical Center
- Process: collect → clean → shred → compound with additives → extrude → 1.75mm filament
- Applications tested: motorcycle parts, automotive components
- The closest academic model to what could work in southern Iraq

### Reflow Filament (Amsterdam)
- Founded 2015 by Jasper Middendorp
- Produces rPETG (Seaglass line), rPLA (matte), and custom recycled filaments
- Originally operated in Tanzania — social enterprise model
- ~95%+ recycled content per spool
- Prices: €18–30/kg for recycled filament
- Now Netherlands-based but mission-driven for developing countries
- Website: reflowfilament.com

### Filamentive (UK)
- 100% recycled ONE PET filament (collaboration with Tridea, Belgium)
- 1.75mm and 2.85mm, 7 colors
- £19.99 per 750g spool
- Website: filamentive.com

### Other Notable Projects
- **PETMAT z.ú.** (Czech Republic) — Open source PET bottle → filament machine
- **RoboPET / TinyPET** (Romania) — Low-cost (~$360) PET bottle filament maker
- **b-PET** (Argentina) — 100% recycled PET filament company
- **Recreator** — Desktop filament recycler (open source)
- **Lyman Filament Extruder** — Early open-source DIY extruder (Thingiverse)
- **QiTech JARVIS** — German industrial-grade filament production line (€24,000)
- **Project Seafood** — Recycling fishing gear into 3D printing materials

## Recommendation

### Is recycling worth it?

**For the individual hobbyist printing <5 kg/month:**
Probably not. Buy recycled filament from Reflow, Filamentive, or Fishy Filaments. The time, equipment cost, and learning curve of DIY extrusion outweigh the savings.

**For the heavy user/educational lab printing 10+ kg/month:**
Yes, especially for PET. A Felfil Evo + Spooler (~$1,700) pays for itself in 6–10 months. The workflow is labor-intensive but rewarding.

**For a community makerspace or FabLab in Iraq:**
Strong yes. A shared extruder setup could serve multiple users, create local circular economy awareness, and produce filament at a fraction of imported cost. Start with PET bottles (most abundant), then graduate to nylon if fishing net or carpet sources are available.

**For nylon specifically:**
Pursue only if you have (a) reliable source of clean nylon 6 waste, (b) a dehumidifying dryer that reaches 90°C, (c) an all-metal hotend printer, and (d) patience for the learning curve. The results can be excellent — Fishy Filaments and Chulalongkorn University prove it — but the process is much harder than recycling PET or PLA.

### Practical Next Steps for Iraq
1. Collect and sort PET bottles from a local source (cafeteria, waste buyer)
2. Build a PET bottle strip cutter (simple jig, many designs available)
3. Use a food dehydrator to dry PET flakes (65°C, 6h) — lowest-cost entry
4. Acquire a desktop extruder (start with Felfil Evo kit or Wellzoom B2 for testing)
5. Print test coupons and compare with commercial filament
6. If successful, expand to nylon: partner with a Basra fishing cooperative for net collection
7. Create a "waste-to-filament" program at the local makerspace

## Sources

1. ScienceDirect — "Sustainable fabrication of 3D printing filament from recycled PET plastic" (2024)
2. Sinterit 3D Printing Guide — "Recycled filament for FDM/FFF 3D printing" (2025)
3. Filabot — "How to Recycle PET Bottles into 3D Printer Filament" (2025)
4. Sustainable Design Studio — rPET Filament 3D Print Settings Guide (2026)
5. MDPI Polymers — "Recycled Thermoplastics for 3D Printing Filament Production" (2026)
6. Fishy Filaments / Seafish.org — "Turning end-of-life nets into raw material for 3D printing"
7. Chulalongkorn University — "From Fishing Nets to Filament" (PRNewswire, April 2026)
8. Plastemart — "Converting Nylon Fish Net waste to 3D Printing Filament" (March 2026)
9. MDPI Materials — "High-Performance Nylon-6 Sustainable Filaments for Additive Manufacturing" (2019)
10. Felfil — Product pages and pricing (felfil.com)
11. 3devo — Filament Maker ONE / TWO specifications (3devo.com)
12. Precious Plastic Community — Open source recycling project (preciousplastic.com)
13. All3DP — "Best DIY Filament Extruder Kits" (2026)
14. Filamentive — ONE PET recycled filament (voxelmatters.com, 2019)
15. Reflow Filament — Company history and product information
16. Grand View Research — "Middle East 3D Printing Filaments Market Report" (2025)
17. GIZ Iraq — "Transforming plastic waste into opportunities in Sulaymaniyah" (2023)
18. FabLabs.io — "Science Camp (the Iraqi Maker Space), Basra"
19. Xometry — "All About Nylon 3D Printing Filament" (nylon properties comparison table)
20. Prusa Knowledge Base — Filament drying temperature guide
21. MakersPet — "How to dry your 3D printing filament properly" (drying temperatures table)
22. Eureka Patsnap — "Comparative study of recycled and virgin Nylon 6 material properties"
23. ResearchGate — "Comparative Analysis of Virgin and Recycled ABS Filaments"
24. ScienceDirect — "A comparative study of 3D printing with virgin and recycled PLA filaments" (2024)
25. 3DPrintiverse — Felfil product pricing
26. Reed Intelligence — "3D Printer Filament Recycler Market" (regional data)
27. Save Living — Iraq plastic recycling project (saveliving.nl)
28. Facebook Group — "Iraqi 3D printer owners and Makers"
29. Hackaday.io — "3D Printer Filament Maker" (PETMAT project)
