# 04 - Open Source Landscape

**Angle:** oss | **Findings:** 28 | **Sources:** S96-S121, S122, S123 | **Verdict:** NO usable cornerstone. 26 repos surveyed; none is a licensed, maintained, netcode-free Unity MOBA foundation. Build from scratch (00_README verdict), borrow the component layer only.

---

## 1. Why no cornerstone

The survey (26 repos across GitHub/Asset Store/forums) found:
- **No netcode-free complete MOBA**: every playable MOBA project is built around Photon/Mirror multiplayer or is unplayable without a server. Our ADR 6 (no netcode) disqualifies them.
- **License failures**: LeagueSandbox [S96] is GPL-style (copyleft, server-centric), NKGMobaBasedOnET [S97] and Legends-Of-Heroes [S98] are full-stack netcode projects with murky licenses; UnityMoba [S100] and MoBaDemo [S99] are **unlicensed** (cannot use at all); Boss Room [S104] is **NOASSERTION** (Unlicense claim in repo, but the asset license block is ambiguous - do not import blindly).
- **Staleness**: UnityStarter [S107] (2020, GPL-ish fork with locked scripts - the license + locked scripts make it unusable as a base) and Flexi [S108] (2021) are the closest architectural matches but predate Unity 6 and our event-bus design.
- **Vaporware risk**: ARTS 404 [S101, S102] and project.storm [S118] look promising in READMEs but have no usable release; treat as nonexistent until proven otherwise.

**Verdict restated:** Build from scratch. The component layer below is the borrowable part.

## 2. The component layer (borrow, MIT-only)

- **ReGoap** [S119] (Apache-2.0): GOAP library - borrow only if the AI goal count explodes (03 says no at MVP).
- **DOTween** [S121] (MIT): tweening for UI/effects/camera - the standard, use it.
- **LeanPool** [S120] (MIT): object pooling for projectiles/effects (02 S15 note) - use it.
- **Unity UI / TextMeshPro**: built-in, no asset needed.
- **Boss Room's skill system** [S104]: NOASSERTION license - do NOT copy code; read it for reference architecture only (07 P4 gate references its ability-data patterns conceptually, cited as S104 [UNVERIFIED-license]).
- **EX-GAS** [S106]: DON'T. GAS for Unity (Odin-required) - the Odin dependency is a paid trap; our SO + event bus (ADR 3) replaces it at a fraction of the complexity.

## 3. Repo survey table (key entries)

| Repo | License | Netcode | Verdict |
|---|---|---|---|
| LeagueSandbox [S96] | GPL | yes | AVOID (copyleft + server) |
| NKGMobaBasedOnET [S97] | unclear | yes | AVOID |
| Legends-Of-Heroes [S98] | unclear | yes | AVOID |
| MoBaDemo [S99] | unlicensed | no | AVOID (cannot use) |
| UnityMoba [S100] | unlicensed | no | AVOID (cannot use) |
| ARTS 404 [S101/S102] | unclear | yes | AVOID (vaporware) |
| UnityStarter [S107] | GPL-ish + locked scripts | no | AVOID as base; READ for architecture |
| Flexi [S108] | MIT | no | READ for architecture; too old to fork |
| Boss Room [S104] | NOASSERTION | yes | AVOID as code; reference only |
| OpenHyperAI [S115] | MIT | no | READ only (component experiments, not a MOBA) |
| ReGoap [S119] | Apache-2.0 | no | BORROW if AI needs GOAP |
| LeanPool [S120] | MIT | no | BORROW |
| DOTween [S121] | MIT | no | BORROW |
| project.storm [S118] | unclear | yes | AVOID (vaporware) |
| A* Pro [S122] | paid | - | OPTIONAL BUY (Q7; $140 list, $70 sale) |
| Behavior Designer [S123] | paid | - | OPTIONAL BUY (Q7; $95) |

Full list of 26 repos with URLs in 99_SOURCES (S96-S123).

## 4. License rules (enforced in 07 P2 gate)

1. **Never import unlicensed code** (S99, S100, S101, S102, S118 status). One violation poisons the whole build.
2. **MIT only** for borrowed components; read the license file, keep the attribution header.
3. **GPL/AGPL**: reading for inspiration is fine; importing code is not (S96).
4. **NOASSERTION** (S104): treat as unlicensed until the license is resolved; never copy code.
5. **Paid assets** (S122, S123): buy only if Q7 says paid budget and the feature is core (AI editor for S123, pathfinding for S122). Default: skip both; our steering (03) needs no A* at MVP, and the 3-layer brain needs no visual editor.

## 5. Risks

- HIGH: Importing an unlicensed/locked repo "just to try it" (S99/S100/S107). Mitigation: the P2 license gate runs a license scan script over Assets/ before every phase review.
- MEDIUM: Odin-dependency trap via EX-GAS or similar (S106). Mitigation: no Odin in the dependency list; SO + event bus is the ADR 3 architecture.
- MEDIUM: Reading GPL code (S96) and accidentally reproducing its structure in our code (code smell, not a legal gate, but avoid). Mitigation: reference notes kept in research/ (this dossier), not in src.
- LOW: Paid assets bought before Q7 answered (S122, S123) - wasted money. Mitigation: defer all purchases until after Q7.