import { Flex, Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingIssuesPage = () => {
  return (
    <div>
      <p>
        <Skeleton />
      </p>
      <p>
        <Skeleton />
      </p>
      <p>
        <Skeleton />
      </p>
      <p>
        <Skeleton />
      </p>
    </div>
  );
};

export default LoadingIssuesPage;
