import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL!;
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
