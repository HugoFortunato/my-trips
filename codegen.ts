import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api-sa-east-1.hygraph.com/v2/cldj9gach054901rqc8z3ctum/master',
  documents: 'src/graphql/queries.ts',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
