import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error = null, type, ...rest }: InputProps, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}

        <ChakraInput
          name={name}
          id={name}
          type={type}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900',
          }}
          size="lg"
          ref={ref}
          {...rest}
        />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage> }

      </FormControl>
    );
  },
);

// Good pratices
Input.displayName = "Input";
