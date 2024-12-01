import axios from 'axios';
import {
  DEFAULT_MESSAGE,
  CANCELED_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  LoadingStatus,
  loadData,
  getSuccessState,
  getErrorState,
  getIdleState,
  getLoadingState,
} from '../load-data';
import { addNetworkError, addNotFoundError, addServerDelay } from '../../../tests/msw/msw-utils';
import { server } from '../../../tests/msw/server';

describe('getIdleState', () => {
  test('should return an object describing the idle state', () => {
    const expected = { status: LoadingStatus.idle, data: null, error: null };

    expect(getIdleState()).toEqual(expected);
  });
});

describe('getLoadingState', () => {
  test('should return an object describing the loading state', () => {
    const expected = { status: LoadingStatus.loading, data: null, error: null };

    expect(getLoadingState()).toEqual(expected);
  });
});

describe('getSuccessState', () => {
  test('should return an object describing the successful state', () => {
    const data = { result: 'done' };
    const expected = { status: LoadingStatus.success, data, error: null };

    expect(getSuccessState(data)).toEqual(expected);
  });
});

describe('getErrorState', () => {
  test('should return an object describing the erroneous state', () => {
    const error = 'error';
    const expected = { status: LoadingStatus.error, data: null, error };

    expect(getErrorState(error)).toEqual(expected);
  });
});

describe('loadData', () => {
  describe('when fetch is successful', () => {
    test('should return a successful state with data', async () => {
      const data = { result: 'done' };
      const requestFunction = () => Promise.resolve(data);

      const result = await loadData(requestFunction);

      expect(result).toEqual({
        status: LoadingStatus.success,
        data,
        error: null,
      });
    });
  });

  describe('when fetch is canceled', () => {
    test('should return erroneous state with error message', async () => {
      addServerDelay(server);
      const requestFunction = async () => {
        const controller = new AbortController();
        setTimeout(() => controller.abort());
        return axios.get('url', {
          signal: controller.signal,
        });
      };

      const result = await loadData(requestFunction);

      expect(result).toEqual({
        status: LoadingStatus.error,
        data: null,
        error: CANCELED_REQUEST_MESSAGE,
      });
    });
  });

  describe('when status 404 is received', () => {
    test('should return erroneous state with error message', async () => {
      addNotFoundError(server);
      const requestFunction = async () => {
        return axios.get('url');
      };

      const result = await loadData(requestFunction);

      expect(result).toEqual({
        status: LoadingStatus.error,
        data: null,
        error: NOT_FOUND_MESSAGE,
      });
    });
  });

  describe('when an axios error occurred', () => {
    test('should return erroneous state with error message', async () => {
      addNetworkError(server);
      const requestFunction = async () => {
        return axios.get('url');
      };

      const result = await loadData(requestFunction);

      expect(result).toEqual({
        status: LoadingStatus.error,
        data: null,
        error: expect.any(String),
      });
    });
  });

  describe('when an error occurred', () => {
    test('should return erroneous state with error message', async () => {
      const errorMessage = 'Something went wrong';

      const requestFunction = async () => {
        throw new Error(errorMessage);
      };

      const result = await loadData(requestFunction);

      expect(result).toEqual({
        status: LoadingStatus.error,
        data: null,
        error: errorMessage,
      });
    });
  });

  describe('when not an error was thrown in request function', () => {
    test('should return erroneous state with error message', async () => {
      const requestFunction = async () => {
        throw 1;
      };

      const result = await loadData(requestFunction);

      expect(result).toEqual({
        status: LoadingStatus.error,
        data: null,
        error: DEFAULT_MESSAGE,
      });
    });
  });
});
