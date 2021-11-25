import React from "react";
import { Box, Fab, Typography, useConfig, useTranslation } from "@apisuite/fe-base";
import { Menus } from "@apisuite/extension-ui-types";
import LocaleSelect from "../language/LocaleSelect";
import SvgIcon from "../SvgIcon";
import { Logo } from "../Logo";

import useStyles from "./styles";
import { FooterProps, MenuSection, MenuSections } from "./types";
import { useStoreon } from "../../index";

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
  const { supportURL } = useConfig();
  const [t] = useTranslation();

  const menuSections: MenuSections = {
    [Menus.FooterProducts]: {
      title: t("footer.apiProductsMenu.menuTitle"),
      entries: [
        {
          label: t("footer.apiProductsMenu.menuItemOne"),
          route: "/dashboard/subscriptions",
        },
        {
          label: t("footer.apiProductsMenu.menuItemTwo"),
          route: "/documentation",
        },
      ],
    },

    [Menus.FooterSupport]: {
      title: t("footer.supportMenu.menuTitle"),
      entries: [
        {
          label: t("footer.supportMenu.menuItemTwo"),
          route: supportURL,
        },
      ],
    },

    [Menus.FooterDashboard]: {
      title: t("footer.dashboardMenu.menuTitle"),
      entries: [
        {
          label: t("footer.dashboardMenu.menuItemOne"),
          route: "/dashboard/apps",
        },
        {
          label: t("footer.dashboardMenu.menuItemTwo"),
          route: "/profile/team",
        },
      ],
    },

    [Menus.FooterProfile]: {
      title: t("footer.profileMenu.menuTitle"),
      entries: [
        {
          label: t("footer.profileMenu.menuItemOne"),
          route: "/profile/security",
        },
        {
          label: t("footer.profileMenu.menuItemTwo"),
          route: "/profile/organisation",
        },
      ],
    },
    [Menus.FooterLegal]: {
      title: t("footer.legalMenu.menuTitle"),
      entries: [
        {
          label: t("footer.legalMenu.termsAndConditions.title"),
          route: t("footer.legalMenu.termsAndConditions.url"),
        },
        {
          label: t("footer.legalMenu.imprint.title"),
          route: t("footer.legalMenu.imprint.url"),
        },
        {
          label: t("footer.legalMenu.privacyPolicy.title"),
          route: t("footer.legalMenu.privacyPolicy.url"),
        },
        {
          label: t("footer.legalMenu.serviceLevelAgreement.title"),
          route: t("footer.legalMenu.serviceLevelAgreement.url"),
        },
        {
          label: t("footer.legalMenu.cancellationPolicy.title"),
          route: t("footer.legalMenu.cancellationPolicy.url"),
        },
      ],
    },

    // TODO: Come up with a solution to a bug that manifests upon logging out with this extension active
    // [Menus.FooterStatus]: {
    //   title: t('footer.apisCloudExtensionMenu.menuTitle', { config }),
    //   entries: [],
    // },
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

const Policy = ({ name }: { name: string }) => {
  const [t] = useTranslation();
  const classes = useStyles();
  return (
    <Typography variant="subtitle2" component="a" href={t(`footer.policies.${name}.url`)} className={classes.policy}>
      {t(`footer.policies.${name}.text`)}
    </Typography>
  );
};

const doesPolicyExist = (t: (key: string) => string, name: string): boolean => {
  const urlTrans = `footer.policies.${name}.url`;
  return t(urlTrans) !== urlTrans && t(urlTrans) !== "";
};

const Policies = () => {
  const [t] = useTranslation();
  const policies = ["termsOfUse", "privacy", "cookie"];
  return <>{policies.map((p: string) => doesPolicyExist(t, p) && <Policy name={p} />)}</>;
};

// Footer

const Footer: React.FC<FooterProps> = () =>
  // TODO: Come up with a solution to a bug that manifests upon logging out with this extension active
  // { auth }
  {
    const classes = useStyles();
    const { storefrontConfig } = useStoreon("storefrontConfig");
    const { ownerInfo, navigation } = useConfig();
    const [t] = useTranslation();
    const portalName = storefrontConfig.portalName;

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
              <Logo src={ownerInfo.logo} icon={navigation.title.iconFallbackName} />

              <Box clone ml={1}>
                <Typography variant="h4">{portalName}</Typography>
              </Box>
            </div>

            <div className={classes.sectionsContainer}>
              <div className={classes.section}>
                <SubSection subMenu={Menus.FooterSupport} />
              </div>

              <div className={classes.section}>
                <SubSection subMenu={Menus.FooterDashboard} />
              </div>

              <div className={classes.section}>
                <SubSection subMenu={Menus.FooterProfile} />
              </div>

              <div className={classes.section}>
                <SubSection subMenu={Menus.FooterLegal} />
              </div>

              {/* TODO: Come up with a solution to a bug that manifests upon logging out with this extension active */}
              {/* {
auth.user?.role.name === 'admin' &&
<div className={classes.section}>
{renderSubSection(settings, Menus.FooterStatus, roleName)}
</div>
} */}
            </div>
          </div>

          <div className={classes.rightFooterContentsContainer}>
            <SocialLinks />

            <div className={classes.copyrightContainer}>
              <Typography
                variant="subtitle2"
                component="a"
                href={t("footer.copyrights.websiteUrl")}
                rel="noopener noreferrer"
                target="_blank"
                className={classes.copyrightAnchor}
              >
                &copy; {new Date().getFullYear()} {t("footer.copyrights.website")}
              </Typography>
              <Typography variant="subtitle2">{t("footer.copyrights.allRightsReserved")}</Typography>
              <Policies />
            </div>

            <LocaleSelect />
          </div>
        </div>
      </footer>
    );
  };

export default Footer;
