import { Box, Container } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const IssueFormSkeleton = () => {
  return (
    <Container mx={{ initial: "5", xs: "6", sm: "7", md: "9" }}>
      <Box className={"max-w-xl"}>
        <Skeleton height={"2rem"} />
        <Skeleton height={"20rem"} />
      </Box>
    </Container>
  );
};

export default IssueFormSkeleton;
