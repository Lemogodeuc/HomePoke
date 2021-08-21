// icons
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/BarChartOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

// components
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Scraper from "../pages/Scraper";
import Offers from "../pages/Offers";
import Settings from "../pages/Settings";
import Github from "../pages/Github";

// interface
import RouteItem from "../model/RouteItem.model";

// constants
import * as constants from "../utils/constants";

// define app routes
const routes: Array<RouteItem> = [
  {
    key: "router-home",
    exact: true,
    isRestricted: true,
    isPrivate: true,
    title: constants.MENU_TITLE_HOME,
    tooltip: "Home",
    path: "/",
    enabled: true,
    component: Home,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-login",
    exact: true,
    isRestricted: true,
    isPrivate: false,
    title: constants.PAGE_TITLE_LOGIN,
    tooltip: "Connexion",
    path: "/login",
    enabled: true,
    component: Login,
    icon: HomeIcon,
  },
  {
    key: "router-dashboard",
    exact: false,
    isRestricted: true,
    isPrivate: true,
    title: constants.PAGE_TITLE_DASHBOARD,
    tooltip: "Dashboard",
    path: "/dashboard",
    enabled: true,
    component: Dashboard,
    icon: DashboardIcon,
  },
  {
    key: "router-scraper",
    exact: false,
    isRestricted: true,
    isPrivate: true,
    title: constants.PAGE_TITLE_SCRAPER,
    tooltip: "Scraper",
    path: "/scraper",
    enabled: true,
    component: Scraper,
    icon: CloudDownloadIcon,
  },
  {
    key: "router-offers",
    exact: false,
    isRestricted: true,
    isPrivate: true,
    title: constants.PAGE_TITLE_OFFERS,
    tooltip: "Offres",
    path: "/offers",
    enabled: true,
    component: Offers,
    icon: LocalOfferIcon,
    appendDivider: true,
  },
  {
    key: "router-settings",
    exact: false,
    isRestricted: true,
    isPrivate: true,
    title: constants.PAGE_TITLE_SETTINGS,
    tooltip: "Settings",
    path: "/settings",
    enabled: true,
    component: Settings,
    icon: SettingsIcon,
  },
  {
    key: "router-github",
    exact: false,
    isRestricted: true,
    isPrivate: true,
    title: constants.PAGE_TITLE_GITHUB,
    tooltip: "GitHub",
    path: "/github",
    enabled: true,
    component: Github,
    icon: GitHubIcon,
  },
];

export default routes;
