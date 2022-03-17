import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { useCreateUsers } from '../../services/hooks/users/useCreateUsers';

type CreateUserFormData = {
  name: string;
  password: string;
  password_confirmation: string;
}

const signInFormSchema = yup.object().shape({
  tecnology_name: yup.string().required(),
});

export default function CreateUser() {

  const router = useRouter();

  const createUser = useCreateUsers();

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
    await createUser.mutateAsync(values);

    router.push('/content-creators');
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
            Cadastrar tecnologia 
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['4', '8']} w="100%">
              <Input
                name="tecnology_name"
                label="Nome da tecnologia"
                type="text"
                error={errors.name}
                {...register('name')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
