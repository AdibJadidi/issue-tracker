"use client";
import {
  Box,
  Button,
  Callout,
  Container,
  Flex,
  Text,
  TextArea,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issue", data);
          router.push("/issues");
        } catch (error) {
          setError("An unexpected error occurred");
        }
      })}
    >
      <Container mx={{ initial: "5", xs: "6", sm: "7", md: "9" }}>
        {error && (
          <Callout.Root color="red" className="mb-4">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Flex direction="column" gap="2">
          <TextField.Root>
            <TextField.Input {...register("title")} placeholder="Title" />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE {...field} placeholder="Description" />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Box>
            <Button type="submit">Submit New Issue</Button>
          </Box>
        </Flex>
      </Container>
    </form>
  );
};

export default NewIssue;
