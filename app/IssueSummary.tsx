import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const container: { label: string; value: number; status: string }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap={"2"}>
      {container.map((item) => (
        <Card key={item.status}>
          <Flex direction={"column"}>
            <Link
              href={`/issues/list?status=${item.status}`}
              className="text-sm font-medium"
            >
              {item.label}
            </Link>
            <Text size="5" className="font-bold">
              {item.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
