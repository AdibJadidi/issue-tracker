"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assigneeIssue = (userId: string) => {
    axios
      .patch(`/api/issue/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .then(() => {
        toast.success("Issue updated");
      })
      .catch(() => {
        toast.error("Failed to update issue");
      });
  };
  if (isLoading) return <Skeleton className="h-8 w-full" />;
  if (error) return <div>Error loading users</div>;

  return (
    <>
      <Select.Root
        onValueChange={assigneeIssue}
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000, //60s
  });

export default AssigneeSelect;
