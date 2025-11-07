import React from "react";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

export const revalidate = 0;

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    take: 5,
    include: {
      assignedToUser: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Card>
      <Heading size="4">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue?.assignedToUser?.image || ""}
                      fallback={issue?.assignedToUser?.name?.[0] || ""}
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
