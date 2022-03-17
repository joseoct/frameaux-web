import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type CreateTecnologyFormData = {
  name: string;
  tecnology_image: File;
  content_creators_ids: string;
}

async function createTecnology (tecnology: FormData) {
  const response = await api .post('content-creators-tecnologies', tecnology)

  return response;
}

export function useCreateTecnologies () {
  const toast = useToast();

  return useMutation(createTecnology, {
    onSuccess: () => {
      queryClient.invalidateQueries('tecnologies');
    },
  });
}
