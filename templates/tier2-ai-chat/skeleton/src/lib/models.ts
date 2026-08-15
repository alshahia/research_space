// src/lib/models.ts — Tier 2 ai-chat skeleton (Path A provider registry)
//
// Single source of truth for Path A model resolution. The caller passes a
// `modelFamily` string (from `tier.config.json` or a runtime override) and gets
// back a `LanguageModel` ready for `streamText({ model })`.
//
// Path B does NOT use this file; it talks to OpenCode via `src/lib/opencode.ts`.
// See `SKILL.md` §Dual-path setup for the rationale.
//
// ponytail: one switch + four small factories. No plugin system, no config
// wrapper, no per-family config schema. The families are the four documented in
// `04_opencode_research_T-2026-08-14-001.md` §6 + the openai-compat pattern for
// MiniMax.
//
// Default model IDs are pinned to specific versions per the dossier
// (`02_STACK_MATRIX.md` tier2-ai-chat block). Re-verify at scaffold time.

import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export type ModelFamily = "google" | "anthropic" | "openai" | "minimax";

export interface ModelConfig {
  family: ModelFamily;
  /** Default model id for the family. Overridable via `getModel(family, overrideId)`. */
  defaultModelId: string;
}

// ponytail: literal table; no need for a config file. Re-verify at scaffold.
const MODEL_CONFIG: Readonly<Record<ModelFamily, ModelConfig>> = Object.freeze({
  google: { family: "google", defaultModelId: "gemini-2.5-flash" },
  anthropic: { family: "anthropic", defaultModelId: "claude-sonnet-4-6" },
  openai: { family: "openai", defaultModelId: "gpt-5.6" },
  minimax: { family: "minimax", defaultModelId: "MiniMax-M3" },
});

/**
 * Resolve a `LanguageModel` for the given family.
 *
 * @param family - One of `"google" | "anthropic" | "openai" | "minimax"`.
 * @param overrideModelId - Optional override for the default model id. Useful
 *   when the user wants `gemini-2.5-pro` instead of `gemini-2.5-flash` without
 *   editing this file.
 * @returns A `LanguageModel` instance ready for `streamText({ model })`.
 *
 * Throws if the matching env var is not set (e.g. `GOOGLE_API_KEY` for
 * `family: "google"`). The smoke test calls this with the env var missing to
 * assert the helpful error message — see `tests/opencode-bridge.test.ts` for
 * the pattern.
 */
export function getModel(family: ModelFamily, overrideModelId?: string): LanguageModel {
  const config = MODEL_CONFIG[family];
  if (!config) {
    throw new Error(
      `Unknown modelFamily: ${family}. Valid: ${Object.keys(MODEL_CONFIG).join(", ")}`,
    );
  }
  const modelId = overrideModelId ?? config.defaultModelId;

  switch (family) {
    case "google": {
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) throw new Error("GOOGLE_API_KEY is required for modelFamily=google.");
      return createGoogleGenerativeAI({ apiKey })(modelId);
    }
    case "anthropic": {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error("ANTHROPIC_API_KEY is required for modelFamily=anthropic.");
      return createAnthropic({ apiKey })(modelId);
    }
    case "openai": {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OPENAI_API_KEY is required for modelFamily=openai.");
      return createOpenAI({ apiKey })(modelId);
    }
    case "minimax": {
      // ponytail: MiniMax exposes an OpenAI-compatible endpoint, so we use the
      // OpenAI provider with a custom `baseURL`. The default baseURL is pinned
      // to MiniMax's public endpoint; override via `MiniMax_BASE_URL` if the
      // vendor rotates it.
      const apiKey = process.env.MiniMax_API_KEY;
      if (!apiKey) throw new Error("MiniMax_API_KEY is required for modelFamily=minimax.");
      const baseURL = process.env.MiniMax_BASE_URL ?? "https://api.minimaxi.com/v1";
      return createOpenAI({ apiKey, baseURL })(modelId);
    }
    default: {
      // ponytail: exhaustive switch. The `Record` lookup above already
      // narrows; this branch is for the type checker's benefit.
      const _exhaustive: never = family;
      throw new Error(`Unhandled modelFamily: ${String(_exhaustive)}`);
    }
  }
}

/**
 * List all known model families + their default model ids.
 * Used by the intake UI to populate the model switcher.
 */
export function listModelFamilies(): readonly ModelConfig[] {
  return Object.values(MODEL_CONFIG);
}

/**
 * Convenience: the default family used by the spine.
 * Matches `tier.config.json` `modelFamily` default.
 */
export const DEFAULT_MODEL_FAMILY: ModelFamily = "google";
