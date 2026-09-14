import type { Preview } from '@storybook/react-vite';
import { DocsPage } from './DocsPage';

// 저장소 원본 토큰을 그대로 읽습니다. 복사본이 아니므로 tokens.css 가 바뀌면 즉시 반영됩니다.
import '../../tokens/tokens.css';
import '../src/styles/fonts.css';
import '../src/styles/typography.css';
import '../src/styles/preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    options: {
      storySort: {
        order: ['시작하기', 'Foundations', 'Components', '*'],
      },
    },
    // Docs 페이지에서 첫 스토리가 두 번 그려지지 않도록 템플릿을 지정합니다 (DocsPage.tsx 참고)
    docs: { toc: true, page: DocsPage },
    backgrounds: {
      options: {
        light: { name: '흰 배경', value: '#FFFFFF' },
        gray: { name: '회색 배경', value: '#F4F5F6' },
        dark: { name: '어두운 배경', value: '#202837' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};

export default preview;
