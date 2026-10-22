/**
 * Event photography used by the redesign. Files live in /public/assets/events
 * (selected and resized from the `zdjecia` source folder; see design.md for the
 * selection log). Alt text is localised so next/image gets a meaningful
 * description in every language the site speaks.
 */
export type PhotoKey =
  | "hallWide"
  | "hallAudience"
  | "terraceDay"
  | "panel2026"
  | "networking"
  | "laughingTrio"
  | "sofaGroup"
  | "sunsetGroup"
  | "sunsetFriends"
  | "smilingPair"
  | "violinPiano"
  | "singer"
  | "salonGroup"
  | "groupBanner"
  | "panelWide";

interface Photo {
  src: string;
  width: number;
  height: number;
  alt: { en: string; fr: string; pl: string };
}

const base = "/assets/events";

export const PHOTOS: Record<PhotoKey, Photo> = {
  hallWide: {
    src: `${base}/ppf24-hall-wide.jpg`,
    width: 2000,
    height: 1333,
    alt: {
      en: "Audience filling a gilded salon during the Paris Polish Forum 2024",
      fr: "Public réuni dans un salon doré lors du Paris Polish Forum 2024",
      pl: "Publiczność w złoconej sali podczas Paris Polish Forum 2024",
    },
  },
  hallAudience: {
    src: `${base}/ppf24-hall-audience.jpg`,
    width: 2000,
    height: 1333,
    alt: {
      en: "Rows of guests listening to a panel at the Paris Polish Forum 2024",
      fr: "Rangées d'invités écoutant un débat au Paris Polish Forum 2024",
      pl: "Rzędy gości słuchających panelu podczas Paris Polish Forum 2024",
    },
  },
  terraceDay: {
    src: `${base}/ppf24-terrace-day.jpg`,
    width: 2000,
    height: 1756,
    alt: {
      en: "Young guests posing together on a sunny terrace with the Eiffel Tower behind",
      fr: "Jeunes invités posant ensemble sur une terrasse ensoleillée, la tour Eiffel en arrière-plan",
      pl: "Młodzi goście pozują razem na słonecznym tarasie z wieżą Eiffla w tle",
    },
  },
  panel2026: {
    src: `${base}/ppf10-panel-flags.jpg`,
    width: 2000,
    height: 1331,
    alt: {
      en: "Panel discussion in front of French, Polish and European flags at Paris Polish Forum X",
      fr: "Table ronde devant les drapeaux français, polonais et européen au Paris Polish Forum X",
      pl: "Panel dyskusyjny na tle flag Francji, Polski i UE podczas Paris Polish Forum X",
    },
  },
  networking: {
    src: `${base}/ppf24-networking.jpg`,
    width: 2000,
    height: 1333,
    alt: {
      en: "Students talking in a small group during the reception",
      fr: "Étudiants discutant en petit groupe pendant la réception",
      pl: "Studenci rozmawiający w małej grupie podczas przyjęcia",
    },
  },
  laughingTrio: {
    src: `${base}/ppf24-laughing-trio.jpg`,
    width: 2000,
    height: 1448,
    alt: {
      en: "Three guests laughing together in the audience",
      fr: "Trois invités riant ensemble dans le public",
      pl: "Troje gości śmiejących się razem na widowni",
    },
  },
  sofaGroup: {
    src: `${base}/ppf24-sofa-group.jpg`,
    width: 2000,
    height: 1441,
    alt: {
      en: "Five friends sitting together on a salon sofa",
      fr: "Cinq amis assis ensemble sur un canapé de salon",
      pl: "Pięcioro przyjaciół siedzących razem na salonowej sofie",
    },
  },
  sunsetGroup: {
    src: `${base}/ppf24-sunset-group.jpg`,
    width: 2000,
    height: 1333,
    alt: {
      en: "Guests gathered on a terrace at sunset with the Eiffel Tower in the distance",
      fr: "Invités réunis sur une terrasse au coucher du soleil, la tour Eiffel au loin",
      pl: "Goście zgromadzeni na tarasie o zachodzie słońca z wieżą Eiffla w oddali",
    },
  },
  sunsetFriends: {
    src: `${base}/ppf24-sunset-friends.jpg`,
    width: 2000,
    height: 1297,
    alt: {
      en: "Friends with drinks on the terrace at dusk",
      fr: "Amis un verre à la main sur la terrasse au crépuscule",
      pl: "Przyjaciele z drinkami na tarasie o zmierzchu",
    },
  },
  smilingPair: {
    src: `${base}/ppf24-smiling-pair.jpg`,
    width: 2000,
    height: 1679,
    alt: {
      en: "Two smiling guests turning to the camera",
      fr: "Deux invitées souriantes se tournant vers l'objectif",
      pl: "Dwoje uśmiechniętych gości odwracających się do aparatu",
    },
  },
  violinPiano: {
    src: `${base}/ppf10-violin-piano.jpg`,
    width: 2000,
    height: 1331,
    alt: {
      en: "A violinist and a pianist performing at the Paris Polish Forum X",
      fr: "Un violoniste et un pianiste en concert au Paris Polish Forum X",
      pl: "Skrzypek i pianista występujący podczas Paris Polish Forum X",
    },
  },
  singer: {
    src: `${base}/ppf10-singer.jpg`,
    width: 2000,
    height: 1331,
    alt: {
      en: "A singer in a red dress performing with a pianist",
      fr: "Une chanteuse en robe rouge accompagnée d'un pianiste",
      pl: "Śpiewaczka w czerwonej sukni występująca z pianistą",
    },
  },
  salonGroup: {
    src: `${base}/ppf24-salon-group.jpg`,
    width: 2000,
    height: 1333,
    alt: {
      en: "A group of guests around a coffee table in a blue and gold salon",
      fr: "Un groupe d'invités autour d'une table dans un salon bleu et or",
      pl: "Grupa gości przy stoliku w niebiesko-złotym salonie",
    },
  },
  groupBanner: {
    src: `${base}/ppf10-group-banner.jpg`,
    width: 2000,
    height: 1331,
    alt: {
      en: "Speakers and organisers posing in front of the Paris Polish Forum X banner",
      fr: "Intervenants et organisateurs posant devant la bannière du Paris Polish Forum X",
      pl: "Prelegenci i organizatorzy pozują przed banerem Paris Polish Forum X",
    },
  },
  panelWide: {
    src: `${base}/ppf24-panel-wide.jpg`,
    width: 2000,
    height: 1333,
    alt: {
      en: "Five speakers on stage under the Paris Polish Forum 2024 screen",
      fr: "Cinq intervenants sur scène sous l'écran du Paris Polish Forum 2024",
      pl: "Pięciu prelegentów na scenie pod ekranem Paris Polish Forum 2024",
    },
  },
};

type Lang = "en" | "fr" | "pl";
export const photoAlt = (key: PhotoKey, lang: string): string =>
  PHOTOS[key].alt[(lang as Lang) in PHOTOS[key].alt ? (lang as Lang) : "en"];
