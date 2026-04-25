import { useState, useEffect } from "react";
import { getJobRolesService } from "@/services/jobRole.service";
import type { IJobRole } from "@/types/scanReport.types";

export const useJobRoles = () => {
  const [jobRoles, setJobRoles] = useState<IJobRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobRoles = async () => {
      setLoading(true);
      try {
        const roles = await getJobRolesService();
        if (roles) setJobRoles(roles);
      } finally {
        setLoading(false);
      }
    };
    fetchJobRoles();
  }, []);

  return { jobRoles, loading };
};
