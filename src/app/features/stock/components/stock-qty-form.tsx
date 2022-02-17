import React, { FunctionComponent } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';

import { StockQtyFormProps } from '@feature/stock/types/stock-qty-form-props';
import { getErrorMessage, hasError } from '@util/forms/form-error-message';
import { omit } from 'lodash';

type FormProps = {
  form: UseFormReturn<StockQtyFormProps>;
  submitText: string;
  onSubmit: (data: StockQtyFormProps) => void;
};

export const StockQtyForm: FunctionComponent<FormProps> = ({
  submitText,
  onSubmit,
  form: {
    control,
    formState: { errors },
    handleSubmit,
    setFocus,
  },
}) => {
  return (
    <KeyboardAvoidingView>
      <Card>
        <Controller
          name="sku"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              containerStyle={{ marginBottom: 8 }}
              placeholder="Sku"
              autoFocus
              onChangeText={field.onChange}
              onSubmitEditing={() => setFocus('quantity')}
              returnKeyType="next"
              errorStyle={{ color: 'red' }}
              errorMessage={getErrorMessage(errors?.sku)}
              renderErrorMessage={hasError(errors, field.name)}
              nativeID={field.name}
              {...field}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              containerStyle={{ marginBottom: 8 }}
              placeholder="Quantity"
              keyboardType="numeric"
              onChangeText={field.onChange}
              errorStyle={{ color: 'red' }}
              errorMessage={getErrorMessage(errors[field.name])}
              renderErrorMessage={!!errors[field.name]}
              nativeID={field.name}
              value={field?.value?.toString()}
              {...omit(field, 'value')}
            />
          )}
        />
        <Button title={submitText} onPress={handleSubmit(onSubmit)} />
      </Card>
    </KeyboardAvoidingView>
  );
};
