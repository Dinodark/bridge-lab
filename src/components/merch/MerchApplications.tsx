"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount } from "@/hooks/useAnalyticsCount";
import { isLiked, setLiked } from "@/lib/analytics/likedStorage";
import FlameIcon from "@/components/icons/FlameIcon";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";

// ============================================================
// TRANSLATIONS — RU / DE (Applications keys only)
// ============================================================
const TRANSLATIONS = {
  ru: {
    applicationsTitle: "Applications",
    applicationsSubtitle: "Бренд в реальном мире — digital и физические носители",
    sectionLabel: "Brand Guidelines",
    merchBerlin: "Merch — Berlin Edition",
    berlinDesc: "Огненный дизайн OneTribe с акцентом BERLIN. Чёрный фон, градиентные формы.",
    merchTshirt: "Merch — T-Shirt",
    tshirtAlt: "OneTribe футболка — фото на модели",
    classicTee: "Classic Tee — Minimal Logo",
    classicTeeDesc:
      "Логотип по центру груди. Градиентный символ + wordmark. Минимализм, который говорит сам за себя.",
    availableColors: "Доступные цвета: White, Black, Deep Purple",
    physicalWaterBottle: "Physical — Water Bottle",
    waterBottleAlt: "OneTribe бутылка воды — логотип на этикетке",
    waterBottleTitle: "OneTribe Water Bottle",
    waterBottleDesc:
      'Бутылка воды с этикеткой onetribe. «one» в градиенте (purple → pink → orange → cyan), «tribe» — чёрный.',
    formatLabel: "Формат:",
    styleLabel: "Стиль:",
    waterBottleFormat: "wrap print",
    waterBottleStyle: "белая этикетка, логотип по центру",
    physicalStickerPack: "Physical — Sticker Pack",
    stickerPackTitle: "OneTribe Sticker Pack",
    stickerPackDesc:
      "6 стикеров в фирменном стиле. Градиентные фоны, белая обводка, мотивационные фразы (RU/EN/DE). Для мессенджеров и соцсетей.",
    stickerFormat: "512 × 512px",
    stickerStyle: "белая обводка 4px",
    physicalCarSticker: "Physical — Car Window Sticker",
    carStickerAlt: "OneTribe наклейка на заднее стекло автомобиля",
    carStickerTitle: "OneTribe Car Sticker",
    carStickerDesc:
      'Наклейка на заднее стекло. «one» в градиенте (purple → pink → orange), «tribe» — белый. Крупный шрифт, читаемость с расстояния.',
    carStickerFormat: "под размер стекла",
    carStickerStyle: "виниловая наклейка, съёмная",
    digitalStories: "Digital — Stories / Reels",
    tribeAwakeningStories: "Tribe Awakening Stories",
    storiesDesc:
      "Тёмный фон + градиентные пятна. Создаёт ощущение живого медиа. Энергия, вдохновение, движение.",
    storiesFormat: "1080 × 1920px",
    storiesFont: "Inter Tight Bold",
    storiesBg: "#0a0a1a + gradient blobs",
    fontLabel: "Шрифт:",
    bgLabel: "Фон:",
    digitalInviteCard: "Digital — Invite Card",
    inviteCardTitle: "Личный QR-код приглашения",
    inviteCardDesc:
      "Карточка, которую клиент получает, когда хочет поделиться приглашением в сообщество с другом. QR-код ведёт на персональную ссылку-приглашение. Код формата INVITE-XXXXXX.",
    contextLabel: "Контекст:",
    inviteContext: "раздел «Пригласить» в приложении",
    inviteFormat: "карточка 280×400px, share / export",
    physicalFlag: "Physical — Flag",
    flagAlt: "OneTribe flag mockup — white flag with onetribe logo",
    flagTitle: "OneTribe Flag",
    flagDesc:
      'Белый флаг с логотипом onetribe по центру. «one» в градиенте (purple → pink → orange), «tribe» — чёрный. Формат 2:3.',
    flagFormat: "900 × 1350px (2:3)",
    flagBg: "белый (#FFFFFF)",
    physicalPinBadge: "Physical — Pin Badge",
    pinBadgeAlt: "OneTribe pin badge — gradient circle with tribe text",
    pinBadgeTitle: "OneTribe Pin Badge",
    pinBadgeDesc:
      'Круглый значок с градиентом (cyan → lavender → pink) и белым словом «tribe». Глянцевая выпуклая поверхность.',
    pinFormat: "круг",
    pinStyle: "pin badge с застёжкой",
    physicalRollup: "Physical — Roll-up Banner",
    rollupAlt: "OneTribe roll-up banners — vertical stand banners with gradient",
    rollupTitle: "OneTribe Roll-up",
    rollupDesc:
      "Вертикальный роллап-баннер с градиентным фоном (cyan → pink → purple). Логотип tribe, заголовок, CTA-кнопка. Стенд на мероприятиях.",
    rollupFormat: "850 × 2000mm",
    variantsLabel: "Варианты:",
    rollupVariants: "с мокапом приложения или отзывами",
    physicalChocolate: "Physical — Chocolate Bar",
    chocolateAlt: "OneTribe chocolate bars — wrapped and unwrapped",
    chocolateTitle: "OneTribe Chocolate",
    chocolateDesc:
      "Шоколадный мерч с логотипом tribe. Обёртка с иридисцентным градиентом (голубой, розовый, фиолетовый). Тёмная плитка с тиснением.",
    wrapLabel: "Обёртка:",
    chocolateWrap: "иридисцентный градиент",
    chocolateStyle: "cyan, purple, pink, peach",
    brandAtGlance: "Brand at a glance",
    glanceItems: [
      {
        name: "Tribe in one word",
        size: "Community",
        note: "Племя. Связь. Настоящие люди.",
      },
      {
        name: "Voice pillars",
        size: "Authentic · Bold · Human",
        note: "Прямо, без корпоратива, с энергией движения",
      },
      {
        name: "Key hashtags",
        size: "#onetribe #tribelife",
        note: "Соцсети, UGC, мероприятия",
      },
      {
        name: "Community moments",
        size: "Офлайн → онлайн",
        note: "Встречи, события, живые связи",
      },
      {
        name: "Gradient when",
        size: "CTA · Hero · Праздник",
        note: "Акценты, призывы, эмоциональные блоки",
      },
      {
        name: "Collab ready",
        size: "Partnership",
        note: "Партнёрства, амбассадоры, коллабы",
      },
    ],
    inviteFriend: "Пригласи друга в Tribe",
    share: "Поделиться",
    storiesQuestion: "Ты готов к настоящему?",
    storiesTagline: "Одно племя. Один вектор. Начни сегодня.",
    joinCta: "Присоединиться →",
  },
  de: {
    applicationsTitle: "Applications",
    applicationsSubtitle: "Die Marke in der realen Welt — digital und physische Träger",
    sectionLabel: "Brand Guidelines",
    merchBerlin: "Merch — Berlin Edition",
    berlinDesc: "OneTribe Feuer-Design mit BERLIN-Akzent. Schwarzer Hintergrund, Verlaufsformen.",
    merchTshirt: "Merch — T-Shirt",
    tshirtAlt: "OneTribe T-Shirt — Foto auf Model",
    classicTee: "Classic Tee — Minimal Logo",
    classicTeeDesc:
      "Logo zentriert auf der Brust. Verlauf-Symbol + Wordmark. Minimalismus, der für sich spricht.",
    availableColors: "Verfügbare Farben: White, Black, Deep Purple",
    physicalWaterBottle: "Physical — Water Bottle",
    waterBottleAlt: "OneTribe Wasserflasche — Logo auf Etikett",
    waterBottleTitle: "OneTribe Water Bottle",
    waterBottleDesc:
      'Wasserflasche mit onetribe-Etikett. «one» im Verlauf (purple → pink → orange → cyan), «tribe» — schwarz.',
    formatLabel: "Format:",
    styleLabel: "Stil:",
    waterBottleFormat: "wrap print",
    waterBottleStyle: "weißes Etikett, Logo zentriert",
    physicalStickerPack: "Physical — Sticker Pack",
    stickerPackTitle: "OneTribe Sticker Pack",
    stickerPackDesc:
      "6 Sticker im Markenstil. Verlaufs-Hintergründe, weiße Kontur, motivierende Slogans (RU/EN/DE). Für Messenger und Social Media.",
    stickerFormat: "512 × 512px",
    stickerStyle: "weiße Kontur 4px",
    physicalCarSticker: "Physical — Auto-Heckfenster-Aufkleber",
    carStickerAlt: "OneTribe Aufkleber auf der Heckscheibe",
    carStickerTitle: "OneTribe Car Sticker",
    carStickerDesc:
      'Aufkleber für die Heckscheibe. «one» im Verlauf (purple → pink → orange), «tribe» — weiß. Große Schrift, gute Lesbarkeit aus der Entfernung.',
    carStickerFormat: "an Scheibengröße anpassbar",
    carStickerStyle: "Vinyl-Aufkleber, abziehbar",
    digitalStories: "Digital — Stories / Reels",
    tribeAwakeningStories: "Tribe Awakening Stories",
    storiesDesc:
      "Dunkler Hintergrund + Verlaufs-Flecken. Schafft das Gefühl von lebendigen Medien. Energie, Inspiration, Bewegung.",
    storiesFormat: "1080 × 1920px",
    storiesFont: "Inter Tight Bold",
    storiesBg: "#0a0a1a + gradient blobs",
    fontLabel: "Schrift:",
    bgLabel: "Hintergrund:",
    digitalInviteCard: "Digital — Invite Card",
    inviteCardTitle: "Persönlicher Einladungs-QR-Code",
    inviteCardDesc:
      "Karte, die Nutzer erhalten, wenn sie eine Einladung in die Community teilen möchten. QR-Code führt zur persönlichen Einladungs-URL. Code-Format INVITE-XXXXXX.",
    contextLabel: "Kontext:",
    inviteContext: "Bereich «Einladen» in der App",
    inviteFormat: "Karte 280×400px, Share / Export",
    physicalFlag: "Physical — Flag",
    flagAlt: "OneTribe Flaggen-Mockup — weiße Flagge mit onetribe Logo",
    flagTitle: "OneTribe Flag",
    flagDesc:
      'Weiße Flagge mit onetribe-Logo zentriert. «one» im Verlauf (purple → pink → orange), «tribe» — schwarz. Format 2:3.',
    flagFormat: "900 × 1350px (2:3)",
    flagBg: "weiß (#FFFFFF)",
    physicalPinBadge: "Physical — Pin Badge",
    pinBadgeAlt: "OneTribe Pin Badge — Verlaufskreis mit tribe Text",
    pinBadgeTitle: "OneTribe Pin Badge",
    pinBadgeDesc:
      'Runder Anstecker mit Verlauf (cyan → lavender → pink) und dem weißen Wort «tribe». Glänzende gewölbte Oberfläche.',
    pinFormat: "rund",
    pinStyle: "Pin Badge mit Verschluss",
    physicalRollup: "Physical — Roll-up Banner",
    rollupAlt: "OneTribe Roll-up Banner — vertikale Standbanner mit Verlauf",
    rollupTitle: "OneTribe Roll-up",
    rollupDesc:
      "Vertikales Roll-up-Banner mit Verlaufs-Hintergrund (cyan → pink → purple). Tribe-Logo, Überschrift, CTA-Button. Stand bei Events.",
    rollupFormat: "850 × 2000mm",
    variantsLabel: "Varianten:",
    rollupVariants: "mit App-Mockup oder Testimonials",
    physicalChocolate: "Physical — Chocolate Bar",
    chocolateAlt: "OneTribe Schokoladentafeln — verpackt und ausgepackt",
    chocolateTitle: "OneTribe Chocolate",
    chocolateDesc:
      "Schokoladen-Merch mit tribe-Logo. Verpackung mit irisierendem Verlauf (blau, pink, lila). Dunkle Tafel mit Prägung.",
    wrapLabel: "Verpackung:",
    chocolateWrap: "irisierender Verlauf",
    chocolateStyle: "cyan, purple, pink, peach",
    brandAtGlance: "Brand at a glance",
    glanceItems: [
      {
        name: "Tribe in one word",
        size: "Community",
        note: "Stamm. Verbindung. Echte Menschen.",
      },
      {
        name: "Voice pillars",
        size: "Authentic · Bold · Human",
        note: "Direkt, ohne Corporate, mit Bewegungsenergie",
      },
      {
        name: "Key hashtags",
        size: "#onetribe #tribelife",
        note: "Social Media, UGC, Events",
      },
      {
        name: "Community moments",
        size: "Offline → Online",
        note: "Treffen, Events, lebendige Verbindungen",
      },
      {
        name: "Gradient when",
        size: "CTA · Hero · Feier",
        note: "Akzente, Aufrufe, emotionale Blöcke",
      },
      {
        name: "Collab ready",
        size: "Partnership",
        note: "Partnerschaften, Botschafter, Kollaborationen",
      },
    ],
    inviteFriend: "Lade einen Freund in Tribe ein",
    share: "Teilen",
    storiesQuestion: "Bist du bereit für das Echte?",
    storiesTagline: "Ein Stamm. Ein Vektor. Starte heute.",
    joinCta: "Beitreten →",
  },
} as const;

type Lang = keyof typeof TRANSLATIONS;
type T = (typeof TRANSLATIONS)[Lang];

// ============================================================
// Styles
// ============================================================
const CARD_STYLE = {
  padding: 40,
  borderRadius: 24,
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.04)",
} as const;

const APP_BLOCK_STYLE = {
  padding: "48px 0",
  marginBottom: 64,
  borderBottom: "1px solid rgba(0,0,0,0.04)",
} as const;

// ============================================================
// Section component
// ============================================================
function Section({
  title,
  subtitle,
  sectionLabel = "Brand Guidelines",
  children,
}: {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 96 }}>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#B289F9",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {sectionLabel}
        </div>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#1E1E1E",
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 17,
              color: "#808080",
              marginTop: 12,
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

// ============================================================
// OneTribeIcon
// ============================================================
function OneTribeIcon({
  size = 32,
  gradientId = "ot-icon-grad",
}: {
  size?: number;
  gradientId?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 10, flexShrink: 0 }}
    >
      <rect
        width="77.9062"
        height="77.9062"
        rx="10"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M42.0504 18.1797C42.4332 18.1797 42.7586 18.3153 43.0266 18.586C43.2945 18.8567 43.4283 19.2048 43.4283 19.6303V29.1956H46.5108C46.5516 29.1956 46.5923 29.1955 46.6327 29.1958H46.6369C46.6774 29.1958 46.7182 29.1956 46.759 29.1956H49.4813C49.9454 29.1956 50.3253 29.3312 50.6207 29.6029C50.9161 29.8748 51.0639 30.2239 51.0639 30.6509V35.7158C51.0639 36.104 50.9161 36.4338 50.6207 36.7054C50.3253 36.9771 49.9454 37.1129 49.4813 37.1129H43.4283V47.5341C43.4283 49.0037 43.6963 50.1543 44.2321 50.9858C44.7682 51.8173 45.6674 52.2331 46.9305 52.2331H47.1029C47.524 52.2331 47.8689 52.3688 48.1365 52.6392C48.4041 52.9096 48.5382 53.2392 48.5382 53.6255V57.9183C48.5382 58.343 48.4041 58.6922 48.1365 58.9626C47.8689 59.233 47.5233 59.3687 47.1029 59.3687H46.1269C43.7552 59.3687 41.7346 58.972 40.0697 58.1796C38.405 57.3868 37.1319 56.1586 36.2516 54.4957C35.3712 52.8328 34.931 50.7443 34.931 48.2303V38.4011C34.8846 37.7198 34.3541 37.1728 33.6845 37.1085H33.6812L33.6798 37.1089H33.6766L33.6754 37.1091H33.6707L33.6691 37.1093H33.6645L33.6636 37.1097H33.6586L33.657 37.1099H33.6511L33.6495 37.1101H33.6416L33.6402 37.1105H33.6311L33.6295 37.1107H33.6186L33.617 37.1109H29.4131L29.4085 37.1107H29.4042L29.3996 37.1105H29.3905L29.3864 37.1097L29.3634 37.1093C29.2944 37.1065 29.2263 37.0998 29.1589 37.0895C29.0122 37.0707 28.8762 37.033 28.7507 36.9766C28.5883 36.9103 28.4316 36.8198 28.2811 36.705C27.9261 36.4343 27.6865 36.1057 27.5623 35.7189L25.9403 30.6717C25.8038 30.2465 25.8256 29.8983 26.0066 29.6276C26.1876 29.3569 26.4885 29.2213 26.9097 29.2213C29.4727 29.2213 31.0135 29.2023 33.5782 29.2023C34.2972 29.189 34.8822 28.6208 34.931 27.9036V19.6303C34.931 19.2048 35.0748 18.8567 35.3618 18.586C35.6489 18.3153 35.9837 18.1797 36.3665 18.1797H42.0504Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="70.1697"
          y1="-56.191"
          x2="135.895"
          y2="-2.48405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#48E5FF" />
          <stop offset="0.363365" stopColor="#B289F9" />
          <stop offset="0.651734" stopColor="#F989B4" />
          <stop offset="1" stopColor="#FFBC6F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================
// TribeLogo
// ============================================================
function TribeLogo({
  width = 160,
  gradientId = "tribe-logo-grad",
}: {
  width?: number;
  gradientId?: string;
}) {
  return (
    <svg
      width={width}
      height={(width / 524) * 173}
      viewBox="0 0 524 173"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M297.248 0.186523C299 0.186523 300.434 0.745142 301.55 1.86035C302.665 2.97572 303.224 4.41069 303.224 6.16406V58.0322C307.047 53.7292 311.907 50.1845 317.803 47.3955C323.699 44.6066 330.79 43.212 339.076 43.2119C347.203 43.2119 354.335 44.6065 360.47 47.3955C366.604 50.1845 371.823 54.0878 376.125 59.1074C380.428 64.1271 383.733 70.0634 386.044 76.915C388.355 83.7667 389.669 91.3361 389.988 99.6221C390.148 102.491 390.227 105.16 390.227 107.63C390.227 110.1 390.148 112.849 389.988 115.877C389.669 124.322 388.315 132.011 385.925 138.942C383.535 145.875 380.228 151.851 376.006 156.869C371.783 161.889 366.604 165.713 360.47 168.343C354.335 170.972 347.203 172.287 339.076 172.287C329.993 172.287 322.384 170.733 316.249 167.625C310.114 164.518 305.135 160.574 301.311 155.794V163.921C301.311 165.674 300.754 167.107 299.639 168.224C298.522 169.339 297.088 169.896 295.335 169.896H272.629C270.876 169.896 269.441 169.339 268.325 168.224C267.21 167.107 266.653 165.674 266.653 163.921V6.16406C266.653 4.41069 267.21 2.97572 268.325 1.86035C269.441 0.744982 270.876 0.186523 272.629 0.186523H297.248ZM463.289 43.2119C476.834 43.2119 488.067 45.9608 496.991 51.459C505.914 56.956 512.646 64.4458 517.188 73.9268C521.73 83.4079 524.001 94.2847 524.001 106.554V112.052C524.001 113.646 523.442 115.04 522.327 116.235C521.212 117.43 519.777 118.027 518.025 118.027H440.103V119.701C440.263 124.8 441.219 129.461 442.973 133.685C444.725 137.907 447.313 141.293 450.74 143.843C454.166 146.393 458.349 147.667 463.289 147.667C467.113 147.667 470.3 147.07 472.85 145.875C475.399 144.679 477.511 143.326 479.184 141.812C480.857 140.297 482.091 138.983 482.889 137.867C484.322 136.114 485.478 135.038 486.354 134.641C487.232 134.242 488.546 134.043 490.298 134.043H515.635C517.068 134.043 518.304 134.521 519.34 135.478C520.375 136.433 520.813 137.628 520.653 139.062C520.494 141.771 519.18 144.997 516.71 148.742C514.24 152.487 510.615 156.153 505.835 159.738C501.055 163.324 495.118 166.311 488.027 168.701C480.937 171.091 472.77 172.287 463.528 172.287C445.203 172.287 430.662 167.187 419.906 156.989C409.15 146.79 403.453 131.97 402.816 112.53V102.491C403.453 90.0616 406.242 79.4243 411.182 70.5811C416.121 61.7367 423.054 54.9644 431.977 50.2637C440.9 45.562 451.338 43.2119 463.289 43.2119ZM67.4355 0.186523C69.0292 0.186523 70.3837 0.745213 71.499 1.86035C72.6143 2.97572 73.1718 4.41069 73.1718 6.16406V45.5742H86.0058C86.1754 45.5742 86.3453 45.5741 86.5136 45.5752H86.5302C86.6986 45.5752 86.8685 45.5742 87.038 45.5742H98.372C100.304 45.5743 101.885 46.1337 103.115 47.2529C104.345 48.3734 104.961 49.8117 104.961 51.5713V72.4404C104.961 74.0399 104.345 75.3983 103.115 76.5176C101.885 77.6368 100.304 78.1972 98.372 78.1973H73.1718V121.135C73.1719 127.19 74.2869 131.932 76.5175 135.357C78.7493 138.783 82.4933 140.496 87.7519 140.496H88.4697C90.223 140.496 91.6592 141.055 92.7734 142.169C93.8876 143.283 94.4453 144.642 94.4453 146.233V163.921C94.4453 165.671 93.8874 167.109 92.7734 168.224C91.6592 169.338 90.2197 169.896 88.4697 169.896H84.4062C74.5322 169.896 66.1207 168.262 59.1894 164.997C52.2592 161.731 46.9599 156.67 43.2949 149.818C39.6299 142.967 37.7959 134.361 37.7959 124.003V83.5039C37.6026 80.6971 35.395 78.4439 32.6074 78.1787H32.5937L32.5879 78.1797H32.5742L32.5693 78.1807H32.5498L32.5429 78.1816H32.5244L32.5205 78.1836H32.499L32.4921 78.1846H32.4677L32.4609 78.1855H32.4287L32.4228 78.1865H32.3847L32.3779 78.1875H32.333L32.3261 78.1885H14.8252L14.8056 78.1875H14.788L14.7685 78.1865H14.7304L14.7138 78.1855L14.6328 78.1836L14.6181 78.1816C14.3306 78.1704 14.0474 78.1423 13.7666 78.0996C13.1556 78.0221 12.5896 77.8673 12.0673 77.6348C11.3912 77.3618 10.738 76.9895 10.1113 76.5166C8.63321 75.4012 7.63576 74.046 7.1191 72.4521L0.367148 51.6572C-0.201198 49.905 -0.110161 48.4699 0.643515 47.3545C1.3972 46.2395 2.64932 45.6817 4.4023 45.6816C15.0728 45.6816 21.4877 45.6025 32.165 45.6025C35.158 45.5473 37.5924 43.2068 37.7959 40.252V6.16406C37.7959 4.41072 38.3947 2.97572 39.5898 1.86035C40.7849 0.744981 42.1796 0.186523 43.7734 0.186523H67.4355ZM148.543 45.6025C150.295 45.6026 151.729 46.2004 152.845 47.3955C153.961 48.5906 154.518 49.9844 154.519 51.5781V61.1396C158.503 56.1997 163.442 52.3741 169.338 49.666C175.233 46.9569 181.926 45.6026 189.415 45.6025H199.693C201.446 45.6025 202.881 46.16 203.996 47.2754C205.111 48.3918 205.669 49.825 205.669 51.5781V72.374C205.669 73.9677 205.111 75.3213 203.996 76.4365C202.881 77.5519 201.446 78.1104 199.693 78.1104H178.898C171.728 78.1104 166.19 80.1019 162.286 84.0859C158.382 88.07 156.43 93.5671 156.43 100.578V163.921C156.43 165.674 155.832 167.107 154.638 168.224C153.443 169.339 152.048 169.896 150.454 169.896H125.118C123.525 169.896 122.131 169.339 120.936 168.224C119.74 167.107 119.143 165.674 119.143 163.921V51.5781C119.143 49.9843 119.74 48.5906 120.936 47.3955C122.131 46.2004 123.525 45.6025 125.118 45.6025H148.543ZM247.127 45.6025C248.72 45.6026 250.074 46.1601 251.189 47.2754C252.305 48.3918 252.863 49.8249 252.863 51.5781V163.921C252.863 165.674 252.305 167.107 251.189 168.224C250.074 169.339 248.72 169.896 247.127 169.896H222.985C221.392 169.896 219.998 169.339 218.803 168.224C217.608 167.107 217.01 165.674 217.01 163.921V51.5781C217.01 49.8249 217.608 48.3919 218.803 47.2754C219.998 46.1601 221.392 45.6026 222.985 45.6025H247.127ZM328.081 71.8955C322.505 71.8956 317.883 73.1701 314.218 75.7197C310.553 78.2695 307.844 81.4972 306.091 85.4004C304.339 89.3046 303.382 93.4877 303.224 97.9502C303.064 100.818 302.984 103.766 302.984 106.793C302.984 109.821 303.064 112.849 303.224 115.877C303.382 120.657 304.298 125.119 305.972 129.263C307.644 133.405 310.274 136.831 313.859 139.54C317.445 142.249 322.185 143.603 328.081 143.604C334.136 143.604 338.917 142.289 342.423 139.66C345.928 137.031 348.438 133.564 349.951 129.263C351.465 124.96 352.382 120.259 352.701 115.159C353.019 110.219 353.019 105.28 352.701 100.34C352.382 95.2405 351.465 90.5393 349.951 86.2363C348.438 81.9346 345.928 78.4682 342.423 75.8389C338.917 73.2105 334.136 71.8955 328.081 71.8955ZM463.289 67.1152C458.349 67.1152 454.166 68.31 450.74 70.7002C447.313 73.0903 444.686 76.3972 442.852 80.6191C441.021 84.8425 440.103 89.7424 440.103 95.3203V96.0371H486.713V95.3203C486.713 89.7424 485.797 84.8425 483.964 80.6191C482.132 76.3972 479.462 73.0904 475.957 70.7002C472.451 68.31 468.229 67.1152 463.289 67.1152ZM247.127 0C248.72 5.35553e-05 250.074 0.557534 251.189 1.67285C252.305 2.78924 252.863 4.22244 252.863 5.97559V27.543C252.863 29.2962 252.305 30.7293 251.189 31.8457C250.074 32.961 248.72 33.5185 247.127 33.5186H222.985C221.392 33.5185 219.998 32.961 218.803 31.8457C217.608 30.7292 217.01 29.2963 217.01 27.543V5.97559C217.01 4.22242 217.608 2.78925 218.803 1.67285C219.998 0.55755 221.392 3.95853e-05 222.985 0H247.127Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="7.60519e-07"
          y1="-14.5489"
          x2="536.639"
          y2="122.509"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#48E5FF" />
          <stop offset="0.281566" stopColor="#B289F9" />
          <stop offset="0.698232" stopColor="#F989B4" />
          <stop offset="1" stopColor="#FFBC6F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================
// InviteCardMockup
// ============================================================
function InviteCardMockup({ t }: { t: T }) {
  const qrSize = 21;
  const moduleSize = 4;
  const modules: boolean[][] = [];
  for (let y = 0; y < qrSize; y++) {
    modules[y] = [];
    for (let x = 0; x < qrSize; x++) {
      const inFinder =
        (x < 8 && y < 8) ||
        (x >= qrSize - 8 && y < 8) ||
        (x < 8 && y >= qrSize - 8);
      const finderInner =
        (x >= 2 && x < 6 && y >= 2 && y < 6) ||
        (x >= qrSize - 6 && x < qrSize - 2 && y >= 2 && y < 6) ||
        (x >= 2 && x < 6 && y >= qrSize - 6 && y < qrSize - 2);
      const timing = x === 6 || y === 6;
      const data =
        !inFinder &&
        !finderInner &&
        !timing &&
        (x + y) % 3 !== 0 &&
        (x * 7 + y * 11) % 5 < 3;
      modules[y][x] = inFinder ? !finderInner : timing || data;
    }
  }

  return (
    <div
      style={{
        width: 280,
        padding: 24,
        borderRadius: 20,
        background: "#fff",
        border: "1px solid #E6E6E6",
        boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <OneTribeIcon size={28} gradientId="invite-card-icon" />
        <TribeLogo width={72} gradientId="invite-card-logo" />
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#1E1E1E",
          textAlign: "center",
        }}
      >
        {t.inviteFriend}
      </div>
      <div
        style={{
          padding: 12,
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #E6E6E6",
        }}
      >
        <svg
          width={qrSize * moduleSize}
          height={qrSize * moduleSize}
          viewBox={`0 0 ${qrSize * moduleSize} ${qrSize * moduleSize}`}
        >
          {modules.map((row, y) =>
            row.map((filled, x) => (
              <rect
                key={`${x}-${y}`}
                x={x * moduleSize}
                y={y * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill={filled ? "#1E1E1E" : "#fff"}
              />
            ))
          )}
        </svg>
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          letterSpacing: "0.15em",
          color: "#808080",
        }}
      >
        INVITE-ABC123
      </div>
      <div
        style={{
          width: "100%",
          padding: "10px 20px",
          borderRadius: 12,
          background: "linear-gradient(90deg, #6E22F2, #C752FF)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {t.share}
      </div>
    </div>
  );
}

// ============================================================
// CardTitleShimmer — блик при пересечении золотого сечения (38.2% от верха)
// ============================================================
const GOLDEN_RATIO = 0.382; // верхняя зона — 38.2% высоты экрана

function CardTitleShimmer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const wasBelow = useRef(true);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const goldenLine = window.innerHeight * GOLDEN_RATIO;
      const isAbove = centerY < goldenLine;
      if (wasBelow.current && isAbove) {
        setActive(true);
        wasBelow.current = false;
      }
      if (!isAbove) wasBelow.current = true;
    };
    const onEnd = () => setActive(false);
    const el = ref.current;
    el?.addEventListener("animationend", onEnd);
    const container = document.getElementById("scroll-container") ?? window;
    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      el?.removeEventListener("animationend", onEnd);
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`card-title-shimmer ${active ? "card-title-shimmer-active" : ""}`}
      style={{ fontSize: 18, fontWeight: 700, color: "#1E1E1E", marginBottom: 12 }}
    >
      <span>{children}</span>
      <span className="card-title-shimmer-glow" aria-hidden>
        {children}
      </span>
    </div>
  );
}

// ============================================================
// InviteCardBlock — параллакс: карточка выезжает справа с отставанием
// ============================================================
function InviteCardBlock({ t }: { t: T }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(80);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Прогресс: 0 когда секция внизу вьюпорта, 1 когда секция вверху
      const rawProgress = 1 - (rect.top + rect.height * 0.5) / (vh + rect.height * 0.5);
      const progress = Math.max(0, Math.min(1, rawProgress));
      // Отставание: карточка двигается только после 45% прогресса, очень медленно (степень 8)
      const raw = Math.max(0, (progress - 0.45) / 0.55);
      const delayedProgress = Math.pow(raw, 8);
      setTranslateX(80 * (1 - delayedProgress));
    };
    update();
    const container = document.getElementById("scroll-container") ?? window;
    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={sectionRef} style={APP_BLOCK_STYLE}>
      <div style={SECTION_LABEL_STYLE}>{t.digitalInviteCard}</div>
      <div className="app-grid-2 app-grid-2-img-right" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 32 }}>
        <div className="app-grid-text-cell">
          <CardTitleShimmer>{t.inviteCardTitle}</CardTitleShimmer>
          <div style={{ fontSize: 13, color: "#808080", lineHeight: 1.7, marginBottom: 16 }}>
            {t.inviteCardDesc}
          </div>
          <div style={{ fontSize: 11, color: "#808080" }}>
            <div style={{ marginBottom: 4 }}>
              <strong style={{ color: "#1E1E1E" }}>{t.contextLabel}</strong> {t.inviteContext}
            </div>
            <div>
              <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong> {t.inviteFormat}
            </div>
          </div>
          <MerchLikeButton targetId="merch-invite-card" />
        </div>
        <div
          className="app-grid-image-cell app-grid-image-cell-highlight-mirror"
          style={{ minWidth: 0, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              transform: `translateX(${translateX}px)`,
              transition: "transform 0.7s ease-out",
            }}
          >
            <InviteCardMockup t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// StoriesMockup
// ============================================================
const STORIES_SCALE = 2.25;
const PHONE_W = 160;
const PHONE_H = 284;

function StoriesMockup({ t }: { t: T }) {
  return (
    <div
      style={{
        width: PHONE_W * STORIES_SCALE,
        height: PHONE_H * STORIES_SCALE,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${STORIES_SCALE})`,
          transformOrigin: "top left",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#2f2f2f",
            border: "1px solid #2f2f2f",
            borderRadius: 24,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1.2%",
              left: "1.2%",
              right: "1.2%",
              bottom: "1.2%",
              borderRadius: 20,
              background:
                "linear-gradient(160deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 30,
                left: 20,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#48E5FF",
                opacity: 0.25,
                filter: "blur(25px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 50,
                right: 10,
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "#B289F9",
                opacity: 0.3,
                filter: "blur(20px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 70,
                left: 40,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#F989B4",
                opacity: 0.2,
                filter: "blur(18px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px 14px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <OneTribeIcon size={24} gradientId="stories-mockup-icon-grad" />
                <span
                  style={{
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  onetribe
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 7,
                    color: "#B289F9",
                    fontWeight: 600,
                    letterSpacing: 2,
                    marginBottom: 6,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  TRIBE AWAKENING
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    fontFamily: "var(--font-body)",
                    marginBottom: 8,
                  }}
                >
                  {t.storiesQuestion}
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.5,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t.storiesTagline}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    background: "linear-gradient(90deg,#6E22F2,#C752FF)",
                    borderRadius: 20,
                    padding: "6px 10px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: 8,
                      fontWeight: 700,
                      fontFamily: "var(--font-body)",
                      lineHeight: 1,
                    }}
                  >
                    {t.joinCta}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "3.2%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 36,
              height: 10,
              background: "#2f2f2f",
              borderRadius: 5,
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MerchApplications
// ============================================================
const SECTION_LABEL_STYLE = {
  fontSize: 10,
  fontWeight: 700,
  color: "#B289F9",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  marginBottom: 24,
};

const MERCH_TARGET_IDS = [
  "merch-berlin",
  "merch-tshirt",
  "merch-water-bottle",
  "merch-stickers",
  "merch-car-sticker",
  "merch-stories",
  "merch-invite-card",
  "merch-flag",
  "merch-pin-badge",
  "merch-rollup",
  "merch-chocolate",
] as const;

function MerchLikeButton({ targetId }: { targetId: (typeof MERCH_TARGET_IDS)[number] }) {
  const { trackLike } = useAnalytics();
  const [liked, setLikedState] = useState(false);

  useEffect(() => {
    setLikedState(isLiked(targetId));
  }, [targetId]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) return;
    trackLike(targetId, "merch");
    incrementLocalCount(targetId, "like");
    setLiked(targetId, true);
    setLikedState(true);
  };

  return (
    <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
      <AnalyticsCountBadge targetId={targetId} type="like" />
      <button
        type="button"
        onClick={handleClick}
        disabled={liked}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${liked ? "opacity-70 cursor-default" : "hover:opacity-90"}`}
        style={{
          background: liked ? "rgba(178,137,249,0.2)" : "var(--color-bg-active)",
          color: "#B289F9",
          border: "1px solid rgba(178,137,249,0.4)",
        }}
      >
        <FlameIcon filled={liked} size={18} />
        <span>{liked ? "✓" : "Like"}</span>
      </button>
    </div>
  );
}

export default function MerchApplications() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <div id="applications" style={{ scrollMarginTop: 60 }}>
      <Section
        title={t.applicationsTitle}
        subtitle={t.applicationsSubtitle}
        sectionLabel={t.sectionLabel}
      >
        {/* Berlin Edition */}
        <div style={SECTION_LABEL_STYLE}>{t.merchBerlin}</div>
        <div style={{ ...CARD_STYLE, marginBottom: 64, padding: 0, overflow: "hidden" }}>
          <div style={{ aspectRatio: "738/781", maxWidth: 400, margin: "0 auto" }}>
            <Image
              src="/assets/OneTribe-Berlin.svg"
              alt="OneTribe Berlin"
              width={738}
              height={781}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={{ padding: 24, paddingTop: 16 }}>
            <div style={{ fontSize: 13, color: "#808080", lineHeight: 1.6 }}>{t.berlinDesc}</div>
            <MerchLikeButton targetId="merch-berlin" />
          </div>
        </div>

        {/* Merch T-Shirt */}
        <div style={SECTION_LABEL_STYLE}>{t.merchTshirt}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32 }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/tshirt-mockup-man.png"
                alt={t.tshirtAlt}
                width={400}
                height={520}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.classicTee}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  maxWidth: 260,
                }}
              >
                {t.classicTeeDesc}
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                {["#FFFFFF", "#1E1E1E", "#6E22F2"].map((c) => (
                  <div
                    key={c}
                    title={c}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: c,
                      border: "1px solid rgba(0,0,0,0.12)",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "#808080" }}>
                {t.availableColors}
              </div>
              <MerchLikeButton targetId="merch-tshirt" />
            </div>
          </div>
        </div>

        {/* Water Bottle */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalWaterBottle}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32 }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/water-bottle.png"
                alt={t.waterBottleAlt}
                width={360}
                height={540}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.waterBottleTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 14,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.waterBottleDesc}
              </div>
              <div style={{ fontSize: 12, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.waterBottleFormat}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.styleLabel}</strong>{" "}
                  {t.waterBottleStyle}
                </div>
              </div>
              <MerchLikeButton targetId="merch-water-bottle" />
            </div>
          </div>
        </div>

        {/* Sticker Pack */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalStickerPack}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{
              gridTemplateColumns: "1.2fr 1fr",
              gap: 32,
            }}
          >
            <div
              className="app-grid-image-cell app-grid-image-cell-highlight"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
                minWidth: 0,
                marginBottom: -40,
              }}
            >
              {[
                { src: "/sticker-1-onetribe.png", alt: "onetribe + flame" },
                { src: "/sticker-2-letsgo.png", alt: "Let's gooo!" },
                { src: "/sticker-3-fullyin.png", alt: "Fully in!" },
                { src: "/sticker-4-starting.png", alt: "We are just starting" },
                { src: "/sticker-5-feuer.png", alt: "Ich bin Feuer und Flamme" },
                { src: "/sticker-6-rocken.png", alt: "Wir rocken das!" },
              ].map((s) => (
                <div key={s.src} style={{ aspectRatio: "1" }}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={200}
                    height={200}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.stickerPackTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 14,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.stickerPackDesc}
              </div>
              <div style={{ fontSize: 12, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.stickerFormat}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.styleLabel}</strong>{" "}
                  {t.stickerStyle}
                </div>
              </div>
              <MerchLikeButton targetId="merch-stickers" />
            </div>
          </div>
        </div>

        {/* Car Sticker */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalCarSticker}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{
              gridTemplateColumns: "1.2fr 1fr",
              gap: 32,
            }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/car-sticker.png"
                alt={t.carStickerAlt}
                width={640}
                height={426}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.carStickerTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.carStickerDesc}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.carStickerFormat}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.styleLabel}</strong>{" "}
                  {t.carStickerStyle}
                </div>
              </div>
              <MerchLikeButton targetId="merch-car-sticker" />
            </div>
          </div>
        </div>

        {/* Digital Stories */}
        <div style={APP_BLOCK_STYLE}>
          <div style={SECTION_LABEL_STYLE}>{t.digitalStories}</div>
          <div className="app-grid-2 app-grid-2-img-right" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 32 }}>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.tribeAwakeningStories}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.storiesDesc}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.storiesFormat}
                </div>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.fontLabel}</strong>{" "}
                  {t.storiesFont}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.bgLabel}</strong>{" "}
                  {t.storiesBg}
                </div>
              </div>
              <MerchLikeButton targetId="merch-stories" />
            </div>
            <div className="app-grid-image-cell app-grid-image-cell-highlight-mirror" style={{ minWidth: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <StoriesMockup t={t} />
            </div>
          </div>
        </div>

        {/* Digital Invite Card */}
        <InviteCardBlock t={t} />

        {/* Flag */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalFlag}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32 }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/flag-mockup.png"
                alt={t.flagAlt}
                width={560}
                height={840}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.flagTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.flagDesc}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.flagFormat}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.bgLabel}</strong>{" "}
                  {t.flagBg}
                </div>
              </div>
              <MerchLikeButton targetId="merch-flag" />
            </div>
          </div>
        </div>

        {/* Pin Badge */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalPinBadge}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32 }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/pin-badge.png"
                alt={t.pinBadgeAlt}
                width={400}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.pinBadgeTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.pinBadgeDesc}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.pinFormat}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.styleLabel}</strong>{" "}
                  {t.pinStyle}
                </div>
              </div>
              <MerchLikeButton targetId="merch-pin-badge" />
            </div>
          </div>
        </div>

        {/* Rollup */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalRollup}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32 }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/rollup-mockup.png"
                alt={t.rollupAlt}
                width={560}
                height={840}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.rollupTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.rollupDesc}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.formatLabel}</strong>{" "}
                  {t.rollupFormat}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.variantsLabel}</strong>{" "}
                  {t.rollupVariants}
                </div>
              </div>
              <MerchLikeButton targetId="merch-rollup" />
            </div>
          </div>
        </div>

        {/* Chocolate */}
        <div style={SECTION_LABEL_STYLE}>{t.physicalChocolate}</div>
        <div
          style={{
            ...CARD_STYLE,
            padding: 0,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          <div
            className="app-grid-2 app-grid-2-img-left"
            style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32 }}
          >
            <div className="app-grid-image-cell app-grid-image-cell-highlight" style={{ minWidth: 0, marginBottom: -40 }}>
              <Image
                src="/chocolate.png"
                alt={t.chocolateAlt}
                width={480}
                height={320}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <div className="app-grid-text-cell">
              <CardTitleShimmer>{t.chocolateTitle}</CardTitleShimmer>
              <div
                style={{
                  fontSize: 13,
                  color: "#808080",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.chocolateDesc}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>
                <div style={{ marginBottom: 4 }}>
                  <strong style={{ color: "#1E1E1E" }}>{t.wrapLabel}</strong>{" "}
                  {t.chocolateWrap}
                </div>
                <div>
                  <strong style={{ color: "#1E1E1E" }}>{t.styleLabel}</strong>{" "}
                  {t.chocolateStyle}
                </div>
              </div>
              <MerchLikeButton targetId="merch-chocolate" />
            </div>
          </div>
        </div>

        {/* Brand at a glance */}
        <div
          style={{
            ...SECTION_LABEL_STYLE,
            marginBottom: 16,
          }}
        >
          {t.brandAtGlance}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}
        >
          {t.glanceItems.map((f) => (
            <div
              key={f.name}
              style={{
                padding: 20,
                borderRadius: 14,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  marginBottom: 4,
                }}
              >
                {f.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  color: "#B289F9",
                  marginBottom: 6,
                }}
              >
                {f.size}
              </div>
              <div style={{ fontSize: 11, color: "#808080" }}>{f.note}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
