import {
  FormControl,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form'

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  placeholder?: string;
  error?: FieldError;
}

export const ExerciseTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, placeholder, error = null, ...rest }: TextareaProps, ref) => {

    function handleKeyDown(e: any) {
      if (e.key == 'Tab') {
        e.preventDefault();
        const target = e.target as HTMLInputElement;

        const start = target.selectionStart;
        const end = target.selectionEnd;

        target.value =
          target.value.substring(0, start) + '    ' + target.value.substring(end);

        target.selectionStart = target.selectionEnd = start + 4;
      }
    }

    return (
      <FormControl isInvalid={!!error}>
        <ChakraTextarea
          onKeyDown={handleKeyDown}
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

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  },
);

// Good pratices
ExerciseTextarea.displayName = "ExerciseTextarea";
