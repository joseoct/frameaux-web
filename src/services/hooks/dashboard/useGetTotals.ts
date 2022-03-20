import { useQuery } from "react-query";
import { api } from "../../api";

type TotalsResponse = {
  totalContentCreators: number;
  totalStudents: number;
  totalTechnologies: number;
}

async function getTotals(): Promise<TotalsResponse> {
  const { data } = await api.get('/dashboard')

  return data; 
}

export function useGetTotals() {
  return useQuery(['totals'], () => getTotals(), {
    staleTime: 5000,
  });
}

