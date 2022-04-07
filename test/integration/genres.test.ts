import axios from 'axios';
import httpStatus from 'http-status';
import supertest from 'supertest';

import app from '../../src/app';

jest.mock('axios');
const mockedAxios = axios.get as jest.Mock;

const mockedGenres = {
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
  ],
};

describe('Genre API', () => {
  const request = supertest(app);

  describe('GET /genres', () => {
    it('should return list of genres with cache enabled', (done) => {
      mockedAxios.mockResolvedValue({
        data: mockedGenres,
      });

      request
        .get('/genres')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toEqual(mockedGenres);
          expect(axios.get).toHaveBeenCalledTimes(1);

          request
            .get('/genres')
            .expect(httpStatus.OK)
            .then((res2) => {
              expect(res2.body).toEqual(mockedGenres);
              expect(axios.get).toHaveBeenCalledTimes(1);
              done();
            })
            .catch(done);
        })
        .catch(done);
    });
  });
});
