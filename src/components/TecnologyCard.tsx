import { Flex, Image } from "@chakra-ui/react";

type TecnologyCardProps = {
  title: string;
  src: string;
}

export function TecnologyCard({ title, src }: TecnologyCardProps) {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      p={['6', '8']}
      bg="gray.800"
      border="3px solid"
      borderColor="gray.800"
      transition="0.2s"
      _hover={{
        borderColor: 'gray.600',
      }}
    >
      <Image src={src} alt="Technology card"/>
      {title}
    </Flex>
  );
}
