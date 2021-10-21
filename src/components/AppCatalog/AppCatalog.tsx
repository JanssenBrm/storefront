import React from "react";
import { Avatar, Box, Chip, Grid, Typography, useTranslation } from "@apisuite/fe-base";

import { AppCard } from "../AppCard";
import Link from "../Link";
import { AppCatalogProps, CatalogAppDetails } from "./types";
import useStyles from "./styles";

const AppCatalog: React.FC<AppCatalogProps> = ({ appsToDisplay, catalogMode }) => {
  const classes = useStyles();

  const trans = useTranslation();

  const t = (string: string) => {
    return trans.t(`extensions.storefront.${string}`);
  };

  const generateAppCatalogEntry = (appDetails: CatalogAppDetails, index: number) => {
    const appSplitName = appDetails.name.split(" ");
    const appInitials = appSplitName[0].slice(0, 2);

    return (
      <AppCard
        cardContent={
          <>
            <div className={classes.appCatalogEntryTopDetails}>
              {appDetails.logo !== "" ? (
                <img className={classes.appCatalogEntryImage} src={appDetails.logo} />
              ) : (
                <Avatar className={classes.appCatalogEntryAvatar}>
                  <Typography variant="body1">{appInitials}</Typography>
                </Avatar>
              )}

              <div className={classes.appCatalogEntryNameAndOwnerContainer}>
                <Typography variant="body1" className={classes.appCatalogEntryName}>
                  {appDetails.name}
                </Typography>

                <Typography variant="subtitle2" className={classes.appCatalogEntryOwner}>
                  {appDetails.publisher}
                </Typography>
              </div>
            </div>

            <div className={classes.appCatalogEntryBottomDetails}>
              <Typography variant="body2" className={classes.appCatalogEntrySummary}>
                {appDetails.summary}
              </Typography>

              <div className={classes.appCatalogEntryLabelsContainer}>
                {appDetails.labels.length ? (
                  appDetails.labels.map((appLabel, index) => {
                    return (
                      <Box mr={1} key={`appLabel${index}`}>
                        <Chip className={classes.appCatalogEntryLabels} label={`${appLabel}`} />
                      </Box>
                    );
                  })
                ) : (
                  <Box mr={1}>
                    <Chip
                      className={classes.appCatalogEntryLabels}
                      label={`${t("appMarketplace.noLabelsProvidedText")}`}
                    />
                  </Box>
                )}
              </div>
            </div>
          </>
        }
        key={`appCatalogEntry${index}`}
      />
    );
  };

  const appCatalogEntries = appsToDisplay.map((appDetails, index) => {
    return (
      <Grid
        item
        key={`linkToApp${index}`}
        md={catalogMode && catalogMode === "publisher" ? "auto" : 4}
        style={{ width: 217 }}
      >
        <Link className={classes.appCatalogEntryLink} to={`/app-details/${appDetails.id}`}>
          {generateAppCatalogEntry(appDetails, index)}
        </Link>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {appCatalogEntries}
    </Grid>
  );
};

export default AppCatalog;
