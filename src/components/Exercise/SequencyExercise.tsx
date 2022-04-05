import { Flex, Stack, HStack, Button, useToast, Icon } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Sequency, useCreateExerciseByLevel } from "@services/hooks/exercises/useCreateExerciseByLevel";
import { useForm, SubmitHandler } from "react-hook-form";
import { ExerciseInput } from "@components/Form/ExerciseInput";
import { ExerciseTextarea } from "@components/Form/ExerciseTextarea";
import { useRouter } from "next/router";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useState } from "react";

type SequencyExerciseData = {
  question: string;
  sequency: string;
}

const alternativeExerciseFormSchema = yup.object().shape({
  question: yup.string().required("O enunciado é obrigatório"),
  sequency: yup.string().required("A sequência é obrigatória"),
});

type SequencyExerciseProps = {
  levelId: string;
}

export default function SequencyExercise({ levelId }: SequencyExerciseProps) {

  const createExercise = useCreateExerciseByLevel();

  const [inputsCounter, setInputsCounter] = useState<number>(1);

  const toast = useToast();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(alternativeExerciseFormSchema),
  });

  const handleCreateExercise: SubmitHandler<SequencyExerciseData> = async (data, event) => {
    event.preventDefault();

    const correctSequency = data.sequency.split(",");

    try {
      createExercise.mutateAsync({
        exercise: {
          type: 'sequency',
          question: data.question,
          correct_answer: correctSequency,
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
    setInputsCounter(state => state + 1);
  }

  function handleSubInput() {
    if (inputsCounter > 1) {
      setInputsCounter(state => state - 1);
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

        <HStack w="100%">
          {Array.from({ length: inputsCounter }).map((_, index) => (
            <ExerciseInput
              key={index}
              name="sequency"
              placeholder="Sequência"
              error={errors.sequency}
              type="text"
              {...register('sequency')}
            />
          ))}
          <Icon onClick={handleAddInput} boxSize={8} as={RiAddLine} />
          <Icon onClick={handleSubInput} boxSize={8} as={RiSubtractLine} />
        </HStack>
      </Stack>

      <Button
        type="submit"
        mt="6"
        colorScheme="purple"
        size="lg"
        isLoading={isSubmitting}
      >
        Cadastrar exercício
      </Button>
    </Flex>
  );
}
