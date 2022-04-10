import {
  Box, Flex
} from '@chakra-ui/react';

import ContentCreatorsTable from '@components/ContentCreatorsTable';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { withSSRAuth } from '@utils/withSSRAuth';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
}, {
  roles: ['administrator'],
});

