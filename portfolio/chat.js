// "Ask my agent": answers questions from the write-ups on this page.
// No model is called. A question is matched by keyword against the notes below,
// and the best note is returned with its source section and a trace of the search.
// To swap in a live model later, keep the return shape of ask() and change its body.

export const CONTACT_EMAIL = "samar@betterfound.ai";

export const KNOWLEDGE = [
  {
    id: "about",
    title: "About Samar",
    href: "#top",
    keywords: ["who", "about", "samar", "role", "architect", "background", "focus", "do"],
    answer: "I'm an applied AI architect. I plan, direct and govern multi-agent systems, from the first prompt to a shipped app, with a focus on architecture, evaluation and safe delivery inside an enterprise. Right now I'm building a program board app through my agent factory and preparing for Claude Certified Architect – Foundations.",
  },
  {
    id: "agent-factory",
    title: "Agent factory",
    href: "#agent-factory",
    keywords: ["agent", "factory", "multi", "team", "pipeline", "human", "approve", "approval", "gate", "spec", "release", "planning", "review"],
    answer: "The agent factory turns a plain-language prompt into a working app using specialised agents for planning, building and reviewing. It is partly autonomous: a person approves the spec before build agents start, and approves the release after a review agent checks the build. Each app is also a test of the factory, and lessons feed back into the agents' instructions.",
  },
  {
    id: "a11ycheck",
    title: "A11yCheck",
    href: "#a11ycheck",
    keywords: ["a11ycheck", "accessibility", "a11y", "wcag", "defect", "audit"],
    answer: "A11yCheck is a web app that tests interfaces for accessibility problems, and the first full app the agent factory built end to end. Accessibility has a clear right answer, so quality is measurable: I track detection rate and false alarms against a test set of pages with known defects, across versions.",
  },
  {
    id: "pim",
    title: "Product data quality assistant",
    href: "#pim-assistant",
    keywords: ["pim", "product", "data", "quality", "enterprise", "governance", "duplicate", "sku", "onboarding"],
    answer: "It's a chat assistant for a product information management system in a large enterprise, currently being scoped. It finds data quality problems people check by hand today: duplicates, broken relationships, naming, hierarchy, embargoes and products missing between systems. The assistant proposes fixes and people approve them before anything changes.",
  },
  {
    id: "betterfound-search",
    title: "Betterfound: how one search works",
    href: "#betterfound",
    keywords: ["betterfound", "search", "shopper", "widget", "storefront", "catalogue", "catalog", "merchant", "how", "work", "flow"],
    answer: "A shopper's message arrives with the merchant's signed token. A small model turns it into structured search parameters, the server queries every connected catalogue in parallel and maps results to one product model. If nothing matches it relaxes the search step by step and labels the results as close alternatives. A larger model then streams the reply alongside product cards, and flags a catalogue gap if nothing genuinely fits.",
  },
  {
    id: "betterfound-models",
    title: "Betterfound: two models, two jobs",
    href: "#betterfound",
    keywords: ["betterfound", "model", "haiku", "sonnet", "cost", "latency", "token", "cheap"],
    answer: "Betterfound uses Claude Haiku to plan the search with a forced tool call, and Claude Sonnet to write and stream the answer. Planning is a short structured task, so the cheaper model keeps cost and first-token time down without weakening the reply.",
  },
  {
    id: "betterfound-embeddings",
    title: "Betterfound: testing embeddings",
    href: "#betterfound",
    keywords: ["embedding", "vector", "voyage", "similarity", "cluster", "clustering", "semantic", "spike"],
    answer: "I tested embeddings on real queries before trusting them. They caught typos and near duplicates, but scored two paraphrases of the same intent at only 0.52 similarity. So search grouping moved to Haiku clustering, with a 10-minute cache and a safe fallback. The live catalogue is queried directly; vector search over products is a separate, later track.",
  },
  {
    id: "betterfound-security",
    title: "Betterfound: tenant isolation and limits",
    href: "#betterfound",
    keywords: ["security", "tenant", "isolation", "ssrf", "secure", "safe", "jwt", "token", "permission"],
    answer: "The merchant ID always comes from the signed-in session or the verified widget token, never from the request body, and every analytics query is scoped by it. The page-reading tool only fetches pages on the merchant's own domain, with signed requests and checks against server-side request forgery.",
  },
  {
    id: "heumyn",
    title: "Heumyn AI",
    href: "#heumyn",
    keywords: ["heumyn", "job", "jobs", "cv", "resume", "career", "match", "matching", "scraper"],
    answer: "Heumyn lets people describe the job they want in their own words. It searches job boards and company career pages, scores each role against their CV with reasons, and helps them tailor the CV to the role. A model parses the query into fields that are schema-checked before use.",
  },
  {
    id: "heumyn-mcp",
    title: "Heumyn: MCP first, web second",
    href: "#heumyn",
    keywords: ["mcp", "server", "first", "claude", "code", "subagent", "sub", "tool"],
    answer: "Heumyn started as an MCP server with Claude Code sub-agents for my own job search. Building the tools as MCP first meant I could test them from Claude Code before any UI existed. The web API later reused the same services instead of reimplementing them.",
  },
  {
    id: "heumyn-cost",
    title: "Heumyn: choosing models and cutting cost",
    href: "#heumyn",
    keywords: ["provider", "openai", "anthropic", "local", "prompt", "cost", "cheaper", "routing", "cache", "70"],
    answer: "A provider manager sends each task to Anthropic, OpenAI or a local model, with cheaper models on bulk filtering. The job filter uses a fixed system prompt with job data as JSON, and builds the CV profile once per sync instead of once per job, which cut prompt tokens by about 70%. The list view uses a free rule-based match; paid model analysis runs only when someone opens a role.",
  },
  {
    id: "evaluation",
    title: "Evaluation",
    href: "#capabilities",
    keywords: ["eval", "evaluation", "evals", "test", "measure", "score", "f1", "judge", "regression", "quality"],
    answer: "Every system gets a test set and a quality bar before it's called done. Examples on this page: the F1 score that balances recall, ranking and semantic similarity, the A11yCheck defect test set, and the Betterfound embeddings spike. New model versions are checked against real tasks, not just leaderboards.",
  },
  {
    id: "responsible",
    title: "How I build responsibly",
    href: "#build",
    keywords: ["responsible", "safety", "governance", "oversight", "risk", "injection", "permission", "limit", "trust", "ai", "act"],
    answer: "Three rules: people approve what matters (agents propose, a person applies changes); measure before trusting (test sets and quality bars); and limit what agents can touch (narrowest permissions, planning for prompt injection and data leakage, and a risk record for anything that reaches users).",
  },
  {
    id: "rag",
    title: "Retrieval (RAG)",
    href: "#capabilities",
    keywords: ["rag", "retrieval", "chunking", "rerank", "hybrid"],
    answer: "Retrieval is a developing area for me. Betterfound's catalogue search is the current evidence, and a RAG project with measured retrieval evals is planned for early 2027.",
  },
  {
    id: "learning",
    title: "Learning roadmap",
    href: "#learning",
    keywords: ["learning", "certification", "certified", "aigp", "roadmap", "course", "study", "plan", "next"],
    answer: "Oct–Dec 2026: Claude Certified Architect – Foundations. Jan–Mar 2027: evals, tracing and agent security, plus a RAG project. Apr–Jun 2027: AIGP, then Certified AI Programme Manager. Jul–Sep 2027: Google AI Professional, then Claude Certified Architect – Professional.",
  },
  {
    id: "stack",
    title: "Tools I use",
    href: "#community",
    keywords: ["stack", "tool", "tools", "framework", "nextjs", "react", "postgres", "vercel", "railway", "use", "tech"],
    answer: "Models: Claude, GPT, Gemini, Llama, Mistral, DeepSeek. Building: Claude Code, the Anthropic, OpenAI and Vercel AI SDKs, Cursor, MCP, Next.js and React. Data: Postgres, Redis, Supabase, pgvector, Voyage AI, Hugging Face and n8n. Shipping: Railway, Vercel and Stripe.",
  },
  {
    id: "projects",
    title: "Projects",
    href: "#projects",
    keywords: ["project", "projects", "tokenchain", "figma", "dashboard", "hypergigs", "glossary", "build", "built", "app", "apps"],
    answer: "Beyond the case studies: Tokenchain (a design token visualiser), a Figma MCP proof of concept, Claude Code skills for code review, an F1 evaluation score, an AI glossary, a Design System Dashboard and Hypergigs (both in build). It's part of a goal to ship 15 AI apps.",
  },
  {
    id: "talks",
    title: "Talks and community",
    href: "#community",
    keywords: ["talk", "talks", "speaker", "speaking", "vibe", "coding", "designer", "community", "design", "system"],
    answer: "I speak on AI for design systems teams at Into Design Systems, including a talk on vibe coding for designers: thinking in agentic loops, shaping intent and shipping with confidence.",
  },
  {
    id: "contact",
    title: "Contact",
    href: "#contact",
    keywords: ["contact", "email", "hire", "reach", "linkedin", "touch", "talk", "available", "work"],
    answer: `Email me at ${CONTACT_EMAIL} or find me on LinkedIn. I'm happy to compare notes on multi-agent architecture, evaluation or AI governance.`,
  },
];

const STOPWORDS = new Set(
  "a an and are as at be but by can could did do does for from had has have how i if in into is it its me my of on or our so that the their them then there these they this to us was we what when where which who why will with would you your about tell".split(" ")
);

function stem(word) {
  return word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word;
}

export function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w && !STOPWORDS.has(w))
    .map(stem);
}

const INDEX = KNOWLEDGE.map((entry) => ({
  entry,
  keywords: new Set(entry.keywords.map(stem)),
  title: new Set(tokenize(entry.title)),
  body: new Set(tokenize(entry.answer)),
}));

function score(item, words) {
  let total = 0;
  let strong = 0;
  for (const w of words) {
    if (item.keywords.has(w)) { total += 3; strong++; }
    else if (item.title.has(w)) { total += 2; strong++; }
    else if (item.body.has(w)) total += 0.5;
  }
  return strong ? total : 0;
}

export function ask(question) {
  const words = tokenize(question);
  if (!words.length) {
    return { matched: false, answer: "Type a question about my work, for example how Betterfound plans a search.", sources: [], trace: [] };
  }

  const ranked = INDEX.map((item) => ({ item, s: score(item, words) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);

  const trace = [{ tool: "notes.search", detail: `"${words.join(" ")}" → ${ranked.length} ${ranked.length === 1 ? "match" : "matches"}` }];

  if (!ranked.length) {
    trace.push({ tool: "answer.fallback", detail: "no note covers this" });
    return {
      matched: false,
      answer: `I don't have notes on that here. I can answer questions about the case studies, architecture, projects and how I build. For anything else, email ${CONTACT_EMAIL}.`,
      sources: [],
      trace,
    };
  }

  const best = ranked[0].item.entry;
  trace.push({ tool: "notes.read", detail: `${best.id} (${best.href})` });
  return {
    matched: true,
    answer: best.answer,
    sources: [{ title: best.title, href: best.href }],
    trace,
  };
}
