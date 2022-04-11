import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  Image,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import { Input } from '@components/Form/Input';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import ContentCreatorsTable from '@components/ContentCreatorsTable';

import { useCreateTechnologies } from '@services/hooks/technologies/useCreateTechnologies';

import { api } from '@services/api';
import { GetServerSideProps } from 'next';
import { useUpdateTechnologies } from '@services/hooks/technologies/useUpdateTechnologies';

type CreateTechnologyFormData = {
  name: string;
  content_creators_ids: string;
};

const signInFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
});

export default function UpdateTechnology({ technology }) {
  const router = useRouter();

  const [contentCreatorsIds, setContentCreatorsIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = technology.UserTechnology.map((userTechnology) => {
      return userTechnology.user.id;
    });

    setContentCreatorsIds(ids);

  }, [technology.UserTechnology]);

  const toast = useToast();

  const updateTechnology = useUpdateTechnologies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleCreateTechnology: SubmitHandler<CreateTechnologyFormData> = async (
    values,
  ) => {

    if(contentCreatorsIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Você deve alocar pelo menos um criador de conteúdo',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    const data = {
      technology_id: technology.id as string,
      updatedTechnology: {
        name: values.name,
        content_creators_ids: JSON.stringify(contentCreatorsIds),
      }
    }

    try {
      await updateTechnology.mutateAsync(data);

      router.push('/technologies');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Erro ao cadastrar tecnologia',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateTechnology)}
        >
          <Heading size="lg" fontWeight="normal">
            Editar tecnologia {technology.name}
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['4', '8']} w="100%">
              <Input
                defaultValue={technology.name}
                name="technology_name"
                label="Nome"
                type="text"
                error={errors.name}
                {...register('name')}
              />
            </SimpleGrid>
          </VStack>

          <ContentCreatorsTable
            title="Alocar criadores de conteúdo"
            registerButton={false}
            checkbox
            contentCreatorsIds={contentCreatorsIds}
            setContentCreatorsIds={setContentCreatorsIds}
          />

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/technologies" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { technology_id } = context.params;

  const { data } = await api.get(`/technologies/${technology_id}`);

  return {
    props: {
      technology: data,
    },
  };
}
