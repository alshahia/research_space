// src/db/DatabaseProvider.tsx — Tier 2 ai-chat skeleton
// ponytail: storage-adapter pattern. The provider exposes a sink seam; the spine
// ships a no-op stub. Tier2-saas-bundle wires Drizzle + Postgres here.
//
// FUTURE EXTENSION (out of scope for this dispatch — documented for tier2-saas-bundle):
// Add a `messages` table with `session_id: text` column for Path B continuity.
// Path A rows leave `session_id` NULL; Path B rows store the OpenCode session ID
// so the bridge can resume the conversation.
//
// Example schema (target shape):
//   interface Message {
//     id: string;
//     conversationId: string;
//     role: "user" | "assistant";
//     content: string;
//     sessionId: string | null;   // Path B: OpenCode session ID for resume.
//     modelFamily: string;        // "google" | "anthropic" | "openai" | "minimax" | "opencode-default"
//     modelPath: string;          // "direct" | "opencode"
//     createdAt: string;
//   }
//
// tier2-saas-bundle applies the corresponding drizzle-kit migration.
//
// Inherits tier1-standard's stub verbatim.
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { consoleAuditSink, type AuditSink } from "../lib/audit";

export interface DatabaseAdapter {
  // ponytail: storage-adapter interface. Concrete impls (Drizzle, WatermelonDB
  // opt-in, in-memory test) implement this. The spine ships the in-memory stub.
  write<T>(table: string, row: T): Promise<{ id: string }>;
  read<T>(table: string, id: string): Promise<T | null>;
  list<T>(table: string): Promise<T[]>;
}

export interface DatabaseContextValue {
  adapter: DatabaseAdapter;
  audit: AuditSink;
}

const defaultValue: DatabaseContextValue = {
  // ponytail: in-memory stub for the spine. No network, no Drizzle. Tier2 swaps
  // in the real adapter.
  adapter: {
    async write() {
      return { id: crypto.randomUUID() };
    },
    async read() {
      return null;
    },
    async list() {
      return [];
    },
  },
  audit: consoleAuditSink,
};

const DatabaseContext = createContext<DatabaseContextValue>(defaultValue);

export interface DatabaseProviderProps {
  children: ReactNode;
  adapter?: DatabaseAdapter;
  audit?: AuditSink;
}

export function DatabaseProvider({
  children,
  adapter,
  audit,
}: DatabaseProviderProps): ReactNode {
  const value = useMemo<DatabaseContextValue>(
    () => ({ adapter: adapter ?? defaultValue.adapter, audit: audit ?? defaultValue.audit }),
    [adapter, audit],
  );
  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}

export function useDatabase(): DatabaseContextValue {
  return useContext(DatabaseContext);
}
