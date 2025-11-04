import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import { Link, IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
interface Props {
  searchParams: { status?: Status; orderBy?: keyof Issue; page: string };
}
const issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const isStatusValid = statuses.includes(searchParams?.status as Status);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Title", value: "title", className: "" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const isOrderByValid = columns.some(
    (column) => column.value === searchParams.orderBy
  );

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const where = { status: isStatusValid ? searchParams?.status : undefined };
  console.log("page", page);
  const issues = await prisma.issue.findMany({
    where,
    ...(isOrderByValid &&
      searchParams.orderBy && {
        orderBy: {
          [searchParams.orderBy]: "asc",
        },
      }),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  console.log("issues", issues);

  const totalIssueSize = await prisma.issue.count({ where });
  return (
    <Flex direction={"column"} className="space-y-2">
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {isOrderByValid && searchParams?.orderBy === column.value && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination
        itemCount={totalIssueSize}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default issues;
