"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Container,
  Flex,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFromSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/issue", data);
      router.push("/issues");
    } catch (error) {
      setIsLoading(false);
      setError("An unexpected error occurred");
    }
  });
  return (
    <form onSubmit={onFromSubmit}>
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
            <Button type="submit" disabled={isLoading}>
              Submit New Issue
              {isLoading && <Spinner />}
            </Button>
          </Box>
        </Flex>
      </Container>
    </form>
  );
};

export default NewIssue;
