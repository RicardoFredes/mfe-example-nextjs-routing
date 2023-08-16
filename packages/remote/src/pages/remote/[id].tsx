import { useRouter } from "next/router";
import React from "react";

export default function IdPage() {
  const router = useRouter();
  // TODO: implements router context to get query.id
  const queryId = React.useMemo(() => router.asPath.split("/").pop(), [router.query]);

  const goToRandom = () => {
    const randomId = (Math.random() * 100).toFixed();
    router.push(`/remote/${randomId}`);
  };

  console.log(router.query);

  return (
    <main>
      <h3>Id: {queryId}</h3>
      <br />
      <button onClick={goToRandom}>Change ID</button>
    </main>
  );
}
