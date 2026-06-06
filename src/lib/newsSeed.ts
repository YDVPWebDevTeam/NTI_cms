type Locale = 'en' | 'sk'

type LocalizedText = Record<Locale, string>

type LexicalNode = { [key: string]: unknown; type: string; version: number }

type LexicalRoot = {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: 'ltr'
    children: LexicalNode[]
  }
}

export type NewsSeedArticle = {
  slug: string
  status: 'published'
  publishedAt: string
  category: LocalizedText
  author: LocalizedText
  title: LocalizedText
  excerpt: LocalizedText
  /** Body paragraphs per locale, joined into a minimal Lexical document. */
  body: Record<Locale, string[]>
}

export const newsSeedLocales: Locale[] = ['en', 'sk']

/** Build a minimal Lexical editor state from plain paragraph strings. */
export const paragraphsToLexical = (paragraphs: string[]): LexicalRoot => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      textFormat: 0,
      children: [
        {
          type: 'text',
          version: 1,
          text,
          format: 0,
          style: '',
          mode: 'normal',
          detail: 0,
        },
      ],
    })),
  },
})

export const newsSeedArticles: NewsSeedArticle[] = [
  {
    slug: 'nti-opens-autumn-cohort-applications',
    status: 'published',
    publishedAt: '2026-05-28',
    category: { en: 'Announcement', sk: 'Oznámenie' },
    author: { en: 'NTI Team', sk: 'Tím NTI' },
    title: {
      en: 'Applications open for the autumn 2026 cohort',
      sk: 'Otvárame prihlášky pre jesennú kohortu 2026',
    },
    excerpt: {
      en: 'Students, teams and founders can now apply for Program A and Program B. The next cohort starts in September.',
      sk: 'Študenti, tímy a zakladatelia sa už môžu prihlásiť do Programu A a Programu B. Ďalšia kohorta štartuje v septembri.',
    },
    body: {
      en: [
        'The Nitra Technology Incubator is opening applications for its autumn 2026 cohort. Whether you are a student with a bold product idea or a team ready to solve a real corporate challenge, there is a track for you.',
        'Program A supports founders from prototype to a market-ready company with seed funding, mentoring and lab infrastructure. Program B connects student teams with companies to deliver breakthrough solutions while gaining professional experience.',
        'Applications close at the end of August. Selected teams will be invited to a short interview before the final decision.',
      ],
      sk: [
        'Nitriansky technologický inkubátor otvára prihlášky pre jesennú kohortu 2026. Či ste študent s odvážnym produktovým nápadom alebo tím pripravený riešiť skutočnú firemnú výzvu, máme cestu pre vás.',
        'Program A podporuje zakladateľov od prototypu až po firmu pripravenú na trh – so seed financovaním, mentorstvom a laboratórnym zázemím. Program B prepája študentské tímy s firmami pri tvorbe riešení s reálnym dopadom.',
        'Prihlášky sa uzatvárajú koncom augusta. Vybrané tímy pozveme na krátky pohovor pred finálnym rozhodnutím.',
      ],
    },
  },
  {
    slug: 'aquasense-secures-500k-funding',
    status: 'published',
    publishedAt: '2026-04-15',
    category: { en: 'Success Story', sk: 'Príbeh úspechu' },
    author: { en: 'NTI Team', sk: 'Tím NTI' },
    title: {
      en: 'AquaSense Solutions secures €500k in funding',
      sk: 'AquaSense Solutions získava financovanie 500-tisíc eur',
    },
    excerpt: {
      en: 'A 2023 cohort graduate closes its first major investment round to scale water-quality sensing across Europe.',
      sk: 'Absolvent kohorty 2023 uzatvára prvé veľké investičné kolo a škáluje meranie kvality vody v Európe.',
    },
    body: {
      en: [
        'AquaSense Solutions, a graduate of our 2023 cohort, has closed a €500k funding round led by regional deep-tech investors.',
        'The team began at NTI with a prototype water-quality sensor and access to our lab infrastructure and mentoring network. Two years later they are deploying across multiple European markets.',
        'Their journey is exactly the kind of outcome the incubator is built to create: turning bold research into a high-performance company.',
      ],
      sk: [
        'AquaSense Solutions, absolvent našej kohorty 2023, uzavrel investičné kolo vo výške 500-tisíc eur vedené regionálnymi deep-tech investormi.',
        'Tím začínal v NTI s prototypom senzora kvality vody, prístupom k laboratóriám a mentorskej sieti. O dva roky neskôr expanduje na viaceré európske trhy.',
        'Ich cesta je presne tým výsledkom, pre ktorý inkubátor vznikol: premena odvážneho výskumu na výkonnú firmu.',
      ],
    },
  },
  {
    slug: 'meet-our-new-mentors',
    status: 'published',
    publishedAt: '2026-03-02',
    category: { en: 'Community', sk: 'Komunita' },
    author: { en: 'NTI Team', sk: 'Tím NTI' },
    title: {
      en: 'Meet the mentors joining NTI this year',
      sk: 'Predstavujeme mentorov, ktorí tento rok posilnili NTI',
    },
    excerpt: {
      en: 'New experts in AI, hardware and go-to-market are joining our mentoring network to support the next cohort.',
      sk: 'Noví experti na AI, hardvér a vstup na trh sa pridávajú do našej mentorskej siete pre ďalšiu kohortu.',
    },
    body: {
      en: [
        'This year we are welcoming several new mentors to the NTI network, spanning AI systems, hardware engineering and go-to-market strategy.',
        'Mentors work one-on-one with founders and student teams, helping them avoid common pitfalls and move faster from idea to validated product.',
        'If you are an experienced operator or researcher and want to give back to the regional ecosystem, we would love to hear from you.',
      ],
      sk: [
        'Tento rok do siete NTI vítame viacerých nových mentorov – z oblasti AI systémov, hardvérového inžinierstva a stratégie vstupu na trh.',
        'Mentori pracujú individuálne so zakladateľmi a študentskými tímami, pomáhajú im vyhnúť sa typickým chybám a rýchlejšie posúvať nápad k overenému produktu.',
        'Ak ste skúsený odborník alebo výskumník a chcete prispieť regionálnemu ekosystému, ozvite sa nám.',
      ],
    },
  },
]
