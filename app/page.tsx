import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      <h1>Issue Tracker</h1>
      <Pagination itemCount={100} pageSize={10} currentPage={1} />
    </div>
  );
}
