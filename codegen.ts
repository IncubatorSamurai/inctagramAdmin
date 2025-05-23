import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://inctagram.work/api/v1/graphql',
  documents: ['./src/shared/graphql/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/shared/graphql/types.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: './shared/graphql/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
}

export default config
