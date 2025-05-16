import type { ReactNode } from 'react';

import { consola, type LogType } from 'consola';
import { type ExternalToast, toast as sonnerToast } from 'sonner';

import type { AnyValue } from '../types';

export type LogLevel = LogType;

// Type for the object returned by log methods, enabling chaining
interface LogResult {
  toast: (message?: string | ReactNode, options?: ExternalToast) => void;
}

// Error Reporter Helper
function reportErrorToSentry(
  _level: LogLevel,
  _message: string,
  _optionalParams: AnyValue[],
): void {
  // report to sentry or maybe log rocket
}

function logInternal(level: LogLevel, message: string, optionalParams: AnyValue[]): void {
  const logFn = consola[level] || console.log;

  try {
    logFn(message, ...optionalParams);
  } catch (logError) {
    console.error('Custom logger failed:', logError);
    console.error('Original log:', { level, message, optionalParams });
  }

  reportErrorToSentry(level, message, optionalParams);
}

function createLogMethod(level: LogLevel) {
  return (message: string, ...optionalParams: AnyValue[]): LogResult => {
    // Perform the core logging action
    logInternal(level, message, optionalParams);

    // Return object for chaining, conditionally adding .toast
    const result: LogResult = { toast: () => null };

    result.toast = (toastMessage?: string | ReactNode, options?: ExternalToast): void => {
      try {
        // Use the provided toast message, or fallback to the original log message
        const displayMessage = toastMessage ?? message;

        // Map log level to sonner toast type (optional, customize as needed)
        switch (level) {
          case 'error':
          case 'fatal':
            sonnerToast.error(displayMessage, options);
            break;
          case 'warn':
            sonnerToast.warning(displayMessage, options);
            break;
          case 'info':
            sonnerToast.info(displayMessage, options);
            break;
          case 'success':
            sonnerToast.success(displayMessage, options);
            break;
          default:
            sonnerToast(displayMessage, options); // Default toast
        }
      } catch (toastError) {
        consola.error('Failed to show toast:', toastError);
      }
    };

    return result;
  };
}

export const logger = {
  trace: createLogMethod('trace'),
  debug: createLogMethod('debug'),
  success: createLogMethod('success'),
  info: createLogMethod('info'),
  warn: createLogMethod('warn'),
  error: createLogMethod('error'),
  fatal: createLogMethod('fatal'),
};
