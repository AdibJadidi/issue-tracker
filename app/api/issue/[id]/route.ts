import { IssueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";
import React from "react";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const valdation = IssueSchema.safeParse(body);
  if (!valdation.success) {
    return Response.json({ error: valdation.error.format() }, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return Response.json({ error: "Issue not found" }, { status: 404 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return Response.json(updatedIssue);
}
