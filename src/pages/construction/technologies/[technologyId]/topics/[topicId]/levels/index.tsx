import { Image, Button, Flex, Heading, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

import { api } from '@services/api';

import { useGetLevelsByTopics } from '@services/hooks/levels/useGetLevelsByTopic';

export default function TechnologiesConstruction({ topic, technology }) {

  const { data } = useGetLevelsByTopics(topic.id);

  console.log(data);

  return (
    <>
      <Head>
        <title>Níveis do tópico: {topic.name}</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Stack w="100%" direction="column" spacing="4">
            <HStack>
              <Heading>
                Níveis do tópico
                <Text as="span" color="purple.400">
                  {' '}
                  {topic.name}{' '}
                </Text>
                da tecnologia
                <Text as="span" color="purple.400">
                  {' '}
                  {technology.name}{' '}
                </Text>
              </Heading>
              <Image
                w="40px"
                h="40px"
                src={technology.technology_image}
                alt="Imagem da tecnologia"
              ></Image>
            </HStack>
            <Text fontSize="sm" color="gray.300">*Não se preocupe com a ordem dos exercícios. Todos serão misturados quando os estudantes forem fazê-los.</Text>
            <SimpleGrid
              width="100%"
              minChildWidth="320px"
              columns={3}
              spacing="3"
            >
              {data?.levels.map((level) => (
                <Stack key={level.id} bg="gray.800" p="4">
                  <VStack>
                    <HStack>
                      <Text>Dificuldade:</Text>
                      <Text fontWeight="bold">{level.difficulty}</Text>
                    </HStack>

                    {level.Exercise.map((exercise) => (
                      <VStack borderRadius="6px" key={exercise.id} p="4" spacing={0} bg="gray.900" w="100%">
                        <Text
                          alignSelf="flex-start"
                          color="gray.400"
                          fontSize="sm"
                        >
                          {exercise.type}
                        </Text>
                        <Text
                          alignSelf="flex-start"
                          color="gray.200"
                          fontSize="md"
                        >
                          {exercise.question}
                        </Text>
                      </VStack>
                    ))}
                  </VStack>
                  <Button colorScheme="purple" size="lg" mt="2">
                    <Text fontSize="lg" fontWeight="bold">
                      Cadastrar exercícios para este nível
                    </Text>
                  </Button>
                </Stack>
              ))}
            </SimpleGrid>

            <Text fontSize="sm" color="gray.400">
              *Por padrão cada tópico possui três dificuldades.
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { topicId, technologyId } = context.params;

  const topic = await api.get(`/topics/${topicId}`);

  const technology = await api.get(`/technologies/${technologyId}`);

  return {
    props: { 
      topic: topic.data, 
      technology: technology.data 
    },
  };
}
