"use client";
import { Box, Button, Container, Flex, TextArea } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <Container mx={{ initial: "5", xs: "6", sm: "7", md: "9" }}>
      <Flex direction="column" gap="2">
        <TextField.Root>
          <TextField.Input placeholder="Title" />
        </TextField.Root>
        <SimpleMDE placeholder="Description" />
        <Box>
          <Button>Submit New Issue</Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default NewIssue;
