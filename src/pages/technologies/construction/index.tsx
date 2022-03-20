import { Flex, SimpleGrid } from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { TecnologyCard } from '../../../components/TecnologyCard';

import { useGetTechnologiesByUser } from '../../../services/hooks/technologies/useGetTechnologiesByUser';

import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function TechnologiesConstruction() {
  const { data: technologies, isLoading } =
    useGetTechnologiesByUser();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid width="100%" columns={5} spacing="3">
          {technologies?.map((technology) => (
            <TecnologyCard
              key={technology.id}
              title={technology.name}
              src={technology.technology_image}
            />
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
