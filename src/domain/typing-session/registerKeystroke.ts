import type { TypingSession } from './TypingSession.ts';

export function registerKeystroke(
  session: TypingSession,
  char: string,
  timestamp: number
): TypingSession {
  const typedCharIndex = session.typedChars.length;
  const expected = session.targetText[typedCharIndex];
  if (expected === undefined) return session;
  const startedAt = session.startedAt ?? timestamp;
  const correct = expected === char;
  return {
    ...session,
    typedChars: [...session.typedChars, { expected, actual: char, correct, timestamp }],
    startedAt,
  };
}
