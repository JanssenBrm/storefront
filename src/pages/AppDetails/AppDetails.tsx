import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import clsx from "clsx";

import { Avatar, Box, Button, Chip, Typography, useTranslation } from "@apisuite/fe-base";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import AppCatalog from "../../components/AppCatalog";
import Link from "../../components/Link";
import { MarkdownDisplayer } from "../../components/MarkdownDisplayer";
import useStyles from "./styles";
import { GET_APP_DETAILS, GET_PUBLISHER_APPS_SAMPLE } from "../../store/marketplace/types";
import { useStoreon } from "../../";
import { PORTAL_URL } from "../../constants/endpoints";

const AppDetails: React.FC = () => {
  const classes = useStyles();

  const {
    dispatch,
    publisherAppsSample,
    retrievedPublisherAppsSample,
    retrievedSelectedAppDetails,
    selectedAppDetails,
  } = useStoreon(
    "publisherAppsSample",
    "retrievedPublisherAppsSample",
    "retrievedSelectedAppDetails",
    "selectedAppDetails"
  );

  const trans = useTranslation();

  const t = (s: string, ...args: ({ publisher: string } | undefined)[]) => {
    return trans.t(`extensions.storefront.${s}`, ...args);
  };

  // Retrieves the app's ID from the browser window's URL
  const { appID } = useParams<any>();

  /* Triggers the retrieval and storage (on the app's Store, under 'marketplace > selectedAppDetails')
  of all information we presently have on the currently selected marketplace app. */
  useEffect(() => {
    if (appID !== "") dispatch(GET_APP_DETAILS, appID);
  }, [appID]);

  // Currently selected Marketplace app's details logic

  const [appNameInitials, setAppNameInitials] = useState("...");

  useEffect(() => {
    const appNameInitialsArray = selectedAppDetails.name.split(" ");
    const appNameInitials =
      appNameInitialsArray.length >= 2
        ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
        : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`;

    setAppNameInitials(appNameInitials);
  }, [selectedAppDetails]);

  const isURLEmpty = (providedURL: string) => {
    return providedURL === null || providedURL === "";
  };

  // All images - as well as all thumbnails - must be of the same size
  const imagesArray = selectedAppDetails
    ? selectedAppDetails?.images?.map((image) => {
        return {
          original: image,
          thumbnail: image,
        };
      })
    : [];

  // 4. 'More (Marketplace apps) from publisher' section logic

  // Retrieves - at most - 3 last updated apps from the publisher
  useEffect(() => {
    if (retrievedSelectedAppDetails) {
      dispatch(GET_PUBLISHER_APPS_SAMPLE, { orgID: selectedAppDetails.orgId, appID: selectedAppDetails.id });
    }
  }, [retrievedSelectedAppDetails]);

  return (
    <main>
      <section className={classes.appDetailsContainer}>
        {retrievedSelectedAppDetails ? (
          <>
            <section className={classes.leftAppDetailsContainer}>
              <div className={classes.topMostSubSection}>
                {selectedAppDetails && selectedAppDetails.logo !== "" ? (
                  <img className={classes.appImage} src={selectedAppDetails.logo} />
                ) : (
                  <Avatar className={classes.appAvatar}>{appNameInitials ? appNameInitials : "..."}</Avatar>
                )}

                <Button
                  className={classes.appSubscribeButton}
                  href={`${PORTAL_URL}/auth/signin?destinationPath=${encodeURI("/marketplace/app-details/" + appID)}`}
                >
                  {t("appMarketplace.appDetails.signInToSubscribe")}
                </Button>

                {selectedAppDetails && selectedAppDetails.directUrl && (
                  <Box mt={2}>
                    <Link className={classes.accessAppButton} to={selectedAppDetails.directUrl}>
                      <Button color="primary" fullWidth variant="outlined">
                        {t("appMarketplace.appDetails.accessAppButtonLabel")}
                        <LaunchRoundedIcon />
                      </Button>
                    </Link>
                  </Box>
                )}
              </div>

              <hr
                className={clsx(classes.subSectionSeparator, {
                  [classes.addedSpacing]: selectedAppDetails && selectedAppDetails.directUrl,
                })}
              />

              <div>
                <Box pb={1}>
                  <Typography variant="body1">
                    <strong>{t("appMarketplace.appDetails.subSectionTitleOne")}</strong>
                  </Typography>
                </Box>

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.websiteUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.websiteUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.appLinks.websiteURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.tosUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.tosUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.appLinks.tosURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.privacyUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.privacyUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.appLinks.privacyPolicyURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.youtubeUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.youtubeUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.appLinks.youTubeURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.supportUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.supportUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.appLinks.supportURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails &&
                  isURLEmpty(selectedAppDetails.privacyUrl) &&
                  isURLEmpty(selectedAppDetails.supportUrl) &&
                  isURLEmpty(selectedAppDetails.tosUrl) &&
                  isURLEmpty(selectedAppDetails.websiteUrl) &&
                  isURLEmpty(selectedAppDetails.youtubeUrl) && (
                    <Typography variant="body1">{t("appMarketplace.appDetails.appLinks.noAppLinks")}</Typography>
                  )}
              </div>

              <hr className={classes.subSectionSeparator} />

              <div>
                <Box pb={1}>
                  <Typography variant="body1">
                    <strong>{t("appMarketplace.appDetails.subSectionTitleTwo")}</strong>
                  </Typography>
                </Box>

                <Typography variant="body1">
                  {selectedAppDetails && selectedAppDetails.organization.name
                    ? selectedAppDetails.organization.name
                    : "..."}
                </Typography>
              </div>

              <hr className={classes.subSectionSeparator} />

              <div>
                <Box pb={1}>
                  <Typography variant="body1">
                    <strong>{t("appMarketplace.appDetails.subSectionTitleThree")}</strong>
                  </Typography>
                </Box>

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.organization.tosUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.organization.tosUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.publisherLinks.tosURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.organization.privacyUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.organization.privacyUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.publisherLinks.privacyPolicyURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails && !isURLEmpty(selectedAppDetails.organization.supportUrl) && (
                  <Typography variant="body1">
                    <a
                      className={classes.providedLink}
                      href={selectedAppDetails.organization.supportUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t("appMarketplace.appDetails.publisherLinks.supportURL")}
                    </a>
                  </Typography>
                )}

                {selectedAppDetails &&
                  isURLEmpty(selectedAppDetails.organization.privacyUrl) &&
                  isURLEmpty(selectedAppDetails.organization.supportUrl) &&
                  isURLEmpty(selectedAppDetails.organization.tosUrl) && (
                    <Typography variant="body1">
                      {t("appMarketplace.appDetails.publisherLinks.noPublisherLinks")}
                    </Typography>
                  )}
              </div>
            </section>

            <section className={classes.rightAppDetailsContainer}>
              <Box pb={1.5}>
                <Typography variant="h1">
                  {selectedAppDetails && selectedAppDetails.name ? selectedAppDetails.name : "..."}
                </Typography>
              </Box>

              {selectedAppDetails && selectedAppDetails.shortDescription && (
                <Box pb={1.5}>
                  <Typography variant="h5">{selectedAppDetails.shortDescription}</Typography>
                </Box>
              )}

              <Box display="flex" flexWrap="wrap">
                {selectedAppDetails && selectedAppDetails.labels.length ? (
                  selectedAppDetails.labels.map((label, index) => {
                    return (
                      <Box mr={1} key={`appLabel${index}`}>
                        <Chip className={classes.appChip} label={`${label}`} />
                      </Box>
                    );
                  })
                ) : (
                  <Box mr={1}>
                    <Chip className={classes.appChip} label={`${t("appMarketplace.appDetails.noLabels")}`} />
                  </Box>
                )}
              </Box>

              {/* The following condition is to be taken as explicit - meaning, we need to
explicitly check if the length of 'imagesArray' is, indeed, anything other
than zero. Not doing so will result in unwanted consequences. */}
              {imagesArray.length !== 0 && (
                <Box pt={5}>
                  <ImageGallery
                    additionalClass={classes.appImageGallery}
                    items={imagesArray}
                    showNav={false}
                    showPlayButton={false}
                  />
                </Box>
              )}

              <Box pt={5} pb={3}>
                <Typography variant="h3">{t("appMarketplace.appDetails.partOfAppOverviewTitle")}</Typography>
              </Box>

              <Box pb={1}>
                <Typography variant="body1">
                  {selectedAppDetails && selectedAppDetails.description ? (
                    <MarkdownDisplayer content={selectedAppDetails.description} />
                  ) : (
                    t("appMarketplace.appDetails.noAppOverview")
                  )}
                </Typography>
              </Box>

              {retrievedPublisherAppsSample && !!publisherAppsSample.length && (
                <>
                  <Box pt={4}>
                    <hr className={classes.subSectionSeparator} />
                  </Box>

                  <Box pb={3} pt={5}>
                    <Typography variant="h6">
                      {t("appMarketplace.appDetails.moreByPublisherTitle", {
                        publisher:
                          selectedAppDetails && selectedAppDetails.organization.name
                            ? selectedAppDetails.organization.name
                            : "...",
                      })}
                    </Typography>
                  </Box>

                  <Box pb={3}>
                    <AppCatalog appsToDisplay={publisherAppsSample} />
                  </Box>

                  {/* <Box>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`${BASE_URI}/publisher-details/${selectedAppDetails.organization.id}`}
                    >
                      <Button color="secondary" variant="outlined">
                        {t("appMarketplace.appDetails.viewMoreButtonLabel")}
                      </Button>
                    </Link>
                  </Box> */}
                </>
              )}
            </section>
          </>
        ) : (
          <Box py={3} display="flex" justifyContent="center" width={1}>
            <Typography variant="body1">{t("appMarketplace.appDetails.loadingAppDetails")}</Typography>
          </Box>
        )}
      </section>
    </main>
  );
};

export default AppDetails;
