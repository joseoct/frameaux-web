import {
  Stack,
  Text,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Dispatch, forwardRef, SetStateAction } from 'react';
import { FieldError } from 'react-hook-form'

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  maxLayer?: number[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, label, error = null, maxLayer, ...rest }: SelectProps, ref) => {

    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel>{label}</FormLabel>}
        <Text></Text>

        <ChakraSelect
          name={name}
          borderColor="gray.900"
          bg="gray.900"
          size="lg"
          // placeholder="Selecione a camada"
          _hover={{
            border: '2px',
            borderColor: 'purple.500',
          }}
          _focus={{
            bg: 'gray.800',
            border: '2px',
            borderColor: 'purple.500',
          }}
          ref={ref}
          {...rest}
        >
          {maxLayer.map((_, index) => (
            <option
              key={index + 1}
              style={{ backgroundColor: 'initial' }}
              value={index + 1}
            >
              {index + 1}
            </option>
          ))}
        </ChakraSelect>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  },
);

// Good pratices
Select.displayName = "Select";
