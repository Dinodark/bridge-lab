/**
 * Analytics event types for OneBridge.
 * Всё, что можем зафиксировать: клики, лайки, просмотры, ввод, источник, IP (через API).
 */

export type AnalyticsEventType =
  | "page_view"
  | "click"
  | "like"
  | "share"
  | "search"
  | "input"
  | "scroll"
  | "focus"
  | "blur"
  | "form_submit"
  | "link_click"
  | "custom";

export type BaseEvent = {
  /** Уникальный ID события */
  id: string;
  /** Тип события */
  type: AnalyticsEventType;
  /** Время события (ISO) */
  timestamp: string;
  /** Путь страницы */
  path: string;
  /** Референр (откуда пришли) */
  referrer?: string;
  /** User agent для бот-детекции */
  userAgent?: string;
  /** Язык браузера */
  language?: string;
  /** Разрешение экрана */
  screen?: { w: number; h: number };
  /** Время в зоне (мс) */
  timeOnPage?: number;
  /** Флаг бота (по userAgent) */
  isBot?: boolean;
};

export type ClickEvent = BaseEvent & {
  type: "click" | "link_click";
  /** Селектор/путь элемента (data-analytics-id или DOM path) */
  target?: string;
  /** Текст элемента */
  text?: string;
  /** href для ссылок */
  href?: string;
  /** Координаты клика */
  coords?: { x: number; y: number };
};

export type LikeEvent = BaseEvent & {
  type: "like";
  /** ID объекта (campaign, post, etc) */
  targetId?: string;
  /** Тип объекта */
  targetType?: string;
};

export type ShareEvent = BaseEvent & {
  type: "share";
  /** Какая страница/контент */
  shareTarget?: string;
  /** Куда поделились (copy, twitter, etc) */
  method?: string;
};

export type SearchEvent = BaseEvent & {
  type: "search";
  /** Поисковый запрос */
  query?: string;
  /** Результаты (кол-во) */
  resultsCount?: number;
};

export type InputEvent = BaseEvent & {
  type: "input";
  /** Имя поля */
  field?: string;
  /** Длина ввода (без самого текста — приватность) */
  length?: number;
};

export type ScrollEvent = BaseEvent & {
  type: "scroll";
  /** Процент прокрутки */
  scrollPercent?: number;
};

export type PageViewEvent = BaseEvent & {
  type: "page_view";
  /** Заголовок страницы */
  title?: string;
};

export type AnalyticsEvent =
  | ClickEvent
  | LikeEvent
  | ShareEvent
  | SearchEvent
  | InputEvent
  | ScrollEvent
  | PageViewEvent
  | (BaseEvent & { type: AnalyticsEventType });

/** Метаданные с сервера (IP, бот и т.д.) — заполняется API */
export type ServerMetadata = {
  ip?: string;
  country?: string;
  city?: string;
  isBot?: boolean;
  fingerprint?: string;
};
