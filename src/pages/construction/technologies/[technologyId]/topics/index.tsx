import {
  Button,
  Flex,
  Image,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
import { Header } from '@components/Header';
import { TopicPopover } from '@components/Popover/TopicPopover';
import { Sidebar } from '@components/Sidebar';
import { api } from '@services/api';
import { useCreateTopicByTechnology } from '@services/hooks/topics/useCreateTopicByTechnology';
import { useUpdateTopic } from '@services/hooks/topics/useUpdateTopic';
import { useGetTopicsByTechnology } from '@services/hooks/topics/useGetTopicsByTechnology';
import { useEffect, useState } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import Link from 'next/link';

interface TechnologyProps {
  technology: {
    id: string;
    name: string;
    technology_image: string;
  };
}

type Topic = {
  id: string;
  name: string;
  layer: number;
  explanation: string;
}

type CreateTopicFormData = {
  name: string;
  layer: number;
  explanation: string;
}

const createTopicSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  layer: yup.number().typeError("Selecione uma camada").required(),
  explanation: yup.string().required(),
});


export default function TechnologiesTopics({
  technology,
}: TechnologyProps) {
  const [topic, setTopic] = useState<Topic>(null);
  const [maxLayer, setMaxLayer] = useState<number[]>([]);

  const { data } = useGetTopicsByTechnology(technology.id);

  const createTopic = useCreateTopicByTechnology();
  const updateTopic = useUpdateTopic();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createTopicSchema),
  });

  useEffect(() => {
    const maxLayerArr = new Array(data?.maxLayer).fill(0);

    setMaxLayer(maxLayerArr);
  }, [data?.maxLayer, setValue, register]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setValue('name', topic?.name);
    setValue('layer', Math.floor(topic?.layer));
    setValue('explanation', topic?.explanation);
  }, [topic, setValue]);

  const handleCreateTopic: SubmitHandler<CreateTopicFormData> = async (
    values,
  ) => {
    console.log(values)
    try {
      if (topic) {
        await updateTopic.mutateAsync({
          topic_id: topic.id,
          topic: {
            ...values,
          }
        });
        setTopic(null);
      } else {
        await createTopic.mutateAsync({
          topic: values,
          technology_id: technology.id,
        });
      }

      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.error,
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

          <VStack w="100%">

            <Link href='/construction/technologies' passHref>
              <ChakraLink
                alignSelf="flex-start"
                display="flex"
                flexDir="row"
                alignItems="center"
                color="gray.300"
              >
                <Icon as={RiArrowLeftSLine} />
                Tecnologias reponsáveis
              </ChakraLink>
            </Link>

            <VStack
              mb="18px"
              w="100%"
              alignItems="center"
              spacing="8"
            >
              {data?.layerTopics.map((topics, index) => (
                <HStack spacing="6" key={index}>
                  {topics?.map((topic) => (
                    <TopicPopover
                      key={topic.id}
                      topic={topic}
                      technology_id={technology.id}
                      setTopic={setTopic}
                    />
                  ))}
                </HStack>
              ))}
            </VStack>
          </VStack>

          <VStack
            maxHeight="445px"
            position="relative"
            p="4"
            bg="gray.800"
            border={topic ? '2px solid #48BB78' : '1px solid #1F2029'}
            ml="8"
            spacing="4"
          >
            <Stack>
              {topic ? (
                <Text
                  w="320px"
                  textAlign="center"
                  fontSize=""
                  fontWeight="bold"
                  color="white"
                >
                  Edição do tópico {topic.name}
                </Text>
              ) : (
                <Text
                  w="320px"
                  textAlign="center"
                  fontSize=""
                  fontWeight="bold"
                  color="white"
                >
                  Criação de tópicos
                </Text>
              )}
              <Text
                w="320px"
                textAlign="center"
                fontSize="2xl"
                fontWeight="bold"
                color="purple.400"
              >
                {technology.name}
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
                  maxLayer={maxLayer}
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
                        {topic ? 'Editar explicação' : 'Criar explicação'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={onOpen}
                      colorScheme="purple"
                    >
                      {topic ? 'Editar explicação' : 'Criar explicação'}
                    </Button>
                  )}

                  <HStack>
                    {topic && (
                      <Button
                        type="submit"
                        color="gray.800"
                        colorScheme="gray"
                        onClickCapture={() => setTopic(null)}
                      >
                        Cancelar
                      </Button>
                    )}

                    <Button
                      type="submit"
                      colorScheme="purple"
                      isLoading={isSubmitting}
                      w="100%"
                    >
                      {topic ? 'Editar' : 'Criar'}
                    </Button>
                  </HStack>
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
                      <Button colorScheme="purple" mr={3} onClick={onClose}>
                        Salvar
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Stack>

              <Image
                position="absolute"
                top="4"
                left="4"
                boxSize="32px"
                objectFit="cover"
                src={technology.technology_image}
                alt="Technology image"
              />
            </Stack>
            <Text alignSelf="start" color="gray.500">
              *O máximo de tópicos por camada é 3
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { technologyId: id } = context.params;
  const { data } = await api.get(`/technologies/${id}`);

  return {
    props: { technology: data },
  };
}
