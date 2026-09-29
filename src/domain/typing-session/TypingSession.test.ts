import { createTypingSession } from './TypingSession.ts';
import { expect, test } from 'vitest';

test('should_create_session_with_empty_state_when_given_target_text', () => {
  const targetText = 'Hello, world!';
  const session = createTypingSession(targetText);
  expect(session).toEqual({
    targetText,
    typedChars: [],
    startedAt: null,
    completedAt: null,
  });
});
