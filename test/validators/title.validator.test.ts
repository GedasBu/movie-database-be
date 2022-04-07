import { validate } from '../../src/validators/title.validator';

describe('Title Validator', () => {
  it('should be valid', () => {
    const result = validate('Abc-031');

    expect(result).toBe(true);
  });

  it('should be invalid', () => {
    const result = validate('Abc---033');

    expect(result).toBe(false);
  });

  it('should be invalid', () => {
    const result = validate('    Abcde06');

    expect(result).toBe(false);
  });

  it('should be invalid', () => {
    const result = validate('*movie');

    expect(result).toBe(false);
  });

  it('should be valid', () => {
    const result = validate('Black hawk down');

    expect(result).toBe(true);
  });

  it('should be valid', () => {
    const result = validate('Black-hawk.down');

    expect(result).toBe(true);
  });
});
