import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string;
  placeholder?: string;
  error?: FieldError;
}

export const ExerciseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, error = null, type, ...rest }: InputProps, ref) => {
    return (
      <FormControl isInvalid={!!error}>

        <ChakraInput
          placeholder={placeholder}
          name={name}
          id={name}
          type={type}
          focusBorderColor="purple.500"
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
ExerciseInput.displayName = "ExerciseInput";
