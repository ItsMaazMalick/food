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
    ["Categories", categoryLength, "#f6a119"], // RGB value
    ["Items", itemsLength, "#f6a119"], // English color name
    ["Extras", extrasLength, "#f6a119"],
    ["Total Orders", 50, "#f6a119"], // CSS-style declaration
    ["Orders Completed", 49, "#f6a119"], // CSS-style declaration
    ["Orders Pending", 1, "#f6a119"], // CSS-style declaration
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
