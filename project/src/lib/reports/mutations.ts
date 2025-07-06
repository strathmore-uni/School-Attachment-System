import { useMutation } from "@tanstack/react-query";
import { createReport } from "./reports";

export const useSubmitReport = () => {
  return useMutation({
    mutationFn: (report: {
      report_title: string;
      content: string;
      week_number: number;
      activities: string;
      achievements: string;
      challenges: string;
      key_learnings: string;
      next_week_plans: string;
      attatchment_url: string;
    }) => createReport(report),
  });
};

