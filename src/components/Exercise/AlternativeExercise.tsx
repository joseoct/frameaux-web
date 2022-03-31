import { Flex, Stack, HStack, Button, useToast, RadioGroup, Radio, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateExerciseByLevel } from "@services/hooks/exercises/useCreateExerciseByLevel";
import { useForm, SubmitHandler } from "react-hook-form";
import { ExerciseInput } from "@components/Form/ExerciseInput";
import { ExerciseTextarea } from "@components/Form/ExerciseTextarea";
import { useRouter } from "next/router";
import { useState } from "react";

type AlternativeExerciseData = {
  question: string;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
}

const alternativeExerciseFormSchema = yup.object().shape({
  question: yup.string().required("O enunciado é obrigatório"),
  alternative1: yup.string().required("A alternativa é obrigatória"),
  alternative2: yup.string().required("A alternativa é obrigatória"),
  alternative3: yup.string().required("A alternativa é obrigatória"),
  alternative4: yup.string().required("A alternativa é obrigatória"),
});

type AlternativeExerciseProps = {
  levelId: string;
}

export default function AlternativeExercise({ levelId }: AlternativeExerciseProps) {

  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const createExercise = useCreateExerciseByLevel();

  const toast = useToast();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(alternativeExerciseFormSchema),
  });

  const handleCreateExercise: SubmitHandler<AlternativeExerciseData> = async (data, event) => {
    event.preventDefault();

    const answer = new Array(4);

    answer[0] = data.alternative1;
    answer[1] = data.alternative2;
    answer[2] = data.alternative3;
    answer[3] = data.alternative4;

    if (!correctAnswer) {
      toast({
        title: "Selecione uma alternativa correta",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    try {
      createExercise.mutateAsync({
        exercise: {
          type: 'alternative',
          question: data.question,
          answer: JSON.stringify(answer),
          correct_answer: answer[correctAnswer],
        },
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

        <RadioGroup
          as={VStack}
          onChange={setCorrectAnswer}
          value={correctAnswer}
        >
          <HStack w="100%">
            <Radio value="0" colorScheme="purple" />
            <ExerciseInput
              name="alternative1"
              placeholder="Alternativa 1"
              error={errors.alternative1}
              type="text"
              {...register('alternative1')}
            />
          </HStack>

          <HStack w="100%">
            <Radio value="1" colorScheme="purple" />
            <ExerciseInput
              name="alternative2"
              placeholder="Alternativa 2"
              error={errors.alternative2}
              type="text"
              {...register('alternative2')}
            />
          </HStack>

          <HStack w="100%">
            <Radio value="2" colorScheme="purple" />
            <ExerciseInput
              name="alternative3"
              placeholder="Alternativa 3"
              error={errors.alternative3}
              type="text"
              {...register('alternative3')}
            />
          </HStack>

          <HStack w="100%">
            <Radio value="3" colorScheme="purple" />
            <ExerciseInput
              name="alternative4"
              placeholder="Alternativa 4"
              error={errors.alternative4}
              type="text"
              {...register('alternative4')}
            />
          </HStack>
        </RadioGroup>
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
