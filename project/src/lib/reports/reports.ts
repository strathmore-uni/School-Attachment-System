import custAxios from "@/hooks/custAxios";

export async function createReport(report: {
    report_title: string;
    content: string;
    week_number: number;
    activities: string;
    achievements: string;
    challenges: string;
    key_learnings: string;
    next_week_plans: string;
    attatchment_url: string;
}) {
    try {
        const result = await custAxios.post("/reports/create-report", report);
        console.log("Report created successfully:", result.data);
        return result.data;
    } catch (error) {
        console.error("Error creating report:", error);
    } 
}
  