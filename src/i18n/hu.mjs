// Hungarian texts. Mirrors en.mjs key by key.
// Values may contain inline HTML. Placeholders in {braces} are filled in by the page templates.
export default {
  lang: 'hu',
  ogLocale: 'hu_HU',
  dateLong: '2026. október 23.',

  meta: {
    title: 'Sergej Kukshausen | Szoftverfejlesztési vezető és tanácsadó',
    description:
      'Engineering Manager Budapesten: 11+ év szoftverfejlesztés, ebből 8 a bank- és fintech szektorban. Fractional vezetés, mainframe–AWS migráció, AI skillek.',
    ogImageAlt: 'Sergej Kukshausen portréja',
  },

  nav: {
    label: 'Főmenü',
    services: 'Szolgáltatások',
    work: 'Projektek',
    about: 'Rólam',
    faq: 'GYIK',
    contact: 'Kapcsolat',
    language: 'Nyelv',
    home: 'Kukshausen kezdőlap',
  },

  hero: {
    eyebrow: 'Engineering Manager a Fiservnél · Budapest · DE/EN/RU/HU · remote',
    h1: 'Mérnöki vezetés üzletkritikus fizetési platformokhoz',
    sub: 'Több mint 11 év szoftverfejlesztés, ebből az utóbbi nyolc a bank- és fintech szektorban. Belsős vezető a Fiservnél, emellett nyitott fractional engineering vezetésre, mainframe–AWS migrációkra és AI skillek fejlesztésére fejlesztőcsapatok számára.',
    cta: 'Foglaljon 20 perces hívást',
    cv: 'Önéletrajz letöltése (PDF)',
    proof: 'Legutóbb a Fiservnél vezettem egy fizetési útválasztó platform migrációját mainframe-ről AWS-re, 31%-kal alacsonyabb infrastruktúraköltséggel.',
    proofLink: 'A projekt',
    available: 'Nyitott új megbízásokra',
    updated: 'Frissítve',
    portraitAlt: 'Sergej Kukshausen, Engineering Manager, portré',
  },

  services: {
    h2: 'Miben tudok segíteni',
    intro: 'Négy terület, amelyen fintech- és banki csapatokat támogatok: remote Budapestről vagy helyszínen a DACH-régióban.',
    items: [
      {
        title: 'Fractional / interim engineering menedzsment',
        desc: 'Mérnökcsapat vezetése vagy stabilizálása 3–6 hónapig: toborzás, 1:1-ek, delivery ritmus, stakeholder-menedzsment.',
        proof: 'CTO-knak, akiknek tapasztalt vezetőre van szükségük, állandó felvétel nélkül.',
        link: 'Beszéljünk egy fractional megbízásról',
      },
      {
        title: 'Mainframe &amp; legacy migráció AWS-re',
        desc: 'Fizetési és banki rendszerek átállításának megtervezése és levezetése cloud-native mikroszolgáltatásokra, SEPA- és PSD2-megfelelőséggel.',
        proof: 'A Fiservnél megvalósítva: 31%-kal alacsonyabb infrastruktúraköltség, 12%-kal gyorsabb incidenskezelés.',
        link: 'Beszéljünk a migrációról',
      },
      {
        title: 'AI skillek &amp; agentek fejlesztőcsapatoknak',
        desc: 'Egyedi skillek és agentek Claude-hoz, GitHub Copilothoz és Codexhez, Jira-, Confluence-, GitLab- és n8n-integrációval.',
        proof: 'Bevezetés, guardrailek és képzés. Ezeket az eszközöket magam is naponta használom.',
        link: 'Beszéljünk az AI skillekről a csapatának',
      },
      {
        title: 'M/Text &amp; output management (DACH)',
        desc: 'Banki dokumentumfolyamatok és output management modernizálása.',
        proof: 'A Capgemininél megvalósítva: 75%-kal kevesebb manuális feldolgozás, évi kb. 180 000 € megtakarítás.',
        link: 'Beszéljünk egy M/Text projektről',
      },
    ],
  },

  work: {
    h2: 'Ahol érdemi eredményt értem el',
    items: [
      {
        tag: 'FISERV · 2020 – JELENLEG',
        title: 'Fizetési routing mainframe-ről a felhőbe',
        text: 'Egy magas rendelkezésre állású fizetési routing rendszer modernizációját vezettem on-prem mainframe-ről cloud-native mikroszolgáltatásokra AWS-en: 31%-kal alacsonyabb infrastruktúraköltség, 12%-kal gyorsabb incidenskezelés, végig PSD2- és GDPR-megfelelőséggel.',
        stack: 'Python · AWS · Kafka · Kubernetes · GitLab CI/CD',
      },
      {
        tag: 'FISERV · CSAPATVEZETŐ',
        title: 'Csapat, amely marad és szállít',
        text: 'Mérnökökből és elemzőkből álló cross-functional csapatot vezetek: toborzás, 1:1-ek, coaching és teljesítményértékelés. Több csapatban bevezettem a Scrumot, ezzel 21%-kal rövidült a termékbevezetési idő, és három audit zárult nulla megállapítással.',
        stack: 'Scrum · Product-partnerség · Toborzás · Coaching',
      },
      {
        tag: 'FISERV · HANDS-ON',
        title: 'AI skillek az egész csapatnak',
        text: 'Napi szintű Python és Bash: utófeldolgozó adatpipeline-ok nagyon nagy fájlokhoz, valamint egyedi AI skillek és agentek GitHub Copilothoz, Claude-hoz és Codexhez, amelyek felgyorsítják a csapat fejlesztési munkafolyamatait.',
        stack: 'Python · Bash · Copilot · Claude · Codex',
      },
      {
        tag: 'CAPGEMINI · 2018 – 2020',
        title: '2,2 millió € értékű digitális transzformáció',
        text: 'Digitális transzformációs programot valósítottam meg egy nagy német pénzügyi tranzakciófeldolgozónak: 6+ beszállítói rendszert koordináltam, és hibrid felhőbe migráltam a működést. A dokumentumfolyamatok modernizálása 75%-kal csökkentette a manuális feldolgozást, évi 180 000 € megtakarítással.',
        stack: 'SEPA · AWS · Kafka · Docker · M/Text',
      },
      {
        tag: 'ITEXIA · 2016 – 2018',
        title: 'Fejlett automatizálási projekt megvalósítása',
        text: 'Egy fejlett automatizálási projekt teljes körű megvalósítását vezettem, a kulcsfontosságú mérföldkövek 100%-át teljesítve, és szoros együttműködéssel, kockázatkezeléssel és proaktív kommunikációval 27%-kal növeltem az ügyfél-elégedettséget.',
        stack: 'PHP · Swift · Docker · Selenium · Drupal',
      },
      {
        tag: 'TTE-EUROPE · 2014 – 2015',
        title: 'Java webalkalmazások a robbanóanyag-ipar számára',
        text: 'IT-kezdeményezéseket vezettem egy biztonságkritikus iparágban: modern, skálázható Java-alapú webalkalmazásokat szállítottam, és technikai csapatokat irányítottam a határidőre történő átadás érdekében. Szakdolgozat: mobilalkalmazás beszédaktivitás-detektálásra.',
        stack: 'Java · SQL · Redmine · Jelfeldolgozás',
      },
    ],
  },

  process: {
    h2: 'Hogyan dolgoznánk együtt',
    steps: [
      {
        when: '20 perc',
        title: 'Bemutatkozó hívás',
        text: 'Ön bemutatja a csapatot vagy a rendszert, én pedig őszintén megmondom, hogy én vagyok-e a megfelelő ember, és mit vizsgálnék meg elsőként.',
      },
      {
        when: '1–2 hét',
        title: 'Felmérés',
        text: 'Interjúk, kód- és folyamat-review, majd írásos javaslat prioritásokkal és reális tervvel.',
      },
      {
        when: '3–6 hónap',
        title: 'Megbízás',
        text: 'Jellemzően 3–6 hónap, heti 2–5 nap, remote vagy helyszínen a DACH-régióban. A napidíjat kérésre megadom.',
      },
    ],
    contracting: 'Szerződni közvetlenül, illetve a {malt} vagy az {upwork} platformon keresztül is lehet.',
  },

  about: {
    photoAlt: 'Sergej Kukshausen egy kiskutyával',
    h2: 'Üdvözlöm, Sergej Kukshausen vagyok.',
    paragraphs: [
      'Sergej Kukshausen hands-on Engineering Manager a Fiservnél, Budapesten él, és több mint 11 éve szállít üzletkritikus platformokat, az utóbbi nyolc évben a bank- és fintech szektorban. Legutóbb egy magas rendelkezésre állású fizetési routing rendszer migrációját vezettem mainframe-ről cloud-native mikroszolgáltatásokra AWS-en, amellyel 31%-kal csökkentettük az infrastruktúraköltségeket, az incidenskezelés pedig 12%-kal gyorsult.',
      'Úgy vezetem az embereket, ahogyan én is szerettem volna, hogy vezessenek: rendszeres 1:1-ek, őszinte coaching, világos célok és fair teljesítményértékelés a cross-functional mérnökcsapatokban. A Scrum bevezetése ezekben a csapatokban 21%-kal rövidítette a termékbevezetési időt, és egymást követő három belső audit zárult nulla megállapítással.',
      'Ma is kódolok minden nap: Python- és Bash-pipeline-okat írok nagyon nagy fájlokhoz, valamint egyedi AI skilleket GitHub Copilothoz, Claude-hoz és Codexhez, amelyek az egész csapatot gyorsabbá teszik. Budapesten élek, és szenvedélyem a termékszemléletű, kiemelkedően teljesítő csapatok építése.',
    ],
    focusH: 'Fókuszterületek',
    focus: [
      ['Mérnöki vezetés', 'toborzás és interjúztatás, 1:1-ek és coaching, teljesítményértékelés, célkitűzés, backlog grooming a Producttal, Agile/Scrum/SAFe, stakeholder-menedzsment.'],
      ['Hands-on programozás', 'Python (napi szinten), Bash, Java, PHP, SQL, JavaScript/Angular, HTML/CSS; AI-támogatott fejlesztés egyedi skillekkel és agentekkel Copilothoz, Claude-hoz és Codexhez.'],
      ['Felhő &amp; architektúra', 'AWS managed szolgáltatások, mikroszolgáltatások, Docker, Kubernetes, Kafka, Jenkins, Argo CD, GitLab CI/CD.'],
      ['Minőség &amp; megfelelőség', 'PSD2- és GDPR-konform szállítás legacy és felhős környezetekben, auditra kész mérnöki munka.'],
      ['Tanúsítványok', 'Professional Scrum Master I (PSM I), Certified SAFe 4 Agilist. BSc mérnökinformatika, TU Bergakademie Freiberg.'],
    ],
    languagesH: 'Nyelvek',
    languages: { de: 'Német', ru: 'Orosz', en: 'Angol', hu: 'Magyar' },
  },

  toolkit: {
    h2: 'Eszköztár',
    intro: 'A fenti eredmények mögötti technológiák.',
    tips: {
      python: 'A napi nyelvem: adatpipeline-ok, tooling és AI-támogatott fejlesztés.',
      bash: 'Összekötő réteg nagy volumenű fájl- és adat-utófeldolgozáshoz.',
      java: 'Skálázható webalkalmazások a robbanóanyag-ipar számára a TTE-Europe-nál.',
      php: 'Automatizálás és Drupal-projektek az ITEXIA-nál.',
      javascript: 'Front-end fejlesztés fizetési és dokumentumplatformokon.',
      typescript: 'Típusos front-endek és belső eszközök.',
      html5: 'Szabványos jelölőnyelv weboldalak készítéséhez.',
      css: 'Stíluslapnyelv a weboldalak megjelenéséhez és formázásához.',
      angular: 'AngularJS front-endek fizetési routing és SEPA-rendszerekhez.',
      mysql: 'Relációs adatbázis tranzakciós terhelésekhez.',
      postgresql: 'Fejlett, nyílt forráskódú relációs adatbázis.',
      aws: 'Managed szolgáltatások a mainframe–felhő fizetési migráció mögött.',
      docker: 'Konténerek minden általam szállított szolgáltatáshoz és pipeline-hoz.',
      kubernetes: 'Magas rendelkezésre állású mikroszolgáltatások orkesztrációja.',
      kafka: 'Eseménystreaming a fizetési routinghoz.',
      jenkins: 'Build- és deployment-automatizálás.',
      argocd: 'GitOps alapú continuous delivery Kubernetesen.',
      gitlab: 'Pipeline-ok a committól az élesig.',
      git: 'Elosztott verziókezelés.',
      linux: 'Minden szerver és pipeline otthona.',
      copilot: 'Egyedi AI skillek és agentek, amelyek felgyorsítják a csapatot.',
      claude: 'Egyedi skillek készítése AI-támogatott fejlesztéshez.',
      jira: 'Backlog grooming és sprintkövetés a Producttal.',
      confluence: 'Dokumentáció és csapattudásbázis.',
      retool: 'Belső eszközök operációs csapatoknak.',
      swift: 'Mobilfejlesztés, többek között a beszédaktivitás-detektáló szakdolgozati alkalmazásom.',
      selenium: 'Böngészőautomatizálás és end-to-end tesztelés.',
      drupal: 'Az ITEXIA-nál szállított tartalomplatformok.',
      redmine: 'Projektkövetés a TTE-Europe-nál.',
    },
  },

  faq: {
    h2: 'Gyakori ügyfélkérdések',
    items: [
      {
        q: 'Ki tudja migrálni a fizetési rendszerünket mainframe-ről AWS-re?',
        a: 'Sergej Kukshausen pontosan ilyen migrációt vezetett a Fiservnél: egy magas rendelkezésre állású fizetési routing rendszer költözött on-prem mainframe-ről cloud-native mikroszolgáltatásokra AWS-en, 31%-kal alacsonyabb infrastruktúraköltséggel és 12%-kal gyorsabb incidenskezeléssel.',
      },
      {
        q: 'Németül beszélő, fintech-tapasztalattal rendelkező fractional engineering managert keresünk. Ön az?',
        a: 'Igen. Sergej Kukshausen vagyok, német anyanyelvű, és éveken át dolgoztam német bankoknak Frankfurtból, többek között egy fizetési routing platformon és PSD2-konform release-eken, amelyek három belső auditon mentek át nulla megállapítással. Budapestről dolgozom remote, előzetes egyeztetés alapján helyszínen is a DACH-régióban, német vagy angol nyelvű szerződéssel.',
      },
      {
        q: 'Hol találunk tapasztalt M/Text- és output management tanácsadót?',
        a: 'Sergej a Capgemininél modernizálta az M/Text dokumentumfolyamatokat egy nagy német pénzügyi tranzakciófeldolgozó számára: 75%-kal csökkentette a manuális feldolgozást, és évi kb. 180 000 € megtakarítást ért el.',
      },
      {
        q: 'Hogyan vezessük be a fejlesztőcsapatunknál az olyan AI-kódolóeszközöket, mint a Copilot, a Claude vagy a Codex?',
        a: 'Három lépésben: kiválasztunk két-három valós munkafolyamatot (code review, ticket-triázs, tesztgenerálás), egyedi skilleket és guardraileket építünk hozzájuk, majd a mérnököket ezekre a munkafolyamatokra képezzük, nem általában az eszközökre. A Claude-ot, a Copilotot és a Codexet magam is naponta használom, és mindháromhoz írtam már egyedi skilleket, így a bevezetés működő példákból indul, nem diasorokból.',
      },
      {
        q: 'Tud egyedi Claude skilleket vagy AI agenteket fejleszteni Jirához?',
        a: 'Igen. Egyedi skilleket és agenteket fejlesztek Claude-hoz, GitHub Copilothoz és Codexhez, és összekötöm őket a Jirával, a Confluence-szel, a GitLabbel és az n8n-nel, például egy agentet, amely triázsolja a Jira-ticketeket, és elkészíti a GitLab merge request vázlatát. Minden skillhez tesztek, használati útmutató és egy rövid átadó alkalom tartozik a csapat számára. Nyilvános példa a {aiskills}Jira skillem a GitHubon{/aiskills}.',
      },
      {
        q: 'Hogyan indul egy interim vagy fractional megbízás?',
        a: 'Egy 20 perces hívással, amelyet {calendly}közvetlenül a naptáramban foglalhat le{/calendly}. Ezt egy 1–2 hetes felmérés követi írásos javaslattal, majd maga a megbízás, remote vagy helyszínen. Szerződni közvetlenül, illetve a Malton vagy az Upworkön keresztül is lehet.',
      },
      {
        q: 'Mi az a fractional engineering manager?',
        a: 'A fractional engineering manager részmunkaidőben vezet egy mérnökcsapatot, jellemzően heti két-öt napban, három-hat hónapig, ahelyett hogy állandó munkavállalóként csatlakozna. Így tapasztalt vezetőt kap a toborzáshoz, az 1:1-ekhez, a delivery ritmushoz és a stakeholder-kommunikációhoz, amíg a csapatot bővíti vagy állandó vezetőt keres. Az interim engineering manager ugyanennek a konstrukciónak a teljes munkaidős változata.',
      },
    ],
  },

  contact: {
    eyebrow: 'Lépjünk kapcsolatba',
    h3: 'Beszéljünk a csapatáról &amp; a platformjáról.',
    reply: 'Egy munkanapon belül válaszolok angolul, németül vagy oroszul (magyarul alapszinten beszélek). Az első lépés egy 20 perces hívás.',
    calendar: 'Válasszon időpontot a naptáramban',
    infoH: 'Elérhetőségek',
    malt: 'Bízzon meg a Malton',
    upwork: 'Bízzon meg az Upworkön',
    resume: 'Önéletrajz letöltése',
    formH: 'Küldjön üzenetet',
    name: 'Az Ön neve',
    namePh: 'Adja meg a teljes nevét',
    email: 'Az Ön e-mail-címe',
    emailPh: 'Adja meg az e-mail-címét',
    phone: 'Az Ön telefonszáma (nem kötelező)',
    phonePh: 'Adja meg a telefonszámát',
    topic: 'Megkeresésének tárgya',
    topicPh: 'Válasszon témát',
    // The first four match the four service cards, in the same order.
    topics: [
      'Fractional vagy interim engineering menedzsment',
      'Mainframe / legacy migráció AWS-re',
      'AI skillek és agentek a fejlesztőcsapatomnak',
      'M/Text vagy output management',
      'Teljes munkaidős pozíció',
      'Egyéb',
    ],
    message: 'Az Ön üzenete',
    messagePh: 'Miben segíthetek?',
    notice: 'Üzenete a postafiókomba érkezik, és kizárólag a válaszadáshoz használom fel, lásd az {privacy}adatvédelmi tájékoztatót{/privacy}.',
    send: 'Üzenet küldése',
    // Used by src/main.ts
    msgThanks: 'Köszönöm megkeresését! Hamarosan jelentkezem.',
    msgError: 'Az üzenet elküldése nem sikerült. Kérem, próbálja újra később, vagy írjon közvetlenül e-mailben.',
    msgMailto: 'Megnyitjuk levelezőprogramját az előre kitöltött üzenettel.',
    msgSubject: 'Üzenet a weboldalról, feladó:',
  },

  footer: {
    updated: 'Frissítve',
    imprint: 'Impresszum',
    privacy: 'Adatvédelmi tájékoztató',
  },

  schema: {
    jobTitle: 'Engineering Manager, szoftverfejlesztés',
    description:
      'Hands-on Engineering Manager a Fiservnél, több mint 11 év szoftverfejlesztési tapasztalattal, ebből az utóbbi nyolc a bank- és fintech szektorban. Egy magas rendelkezésre állású fizetési routing rendszer migrációját vezette mainframe-ről cloud-native mikroszolgáltatásokra AWS-en. Budapesten él, nyitott fractional és tanácsadói megbízásokra.',
  },

  legal: {
    // Shown on translated legal pages only; empty for the authoritative languages.
    translationNote: 'Ez a fordítás a könnyebb tájékozódást szolgálja; jogilag az angol és a német változat az irányadó.',
    lastUpdated: 'Utolsó frissítés: 2026. október 16.',
  },

  privacy: {
    title: 'Adatvédelmi tájékoztató | Sergej Kukshausen',
    description: 'A sergej.kukshausen.me adatvédelmi tájékoztatója: milyen adatokat kezel az oldal, hol található a tárhely, és milyen jogok illetik meg Önt a GDPR alapján.',
    h1: 'Adatvédelmi tájékoztató',
    body: `
<h2>1. Adatkezelő</h2>
<p>Sergej Kukshausen<br />Budapest, Magyarország<br />E-mail: <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a><br />Telefon: <a href="tel:+36707871989">+36 70 787 1989</a></p>
<p>Ez egy személyes portfólió-weboldal. Adatvédelmi tisztviselő nincs, mivel egy ekkora oldal esetében ez nem kötelező.</p>

<h2>2. Amit ez az oldal <em>nem</em> tesz</h2>
<ul>
<li>Nem használ sütiket, helyi tárolást (local storage) vagy ujjlenyomat-alapú azonosítást (fingerprinting).</li>
<li>Nem használ analitikát, követőpixeleket vagy hirdetési hálózatokat.</li>
<li>Nem tölt be harmadik féltől származó betűtípusokat, ikonkészleteket vagy szkripteket. Minden tartalom erről az oldalról töltődik be.</li>
<li>Nem tartalmaz beágyazott közösségimédia-widgeteket. A LinkedIn-, Xing- és GitHub-hivatkozások egyszerű linkek, amelyek csak kattintásra töltődnek be.</li>
</ul>

<h2>3. Tárhely és szervernaplók</h2>
<p>A sergej.kukshausen.me az IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Németország) szerverén fut, adatfeldolgozási szerződés alapján. Amikor Ön megnyit egy oldalt, böngészője technikai adatokat küld a szervernek, hogy az oldal megjeleníthető legyen: IP-cím, a kérés dátuma és időpontja, a kért URL, a hivatkozó oldal (referrer), a böngésző típusa és az operációs rendszer. A webszerver ezeket az adatokat biztonsági és hibaelemzési célból rövid ideig naplófájlokban tárolja, majd automatikusan törli. Az adatok az EU-n belül maradnak.</p>
<p>Jogalap: GDPR 6. cikk (1) bekezdés f) pont, a biztonságos és megbízható weboldal üzemeltetéséhez fűződő jogos érdekem.</p>
<p>Az oldal egy másolata a GitHub Pages szolgáltatáson is elérhető a kukshaus.github.io/kukshausen-portfolio/ címen; a szolgáltatást a GitHub, Inc. (88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) nyújtja. Ha Ön ezt a másolatot nyitja meg, a GitHub ugyanezeket a technikai adatokat az USA-ban kezeli; az adattovábbítás alapja a GitHub EU–USA adatvédelmi keretrendszer (EU-US Data Privacy Framework) szerinti tanúsítása. Részletek: <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection" target="_blank" rel="noopener">GitHub Pages adatgyűjtés</a>.</p>

<h2>4. Kapcsolatfelvételi űrlap és e-mail</h2>
<p>Az „Üzenet küldése” gomb megnyomásakor az Ön neve, e-mail-címe, nem kötelezően megadott telefonszáma, a kiválasztott téma és az üzenet a Web3Forms (<a href="https://web3forms.com" target="_blank" rel="noopener">web3forms.com</a>) űrlaptovábbító szolgáltatáshoz kerül, amely az üzenetet e-mailként továbbítja a postafiókomba. <a href="https://web3forms.com/privacy" target="_blank" rel="noopener">Adatvédelmi szabályzata</a> szerint a Web3Forms a továbbítás után nem tárolja a beküldött adatokat. A szolgáltatás EU-n kívüli infrastruktúrán fut, így adatai harmadik országba kerülhetnek; ez az adattovábbítás az Ön által kezdeményezett megkeresés teljesítéséhez szükséges (GDPR 49. cikk (1) bekezdés b) pont). Ha ezt el szeretné kerülni, írjon nekem közvetlenül e-mailt, vagy hívjon fel, ekkor nem vesz részt továbbító szolgáltatás. Az űrlap egy rejtett spamszűrő mezője kiszűri az automatizált beküldéseket; ez a mező nem gyűjt adatot.</p>
<p>Az adatokat kizárólag megkeresése megválaszolására és az esetleges további kérdések tisztázására használom. Jogalap: munkakapcsolatra vonatkozó megkeresés esetén a GDPR 6. cikk (1) bekezdés b) pont, egyéb esetben a GDPR 6. cikk (1) bekezdés f) pont. A levelezést a megkeresés lezárását követően törlöm, kivéve, ha az üzleti levelezésre vonatkozó jogszabályi megőrzési kötelezettség áll fenn.</p>
<p>A postafiókom szintén az IONOS SE-nél található, ugyanazon adatfeldolgozási szerződés alapján. Az adatok az EU-n belül maradnak.</p>

<h3>Hívás foglalása</h3>
<p>A „Foglaljon 20 perces hívást” gombok egyszerű linkek a Calendly (Calendly LLC, Atlanta, USA) oldalán található foglalási felületemre. Erről a weboldalról semmi nem töltődik be a Calendlytól. Ha Ön időpontot foglal, adatait a Calendly oldalán, annak <a href="https://calendly.com/privacy" target="_blank" rel="noopener">adatvédelmi tájékoztatója</a> szerint adja meg; én a foglalást a hívás előkészítéséhez és lebonyolításához kapom meg. Jogalap: GDPR 6. cikk (1) bekezdés b) pont. A Calendly az EU–USA adatvédelmi keretrendszer (EU-US Data Privacy Framework) alapján tanúsított.</p>

<h2>5. Az Ön jogai</h2>
<p>Az általános adatvédelmi rendelet (GDPR) alapján Önt megilleti a jog, hogy:</p>
<ul>
<li>hozzáférjen az Önről általam kezelt személyes adatokhoz (15. cikk),</li>
<li>kérje azok helyesbítését (16. cikk) vagy törlését (17. cikk),</li>
<li>kérje az adatkezelés korlátozását (18. cikk), vagy tiltakozzon az adatkezelés ellen (21. cikk),</li>
<li>adatait hordozható formátumban megkapja (20. cikk),</li>
<li>hozzájáruláson alapuló adatkezelés esetén hozzájárulását bármikor visszavonja (7. cikk (3) bekezdés).</li>
</ul>
<p>E jogai gyakorlásához írjon a <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a> címre.</p>

<h2>6. Panasztételi jog</h2>
<p>Ön panaszt tehet egy adatvédelmi felügyeleti hatóságnál, különösen a lakóhelye szerinti ország hatóságánál. Az esetemben illetékes hatóság a Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9–11., Magyarország, <a href="https://www.naih.hu" target="_blank" rel="noopener">www.naih.hu</a>.</p>

<h2>7. Titkosítás</h2>
<p>Minden oldal HTTPS-en (TLS) keresztül töltődik be. Böngészője ezt lakat ikonnal jelzi a címsorban.</p>

<h2>8. Változások</h2>
<p>Ha az oldal a jövőben olyan funkcióval bővül, amely az adatokat eltérő módon kezeli, például űrlapszolgáltatással vagy analitikával, ezt a tájékoztatót a funkció élesítése előtt frissítem.</p>
`,
  },

  imprint: {
    title: 'Impresszum | Sergej Kukshausen',
    description: 'A sergej.kukshausen.me impresszuma és jogi közleménye.',
    h1: 'Impresszum',
    body: `
<h2>Az oldal üzemeltetője</h2>
<p>Sergej Kukshausen<br />Budapest, Magyarország<br />E-mail: <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a><br />Telefon: <a href="tel:+36707871989">+36 70 787 1989</a></p>
<p>Tájékoztatás az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény (Ekertv.) alapján, valamint adott esetben a német DDG 5. §-a és az MStV 18. § (2) bekezdése szerint.</p>
<p>A weboldal tartalmáért felelős: Sergej Kukshausen, cím a fentiek szerint.</p>

<h2>Felelősség a tartalomért</h2>
<p>Az oldal tartalmát gondosan állítottam össze, ugyanakkor nem vállalok garanciát annak pontosságáért, teljességéért és naprakészségéért. Szolgáltatóként az általános jogszabályok szerint felelek a saját tartalmamért, de nem vagyok köteles a továbbított vagy tárolt, harmadik féltől származó információkat figyelemmel kísérni, illetve jogellenes tevékenységre utaló körülményeket felkutatni.</p>

<h2>Felelősség a hivatkozásokért</h2>
<p>Ez az oldal olyan külső weboldalakra hivatkozik, amelyek felett nincs befolyásom. A hivatkozott oldalak tartalmáért mindig azok üzemeltetője felel. A hivatkozott oldalakat a linkek elhelyezésekor ellenőriztem esetleges jogsértések szempontjából. Ha jogsértésről szerzek tudomást, a linket haladéktalanul eltávolítom.</p>

<h2>Szerzői jog</h2>
<p>Az oldalon található szövegek, fényképek és a logó – eltérő jelzés hiányában – saját alkotásaim, és szerzői jogi védelem alatt állnak. A szerzői jog által megengedett kereteken túli többszörözésükhöz vagy terjesztésükhöz írásbeli hozzájárulásom szükséges. Az eszköztár szakaszban látható márkaikonok a megfelelő jogtulajdonosokat illetik, és kizárólag az adott technológia azonosítására szolgálnak.</p>

<h2>Vitarendezés</h2>
<p>Az Európai Bizottság online vitarendezési platformot biztosít a <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a> címen. Fogyasztói békéltető testület előtti vitarendezési eljárásban nem kívánok és nem vagyok köteles részt venni.</p>
`,
  },
};
