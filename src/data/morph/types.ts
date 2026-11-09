/** How words of a language are built, to explain a word by its parts (Brief + Träger). */
export interface Morphology {
  /**
   * Prefixes that keep a clear meaning: [form, meaning, cues]. With cues, the word's English
   * must start with or contain one of them (impoli = impolite ✓, importer = to import ✗).
   */
  prefixes: [string, string, string[]?][];
  /**
   * Endings that keep a clear meaning: [form, meaning, what they make, what they attach to, cues].
   * "verb": the base must be a verb (chant-eur ← chanter); "adj": an adjective; cues as above.
   */
  suffixes: [string, string, ('noun' | 'adj')?, ('verb' | 'adj' | 'any')?, string[]?][];
  /** Words that look split-able but aren't built that way (Zeitung ≠ Zeit + -ung). */
  noSplit?: string[];
  /** Parts that aren't course words on their own (or need a better meaning in compounds). */
  parts: Record<string, string>;
  /** Hand-written breakdowns, which win over the automatic ones: word → "part|meaning + part|meaning". */
  overrides: Record<string, string>;
  /** German: nouns are compounded freely (Brief + Träger), with linking letters (Geburt-s-tag). */
  compounds?: { links: string[] };
}
