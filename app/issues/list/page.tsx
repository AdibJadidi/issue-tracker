import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import { Link, IssueStatusBadge } from "@/app/components";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status?: Status };
}
const issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const isStatusValid = statuses.includes(searchParams?.status as Status);
  const issues = await prisma.issue.findMany({
    where: {
      status: isStatusValid ? searchParams?.status : undefined,
    },
  });

  return (
    <Flex direction={"column"} className="space-y-2">
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues?.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue?.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue?.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default issues;
