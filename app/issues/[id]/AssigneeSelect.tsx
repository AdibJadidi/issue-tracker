"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000, //60s
  });

  if (isLoading) return <Skeleton className="h-8 w-full" />;
  if (error) return <div>Error loading users</div>;

  return (
    <Select.Root
      onValueChange={(userId) => {
        axios.patch(`/api/issue/${issue.id}`, {
          assignedToUserId: userId === "unassigned" ? null : userId,
        });
      }}
      defaultValue={issue.assignedToUserId || "unassigned"}
    >
      <Select.Trigger placeholder="Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={"unassigned"}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
