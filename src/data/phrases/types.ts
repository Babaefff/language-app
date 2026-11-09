/** A fixed expression whose words don't add up to its meaning ("Mir geht es gut" = I'm fine). */
export interface Phrase {
  /** Regular expression (case-insensitive) that finds the phrase in a sentence. */
  re: string;
  /** The phrase as you'd learn it. */
  phrase: string;
  /** What it means. */
  en: string;
  /** Word for word, so the parts make sense. */
  literal: string;
  /** Why it is said this way, and the mistake to avoid. */
  note: string;
}
