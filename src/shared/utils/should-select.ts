export const SEEDING_CONFIG = {
  SUGGESTION_COUNT: 10,
  SELECTION_PROBABILITY: 0.3,
};

export function shouldSelect(): boolean {
  return Math.random() < SEEDING_CONFIG.SELECTION_PROBABILITY;
}
