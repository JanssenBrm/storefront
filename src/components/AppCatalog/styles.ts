import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  appCatalogEntryAvatar: {
    background: theme.palette.gradient.light,
    height: '40px',
    marginRight: theme.spacing(1.5),
    textTransform: 'uppercase',
    width: '40px',
  },

  appCatalogEntryBottomDetails: {
    display: 'block',
    width: '100%',
  },

  appCatalogEntrySummary: {
    color: theme.palette.text.secondary,
    display: '-webkit-box',
    height: '35px',
    lineHeight: '18px',
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
  },

  appCatalogEntryImage: {
    borderRadius: '50%',
    height: '40px',
    marginRight: theme.spacing(1.5),
    width: '40px',
  },

  appCatalogEntryLabel: {
    backgroundColor: theme.palette.grey['100'],
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    height: '27.5px',
    marginRight: theme.spacing(1),
    padding: theme.spacing(0, 1),
    width: 'fit-content',
  },

  appCatalogEntryLabels: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },

  appCatalogEntryLabelsContainer: {
    display: 'flex',
    height: '40px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  appCatalogEntryLink: {
    textDecoration: 'none',
  },

  appCatalogEntryName: {
    color: theme.palette.text.primary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  appCatalogEntryNameAndOwnerContainer: {
    display: 'block',
    width: '110px',
  },

  appCatalogEntryOwner: {
    color: theme.palette.text.primary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  appCatalogEntryText: {
    padding: theme.spacing(2, 1.5, 2, 0),
    width: '130px',
  },

  appCatalogEntryTopDetails: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    width: '100%',
  },

  appCatalogEntryVersion: {
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5, 1.5),
  },

  appCatalogEntryVersionAndAccess: {
    color: theme.palette.text.hint,
  },
}))
