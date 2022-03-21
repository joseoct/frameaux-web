import {
  Flex,
  Text,
  Image,
  Box,
  VStack,
  Select,
  SimpleGrid,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Input } from '../../../components/Form/Input';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { api } from '../../../services/api';

interface TechnologyProps {
  technology: {
    id: string;
    name: string;
    technology_image: string;
  };
}

export default function TechnologiesConstruction({
  technology,
}: TechnologyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const oi = 8;

  const arr = new Array(oi).fill(0);

  return (
    <>
      <Head>
        <title>Construção de {technology.name}</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <VStack w="100%" alignItems="center">
            <Box bg="gray.800" boxSize="80px" borderRadius="50%"></Box>
            <Box bg="gray.800" boxSize="80px" borderRadius="50%"></Box>
          </VStack>

          <VStack position="relative" p="4" bg="gray.800" ml="8" spacing="4">
            <Text
              w="320px"
              textAlign="center"
              fontSize="xl"
              fontWeight="bold"
              color="white"
            >
              Criação de Tópicos
            </Text>

            <SimpleGrid minChildWidth="240px" spacing={['4', '8']} w="100%">
              <Input
                name="name"
                label="Nome"
                type="text"
                // error={errors.name}
                // {...register('name')}
              />


              <Stack>
                <Text fontWeight="bold">Selecione a camada</Text>
                <Select
                  borderColor="gray.900"
                  bg="gray.900"
                  size="lg"
                  // placeholder="Selecione a camada"
                  name="layer"
                  _hover={{
                    border: '2px',
                    borderColor: 'pink.500',
                  }}
                  _focus={{
                    bg: 'gray.800',
                    border: '2px',
                    borderColor: 'pink.500',
                  }}
                  // {...register("layer")}
                >
                  {arr.map((_, index) => (
                    <option
                      key={index + 1}
                      style={{ backgroundColor: 'initial' }}
                      value={index + 1}
                    >
                      {index + 1}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Stack>
                <Button onClick={onOpen} colorScheme="pink">Adicionar descrição</Button>
                <Button disabled colorScheme="pink">
                  Criar tópico
                </Button>
              </Stack>
            </SimpleGrid>

            <Modal
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset="slideInBottom"
              size="6xl"
            >
              <ModalOverlay />
              <ModalContent bg="gray.800">
                <ModalHeader>Explicação do tópico</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea rows={30}/>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="pink" mr={3} onClick={onClose}>
                    Salvar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Image
              position="absolute"
              top="0"
              left="3"
              boxSize="32px"
              objectFit="cover"
              src={technology.technology_image}
              alt="Technology image"
            />
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/technologies');

  const paths = data.map((technology) => ({
    params: {
      id: technology.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const { data } = await api.get(`/technologies/${id}`);

  return {
    props: { technology: data },
  };
};
