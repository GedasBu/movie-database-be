import express from 'express';

import * as sortOptions from '../services/sort-option.service';

const getSortOptions = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    res.json(await sortOptions.getSortOptions());
  } catch (err) {
    next(err);
  }
};

export default getSortOptions;
