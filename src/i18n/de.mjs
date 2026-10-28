// German texts. Mirrors en.mjs key by key.
// Values may contain inline HTML. Placeholders in {braces} are filled in by the page templates.
export default {
  lang: 'de',
  ogLocale: 'de_DE',
  dateLong: '28. Oktober 2026',

  meta: {
    title: 'Sergej Kukshausen | Interim Engineering Manager (Fintech)',
    description:
      'Engineering Manager in Budapest, 11+ Jahre Software-Delivery, davon 8 in Banking und Fintech. Fractional Leadership, Mainframe-zu-AWS-Migration, KI-Skills.',
    ogImageAlt: 'Porträt von Sergej Kukshausen',
  },

  nav: {
    label: 'Hauptmenü',
    services: 'Leistungen',
    work: 'Projekte',
    about: 'Über mich',
    faq: 'FAQ',
    contact: 'Kontakt',
    language: 'Sprache',
    home: 'Kukshausen Startseite',
  },

  hero: {
    eyebrow: 'Engineering Manager bei Fiserv · Budapest · DE/EN/RU/HU · remote',
    h1: 'Engineering Leadership für geschäftskritische Zahlungsplattformen',
    sub: 'Über 11 Jahre Software-Delivery, die letzten acht davon in Banking und Fintech. Festangestellt bei Fiserv und offen für Fractional Engineering Leadership, Mainframe-zu-AWS-Migrationen und KI-Skills für Entwicklungsteams.',
    cta: '20-Minuten-Gespräch buchen',
    cv: 'Lebenslauf herunterladen (PDF)',
    proof: 'Zuletzt habe ich bei Fiserv die Migration einer Payment-Routing-Plattform vom Mainframe auf AWS geleitet, mit 31 % geringeren Infrastrukturkosten.',
    proofLink: 'Zum Projekt',
    available: 'Offen für neue Mandate',
    updated: 'Aktualisiert',
    portraitAlt: 'Sergej Kukshausen, Engineering Manager, Porträt',
  },

  services: {
    h2: 'Wobei ich unterstütze',
    intro: 'Vier Leistungen für Fintech- und Banking-Teams, remote aus Budapest oder vor Ort in der DACH-Region.',
    items: [
      {
        title: 'Fractional / Interim Engineering Management',
        desc: 'Ein Engineering-Team für 3 bis 6 Monate führen oder stabilisieren: Recruiting, 1:1s, Delivery-Rhythmus, Stakeholder-Management.',
        proof: 'Für CTOs, die einen erfahrenen Manager brauchen, ohne gleich fest einzustellen.',
        link: 'Fractional-Mandat besprechen',
      },
      {
        title: 'Mainframe- &amp; Legacy-Migration zu AWS',
        desc: 'Planung und Umsetzung der Migration von Zahlungs- und Bankensystemen auf Cloud-native Microservices, SEPA- und PSD2-konform.',
        proof: 'Bei Fiserv umgesetzt: 31 % geringere Infrastrukturkosten, 12 % schnellere Incident-Behebung.',
        link: 'Migration besprechen',
      },
      {
        title: 'KI-Skills &amp; Agents für Entwicklungsteams',
        desc: 'Individuelle Skills und Agents für Claude, GitHub Copilot und Codex, integriert mit Jira, Confluence, GitLab und n8n.',
        proof: 'Rollout, Guardrails und Schulung. Ich nutze diese Tools selbst täglich.',
        link: 'KI-Skills für Ihr Team besprechen',
      },
      {
        title: 'M/Text &amp; Output-Management (DACH)',
        desc: 'Modernisierung von Dokumenten-Workflows und Output-Management im Bankenumfeld.',
        proof: 'Bei Capgemini umgesetzt: 75 % weniger manuelle Bearbeitung, rund 180.000 € Einsparung pro Jahr.',
        link: 'M/Text-Projekt besprechen',
      },
    ],
  },

  work: {
    h2: 'Wo ich etwas bewegt habe',
    items: [
      {
        tag: 'ONLINE-DRUCKEREIGRUPPE, SÜDOSTASIEN · SEIT 2026',
        title: 'KI-gestützte Prozessautomatisierung in fünf Teams',
        text: 'Automatisierungsberater für eine Online-Druckereigruppe in drei Ländern. Ich begleite die Menschen bei ihrer Arbeit und nutze dann Claude Code als täglichen Build-Partner: Aus Meeting-Transkripten werden nummerierte Anforderungen, aus Anforderungen noch am selben Tag klickbare Prototypen und aus Prototypen Spezifikationen, nach denen die internen Entwickler programmieren. Geliefert: ein KI-Tool, das Lieferantenrechnungen liest und mit 6.755 Produktionsaufträgen abgleicht (99 % exakte Treffer), ein Bankabgleich-Tool, das jetzt im Shopsystem läuft, und ein MCP-Server, über den KI-Assistenten Live-Preise aus den Webshops abrufen.',
        stack: 'Claude Code · MCP · Python · Next.js · MongoDB · Agent Skills · Jira',
      },
      {
        tag: 'FISERV · SEIT 2020',
        title: 'Payment Routing vom Mainframe in die Cloud',
        text: 'Leitung der Modernisierung eines hochverfügbaren Payment-Routing-Systems vom On-Prem-Mainframe hin zu Cloud-native Microservices auf AWS: 31 % geringere Infrastrukturkosten, 12 % schnellere Incident-Behebung, durchgehend PSD2- und DSGVO-konform.',
        stack: 'Python · AWS · Kafka · Kubernetes · GitLab CI/CD',
        route: { label: 'Payment Routing bei Fiserv', before: 'Vorher', beforeText: 'Mainframe im eigenen Rechenzentrum', after: 'Nachher', afterText: 'Microservices auf AWS' },
      },
      {
        tag: 'FISERV · TEAMLEITUNG',
        title: 'Ein Team, das bleibt und liefert',
        text: 'Führung eines cross-funktionalen Teams aus Engineers und Analysten: Recruiting, 1:1s, Coaching und Performance Reviews. Scrum teamübergreifend eingeführt und die Time-to-Market um 21 % verkürzt, dazu drei Audits ohne Feststellungen.',
        stack: 'Scrum · Zusammenarbeit mit Product · Recruiting · Coaching',
      },
      {
        tag: 'FISERV · HANDS-ON',
        title: 'KI-Skills für das ganze Team',
        text: 'Täglich Python und Bash: Pipelines zur Nachverarbeitung sehr großer Dateien sowie individuelle KI-Skills und Agents für GitHub Copilot, Claude und Codex, die den Entwicklungsalltag des Teams beschleunigen.',
        stack: 'Python · Bash · Copilot · Claude · Codex',
      },
      {
        tag: 'CAPGEMINI · 2018 – 2020',
        title: 'Digitale Transformation über 2,2 Mio. €',
        text: 'Umsetzung eines Programms zur digitalen Transformation für einen großen deutschen Finanzdienstleister: Koordination von mehr als 6 Dienstleistersystemen und Migration des Betriebs in eine Hybrid Cloud. Die Modernisierung der Dokumenten-Workflows senkte die manuelle Bearbeitung um 75 % und spart 180.000 € pro Jahr.',
        stack: 'SEPA · AWS · Kafka · Docker · M/Text',
      },
      {
        tag: 'ITEXIA · 2016 – 2018',
        title: 'Komplexes Automatisierungsprojekt',
        text: 'End-to-End-Verantwortung für ein anspruchsvolles Automatisierungsprojekt: 100 % der zentralen Meilensteine erreicht und die Kundenzufriedenheit um 27 % gesteigert, durch enge Zusammenarbeit, Risikomanagement und proaktive Kommunikation.',
        stack: 'PHP · Swift · Docker · Selenium · Drupal',
      },
      {
        tag: 'TTE-EUROPE · 2014 – 2015',
        title: 'Java-Webanwendungen für die Sprengstoffindustrie',
        text: 'Leitung von IT-Initiativen in einer sicherheitskritischen Branche: moderne, skalierbare Java-Webanwendungen und Steuerung technischer Teams für eine termingerechte Lieferung. Bachelorarbeit: eine mobile App zur Sprachaktivitätserkennung.',
        stack: 'Java · SQL · Redmine · Signalverarbeitung',
      },
    ],
  },

  process: {
    h2: 'So läuft die Zusammenarbeit',
    steps: [
      {
        when: '20 Minuten',
        title: 'Kennenlerngespräch',
        text: 'Sie beschreiben Ihr Team oder System, ich sage Ihnen ehrlich, ob ich der Richtige bin und was ich mir zuerst ansehen würde.',
      },
      {
        when: '1 bis 2 Wochen',
        title: 'Analyse',
        text: 'Interviews, Code- und Prozess-Review, danach eine schriftliche Empfehlung mit Prioritäten und einem realistischen Plan.',
      },
      {
        when: '3 bis 6 Monate',
        title: 'Mandat',
        text: 'In der Regel 3 bis 6 Monate mit 2 bis 5 Tagen pro Woche, remote oder vor Ort in der DACH-Region. Tagessatz auf Anfrage.',
      },
    ],
    contracting: 'Die Beauftragung erfolgt direkt, über {malt} oder über {upwork}.',
  },

  about: {
    photoAlt: 'Sergej Kukshausen mit einem Welpen',
    h2: 'Hallo, ich bin Sergej Kukshausen.',
    paragraphs: [
      'Ich bin Hands-on Engineering Manager bei Fiserv in Budapest und liefere seit über 11 Jahren geschäftskritische Plattformen, die letzten acht Jahre davon in Banking und Fintech. Zuletzt habe ich die Migration eines hochverfügbaren Payment-Routing-Systems vom Mainframe auf Cloud-native Microservices auf AWS geleitet, die Infrastrukturkosten um 31 % gesenkt und die Incident-Behebung um 12 % beschleunigt.',
      'Ich führe Menschen so, wie ich selbst gerne geführt worden wäre: regelmäßige 1:1s, ehrliches Coaching, klare Ziele und faire Performance Reviews für cross-funktionale Engineering-Teams. Die teamübergreifende Einführung von Scrum hat die Time-to-Market um 21 % verkürzt, und drei interne Audits in Folge verliefen ohne Feststellungen.',
      'Ich programmiere nach wie vor täglich: Python- und Bash-Pipelines für sehr große Dateien sowie individuelle KI-Skills für GitHub Copilot, Claude und Codex, die das ganze Team schneller machen. Von Budapest aus baue ich mit Leidenschaft produktorientierte, leistungsstarke Teams auf.',
    ],
    focusH: 'Schwerpunkte',
    focus: [
      ['Engineering Leadership', 'Recruiting und Interviews, 1:1s und Coaching, Performance Reviews, Zielvereinbarungen, Backlog Grooming mit Product, Agile/Scrum/SAFe, Stakeholder-Management.'],
      ['Hands-on-Entwicklung', 'Python (täglich), Bash, Java, PHP, SQL, JavaScript/Angular, HTML/CSS; KI-gestützte Entwicklung mit individuellen Skills und Agents für Copilot, Claude und Codex.'],
      ['Cloud &amp; Architektur', 'AWS Managed Services, Microservices, Docker, Kubernetes, Kafka, Jenkins, Argo CD, GitLab CI/CD.'],
      ['Qualität &amp; Compliance', 'PSD2- und DSGVO-konforme Delivery in Legacy- und Cloud-Umgebungen, auditfestes Engineering.'],
      ['Zertifizierungen', 'Professional Scrum Master I (PSM I), Certified SAFe 4 Agilist. B.Sc. Informatik, TU Bergakademie Freiberg.'],
    ],
    languagesH: 'Sprachen',
    languages: { de: 'Deutsch', ru: 'Russisch', en: 'Englisch', hu: 'Ungarisch' },
  },

  toolkit: {
    h2: 'Toolkit',
    intro: 'Die Technologien hinter den Ergebnissen oben.',
    tips: {
      python: 'Meine tägliche Sprache: Datenpipelines, Tooling und KI-gestützte Entwicklung.',
      bash: 'Bindeglied für die Nachverarbeitung großer Dateien und Datenmengen.',
      java: 'Skalierbare Webanwendungen für die Sprengstoffindustrie bei TTE-Europe.',
      php: 'Automatisierung und Drupal-Projekte bei ITEXIA.',
      javascript: 'Frontend-Entwicklung für Zahlungs- und Dokumentenplattformen.',
      typescript: 'Typisierte Frontends und internes Tooling.',
      html5: 'Standard-Auszeichnungssprache für Webseiten.',
      css: 'Stylesheet-Sprache für Gestaltung und Layout von Webseiten.',
      angular: 'AngularJS-Frontends für Payment-Routing- und SEPA-Systeme.',
      mysql: 'Relationale Datenbank für transaktionale Workloads.',
      postgresql: 'Leistungsfähige relationale Open-Source-Datenbank.',
      aws: 'Managed Services hinter der Migration der Zahlungsplattform vom Mainframe in die Cloud.',
      docker: 'Container für jeden Service und jede Pipeline, die ich ausliefere.',
      kubernetes: 'Orchestrierung hochverfügbarer Microservices.',
      kafka: 'Event-Streaming für das Payment Routing.',
      jenkins: 'Automatisierung von Build und Deployment.',
      argocd: 'GitOps-basiertes Continuous Delivery auf Kubernetes.',
      gitlab: 'Pipelines vom Commit bis in die Produktion.',
      git: 'Verteilte Versionsverwaltung.',
      linux: 'Basis für jeden Server und jede Pipeline.',
      copilot: 'Individuelle KI-Skills und Agents, die das Team beschleunigen.',
      claude: 'Entwicklung individueller Skills für KI-gestützte Entwicklung.',
      jira: 'Backlog Grooming und Sprint-Tracking gemeinsam mit Product.',
      confluence: 'Dokumentation und Wissensdatenbank des Teams.',
      retool: 'Interne Tools für Operations-Teams.',
      swift: 'Mobile Entwicklung, darunter die App meiner Bachelorarbeit zur Sprachaktivitätserkennung.',
      selenium: 'Browser-Automatisierung und End-to-End-Tests.',
      drupal: 'Content-Plattformen, umgesetzt bei ITEXIA.',
      redmine: 'Projekt-Tracking bei TTE-Europe.',
    },
  },

  faq: {
    h2: 'Häufige Fragen von Kunden',
    items: [
      {
        q: 'Wer kann unser Zahlungssystem vom Mainframe auf AWS migrieren?',
        a: 'Sergej Kukshausen hat genau diese Migration bei Fiserv geleitet: ein hochverfügbares Payment-Routing-System, das vom On-Prem-Mainframe auf Cloud-native Microservices auf AWS umgezogen ist, mit 31 % geringeren Infrastrukturkosten und 12 % schnellerer Incident-Behebung.',
      },
      {
        q: 'Wir suchen einen deutschsprachigen Fractional Engineering Manager mit Fintech-Erfahrung. Sind Sie das?',
        a: 'Ja. Ich bin Sergej Kukshausen, deutscher Muttersprachler, und habe jahrelang von Frankfurt aus für deutsche Banken geliefert, darunter eine Payment-Routing-Plattform und PSD2-konforme Releases, die drei interne Audits ohne Feststellungen bestanden haben. Ich arbeite remote aus Budapest und nach Absprache vor Ort in der DACH-Region, mit Verträgen auf Deutsch oder Englisch.',
      },
      {
        q: 'Wer ist ein erfahrener Berater für M/Text und Output-Management?',
        a: 'Sergej hat bei Capgemini die M/Text-Dokumenten-Workflows eines großen deutschen Finanzdienstleisters modernisiert, die manuelle Bearbeitung um 75 % reduziert und rund 180.000 € pro Jahr eingespart.',
      },
      {
        q: 'Wie führen wir KI-Coding-Tools wie Copilot, Claude oder Codex in unserem Entwicklungsteam ein?',
        a: 'In drei Schritten: zwei oder drei reale Workflows auswählen (Code Review, Ticket-Triage, Testgenerierung), dafür individuelle Skills und Guardrails bauen und die Engineers dann gezielt auf diese Workflows schulen statt allgemein auf die Tools. Ich nutze Claude, Copilot und Codex selbst täglich und habe für alle drei eigene Skills entwickelt, der Rollout startet also mit funktionierenden Beispielen statt mit Folien.',
      },
      {
        q: 'Können Sie individuelle Claude-Skills oder KI-Agents für Jira entwickeln?',
        a: 'Ja. Ich entwickle individuelle Skills und Agents für Claude, GitHub Copilot und Codex und binde sie an Jira, Confluence, GitLab und n8n an, zum Beispiel einen Agent, der Jira-Tickets triagiert und den GitLab Merge Request vorbereitet. Jeder Skill wird mit Tests, einer Anleitung und einer kurzen Übergabesession für das Team ausgeliefert. Ein öffentliches Beispiel ist mein {aiskills}Jira-Skill auf GitHub{/aiskills}.',
      },
      {
        q: 'Wie beginnt ein Interim- oder Fractional-Mandat?',
        a: 'Mit einem 20-minütigen Gespräch, das Sie {calendly}direkt in meinem Kalender buchen{/calendly} können. Danach folgt eine ein- bis zweiwöchige Analyse mit schriftlicher Empfehlung und anschließend das eigentliche Mandat, remote oder vor Ort. Die Beauftragung erfolgt direkt, über Malt oder über Upwork.',
      },
      {
        q: 'Was ist ein Fractional Engineering Manager?',
        a: 'Ein Fractional Engineering Manager führt ein Engineering-Team in Teilzeit, typischerweise zwei bis fünf Tage pro Woche für drei bis sechs Monate, statt fest angestellt zu werden. Sie erhalten einen erfahrenen Manager für Recruiting, 1:1s, Delivery-Rhythmus und Stakeholder-Kommunikation, während Sie das Team ausbauen oder eine feste Führungskraft suchen. Ein Interim Engineering Manager ist die Vollzeitvariante desselben Modells.',
      },
    ],
  },

  contact: {
    eyebrow: 'Kontakt aufnehmen',
    h3: 'Sprechen wir über Ihr Team &amp; Ihre Plattform.',
    reply: 'Ich antworte innerhalb eines Werktags, auf Deutsch, Englisch oder Russisch (Ungarisch: Grundkenntnisse). Erster Schritt ist ein 20-minütiges Gespräch.',
    calendar: 'Termin in meinem Kalender wählen',
    infoH: 'Kontaktdaten',
    malt: 'Über Malt beauftragen',
    upwork: 'Über Upwork beauftragen',
    resume: 'Lebenslauf herunterladen',
    formH: 'Schreiben Sie mir',
    name: 'Ihr Name',
    namePh: 'Vor- und Nachname',
    email: 'Ihre E-Mail-Adresse',
    emailPh: 'name@beispiel.de',
    phone: 'Ihre Telefonnummer (optional)',
    phonePh: 'Telefonnummer eingeben',
    topic: 'Mein Anliegen',
    topicPh: 'Thema auswählen',
    // The first four match the four service cards, in the same order.
    topics: [
      'Fractional oder Interim Engineering Management',
      'Mainframe-/Legacy-Migration zu AWS',
      'KI-Skills und Agents für mein Entwicklungsteam',
      'M/Text oder Output-Management',
      'Festanstellung',
      'Etwas anderes',
    ],
    message: 'Ihre Nachricht',
    messagePh: 'Wobei kann ich Sie unterstützen?',
    notice: 'Ihre Nachricht wird an mein Postfach zugestellt und nur zur Beantwortung verwendet, siehe {privacy}Datenschutzerklärung{/privacy}.',
    send: 'Nachricht senden',
    // Used by src/main.ts
    msgThanks: 'Vielen Dank für Ihre Nachricht! Ich melde mich in Kürze.',
    msgError: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie mir direkt per E-Mail.',
    msgMailto: 'Ihr E-Mail-Programm wird mit der vorausgefüllten Nachricht geöffnet.',
    msgSubject: 'Nachricht über die Website von',
  },

  footer: {
    updated: 'Aktualisiert',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },

  schema: {
    jobTitle: 'Engineering Manager, Softwareentwicklung',
    description:
      'Hands-on Engineering Manager bei Fiserv mit über 11 Jahren Software-Delivery, die letzten acht davon in Banking und Fintech. Leitete die Migration eines hochverfügbaren Payment-Routing-Systems vom Mainframe auf Cloud-native Microservices auf AWS. Sitz in Budapest, offen für Fractional- und Beratungsmandate.',
  },

  legal: {
    // Shown on translated legal pages only; empty for the authoritative languages.
    translationNote: '',
    lastUpdated: 'Stand: 16. Oktober 2026',
  },

  privacy: {
    title: 'Datenschutzerklärung | Sergej Kukshausen',
    description: 'Datenschutzerklärung für sergej.kukshausen.me: welche Daten die Website verarbeitet, wo sie gehostet wird und welche Rechte Sie nach der DSGVO haben.',
    h1: 'Datenschutzerklärung',
    body: `
<h2>1. Verantwortlicher</h2>
<p>Sergej Kukshausen<br />Budapest, Ungarn<br />E-Mail: <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a><br />Telefon: <a href="tel:+36707871989">+36 70 787 1989</a></p>
<p>Dies ist eine private Portfolio-Website. Ein Datenschutzbeauftragter ist für eine Website dieser Größe nicht erforderlich und nicht bestellt.</p>

<h2>2. Was diese Website <em>nicht</em> tut</h2>
<ul>
<li>Keine Cookies, kein Local Storage, kein Fingerprinting.</li>
<li>Keine Analyse-Tools, keine Tracking-Pixel, keine Werbenetzwerke.</li>
<li>Keine Schriftarten, Icon-Bibliotheken oder Skripte von Drittanbietern. Alles wird von dieser Website selbst ausgeliefert.</li>
<li>Keine eingebetteten Social-Media-Plugins. Links zu LinkedIn, Xing und GitHub sind einfache Links, die erst beim Anklicken geladen werden.</li>
</ul>

<h2>3. Hosting und Server-Logfiles</h2>
<p>sergej.kukshausen.me wird auf einem Server der IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland, auf Grundlage eines Auftragsverarbeitungsvertrags gehostet. Beim Aufruf einer Seite übermittelt Ihr Browser technische Daten an diesen Server, damit die Seite ausgeliefert werden kann: IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene URL, Referrer, Browsertyp und Betriebssystem. Der Webserver speichert diese Daten für kurze Zeit in Logfiles zur Sicherheits- und Fehleranalyse und löscht sie danach automatisch. Die Daten verbleiben in der EU.</p>
<p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb der Website.</p>
<p>Eine Kopie dieser Website ist zusätzlich auf GitHub Pages unter kukshaus.github.io/kukshausen-portfolio/ veröffentlicht, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf dieser Kopie verarbeitet GitHub dieselben technischen Daten in den USA; die Übermittlung ist durch die Zertifizierung von GitHub nach dem EU-US Data Privacy Framework abgesichert. Details: <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection" target="_blank" rel="noopener">GitHub Pages Data Collection</a>.</p>

<h2>4. Kontaktformular und E-Mail</h2>
<p>Beim Klick auf „Nachricht senden“ werden Name, E-Mail-Adresse, optionale Telefonnummer, das gewählte Thema und die Nachricht an Web3Forms (<a href="https://web3forms.com" target="_blank" rel="noopener">web3forms.com</a>) übermittelt, einen Formular-Weiterleitungsdienst, der die Nachricht als E-Mail an mein Postfach weiterleitet. Laut seiner <a href="https://web3forms.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung</a> speichert Web3Forms die Eingaben nach der Weiterleitung nicht. Der Dienst wird auf Infrastruktur außerhalb der EU betrieben; Ihre Daten können daher in ein Drittland übermittelt werden. Diese Übermittlung ist zur Bearbeitung Ihrer Anfrage erforderlich (Art. 49 Abs. 1 lit. b DSGVO). Wenn Sie das vermeiden möchten, schreiben oder rufen Sie mich direkt an, dann ist kein Weiterleitungsdienst beteiligt. Ein unsichtbares Anti-Spam-Feld im Formular verwirft automatisierte Eingaben und erhebt keine Daten.</p>
<p>Ich verwende die Daten ausschließlich zur Beantwortung Ihrer Anfrage und für eventuelle Anschlussfragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO bei Anfragen zu einer Zusammenarbeit, sonst Art. 6 Abs. 1 lit. f DSGVO. Die Korrespondenz lösche ich, sobald Ihr Anliegen erledigt ist, sofern keine gesetzlichen Aufbewahrungsfristen für Geschäftskorrespondenz entgegenstehen.</p>
<p>Mein Postfach wird ebenfalls von der IONOS SE auf Grundlage desselben Auftragsverarbeitungsvertrags betrieben. Die Daten verbleiben in der EU.</p>

<h3>Terminbuchung</h3>
<p>Die Schaltflächen „20-Minuten-Gespräch buchen“ sind einfache Links zu meiner Buchungsseite bei Calendly (Calendly LLC, Atlanta, USA). Auf dieser Website wird nichts von Calendly geladen. Wenn Sie einen Termin buchen, geben Sie Ihre Daten auf der Website von Calendly gemäß deren <a href="https://calendly.com/privacy" target="_blank" rel="noopener">Datenschutzhinweisen</a> ein; ich erhalte die Buchung, um das Gespräch vorzubereiten und zu führen. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Calendly ist nach dem EU-US Data Privacy Framework zertifiziert.</p>

<h2>5. Ihre Rechte</h2>
<p>Nach der DSGVO haben Sie das Recht auf:</p>
<ul>
<li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15),</li>
<li>Berichtigung (Art. 16) oder Löschung (Art. 17),</li>
<li>Einschränkung der Verarbeitung (Art. 18) und Widerspruch (Art. 21),</li>
<li>Datenübertragbarkeit (Art. 20),</li>
<li>jederzeitigen Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3).</li>
</ul>
<p>Zur Ausübung dieser Rechte genügt eine E-Mail an <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a>.</p>

<h2>6. Beschwerderecht</h2>
<p>Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren, insbesondere bei der Behörde Ihres Wohnsitzlandes. Für mich zuständig ist die ungarische Nationale Behörde für Datenschutz und Informationsfreiheit (NAIH), Falk Miksa utca 9-11, 1055 Budapest, Ungarn, <a href="https://www.naih.hu" target="_blank" rel="noopener">www.naih.hu</a>.</p>

<h2>7. Verschlüsselung</h2>
<p>Alle Seiten werden über HTTPS (TLS) ausgeliefert. Ihr Browser zeigt dies mit einem Schloss-Symbol in der Adresszeile an.</p>

<h2>8. Änderungen</h2>
<p>Sollte die Website künftig Funktionen erhalten, die Daten anders verarbeiten, etwa einen Formulardienst oder Statistik-Tools, wird diese Erklärung vor der Freischaltung aktualisiert.</p>
`,
  },

  imprint: {
    title: 'Impressum | Sergej Kukshausen',
    description: 'Impressum und rechtliche Hinweise für sergej.kukshausen.me.',
    h1: 'Impressum',
    body: `
<h2>Betreiber der Website</h2>
<p>Sergej Kukshausen<br />Budapest, Ungarn<br />E-Mail: <a href="mailto:sergej@kukshausen.me">sergej@kukshausen.me</a><br />Telefon: <a href="tel:+36707871989">+36 70 787 1989</a></p>
<p>Angaben gemäß dem ungarischen Gesetz CVIII/2001 über elektronische Handelsdienstleistungen sowie, soweit anwendbar, § 5 DDG und § 18 Abs. 2 MStV.</p>
<p>Verantwortlich für den Inhalt: Sergej Kukshausen, Anschrift wie oben.</p>

<h2>Haftung für Inhalte</h2>
<p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich, jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

<h2>Haftung für Links</h2>
<p>Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Bei Bekanntwerden von Rechtsverletzungen entferne ich derartige Links umgehend.</p>

<h2>Urheberrecht</h2>
<p>Texte, Fotos und das Logo auf dieser Website sind, soweit nicht anders angegeben, mein eigenes Werk und urheberrechtlich geschützt. Vervielfältigung oder Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. Die Marken-Icons auf dieser Website gehören den jeweiligen Inhabern und dienen ausschließlich der Kennzeichnung des Dienstes.</p>

<h2>Streitbeilegung</h2>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>. Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
`,
  },
};
