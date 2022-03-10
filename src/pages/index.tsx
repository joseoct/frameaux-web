import {  Button, Flex, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'; 
import { Logo } from '../components/Header/Logo';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Home() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event) => {
    event.preventDefault();

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Flex justify="center" align="center" h="80px">
          <Logo />
        </Flex>

        <Stack spacing={4}>
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('password')}
          />

          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
