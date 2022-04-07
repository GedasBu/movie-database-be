import { getSortOptions } from '../services/sort-option.service';

const validate = (sort: string): boolean => {
  const sortOption = getSortOptions();

  for (let i = 0; i < sortOption.length; i++) {
    if (sort === sortOption[i].code) {
      return true;
    }
  }
  return false;
};

export { validate };
