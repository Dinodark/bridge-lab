"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const TEXTS = {
  ru: {
    metaTitle: "TRIBE — Платформа сообществ | Найди свой Tribe",
    join: "Присоединиться",
    sectionProblem: "Проблема",
    sectionVision: "Видение",
    sectionSteps: "Как это работает",
    sectionFeatures: "Ключевые функции",
    sectionShare2earn: "Share2Earn",
    sectionForWhom: "Для кого TRIBE?",
    sectionGovernance: "Управление сообществом",
    sectionRoadmap: "Дорожная карта",
    sectionFaq: "Вопросы",
    heroTitle: "Будущее сообществ уже здесь",
    heroSubLine1: "Первая в Европе здоровая соцсеть.",
    heroSubLine2: "Для настоящих связей, настоящих людей и настоящего роста. Уже более 50 000 человек, которым надоела фейковая жизнь.",
    findTribe: "Найди свой Tribe",
    howItWorks: "Как это работает",
    online: "человек онлайн",
    members: "уже в движении",
    problemTitle: "Связаны как никогда. Одиноки как никогда.",
    stat1Value: "0.0B",
    stat1Label: "Человек в соцсетях",
    stat2Value: "0%",
    stat2Label: "Чувствуют себя одинокими",
    stat3Value: "0",
    stat3Label: "Настоящих Tribes создано",
    stat4Value: "1",
    stat4Label: "Миссия",
    problemSub: "Соцсети обещали связь. Получилось сравнение, тревога и одиночество. Мы листаем тысячи лиц и не находим своих.",
    problem1: "Миллиарды людей листают ленту каждый день — но подписчики не друзья.",
    problem2: "Платформы поощряют охваты, а не отношения. Лайки ≠ принадлежность.",
    problem3: "Итог: целое поколение «на связи» — и при этом одинокое.",
    problemEnd: "Проблема не в технологиях. Проблема в том, что ни одна платформа не строит настоящие сообщества.",
    oldSocial: "Старые соцсети",
    tribe: "TRIBE",
    vsFollower: "Подписчики вместо друзей",
    vsBelonging: "Настоящая принадлежность",
    vsViews: "Просмотры вместо связи",
    vsConnection: "Настоящие связи",
    vsAlgo: "Алгоритмы вместо искренности",
    vsAuthentic: "Искренний контент",
    vsCompare: "Сравнение вместо сообщества",
    vsCommunity: "Настоящие сообщества",
    vsVanity: "Метрики тщеславия",
    vsGrowth: "Личный рост",
    vsScroll: "Бесконечный скролл",
    vsParticipate: "Активное участие",
    visionTitle: "Возврат к тому, что делает нас людьми.",
    visionSub: "В древности люди жили племенами. Племя означало идентичность. Защиту. Рост. Цель. Братство и сестринство. Современное общество разрушило эту структуру. TRIBE возвращает её. В цифре и в реальной жизни.",
    identity: "Идентичность",
    protection: "Защита",
    growth: "Рост",
    purpose: "Цель",
    brotherhood: "Братство",
    visionTrailer: "TRIBE Vision Trailer",
    readyFind: "Готов найти свой Tribe?",
    startNow: "Начать сейчас",
    stepsTitle: "Три шага к принадлежности.",
    step1Title: "Вступи",
    step1Desc: "Создай профиль и стань частью движения. Бесплатно, за секунды.",
    step2Title: "Найди свой Tribe",
    step2Desc: "Открой людей, которые разделяют твои ценности и увлечения.",
    step3Title: "Приходи",
    step3Desc: "Настоящие разговоры, настоящие события, настоящая принадлежность — онлайн и офлайн.",
    featuresTitle: "Соцсети как им и положено.",
    feature1Title: "Настоящие люди, настоящие разговоры",
    feature1Desc: "Никаких ботов, фейков и алгоритмов. В TRIBE ты видишь посты от живых людей — хронологически, без фильтров, по-настоящему.",
    verified: "Верифицированные профили",
    chronological: "Хронологическая лента",
    noAds: "Без рекламы",
    realInteraction: "Настоящее взаимодействие",
    feature2Title: "Здоровый по дизайну",
    feature2Desc: "Никакого бесконечного скролла, тёмных паттернов и зависимостей. TRIBE — первая платформа, построенная с заботой о твоём благополучии.",
    noDoomscroll: "Без думскроллинга",
    noDarkPatterns: "Без тёмных паттернов",
    screenTime: "Контроль экранного времени",
    positiveEnv: "Позитивная среда",
    feature3Title: "Связи офлайн",
    feature3Desc: "TRIBE не заканчивается у экрана. Находи события, митапы и встречи рядом. Настоящая дружба рождается в реальной жизни.",
    localEvents: "Локальные события",
    meetups: "Митапы",
    communityMeet: "Встречи сообществ",
    retreats: "Ретриты",
    feature4Title: "Твоя идентичность имеет значение",
    feature4Desc: "У каждого участника есть профиль с XP, статусом и признанием. Не пассивный скролл — активное участие, которое вознаграждается.",
    xpSystem: "Система XP",
    statusLevel: "Уровни статуса",
    achievements: "Достижения",
    recognition: "Признание",
    share2earnTitle: "Делись движением. Получай награды.",
    share2earnSub: "TRIBE растёт благодаря людям. Когда ты делишься платформой и помогаешь Tribes расти — получаешь реальные награды. Без рекламы. Без посредников.",
    share: "Делиться",
    shareDesc: "Приглашай друзей, делись своим Tribe, распространяй слово. Каждая связь важна.",
    grow: "Расти",
    growDesc: "Смотри, как растёт твой Tribe. Чем больше растёт сообщество — тем больше ты получаешь.",
    earn: "Зарабатывать",
    earnDesc: "Получай награды за то, что строишь движение. Эксклюзивные плюшки, статус и доход.",
    growthLoop: "Цикл роста TRIBE",
    loopSteps: "Ты вступаешь → Делишься → Другие вступают → Ты получаешь → Повтор",
    forWhomTitle: "Для тех, кто хочет что-то настоящее.",
    creators: "Креаторы",
    creatorsDesc: "Показывай, кто ты на самом деле. Без алгоритма, без фейка — твой контент доходит до тех, кто действительно хочет его видеть.",
    entrepreneurs: "Предприниматели",
    entrepreneursDesc: "Настоящие контакты вместо LinkedIn-спама. Найди единомышленников на одной волне.",
    coaches: "Коучи",
    coachesDesc: "Веди людей в среде, которая поддерживает рост, а не отвлечение. Без токсичного сравнения.",
    influencers: "Инфлюенсеры",
    influencersDesc: "Твоё сообщество, а не алгоритм, решает твою охваты. Настоящие фанаты вместо фейковых подписчиков.",
    eventOrgs: "Организаторы событий",
    eventOrgsDesc: "Собирай людей — локально или глобально. Ради общих ценностей, а не ради кликов.",
    everyone: "Люди как ты",
    everyoneDesc: "Найди своих. Общайся через то, что тебе действительно важно. Больше никогда не быть одним.",
    governanceTitle: "Не один решает. Tribe решает.",
    governanceSub: "Каждый Tribe может создавать голосования и принимать решения вместе. Прозрачно, честно и демократично.",
    votesPolls: "Голосования и опросы",
    votesDesc: "Создавай голосования по любому вопросу. Твой Tribe голосует.",
    decideTogether: "Решаем вместе",
    decideDesc: "Участники определяют, куда развивается сообщество.",
    transparentPriorities: "Прозрачные приоритеты",
    transparentDesc: "Идеи видны и приоритизированы. Каждый голос учитывается.",
    yourRules: "Твой Tribe — ваши правила",
    rulesDesc: "Каждый хост может включить DAO-функции для своего сообщества.",
    roadmapTitle: "Куда идём.",
    roadmapSub: "У видения есть вехи. Вот план того, как TRIBE меняет мир.",
    firstVotes: "Первые голоса",
    firstVotesSub: "Люди готовы.",
    statsMembers: "Участников",
    statsTribes: "Tribes",
    statsCountries: "Стран",
    statsMission: "Миссия",
    ctaTitle: "Твой Tribe ждёт.",
    ctaSub: "Будь среди первых пионеров, пока мы не вышли в мир. Стань частью TRIBE и формируй будущее сообществ.",
    ctaFree: "100% бесплатно начать",
    ctaSeconds: "За секунды в деле",
    ctaJoin: "Присоединиться",
    faqTitle: "Вопросы?",
    whatIs: "Что такое TRIBE?",
    whatIsAnswer: "TRIBE — первая здоровая европейская соцсеть, созданная для настоящих людей, а не для алгоритмов. Более 50 000 участников, которым надоела фейковая жизнь. Без думскроллинга, без фейковых лайков — только настоящие связи, рост и сообщество, которое держится вместе.",
    howDiffers: "Чем TRIBE отличается от Facebook, Instagram или Discord?",
    howDiffersAnswer: "В Facebook и Instagram ты — продукт: твои данные продают, алгоритм решает, что ты видишь. TRIBE другой: европейская, прозрачная, честная. Построена для сообществ, а не для рекламных корпораций. С Share2Earn, DAO-управлением и настоящими инструментами для креаторов.",
    whatShare2earn: "Что такое Share2Earn?",
    share2earnAnswer: "Вместо миллиардов на рекламу TRIBE награждает сообщество напрямую. Когда ты делишься TRIBE и помогаешь другим стать частью движения — получаешь реальные награды. Без спама, без уловок — рост, который выгоден всем.",
    canEarn: "Можно ли зарабатывать с TRIBE?",
    canEarnAnswer: "Да — и честно. TRIBE даёт встроенные инструменты для подписок, цифровых продуктов, событий и коллабораций с Tribes. Плюс модель Share2Earn, где ты напрямую участвуешь в росте платформы.",
    whenLaunch: "Когда запуск TRIBE?",
    whenLaunchAnswer: "TRIBE уже работает с более чем 50 000 участниками! Мы в пионерской фазе: кто сейчас с нами — активно формирует платформу и получает преимущества первым.",
    isFree: "TRIBE бесплатный?",
    isFreeAnswer: "Да, TRIBE бесплатен. Можно вступать в сообщества, знакомиться и участвовать в Share2Earn — без оплаты. Для креаторов есть дополнительные премиум-инструменты.",
    footerTagline: "Будущее сообществ.",
    privacy: "Конфиденциальность",
    terms: "Условия",
    imprint: "Импрессум",
    copyright: "© 2026 Tribe Creator AG",
  },
  de: {
    metaTitle: "TRIBE - Community Plattform | Finde deinen Tribe",
    join: "Jetzt beitreten",
    sectionProblem: "Das Problem",
    sectionVision: "Die Vision",
    sectionSteps: "So funktioniert's",
    sectionFeatures: "Kernfunktionen",
    sectionShare2earn: "Share2Earn",
    sectionForWhom: "Für wen ist TRIBE?",
    sectionGovernance: "Community Governance",
    sectionRoadmap: "Roadmap",
    sectionFaq: "FAQ",
    heroTitle: "Die Zukunft der Community ist hier",
    heroSubLine1: "Europas erste gesunde Social-Media-Plattform.",
    heroSubLine2: "Für echte Verbindungen. Echte Menschen. Echtes Wachstum. Bereits über 50.000 Menschen, die keine Lust mehr auf Fake haben.",
    findTribe: "Finde deinen Tribe",
    howItWorks: "So funktioniert's",
    online: "Personen sind gerade online",
    members: "Menschen sind bereits Teil der Bewegung",
    problemTitle: "Vernetzter als je zuvor. Einsamer als je zuvor.",
    stat1Value: "0.0B",
    stat1Label: "Menschen auf Social Media",
    stat2Value: "0%",
    stat2Label: "Fühlen sich chronisch einsam",
    stat3Value: "0",
    stat3Label: "Echte Tribes gebaut",
    stat4Value: "1",
    stat4Label: "Mission",
    problemSub: "Social Media versprach Verbindung. Es lieferte Vergleich, Angst und Einsamkeit. Wir scrollen durch Tausende von Gesichtern, aber finden nie unsere Leute.",
    problem1: "3.5 Milliarden Menschen scrollen täglich — aber Follower sind keine Freunde.",
    problem2: "Plattformen belohnen Reichweite, nicht Beziehungen. Likes ≠ Zugehörigkeit.",
    problem3: "Ergebnis: Eine ganze Generation ist 'connected' — aber einsamer als je zuvor.",
    problemEnd: "Das Problem ist nicht Technologie. Das Problem ist, dass keine Plattform echte Communities baut.",
    oldSocial: "Altes Social Media",
    tribe: "TRIBE",
    vsFollower: "Follower statt Freunde",
    vsBelonging: "Echte Zugehörigkeit",
    vsViews: "Views statt Verbindung",
    vsConnection: "Echte Verbindungen",
    vsAlgo: "Algorithmen statt Authentizität",
    vsAuthentic: "Authentische Inhalte",
    vsCompare: "Vergleich statt Community",
    vsCommunity: "Echte Communities",
    vsVanity: "Eitelkeitsmetriken",
    vsGrowth: "Persönliches Wachstum",
    vsScroll: "Endloses Scrollen",
    vsParticipate: "Aktive Teilnahme",
    visionTitle: "Zurück zu dem, was uns menschlich macht.",
    visionSub: "In der Antike lebten Menschen in Stämmen. Ein Stamm bedeutete Identität. Schutz. Wachstum. Zweck. Bruder- und Schwesterschaft. Die moderne Gesellschaft hat diese Struktur zerstört. TRIBE bringt sie zurück. Digital und im echten Leben.",
    identity: "Identität",
    protection: "Schutz",
    growth: "Wachstum",
    purpose: "Zweck",
    brotherhood: "Bruderschaft",
    visionTrailer: "TRIBE Vision Trailer",
    readyFind: "Bereit, deinen Tribe zu finden?",
    startNow: "Jetzt starten",
    stepsTitle: "Drei Schritte zur Zugehörigkeit.",
    step1Title: "Tritt bei",
    step1Desc: "Erstelle dein Profil und werde Teil der Bewegung. Kostenlos, in Sekunden.",
    step2Title: "Finde deinen Tribe",
    step2Desc: "Entdecke Menschen, die deine Werte und Leidenschaften teilen.",
    step3Title: "Komm an",
    step3Desc: "Echte Gespräche, echte Events, echte Zugehörigkeit – online & offline.",
    featuresTitle: "Social Media, wie es sein sollte.",
    feature1Title: "Echte Menschen, echte Gespräche",
    feature1Desc: "Keine Bots, keine Fake-Accounts, kein Algorithmus. Auf TRIBE siehst du echte Posts von echten Menschen — chronologisch, ungefiltert, authentisch.",
    verified: "Verifizierte Profile",
    chronological: "Chronologischer Feed",
    noAds: "Keine Werbung",
    realInteraction: "Echte Interaktionen",
    feature2Title: "Gesund by Design",
    feature2Desc: "Kein endloses Scrollen, keine Dark Patterns, keine Sucht-Mechanismen. TRIBE ist die erste Plattform, die für dein Wohlbefinden gebaut wurde.",
    noDoomscroll: "Kein Doom-Scrolling",
    noDarkPatterns: "Keine Dark Patterns",
    screenTime: "Bildschirmzeit-Kontrolle",
    positiveEnv: "Positive Umgebung",
    feature3Title: "Offline Verbindungen",
    feature3Desc: "TRIBE hört nicht am Bildschirm auf. Finde Events, Meetups und Treffen in deiner Nähe. Echte Freundschaften entstehen im echten Leben.",
    localEvents: "Lokale Events",
    meetups: "Meetups",
    communityMeet: "Community-Treffen",
    retreats: "Retreats",
    feature4Title: "Deine Identität zählt",
    feature4Desc: "Jedes Mitglied hat ein Profil mit XP, Status und Anerkennung. Kein passives Scrollen — aktive Teilnahme, die belohnt wird.",
    xpSystem: "XP System",
    statusLevel: "Status Level",
    achievements: "Erfolge",
    recognition: "Anerkennung",
    share2earnTitle: "Teile die Bewegung. Verdiene Belohnungen.",
    share2earnSub: "TRIBE wächst durch seine Menschen. Wenn du die Plattform teilst und Tribes wachsen hilfst, verdienst du echte Belohnungen. Keine Werbung. Keine Mittelsmänner.",
    share: "Teilen",
    shareDesc: "Lade Freunde ein, teile deinen Tribe, verbreite das Wort. Jede Verbindung zählt.",
    grow: "Wachsen",
    growDesc: "Sieh zu, wie dein Tribe wächst. Je mehr deine Community wächst, desto mehr verdienst du.",
    earn: "Verdienen",
    earnDesc: "Werde belohnt für den Aufbau der Bewegung. Exklusive Perks, Status und Einkommen.",
    growthLoop: "The TRIBE Growth Loop",
    loopSteps: "Du trittst TRIBE bei→Du teilst es→Andere treten bei→Du verdienst→Repeat",
    forWhomTitle: "Für alle, die etwas Echtes wollen.",
    creators: "Creators",
    creatorsDesc: "Zeig wer du wirklich bist. Ohne Algorithmus, ohne Fake — dein Content erreicht Menschen, die ihn wirklich sehen wollen.",
    entrepreneurs: "Unternehmer",
    entrepreneursDesc: "Echte Connections statt LinkedIn-Spam. Finde Gleichgesinnte, die auf Augenhöhe mit dir sind.",
    coaches: "Coaches",
    coachesDesc: "Begleite Menschen in einem Umfeld, das Wachstum fördert statt Ablenkung. Ohne toxische Vergleiche.",
    influencers: "Influencer",
    influencersDesc: "Deine Community, nicht der Algorithmus, entscheidet über deine Reichweite. Echte Fans statt Fake-Follower.",
    eventOrgs: "Event-Organisatoren",
    eventOrgsDesc: "Bring Menschen zusammen — lokal oder global. Für gemeinsame Werte, nicht für Klicks.",
    everyone: "Menschen wie du",
    everyoneDesc: "Finde deine Leute. Verbinde dich über das, was dir wirklich wichtig ist. Nie wieder allein.",
    governanceTitle: "Nicht einer entscheidet. Der Tribe entscheidet.",
    governanceSub: "Jeder Tribe kann Abstimmungen erstellen und gemeinsam Entscheidungen treffen. Transparent, fair und demokratisch.",
    votesPolls: "Votes & Polls",
    votesDesc: "Erstelle Abstimmungen zu jeder Frage. Dein Tribe stimmt ab.",
    decideTogether: "Gemeinsam entscheiden",
    decideDesc: "Mitglieder bestimmen, wohin sich die Community entwickelt.",
    transparentPriorities: "Transparente Prioritäten",
    transparentDesc: "Ideen werden sichtbar priorisiert. Jede Stimme zählt.",
    yourRules: "Dein Tribe, eure Regeln",
    rulesDesc: "Jeder Host kann DAO-Features für seine Community aktivieren.",
    roadmapTitle: "Wohin die Reise geht.",
    roadmapSub: "Unsere Vision hat Meilensteine. Hier ist der Plan, wie TRIBE die Welt verändert.",
    firstVotes: "Erste Stimmen",
    firstVotesSub: "Menschen sind bereit.",
    statsMembers: "Mitglieder",
    statsTribes: "Tribes",
    statsCountries: "Länder",
    statsMission: "Mission",
    ctaTitle: "Dein Tribe wartet.",
    ctaSub: "Sei einer der ersten Pioniere, bevor wir weltweit gehen. Werde Teil von TRIBE und gestalte die Zukunft der Community mit.",
    ctaFree: "100% kostenlos starten",
    ctaSeconds: "In Sekunden dabei",
    ctaJoin: "Jetzt beitreten",
    faqTitle: "Fragen?",
    whatIs: "Was ist TRIBE?",
    whatIsAnswer: "TRIBE ist die erste gesunde europäische Social-Media-Plattform — gebaut für echte Menschen, nicht für Algorithmen. Über 50.000 Mitglieder, die keine Lust mehr auf Fake haben. Kein Doomscrolling, keine Fake-Likes — sondern echte Verbindungen, echtes Wachstum und eine Community, die zusammenhält.",
    howDiffers: "Wie unterscheidet sich TRIBE von Facebook, Instagram oder Discord?",
    howDiffersAnswer: "Bei Facebook und Instagram bist du das Produkt — deine Daten werden verkauft, der Algorithmus bestimmt was du siehst. TRIBE ist anders: europäisch, transparent, fair. Gebaut für Communities, nicht für Werbekonzerne. Mit Share2Earn, DAO-Governance und echten Tools für Creator.",
    whatShare2earn: "Was ist Share2Earn?",
    share2earnAnswer: "Statt Milliarden in Werbung zu stecken, belohnt TRIBE die Community direkt. Wenn du TRIBE teilst und anderen hilfst Teil der Bewegung zu werden, verdienst du echte Belohnungen. Kein Spam, keine Tricks — echtes Wachstum, das sich für alle lohnt.",
    canEarn: "Kann ich mit TRIBE Geld verdienen?",
    canEarnAnswer: "Ja — und zwar auf faire Weise. TRIBE bietet integrierte Tools für Mitgliedschaften, digitale Produkte, Events und Tribe-Kooperationen. Plus das Share2Earn-Modell, bei dem du am Wachstum der Plattform direkt teilhast.",
    whenLaunch: "Wann startet TRIBE?",
    whenLaunchAnswer: "TRIBE ist bereits live mit über 50.000 Mitgliedern! Wir sind in der Pionier-Phase — das heisst: Wer jetzt dabei ist, gestaltet die Plattform aktiv mit und profitiert als Erster.",
    isFree: "Ist TRIBE kostenlos?",
    isFreeAnswer: "Ja, TRIBE ist kostenlos nutzbar. Du kannst Communities beitreten, dich vernetzen und am Share2Earn teilnehmen — alles ohne Kosten. Für Creator gibt es zusätzliche Premium-Tools.",
    footerTagline: "Die Zukunft der Community.",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    imprint: "Impressum",
    copyright: "© 2026 Tribe Creator AG",
  },
} as const;

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`tribe-landing-section px-4 sm:px-6 max-w-5xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function Heading2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`tribe-landing-h2 ${className}`}>
      {children}
    </h2>
  );
}

function Heading3({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`tribe-landing-h3 ${className}`}>
      {children}
    </h3>
  );
}

export default function TribeLandingPage() {
  const { lang } = useLanguage();
  const t = TEXTS[lang];

  return (
    <div className="tribe-landing min-h-screen">
      {/* Hero — welcome.tribe.de style */}
      <header className="tribe-landing-hero relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="tribe-landing-label text-white/80 mb-4">TRIBE</p>
          <h1 className="tribe-landing-h1 text-white mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-2 leading-relaxed font-medium">
            {t.heroSubLine1}
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSubLine2}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link href="/tribe" className="tribe-landing-btn-primary inline-flex items-center gap-2">
              {t.findTribe}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/vision" className="tribe-landing-btn-outline inline-flex items-center gap-2">
              {t.howItWorks}
            </Link>
          </div>
          <p className="text-sm text-white/70">
            <strong>0</strong> {t.online} · <strong>50.000+</strong> {t.members}
          </p>
        </div>
      </header>

      {/* Problem */}
      <Section>
        <p className="tribe-landing-label mb-2">{t.sectionProblem}</p>
        <Heading2 className="mb-4">{t.problemTitle}</Heading2>
        <p className="text-lg text-[var(--tribe-landing-muted)] mb-6 max-w-2xl">{t.problemSub}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="tribe-landing-stat-box">
            <div className="text-2xl font-bold text-[var(--color-cta1)]">{t.stat1Value}</div>
            <div className="text-sm text-[var(--tribe-landing-muted)] mt-1">{t.stat1Label}</div>
          </div>
          <div className="tribe-landing-stat-box">
            <div className="text-2xl font-bold text-[var(--color-cta1)]">{t.stat2Value}</div>
            <div className="text-sm text-[var(--tribe-landing-muted)] mt-1">{t.stat2Label}</div>
          </div>
          <div className="tribe-landing-stat-box">
            <div className="text-2xl font-bold text-[var(--color-cta1)]">{t.stat3Value}</div>
            <div className="text-sm text-[var(--tribe-landing-muted)] mt-1">{t.stat3Label}</div>
          </div>
          <div className="tribe-landing-stat-box">
            <div className="text-2xl font-bold text-[var(--color-cta1)]">{t.stat4Value}</div>
            <div className="text-sm text-[var(--tribe-landing-muted)] mt-1">{t.stat4Label}</div>
          </div>
        </div>
        <ul className="space-y-4 text-[var(--tribe-landing-text)] mb-8">
          <li className="flex gap-3">
            <span className="text-[var(--color-cta1)] font-bold">1.</span>
            {t.problem1}
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-cta1)] font-bold">2.</span>
            {t.problem2}
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-cta1)] font-bold">3.</span>
            {t.problem3}
          </li>
        </ul>
        <p className="text-[var(--tribe-landing-muted)] font-medium">{t.problemEnd}</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="tribe-landing-compare-left p-6">
            <p className="text-sm font-semibold text-[var(--tribe-landing-muted)] uppercase tracking-wider mb-4">{t.oldSocial}</p>
            <ul className="space-y-2 text-[var(--tribe-landing-muted)] text-sm">
              <li>· {t.vsFollower}</li>
              <li>· {t.vsViews}</li>
              <li>· {t.vsAlgo}</li>
              <li>· {t.vsCompare}</li>
              <li>· {t.vsVanity}</li>
              <li>· {t.vsScroll}</li>
            </ul>
          </div>
          <div className="tribe-landing-compare-right p-6">
            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--color-cta1)" }}>{t.tribe}</p>
            <ul className="space-y-2 text-[var(--tribe-landing-text)] text-sm">
              <li>· {t.vsBelonging}</li>
              <li>· {t.vsConnection}</li>
              <li>· {t.vsAuthentic}</li>
              <li>· {t.vsCommunity}</li>
              <li>· {t.vsGrowth}</li>
              <li>· {t.vsParticipate}</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Vision */}
      <Section className="bg-white">
        <p className="tribe-landing-label mb-2">{t.sectionVision}</p>
        <Heading2 className="mb-4">{t.visionTitle}</Heading2>
        <p className="text-lg text-[#555] mb-10 max-w-2xl">{t.visionSub}</p>
        <div className="flex flex-wrap gap-4 mb-10">
          {[t.identity, t.protection, t.growth, t.purpose, t.brotherhood].map((label) => (
            <span key={label} className="tribe-landing-tag">
              {label}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#888] mb-6">{t.visionTrailer}</p>
        <p className="font-semibold text-[var(--tribe-landing-text)] mb-6">{t.readyFind}</p>
        <Link href="/tribe" className="tribe-landing-btn-primary inline-flex items-center gap-2">
          {t.startNow}
        </Link>
      </Section>

      {/* How it works */}
      <Section>
        <p className="tribe-landing-label mb-2">{t.sectionSteps}</p>
        <Heading2 className="mb-2">{t.stepsTitle}</Heading2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div>
            <span className="text-3xl font-bold text-[var(--color-cta1)]">01</span>
            <Heading3 className="mt-2 mb-2">{t.step1Title}</Heading3>
            <p className="text-[#555] text-sm">{t.step1Desc}</p>
          </div>
          <div>
            <span className="text-3xl font-bold text-[var(--color-cta1)]">02</span>
            <Heading3 className="mt-2 mb-2">{t.step2Title}</Heading3>
            <p className="text-[#555] text-sm">{t.step2Desc}</p>
          </div>
          <div>
            <span className="text-3xl font-bold text-[var(--color-cta1)]">03</span>
            <Heading3 className="mt-2 mb-2">{t.step3Title}</Heading3>
            <p className="text-[#555] text-sm">{t.step3Desc}</p>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-white">
        <p className="tribe-landing-label mb-2">{t.sectionFeatures}</p>
        <Heading2 className="mb-10">{t.featuresTitle}</Heading2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="tribe-landing-card p-6">
            <Heading3 className="mb-2">{t.feature1Title}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm mb-4">{t.feature1Desc}</p>
            <div className="flex flex-wrap gap-2">
              {[t.verified, t.chronological, t.noAds, t.realInteraction].map((tag) => (
                <span key={tag} className="tribe-landing-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="tribe-landing-card p-6">
            <Heading3 className="mb-2">{t.feature2Title}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm mb-4">{t.feature2Desc}</p>
            <div className="flex flex-wrap gap-2">
              {[t.noDoomscroll, t.noDarkPatterns, t.screenTime, t.positiveEnv].map((tag) => (
                <span key={tag} className="tribe-landing-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="tribe-landing-card p-6">
            <Heading3 className="mb-2">{t.feature3Title}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm mb-4">{t.feature3Desc}</p>
            <div className="flex flex-wrap gap-2">
              {[t.localEvents, t.meetups, t.communityMeet, t.retreats].map((tag) => (
                <span key={tag} className="tribe-landing-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="tribe-landing-card p-6">
            <Heading3 className="mb-2">{t.feature4Title}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm mb-4">{t.feature4Desc}</p>
            <div className="flex flex-wrap gap-2">
              {[t.xpSystem, t.statusLevel, t.achievements, t.recognition].map((tag) => (
                <span key={tag} className="tribe-landing-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Share2Earn */}
      <Section>
        <p className="tribe-landing-label mb-2">{t.sectionShare2earn}</p>
        <Heading2 className="mb-4">{t.share2earnTitle}</Heading2>
        <p className="text-[var(--tribe-landing-muted)] mb-10 max-w-2xl">{t.share2earnSub}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="tribe-landing-card p-6 text-center">
            <Heading3 className="mb-2">{t.share}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.shareDesc}</p>
          </div>
          <div className="tribe-landing-card p-6 text-center">
            <Heading3 className="mb-2">{t.grow}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.growDesc}</p>
          </div>
          <div className="tribe-landing-card p-6 text-center">
            <Heading3 className="mb-2">{t.earn}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.earnDesc}</p>
          </div>
        </div>
        <p className="text-sm font-semibold text-[var(--tribe-landing-muted)] mb-2">{t.growthLoop}</p>
        <p className="text-sm text-[var(--tribe-landing-muted)]">{t.loopSteps}</p>
      </Section>

      {/* For whom */}
      <Section className="bg-white">
        <p className="tribe-landing-label mb-2">{t.sectionForWhom}</p>
        <Heading2 className="mb-10">{t.forWhomTitle}</Heading2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            [t.creators, t.creatorsDesc],
            [t.entrepreneurs, t.entrepreneursDesc],
            [t.coaches, t.coachesDesc],
            [t.influencers, t.influencersDesc],
            [t.eventOrgs, t.eventOrgsDesc],
            [t.everyone, t.everyoneDesc],
          ].map(([title, desc]) => (
            <div key={title} className="tribe-landing-card p-5">
              <Heading3 className="mb-2 text-lg">{title}</Heading3>
              <p className="text-[var(--tribe-landing-muted)] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Governance */}
      <Section>
        <p className="tribe-landing-label mb-2">{t.sectionGovernance}</p>
        <Heading2 className="mb-4">{t.governanceTitle}</Heading2>
        <p className="text-[var(--tribe-landing-muted)] mb-8 max-w-2xl">{t.governanceSub}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="tribe-landing-card p-5">
            <Heading3 className="mb-2">{t.votesPolls}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.votesDesc}</p>
          </div>
          <div className="tribe-landing-card p-5">
            <Heading3 className="mb-2">{t.decideTogether}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.decideDesc}</p>
          </div>
          <div className="tribe-landing-card p-5">
            <Heading3 className="mb-2">{t.transparentPriorities}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.transparentDesc}</p>
          </div>
          <div className="tribe-landing-card p-5">
            <Heading3 className="mb-2">{t.yourRules}</Heading3>
            <p className="text-[var(--tribe-landing-muted)] text-sm">{t.rulesDesc}</p>
          </div>
        </div>
      </Section>

      {/* Stats + First votes */}
      <Section className="bg-[#1a0a2e] text-white rounded-2xl">
        <p className="text-sm text-white/80 uppercase tracking-wider mb-2">{t.firstVotes}</p>
        <p className="text-lg mb-8">{t.firstVotesSub}</p>
        <div className="flex flex-wrap gap-8">
          <div><span className="text-2xl font-bold">50K+</span><br /><span className="text-sm text-white/70">{t.statsMembers}</span></div>
          <div><span className="text-2xl font-bold">500+</span><br /><span className="text-sm text-white/70">{t.statsTribes}</span></div>
          <div><span className="text-2xl font-bold">25+</span><br /><span className="text-sm text-white/70">{t.statsCountries}</span></div>
          <div><span className="text-2xl font-bold">1</span><br /><span className="text-sm text-white/70">{t.statsMission}</span></div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section>
        <p className="tribe-landing-label mb-2">{t.sectionRoadmap}</p>
        <Heading2 className="mb-4">{t.roadmapTitle}</Heading2>
        <p className="text-[var(--tribe-landing-muted)] mb-8">{t.roadmapSub}</p>
        <p className="text-sm text-[var(--tribe-landing-muted)]">
          {lang === "ru"
            ? "2023 — Основание и разработка. 2025 — 50 000 пользователей. Q1 2026 — DAO и управление. Q2 2026 — Мобильное приложение и мультиязычность. Q3–Q4 2026 — Краудфандинг, новые продукты, прелоунч."
            : "2023 — Gründung & Entwicklung. 2025 — 50.000 User. Q1 2026 — DAO & Governance. Q2 2026 — Mobile App & Multilanguage. Q3–Q4 2026 — Crowdfunding, neue Produkte, Prelaunch."}
        </p>
      </Section>

      {/* CTA */}
      <Section className="bg-white text-center">
        <Heading2 className="mb-4">{t.ctaTitle}</Heading2>
        <p className="text-[var(--tribe-landing-muted)] mb-8 max-w-xl mx-auto">{t.ctaSub}</p>
        <p className="text-sm text-[var(--tribe-landing-muted)] mb-4">{t.ctaFree}. {t.ctaSeconds}.</p>
        <Link href="/tribe" className="tribe-landing-btn-primary inline-flex items-center gap-2 px-8 py-4">
          {t.ctaJoin}
        </Link>
      </Section>

      {/* FAQ */}
      <Section>
        <p className="tribe-landing-label mb-2">{t.sectionFaq}</p>
        <Heading2 className="mb-8">{t.faqTitle}</Heading2>
        <dl className="space-y-6">
          <div className="tribe-landing-card p-5">
            <dt className="font-semibold text-[var(--tribe-landing-text)] mb-1">{t.whatIs}</dt>
            <dd className="text-[var(--tribe-landing-muted)] text-sm">{t.whatIsAnswer}</dd>
          </div>
          <div className="tribe-landing-card p-5">
            <dt className="font-semibold text-[var(--tribe-landing-text)] mb-1">{t.howDiffers}</dt>
            <dd className="text-[var(--tribe-landing-muted)] text-sm">{t.howDiffersAnswer}</dd>
          </div>
          <div className="tribe-landing-card p-5">
            <dt className="font-semibold text-[var(--tribe-landing-text)] mb-1">{t.whatShare2earn}</dt>
            <dd className="text-[var(--tribe-landing-muted)] text-sm">{t.share2earnAnswer}</dd>
          </div>
          <div className="tribe-landing-card p-5">
            <dt className="font-semibold text-[var(--tribe-landing-text)] mb-1">{t.canEarn}</dt>
            <dd className="text-[var(--tribe-landing-muted)] text-sm">{t.canEarnAnswer}</dd>
          </div>
          <div className="tribe-landing-card p-5">
            <dt className="font-semibold text-[var(--tribe-landing-text)] mb-1">{t.whenLaunch}</dt>
            <dd className="text-[var(--tribe-landing-muted)] text-sm">{t.whenLaunchAnswer}</dd>
          </div>
          <div className="tribe-landing-card p-5">
            <dt className="font-semibold text-[var(--tribe-landing-text)] mb-1">{t.isFree}</dt>
            <dd className="text-[var(--tribe-landing-muted)] text-sm">{t.isFreeAnswer}</dd>
          </div>
        </dl>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[var(--tribe-landing-border)] py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-[var(--tribe-landing-text)]">{t.footerTagline}</p>
          <div className="flex gap-6 text-sm text-[var(--tribe-landing-muted)]">
            <span>{t.privacy}</span>
            <span>{t.terms}</span>
            <span>{t.imprint}</span>
          </div>
        </div>
        <p className="max-w-5xl mx-auto mt-6 text-center text-xs text-[var(--tribe-landing-muted)]">{t.copyright}</p>
      </footer>
    </div>
  );
}
