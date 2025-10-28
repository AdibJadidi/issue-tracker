import { Skeleton } from "@/app/components";
import { Box, Container } from "@radix-ui/themes";
const LoadingNewIssuePage = () => {
  return (
    <Container mx={{ initial: "5", xs: "6", sm: "7", md: "9" }}>
      <Box className={"max-w-xl"}>
        <Skeleton />
        <Skeleton height={"20rem"} />
      </Box>
    </Container>
  );
};

export default LoadingNewIssuePage;
