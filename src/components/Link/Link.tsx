import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import clsx from "clsx";
import useStyles from "./styles";

type LinkBehaviourProps = {
  externalTarget?: string;
} & LinkProps;

const Link = React.forwardRef<any, LinkBehaviourProps>(
  ({ externalTarget = "_blank", href, to, className, ...props }, ref) => {
    const classes = useStyles();
    const destination = href || to;

    if (typeof destination === "string" && /^https?:\/\//.test(destination)) {
      return (
        <a
          className={clsx(classes.root, className)}
          href={destination}
          target={externalTarget}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </a>
      );
    } else {
      return <RouterLink className={clsx(classes.root, className)} ref={ref} to={destination} {...props} />;
    }
  }
);

Link.displayName = "Link";

export default Link;
