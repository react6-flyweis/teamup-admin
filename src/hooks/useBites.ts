import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';

export interface FoodCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FoodItem {
  _id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  calories?: string;
  price: number;
  tags?: string[];
  imageUrl?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Drink {
  _id: string;
  name: string;
  slug: string;
  category: string; // cocktails, beers, draught, mocktails, soft-drinks, shots, wine, other
  description?: string;
  price: number;
  isAlcoholic: boolean;
  imageUrl?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FoodComboItem {
  title: string;
  subtitle: string;
  pizza: string;
  bevvies: string;
  burger: string;
  welcomeBevy: string;
  shots: string;
  order: number;
  isActive: boolean;
}

export interface FoodCombosSection {
  title: string;
  items: FoodComboItem[];
}

export interface FoodDrinksSiteContent {
  _id: string;
  section: string;
  data: {
    foodCombos?: FoodCombosSection;
  };
  isActive: boolean;
}

// 1. Food Categories Hooks
export const useFoodCategoriesQuery = () => {
  return useQuery<FoodCategory[]>({
    queryKey: ['food-categories'],
    queryFn: async () => {
      const response = await apiClient.get('/menu/categories?includeInactive=true');
      return Array.isArray(response.data) ? response.data : (response.data.categories || response.data.data || []);
    },
  });
};

export const useCreateFoodCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<FoodCategory>) => {
      const response = await apiClient.post('/menu/categories', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-categories'] });
    },
  });
};

// 2. Food Items Hooks
export const useFoodItemsQuery = () => {
  return useQuery<FoodItem[]>({
    queryKey: ['food-items'],
    queryFn: async () => {
      const response = await apiClient.get('/menu/items?includeInactive=true');
      return Array.isArray(response.data) ? response.data : (response.data.items || response.data.menuItems || response.data.data || []);
    },
  });
};

export const useCreateFoodItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<FoodItem>) => {
      const response = await apiClient.post('/menu/items', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-items'] });
    },
  });
};

export const useUpdateFoodItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, payload }: { slug: string; payload: Partial<FoodItem> }) => {
      const response = await apiClient.patch(`/menu/items/${slug}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-items'] });
    },
  });
};

export const useDeleteFoodItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      const response = await apiClient.delete(`/menu/items/${slug}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-items'] });
    },
  });
};

// 3. Drinks Hooks
export const useDrinksQuery = () => {
  return useQuery<Drink[]>({
    queryKey: ['drinks'],
    queryFn: async () => {
      const response = await apiClient.get('/drinks?includeInactive=true');
      return Array.isArray(response.data) ? response.data : (response.data.drinks || response.data.data || []);
    },
  });
};

export const useCreateDrinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Drink>) => {
      const response = await apiClient.post('/drinks', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drinks'] });
    },
  });
};

export const useUpdateDrinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, payload }: { slug: string; payload: Partial<Drink> }) => {
      const response = await apiClient.patch(`/drinks/${slug}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drinks'] });
    },
  });
};

export const useDeleteDrinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) => {
      const response = await apiClient.delete(`/drinks/${slug}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drinks'] });
    },
  });
};

export interface FoodDrinksSiteContentResponse {
  content: FoodDrinksSiteContent;
}

// 4. Site Content (Combos) Hooks
export const useFoodDrinksContentQuery = () => {
  return useQuery<FoodDrinksSiteContentResponse>({
    queryKey: ['food-drinks-content'],
    queryFn: async () => {
      const response = await apiClient.get('/site-content/food-drinks');
      return response.data;
    },
  });
};

export const useUpdateFoodDrinksContentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { data: { foodCombos?: FoodCombosSection }; isActive?: boolean }) => {
      const response = await apiClient.patch('/site-content/food-drinks', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-drinks-content'] });
    },
  });
};
