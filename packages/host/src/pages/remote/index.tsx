import React from "react";
import { ModuleLoader } from "../../module-federation/Loader";
import Link from "next/link";

export default function RemotePage() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Got back home</Link>
        </li>
      </ul>
      <ModuleLoader
        url="http://localhost:3000/_next/static/chunks/remoteEntry.js"
        scope="remote"
        module="App"
        onMount={() => console.log("I'm mount")}
        onUnmount={() => console.log("bye!")}
        loading={<>Loading...</>}
        fallback={<>Error</>}
      />
    </>
  );
}
