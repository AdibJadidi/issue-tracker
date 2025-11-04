"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") as Status | undefined;
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];
  const router = useRouter();
  return (
    <div>
      <Select.Root
        onValueChange={(value) =>
          router.push(
            `/issues/list` + (value !== "All" ? `?status=${value}` : "")
          )
        }
        defaultValue={status || undefined}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || "All"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default IssueStatusFilter;
