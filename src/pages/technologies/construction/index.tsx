import { Flex, SimpleGrid } from '@chakra-ui/react';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { TecnologyCard } from '../../../components/TecnologyCard';

import { useGetTechnologiesByContentCreator } from '../../../services/hooks/technologies/useGetTechnologiesByContentCreator';

import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function TechnologiesConstruction() {
  const { data: contentCretorsTechnologies, isLoading } =
    useGetTechnologiesByContentCreator();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid width="100%" columns={5} spacing="3">
          {contentCretorsTechnologies?.map((technologies) => (
            <TecnologyCard
              key={technologies.technology.id}
              title={technologies.technology.name}
              src={technologies.technology.technology_image}
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
