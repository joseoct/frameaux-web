import {
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '../../../components/Form/Input';
import { Select } from '../../../components/Form/Select';
import { Header } from '../../../components/Header';
import { TopicPopover } from '../../../components/Popover/TopicPopover';
import { Sidebar } from '../../../components/Sidebar';
import { api } from '../../../services/api';
import { useCreateTopic } from '../../../services/hooks/topics/useCreateTopic';
import { useGetTopics } from '../../../services/hooks/topics/useGetTopics';

interface TechnologyProps {
  technology: {
    id: string;
    name: string;
    technology_image: string;
  };
}

type CreateTopicFormData = {
  name: string;
  layer: number;
  explanation: string;
}

const createTopicSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  layer: yup.number().required(),
  explanation: yup.string().required(),
});

export default function TechnologiesConstruction({
  technology,
}: TechnologyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useGetTopics(technology.id);

  console.log(data?.layerTopics.map((item) => console.log(item)));

  const maxLayerArr = new Array(data?.maxLayer).fill(0);

  const createTopic = useCreateTopic();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(createTopicSchema),
  });

  const handleCreateTopic: SubmitHandler<CreateTopicFormData> = async (
    values,
  ) => {
    
    try {
      await createTopic.mutateAsync({
        topic: values,
        technology_id: technology.id,
      });

      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Erro ao cadastrar tópico',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

  };

  return (
    <>
      <Head>
        <title>Construção de {technology.name}</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Stack
            mb="18px"
            direction="column"
            w="100%"
            alignItems="center"
            spacing="8"
          >
            {data?.layerTopics.map((topics, index) => (
              <HStack spacing="6" key={index}>
                {topics?.map((topic) => (
                  <TopicPopover key={topic.id} topic={topic}/>
                ))}
              </HStack>
            ))}
          </Stack>

          <VStack
            maxHeight="450px"
            position="relative"
            p="4"
            bg="gray.800"
            ml="8"
            spacing="4"
          >
            <Text
              w="320px"
              textAlign="center"
              fontSize="xl"
              fontWeight="bold"
              color="white"
            >
              Criação de Tópicos
            </Text>

            <Stack
              direction="column"
              as="form"
              spacing={['4', '8']}
              w="100%"
              onSubmit={handleSubmit(handleCreateTopic)}
            >
              <Input
                name="name"
                label="Nome"
                type="text"
                error={errors.name}
                {...register('name')}
              />

              <Select
                label="Camada"
                maxLayer={maxLayerArr}
                error={errors.layer}
                {...register('layer')}
              />

              <Stack>
                {errors.explanation ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={onOpen}
                      colorScheme="red"
                    >
                      Adicionar explicação
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={onOpen} colorScheme="pink">
                    Adicionar explicação
                  </Button>
                )}

                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={isSubmitting}
                >
                  Criar tópico
                </Button>
              </Stack>

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
                    <Textarea {...register('explanation')} rows={30} />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="pink" mr={3} onClick={onClose}>
                      Salvar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>

            <Image
              position="absolute"
              top="0"
              left="3"
              boxSize="32px"
              objectFit="cover"
              src={technology.technology_image}
              alt="Technology image"
            />
            
            <Text alignSelf="start" color="gray.500">*O máximo de tópicos por camada é 9</Text>

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
