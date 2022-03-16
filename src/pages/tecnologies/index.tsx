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

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { useGetTecnologies } from '../../services/hooks/tecnologies/useGetTecnologies';

export default function UserList() {
  const { data, isLoading, isFetching, error } = useGetTecnologies();

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
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

            <NextLink href="/content-creators/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
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
                  {data.map((user) => (
                    <Tr key={user.id}>
                      <Td>
                        <HStack>
                          <Image
                            boxSize="48px"
                            src={user.tecnology_image}
                            alt={user.tecnology_image}
                          />
                          <Link color="purple.400">
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                        </HStack>
                      </Td>
                      {isLg && <Td>Responsáveis</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
