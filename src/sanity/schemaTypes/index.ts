import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import post from './post'
import partner from './partner'
import statistics from './statistics'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, post, partner, statistics],
}
