import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
interface Props {
  searchParams: IssueQuery;
}
const issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const isStatusValid = statuses.includes(searchParams?.status as Status);

  const isOrderByValid = columnNames.some(
    (column) => column === searchParams.orderBy
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
      <IssueTable issues={issues} searchParams={searchParams} />
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
