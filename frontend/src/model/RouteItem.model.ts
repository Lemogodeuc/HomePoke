import { ComponentType, FC } from "react";

// RouteItem is an interface for defining the application routes and navigation menu items
interface RouteItem {
  key: string;
  exact?: boolean;
  isRestricted?: boolean;
  isPrivate?: boolean;
  title: string;
  tooltip?: string;
  path: string;
  component: FC<{}>;
  enabled: boolean;
  icon?: ComponentType;
  appendDivider?: boolean;
}

export default RouteItem;
