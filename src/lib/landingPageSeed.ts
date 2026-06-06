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
        'Nitriansky technologicky inkubator bridges the gap between academic research and market reality. We turn bold ideas into high-performance startups.',
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
          name: 'Ing. Marek Novak',
          role: 'Lead Mentor / AI Systems',
        },
        {
          bio: 'Specializes in market entry strategies for DeepTech startups.',
          name: 'Dr. Lucia Bielik',
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
        'Nitriansky technologicky inkubator prepaja akademicky vyskum s realitou trhu. Pomahame menit odvazne napady na vykonne startupy.',
      eyebrow: 'Inovacne centrum',
      titleHighlight: 'presnost',
      titlePrefix: 'Pohaname',
      titleSuffix: 'buduce technologie.',
    },
    programs: {
      heading: 'Vyberte si svoju cestu k inovaciam',
      items: [
        {
          accent: 'primary',
          bulletItems: [
            'Pristup k seed financovaniu',
            'Individualne mentorstvo',
            'Specializovane laboratorne zazemie',
          ],
          description:
            'Pre vizionarov s vlastnym produktovym napadom. Premenime prototyp na firmu pripravenu na trh s plnou inkubacnou podporou.',
          icon: 'rocket',
          title: 'Program A: Rozbeh startupu',
        },
        {
          accent: 'tertiary',
          bulletItems: [
            'Realna firemna prax',
            'Spolupraca s podnikmi',
            'Prilezitosti na karierny rast',
          ],
          description:
            'Riesite skutocne vyzvy od firemnych partnerov. Ziskate prax a vytvorite riesenia s realnym dopadom.',
          icon: 'building',
          title: 'Program B: Prepojenie s priemyslom',
        },
      ],
    },
    infrastructure: {
      cards: [
        {
          description:
            'Prepajame vas s univerzitnym vyskumom a silnymi europskymi technologickymi centrami.',
          icon: 'users',
          title: 'Globalne partnerstva',
          tone: 'surface',
        },
        {
          description: 'Pod vedenim ludi zo Silicon Valley aj z Bratislavy.',
          icon: 'mentor',
          title: 'Mentoring',
          tone: 'primary',
        },
        {
          description: 'Pomahame udrzat talent v Nitre cez skutocne prilezitosti.',
          icon: 'building',
          title: 'Udrzanie talentu',
          tone: 'tertiary',
        },
      ],
      eyebrow: 'Preco NTI',
      featuredCard: {
        description:
          'Pristup k modernym priestorom, 3D tlaci, laboratoriam aj pravnej podpore pri raste projektu.',
        icon: 'flask',
        title: 'Plnohodnotna inkubacia',
      },
      heading: 'Architektura presneho inovacneho zazemia',
    },
    ecosystem: {
      description:
        'Spolupracujeme s inovativnymi firmami a skusenymi mentormi v regione, aby sa vase projekty posuvali rychlejsie.',
      heading: 'Nas ekosystem',
      mentors: [
        {
          bio: 'Expert na neuronove siete s viac ako 15 rokmi medzinarodneho vyskumneho a vyvojoveho zazemia.',
          name: 'Ing. Marek Novak',
          role: 'Hlavny mentor / AI systemy',
        },
        {
          bio: 'Specialistka na vstup na trh a rast DeepTech startupov.',
          name: 'Dr. Lucia Bielik',
          role: 'Biznis strategia',
        },
      ],
      partnerLogos: ['TECHCORP', 'UNIDATA', 'NITRA_LAB'],
      successHighlight: {
        eyebrow: 'Nedavny uspech',
        metric: 'Ziskane financovanie 500 tisic EUR',
        subtext: 'Absolvent kohorty 2023',
        title: 'AquaSense Solutions',
      },
    },
    finalCTA: {
      description:
        'Pridajte sa ku komunite inovatorov, inzinierov a podnikatelov. Dalsia kohorta startuje v septembri.',
      title: 'Ste pripraveni budovat buducnost Nitry?',
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
