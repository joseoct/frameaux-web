import { Flex, Text, Spinner, VStack } from "@chakra-ui/react";

type TotalProps = {
  total: {
    label: string;
    total: number;
  },
  isLoading: boolean;
}

export default function TotalCard({ total, isLoading }: TotalProps) {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      p={['6', '8']}
      bg="gray.800"
      borderRadius="8"
      pb="4"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <VStack>
          <Text fontSize="large">{total.label}</Text>
          <Text color="purple.400" fontSize="5xl">
            {total.total}
          </Text>
        </VStack>
      )}
    </Flex>
  );
}
