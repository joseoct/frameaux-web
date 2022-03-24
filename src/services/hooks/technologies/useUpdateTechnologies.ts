import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type UpdateTechnology = {
  technology_id: string;
  updatedTechnology: {
    name: string;
    content_creators_ids: string;
  }
}

async function updateTechnology ({ updatedTechnology, technology_id}: UpdateTechnology) {
  const response = await api.put(
    `content-creators-technologies/${technology_id}`,
    updatedTechnology
  );

  return response;
}

export function useUpdateTechnologies () {
  return useMutation(updateTechnology, {
    onSuccess: () => {
      queryClient.invalidateQueries('technologies');
    },
  });
}
