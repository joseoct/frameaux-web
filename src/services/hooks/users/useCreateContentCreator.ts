import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type CreateContentCreatorsProps = {
  name: string;
  password: string;
}

async function createContentCreator (contentCreator: CreateContentCreatorsProps) {
  const response = await api .post('content-creators', contentCreator)

  return response;
}

export function useCreateContentCreators () {
  return useMutation(createContentCreator, {
    onSuccess: () => {
      queryClient.invalidateQueries('content-creators');
    },
  });
}
