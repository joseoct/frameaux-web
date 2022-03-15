import { useQuery } from "react-query";
import { api } from "../../api";

type User = {
  id: string;
  name: string;
  email: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users/content-creators', {
    params: {
      page: page,
    }
  })

  // const totalCount = Number(headers['x-total-count']);
  const totalCount = 20;

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

