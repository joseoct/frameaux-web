import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, useToast, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { useCreateContentCreators } from '../../services/hooks/users/useCreateContentCreator';

type CreateUserFormData = {
  name: string;
  password: string;
  password_confirmation: string;
}

const signInFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'Passwords must match'),
});

export default function CreateContentCreator() {

  const router = useRouter();
  const toast = useToast();

  const createContentCreator = useCreateContentCreators();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values,
  ) => {
    delete values.password_confirmation;

    try {
      await createContentCreator.mutateAsync(values);

      router.push('/content-creators');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Erro ao cadastrar, o email já pode ter sido cadastrado',
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
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Cadastrar um criador de conteúdo 
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['4', '8']} w="100%">
              <Input
                name="name"
                label="Nome completo"
                type="text"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['4', '8']} w="100%">
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                label="Confirmar senha"
                type="password"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Cadastrar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
