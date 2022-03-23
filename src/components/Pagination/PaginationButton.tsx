import { Button } from "@chakra-ui/react";

interface PaginationButtonProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationButton({
  number,
  isCurrent,
  onPageChange,
}: PaginationButtonProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="purple"
        disabled
        _disabled={{
          bg: 'purple.500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
