import type { Locale, SeedFeature as Feature } from './marketingSeedTypes'

type Mentor = { name: string; role: string; bio: string }

/**
 * Default content for the {@link ../globals/Mentors} global — the single source
 * of truth for the mentors page copy. Mentor photos are intentionally omitted:
 * they are static frontend assets, optionally overridden by a CMS media upload.
 */
type SeedMentorsContent = {
  hero: { eyebrow: string; title: string; description: string }
  value: { eyebrow: string; title: string; description: string; features: Feature[] }
  people: { eyebrow: string; title: string; description: string; mentors: Mentor[] }
  cta: { title: string; description: string }
}

export const mentorsSeedContent: Record<Locale, SeedMentorsContent> = {
  en: {
    hero: {
      eyebrow: 'Mentoring',
      title: 'Guided by people who have built it before',
      description:
        'Mentoring is at the heart of NTI. Our network of operators, researchers and founders works one-on-one with teams across both programs — and we are always looking for new experts to join.',
    },
    value: {
      eyebrow: 'Why it matters',
      title: 'What mentoring delivers',
      description: 'Great mentoring is the difference between a promising idea and a real company.',
      features: [
        {
          icon: 'mentor',
          title: '1-on-1 guidance',
          description: 'Dedicated mentors meet teams regularly to unblock problems and set focus.',
        },
        {
          icon: 'target',
          title: 'Sharper decisions',
          description:
            'Experience helps founders avoid common pitfalls and move faster with less risk.',
        },
        {
          icon: 'network',
          title: 'Access to a network',
          description: 'Mentors open doors to partners, investors and the wider ecosystem.',
        },
      ],
    },
    people: {
      eyebrow: 'Our ecosystem',
      title: 'Meet some of our mentors',
      description:
        'Experts across AI, hardware, business strategy and product, supporting teams in Nitra and beyond.',
      mentors: [
        {
          name: 'Ing. Marek Novák',
          role: 'Lead Mentor · AI Systems',
          bio: 'Expert in neural networks with 15+ years in international R&D.',
        },
        {
          name: 'Dr. Lucia Bieliková',
          role: 'Business Strategy',
          bio: 'Specialises in market-entry strategies for DeepTech startups.',
        },
        {
          name: 'Ing. Peter Horák',
          role: 'Hardware & Prototyping',
          bio: 'Helps teams go from breadboard to manufacturable product.',
        },
        {
          name: 'Mgr. Eva Kováčová',
          role: 'Product & Go-to-Market',
          bio: 'Guides founders on product discovery and reaching first customers.',
        },
      ],
    },
    cta: {
      title: 'Share your experience — mentor a team',
      description:
        'Experienced operators and researchers are the backbone of NTI. Get involved and give back to the regional ecosystem.',
    },
  },
  sk: {
    hero: {
      eyebrow: 'Mentoring',
      title: 'Pod vedením ľudí, ktorí to už postavili',
      description:
        'Mentoring je srdcom NTI. Naša sieť odborníkov, výskumníkov a zakladateľov pracuje individuálne s tímami v oboch programoch — a stále hľadáme nových expertov.',
    },
    value: {
      eyebrow: 'Prečo na tom záleží',
      title: 'Čo mentoring prináša',
      description: 'Kvalitný mentoring je rozdiel medzi sľubným nápadom a skutočnou firmou.',
      features: [
        {
          icon: 'mentor',
          title: 'Individuálne vedenie',
          description:
            'Mentori sa pravidelne stretávajú s tímami, odblokujú problémy a nastavia smer.',
        },
        {
          icon: 'target',
          title: 'Lepšie rozhodnutia',
          description:
            'Skúsenosti pomáhajú zakladateľom vyhnúť sa chybám a napredovať s menším rizikom.',
        },
        {
          icon: 'network',
          title: 'Prístup k sieti',
          description: 'Mentori otvárajú dvere k partnerom, investorom a širšiemu ekosystému.',
        },
      ],
    },
    people: {
      eyebrow: 'Náš ekosystém',
      title: 'Spoznajte niektorých z našich mentorov',
      description:
        'Odborníci na AI, hardvér, biznis stratégiu a produkt, ktorí podporujú tímy v Nitre aj mimo nej.',
      mentors: [
        {
          name: 'Ing. Marek Novák',
          role: 'Hlavný mentor · AI systémy',
          bio: 'Expert na neurónové siete s viac ako 15 rokmi medzinárodného výskumu a vývoja.',
        },
        {
          name: 'Dr. Lucia Bieliková',
          role: 'Biznis stratégia',
          bio: 'Špecializuje sa na stratégie vstupu na trh pre DeepTech startupy.',
        },
        {
          name: 'Ing. Peter Horák',
          role: 'Hardvér a prototypovanie',
          bio: 'Pomáha tímom dostať sa od prototypu k vyrobiteľnému produktu.',
        },
        {
          name: 'Mgr. Eva Kováčová',
          role: 'Produkt a vstup na trh',
          bio: 'Vedie zakladateľov pri objavovaní produktu a získavaní prvých zákazníkov.',
        },
      ],
    },
    cta: {
      title: 'Zdieľajte svoje skúsenosti — mentorujte tím',
      description:
        'Skúsení odborníci a výskumníci sú chrbtovou kosťou NTI. Zapojte sa a prispejte regionálnemu ekosystému.',
    },
  },
}

export const mentorsSeedLocales = ['en', 'sk'] as const

/** Mentors content is already in its final Payload shape. */
export function buildMentorsSeedData(locale: Locale) {
  return mentorsSeedContent[locale]
}
