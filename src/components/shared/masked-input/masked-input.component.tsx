'use client';

import React from 'react';
import InputMask from 'react-input-mask';

import { InputComponent } from '@/components/ui/input';

type MaskedInputProps = React.ComponentProps<typeof InputComponent> & {
  mask: string;
};

export const MaskedInputComponent = React.forwardRef<
  HTMLInputElement,
  MaskedInputProps
>(({ mask, ...rest }, ref) => {
  return (
    <InputMask mask={mask} {...rest}>
      {(inputProps: JSX.IntrinsicElements['input']) => (
        <InputComponent {...inputProps} ref={ref} />
      )}
    </InputMask>
  );
});

MaskedInputComponent.displayName = 'MaskedInputComponent';
