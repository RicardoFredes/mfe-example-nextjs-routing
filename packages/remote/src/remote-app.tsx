import React from "react";
import { Router, withRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { AppProviders } from "./components/AppProviders";

interface RemoteAppProps {
  onUnmount?: Function;
  onMount?: Function;
}

const { staticRoutes, dynamicRoutes } = require("../.next/routes-manifest.json");

function RemoteApp(props: RemoteAppProps) {
  React.useEffect(() => {
    props.onMount?.({
      routesManifest: { staticRoutes, dynamicRoutes },
    });

    return () => props.onUnmount?.();
  }, []);
  return (
    <AppProviders>
      <ErrorBoundary fallback={<>Error...</>}>
        <Pages />
      </ErrorBoundary>
    </AppProviders>
  );
}

export default withRouter(RemoteApp);

const Pages = () => {
  const [page, setPage] = React.useState<string>();

  const interceptRouter = (target?: string) => {
    const pathname = target || location.pathname;
    setPage(getFilePath(pathname));
  };

  React.useEffect(() => {
    interceptRouter();

    Router.events.on("beforeHistoryChange", interceptRouter);
    return () => Router.events.off("beforeHistoryChange", interceptRouter);
  }, []);

  if (typeof page !== "string") return <>404</>;

  return <Page page={page} />;
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
