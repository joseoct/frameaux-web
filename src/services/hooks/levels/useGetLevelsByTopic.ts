import { useQuery } from "react-query";
import { api } from "../../api";

type Exercise = {
  id: string;
  question: string;
  level_id: string;
  type: string;
}

type Level = {
  id: string;
  difficulty: number;
  Exercise: Exercise[];
}

type Response = {
  levels: Level[];
}

async function getLevelsByTopics(topic_id: string): Promise<Response> {
  const { data } = await api.get<Level[]>(`/technologies/topics/${topic_id}/levels`);

  return {
    levels: data,
  }; 
}

export function useGetLevelsByTopics(topic_id: string) {
  return useQuery(['levels', topic_id], () => getLevelsByTopics(topic_id));
}

