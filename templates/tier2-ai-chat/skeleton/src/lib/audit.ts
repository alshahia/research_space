// src/lib/audit.ts — Tier 2 ai-chat skeleton
// Kind-agnostic audit log: logCreate / logUpdate / logDelete. The storage sink
// is provided by the DatabaseProvider context; the spine ships a console-fallback
// stub. Replace via tier2-saas-bundle's DB layer command.
//
// Inherits tier1-standard's audit pattern verbatim — no behavioral change for
// tier2. Path A and Path B chat writes both route through logCreate / logUpdate
// so the audit shape is identical across paths.
//
// Origin: resources/_archived/general-app-template/APP_ARCHITECTURE_GUIDE.md:566-588
// (recovered per 06_TEMPLATE_AUDIT.md Part 2; rewritten here as generic, not
// WatermelonDB-coupled).

export type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export interface AuditSink {
  write(entry: AuditEntry): Promise<void>;
}

export interface AuditEntry {
  entityType: string;
  entityId: string;
  action: AuditAction;
  changes?: string | undefined;
  userId: string;
  at: string;
}

// ponytail: console sink is fine for the spine; tier2 swaps in a Drizzle-backed
// sink. The shape is the contract; the implementation is swappable.
export const consoleAuditSink: AuditSink = {
  async write(entry) {
    // eslint-disable-next-line no-console
    console.log("[audit]", entry.action, entry.entityType, entry.entityId, entry.userId);
  },
};

// ponytail: in-memory sink for tests. Reset between tests via setSink(null).
const memEntries: AuditEntry[] = [];
let activeSink: AuditSink | null = null;

export function setSink(sink: AuditSink | null): void {
  activeSink = sink;
}

export function getSink(): AuditSink {
  return activeSink ?? consoleAuditSink;
}

export async function logAudit(
  entityType: string,
  entityId: string,
  action: AuditAction,
  changes?: string,
): Promise<void> {
  try {
    await getSink().write({
      entityType,
      entityId,
      action,
      changes,
      userId: "system",
      at: new Date().toISOString(),
    });
  } catch (e) {
    // ponytail: never let audit failure block the main write. Log to stderr.
    // eslint-disable-next-line no-console
    console.error("audit log failed:", e);
  }
}

export async function logCreate(entityType: string, entityId: string): Promise<void> {
  await logAudit(entityType, entityId, "CREATE");
}

export async function logUpdate(
  entityType: string,
  entityId: string,
  changes: string,
): Promise<void> {
  await logAudit(entityType, entityId, "UPDATE", changes);
}

export async function logDelete(entityType: string, entityId: string): Promise<void> {
  await logAudit(entityType, entityId, "DELETE");
}

// ponytail: exported for tests. The test resets the in-memory list between cases.
export function _memEntriesForTest(): readonly AuditEntry[] {
  return memEntries;
}
