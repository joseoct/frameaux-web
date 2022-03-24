import { Box, Stack, Text } from "@chakra-ui/react";

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NavSection ({ title, children }: NavSectionProps){
  return (
    <Box>
      <Text fontWeight="bold" color="gray.200" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="2" align="stretch">
        {children} 
      </Stack>
    </Box>
  );
}
