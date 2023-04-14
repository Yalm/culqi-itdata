import { MaximumYear } from './maximum-year.constraint';

describe('MaximumYear', () => {
  const constraint = new MaximumYear();

  it('should return false when older than 5', () => {
    expect(constraint.validate('2029')).toBe(false);
  });

  it('should return true when less than 5 years old', () => {
    expect(constraint.validate('2026')).toBe(true);
  });
});
