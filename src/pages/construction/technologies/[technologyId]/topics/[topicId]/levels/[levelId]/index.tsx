import {
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import Exercise from '@components/ExercisesTypes';
import { ExerciseTypesButtons } from '@components/ExerciseTypesButtons';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { api } from '@services/api';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';

export default function TechnologiesConstruction({ topic, technology, level }) {
  const [exerciseType, setExerciseType] = useState<string>(null);

  return (
    <>
      <Head>
        <title>Cadastrar exercício</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Stack w="100%" direction="column" spacing="4">
            <HStack>
              <Link href="/construction/technologies" passHref>
                <ChakraLink
                  alignSelf="flex-start"
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                  color="gray.300"
                >
                  <Icon as={RiArrowLeftSLine} />
                  Tecnologias reponsáveis
                </ChakraLink>
              </Link>
              <Link
                href={`/construction/technologies/${technology.id}/topics`}
                passHref
              >
                <ChakraLink
                  alignSelf="flex-start"
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                  color="gray.300"
                >
                  <Icon as={RiArrowLeftSLine} />
                  Criação de tópicos de {technology.name}
                </ChakraLink>
              </Link>
              <Link
                href={`/construction/technologies/${technology.id}/topics/${topic.id}/levels`}
                passHref
              >
                <ChakraLink
                  alignSelf="flex-start"
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                  color="gray.300"
                >
                  <Icon as={RiArrowLeftSLine} />
                  Níveis do tópicos {topic.name}
                </ChakraLink>
              </Link>
            </HStack>

            {exerciseType && (
              <Exercise exerciseType={exerciseType} levelId={level.id} />
            )}
          </Stack>

          <VStack p="4" bg="gray.800" ml="8" spacing="4" maxHeight={270}>
            <HStack>
              <Heading as="h2" size="md">
                Criação dos exercícios de nível
                <Text as="span" color="purple.400">
                  {' '}
                  {level.difficulty}{' '}
                </Text>
                do tópico
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

            <Text>Criar exercícios do tipo:</Text>

            <ExerciseTypesButtons
              setExerciseType={setExerciseType}
              exerciseType={exerciseType}
            />
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { topicId, technologyId, levelId } = context.params;

  const topic = await api.get(`/topics/${topicId}`);

  const technology = await api.get(`/technologies/${technologyId}`);

  const level = await api.get(`/levels/${levelId}`);

  return {
    props: {
      topic: topic.data,
      technology: technology.data,
      level: level.data,
    },
  };
};
