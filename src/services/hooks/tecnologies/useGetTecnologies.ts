import { useQuery } from "react-query";
import { api } from "../../api";

type User = {
  id: string;
  name: string;
}

type UserTecnology = {
  user: User;
}

type TecnologiesResponse = {
  id: string;
  name: string;
  tecnology_image: string;
  UserTecnology: UserTecnology[];
}

async function getTecnologies(): Promise<TecnologiesResponse[]> {
  const { data } = await api.get('/tecnologies')

  return data; 
}

export function useGetTecnologies() {
  return useQuery(['tecnologies'], () => getTecnologies(), {
    staleTime: 5000,
  });
}

