import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type CreateUserFormData = {
  name: string;
  password: string;
  password_confirmation: string;
}

async function createUser (user: CreateUserFormData) {
  return await api.post('users', {
    user: {
      ...user,
      created_at: new Date(),
    },
  });
}

export function useCreateUsers () {
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
}
