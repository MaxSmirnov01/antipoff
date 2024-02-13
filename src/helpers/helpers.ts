import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// оффициальный костыль из доки
export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const isErrorWithMessage = (error: unknown): error is { message: string } => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
};
