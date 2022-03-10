import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function Searchbox () {
  return (
    <Flex
      flex="1"
      py="4"
      px="8"
      mx="6"
      color="gray.200"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
