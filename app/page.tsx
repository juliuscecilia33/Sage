import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-black">Welcome to Sage</h1>
      </div>
      <div>
        <Link href="/dashboard" className={"text-black"} aria-current="page">
          Click here to enter cool dashboard
        </Link>
      </div>
    </div>
  );
}
