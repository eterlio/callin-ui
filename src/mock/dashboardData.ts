import { IDashboardCard } from "../interface";

export const mockDashboardData = async (): Promise<IDashboardCard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return [
    {
      icon: "activity",
      title: "Total Income",
      amount: 2445,
    },
    {
      icon: "pie-chart",
      title: "Total Expenses",
      amount: 25,
    },
    {
      icon: "users",
      title: "Total Users",
      amount: 53,
    },
    {
      icon: "briefcase",
      title: "Total Organization",
      amount: 45,
    },
  ];
};
