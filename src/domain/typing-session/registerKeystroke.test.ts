import { expect, test } from 'vitest';
import { registerKeystroke } from './registerKeystroke.ts';

test('should_mark_char_as_correct_when_matches_target_text', () => {
  const session = {
    targetText: 'Hello, world!',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };

  const result = registerKeystroke(session, 'H', 1);
  expect(result).toEqual({
    ...session,
    startedAt: 1,
    typedChars: [{ expected: 'H', actual: 'H', correct: true, timestamp: 1 }],
  });
});

test('should_mark_char_as_incorrect_when_differs_from_target_text', () => {
  const session = {
    targetText: 'Hello, world!',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };
  const result = registerKeystroke(session, 'X', 1);

  expect(result).toEqual({
    ...session,
    startedAt: 1,
    typedChars: [{ expected: 'H', actual: 'X', correct: false, timestamp: 1 }],
  });
});

test('should_not_mutate_original_session', () => {
  const sessionOriginal = {
    targetText: 'Hello, world!',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };
  const result = registerKeystroke(sessionOriginal, 'H', 1);
  expect(sessionOriginal.typedChars).toEqual([]);
  expect(result).not.toBe(sessionOriginal);
  expect(sessionOriginal.startedAt).toBeNull();
});
