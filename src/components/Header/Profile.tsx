import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Jose Octavio</Text>
          <Text color="gray.300">joseoctavioconti@gmail.com</Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Jose Octavio"
      />
    </Flex>
  );
}
