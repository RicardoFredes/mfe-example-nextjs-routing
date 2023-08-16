import Link from "next/link";

export const Menu = () => {
  return (
    <ul>
      <li>
        <Link href="/remote/">Go to remote Home</Link>
      </li>
      <li>
        <Link href="/remote/test">Go to remote test</Link>
      </li>
      <li>
        <Link href="/remote/123">Go to remote dynamic id</Link>
      </li>
    </ul>
  );
};
