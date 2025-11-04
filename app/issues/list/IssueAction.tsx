import { Box, Button } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
const IssueAction = () => {
  return (
    <Box>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Box>
  );
};

export default IssueAction;
