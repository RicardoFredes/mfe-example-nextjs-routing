import { Router, useRouter } from "next/router";
import React from "react";

export default function IdPage() {
  const router = useRouter();

  const id = useWatchParam((pathname: string) => pathname.split("/").pop());

  const goToRandom = () => {
    const randomId = (Math.random() * 100).toFixed();
    router.push(`/remote/${randomId}`);
  };

  return (
    <main>
      <h3>Id: {id}</h3>
      <br />
      <button onClick={goToRandom}>Change ID</button>
    </main>
  );
}

const useWatchParam = (parser: (pathname: string) => string | undefined) => {
  const router = useRouter();

  const [value, setValue] = React.useState<string>();

  const interceptRouter = (target?: string) => {
    const pathname = target ? target.replace(/\?.*/, "") : location.pathname;
    const newValue = parser(pathname);
    setValue(newValue);
  };

  React.useEffect(() => {
    interceptRouter();

    Router.events.on("beforeHistoryChange", interceptRouter);
    return () => Router.events.off("beforeHistoryChange", interceptRouter);
  }, [router.asPath]);

  return React.useMemo(() => value, [value]);
};
