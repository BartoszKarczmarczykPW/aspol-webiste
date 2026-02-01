import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About Section')
        .child(S.documentTypeList('aboutSection').title('About Section')),
      S.listItem()
        .title('Initiatives')
        .child(S.documentTypeList('initiative').title('Initiatives')),
      S.listItem()
        .title('Team Members')
        .child(S.documentTypeList('teamMember').title('Team Members')),
      S.listItem()
        .title('Testimonials')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem()
        .title('Statistics')
        .child(S.documentTypeList('statistics').title('Statistics')),
      S.divider(),
      S.listItem()
        .title('Partners')
        .child(S.documentTypeList('partner').title('Partners')),
      S.divider(),
      S.listItem()
        .title('Contact Messages')
        .child(S.documentTypeList('contactMessage').title('Contact Messages')),
      S.listItem()
        .title('Newsletter Signups')
        .child(S.documentTypeList('newsletterSignup').title('Newsletter Signups')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'partner' &&
          item.getId() !== 'statistics' &&
          item.getId() !== 'teamMember' &&
          item.getId() !== 'aboutSection' &&
          item.getId() !== 'initiative' &&
          item.getId() !== 'testimonial' &&
          item.getId() !== 'contactMessage' &&
          item.getId() !== 'newsletterSignup'
      ),
    ])
