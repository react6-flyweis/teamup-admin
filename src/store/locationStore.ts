import { create } from 'zustand';
import type { Location } from '@/hooks/useLocations';

interface LocationState {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
