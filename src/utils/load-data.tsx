import { isAxiosError } from 'axios';

export const DEFAULT_MESSAGE = 'Unexpected error';
export const CANCELED_REQUEST_MESSAGE = 'Request was canceled';
export const NO_DATA_MESSAGE = 'No data was received from the server';
export const NOT_FOUND_MESSAGE = 'The requested page was not found';

export type IdleState = { status: LoadingStatus.idle; data: null; error: null };
export type LoadingState = { status: LoadingStatus.loading; data: null; error: null };
export type ErrorState = { status: LoadingStatus.error; data: null; error: string };

export type SuccessState<DataType> = {
  status: LoadingStatus.success;
  data: DataType;
  error: null;
};

export type LoaderState<DataType> = IdleState | SuccessState<DataType> | ErrorState | LoadingState;

export enum LoadingStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export function getIdleState(): IdleState {
  return { status: LoadingStatus.idle, data: null, error: null };
}

export function getLoadingState(): LoadingState {
  return { status: LoadingStatus.loading, data: null, error: null };
}

export function getSuccessState<DataType>(data: DataType): SuccessState<DataType> {
  return {
    status: LoadingStatus.success,
    data,
    error: null,
  };
}

export function getErrorState(error: string): ErrorState {
  return { status: LoadingStatus.error, data: null, error };
}

export async function loadData<DataType>(
  requestFunction: () => Promise<DataType>
): Promise<SuccessState<DataType> | ErrorState> {
  let fetchState;

  try {
    const data = await requestFunction();
    if (!data) throw new Error(NO_DATA_MESSAGE);
    fetchState = getSuccessState(data);
  } catch (e) {
    let message = DEFAULT_MESSAGE;

    if (e instanceof Error) {
      if (isAxiosError(e)) {
        if (e.code === 'ERR_CANCELED') {
          message = CANCELED_REQUEST_MESSAGE;
        }
        if (e.status === 404) {
          message = NOT_FOUND_MESSAGE;
        }
      } else {
        message = e.message;
      }
    }

    fetchState = getErrorState(message);
  }

  return fetchState;
}
