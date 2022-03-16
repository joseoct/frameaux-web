import { useQuery } from "react-query";
import { api } from "../../api";

type TecnologiesResponse = {
  id: string;
  name: string;
  tecnology_image: string;
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

