/**
 * Site-wide config: contacts, links. Update these for your deployment.
 */
export const SITE_CONFIG = {
  /** For partners: collaboration contact */
  partnersContact: {
    label: "Хотите обсудить коллаборацию?",
    href: "mailto:hello@onebridge.io",
    cta: "Написать",
  },
  /** For Tribe members: content ideas */
  tribeContact: {
    label: "Есть идея для контента?",
    href: "https://t.me/onetribe",
    cta: "В чат",
  },
  /** For everyone: follow updates */
  followContact: {
    label: "Следить за обновлениями",
    href: "https://t.me/onebridge",
    cta: "Telegram",
  },
} as const;
