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

    /**
     * 자산 파일명에서 **내용 해시를 뺍니다.**
     *
     * GitHub Pages 는 응답 헤더를 바꿀 수 없고 `cache-control: max-age=600` 이 박혀 있습니다.
     * 그래서 배포 직후 10분 동안, 이미 열려 있던 탭은 **이전 배포의 `iframe.html`·번들**을 들고
     * 사라진 옛 해시 파일을 계속 찾습니다 → 404 →
     * `Failed to fetch dynamically imported module` / `Unable to preload CSS` 오류가 뜹니다.
     *
     * 해시는 "파일을 영구 캐시해도 안전하게" 하려는 장치인데 여기선 10분이 상한이라 **얻는 게 없습니다.**
     * 파일명을 고정하면 옛 탭이 요청해도 같은 이름의 새 파일이 있어 **404 대신 정상 로드**되고,
     * 최악이라도 10분 안에 저절로 맞춰집니다(하드 실패 → 소프트 실패).
     */
    cfg.build ??= {};
    cfg.build.rollupOptions ??= {};
    const naming = {
      entryFileNames: 'assets/[name].js',
      chunkFileNames: 'assets/[name].js',
      assetFileNames: 'assets/[name][extname]',
    };
    const out = cfg.build.rollupOptions.output;
    cfg.build.rollupOptions.output = Array.isArray(out)
      ? out.map((o) => ({ ...o, ...naming }))
      : { ...(out ?? {}), ...naming };

    return cfg;
  },
};

export default config;
