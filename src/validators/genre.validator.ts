const regEx = /^[0-9,]+$/;

const validate = (genre: string): boolean => {
  const splitGenre = genre.split('');
  const splitGenreNumber = genre.split(',');

  if (genre.match(regEx)) {
    for (let i = 0; i <= splitGenre.length; i++) {
      if (splitGenre[i] === splitGenre[i - 1] && splitGenre[i] === ',') return false;
    }

    for (let i = 0; i < splitGenreNumber.length; i++) {
      if (splitGenreNumber[i].length < 2 || splitGenreNumber[i].split('')[0] === '0') {
        return false;
      } else return true;
    }
    return true;
  } else {
    return false;
  }
};

export { validate };
