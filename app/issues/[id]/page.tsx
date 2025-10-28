import { IssueStatusBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
} from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap={"4"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box className="md:col-span-1">
        <Flex gap="2" direction={"column"}>
          <EditIssueButton issueId={issue?.id} />
          <DeleteIssueButton issueId={issue?.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
