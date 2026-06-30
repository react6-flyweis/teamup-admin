import { useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';
import type { HeaderCategory } from '@/components/ManageHeader/types';

export interface HeaderCategoriesResponse {
  categories: HeaderCategory[];
}

export const useHeaderCategoriesQuery = () => {
  return useQuery<HeaderCategoriesResponse>({
    queryKey: ['header-categories'],
    queryFn: async () => {
      const response = await apiClient.get('/menu-items/categories');
      return response.data;
    },
  });
};
