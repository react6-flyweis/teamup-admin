import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';

export interface GamePricing {
  _id: string;
  game: {
    _id: string;
    name: string;
    slug: string;
  };
  location: {
    _id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
  };
  label: string;
  period: 'peak' | 'non_peak';
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  price: number;
  currency: string;
  pricingType: 'per_person' | 'per_lane' | string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GamePricingResponse {
  pricing: GamePricing[];
}

export const useGamePricingQuery = () => {
  return useQuery<GamePricingResponse>({
    queryKey: ['gamePricing'],
    queryFn: async () => {
      const response = await apiClient.get('/game-pricing');
      return response.data;
    },
  });
};

export interface GamePricingPayload {
  _id?: string;
  game?: string;
  gameId: string;
  location?: string;
  locationId: string;
  label: string;
  period: 'peak' | 'non_peak';
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  price: number;
  pricingType: string;
  currency?: string;
  isActive?: boolean;
}

export const useCreateGamePricingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: GamePricingPayload) => {
      const response = await apiClient.post('/game-pricing', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamePricing'] });
    },
  });
};

export const useUpdateGamePricingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: GamePricingPayload }) => {
      const response = await apiClient.put(`/game-pricing/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamePricing'] });
    },
  });
};

export const useDeleteGamePricingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/game-pricing/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamePricing'] });
    },
  });
};
