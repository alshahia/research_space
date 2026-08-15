# Dossier citation conventions (research_doc/ builds)

Repo: research_space. Applies to every chapter written from angle files (`share/notes/01_research_*_angle-*.md`).

1. **Copy URLs in the angle file's own format.** Full URL when the angle captured a full URL; **bare ID** when the angle gives a bare ID (e.g. Kobo `360058975652`, Wattpad `211678146`). Do not silently expand bare IDs into `support.…/articles/<id>` URLs - the reviewer greps verbatim against the angle files and a constructed URL fails the check.
2. Exception (flagged): construct standard help-center URLs only from captured IDs AND surface the construction in the coder summary (e.g. Google `14164701` → `support.google.com/books/partner/answer/14164701`).
3. Cross-task provenance is legal: task-002 chapters may cite task-001 sources verbatim (Kotobee support articles, factsheet) when the plan names the cross-ref (flag 11 style). Note it in the summary.
4. Never invent setup costs; a cell may honestly say "not published - contact" / "n/a (defunct)".
5. "No emoji" rule = decorative emoji; the verdict glyphs ✅ ⚠️ ❌ 🔶 are mandated by the plan and safe. No fenced code blocks except email templates / appendix checklists (use plain `- [ ]` markdown elsewhere).
6. PowerShell `-match`/`Get-Content` misrenders UTF-8 emoji (🔶 shows as 0 matches) - verify emoji-bearing markers with the grep tool, not PowerShell.
