import type { TypingSession } from './TypingSession.ts';

export function registerKeystroke(
  session: TypingSession,
  char: string,
  timestamp: number
): TypingSession {
  const typedCharIndex = session.typedChars.filter((typedChar) => typedChar.correct).length;
  const expected = session.targetText[typedCharIndex];
  if (expected === undefined) return session;
  const startedAt = session.startedAt ?? timestamp;
  const correct = expected === char;
  const isFinished = typedCharIndex === session.targetText.length - 1 && correct;
  const completedAt = isFinished ? timestamp : session.completedAt;
  return {
    ...session,
    typedChars: [...session.typedChars, { expected, actual: char, correct, timestamp }],
    startedAt,
    completedAt,
  };
}
