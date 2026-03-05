"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ============================================================
// BRAND DATA — меняй под любой проект
// ============================================================
const BRAND = {
  name: "OneTribe",
  tagline: "One World · One Tribe",
  description:
    "Децентрализованная социальная экосистема для настоящих людей. Онлайн-сообщество, которое становится офлайн-движением.",
  personality: ["Authentic", "Bold", "Human", "Free", "Alive"],
  voice: [
    "Говорим прямо",
    "Без корпоративного языка",
    "С энергией движения",
    "Вдохновляем, не продаём",
  ],
  colors: {
    primary: [
      { name: "Electric Blue", hex: "#48E5FF", use: "Акценты, CTA, highlights" },
      { name: "Soft Violet", hex: "#B289F9", use: "Основной градиент, фоны" },
      { name: "Warm Pink", hex: "#F989B4", use: "Акценты, иллюстрации" },
      { name: "Peach Gold", hex: "#FFBC6F", use: "Тепло, финансовые смыслы" },
    ],
    secondary: [
      { name: "Deep Purple", hex: "#6E22F2", use: "CTA кнопки, заголовки" },
      { name: "Bright Purple", hex: "#C752FF", use: "Градиент 2, акценты" },
      { name: "Link Blue", hex: "#0866FF", use: "Ссылки, интерактив" },
      { name: "Coral", hex: "#FD6F6E", use: "Уведомления, важное" },
    ],
    neutral: [
      { name: "Black", hex: "#1E1E1E", use: "Основной текст" },
      { name: "Gray", hex: "#808080", use: "Secondary text" },
      { name: "Light Gray", hex: "#E6E6E6", use: "Borders, dividers" },
      { name: "Off White", hex: "#FCFCFC", use: "Фоны секций" },
      { name: "White", hex: "#FFFFFF", use: "Основной фон" },
    ],
    gradients: [
      {
        name: "Gradient 1 — Spectrum",
        value: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
        css: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
      },
      {
        name: "Gradient 2 — Purple",
        value: "linear-gradient(135deg, #6E22F2, #C752FF)",
        css: "linear-gradient(135deg, #6E22F2, #C752FF)",
      },
    ],
  },
  typography: {
    font: "Inter Tight",
    fallback: "Inter, sans-serif",
    scale: [
      {
        name: "Display",
        size: "64px",
        weight: "800",
        lh: "1.1",
        ls: "-0.02em",
        use: "Hero заголовки",
      },
      {
        name: "H1",
        size: "48px",
        weight: "700",
        lh: "1.15",
        ls: "-0.01em",
        use: "Заголовки страниц",
      },
      {
        name: "H2",
        size: "36px",
        weight: "700",
        lh: "1.2",
        ls: "-0.01em",
        use: "Секции",
      },
      {
        name: "H3",
        size: "24px",
        weight: "600",
        lh: "1.3",
        ls: "0",
        use: "Подзаголовки",
      },
      {
        name: "Body L",
        size: "18px",
        weight: "400",
        lh: "1.6",
        ls: "0",
        use: "Основной текст",
      },
      {
        name: "Body M",
        size: "16px",
        weight: "400",
        lh: "1.6",
        ls: "0",
        use: "UI текст",
      },
      {
        name: "Caption",
        size: "12px",
        weight: "500",
        lh: "1.4",
        ls: "0.04em",
        use: "Подписи, labels",
      },
      {
        name: "Overline",
        size: "11px",
        weight: "600",
        lh: "1.4",
        ls: "0.1em",
        use: "Категории, теги",
      },
    ],
  },
};

const NAV = [
  { id: "foundation", label: "Foundation", icon: "◈" },
  { id: "colors", label: "Colors", icon: "◉" },
  { id: "typography", label: "Typography", icon: "Aa" },
  { id: "logo", label: "Logo", icon: "◎" },
  { id: "iconography", label: "Icons", icon: "⬡" },
  { id: "imagery", label: "Imagery", icon: "▣" },
  { id: "motion", label: "Motion", icon: "◌" },
  { id: "patterns", label: "Patterns", icon: "⊞" },
  { id: "layout", label: "Layout", icon: "▦" },
  { id: "applications", label: "Applications", icon: "◧" },
];

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

function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      style={{
        background: copied ? "#1E1E1E" : "rgba(0,0,0,0.07)",
        color: copied ? "#fff" : "#666",
        border: "none",
        cursor: "pointer",
        borderRadius: 6,
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "monospace",
        transition: "all 0.2s",
      }}
    >
      {copied ? "✓ copied" : text}
    </button>
  );
}

function ColorSwatch({
  color,
}: {
  color: { name: string; hex: string; use: string };
}) {
  const isLight =
    color.hex === "#FFFFFF" ||
    color.hex === "#FCFCFC" ||
    color.hex === "#E6E6E6";
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      <div
        style={{
          height: 80,
          background: color.hex,
          border: isLight ? "1px solid #E6E6E6" : "none",
        }}
      />
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "#1E1E1E",
            marginBottom: 2,
          }}
        >
          {color.name}
        </div>
        <div style={{ fontSize: 11, color: "#808080", marginBottom: 8 }}>
          {color.use}
        </div>
        <CopyBadge text={color.hex} />
      </div>
    </div>
  );
}

function GradientSwatch({
  g,
}: {
  g: { name: string; value: string; css: string };
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(g.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ height: 80, background: g.value }} />
      <div style={{ padding: "12px 14px", background: "#fff" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "#1E1E1E",
            marginBottom: 8,
          }}
        >
          {g.name}
        </div>
        <button
          onClick={copy}
          style={{
            background: copied ? "#1E1E1E" : "rgba(0,0,0,0.07)",
            color: copied ? "#fff" : "#666",
            border: "none",
            cursor: "pointer",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 10,
            fontFamily: "monospace",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ copied" : "copy CSS"}
        </button>
      </div>
    </div>
  );
}

function OneTribeLogo({
  dark = false,
  width = 120,
  gradientId = "otl-grad",
}: {
  dark?: boolean;
  width?: number;
  gradientId?: string;
}) {
  const solidFill = dark ? "#FFFFFF" : "#000000";
  return (
    <svg
      width={width}
      height={(width / 479) * 101}
      viewBox="0 0 479 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M259.547 29.2056V45.5832H215.707V29.2056H259.547ZM224.861 12.6411H246.967V76.9063C246.967 78.7744 247.424 80.186 248.337 81.1408C249.251 82.0541 250.683 82.5108 252.634 82.5108C253.382 82.5108 254.233 82.4278 255.187 82.2617C256.184 82.0956 256.952 81.9296 257.492 81.7635L260.792 97.8298C258.301 98.5356 255.976 99.0337 253.817 99.3244C251.7 99.6565 249.604 99.8225 247.528 99.8225C240.138 99.8225 234.513 98.0789 230.652 94.5916C226.791 91.0629 224.861 85.998 224.861 79.3972V12.6411ZM264.842 98.8262V29.2056H286.326V41.9714H287.073C288.319 37.3217 290.374 33.8968 293.238 31.6965C296.144 29.4547 299.486 28.3338 303.264 28.3338C304.302 28.3338 305.361 28.396 306.44 28.5206C307.561 28.6451 308.578 28.8527 309.492 29.1433V48.3232C308.412 47.9496 307.021 47.6797 305.319 47.5137C303.617 47.3061 302.102 47.2023 300.773 47.2023C298.158 47.2023 295.792 47.7835 293.674 48.9459C291.599 50.1084 289.959 51.7274 288.755 53.8032C287.592 55.8789 287.011 58.2868 287.011 61.0268V98.8262H264.842ZM312.483 98.8262V29.2056H334.652V98.8262H312.483ZM323.505 21.2347C320.392 21.2347 317.714 20.1968 315.472 18.1211C313.23 16.0453 312.109 13.5337 312.109 10.5861C312.109 7.63854 313.23 5.14764 315.472 3.11341C317.714 1.03766 320.392 -0.000215072 323.505 -0.000215072C326.66 -0.000215072 329.338 1.03766 331.538 3.11341C333.78 5.14764 334.901 7.63854 334.901 10.5861C334.901 13.5337 333.78 16.0453 331.538 18.1211C329.338 20.1968 326.66 21.2347 323.505 21.2347ZM380.896 99.8225C377.408 99.8225 374.378 99.2413 371.804 98.0789C369.23 96.9165 367.071 95.4012 365.327 93.533C363.625 91.6648 362.318 89.6514 361.404 87.4926H360.657V98.8262H338.737V6.04021H360.906V41.1619H361.404C362.276 39.0446 363.542 37.0104 365.203 35.0592C366.905 33.0665 369.043 31.4474 371.617 30.2019C374.232 28.9565 377.388 28.3338 381.082 28.3338C385.94 28.3338 390.465 29.6207 394.658 32.1946C398.851 34.7271 402.234 38.6295 404.808 43.9019C407.424 49.1743 408.731 55.8997 408.731 64.0781C408.731 71.966 407.486 78.5669 404.995 83.8808C402.504 89.1947 399.141 93.1801 394.907 95.8371C390.714 98.4941 386.043 99.8225 380.896 99.8225ZM373.236 82.5731C375.976 82.5731 378.28 81.805 380.148 80.269C382.058 78.7329 383.49 76.5741 384.445 73.7926C385.441 71.0111 385.94 67.773 385.94 64.0781C385.94 60.3418 385.441 57.1036 384.445 54.3636C383.49 51.5821 382.079 49.4234 380.211 47.8873C378.342 46.3512 376.018 45.5832 373.236 45.5832C370.538 45.5832 368.234 46.3305 366.324 47.825C364.414 49.3196 362.94 51.4576 361.903 54.2391C360.906 56.9791 360.408 60.2588 360.408 64.0781C360.408 67.8145 360.906 71.0734 361.903 73.8549C362.94 76.5949 364.414 78.7329 366.324 80.269C368.234 81.805 370.538 82.5731 373.236 82.5731ZM442.77 100.134C435.463 100.134 429.173 98.7016 423.901 95.8371C418.629 92.931 414.581 88.8003 411.758 83.4449C408.976 78.0894 407.586 71.6961 407.586 64.265C407.586 57.0829 408.997 50.8141 411.82 45.4587C414.643 40.0617 418.629 35.8687 423.776 32.8796C428.924 29.849 434.985 28.3338 441.96 28.3338C446.9 28.3338 451.425 29.1225 455.535 30.7001C459.687 32.2362 463.257 34.5195 466.246 37.5501C469.277 40.5392 471.602 44.234 473.221 48.6346C474.881 53.0352 475.712 58.1207 475.712 63.8913V69.3713H415.245V56.6054H465.188L454.85 59.5945C454.85 56.3979 454.373 53.6786 453.418 51.4368C452.463 49.1535 451.052 47.3891 449.184 46.1437C447.315 44.8982 444.991 44.2755 442.209 44.2755C439.428 44.2755 437.082 44.8982 435.172 46.1437C433.263 47.3891 431.81 49.1328 430.813 51.3746C429.817 53.5749 429.319 56.1903 429.319 59.2209V68.3749C429.319 71.6131 429.879 74.4154 431 76.7817C432.162 79.1481 433.782 80.9747 435.857 82.2617C437.975 83.5071 440.403 84.1299 443.143 84.1299C445.053 84.1299 446.796 83.86 448.374 83.3203C449.952 82.7806 451.301 81.9919 452.422 80.954C453.543 79.8746 454.394 78.5876 454.975 77.0931L475.276 77.6535C474.445 82.2202 472.619 86.1849 469.796 89.5476C466.973 92.9103 463.278 95.5257 458.711 97.3939C454.145 99.2206 448.831 100.134 442.77 100.134Z"
        fill={solidFill}
      />
      <path
        d="M32.3817 100.072C24.826 100.072 18.5987 98.5771 13.6999 95.588C8.84269 92.5574 5.43846 88.3644 3.48726 83.009C1.53605 77.612 1.16242 71.3433 2.36635 64.2027C3.52877 57.0621 5.97816 50.8141 9.7145 45.4587C13.4509 40.0617 18.2666 35.8687 24.1617 32.8796C30.0568 29.849 36.7823 28.3338 44.338 28.3338C51.8522 28.3338 58.0379 29.849 62.8952 32.8796C67.7939 35.8687 71.2189 40.0617 73.1701 45.4587C75.1629 50.8141 75.5572 57.0621 74.3533 64.2027C73.1909 71.3433 70.7208 77.612 66.9429 83.009C63.2065 88.3644 58.3908 92.5574 52.4957 95.588C46.6421 98.5771 39.9374 100.072 32.3817 100.072ZM35.4953 81.639C37.6541 81.639 39.626 80.9332 41.4112 79.5217C43.1963 78.1102 44.7324 76.0967 46.0193 73.4813C47.3063 70.8243 48.2404 67.6899 48.8216 64.0781C49.4443 60.4248 49.5481 57.2904 49.133 54.675C48.7178 52.018 47.846 49.9838 46.5175 48.5723C45.189 47.1608 43.4247 46.4758 41.2244 46.5173C39.0656 46.4758 37.0729 47.1608 35.2462 48.5723C33.4611 49.9838 31.925 52.018 30.638 54.675C29.3926 57.2904 28.4793 60.4248 27.8981 64.0781C27.2753 67.6899 27.1508 70.8243 27.5244 73.4813C27.9396 76.0967 28.8114 78.1102 30.1399 79.5217C31.5099 80.9332 33.295 81.639 35.4953 81.639ZM100.856 59.7191L94.3801 98.8262H69.3466L80.9293 29.2056H105.714L103.596 42.5319H103.97C106.17 38.0898 109.263 34.6233 113.249 32.1324C117.234 29.6 121.78 28.3338 126.886 28.3338C131.827 28.3338 135.916 29.4547 139.154 31.6965C142.434 33.9383 144.738 37.0311 146.066 40.9751C147.436 44.8775 147.685 49.3818 146.814 54.4882L139.465 98.8262H114.432L120.908 59.7191C121.489 56.2733 121.074 53.5749 119.663 51.6237C118.293 49.6309 116.009 48.6346 112.813 48.6346C110.779 48.6346 108.931 49.0912 107.271 50.0046C105.61 50.8764 104.219 52.1426 103.098 53.8032C101.977 55.4223 101.23 57.3942 100.856 59.7191ZM177.551 100.072C170.12 100.072 163.831 98.6601 158.683 95.8371C153.535 92.9726 149.84 88.8626 147.598 83.5071C145.398 78.1517 144.92 71.7169 146.166 64.2027C147.37 57.0206 149.715 50.7518 153.203 45.3964C156.731 39.9995 161.257 35.8064 166.778 32.8174C172.3 29.8283 178.651 28.3338 185.833 28.3338C191.106 28.3338 195.797 29.1641 199.907 30.8247C204.059 32.4437 207.484 34.8101 210.182 37.9237C212.88 40.9958 214.749 44.7322 215.787 49.1328C216.866 53.5333 216.949 58.5151 216.036 64.0781L215.102 69.8072H152.954L155.195 56.1073H205.636L193.431 58.9718C193.929 56.1488 194.033 53.7824 193.742 51.8727C193.493 49.9215 192.766 48.4478 191.563 47.4514C190.359 46.4135 188.553 45.8946 186.145 45.8946C183.737 45.8946 181.495 46.4135 179.419 47.4514C177.385 48.4478 175.662 49.9215 174.251 51.8727C172.881 53.7824 171.967 56.1488 171.511 58.9718L169.892 68.9354C169.477 71.6754 169.435 74.0625 169.767 76.0967C170.099 78.131 170.992 79.7085 172.445 80.8294C173.898 81.9503 176.077 82.5108 178.983 82.5108C180.852 82.5108 182.554 82.2825 184.09 81.8258C185.626 81.3276 186.975 80.6219 188.138 79.7085C189.3 78.7952 190.234 77.6951 190.94 76.4081H213.732C212.154 81.2238 209.746 85.4168 206.508 88.9871C203.311 92.5159 199.284 95.2559 194.427 97.2071C189.611 99.1168 183.986 100.072 177.551 100.072Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="-98.2527"
          y1="-50.9566"
          x2="235.73"
          y2="20.6277"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.281566" stopColor="#B289F9" />
          <stop offset="0.591267" stopColor="#F989B4" />
          <stop offset="1" stopColor="#FFBC6F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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

function InviteCardMockup() {
  // Simplified QR-like pattern (21x21 modules)
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
      const data = !inFinder && !finderInner && !timing && (x + y) % 3 !== 0 && (x * 7 + y * 11) % 5 < 3;
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
        Пригласи друга в Tribe
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
          fontFamily: "monospace",
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
        Поделиться
      </div>
    </div>
  );
}

function StoriesMockup() {
  return (
    <div
      style={{
        width: 160,
        height: 284,
        borderRadius: 20,
        background:
          "linear-gradient(160deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
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
          padding: "16px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <OneTribeIcon size={24} gradientId="stories-mockup-icon-grad" />
          <span
            style={{
              color: "#fff",
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "Inter,sans-serif",
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
              fontFamily: "Inter,sans-serif",
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
              fontFamily: "Inter,sans-serif",
              marginBottom: 8,
            }}
          >
            Ты готов к настоящему?
          </div>
          <div
            style={{
              fontSize: 8,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
              fontFamily: "Inter,sans-serif",
            }}
          >
            Одно племя. Один вектор. Начни сегодня.
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
                fontFamily: "Inter,sans-serif",
                lineHeight: 1,
              }}
            >
              Присоединиться →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#B289F9",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Brand Guidelines
        </div>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#1E1E1E",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 16,
              color: "#808080",
              marginTop: 8,
              lineHeight: 1.6,
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

export default function BrandGuidelinesPage() {
  const [active, setActive] = useState("foundation");

  const scrollTo = (id: string) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActive(n.id);
            break;
          }
        }
      }
    };
    const container = document.getElementById("scroll-container");
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter Tight', Inter, sans-serif",
        background: "#FCFCFC",
      }}
    >
      {/* Sidebar — sticky с прокруткой навигации */}
      <div
        style={{
          width: 200,
          flexShrink: 0,
          alignSelf: "flex-start",
          position: "sticky",
          top: 40,
          height: "calc(100vh - 40px)",
          background: "#fff",
          borderRight: "1px solid #E6E6E6",
          display: "flex",
          flexDirection: "column",
          padding: "24px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "0 20px 24px",
            borderBottom: "1px solid #E6E6E6",
            flexShrink: 0,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <OneTribeIcon size={32} gradientId="sidebar-icon-grad" />
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#1E1E1E",
              letterSpacing: "-0.01em",
            }}
          >
            OneTribe
          </div>
          <div style={{ fontSize: 10, color: "#808080", marginTop: 2 }}>
            Brand Guidelines v1.0
          </div>
        </div>
        <nav
          style={{
            padding: "16px 0",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 20px",
                border: "none",
                cursor: "pointer",
                background:
                  active === n.id
                    ? "linear-gradient(90deg, rgba(178,137,249,0.12), transparent)"
                    : "transparent",
                borderLeft:
                  active === n.id ? "3px solid #B289F9" : "3px solid transparent",
                color: active === n.id ? "#6E22F2" : "#808080",
                fontSize: 13,
                fontWeight: active === n.id ? 700 : 500,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 14, opacity: 0.7 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div
        id="scroll-container"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "48px 56px",
          scrollPaddingTop: 60,
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 64,
            padding: 48,
            borderRadius: 24,
            background:
              "linear-gradient(135deg, #48E5FF08, #B289F915, #F989B410, #FFBC6F08)",
            border: "1px solid #E6E6E6",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "#B289F9",
              opacity: 0.08,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: 100,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "#48E5FF",
              opacity: 0.1,
              filter: "blur(35px)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#B289F9",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Brand Guidelines
            </div>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: "#1E1E1E",
                margin: "0 0 8px",
                letterSpacing: "-0.03em",
              }}
            >
              OneTribe
            </h1>
            <p
              style={{
                fontSize: 20,
                background:
                  "linear-gradient(90deg,#48E5FF,#B289F9,#F989B4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                margin: "0 0 16px",
              }}
            >
              One World · One Tribe
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#808080",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: 0,
              }}
            >
              {BRAND.description}
            </p>
          </div>
        </div>

        {/* 1. FOUNDATION */}
        <div id="foundation" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Brand Foundation"
            subtitle="Душа бренда — зачем мы существуем и во что верим"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                {
                  label: "Mission",
                  text: "Создать экосистему для настоящих человеческих связей — без алгоритмов, ботов и фальши",
                },
                {
                  label: "Vision",
                  text: "Мир, где онлайн-сообщества становятся реальными движениями, меняющими жизни людей",
                },
                {
                  label: "Values",
                  text: "Подлинность · Свобода · Сообщество · Рост · Децентрализация",
                },
                {
                  label: "Positioning",
                  text: "Новая здоровая социальная сеть — настоящие встречи, настоящие люди, реальное взаимодействие",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: 24,
                    borderRadius: 16,
                    background: "#fff",
                    border: "1px solid #E6E6E6",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#B289F9",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#1E1E1E",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Brand Personality
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {BRAND.personality.map((p) => (
                  <span
                    key={p}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 100,
                      background:
                        "linear-gradient(135deg,#48E5FF15,#B289F920)",
                      border: "1px solid #B289F940",
                      color: "#6E22F2",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Brand Voice
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {BRAND.voice.map((v) => (
                  <div
                    key={v}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: "#1E1E1E",
                    }}
                  >
                    <span style={{ color: "#48E5FF", fontSize: 16 }}>→</span>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 2. COLORS */}
        <div id="colors" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Color System"
            subtitle="Палитра, которая передаёт энергию, жизнь и движение"
          >
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Primary Palette
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 12,
                }}
              >
                {BRAND.colors.primary.map((c) => (
                  <ColorSwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Secondary / Accent
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 12,
                }}
              >
                {BRAND.colors.secondary.map((c) => (
                  <ColorSwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Neutral Palette
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5,1fr)",
                  gap: 12,
                }}
              >
                {BRAND.colors.neutral.map((c) => (
                  <ColorSwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Gradients
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {BRAND.colors.gradients.map((g) => (
                  <GradientSwatch key={g.name} g={g} />
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 3. TYPOGRAPHY */}
        <div id="typography" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Typography"
            subtitle="Inter Tight — чистый, современный, человечный"
          >
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Typeface
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 24,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: "#1E1E1E",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Aa
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 4,
                    }}
                  >
                    Inter Tight
                  </div>
                  <div style={{ fontSize: 13, color: "#808080" }}>
                    Primary typeface · All weights 100–900
                  </div>
                  <div style={{ fontSize: 13, color: "#808080", marginTop: 2 }}>
                    google.com/fonts/specimen/Inter+Tight
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 20,
                  fontSize: 18,
                  color: "#808080",
                  letterSpacing: "0.05em",
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%&*()
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Type Scale
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {BRAND.typography.scale.map((t, i) => (
                  <div
                    key={t.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      padding: "14px 0",
                      borderBottom:
                        i < BRAND.typography.scale.length - 1
                          ? "1px solid #F0F0F0"
                          : "none",
                    }}
                  >
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#B289F9",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#808080",
                          marginTop: 2,
                        }}
                      >
                        {t.size} / {t.weight}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        fontSize: t.size,
                        fontWeight: t.weight as React.CSSProperties["fontWeight"],
                        letterSpacing: t.ls,
                        lineHeight: t.lh,
                        color: "#1E1E1E",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.name === "Display"
                        ? "One Tribe"
                        : t.name === "H1"
                          ? "Начало нового мира"
                          : t.name === "H2"
                            ? "Настоящие люди, настоящие встречи"
                            : t.name === "H3"
                              ? "Присоединись к движению"
                              : t.name === "Overline"
                                ? "TRIBE AWAKENING"
                                : "Мы создаём экосистему для жизни завтрашнего дня"}
                    </div>
                    <div
                      style={{
                        width: 100,
                        flexShrink: 0,
                        fontSize: 10,
                        color: "#808080",
                        textAlign: "right",
                      }}
                    >
                      {t.use}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 4. LOGO */}
        <div id="logo" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Logo System"
            subtitle="Правила использования и охранное поле"
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#B289F9",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              OneTribe — продукт / бренд
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  padding: 40,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#808080",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Light Background
                </div>
                <OneTribeLogo dark={false} width={160} gradientId="logo-lg1" />
              </div>
              <div
                style={{
                  padding: 40,
                  borderRadius: 16,
                  background: "#1E1E1E",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#808080",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Dark Background
                </div>
                <OneTribeLogo dark={true} width={160} gradientId="logo-lg2" />
              </div>
            </div>

            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#B289F9",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Tribe — платформа
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  padding: 40,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#808080",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Light Background
                </div>
                <TribeLogo width={180} gradientId="logo-tribe1" />
              </div>
              <div
                style={{
                  padding: 40,
                  borderRadius: 16,
                  background: "#1E1E1E",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#808080",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Dark Background
                </div>
                <TribeLogo width={180} gradientId="logo-tribe2" />
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Do / Don&apos;t
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#22C55E",
                      marginBottom: 10,
                    }}
                  >
                    ✓ DO
                  </div>
                  {[
                    "Использовать оригинальные цвета бренда",
                    "Соблюдать охранное поле (мин. 16px)",
                    "Использовать на контрастном фоне",
                    "Сохранять пропорции логотипа",
                  ].map((d) => (
                    <div
                      key={d}
                      style={{
                        fontSize: 12,
                        color: "#1E1E1E",
                        marginBottom: 6,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#22C55E", flexShrink: 0 }}>✓</span>
                      {d}
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#EF4444",
                      marginBottom: 10,
                    }}
                  >
                    ✗ DON&apos;T
                  </div>
                  {[
                    "Растягивать или деформировать",
                    "Менять цвета на нефирменные",
                    "Добавлять тени или обводки",
                    "Размещать на пёстром фоне без подложки",
                  ].map((d) => (
                    <div
                      key={d}
                      style={{
                        fontSize: 12,
                        color: "#1E1E1E",
                        marginBottom: 6,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#EF4444", flexShrink: 0 }}>✗</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 5. ICONOGRAPHY */}
        <div id="iconography" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Iconography"
            subtitle="Стиль иконок — outline, 2px stroke, скруглённые концы"
          >
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  padding: "16px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <OneTribeIcon size={48} gradientId="iconography-app-icon-grad" />
                  <span
                    style={{
                      fontSize: 10,
                      color: "#808080",
                      fontWeight: 500,
                    }}
                  >
                    App Icon
                  </span>
                </div>
                {[
                  {
                    d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                    label: "Community",
                  },
                  {
                    d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
                    label: "People",
                  },
                  {
                    d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
                    label: "Chat",
                  },
                  {
                    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                    label: "Trust",
                  },
                  {
                    d: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10A15.3 15.3 0 018 12a15.3 15.3 0 014-10z",
                    label: "Global",
                  },
                  {
                    d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
                    label: "Energy",
                  },
                  {
                    d: "M12 20V10M18 20V4M6 20v-4",
                    label: "Growth",
                  },
                  {
                    d: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
                    label: "Love",
                  },
                ].map((icon) => (
                  <div
                    key={icon.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "#FCFCFC",
                        border: "1px solid #E6E6E6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={22}
                        fill="none"
                        stroke="#6E22F2"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={icon.d} />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#808080",
                        fontWeight: 500,
                      }}
                    >
                      {icon.label}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "#FCFCFC",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div style={{ fontSize: 11, color: "#808080" }}>
                  <strong style={{ color: "#1E1E1E" }}>Стиль:</strong> Outline ·{" "}
                  <strong style={{ color: "#1E1E1E" }}>Stroke:</strong> 1.8–2px
                  · <strong style={{ color: "#1E1E1E" }}>Grid:</strong> 24×24px ·{" "}
                  <strong style={{ color: "#1E1E1E" }}>Corner:</strong> Round ·{" "}
                  <strong style={{ color: "#1E1E1E" }}>Color:</strong> Brand
                  Purple / Gradient
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 6. IMAGERY */}
        <div id="imagery" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Imagery & Photography"
            subtitle="Визуальный язык, который транслирует ценности бренда"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#22C55E",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  ✓ Используем
                </div>
                {[
                  "Живые моменты, не постановочные",
                  "Люди в настоящих ситуациях",
                  "Тёплые, натуральные тона",
                  "Офлайн-встречи и события",
                  "Эмоции: радость, концентрация, связь",
                  "Естественный свет",
                ].map((i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      color: "#1E1E1E",
                      marginBottom: 7,
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#22C55E" }}>✓</span>
                    {i}
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#EF4444",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  ✗ Избегаем
                </div>
                {[
                  "Стоковые улыбающиеся офисные люди",
                  "Перенасыщенные фильтры",
                  "Холодный корпоративный стиль",
                  "Изолированные объекты на белом",
                  "Клише: рукопожатия, галочки",
                  "Постановочное счастье",
                ].map((i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      color: "#1E1E1E",
                      marginBottom: 7,
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#EF4444" }}>✗</span>
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 24,
                borderRadius: 16,
                background: "linear-gradient(135deg,#48E5FF08,#B289F912)",
                border: "1px solid #B289F930",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Visual Treatment
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#1E1E1E",
                  lineHeight: 1.7,
                }}
              >
                Декоративные элементы — размытые градиентные пятна с мягкими
                краями. Эффект глубины резкости. Создают ощущение живого медиа,
                динамики и воздуха. Всегда на светлом или тёмном фоне, никогда
                не перекрывают основной контент.
              </div>
            </div>
          </Section>
        </div>

        {/* 7. MOTION */}
        <div id="motion" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Motion & Animation"
            subtitle="Движение, которое вдохновляет — не раздражает"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              {[
                {
                  name: "Easing",
                  value: "ease-out",
                  note: "Для появлений и переходов",
                },
                {
                  name: "Duration S",
                  value: "200ms",
                  note: "Hover, micro-interactions",
                },
                {
                  name: "Duration M",
                  value: "400ms",
                  note: "Переходы между экранами",
                },
                {
                  name: "Duration L",
                  value: "600ms",
                  note: "Hero-анимации, intro",
                },
                {
                  name: "Blur Glow",
                  value: "20–40px",
                  note: "Декоративные пятна",
                },
                {
                  name: "Opacity",
                  value: "0 → 1",
                  note: "Стандартное появление",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    padding: 20,
                    borderRadius: 14,
                    background: "#fff",
                    border: "1px solid #E6E6E6",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#B289F9",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#1E1E1E",
                      marginBottom: 4,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Принципы
              </div>
              {[
                "Движение всегда служит смыслу — не развлекает ради развлечения",
                "Градиентные пятна дышат медленно (3–6 сек цикл)",
                "Текст появляется снизу вверх (translateY 12px → 0)",
                "Логотип анимируется обводкой (stroke-dashoffset)",
                "Никаких резких вспышек или агрессивных transitions",
              ].map((p) => (
                <div
                  key={p}
                  style={{
                    fontSize: 13,
                    color: "#1E1E1E",
                    marginBottom: 8,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#48E5FF", flexShrink: 0 }}>→</span>
                  {p}
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* 8. PATTERNS */}
        <div id="patterns" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Patterns & Textures"
            subtitle="Фирменные декоративные элементы"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 16,
              }}
            >
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: 10,
                    background: "#FCFCFC",
                    marginBottom: 14,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 20,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "#48E5FF",
                      opacity: 0.4,
                      filter: "blur(20px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 15,
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "#B289F9",
                      opacity: 0.5,
                      filter: "blur(16px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 15,
                      left: 40,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#F989B4",
                      opacity: 0.4,
                      filter: "blur(14px)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1E1E1E",
                    marginBottom: 4,
                  }}
                >
                  Glow Blobs
                </div>
                <div style={{ fontSize: 11, color: "#808080" }}>
                  Основной декоративный мотив. Размытые цветные пятна на светлом
                  фоне.
                </div>
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: 10,
                    background: "#FCFCFC",
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg viewBox="0 0 100 100" width={80}>
                    <defs>
                      <linearGradient
                        id="pg1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#48E5FF"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor="#B289F9"
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#pg1)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="28"
                      fill="none"
                      stroke="url(#pg1)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="50,15 82,65 18,65"
                      fill="none"
                      stroke="url(#pg1)"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="4"
                      fill="#B289F9"
                      opacity={0.6}
                    />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1E1E1E",
                    marginBottom: 4,
                  }}
                >
                  Sacred Geometry
                </div>
                <div style={{ fontSize: 11, color: "#808080" }}>
                  Круги, треугольники — символы единства и племени. Используется
                  в фоне.
                </div>
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: 10,
                    background: "#FCFCFC",
                    marginBottom: 14,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 48,
                      fontWeight: 900,
                      color: "#B289F9",
                      opacity: 0.08,
                      letterSpacing: "-0.03em",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    }}
                  >
                    tribe tribe
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1E1E1E",
                    marginBottom: 4,
                  }}
                >
                  Word Watermark
                </div>
                <div style={{ fontSize: 11, color: "#808080" }}>
                  Крупный полупрозрачный текст как фоновый элемент. Из примеров
                  креативов.
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 9. LAYOUT */}
        <div id="layout" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Layout & Grid"
            subtitle="Принципы сетки и пространства"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#B289F9",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Spacing Scale
                </div>
                {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: s,
                        height: s,
                        background:
                          "linear-gradient(135deg,#48E5FF,#B289F9)",
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#1E1E1E",
                      }}
                    >
                      {s}px
                    </span>
                    <span style={{ fontSize: 11, color: "#808080" }}>
                      {s <= 8 ? "XS" : s <= 16 ? "S" : s <= 24 ? "M" : s <= 32 ? "L" : "XL"}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#B289F9",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Border Radius Scale
                </div>
                {[
                  { r: 4, name: "XS — inputs, tags" },
                  { r: 8, name: "S — buttons" },
                  { r: 12, name: "M — cards small" },
                  { r: 16, name: "L — cards" },
                  { r: 24, name: "XL — panels, modals" },
                  { r: 9999, name: "Full — pills, avatars" },
                ].map((item) => (
                  <div
                    key={item.r}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 24,
                        background:
                          "linear-gradient(135deg,#48E5FF30,#B289F940)",
                        border: "1.5px solid #B289F9",
                        borderRadius: item.r,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#1E1E1E",
                      }}
                    >
                      {item.r === 9999 ? "9999" : item.r}px
                    </span>
                    <span style={{ fontSize: 11, color: "#808080" }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Принципы композиции
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  "Воздух важнее плотности — не бойся пустого пространства",
                  "Контент всегда на первом месте, декор — поддерживает",
                  "Выравнивание по сетке 8px",
                  "Максимальная ширина контента 1280px",
                  "Мобайл-фёрст для всех digital-форматов",
                  "Контраст текста минимум 4.5:1 (WCAG AA)",
                ].map((p) => (
                  <div
                    key={p}
                    style={{
                      fontSize: 13,
                      color: "#1E1E1E",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#48E5FF", flexShrink: 0 }}>→</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 10. APPLICATIONS */}
        <div id="applications" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Applications"
            subtitle="Бренд в реальном мире — digital и физические носители"
          >
            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Merch — T-Shirt
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                      maxWidth: 280,
                    }}
                  >
                    <Image
                      src="/tshirt-mockup-man.png"
                      alt="OneTribe футболка — фото на модели"
                      width={280}
                      height={360}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    Classic Tee — Minimal Logo
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      maxWidth: 260,
                    }}
                  >
                    Логотип по центру груди. Градиентный символ + wordmark.
                    Минимализм, который говорит сам за себя.
                  </div>
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    {["#FFFFFF", "#1E1E1E", "#6E22F2"].map((c) => (
                      <div
                        key={c}
                        title={c}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: c,
                          border: "2px solid #E6E6E6",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 11, color: "#808080" }}>
                    Доступные цвета: White, Black, Deep Purple
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Physical — Water Bottle
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    maxWidth: 240,
                  }}
                >
                  <Image
                    src="/water-bottle.png"
                    alt="OneTribe бутылка воды — логотип на этикетке"
                    width={240}
                    height={360}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    OneTribe Water Bottle
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Бутылка воды с этикеткой onetribe. «one» в градиенте
                    (purple → pink → orange → cyan), «tribe» — чёрный.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> wrap
                      print
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Стиль:</strong> белая
                      этикетка, логотип по центру
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Physical — Sticker Pack
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12,
                    maxWidth: 420,
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
                    <div
                      key={s.src}
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        aspectRatio: "1",
                        background: "#FCFCFC",
                        padding: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={128}
                        height={128}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    OneTribe Sticker Pack
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    6 стикеров в фирменном стиле. Градиентные фоны, белая обводка,
                    мотивационные фразы (RU/EN/DE). Для мессенджеров и соцсетей.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> 512
                      × 512px
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Стиль:</strong> белая
                      обводка 4px
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Digital — Stories / Reels
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <StoriesMockup />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    Tribe Awakening Stories
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Тёмный фон + градиентные пятна. Создаёт ощущение живого
                    медиа. Энергия, вдохновение, движение.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> 1080
                      × 1920px
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Шрифт:</strong> Inter
                      Tight Bold
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Фон:</strong> #0a0a1a
                      + gradient blobs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Digital — Invite Card
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <InviteCardMockup />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    Личный QR-код приглашения
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Карточка, которую клиент получает, когда хочет поделиться
                    приглашением в сообщество с другом. QR-код ведёт на персональную
                    ссылку-приглашение. Код формата INVITE-XXXXXX.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Контекст:</strong>{" "}
                      раздел «Пригласить» в приложении
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong>{" "}
                      карточка 280×400px, share / export
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Physical — Flag
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    maxWidth: 320,
                  }}
                >
                  <Image
                    src="/flag-mockup.png"
                    alt="OneTribe flag mockup — white flag with onetribe logo"
                    width={320}
                    height={480}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    OneTribe Flag
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Белый флаг с логотипом onetribe по центру. «one» в градиенте
                    (purple → pink → orange), «tribe» — чёрный. Формат 2:3.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> 900
                      × 1350px (2:3)
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Фон:</strong> белый
                      (#FFFFFF)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Physical — Pin Badge
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    maxWidth: 280,
                  }}
                >
                  <Image
                    src="/pin-badge.png"
                    alt="OneTribe pin badge — gradient circle with tribe text"
                    width={280}
                    height={280}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    OneTribe Pin Badge
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Круглый значок с градиентом (cyan → lavender → pink) и белым
                    словом «tribe». Глянцевая выпуклая поверхность.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> круг
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Стиль:</strong> pin
                      badge с застёжкой
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Physical — Roll-up Banner
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    maxWidth: 400,
                  }}
                >
                  <Image
                    src="/rollup-mockup.png"
                    alt="OneTribe roll-up banners — vertical stand banners with gradient"
                    width={400}
                    height={600}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    OneTribe Roll-up
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Вертикальный роллап-баннер с градиентным фоном (cyan → pink
                    → purple). Логотип tribe, заголовок, CTA-кнопка. Стенд на
                    мероприятиях.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> 850
                      × 2000mm
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Варианты:</strong> с
                      мокапом приложения или отзывами
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Physical — Chocolate Bar
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    maxWidth: 360,
                  }}
                >
                  <Image
                    src="/chocolate.png"
                    alt="OneTribe chocolate bars — wrapped and unwrapped"
                    width={360}
                    height={240}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    OneTribe Chocolate
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Шоколадный мерч с логотипом tribe. Обёртка с иридисцентным
                    градиентом (голубой, розовый, фиолетовый). Тёмная плитка с
                    тиснением.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Обёртка:</strong> иридисцентный градиент
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Стиль:</strong> cyan,
                      purple, pink, peach
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              {[
                {
                  name: "Event Banner",
                  size: "3000 × 1000px",
                  note: "Горизонтальный баннер мероприятия",
                },
                {
                  name: "Flag",
                  size: "900 × 1350px",
                  note: "Флаг 2:3, логотип по центру",
                },
                {
                  name: "Name Badge",
                  size: "90 × 55mm",
                  note: "Бейдж участника события",
                },
                {
                  name: "Sticker Pack",
                  size: "512 × 512px",
                  note: "6 стикеров, белая обводка 4px",
                },
                {
                  name: "Roll-up",
                  size: "850 × 2000mm",
                  note: "Стенд на мероприятии",
                },
                {
                  name: "Mug / Bottle",
                  size: "wrap print",
                  note: "Логотип + слоган по кругу",
                },
              ].map((f) => (
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
                      fontFamily: "monospace",
                      color: "#B289F9",
                      marginBottom: 6,
                    }}
                  >
                    {f.size}
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    {f.note}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            padding: "24px 0",
            borderTop: "1px solid #E6E6E6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: "#808080" }}>
            OneTribe Brand Guidelines v1.0
          </div>
          <div
            style={{
              fontSize: 12,
              background:
                "linear-gradient(90deg,#48E5FF,#B289F9,#F989B4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            One World · One Tribe
          </div>
        </div>
      </div>
    </div>
  );
}
