import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type Topic = { 
  name: string;
  layer: number;
  explanation: string;
}

type CreateTopicProps = {
  technology_id: string;
  topic: Topic;
}

async function createTopic ({ topic, technology_id }: CreateTopicProps) {
  const response = await api.post(`/technologies/${technology_id}`, topic);

  return response;
}

export function useCreateTopic () {
  return useMutation(createTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries('topics');
    },
  });
}
