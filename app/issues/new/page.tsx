"use client";
import React from "react";
import { Box, Button, Container, Flex, TextArea } from "@radix-ui/themes";
import Link from "next/link";
import { TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <Container mx={{ initial: "5", xs: "6", sm: "7", md: "9" }}>
      <Flex direction="column" gap="2">
        <TextField.Root>
          <TextField.Input placeholder="Title" />
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button>Submit</Button>
      </Flex>
    </Container>
  );
};

export default NewIssue;
