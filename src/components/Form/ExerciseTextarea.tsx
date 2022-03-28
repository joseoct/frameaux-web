import {
  FormControl,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form'

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  placeholder?: string;
  error?: FieldError;
}

export const ExerciseTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, placeholder, error = null, ...rest }: TextareaProps, ref) => {
    return (
      <FormControl isInvalid={!!error}>

        <ChakraTextarea
          placeholder={placeholder}
          name={name}
          id={name}
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
ExerciseTextarea.displayName = "ExerciseTextarea";
