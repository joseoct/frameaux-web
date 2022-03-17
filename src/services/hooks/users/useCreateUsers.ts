import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type CreateUserFormData = {
  name: string;
  password: string;
}

async function createUser (user: CreateUserFormData) {
  const response = await api .post('content-creators', user)

  return response;
}

export function useCreateUsers () {
  const toast = useToast();

  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
}
