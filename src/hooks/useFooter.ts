import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';

export interface FooterData {
  companyInfo: {
    officeAddress: string;
    phoneNumber: string;
    copyrightText: string;
  };
  socialMediaLinks: {
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
  };
}

export interface FooterContent {
  _id: string;
  section: string;
  data: FooterData;
  isActive: boolean;
}

export interface FooterResponse {
  content: FooterContent;
}

export interface UpdateFooterPayload {
  section: string;
  data: FooterData;
  isActive: boolean;
}

export const useFooterQuery = () => {
  return useQuery<FooterResponse>({
    queryKey: ['footer-content'],
    queryFn: async () => {
      const response = await apiClient.get('/site-content/footer');
      return response.data;
    },
  });
};

export const useUpdateFooterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateFooterPayload) => {
      const response = await apiClient.patch('/site-content/footer', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footer-content'] });
    },
  });
};
