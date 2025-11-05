"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open, color: "#ef4444" },
    { label: "In Progress", value: inProgress, color: "#1f0099af" },
    { label: "Closed", value: closed, color: "#10b981" },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60}>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={_entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
