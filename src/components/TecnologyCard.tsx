import NextLink from 'next/link';
import { Link, Image, Text, useBreakpointValue } from "@chakra-ui/react";

type TecnologyCardProps = {
  technologyId: string;
  title: string;
  src: string;
}

export function TecnologyCard({ technologyId, title, src }: TecnologyCardProps) {
  const isMd = useBreakpointValue({
    base: false,
    md: true,
  });


  return (
    <NextLink 
      passHref 
      href={{
        pathname: '/construction/technologies/[technologyId]/topics',
        query: {
          technologyId,
        }
      }}
      as={`/construction/technologies/${technologyId}/topics`}
    >
      <Link
        display="flex"
        alignItems="center"
        flexDirection="column"
        p={['6', '8']}
        bg="gray.800"
        border="3px solid"
        borderColor="gray.800"
        transition="0.2s"
        position="relative"
        _hover={{
          borderColor: 'gray.600',
        }}
      >
        <Image objectFit="cover" src={src} alt="Technology card" />
        {isMd && (
          <Text
            position="absolute"
            fontSize={['sm', 'md']}
            color="white"
            bottom="2"
          >
            {title}
          </Text>
        )}
      </Link>
    </NextLink>
  );
}
