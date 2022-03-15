import { Button, Flex, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useInterval } from 'usehooks-ts';

import { Input } from '../components/Form/Input';
import { Logo } from '../components/Header/Logo';

import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

type AbbreviationTecnologies = {
  abbreviation: string;
  color: string;
}

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Home() {
  const { signIn }  = useContext(AuthContext);

  const [tecnology, setTecnology] = useState<AbbreviationTecnologies[]>([
    {
      abbreviation: 'tsx',
      color: '#0074c2',
    },
    {
      abbreviation: 'dart',
      color: '#025493'
    },
    {
      abbreviation: 'jsx',
      color: '#EAD41C'
    },
  ]);

  const isLg = useBreakpointValue({ base: false, lg: true, });

  useInterval(() => {
    const cicleTecnology = [...tecnology];

    const shiftedTecnology = cicleTecnology.shift();

    cicleTecnology.push(shiftedTecnology);

    setTecnology(cicleTecnology);
  }, 2000)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event) => {
    event.preventDefault();

    await signIn(data);
  }

  return (
    <Flex w="100vw" h="100vh" flexDirection="row">
      <Flex w={{ base: '100vw', lg: '40vw' }} align="center" justify="center">
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
              {...register('email')}
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

      { isLg && <Flex w="60vw" align="center" justify="center" bg="gray.800">
        <Flex fontSize="240" color="gray.300">
          .
          <Text color={tecnology[0].color}>
            {tecnology[0].abbreviation}
          </Text>
        </Flex>
      </Flex> }
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});