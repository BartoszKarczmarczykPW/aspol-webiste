import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Statistics')
        .child(S.documentTypeList('statistics').title('Statistics')),
      S.divider(),
      S.listItem()
        .title('Partners')
        .child(S.documentTypeList('partner').title('Partners')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'partner' && item.getId() !== 'statistics'),
    ])
