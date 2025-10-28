import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
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
