import { useQuery } from "react-query";
import { api } from "../../api";

type Tecnology = {
  id: string;
  name: string;
}

type UserTecnology = {
  tecnology: Tecnology;
}

type User = {
  id: string;
  name: string;
  email: string;
  UserTecnology: UserTecnology[];
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/content-creators', {
    params: {
      page: page,
    }
  })

  const totalCount = Number(headers['x-total-count']);

  return { 
    users: data,
    totalCount,
  };
}

export function useGetUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 5000,
  });
}

