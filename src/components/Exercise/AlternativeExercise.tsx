import { Flex, Stack, Text, Button, useToast, RadioGroup, Radio, VStack, Icon, HStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alternative, useCreateExerciseByLevel } from "@services/hooks/exercises/useCreateExerciseByLevel";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ExerciseInput } from "@components/Form/ExerciseInput";
import { ExerciseTextarea } from "@components/Form/ExerciseTextarea";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

type AlternativeExerciseData = {
  question: string;
  answers: {
    value: string;
  }[];
}

const alternativeExerciseFormSchema = yup.object().shape({
  question: yup.string().required('O enunciado é obrigatório'),
  answers: yup
    .array()
    .min(2, 'É necessário pelo menos 2 alternativas')
    .max(4, 'O máximo de alternativas é de 4')
    .required('As alternativas são obrigatórias')
    .of(
      yup.object().shape({
        value: yup.string().required('O valor é obrigatório'),
      }),
    ),
});

type AlternativeExerciseProps = {
  levelId: string;
}

export default function AlternativeExercise({ levelId }: AlternativeExerciseProps) {

  const createExercise = useCreateExerciseByLevel();

  const toast = useToast();

  const router = useRouter();

  const [correctAnswer, setCorrectAnswer] = useState<string>("");

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
    name: "answers", // unique name for your Field Array
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ value: '' })
      append({ value: '' })
    }

    setFocus('question');

  }, [append, fields.length, setFocus]);

  const handleCreateExercise: SubmitHandler<AlternativeExerciseData> = async (data, event) => {
    event.preventDefault();

    if (!correctAnswer) {
      toast({
        title: "Selecione uma alternativa correta",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    const answers = data.answers.map(item => item.value);

    try {
      createExercise.mutateAsync({
        exercise: {
          type: 'alternative',
          question: data.question,
          correct_answer: data.answers[correctAnswer].value,
          answer: JSON.stringify(answers),
        } as Alternative,
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
    if (fields.length < 4) {
      append({});
    }
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
          <Text>Alternativas</Text>

          <Icon onClick={handleAddInput} boxSize={8} as={RiAddLine} />
          <Icon onClick={handleSubInput} boxSize={8} as={RiSubtractLine} />

          {errors.answers && (
            <Text color="red.500">{errors.answers.message}</Text>
          )}
        </HStack>

        <RadioGroup
          as={VStack}
          onChange={setCorrectAnswer}
          value={correctAnswer}
        >
          {fields.map((field, index) => (
            <HStack key={field.id} w="100%">
              <Radio
                value={index.toString()}
                colorScheme="purple"
              />
              <ExerciseInput
                key={index}
                name={`sequency.${index}`}
                placeholder={`Alternativa ${index + 1}`}
                error={errors.answers && errors.answers[index]}
                type="text"
                {...register(`answers.${index}.value`)}
              />
            </HStack>
          ))}
        </RadioGroup>

        {errors.correct_answer && (
          <Text color="red.500">{errors.correct_answer.message}</Text>
        )}
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
