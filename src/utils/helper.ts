import Toast from 'react-native-toast-message';

/**
 * Global error handler that shows a toast notification.
 * @param error Error object or string
 * @param fallbackMessage Message to show if no specific error is found
 */
export const errorHandler = (
  error: unknown,
  fallbackMessage: string = 'Something went wrong',
) => {
  let message = fallbackMessage;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    message = (error as any).message;
  }

  console.error('Handled Error:', JSON.stringify(message));
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
  });
};
