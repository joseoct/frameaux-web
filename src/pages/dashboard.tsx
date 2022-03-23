import { Box, Flex, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { withSSRAuth } from '@utils/withSSRAuth';

import { useGetTotals } from '@services/hooks/dashboard/useGetTotals';
import TotalCard from '@components/TotalCard';

export default function Dashboard() {
  const { data, isLoading } = useGetTotals();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align-items="flex">
          
          {data?.totals.map((total, index) => (
            <TotalCard key={index} isLoading={isLoading} total={total}/>
          ))}
          
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
