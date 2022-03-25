import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type Topic = { 
  name: string;
  layer: number;
  explanation: string;
}

type UpdateTopicProps = {
  topic_id: string;
  topic: Topic;
}

async function updateTopic ({ topic_id, topic }: UpdateTopicProps) {
  const response = await api.put(
    `/topics/${topic_id}`,
    topic
  );

  return response;
}

export function useUpdateTopic () {
  return useMutation(updateTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries('topics');
    },
  });
}
