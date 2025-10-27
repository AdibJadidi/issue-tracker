import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
interface Props {
  params: {
    id: string;
  };
}
const IssueDetailPage = async ({ params }: Props) => {
  await delay(2000);
  const issue = await prisma.issue?.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap={"2"} my={"2"}>
        <IssueStatusBadge status={issue?.status} />
        <p>{issue?.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt={"4"}>
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
