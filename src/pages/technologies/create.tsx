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

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import ContentCreatorsTable from '../../components/ContentCreatorsTable';

import { useCreateTechnologies } from '../../services/hooks/technologies/useCreateTechnologies';

type CreateTechnologyFormData = {
  name: string;
  technology_image: File;
  content_creators_ids: string;
};

const signInFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
});

export default function CreateTechnology() {
  const router = useRouter();

  const createTechnology = useCreateTechnologies();

  const [images, setImages] = useState([]);
  const [contentCreatorsIds, setContentCreatorsIds] = useState<string[]>([]);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const onImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const handleCreateTechnology: SubmitHandler<CreateTechnologyFormData> = async (
    values,
  ) => {
    if (images.length === 0) {
      toast({
        title: 'Error',
        description: 'O logo da tecnologia deve ser informado',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

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

    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('technology_image', images[0].file);
    formData.append('content_creators_ids', JSON.stringify(contentCreatorsIds));

    try {
      await createTechnology.mutateAsync(formData);

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
            Cadastrar tecnologia
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['4', '8']} w="100%">
              <Input
                name="technology_name"
                label="Nome"
                type="text"
                error={errors.name}
                {...register('name')}
              />
            </SimpleGrid>

            <ImageUploading
              multiple={false}
              value={images}
              onChange={onImageChange}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                <>
                  <VStack>
                    <Text fontWeight="bold" letterSpacing="tight">
                      Logo
                    </Text>

                    <Flex
                      cursor={imageList[0] ? 'default' : 'pointer'}
                      onClick={imageList[0] ? null : onImageUpload}
                      justifyContent="center"
                      alignItems="center"
                      w="180px"
                      h="180px"
                      border="1px"
                      borderColor="pink.400"
                    >
                      {imageList.length > 0 ? (
                        <Image
                          boxSize="160px"
                          src={imageList[0].data_url}
                          alt="logo"
                        />
                      ) : (
                        <>
                          <Icon w={16} h={16} as={RiAddLine}></Icon>
                        </>
                      )}
                    </Flex>

                    {imageList.length > 0 && (
                      <HStack>
                        <Button
                          colorScheme="pink"
                          onClick={() => onImageUpdate(0)}
                        >
                          Alterar
                        </Button>

                        <Button
                          colorScheme="pink"
                          onClick={() => onImageRemove(0)}
                        >
                          Remover
                        </Button>
                      </HStack>
                    )}
                  </VStack>
                </>
              )}
            </ImageUploading>
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
