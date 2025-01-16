import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export const getFetchBaseQueryErrorMsg = (err: unknown): string => {
  let errMsg = 'Unexpected error';

  if (isFetchBaseQueryError(err)) {
    errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
  } else if (isErrorWithMessage(err)) {
    errMsg = err.message;
  }

  return errMsg;
};
