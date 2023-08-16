import React from "react";
import { ModuleLoader } from "../../module-federation/Loader";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Got back home</Link>
        </li>
      </ul>
      <ModuleLoader url="http://localhost:3000/_next/static/chunks/remoteEntry.js" scope="remote" module="App" loading={<>Loading...</>} fallback={<>Error</>} />
    </>
  );
}
