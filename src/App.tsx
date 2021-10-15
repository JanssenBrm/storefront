import React, { useEffect, useRef } from "react";
import { ThemeProvider, createMuiTheme, Theme } from "@material-ui/core/styles";
import { useTheme, Box, CircularProgress } from "@apisuite/fe-base";
import merge from "deepmerge";
import routes from "./routes";
import useStyles from "./app.style";
import { useStoreon } from ".";
import { getConfig } from "./utils/config";

const App: React.FC = () => {
  getConfig();
  const classes = useStyles();
  const { storefrontConfig, storefrontRequested } = useStoreon("storefrontConfig", "storefrontRequested");
  const defaultTheme = useTheme();

  const appTheme = useRef<Theme>(defaultTheme);

  useEffect(() => {
    if (storefrontConfig && storefrontConfig.theme) {
      appTheme.current = createMuiTheme(merge(defaultTheme, storefrontConfig.theme));

      console.log("defaultTheme ==========> ", defaultTheme);
      console.log("storefrontConfig.theme ==========> ", storefrontConfig.theme);
      console.log("appTheme.current ==========> ", appTheme.current);
    }
  }, [storefrontConfig]);

  return (
    <ThemeProvider theme={appTheme.current}>
      <div className={classes.root}>
        {!storefrontRequested && (
          <div className={classes.centerContent}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {storefrontRequested && <Box>{routes()}</Box>}
      </div>
    </ThemeProvider>
  );
};

export default App;
