import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type CreateTechnologyFormData = {
  name: string;
  technology_image: File;
  content_creators_ids: string;
}

async function createTechnology (technology: FormData) {
  const response = await api.post('content-creators-technologies', technology)

  return response;
}

export function useCreateTechnologies () {
  return useMutation(createTechnology, {
    onSuccess: () => {
      queryClient.invalidateQueries('technologies');
    },
  });
}
