import { useMutation } from "react-query";
import { queryClient } from "../../queryClient";

import { api } from "../../api";

async function deleteTechnology(technology_id: string): Promise<void> {
  const { data } = await api.delete(`/technologies/${technology_id}`);

  return data; 
}

export function useDeleteTechnology() {
  return useMutation(deleteTechnology, {
    onSuccess: () => {
      queryClient.invalidateQueries('technologies');
    },
  });
}

