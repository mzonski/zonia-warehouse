import React, { FunctionComponent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card, Input } from 'react-native-elements';

import { StorageStackRoute, StorageStackScreenParams } from '@navigation/app-routes';
import { useStorageNavigation } from '@navigation/hooks/useStorageNavigation';
import { StackScreenProps } from '@react-navigation/stack/src/types';
import { updateCategory } from '@redux/actions/categories-actions';
import { useAppDispatch, useAppSelector } from '@redux/app-redux-hooks';
import { getCategory } from '@redux/selectors/categories-selectors';
import { getErrorMessage } from '@util/forms/form-error-message';

import { FadeInView } from '@component/fade-in-view';

type EditCategoryFormProps = {
  label: string;
};

const CategoryEditScreen: FunctionComponent<StackScreenProps<StorageStackScreenParams, StorageStackRoute.CategoryEdit>> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const { navigation } = useStorageNavigation();
  const dispatch = useAppDispatch();
  const category = useAppSelector(getCategory(categoryId));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryFormProps>({ defaultValues: { label: category.label } });

  const onSubmit = async ({ label }: EditCategoryFormProps) => {
    await dispatch(updateCategory(categoryId, label));
    navigation.goBack();
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
              {...field}
            />
          )}
        />
        <Button title="Update" onPress={handleSubmit(onSubmit)} />
      </Card>
    </FadeInView>
  );
};

export default CategoryEditScreen;
