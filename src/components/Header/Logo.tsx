import { Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link';

export function Logo () {
  return (
    <Link href="/dashboard" passHref>
      <Text
        as="a"
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
      >
        frame
        <Text as="span" color="pink.400">
          aux
        </Text>
      </Text>
    </Link>
  );
}
