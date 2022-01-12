import React, { FunctionComponent } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Button, Card, Input } from 'react-native-elements';

import { Item } from '@redux/slices/items-slice';
import { getErrorMessage } from '@util/forms/form-error-message';
import { omit } from 'lodash';

type ItemFormProps = {
  form: UseFormReturn<Item>;
  submitText: string;
  onSubmit: (item: Item) => void;
};

export const ItemForm: FunctionComponent<ItemFormProps> = ({
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
    <Card>
      <Controller
        name="label"
        control={control}
        rules={{ required: true, minLength: 3 }}
        render={({ field }) => (
          <Input
            containerStyle={{ marginBottom: 8 }}
            placeholder="Label"
            autoFocus
            onChangeText={field.onChange}
            errorStyle={{ color: 'red' }}
            errorMessage={getErrorMessage(errors.label)}
            renderErrorMessage={!!errors.label}
            nativeID={field.name}
            returnKeyType="next"
            onSubmitEditing={() => setFocus('sku')}
            {...field}
          />
        )}
      />
      <Controller
        name="sku"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            containerStyle={{ marginBottom: 8 }}
            placeholder="Sku"
            onChangeText={field.onChange}
            errorStyle={{ color: 'red' }}
            errorMessage={getErrorMessage(errors.sku)}
            renderErrorMessage={!!errors.sku}
            nativeID={field.name}
            returnKeyType="next"
            onSubmitEditing={() => setFocus('quantity')}
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
  );
};
