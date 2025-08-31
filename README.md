# JSON Prompting Guide

A community-editable catalog of JSON prompt templates with a small React web app for browsing, editing, and downloading prompts.

## What's included
- `src/` — single-file React app (`App.jsx`) and entry point
- `prompts/` — individual prompt JSON files and `index.json`
- `README.md`, `CONTRIBUTING.md`
- `.github/` — issue and PR templates
- `.github/workflows/validate-json.yml` — GitHub Actions workflow for JSON schema validation

## Quick start (local)
1. Install dependencies

```bash
npm install
```
2. Run dev server (Vite recommended)

```bash
npm run dev
```

## How to contribute
- Fork the repo
- Add new prompt JSON files under `/prompts` (one file per prompt)
- Update `prompts/index.json` or open a PR and request maintainers to run the index update script
- Follow the PR template and include examples

See `CONTRIBUTING.md` for more details.

## License
MIT
