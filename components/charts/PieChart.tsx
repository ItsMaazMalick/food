"use client";
import { Chart } from "react-google-charts";

type PageProps = {
  categoryLength: number;
  itemsLength: number;
  extrasLength: number;
};

export default function PieChart({
  categoryLength,
  itemsLength,
  extrasLength,
}: PageProps) {
  const data = [
    ["Option", "Value", { role: "style" }],
    ["Categories", categoryLength, "#4bbfc8"], // RGB value
    ["Products", itemsLength, "#1C66AA"], // English color name
    ["Extras", extrasLength, "#f07400"],
    ["Total Orders", 10, "#CF2F68"], // CSS-style declaration
    ["Orders Completed", 9, "#8AA43A"], // CSS-style declaration
    ["Orders Pending", 1, "#F57601"], // CSS-style declaration
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
