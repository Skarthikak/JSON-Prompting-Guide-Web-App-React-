# Contributing to JSON Prompting Guide

Thanks for wanting to contribute! This guide explains how to add prompts and submit PRs.

## Adding a new prompt
1. Create a JSON file under `/prompts` using kebab-case for the filename. Example: `conv-support-reply.json`.
2. Follow the prompt schema:
```json
{
  "id":"string",
  "category":"string",
  "title":"string",
  "description":"string",
  "input_schema":{ "...": "..." },
  "prompt_template":"string",
  "examples":[ { "input": {...}, "output_hint":"..." } ],
  "tags":[ "..." ]
}
```
3. Include at least one realistic example input and an output hint.

## Opening a PR
- Fork the repo
- Add your prompt file(s) and update `prompts/index.json` if needed
- Run `npm run lint` (if available) and ensure JSON is valid
- Create a PR describing the changes and why the prompt is useful

## Code of conduct
Be respectful and constructive. Maintain a helpful tone in reviews and issues.
