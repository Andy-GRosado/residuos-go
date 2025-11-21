import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { AnyObjectSchema, InferType } from 'yup';

export function useAppForm<
  TSchema extends AnyObjectSchema,
  TFieldValues extends FieldValues = InferType<TSchema>
>(
  schema: TSchema,
  defaultValues?: DefaultValues<TFieldValues>
) {
  return useForm<TFieldValues>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });
}