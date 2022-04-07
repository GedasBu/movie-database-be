import axios from 'axios';
import httpStatus from 'http-status';
import supertest from 'supertest';

import app from '../../src/app';
import { mockedTMDBResponse, expectedResult } from './data';

jest.mock('axios');
const mockedAxios = axios.get as jest.Mock;

describe('Movies sort API', () => {
  const request = supertest(app);

  it('should return list of sorted movies by titile', (done) => {
    mockedAxios.mockResolvedValue({ data: mockedTMDBResponse });

    request
      .get('/movies')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual(expectedResult);
        expect(axios.get).toHaveBeenCalledTimes(1);

        request
          .get('/movies')
          .expect(httpStatus.OK)
          .then((res2) => {
            expect(res2.body).toEqual(expectedResult);
            expect(axios.get).toHaveBeenCalledTimes(1);

            request
              .get('/movies/?sort=original_title.asc')
              .expect(httpStatus.OK)
              .then((res3) => {
                expect(res3.body).toEqual(expectedResult);
                expect(axios.get).toHaveBeenCalledTimes(2);
                done();
              })
              .catch(done);
          })
          .catch(done);
      })
      .catch(done);
  });
});
