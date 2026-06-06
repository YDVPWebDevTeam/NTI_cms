import type { LandingPage } from '../payload-types'

type Locale = 'en' | 'sk'

/**
 * Seed content mirrors the {@link LandingPage} global, minus the fields Payload
 * manages (id/timestamps) and optional media uploads. Repeating `{ label }`
 * arrays are authored here as plain `string[]` and expanded in
 * {@link buildLandingPageSeedData}.
 */
type SeedLandingPageContent = Omit<
  LandingPage,
  'createdAt' | 'ecosystem' | 'hero' | 'id' | 'infrastructure' | 'programs' | 'updatedAt'
> & {
  ecosystem: Omit<LandingPage['ecosystem'], 'mentors' | 'partnerLogos'> & {
    mentors: Array<Omit<LandingPage['ecosystem']['mentors'][number], 'id' | 'image'>>
    partnerLogos: string[]
  }
  hero: Omit<LandingPage['hero'], 'heroImage'>
  infrastructure: Omit<LandingPage['infrastructure'], 'cards' | 'featuredCard'> & {
    cards: Array<Omit<LandingPage['infrastructure']['cards'][number], 'id'>>
    featuredCard: Omit<LandingPage['infrastructure']['featuredCard'], 'image'>
  }
  programs: Omit<LandingPage['programs'], 'items'> & {
    items: Array<
      Omit<LandingPage['programs']['items'][number], 'bulletItems' | 'id'> & { bulletItems: string[] }
    >
  }
}

export const landingPageSeedContent: Record<Locale, SeedLandingPageContent> = {
  en: {
    hero: {
      description:
        'The Nitra Technology Incubator (NTI) bridges the gap between academic research and market reality. We turn bold ideas into high-performance startups.',
      eyebrow: 'Innovation Hub',
      titleHighlight: 'Precision',
      titlePrefix: 'Fueling the',
      titleSuffix: 'of Future Tech.',
    },
    programs: {
      heading: 'Choose Your Path to Innovation',
      items: [
        {
          accent: 'primary',
          bulletItems: [
            'Seed Funding Access',
            '1-on-1 Mentoring',
            'Specialized Lab Infrastructure',
          ],
          description:
            'For visionaries with their own product ideas. Transform your prototype into a market-ready company with full incubation support.',
          icon: 'rocket',
          title: 'Program A: Venture Launch',
        },
        {
          accent: 'tertiary',
          bulletItems: [
            'Real-world Corporate Practice',
            'Collaboration with Enterprises',
            'Career Placement Opportunities',
          ],
          description:
            'Solve real-world challenges defined by our corporate partners. Gain professional experience while building breakthrough solutions.',
          icon: 'building',
          title: 'Program B: Industry Bridge',
        },
      ],
    },
    infrastructure: {
      cards: [
        {
          description: 'Connecting you to university research and top European tech clusters.',
          icon: 'users',
          title: 'Global Partnerships',
          tone: 'surface',
        },
        {
          description: 'Guided by veterans from Silicon Valley to Bratislava.',
          icon: 'mentor',
          title: 'Mentoring',
          tone: 'primary',
        },
        {
          description: 'Keeping bright minds in Nitra through opportunity.',
          icon: 'building',
          title: 'Talent Retention',
          tone: 'tertiary',
        },
      ],
      eyebrow: 'Why NTI',
      featuredCard: {
        description:
          'Access to premium office spaces, 3D printing labs, and legal support to scale your dream.',
        icon: 'flask',
        title: 'Full-Cycle Incubation',
      },
      heading: 'The Precision Engine Architecture',
    },
    ecosystem: {
      description:
        'We collaborate with the most innovative companies and experienced mentors in the region to ensure your success.',
      heading: 'Our Ecosystem',
      mentors: [
        {
          bio: 'Expert in neural networks with 15+ years in international R&D.',
          name: 'Ing. Marek Novák',
          role: 'Lead Mentor / AI Systems',
        },
        {
          bio: 'Specializes in market entry strategies for DeepTech startups.',
          name: 'Dr. Lucia Bieliková',
          role: 'Business Strategy',
        },
      ],
      partnerLogos: ['TECHCORP', 'UNIDATA', 'NITRA_LAB'],
      successHighlight: {
        eyebrow: 'Recent Success',
        metric: 'Secured EUR 500k Funding',
        subtext: '2023 Cohort Graduate',
        title: 'AquaSense Solutions',
      },
    },
    finalCTA: {
      description:
        'Join a community of innovators, engineers, and entrepreneurs. Our next cohort starts in September.',
      title: 'Ready to build the future of Nitra?',
    },
  },
  sk: {
    hero: {
      description:
        'Nitriansky technologický inkubátor prepája akademický výskum s realitou trhu. Pomáhame meniť odvážne nápady na výkonné startupy.',
      eyebrow: 'Inovačné centrum',
      titleHighlight: 'presnosť',
      titlePrefix: 'Poháňame',
      titleSuffix: 'budúce technológie.',
    },
    programs: {
      heading: 'Vyberte si svoju cestu k inováciám',
      items: [
        {
          accent: 'primary',
          bulletItems: [
            'Prístup k seed financovaniu',
            'Individuálne mentorstvo',
            'Špecializované laboratórne zázemie',
          ],
          description:
            'Pre vizionárov s vlastným produktovým nápadom. Premeníme prototyp na firmu pripravenú na trh s plnou inkubačnou podporou.',
          icon: 'rocket',
          title: 'Program A: Rozbeh startupu',
        },
        {
          accent: 'tertiary',
          bulletItems: [
            'Reálna firemná prax',
            'Spolupráca s podnikmi',
            'Príležitosti na kariérny rast',
          ],
          description:
            'Riešite skutočné výzvy od firemných partnerov. Získate prax a vytvoríte riešenia s reálnym dopadom.',
          icon: 'building',
          title: 'Program B: Prepojenie s priemyslom',
        },
      ],
    },
    infrastructure: {
      cards: [
        {
          description:
            'Prepájame vás s univerzitným výskumom a silnými európskymi technologickými centrami.',
          icon: 'users',
          title: 'Globálne partnerstvá',
          tone: 'surface',
        },
        {
          description: 'Pod vedením ľudí zo Silicon Valley aj z Bratislavy.',
          icon: 'mentor',
          title: 'Mentoring',
          tone: 'primary',
        },
        {
          description: 'Pomáhame udržať talent v Nitre cez skutočné príležitosti.',
          icon: 'building',
          title: 'Udržanie talentu',
          tone: 'tertiary',
        },
      ],
      eyebrow: 'Prečo NTI',
      featuredCard: {
        description:
          'Prístup k moderným priestorom, 3D tlači, laboratóriám aj právnej podpore pri raste projektu.',
        icon: 'flask',
        title: 'Plnohodnotná inkubácia',
      },
      heading: 'Architektúra presného inovačného zázemia',
    },
    ecosystem: {
      description:
        'Spolupracujeme s inovatívnymi firmami a skúsenými mentormi v regióne, aby sa vaše projekty posúvali rýchlejšie.',
      heading: 'Náš ekosystém',
      mentors: [
        {
          bio: 'Expert na neurónové siete s viac ako 15 rokmi medzinárodného výskumného a vývojového zázemia.',
          name: 'Ing. Marek Novák',
          role: 'Hlavný mentor / AI systémy',
        },
        {
          bio: 'Špecialistka na vstup na trh a rast DeepTech startupov.',
          name: 'Dr. Lucia Bieliková',
          role: 'Biznis stratégia',
        },
      ],
      partnerLogos: ['TECHCORP', 'UNIDATA', 'NITRA_LAB'],
      successHighlight: {
        eyebrow: 'Nedávny úspech',
        metric: 'Získané financovanie 500 tisíc EUR',
        subtext: 'Absolvent kohorty 2023',
        title: 'AquaSense Solutions',
      },
    },
    finalCTA: {
      description:
        'Pridajte sa ku komunite inovátorov, inžinierov a podnikateľov. Ďalšia kohorta štartuje v septembri.',
      title: 'Ste pripravení budovať budúcnosť Nitry?',
    },
  },
}

export const landingPageSeedLocales = ['en', 'sk'] as const

const toLabels = (values: string[]) => values.map((label) => ({ label }))

/**
 * Expands the plain `string[]` lists in seed content into the `{ label }[]`
 * shape Payload arrays expect. Every other field is already in its final shape,
 * so it is passed through untouched.
 */
export function buildLandingPageSeedData(locale: Locale) {
  const content = landingPageSeedContent[locale]

  return {
    ...content,
    ecosystem: {
      ...content.ecosystem,
      partnerLogos: toLabels(content.ecosystem.partnerLogos),
    },
    programs: {
      ...content.programs,
      items: content.programs.items.map((item) => ({
        ...item,
        bulletItems: toLabels(item.bulletItems),
      })),
    },
  }
}
