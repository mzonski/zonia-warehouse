import React, { FunctionComponent } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { StorageStackRoute, StorageStackScreenParams } from '@navigation/app-routes';
import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { StackScreenProps } from '@react-navigation/stack/src/types';
import { addCategory } from '@redux/actions/categories-actions';
import { useAppDispatch } from '@redux/app-redux-hooks';
import { Button, Card, Input } from '@rneui/themed';
import { getErrorMessage } from '@util/forms/form-error-message';

import { FadeInView } from '@component/fade-in-view';

type AddCategoryFormProps = {
  label: string;
};

const CategoryAddScreen: FunctionComponent<StackScreenProps<StorageStackScreenParams, StorageStackRoute.CategoryAdd>> = () => {
  const { goToItems } = useStorageNavigation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryFormProps>();

  const onSubmit = async ({ label }: AddCategoryFormProps) => {
    const {
      payload: { id },
    } = await dispatch(addCategory(label));
    goToItems(id);
  };

  return (
    <FadeInView>
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
              {...field}
            />
          )}
        />
        <Button title="Create" onPress={handleSubmit(onSubmit)} />
      </Card>
    </FadeInView>
  );
};

export default CategoryAddScreen;
