import { injectScript } from "@module-federation/nextjs-mf/utils";
import React from "react";

interface ModuleLoaderProps {
  url: string;
  scope: string;
  module: string;
  loading: JSX.Element;
  fallback: JSX.Element;
  [props: string]: any;
}
export const ModuleLoader = ({
  url,
  scope,
  module,
  loading,
  fallback,
  ...props
}: ModuleLoaderProps) => {
  React.useEffect(() => {
    setReady(true);
  }, []);
  const [ready, setReady] = React.useState(false);
  if (!ready) return loading;

  const Component = React.lazy(async () => {
    try {
      return injectScript({ global: scope, url })
        .then((componentModule) => componentModule.get(module))
        .then((factory) => factory());
    } catch (error) {
      console.error(error);
      return { default: () => fallback };
    }
  });

  return (
    <React.Suspense fallback={loading}>
      <Component {...props} />
    </React.Suspense>
  );
};
