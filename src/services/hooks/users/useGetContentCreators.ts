import { useQuery } from "react-query";
import { api } from "../../api";

type Technology = {
  id: string;
  name: string;
}

type ContentCreatorTechnology = {
  technology: Technology;
}

type ContentCreator = {
  id: string;
  name: string;
  email: string;
  UserTechnology: ContentCreatorTechnology[];
}

type GetContentCreatorsResponse = {
  totalCount: number;
  contentCreators: ContentCreator[];
}

async function getContentCreators(page: number): Promise<GetContentCreatorsResponse> {
  const { data, headers } = await api.get('/content-creators', {
    params: {
      page: page,
    }
  })

  const totalCount = Number(headers['x-total-count']);

  return { 
    contentCreators: data,
    totalCount,
  };
}

export function useGetContentCreators(page: number) {
  return useQuery(['content-creators', page], () => getContentCreators(page), {
    staleTime: 5000,
  });
}

