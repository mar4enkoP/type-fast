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

test('should_keep_position_after_incorrect_input', () => {
  const session = {
    targetText: 'Hello, world!',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };
  const result = registerKeystroke(session, 'D', 1);
  const result2 = registerKeystroke(result, 'H', 2);
  expect(result2.typedChars[1]).toEqual({
    expected: 'H',
    actual: 'H',
    correct: true,
    timestamp: 2,
  });
  expect(result2.typedChars).toHaveLength(2);
});

test('should_advance_position_after_correct_input', () => {
  const session = {
    targetText: 'Hello, world!',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };
  const result = registerKeystroke(session, 'H', 1);
  const result2 = registerKeystroke(result, 'e', 2);
  expect(result2.typedChars[1]).toEqual({
    expected: 'e',
    actual: 'e',
    correct: true,
    timestamp: 2,
  });
  expect(result2.typedChars).toHaveLength(2);
  expect(result2.startedAt).toBe(1);
});

test('should_complete_session_after_last_correct_input', () => {
  const session = {
    targetText: 'H',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };

  const result = registerKeystroke(session, 'H', 1);
  expect(result.completedAt).toBe(1);
});

test('should_not_complete_session_after_incorrect_input', () => {
  const session = {
    targetText: 'H',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };

  const result = registerKeystroke(session, 'X', 1);
  expect(result.completedAt).toBeNull();
});

test('should_ignore_input_after_session_completion', () => {
  const session = {
    targetText: 'H',
    typedChars: [],
    startedAt: null,
    completedAt: null,
  };
  const result = registerKeystroke(session, 'H', 1);
  expect(result.typedChars).toEqual([{ expected: 'H', actual: 'H', correct: true, timestamp: 1 }]);
  const result2 = registerKeystroke(result, 'X', 2);
  expect(result2).toEqual(result);
});
