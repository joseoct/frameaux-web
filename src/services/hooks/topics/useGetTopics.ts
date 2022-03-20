import { useQuery } from "react-query";
import { api } from "../../api";

type User = {
  id: string;
  name: string;
}

type UserTechnology = {
  user: User;
}

type TechnologiesResponse = {
  id: string;
  name: string;
  technology_image: string;
  UserTechnology: UserTechnology[];
}

async function getTopicsByTechnology(technologyId: string): Promise<TechnologiesResponse[]> {
  const { data } = await api.get(`/technologies/${technologyId}/topics`);

  return data; 
}

export function useGetTopics(technologyId: string) {
  return useQuery(['technologies'], () => getTopicsByTechnology(technologyId), {
    staleTime: 5000,
  });
}

