import {
  Box,
  Button,
  Checkbox,
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
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

import { useGetUsers } from '../../services/hooks/users/useGetUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {

  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetUsers(page);

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10,
    });
  }
  
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Criadores de conteúdo
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
                Cadastrar novo criador de conteúdo
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
                    <Th>Usuário</Th>
                    {isLg && <Th>Tecnologias</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((contentCreator) => (
                    <Tr key={contentCreator.id}>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(contentCreator.id)}
                          >
                            <Text fontWeight="bold">{contentCreator.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {contentCreator.email}
                          </Text>
                        </Box>
                      </Td>
                      {isLg && <Td>{ contentCreator.UserTecnology.map(userTecnology => (
                        <Text key={userTecnology.tecnology.id}>{userTecnology.tecnology.name}</Text>
                      )) }</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
