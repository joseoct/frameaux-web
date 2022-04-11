import { Flex, Stack, HStack, Button, useToast, Icon, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Sequency, useCreateExerciseByLevel } from "@services/hooks/exercises/useCreateExerciseByLevel";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ExerciseInput } from "@components/Form/ExerciseInput";
import { ExerciseTextarea } from "@components/Form/ExerciseTextarea";
import { useRouter } from "next/router";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useEffect, useState } from "react";

type SequencyExerciseData = {
  question: string;
  sequency: {
    value: string;
  }[];
}

const alternativeExerciseFormSchema = yup.object().shape({
  question: yup.string().required('O enunciado é obrigatório'),
  sequency: yup
    .array()
    .min(2, 'É necessário pelo menos 2 itens na sequência')
    .required('A sequência é obrigatória')
    .of(
      yup.object().shape({
        value: yup.string().required('O valor é obrigatório'),
      }),
    ),
});

type SequencyExerciseProps = {
  levelId: string;
}

export default function SequencyExercise({ levelId }: SequencyExerciseProps) {

  const createExercise = useCreateExerciseByLevel();

  const toast = useToast();

  const router = useRouter();

  const {
    setFocus,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(alternativeExerciseFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sequency", // unique name for your Field Array
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ value: '' })
      append({ value: '' })
    }

    setFocus('question')
  }, [append, fields.length, setFocus])

  const handleCreateExercise: SubmitHandler<SequencyExerciseData> = async (data, event) => {
    event.preventDefault();

    const sequency = data.sequency.map(item => item.value);

    try {
      createExercise.mutateAsync({
        exercise: {
          type: 'sequency',
          question: data.question,
          correct_answer: JSON.stringify(sequency),
        } as Sequency,
        level_id: levelId,
      });

      router.back();
      
    } catch {
      toast({
        title: 'Erro ao criar exercício',
        description: 'Por favor, tente novamente',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  function handleAddInput() {
    append({});
  }

  function handleSubInput() {
    if (fields.length > 2) {
      remove(fields.length - 1);
    }
  }

  return (
    <Flex
      as="form"
      width="100%"
      bg="gray.800"
      p="8"
      flexDir="column"
      onSubmit={handleSubmit(handleCreateExercise)}
    >
      <Stack spacing={4}>
        <ExerciseTextarea
          rows={10}
          name="email"
          placeholder="Digite o enunciado"
          error={errors.question}
          {...register('question')}
        />

        <HStack>
          <Text>Sequência</Text>

          <Icon cursor="pointer" onClick={handleAddInput} boxSize={8} as={RiAddLine} />
          <Icon cursor="pointer" onClick={handleSubInput} boxSize={8} as={RiSubtractLine} />

          {errors.sequency && (
            <Text color="red.500">{errors.sequency.message}</Text>
          )}
        </HStack>

        <HStack w="100%">
          {fields.map((field, index) => (
            <ExerciseInput
              key={index}
              name={`sequency.${index}`}
              placeholder={`Item ${index + 1}`}
              error={errors.sequency && errors.sequency[index]}
              type="text"
              {...register(`sequency.${index}.value`)}
            />
          ))}
        </HStack>
      </Stack>

      <Button
        type="submit"
        mt="6"
        colorScheme="purple"
        size="lg"
        isLoading={isSubmitting}
      >
        Cadastrar exercício de sequência
      </Button>
    </Flex>
  );
}
