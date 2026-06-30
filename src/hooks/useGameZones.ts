import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';

export interface GameZone {
  _id: string;
  locationId: string;
  zone: string;
  assignedGame: string;
  lanes: number;
  staff: string;
  unavailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GameZonePayload {
  locationId?: string;
  zone: string;
  assignedGame: string;
  lanes: number;
  staff: string;
  unavailable: boolean;
}

export const useGameZonesQuery = (locationId: string) => {
  return useQuery<GameZone[]>({
    queryKey: ['gameZones', locationId],
    queryFn: async () => {
      if (!locationId) return [];
      const response = await apiClient.get(`/game-zones?locationId=${locationId}`);
      return response.data.assignments;
    },
    enabled: !!locationId,
  });
};

export const useCreateGameZoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: GameZonePayload) => {
      const response = await apiClient.post('/game-zones', payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gameZones', variables.locationId] });
    },
  });
};

export const useUpdateGameZoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<GameZonePayload> & { locationId?: string } }) => {
      const response = await apiClient.patch(`/game-zones/${id}`, payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gameZones', variables.payload.locationId] });
    },
  });
};

export const useDeleteGameZoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; locationId?: string }) => {
      const response = await apiClient.delete(`/game-zones/${id}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gameZones', variables.locationId] });
    },
  });
};
