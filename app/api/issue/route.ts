import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});
export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const result = createIssueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.errors }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: result.data.title,
      description: result.data.description,
    },
  });

  return NextResponse.json({ newIssue }, { status: 201 });
};
