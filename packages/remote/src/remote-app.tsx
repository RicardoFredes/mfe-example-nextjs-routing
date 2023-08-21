import React from "react";
import { Router, withRouter } from "next/router";
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
      <Pages />
    </AppProviders>
  );
}

export default withRouter(RemoteApp);

const Pages = () => {
  const [page, setPage] = React.useState<string>();

  const interceptRoute = (target?: string) => {
    const pathname = target || location.pathname;
    setPage(getFilePath(pathname));
  };

  React.useEffect(() => {
    interceptRoute();

    Router.events.on("beforeHistoryChange", interceptRoute);
    return () => Router.events.off("beforeHistoryChange", interceptRoute);
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
