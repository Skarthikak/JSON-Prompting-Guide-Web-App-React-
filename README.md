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
import React, { useState } from "react";

/*
README (included inside the app file)

Project: JSON Prompting Guide — single-file React preview

What this file is:
- A complete single-file React component you can preview. It contains:
  - A browsable, searchable guide of JSON-formatted prompt templates.
  - Multiple categories and example prompts for each category/topic.
  - UI to preview, copy, edit, and download prompt JSON.
  - A built-in CONTRIBUTING guide, Git commands and suggested GitHub issue/PR templates.

How to run locally:
1. Create a new React app (recommended: Vite + React):
   npm create vite@latest json-prompt-guide -- --template react
   cd json-prompt-guide
2. Replace src/App.jsx with this file's contents and ensure Tailwind (optional) is configured.
3. Install deps and run:
   npm install
   npm run dev

Suggested repo structure (what you should push to GitHub):
- /src
  - App.jsx            (this file)
  - index.css
  - main.jsx
- package.json
- README.md
- .github/ISSUE_TEMPLATE/bug_report.md
- .github/PULL_REQUEST_TEMPLATE/pull_request_template.md
- .github/workflows/ci.yml

Publishing to GitHub & asking community to contribute (commands you can run locally):
# initialize git, add files, commit, and push to a new repo named "json-prompt-guide"
git init
git add .
git commit -m "Initial commit: JSON Prompting Guide web app"
# create repo on GitHub (replace USERNAME)
# using GitHub CLI (gh) — install from https://cli.github.com/
gh repo create USERNAME/json-prompt-guide --public --source=. --push

# Once pushed, open the repo in the browser and add the following to README.md:
# - A friendly call-to-action asking the community to submit examples, fix typos, add categories.
# - Use issue and PR templates (provided below in this file) to guide contributors.

Community ask sample (copy into GitHub discussion or issue):
Title: "Help expand the JSON Prompting Guide — add examples & patterns"
Body:
I built an initial JSON Prompting Guide and web UI. I'd love help expanding categories, refining prompt templates,
and adding new real-world examples. If you'd like to contribute:
- Fork the repo
- Add or update prompt JSON files under /prompts
- Open a PR with description of the change

-- End README --
*/

// App: JSON Prompting Guide
export default function App() {
  const samplePrompts = [
    {
      id: "conv-001",
      category: "Conversational",
      title: "Friendly Customer Support Reply",
      description:
        "Generate a concise, empathetic reply to a customer support question with steps and an estimated ETA.",
      input_schema: { customer_name: "string", issue_summary: "string", urgency: "low|medium|high" },
      prompt_template:
        "You are a helpful customer support agent. Reply to {{customer_name}} about: {{issue_summary}}. Keep it under 6 sentences, show empathy, list 2 troubleshooting steps, and provide an ETA for resolution based on urgency={{urgency}}.",
      examples: [
        {
          input: { customer_name: "Ravi", issue_summary: "App crashes on login", urgency: "high" },
          output_hint:
            "Hi Ravi — I'm sorry you're seeing crashes. Please try clearing cache (steps...). If that doesn't work, we'll escalate and expect a fix within 24 hours."
        }
      ],
      tags: ["support", "short", "empathetic"]
    },
    {
      id: "code-001",
      category: "Code Generation",
      title: "Implement Function from Description",
      description: "Generate a well-documented JavaScript function from a spec. Include edge cases and tests.",
      input_schema: { function_name: "string", description: "string", language: "javascript|python" },
      prompt_template:
        "Write a {{language}} function named {{function_name}} that {{description}}. Include docstring/comments, complexity analysis, and 3 unit tests using a popular test framework.",
      examples: [
        {
          input: { function_name: "isPrime", description: "returns true if a number is prime", language: "javascript" },
          output_hint: "Provide an efficient algorithm (O(sqrt(n))) with tests in Jest."
        }
      ],
      tags: ["code", "js", "tests"]
    },
    {
      id: "img-001",
      category: "Image Generation",
      title: "Illustration Prompt (JSON for image model)",
      description:
        "JSON structure optimized for text-to-image models. Include style, composition, camera, and color palette fields.",
      input_schema: { subject: "string", style: "string", mood: "string", palette: "string" },
      prompt_template:
        '{"prompt":"A {{subject}} in {{style}} style, {{mood}}, color palette: {{palette}}","neg_prompt":"lowres, watermark, text"}',
      examples: [
        {
          input: { subject: "red fox sitting on a mossy rock", style: "watercolor illustration", mood: "serene", palette: "emerald and rust" },
          output_hint: "Good for Stable Diffusion or Midjourney-like systems. Provide camera angle: side 3/4."
        }
      ],
      tags: ["image", "sd", "midjourney"]
    },
    {
      id: "data-001",
      category: "Data Extraction",
      title: "Extract Structured Data from Text",
      description: "Extract JSON objects (name, email, company, role) from a freeform resume paragraph.",
      input_schema: { text: "string" },
      prompt_template:
        "Extract the following fields as JSON from the text: name, email, company, role. If a field is missing, set it to null. Return only valid JSON.",
      examples: [
        {
          input: { text: "Priya Shah is a Senior ML Engineer at DataZen. Contact: priya@datzen.com" },
          output_hint: '{"name":"Priya Shah","email":"priya@datzen.com","company":"DataZen","role":"Senior ML Engineer"}'
        }
      ],
      tags: ["nlp", "parsing", "json"]
    },
    {
      id: "summ-001",
      category: "Summarization",
      title: "TL;DR with Key Takeaways",
      description: "Summarize long text to a 3-sentence TL;DR plus 3 bullet key takeaways.",
      input_schema: { text: "string", tone: "concise|detailed" },
      prompt_template:
        "Provide a 3-sentence summary of the text and then list 3 key takeaways as bullets. Tone: {{tone}}.",
      examples: [
        {
          input: { text: "(long article...)", tone: "concise" },
          output_hint: "Short summary and 3 bullets."
        }
      ],
      tags: ["summary", "notes"]
    },
    {
      id: "trans-001",
      category: "Translation",
      title: "Accurate Translation with Localisation Notes",
      description: "Translate text to a target language and add localization notes (formality, idioms).",
      input_schema: { text: "string", target_language: "string" },
      prompt_template:
        "Translate the given text to {{target_language}}. Provide the translation and then provide localization notes describing formality and choices for idioms.",
      examples: [
        {
          input: { text: "Could you lend me a hand?", target_language: "hi" },
          output_hint: "Include Hindi translation and note on formality."
        }
      ],
      tags: ["i18n", "translation"]
    },
    {
      id: "seo-001",
      category: "SEO / Marketing",
      title: "Meta Title & Description Generator",
      description: "Generate SEO-optimized meta title and description from article content and target keywords.",
      input_schema: { article: "string", keywords: "string[]" },
      prompt_template:
        "Create a meta title (<=60 chars) and meta description (<=155 chars) for the article focusing on keywords: {{keywords}}.",
      examples: [
        {
          input: { article: "(article about sustainable fashion)", keywords: ["sustainable fashion","eco-friendly clothes"] },
          output_hint: "Short title and description incorporating keywords naturally."
        }
      ],
      tags: ["marketing", "seo"]
    },
    {
      id: "email-001",
      category: "Email",
      title: "Professional Cold Outreach Email",
      description: "Write a concise cold email with a clear ask and follow-up plan.",
      input_schema: { recipient_name: "string", company: "string", ask: "string", tone: "string" },
      prompt_template:
        "Write a {{tone}} cold outreach email to {{recipient_name}} at {{company}} making the ask: {{ask}}. Keep it under 150 words and include a 1-sentence follow-up plan.",
      examples: [
        {
          input: { recipient_name: "Alex", company: "FinTechCo", ask: "introduce our API" , tone: "friendly" },
          output_hint: "Short intro, value prop, CTA, follow-up plan."
        }
      ],
      tags: ["sales", "email"]
    },
    {
      id: "test-001",
      category: "Testing",
      title: "Generate Test Cases from Requirements",
      description: "Produce positive and negative test cases and expected results from a feature description.",
      input_schema: { feature_description: "string" },
      prompt_template:
        "From the feature description, generate a table of test cases: id, title, steps, input, expected_output, priority.",
      examples: [
        {
          input: { feature_description: "User can reset password via email link" },
          output_hint: "Include edge cases like expired token, invalid email."
        }
      ],
      tags: ["qa", "tests"]
    }
  ];

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(samplePrompts[0]);
  const [editedJson, setEditedJson] = useState(JSON.stringify(selected, null, 2));
  const categories = Array.from(new Set(samplePrompts.map((p) => p.category)));

  function pickPrompt(p) {
    setSelected(p);
    setEditedJson(JSON.stringify(p, null, 2));
  }

  function downloadJson() {
    const blob = new Blob([editedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selected.id || "prompt"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(editedJson).then(() => {
      alert("JSON copied to clipboard");
    });
  }

  function handleSearch(items) {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
    );
  }

  const filtered = handleSearch(samplePrompts);

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">JSON Prompting Guide — Web App Preview</h1>
        <p className="mt-2 text-slate-600">Browse categories, preview JSON prompt templates, copy or download, and adapt.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-3 bg-white p-4 rounded-xl shadow-sm">
          <input
            placeholder="Search title, description, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-3"
          />

          <div className="mb-3">
            <strong>Categories</strong>
            <ul className="mt-2">
              <li className={`cursor-pointer py-1 ${!query ? 'font-semibold' : ''}`} onClick={() => setQuery("")}>All</li>
              {categories.map((c) => (
                <li key={c} className="cursor-pointer py-1 text-slate-700" onClick={() => setQuery(c)}>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Prompts</strong>
            <ul className="mt-2 max-h-72 overflow-auto">
              {filtered.map((p) => (
                <li
                  key={p.id}
                  onClick={() => pickPrompt(p)}
                  className={`p-2 rounded cursor-pointer mb-1 ${selected.id === p.id ? 'bg-slate-100' : ''}`}>
                  <div className="text-sm font-medium">{p.title}</div>
                  <div className="text-xs text-slate-500">{p.category} • {p.tags.join(', ')}</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="col-span-9">
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{selected.title}</h2>
                <p className="text-slate-600">{selected.description}</p>
                <div className="mt-2 text-xs text-slate-500">Tags: {selected.tags.join(', ')}</div>
              </div>

              <div className="space-x-2">
                <button className="px-3 py-2 border rounded" onClick={copyToClipboard}>Copy JSON</button>
                <button className="px-3 py-2 border rounded" onClick={downloadJson}>Download</button>
                <button
                  className="px-3 py-2 border rounded"
                  onClick={() => {
                    const newData = JSON.parse(editedJson);
                    setSelected(newData);
                    alert('Selected prompt updated from edited JSON (local only)');
                  }}>
                  Apply Edited JSON
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <strong>Prompt Template</strong>
                <pre className="mt-2 p-3 bg-slate-50 rounded h-48 overflow-auto text-sm">{selected.prompt_template}</pre>
              </div>

              <div>
                <strong>Examples</strong>
                <div className="mt-2 space-y-2 text-sm">
                  {selected.examples.map((ex, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-500">Input:</div>
                      <pre className="text-sm">{JSON.stringify(ex.input, null, 2)}</pre>
                      <div className="text-xs text-slate-500">Output hint:</div>
                      <div className="text-sm">{ex.output_hint}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <strong>Edit JSON</strong>
              <textarea
                value={editedJson}
                onChange={(e) => setEditedJson(e.target.value)}
                className="w-full mt-2 h-40 p-3 border rounded font-mono text-sm"
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold">Contribution & Publishing Helpers</h3>
            <p className="mt-2 text-slate-600">Copy these snippets when setting up your GitHub repo and asking the community for tweaks.</p>

            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <strong>Suggested README intro</strong>
                <pre className="mt-2 p-3 bg-slate-50 rounded text-sm">{
`# JSON Prompting Guide

A curated collection of JSON-formatted prompt templates covering many categories (conversational, code generation, image generation, data extraction, etc.).

Contribute: Fork -> add prompts under /prompts -> PR with examples and tests.
`
                }</pre>
              </div>

              <div>
                <strong>Recommended .github/ISSUE_TEMPLATE</strong>
                <pre className="mt-2 p-3 bg-slate-50 rounded text-sm">{
`---
name: Add a new prompt example
about: Use this to add or improve a prompt template
---

**Category:**
**Title:**
**Prompt JSON:**
\`\`\`json
{ ... }
\`\`\`
`}
                </pre>
              </div>
            </div>

            <div className="mt-4">
              <strong>Suggested Pull Request template</strong>
              <pre className="mt-2 p-3 bg-slate-50 rounded text-sm">{
`## What/Why
Brief description of change and reason.

## Added
- New prompt(s) under /prompts
- Example input & expected output (if applicable)

## Checklist
- [ ] README updated
- [ ] Tests/examples provided
`}
              </pre>
            </div>

            <div className="mt-4 text-sm text-slate-500">
              <strong>Publishing options</strong>
              <ul className="list-disc list-inside">
                <li>Use GitHub Pages (gh-pages branch) or Vercel for hosting the site.</li>
                <li>Use GitHub Actions to run simple lint/test steps on PRs.</li>
              </ul>
            </div>

          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-xs text-slate-500">
        Tip: To make the guide community-editable, store each prompt as a separate JSON file under a /prompts folder and add an index.json that lists them. That makes PRs focused and reviewable.
      </footer>
    </div>
  );
}

/*
==================== README: JSON Prompting Guide (Step‑by‑Step) ====================

OVERVIEW
This document is a step‑by‑step README and usage guide for the JSON Prompting Guide web app. It includes:
- A short project overview
- How to run the app locally and deploy
- How to use the UI (search, preview, edit, download)
- A clear JSON prompt schema and examples grouped by category with use cases
- Contribution guidance and suggested GitHub templates

TABLE OF CONTENTS
1. Project summary
2. What’s included in the repo
3. Prompt JSON schema (fields explained)
4. Quick start — run locally (commands)
5. UI walkthrough — how to use the app
6. Prompts by category (use case + example JSON)
7. Adding new prompts & organizing files
8. Contribution workflow & templates
9. Deploying (GitHub Pages / Vercel)
10. Next steps / Roadmap

--------------------------------------------------------------------------------
1) PROJECT SUMMARY
The JSON Prompting Guide is a community-editable catalog of JSON prompt templates. Each entry is a JSON file that describes a prompt template, input schema, examples, and usage notes. The included React web app allows browsing, searching, previewing, editing, and downloading prompts.

This repo aims to be a living library of best-practice prompt patterns and reusable JSON structures for building reliable prompts.

--------------------------------------------------------------------------------
2) WHAT'S INCLUDED
- src/App.jsx — single-file React app (UI to browse and edit prompts)
- /prompts (recommended) — folder where each prompt is stored as a separate .json file (not included in this preview file; create it in the repo)
- README.md (this content can be copied to root README)
- .github/ISSUE_TEMPLATE and PULL_REQUEST_TEMPLATE examples (suggested inline in the app)

--------------------------------------------------------------------------------
3) PROMPT JSON SCHEMA (fields explained)
Each prompt should follow this lightweight schema (example below):

{
  "id": "string (unique)",
  "category": "string (e.g. Summarization, Code Generation)",
  "title": "short human-readable title",
  "description": "longer explanation of intent and constraints",
  "input_schema": { "fieldName": "type or options" },
  "prompt_template": "string template with placeholders e.g. {{name}}",
  "examples": [{ "input": { ... }, "output_hint": "example result or guidance" }],
  "tags": ["tag1","tag2"]
}

Field notes:
- id: kebab-case recommended (unique key).
- prompt_template: keep placeholders explicit and use must/should language for constraints.
- examples: provide at least one example input and an expected hint or sample output.

--------------------------------------------------------------------------------
4) QUICK START — RUN LOCALLY
Choose Vite (recommended) or Create React App. Example using Vite:

# create project (if not done)
npm create vite@latest json-prompt-guide -- --template react
cd json-prompt-guide
# replace src/App.jsx with the app file from this repo
# install deps and run dev server
npm install
npm run dev

When ready to publish, initialize git and push to GitHub:

git init
git add .
git commit -m "Initial commit: JSON Prompting Guide"
# using GitHub CLI to create and push
# replace USERNAME with your GitHub username
gh repo create USERNAME/json-prompt-guide --public --source=. --push

--------------------------------------------------------------------------------
5) UI WALKTHROUGH — HOW TO USE THE APP
- Search: Type keywords (title, description, tags) in the search box.
- Categories: click a category to filter prompts.
- Prompt list: click a prompt to preview details.
- Prompt Template preview: shows the raw prompt_template with placeholders.
- Examples: shows sample input(s) and output hints.
- Edit JSON: edit the selected prompt JSON in the editor pane.
- Apply Edited JSON: updates the selected prompt (local only) with the edited JSON.
- Copy JSON & Download: copy to clipboard or download a .json file for a prompt.

Best practices inside the app:
- Keep each prompt focused and single-purpose.
- Provide explicit examples describing expected output format.
- When editing, maintain valid JSON and keep input_schema accurate.

--------------------------------------------------------------------------------
6) PROMPTS BY CATEGORY — USE CASES + EXAMPLES
Below are concise example prompt JSONs for common categories. Copy these into /prompts as separate files and adjust for your needs.

A. Conversational / Customer Support
Use cases: Auto-replies, support-agent drafts, empathetic responses, triage messages.
Example: support-reply.json\{
  "id":"conv-support-reply",
  "category":"Conversational",
  "title":"Support reply with troubleshooting and ETA",
  "description":"Respond empathetically and provide two quick troubleshooting steps plus an ETA based on urgency.",
  "input_schema": { "customer_name":"string", "issue_summary":"string", "urgency":"low|medium|high" },
  "prompt_template":"You are a helpful support agent. Reply to {{customer_name}} who reports: \"{{issue_summary}}\". Keep under 6 sentences, express empathy, list 2 troubleshooting steps, and provide an ETA (use 48h for low, 24h for medium, 4h for high).",
  "examples":[ { "input": { "customer_name":"Ravi", "issue_summary":"App crashes on login", "urgency":"high" }, "output_hint":"Apologize briefly, steps: clear cache, update app. If still failing, escalate and provide 4h ETA." } ],
  "tags":["support","customer","triage"]
}

B. Code Generation
Use cases: Generate functions, refactors, code comments, unit tests.
Example: code-function-spec.json\{
  "id":"code-generate-function",
  "category":"Code Generation",
  "title":"Generate function + tests from spec",
  "description":"Produce a function implementation, docstring, complexity note, and unit tests.",
  "input_schema": { "function_name":"string", "description":"string", "language":"javascript|python" },
  "prompt_template":"Write a {{language}} function named {{function_name}} that {{description}}. Include docstring/comments, complexity analysis, and at least 3 unit tests.",
  "examples":[ { "input": { "function_name":"isPrime","description":"returns true if n is prime","language":"javascript" }, "output_hint":"Use O(sqrt(n)) algorithm; provide Jest tests." } ],
  "tags":["code","tests","refactor"]
}

C. Image Generation (text->image)
Use cases: Structured prompts for Stable Diffusion/Midjourney, consistent style, negative prompts.
Example: image-illustration.json\{
  "id":"img-illustration",
  "category":"Image Generation",
  "title":"Illustration prompt JSON for image models",
  "description":"Structured JSON that separates prompt and negative_prompt and includes camera/style hints.",
  "input_schema": { "subject":"string", "style":"string", "mood":"string", "palette":"string" },
  "prompt_template":"{\"prompt\":\"A {{subject}} in {{style}} style, {{mood}}, color palette: {{palette}}. 3/4 view. High detail.\",\"negative_prompt\":\"lowres, watermark, text, deformities\"}",
  "examples":[ { "input": { "subject":"red fox on mossy rock","style":"watercolor","mood":"serene","palette":"emerald,rust" }, "output_hint":"Use side 3/4 camera, include soft grain." } ],
  "tags":["image","illustration","sd"]
}

D. Data Extraction / Parsing
Use cases: Extract structured data from resumes, emails, paragraphs; produce CSV/JSON.
Example: extract-contact.json\{
  "id":"data-extract-contact",
  "category":"Data Extraction",
  "title":"Extract contact fields from text",
  "description":"Return name, email, phone, company as JSON; set null if missing.",
  "input_schema": { "text":"string" },
  "prompt_template":"Extract name, email, phone, company from the following text and return ONLY valid JSON with those fields. If missing, use null. Text: {{text}}",
  "examples":[ { "input": { "text":"Priya Shah, Senior ML Engineer at DataZen, priya@datzen.com" }, "output_hint":"{\"name\":\"Priya Shah\",\"email\":\"priya@datzen.com\",\"phone\":null,\"company\":\"DataZen\"}" } ],
  "tags":["parsing","nlp","json"]
}

E. Summarization
Use cases: Article TL;DRs, executive summaries, meeting notes.
Example: summarization-tldr.json\{
  "id":"summ-tldr",
  "category":"Summarization",
  "title":"Three-sentence TL;DR with 3 key takeaways",
  "description":"Produce a short summary then three bullet takeaways.",
  "input_schema": { "text":"string", "tone":"concise|detailed" },
  "prompt_template":"Provide a 3-sentence summary of the text and then list 3 key takeaways as bullets. Tone: {{tone}}. Text: {{text}}",
  "examples":[ { "input": { "text":"(long article...)","tone":"concise" }, "output_hint":"Short 3-sentence summary and 3 bullets." } ],
  "tags":["summary","notes"]
}

F. Translation
Use cases: Translate and localize, provide notes on formality and idioms.
Example: translate-localize.json\{
  "id":"trans-localize",
  "category":"Translation",
  "title":"Translate + localization notes",
  "description":"Translate the text and add localization notes (formality, idioms).",
  "input_schema": { "text":"string", "target_language":"string" },
  "prompt_template":"Translate to {{target_language}}. Provide the translation followed by localization notes addressing formality and idiom choices. Text: {{text}}",
  "examples":[ { "input": { "text":"Could you lend me a hand?","target_language":"hi" }, "output_hint":"Hindi translation and notes on polite/formal phrasing." } ],
  "tags":["i18n","translate"]
}

G. SEO / Marketing
Use cases: Generate meta titles/descriptions, social post copy, ad variants.
Example: seo-meta.json\{
  "id":"seo-meta",
  "category":"SEO / Marketing",
  "title":"Meta title & description generator",
  "description":"Create SEO-optimized meta title and meta description given an article and keywords.",
  "input_schema": { "article":"string", "keywords":"string[]" },
  "prompt_template":"Create a meta title (<=60 chars) and meta description (<=155 chars) for the article focused on keywords: {{keywords}}. Article: {{article}}",
  "examples":[ { "input": { "article":"(sustainable fashion article)","keywords":["sustainable fashion","eco-friendly clothes"] }, "output_hint":"Short title and description with keywords." } ],
  "tags":["seo","marketing"]
}

H. Email Outreach
Use cases: Cold outreach, follow-up emails, internal comms.
Example: email-cold.json\{
  "id":"email-cold-outreach",
  "category":"Email",
  "title":"Cold outreach email with follow-up plan",
  "description":"A concise cold email (<=150 words) with a 1-sentence follow-up plan.",
  "input_schema": { "recipient_name":"string", "company":"string", "ask":"string", "tone":"string" },
  "prompt_template":"Write a {{tone}} cold outreach email to {{recipient_name}} at {{company}} making the ask: {{ask}}. Keep under 150 words and include a 1-sentence follow-up plan.",
  "examples":[ { "input": { "recipient_name":"Alex","company":"FinTechCo","ask":"introduce our API","tone":"friendly" }, "output_hint":"Intro, value prop, CTA, follow-up plan." } ],
  "tags":["sales","outreach"]
}

I. Testing / QA
Use cases: Generate test cases, edge-case lists, input validation scenarios.
Example: tests-from-spec.json\{
  "id":"qa-generate-tests",
  "category":"Testing",
  "title":"Generate test cases from feature description",
  "description":"Produce positive and negative test cases with inputs and expected outputs.",
  "input_schema": { "feature_description":"string" },
  "prompt_template":"From the feature description, generate a table of test cases: id, title, steps, input, expected_output, priority.",
  "examples":[ { "input": { "feature_description":"User can reset password via email link" }, "output_hint":"Include expired token, invalid email, success flow." } ],
  "tags":["qa","test-cases"]
}

J. Creative Writing / Content
Use cases: Story prompts, character descriptions, creative expansion with constraints.
Example: creative-story-prompt.json\{
  "id":"creative-expand",
  "category":"Creative Writing",
  "title":"Expand story seed into a short scene",
  "description":"Take a 1-line story seed and write a 300-word scene focused on sensory details and character emotions.",
  "input_schema": { "seed":"string", "length":"short|medium|long" },
  "prompt_template":"Expand the seed '{{seed}}' into a {{length}} scene (approx 300 words for 'short') emphasizing sensory details and internal emotion.",
  "examples":[ { "input": { "seed":"A child finds a hidden door in the attic.","length":"short" }, "output_hint":"Write a vivid 300-word scene focusing on mood and discovery." } ],
  "tags":["creative","story"]
}

--------------------------------------------------------------------------------
7) ADDING NEW PROMPTS & ORGANIZING FILES
Recommended structure:
/prompts
  index.json           # list of prompt filenames and metadata for quick indexing
  conv-support-reply.json
  code-generate-function.json
  ...

When adding a new prompt file:
- Use a unique id and kebab-case filename.
- Add 1–3 examples showing expected inputs and a short output hint.
- Update index.json with metadata to speed UI loading.

--------------------------------------------------------------------------------
8) CONTRIBUTION WORKFLOW & TEMPLATES
Suggested issue template: 'Add a new prompt' that asks for Category, Title, Prompt JSON, Examples, and Rationale.
Suggested PR template: Describe what was added, files changed, and include at least one example test or expected output hint.

Community ask sample (to post as GitHub Discussion or Issue):
Title: "Help expand the JSON Prompting Guide — add examples & patterns"
Body: I built an initial JSON Prompting Guide and web UI. Please help by: Forking the repo, adding prompts under /prompts, and opening PRs with examples.

--------------------------------------------------------------------------------
9) DEPLOYING (QUICK)
Option A — Vercel (fast): Connect the GitHub repo to Vercel and deploy. It will detect React and build automatically.
Option B — GitHub Pages (gh-pages):
# install gh-pages as a dev dependency and add a deploy script to package.json
npm install --save-dev gh-pages
# add to package.json scripts: "predeploy": "npm run build", "deploy": "gh-pages -d dist"
# deploy
npm run build
npm run deploy

--------------------------------------------------------------------------------
10) NEXT STEPS / ROADMAP
- Split prompts into individual JSON files and add index.json.
- Add automated linting and JSON schema validation in CI (GitHub Actions).
- Add examples with model-specified outputs and tests to track drift.
- Create a CONTRIBUTING.md and CODE_OF_CONDUCT.md.

================================================================================
COPYING THIS README OUT
This big comment is appended to src/App.jsx for convenience when previewing. Copy the sections you want into a standalone README.md at the repo root for a cleaner view.

If you want, I can now:
- Create individual prompt JSON files for each example and bundle them into a ZIP for download,
- Generate a ready-to-paste README.md and CONTRIBUTING.md files as separate textdocs,
- Create ISSUE/PR templates as separate files in a .github folder, or
- Produce a GitHub Actions workflow that validates JSON schema on PRs.

Tell me which of the above you'd like next and I'll generate the files directly in the project.

*/


## How to contribute
- Fork the repo
- Add new prompt JSON files under `/prompts` (one file per prompt)
- Update `prompts/index.json` or open a PR and request maintainers to run the index update script
- Follow the PR template and include examples

See `CONTRIBUTING.md` for more details.

## License
MIT
