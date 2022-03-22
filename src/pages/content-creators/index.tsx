import {
  Box, Flex
} from '@chakra-ui/react';

import ContentCreatorsTable from '@components/ContentCreatorsTable';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

export default function ContentCreators() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />

      <ContentCreatorsTable
        title="Criadores de conteúdo"
        registerButton 
        checkbox={false}
      />

      </Flex>
    </Box>
  );
}
