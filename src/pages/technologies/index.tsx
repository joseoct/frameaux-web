import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody, Td,
  Th,
  Thead,
  Tr,
  Text,
  Spinner,
  HStack,
  Image,
  Tooltip,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRef, useState } from 'react';
import { RiAddLine, RiDeleteBin2Line, RiInformationFill, RiPencilLine } from 'react-icons/ri';
import Head from 'next/head';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

import { useGetTechnologies } from '@services/hooks/technologies/useGetTechnologies';
import { useDeleteTechnology } from '@services/hooks/technologies/useDeleteTechnology';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '@utils/withSSRAuth';

export default function Technologies() {
  const { data, isLoading, isFetching, error } = useGetTechnologies();

  const [technologyToBeDeleted, setExerciseToBeDeleted] = useState<string>('');

  const router = useRouter();

  const deleteTechnology = useDeleteTechnology();

  const handleDeleteTechnology = (technology_id: string) => {
    setExerciseToBeDeleted(technology_id);

    if (technology_id === technologyToBeDeleted) {
      deleteTechnology.mutateAsync(technology_id);
      setExerciseToBeDeleted('');
    }
  }

  return (
    <>
      <Head>
        <title>Tecnologias</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius="8" bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Tecnologias
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.400" ml="4" />
                )}
              </Heading>

              <NextLink href="/technologies/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiAddLine}></Icon>}
                >
                  Cadastrar nova tecnologia
                </Button>
              </NextLink>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Tecnologias</Th>
                      <Th>Responsáveis</Th>
                      <Th w={8}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((technology) => (
                      <Tr key={technology.id}>
                        <Td>
                          <HStack>
                            <Image
                              boxSize="48px"
                              objectFit="cover"
                              src={technology.technology_image}
                              alt={technology.technology_image}
                            />
                            <Text color="purple.200" fontWeight="bold">{technology.name}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          {technology.UserTechnology.map((userTechnology) => (
                            <Text
                              color="purple.200"
                              key={userTechnology.user.id}
                            >
                              {userTechnology.user.name}
                            </Text>
                          ))}
                        </Td>
                        <Td>
                          <HStack>
                            <Tooltip label="Deletar tecnologia">
                              <Box as="span">
                                <Icon
                                  cursor="pointer"
                                  boxSize="24px"
                                  color="red.400"
                                  as={technologyToBeDeleted === technology.id ? RiInformationFill : RiDeleteBin2Line}
                                  onClick={() => handleDeleteTechnology(technology.id)}
                                />
                              </Box>
                            </Tooltip>
                            <Tooltip label="Editar tecnologia">
                              <Box as="span">
                                <Icon
                                  cursor="pointer"
                                  boxSize="24px"
                                  color="green.400"
                                  as={RiPencilLine}
                                  onClick={() => router.push(`/technologies/${technology.id}/update`)}
                                />
                              </Box>
                            </Tooltip>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
}, {
  roles: ['administrator'],
});
