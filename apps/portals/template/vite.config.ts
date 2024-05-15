import { portalsViteConfig } from 'vite-config'
import { mergeConfig } from 'vitest/config'
import path from 'path'

export default mergeConfig(portalsViteConfig, {
  resolve: {
    alias: [
      // mapping packages in monorepo to make vite use sources directly avoiding build step
      {
        find: /portals-base(?!\/src\/style\/)/,
        replacement: path.resolve(__dirname, '../../portals-base/src'),
      },
      {
        find: /synapse-react-client(?!\/dist\/(template_)?style\/)/,
        replacement: path.resolve(
          __dirname,
          '../../../packages/synapse-react-client/src',
        ),
      },
    ],
  },
})
