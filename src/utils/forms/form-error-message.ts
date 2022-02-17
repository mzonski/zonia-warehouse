import { has } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { FieldError, FieldErrors } from 'react-hook-form/dist/types/errors';

export const hasError = <T extends FieldErrors>(errors: T, name: string) => !has(errors, name);

export const getErrorMessage = (error?: FieldError) => {
  if (!isEmpty(error?.message)) {
    return error?.message;
  }

  switch (error?.type) {
    case 'required':
      return 'Field is required';
    case 'min':
      return 'Field must be greater than minimum';
    case 'max':
      return 'Field must be less than maximum';
    case 'maxLength':
      return 'Field must not exceed maximum length';
    case 'minLength':
      return 'Field must exceed minimum length';
    case 'pattern':
      return 'Field must match pattern';
    case 'validate':
      return 'Field must to pass validation';
    default:
      return undefined;
  }
};
