import { Box, Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';

import { useGetTotals } from '../services/hooks/dashboard/useGetTotals';

export default function Dashboard() {
  const { data, isLoading } = useGetTotals();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align-items="flex">
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
              <>
                <Text fontSize="large">Criadores de Conteúdo</Text>
                <Text fontSize="5xl">
                  {data.totalContentCreators}
                </Text>
              </>
            )}
          </Flex>
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
              <>
                <Text fontSize="large">Criadores de Conteúdo</Text>
                <Text fontSize="5xl">
                  {data.totalStudents}
                </Text>
              </>
            )}
          </Flex>
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
              <>
                <Text fontSize="large">Criadores de Conteúdo</Text>
                <Text fontSize="5xl">
                  {data.totalTecnologies}
                </Text>
              </>
            )}
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
