import { useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';

export interface GamePackage {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
}

export interface Game {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  media: string[];
  features: string[];
  packages: GamePackage[];
  duration: string;
  priceFrom: number;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GamesResponse {
  games: Game[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const useGamesQuery = () => {
  return useQuery<GamesResponse>({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await apiClient.get('/games');
      return response.data;
    },
  });
};
