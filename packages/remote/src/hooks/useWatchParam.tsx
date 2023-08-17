import React from "react";
import { Router } from "next/router";

type Parser = (pathname: string) => string | undefined;

export const useWatchParam = (pattern: string | Parser) => {
  const [value, setValue] = React.useState<string>();

  const interceptRouter = (target?: string) => {
    const pathname = target ? target.replace(/\?.*/, "") : location.pathname;
    const toParser = typeof pattern === "function" ? pattern : defaultParser(pattern);
    const newValue = toParser(pathname);
    setValue(newValue);
  };

  React.useEffect(() => {
    interceptRouter();

    Router.events.on("beforeHistoryChange", interceptRouter);
    return () => Router.events.off("beforeHistoryChange", interceptRouter);
  }, []);

  return React.useMemo(() => value, [value]);
};

const defaultParser = (pattern: string) => (pathname: string) => {
  const regex = pattern.replace(/\[.*?\]/, "(.*)");
  return pathname.replace(new RegExp(regex), "$1");
};
