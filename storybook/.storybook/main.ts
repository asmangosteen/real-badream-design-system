import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

/**
 * 저장소 루트. 이 파일(.storybook/main.ts) 기준으로 두 단계 위가 저장소 루트입니다.
 * tokens/ · assets/ 를 복사하지 않고 원본에서 직접 읽기 위해 Vite 에 이 경로 접근을 허용합니다.
 * (토큰을 복사해두면 원본과 어긋나므로 일부러 복사하지 않습니다.)
 */
const configDir =
  typeof import.meta.dirname === 'string'
    ? import.meta.dirname
    : resolve(process.cwd(), '.storybook');
const repoRoot = resolve(configDir, '../..');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  viteFinal: async (cfg) => {
    cfg.server ??= {};
    cfg.server.fs = { ...(cfg.server.fs ?? {}), allow: [repoRoot] };
    return cfg;
  },
};

export default config;
