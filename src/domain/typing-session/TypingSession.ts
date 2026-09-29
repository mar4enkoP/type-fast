export interface TypedChar {
  expected: string;
  actual: string;
  correct: boolean;
  timestamp: number;
}

export interface TypingSession {
  readonly targetText: string;
  readonly typedChars: readonly TypedChar[];
  readonly startedAt: number | null;
  readonly completedAt: number | null;
}

export function createTypingSession(targetText: string): TypingSession {
  return {
    targetText,
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };
}
