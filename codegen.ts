import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  // schema: 'https://demo.vendure.io/shop-api',
  schema: './src/api/schema.graphql',
  documents: './src/**/*.graphql',
  generates: {
    // './src/api/schema.graphql': {
    //   plugins: ['schema-ast'],
    // },
    './src/api/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withMutationFn: true,
        withHooks: true,
      },
    },
  },
}

export default config
