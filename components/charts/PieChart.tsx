"use client";
import { Chart } from "react-google-charts";

type PageProps = {
  categoryLength: number;
  itemsLength: number;
  extrasLength: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
};

export default function PieChart({
  categoryLength,
  itemsLength,
  extrasLength,
  totalOrders,
  pendingOrders,
  completedOrders,
}: PageProps) {
  const data = [
    ["Option", "Value", { role: "style" }],
    ["Categories", categoryLength, "#4bbfc8"], // RGB value
    ["Products", itemsLength, "#1C66AA"], // English color name
    ["Extras", extrasLength, "#f07400"],
    ["Total Orders", totalOrders, "#CF2F68"], // CSS-style declaration
    ["Orders Completed", completedOrders, "#8AA43A"], // CSS-style declaration
    ["Orders Pending", pendingOrders, "#F57601"], // CSS-style declaration
  ];

  const options = {
    legend: "none",
  };

  return (
    <Chart
      chartType="ColumnChart"
      options={options}
      width="100%"
      height="100%"
      data={data}
    />
  );
}
