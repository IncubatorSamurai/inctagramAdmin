import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA,
  documents: ['./src/shared/graphql/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/shared/graphql/types.ts': { plugins: ['typescript'] },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
}

export default config
