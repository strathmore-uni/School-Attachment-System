import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    createOrganization,
  getOrganizationById,
  getOrganizations,
} from "@/lib/api/organizations";

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const organizationsQuery = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  return {
    organizations: organizationsQuery.data,
    isLoading: organizationsQuery.isLoading,
  };
  };

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
    return {
        createOrganization: useMutation({
        mutationFn: createOrganization,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
        },
        }),
    };
};

export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganizationById(id),
    enabled: !!id,
  });
};