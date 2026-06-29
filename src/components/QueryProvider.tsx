import React, { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Configure standard query client options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Turn off automatic refetch on window focus for consistent UX
      retry: 1, // Limit retries to prevent spamming server
      staleTime: 5 * 60 * 1000, // 5 minutes stale time
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
