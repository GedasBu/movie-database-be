const chasters = /^[0-9a-zA-Z. -]+$/;

const validate = (title: string): boolean => {
  const splitTitle = title.split('');

  if (title.match(chasters)) {
    for (let i = 0; i <= splitTitle.length; i++) {
      if (splitTitle[i] === splitTitle[i - 1]) return false;
    }
    return true;
  } else {
    return false;
  }
};

export { validate };
