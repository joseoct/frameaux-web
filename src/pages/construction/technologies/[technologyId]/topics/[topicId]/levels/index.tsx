import {
  Image,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

import { api } from '@services/api';

import { useGetLevelsByTopics } from '@services/hooks/levels/useGetLevelsByTopic';
import { useRouter } from 'next/router';
import { RiArrowLeftSLine, RiDeleteBin2Line } from 'react-icons/ri';
import Link from 'next/link';
import { useRef } from 'react';
import { useDeleteExercise } from "@services/hooks/exercises/useDeleteExercise";

export default function TechnologiesConstruction({ topic, technology }) {
  const { data } = useGetLevelsByTopics(topic.id);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const router = useRouter();

  const deleteTechnology = useDeleteExercise(topic.id);

  const handleDeleteExercise = (exercise_id: string) => {
    deleteTechnology.mutateAsync(exercise_id);

    onClose();
  }

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
            </HStack>

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

            <Text fontSize="sm" color="gray.300">
              *Não se preocupe com a ordem dos exercícios. Todos serão
              misturados quando os estudantes forem fazê-los.
            </Text>
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
                      <HStack
                        borderRadius="6px"
                        p="4"
                        bg="gray.900"
                        w="100%"
                        key={exercise.id}
                        justifyContent="space-between"
                      >
                        <VStack spacing={0}>
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

                        <Icon
                          cursor="pointer"
                          boxSize="24px"
                          color="red.400"
                          as={RiDeleteBin2Line}
                          onClick={() => onOpen()}
                        />

                        <AlertDialog
                          isOpen={isOpen}
                          leastDestructiveRef={cancelRef}
                          onClose={onClose}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent bg="gray.800">
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                <HStack>
                                  <Text>Deletar o exercício</Text>
                                </HStack>
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                Você tem certeza que deseja deletar o
                                exercício?
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                <Button
                                  color="black"
                                  ref={cancelRef}
                                  onClick={onClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() =>
                                    handleDeleteExercise(exercise.id)
                                  }
                                  ml={3}
                                >
                                  Deletar
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
                      </HStack>
                    ))}
                  </VStack>
                  <Button
                    onClick={() =>
                      router.push(
                        `/construction/technologies/${technology.id}/topics/${topic.id}/levels/${level.id}`,
                      )
                    }
                    colorScheme="purple"
                    size="lg"
                    mt="2"
                  >
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
      technology: technology.data,
    },
  };
};
