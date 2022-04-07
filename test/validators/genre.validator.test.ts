import { validate } from '../../src/validators/genre.validator';

describe('Genre validator', () => {
  it('should be valid', () => {
    const result = validate('14,');

    expect(result).toBe(true);
  });

  it('should be invalid', () => {
    const result = validate('14-');

    expect(result).toBe(false);
  });

  it('should be invalid', () => {
    const result = validate('1,&5');

    expect(result).toBe(false);
  });

  it('should be invalid', () => {
    const result = validate('5, 4');

    expect(result).toBe(false);
  });

  it('should be invalid', () => {
    const result = validate('0');

    expect(result).toBe(false);
  });

  it('should be invalid', () => {
    const result = validate('4!');

    expect(result).toBe(false);
  });
});
