import React from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

type LinkBehaviourProps = {
  externalTarget?: string
} & LinkProps

const Link = React.forwardRef<any, LinkBehaviourProps>(
  ({ externalTarget = '_blank', href, to, ...props }, ref) => {
    const destination = href || to

    if (typeof destination === 'string' && /^https?:\/\//.test(destination)) {
      return (
        <a
          href={destination}
          target={externalTarget}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </a>
      )
    } else {
      return <RouterLink ref={ref} to={destination} {...props} />
    }
  }
)

Link.displayName = 'Link'

export default Link
