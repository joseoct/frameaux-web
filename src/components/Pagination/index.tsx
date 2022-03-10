import { Text } from '@chakra-ui/react';
import { Box, HStack, Stack } from '@chakra-ui/react';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      spacing="6"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <HStack spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationButton onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="4" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationButton
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        <PaginationButton
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationButton
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount < lastPage - 1 && (
              <Text color="gray.300" w="4" textAlign="center">
                ...
              </Text>
            )}
            <PaginationButton onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
}
