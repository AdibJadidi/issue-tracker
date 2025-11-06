import authOptions from "@/app/auth/AuthOptions";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { cache } from "react";

const fetchIssue = cache((id: number) => {
  return prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
});
interface Props {
  params: {
    id: string;
  };
}
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"4"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box className="md:col-span-1">
          <Flex gap="2" direction={"column"}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue?.id} />
            <DeleteIssueButton issueId={issue?.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) {
    notFound();
  }
  return {
    title: issue.title,
    description: "Detail of issue " + issue.id,
  };
}
