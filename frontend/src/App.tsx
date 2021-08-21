import { useReducer } from "react";
import { createMuiTheme, Theme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
// components
import Layout from "./components/Layout";

// theme
import { lightTheme, darkTheme } from "./theme/Theme";

// app routes
import { routes, PublicRoute, PrivateRoute } from "./routes";

// constants
import { APP_TITLE } from "./utils/constants";

// types
import RouteItem from "./model/RouteItem.model";

// context
import { AppProvider } from "./context";

function App() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
                {/* for each route config, a react route is created */}
                {routes
                  .filter(({ isPrivate }) => isPrivate)
                  .map((item: RouteItem) => (
                    <PrivateRoute
                      key={item.key}
                      path={item.path}
                      exact={item.exact as boolean}
                      component={item.component}
                      rest={item}
                    />
                  ))}
                {routes
                  .filter(({ isPrivate }) => !isPrivate)
                  .map((item: RouteItem) => {
                    return (
                      <PublicRoute
                        key={item.key}
                        path={item.path}
                        isRestricted={item.isRestricted as boolean}
                        exact={item.exact as boolean}
                        component={item.component}
                        rest={item}
                      />
                    );
                  })}
              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </AppProvider>
    </>
  );
}

export default App;
