import { RouteProps } from "react-router-dom";

export type AppRouteProps = RouteProps & {
  auth?: boolean;
  component?: React.ComponentType<any>;
  layout?: React.ComponentType<any>;
  layoutProps?: any;
  role?: string | string[];
};
