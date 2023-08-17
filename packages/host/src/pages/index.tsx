import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/remote">Got to Remote</Link>
      </li>
      <li>
        <Link href="/remote/123">Got to Remote 123</Link>
      </li>
    </ul>
  );
}
