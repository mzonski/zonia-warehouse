import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { FieldError, MultipleFieldErrors } from 'react-hook-form/dist/types/errors';

export const hasError = (errors: MultipleFieldErrors, name: string) => !isEmpty(get(errors, name));

export const getErrorMessage = (error?: FieldError) => {
  if (!isEmpty(error?.message)) {
    return error?.message;
  }

  switch (error?.type) {
    case 'required':
      return 'Field is required';
    case 'maxLength':
      return 'Field must not exceed maximum length';
    case 'minLength':
      return 'Field must exceed minimum length';
    case 'max':
      return 'Field must not be more than maximum';
    case 'min':
      return 'Field must be more than minimum';
    case 'pattern':
      return 'Field must match pattern';
    case 'validate':
      return 'Field must to pass validation';
    default:
      return undefined;
  }
};
