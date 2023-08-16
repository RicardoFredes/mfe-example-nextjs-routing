import React from "react";
import { Router } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { AppProviders } from "@/components/AppProviders";

export default function RemoteApp() {
  console.log("[Remote]: RemoteApp")
  return (
    <AppProviders >
      <Pages />
    </AppProviders>
  );
}

const Pages = () => {
  const [page, setPage] = React.useState<string>();
  const interceptRouter = (target: string) => setPage(getFilePath(target));

  React.useEffect(() => {
    const target = `${location.pathname}${location.search}`;
    interceptRouter(target);

    Router.events.on("beforeHistoryChange", interceptRouter);
    return () => Router.events.off("beforeHistoryChange", interceptRouter);
  }, []);

  if (typeof page !== "string") return <>404</>;
  return (
    <ErrorBoundary fallback={<>Error...</>}>
      <Page page={page} />
    </ErrorBoundary>
  );
};

const Page = ({ page }: { page: string }) => {
  const Component = React.lazy(() => import(`./pages${page}`));
  return (
    <React.Suspense fallback="Carregando...">
      <Component />
    </React.Suspense>
  );
};

const getFilePath = (pathname: string) => {
  try {
    const {
      staticRoutes,
      dynamicRoutes,
    } = require("../.next/routes-manifest.json");
    const allRoutes = [].concat(staticRoutes, dynamicRoutes);
    for (const { regex, page } of allRoutes) {
      const match = new RegExp(regex);
      if (match.test(pathname)) return page;
    }
  } catch (error) {
    console.error(`[MFE]: Not found page to "${pathname}"`);
    console.error(error);
  }
};
