import React from "react";
import { useConfig, useTranslation, Fab, Typography, Box } from "@apisuite/fe-base";
import { Menus } from "@apisuite/extension-ui-types";
import LocaleSelect from "../language/LocaleSelect";
import SvgIcon from "../SvgIcon";
import { Logo } from "../Logo";

import useStyles from "./styles";
import { MenuSection, MenuSections } from "./types";
import { useStoreon } from "../../";
import { PORTAL_URL } from "../../constants/endpoints";

const SocialLinks = () => {
  const classes = useStyles();
  const { socialURLs } = useConfig();

  if (!socialURLs || !socialURLs.length) {
    return null;
  }

  return (
    <div className={classes.iconsContainer}>
      {socialURLs.map((socialUrl, index) => {
        switch (socialUrl.name) {
          case "facebook":
          case "github":
          case "gitlab":
          case "instagram":
          case "linkedin":
          case "reddit":
          case "twitter":
            return (
              <a
                key={`${index}-${socialUrl.name}`}
                className={classes.iconAnchor}
                href={socialUrl.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon size={24} name={socialUrl.name} />
              </a>
            );

          default:
            return (
              <a key={`${index}-web`} href={socialUrl.url} target="_blank" rel="noopener noreferrer">
                <SvgIcon size={24} name="earth" />
              </a>
            );
        }
      })}
    </div>
  );
};

const SubSection = ({ subMenu }: { subMenu: string }) => {
  const classes = useStyles();
  const { storefrontConfig } = useStoreon("storefrontConfig");
  const trans = useTranslation();

  const t = (string: string, ...args: ({ portalName: string } | undefined)[]) => {
    return trans.t(`extensions.marketplace.${string}`, ...args);
  };

  const menuSections: MenuSections = {
    [Menus.FooterProducts]: {
      title: "",
      entries: [
        {
          label: t("footer.portal", { portalName: storefrontConfig?.portalName || "" }),
          route: `${PORTAL_URL}/home`,
        },
        {
          label: t("footer.documentation"),
          route: `${PORTAL_URL}/documentation`,
        },
        {
          label: t("footer.apiProducts"),
          route: `${PORTAL_URL}/api-products`,
        },
      ],
    },

    [Menus.FooterDocumentation]: {
      title: "",
      entries: [
        {
          label: t("footer.marketplace"),
          route: `${PORTAL_URL}/marketplace`,
        },
      ],
    },
  };

  const section: MenuSection = menuSections[subMenu];
  const allEntries = [...section.entries];

  return (
    <div key={subMenu}>
      <Typography variant="body1">{section.title}</Typography>

      <>
        {allEntries.map((entry) => {
          const { label, ...anchorProps } = entry;

          return (
            <Typography component="p" variant="overline" key={entry.label}>
              {entry.route && entry.route !== "#" ? (
                <a {...anchorProps} href={entry.route} className={classes.subSectionAnchor}>
                  {label}
                </a>
              ) : (
                label
              )}
            </Typography>
          );
        })}
      </>
    </div>
  );
};

// Footer

const Footer: React.FC = () => {
  const classes = useStyles();
  const { ownerInfo, navigation } = useConfig();
  const { storefrontConfig } = useStoreon("storefrontConfig");
  const [t] = useTranslation();

  const handleFabClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.footerToTopShortcutContainer}>
        <Fab size="small" color="primary" onClick={handleFabClick}>
          <SvgIcon name="chevron-up" size={24} />
        </Fab>
      </div>

      <div className={classes.footerContentsContainer}>
        <div className={classes.leftFooterContentsContainer}>
          <div className={classes.logoAndPortalNameContainer}>
            <Logo
              src={storefrontConfig?.storefrontLogo || ownerInfo.logo}
              icon={storefrontConfig?.navigation?.title?.iconFallbackName || navigation.title.iconFallbackName}
            />

            <Box clone ml={1}>
              <Typography variant="h4">{storefrontConfig?.portalName || ""}</Typography>
            </Box>
          </div>

          <div className={classes.sectionsContainer}>
            <div>
              <SubSection subMenu={Menus.FooterProducts} />
            </div>

            <div className={classes.section}>
              <SubSection subMenu={Menus.FooterDocumentation} />
            </div>
          </div>
        </div>

        <div className={classes.rightFooterContentsContainer}>
          <SocialLinks />

          <div className={classes.copyrightContainer}>
            <Typography
              variant="subtitle2"
              component="a"
              href="https://apisuite.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              &copy; {new Date().getFullYear()} {t("footer.copyrights.website")}
            </Typography>

            <Typography variant="subtitle2">{t("footer.copyrights.allRightsReserved")}</Typography>
          </div>

          <LocaleSelect />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
