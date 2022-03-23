import { useMutation } from "react-query";
import { api } from "../../api";
import { queryClient } from "../../queryClient";

type DeleteTopicProps = {
  technology_id: string;
  topic_id: string;
}

async function deleteTopic ({ topic_id, technology_id }: DeleteTopicProps) {
  const response = await api.delete(
    `/technologies/${technology_id}/topics/${topic_id}`,
  );

  return response;
}

export function useDeleteTopicByTechnology () {
  return useMutation(deleteTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries('topics');
    },
  });
}
