import React from "react";
import { Route, Switch } from "react-router-dom";
import MainLayout from "../utils/layouts/Main";

import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound";
import AppDetails from "../pages/AppDetails";

import { AppRouteProps } from "./types";

export const routesConfig: AppRouteProps[] = [
  { path: "/", exact: true, component: Home, layoutProps: { contractibleMenu: true } },
  { path: "/app-details/:appID", exact: true, component: AppDetails },
  // eslint-disable-next-line react/display-name
  { render: () => <NotFound /> },
];

function RouteWrapper({
  auth,
  component: Component,
  layout: Layout = MainLayout,
  layoutProps,
  render,
  role,
  ...rest
}: AppRouteProps) {
  const renderFunc = React.useMemo(() => {
    return (
      render ||
      ((props: any) => {
        if (!Component) {
          return <NotFound />;
        }

        const LayoutContainer = (
          <Layout {...layoutProps}>
            <Component {...props} />
          </Layout>
        );

        return LayoutContainer;
      })
    );
  }, [Component, render, auth, role, Layout, layoutProps]);

  return <Route render={renderFunc} {...rest} />;
}

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <Switch key="routes">
      {routesConfig.map((route) => (
        <RouteWrapper
          auth={route.auth}
          component={route.component}
          exact={route.exact}
          key="route-wrapper-keep-same-key-for-all-please"
          layout={route.layout}
          layoutProps={route.layoutProps}
          path={route.path}
          render={route.render}
          role={route.role}
        />
      ))}
    </Switch>
  );
};
