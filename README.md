# Docs Hub Template

A GitHub template to bootstrap new repos with:
- Common docs (`docs-hub/` and language folders)
- CI workflows (`.github/workflows/`)
- Opinionated structure and quick references

## Use this template
1. Click “Use this template” → “Create a new repository”.
2. Pick owner/name, visibility, and create the repo.
3. Clone your new repo locally.

## After creating your new repo
1. Rename `PROJECT_README.md` → `README.md` (this becomes your project’s main README).
2. Keep or remove docs you don’t need in:
   - `docs-hub/`, `Python/`, `LangGraph/`, etc.
3. Review CI:
   - `.github/workflows/ci-python.yml`, `.github/workflows/ci-nodejs.yml`
   - Ensure default branch is `main` (or update triggers)
   - Add required secrets in repo Settings → Secrets and variables → Actions
4. Update metadata:
   - `VERSION`
   - Repo description, topics, license (if applicable)

## Customize
- Add or edit language folders as needed.
- Add more workflows (lint/test/build/deploy).
- Add issue/PR templates under `.github/`.

## Notes
- This README describes the template. It should remain in template repos only.
- In generated repos, use the renamed `README.md` (from `PROJECT_README.md`) as the project’s primary readme.