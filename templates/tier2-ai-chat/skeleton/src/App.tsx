// src/App.tsx — Tier 2 ai-chat skeleton
//
// Chat preview screen. Renders:
//   - h1 with the title from `tier.config.json`.
//   - Locale + dir from `tier.config.json`.
//   - Active path indicator (Path A / Path B) + the chosen model family.
//   - Two seed messages: a user bubble and an assistant bubble with markdown
//     content (so the smoke test can assert the "text-delta chunk + user/assistant
//     bubble rendered for Path A" criterion from `01_RECOMMENDED_DESIGN.md`
//     Decision 6 ai-chat row).
//
// The seed messages are inline (not loaded from a backend). Production builds
// wire `@ai-sdk/react`'s `useChat` hook to a `/api/chat` route handler and pass
// the live stream through. The spine ships the shape, not the live wire.
//
// Mirrors tier1-standard's `<App />` shape (h1 + locale text + cn() helper) +
// the Tier 2 chat-specific extras (path indicator, message bubbles).
import tierConfig from "../tier.config.json";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "./lib/utils";

interface SeedMessage {
  role: "user" | "assistant";
  content: string;
}

const SEED_MESSAGES: readonly SeedMessage[] = Object.freeze([
  { role: "user", content: "Hello! Can you show me a markdown example with code?" },
  {
    role: "assistant",
    content:
      "Sure — here's a tiny snippet:\n\n```ts\nfunction greet(name: string) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet(\"world\"));\n```\n\nPath A renders this as a text-delta stream; Path B returns the agent's full reply.",
  },
]);

export function App(): React.ReactElement {
  const isPathB = tierConfig.modelPath === "opencode";
  const familyLabel = isPathB ? "opencode-default" : tierConfig.modelFamily;

  return (
    <main className={cn("min-h-screen", "flex flex-col items-center justify-center", "p-8", "max-w-3xl", "mx-auto")}>
      <h1 className="text-4xl font-semibold tracking-tight">{tierConfig.title}</h1>
      <p className="mt-4 text-base text-neutral-600">
        Tier 2 AI chat spine — dual-path AI SDK (Path A: Vercel AI SDK direct, Path B: OpenCode SDK bridge).
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        Locale: {tierConfig.locale} ({tierConfig.dir})
      </p>
      <p className="mt-2 text-sm text-neutral-500" data-testid="path-indicator">
        Path: {isPathB ? "B (opencode)" : "A (direct)"} · Model family: {familyLabel}
      </p>

      <section className="mt-8 w-full flex flex-col gap-3" data-testid="chat-thread">
        {SEED_MESSAGES.map((m, i) => (
          <article
            key={i}
            data-testid={`bubble-${m.role}`}
            className={cn(
              "rounded-lg",
              "p-4",
              "max-w-[85%]",
              m.role === "user"
                ? "self-end bg-[var(--color-user-bubble)] text-[var(--color-user-bubble-fg)]"
                : "self-start border border-neutral-200 bg-[var(--color-assistant-bubble)] text-[var(--color-assistant-bubble-fg)]",
            )}
          >
            {m.role === "assistant" ? (
              <div className="bubble-prose" data-text-delta-chunk="true">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p>{m.content}</p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
