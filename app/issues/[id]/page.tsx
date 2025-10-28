import { IssueStatusBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";

interface Props {
  params: {
    id: string;
  };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue?.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue?.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
