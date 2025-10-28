import { IssueSchema } from "@/app/validationSchema";
import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const result = IssueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: result.data.title,
      description: result.data.description,
    },
  });

  return NextResponse.json({ newIssue }, { status: 201 });
};
