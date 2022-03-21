import { useQuery } from "react-query";
import { api } from "../../api";

type Topic = {
  id: string;
  name: string;
  layer: number;
  explanation: string;
}

type Response = {
  layerTopics: Topic[][];
  maxLayer: number;
}

async function getTopicsByTechnology(technologyId: string): Promise<Response> {
  const { data } = await api.get<Topic[][]>(`/technologies/${technologyId}/topics`);

  return {
    layerTopics: data,
    maxLayer: data.length,
  }; 
}

export function useGetTopics(technologyId: string) {
  return useQuery(['topics', technologyId], () => getTopicsByTechnology(technologyId));
}

