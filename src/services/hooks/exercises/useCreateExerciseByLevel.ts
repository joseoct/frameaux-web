import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

export type Alternative = { 
  question: string;
  type: string;
  answer: string[];
  correct_answer: string;
}

export type Sequency = {
  question: string;
  type: string;
  correct_answer: string[];
}

type CreateExerciseProps = {
  level_id: string;
  exercise: Alternative | Sequency;
}

async function createExercise ({ exercise, level_id }: CreateExerciseProps) {
  const { data } = await api.post(
    `/technologies/topics/levels/${level_id}/${exercise.type}-exercise`,
    exercise,
  );

  return data;
}

export function useCreateExerciseByLevel () {
  return useMutation(createExercise, {
    onSuccess: () => {
      queryClient.invalidateQueries('exercises');
    },
  });
}
