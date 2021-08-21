import { FC, ReactElement } from "react";
import { List, Divider } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// components
import MenuItem from "./MenuItem";
// app routes
import { routes } from "../routes";
// interfaces
import RouteItem from "../model/RouteItem.model";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    nested: {
      marginLeft: theme.spacing(2),
    },
    selected: {
      transition: "box-shadow",
      transitionDuration: "1s",
      boxShadow: `0 0 3px ${theme.palette.primary.main}, 0 0 9px ${theme.palette.primary.main}, 0 0 11px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}`,
    },
  })
);

// functional component
const Menu: FC<{}> = (): ReactElement => {
  const classes = useStyles();

  return (
    <List>
      {routes.map((route: RouteItem) => (
        <>
          <MenuItem
            key={`${route.key}`}
            title={route.title}
            icon={route.icon}
            tooltip={route.tooltip}
            path={route.path}
            enabled={route.enabled}
            component={route.component}
          />
          {route.appendDivider && <Divider className={classes.divider} />}
        </>
      ))}
    </List>
  );
};

export default Menu;
