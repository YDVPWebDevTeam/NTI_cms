import type { Locale, SeedFeature as Feature } from './marketingSeedTypes'

/**
 * Default content for the {@link ../globals/Partners} global. This seed is the
 * single source of truth for the partners page copy — the frontend renders it
 * straight from the CMS with no hardcoded fallback. Plain `string[]` logo lists
 * are expanded into Payload `{ label }` arrays by {@link buildPartnersSeedData}.
 */
type SeedPartnersContent = {
  hero: { eyebrow: string; title: string; description: string }
  why: { eyebrow: string; title: string; description: string; features: Feature[] }
  ways: { eyebrow: string; title: string; description: string; features: Feature[] }
  logos: { label: string; items: string[] }
  cta: { title: string; description: string }
}

export const partnersSeedContent: Record<Locale, SeedPartnersContent> = {
  en: {
    hero: {
      eyebrow: 'For partners',
      title: 'Partner with the next generation of builders',
      description:
        'Companies, universities and investors shape the NTI ecosystem. Partner with us to access fresh talent, co-create breakthrough solutions and strengthen the regional innovation economy.',
    },
    why: {
      eyebrow: 'Why partner',
      title: 'What partnership unlocks',
      description: 'Tangible value for your organisation and the wider ecosystem.',
      features: [
        {
          icon: 'users',
          title: 'A direct talent pipeline',
          description: 'Meet, mentor and evaluate the engineers and founders of tomorrow.',
        },
        {
          icon: 'lightbulb',
          title: 'Fresh innovation capacity',
          description: 'Get motivated teams exploring problems your roadmap has not reached yet.',
        },
        {
          icon: 'globe',
          title: 'Regional impact & visibility',
          description: 'Back the local economy and build your brand among emerging tech leaders.',
        },
      ],
    },
    ways: {
      eyebrow: 'Ways to engage',
      title: 'Choose how you contribute',
      description:
        'There are multiple ways to get involved, from a single challenge to deep support.',
      features: [
        {
          icon: 'building',
          title: 'Define a challenge',
          description:
            'Submit a real problem to Program B and work with student teams on a solution.',
        },
        {
          icon: 'trending',
          title: 'Sponsor & fund',
          description: 'Support seed funding, rewards and infrastructure that power the programs.',
        },
        {
          icon: 'mentor',
          title: 'Mentor a team',
          description: 'Share your expertise one-on-one and help founders avoid costly mistakes.',
        },
        {
          icon: 'flask',
          title: 'Provide resources',
          description: 'Offer tooling, labs or workspaces that help teams move faster.',
        },
        {
          icon: 'graduation',
          title: 'Collaborate on research',
          description: 'Bridge academic research and market application with joint initiatives.',
        },
        {
          icon: 'handshake',
          title: 'Open career paths',
          description: 'Offer internships and roles to keep great talent in the region.',
        },
      ],
    },
    logos: {
      label: 'Trusted by partners across the ecosystem',
      items: ['UKF', 'FPVaI', 'Hra bez hraníc'],
    },
    cta: {
      title: 'Let’s build the regional innovation economy together',
      description: 'Register as a company to define challenges, mentor teams and partner with NTI.',
    },
  },
  sk: {
    hero: {
      eyebrow: 'Pre partnerov',
      title: 'Spojte sa s ďalšou generáciou tvorcov',
      description:
        'Firmy, univerzity a investori formujú ekosystém NTI. Staňte sa partnerom a získajte prístup k novému talentu, spoluvytvárajte prelomové riešenia a posilnite regionálnu inovačnú ekonomiku.',
    },
    why: {
      eyebrow: 'Prečo partnerstvo',
      title: 'Čo partnerstvo prináša',
      description: 'Konkrétna hodnota pre vašu organizáciu aj pre celý ekosystém.',
      features: [
        {
          icon: 'users',
          title: 'Priamy zdroj talentu',
          description: 'Spoznávajte, mentorujte a hodnoťte inžinierov a zakladateľov budúcnosti.',
        },
        {
          icon: 'lightbulb',
          title: 'Nová inovačná kapacita',
          description: 'Získajte motivované tímy na problémy, ku ktorým sa váš plán ešte nedostal.',
        },
        {
          icon: 'globe',
          title: 'Regionálny dopad a viditeľnosť',
          description: 'Podporte lokálnu ekonomiku a budujte značku medzi vznikajúcimi lídrami.',
        },
      ],
    },
    ways: {
      eyebrow: 'Možnosti zapojenia',
      title: 'Vyberte si, ako prispejete',
      description: 'Zapojiť sa môžete viacerými spôsobmi — od jednej výzvy po hĺbkovú podporu.',
      features: [
        {
          icon: 'building',
          title: 'Definujte výzvu',
          description: 'Pridajte reálny problém do Programu B a riešte ho so študentskými tímami.',
        },
        {
          icon: 'trending',
          title: 'Sponzorstvo a financovanie',
          description: 'Podporte seed financovanie, odmeny a zázemie, ktoré poháňajú programy.',
        },
        {
          icon: 'mentor',
          title: 'Mentorujte tím',
          description: 'Zdieľajte expertízu individuálne a pomôžte zakladateľom vyhnúť sa chybám.',
        },
        {
          icon: 'flask',
          title: 'Poskytnite zdroje',
          description:
            'Ponúknite nástroje, laboratóriá či priestory, ktoré tímom pomôžu napredovať.',
        },
        {
          icon: 'graduation',
          title: 'Spolupracujte na výskume',
          description: 'Prepájajte akademický výskum s trhom prostredníctvom spoločných iniciatív.',
        },
        {
          icon: 'handshake',
          title: 'Otvorte kariérne cesty',
          description: 'Ponúknite stáže a pozície, aby skvelý talent zostal v regióne.',
        },
      ],
    },
    logos: {
      label: 'Dôverujú nám partneri z celého ekosystému',
      items: ['UKF', 'FPVaI', 'Hra bez hraníc'],
    },
    cta: {
      title: 'Budujme regionálnu inovačnú ekonomiku spoločne',
      description:
        'Zaregistrujte sa ako firma, definujte výzvy, mentorujte tímy a spojte sa s NTI.',
    },
  },
}

export const partnersSeedLocales = ['en', 'sk'] as const

const toLabels = (values: string[]) => values.map((label) => ({ label }))

/** Expands the plain `string[]` logo list into the `{ label }[]` Payload shape. */
export function buildPartnersSeedData(locale: Locale) {
  const content = partnersSeedContent[locale]

  return {
    ...content,
    logos: {
      ...content.logos,
      items: toLabels(content.logos.items),
    },
  }
}
