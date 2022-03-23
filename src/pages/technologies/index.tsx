import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
  HStack,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { useGetTechnologies } from '../../services/hooks/technologies/useGetTechnologies';

export default function Technologies() {
  const { data, isLoading, isFetching, error } = useGetTechnologies();

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  });

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
                      {isLg && <Th>Responsáveis</Th>}
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
                            <Link color="purple.200">
                              <Text fontWeight="bold">{technology.name}</Text>
                            </Link>
                          </HStack>
                        </Td>
                        {isLg && (
                          <Td>
                            {technology.UserTechnology.map((userTechnology) => (
                              <Text color="purple.200" key={userTechnology.user.id}>
                                {userTechnology.user.name}
                              </Text>
                            ))}
                          </Td>
                        )}
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
