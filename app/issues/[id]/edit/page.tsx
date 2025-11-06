import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

function getBaseUrl() {
  // Use Vercel's own URL for production
  if (process.env.VERCEL_URL) {
    // VERCEL_URL does NOT include the protocol (e.g., just 'issue-tracker-six-brown.vercel.app')
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
}
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default async function EditIssuePage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(`${getBaseUrl()}/api/issue/${params.id}`);

  if (!response.ok) {
    notFound();
  }

  const issue = await response.json();

  return <IssueForm issue={issue} />;
}
