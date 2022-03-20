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
import { useState, Dispatch, SetStateAction } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { Pagination } from '../components/Pagination';
import { useGetContentCreators } from '../services/hooks/users/useGetContentCreators';

type ContentCreatorsTableProps = {
  title: string;
  registerButton: boolean;
  checkbox: boolean;
  contentCreatorsIds?: string[];
  setContentCreatorsIds?: Dispatch<SetStateAction<string[]>>;
}

export default function ContentCreatorsTable({
  title,
  registerButton,
  checkbox,
  contentCreatorsIds,
  setContentCreatorsIds,
}: ContentCreatorsTableProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetContentCreators(page);

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleCheckboxChanged = (userId: string) => {
    if (contentCreatorsIds.includes(userId)) {
      setContentCreatorsIds(contentCreatorsIds.filter(id => id !== userId));
    } else {
      setContentCreatorsIds([...contentCreatorsIds, userId]);
    }
  }

  return (
    <Box flex="1" borderRadius="8" bg="gray.800" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          {title}
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.400" ml="4" />
          )}
        </Heading>

        {registerButton && (
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
        )}
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
                {checkbox && (
                  <Th px={['2', '4', '6']} color="gray.300" width="8"></Th>
                )}
                <Th>Usuário</Th>
                {isLg && <Th>Tecnologias</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {data.contentCreators.map((contentCreator) => (
                <Tr key={contentCreator.id}>
                  {checkbox && (
                    <Td px={['2', '4', '6']}>
                      <Checkbox
                        onChange={() => handleCheckboxChanged(contentCreator.id)}
                        isChecked={contentCreatorsIds?.includes(contentCreator.id)}
                        colorScheme="pink"
                      />
                    </Td>
                  )}
                  <Td>
                    <Box>
                      <Link
                        color="purple.400"
                      >
                        <Text fontWeight="bold">{contentCreator.name}</Text>
                      </Link>
                      <Text fontSize="sm" color="gray.300">
                        {contentCreator.email}
                      </Text>
                    </Box>
                  </Td>
                  {isLg && (
                    <Td>
                      {contentCreator.UserTechnology?.map((userTechnology) => (
                        <Text key={userTechnology.technology.id}>
                          {userTechnology.technology.name}
                        </Text>
                      ))}
                    </Td>
                  )}
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
  );
}
