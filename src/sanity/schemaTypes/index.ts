import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, post],
}
