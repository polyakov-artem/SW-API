import { ComponentProps } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xlg';

export type InputChangeHandlerType = NonNullable<ComponentProps<'input'>['onChange']>;
export type SelectChangeHandlerType = NonNullable<ComponentProps<'select'>['onChange']>;
export type SubmitHandlerType = NonNullable<ComponentProps<'form'>['onSubmit']>;
