import { useMutation } from "react-query";
import { queryClient } from "../../queryClient";

import { api } from "../../api";

async function deleteExercise(exercise_id: string): Promise<void> {
  const { data } = await api.delete(`/exercises/${exercise_id}`);

  return data; 
}

export function useDeleteExercise(topic_id: string) {
  return useMutation(deleteExercise, {
    onSuccess: () => {
      queryClient.invalidateQueries(['levels', topic_id]);
    },
  });
}

