import type { Preview } from '@storybook/react-vite';
import { DocsPage } from './DocsPage';

// 저장소 원본 토큰을 그대로 읽습니다. 복사본이 아니므로 tokens.css 가 바뀌면 즉시 반영됩니다.
import '../../tokens/tokens.css';
import '../src/styles/fonts.css';
import '../src/styles/typography.css';
import '../src/styles/motion.css';
import '../src/styles/preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    options: {
      /* 사이드바 순서를 저장소 `components/` 폴더 구조와 맞춥니다.

         기본 정렬은 제목이 아니라 **스토리 파일이 로딩되는 순서**(= `src/components/` 폴더명 순)라
         폴더명과 제목이 다른 컴포넌트가 엉뚱한 자리에 끼어듭니다 — `Calendar/` 가 만드는
         `Date Time Picker` 그룹이 Button Spinner 뒤에, `Label/` 이 만드는 `Global` 그룹이
         Icon Button 뒤에 붙어 있었습니다.

         `method: 'alphabetical'` 은 쓸 수 없습니다 — **한 페이지 안의 스토리까지 이름순으로 섞어**
         Playground → 전 변형 → 세부 로 짜 둔 설명 흐름이 무너집니다.

         ⚠️ 이 함수는 **인라인으로만** 써야 하고 **바깥 값을 참조하면 안 됩니다.**
         Storybook 이 preview 를 정적 파싱해 이 자리의 소스만 떼어다 평가하기 때문입니다
         (밖에 선언한 함수를 가리키면 `/index.json` 이 500 으로 죽습니다).
         같은 이유로 안쪽에 타입 주석도 달지 않습니다. */
      storySort: (a, b) => {
        // 같은 페이지 안의 스토리는 파일에 적은 순서가 곧 설명 순서입니다 — 그대로 둡니다
        if (a.title === b.title) return 0;

        const roots = ['시작하기', 'Foundations', 'Components'];
        const rank = (t) => {
          const i = roots.indexOf(t.split('/')[0]);
          return i === -1 ? roots.length : i; // 목록에 없는 최상위는 맨 뒤
        };
        const ra = rank(a.title);
        const rb = rank(b.title);
        if (ra !== rb) return ra - rb;

        /* 제목을 한 문자열로 비교하면 구분자(`/`)와 공백의 우선순위 때문에 형제 순서가 틀어집니다.
           트리와 같은 기준으로 보려면 마디별로 끊어 비교해야 합니다. */
        const pa = a.title.split('/');
        const pb = b.title.split('/');
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
          if (pa[i] === undefined) return -1; // 더 얕은 쪽(폴더가 아닌 페이지)이 먼저
          if (pb[i] === undefined) return 1;
          if (pa[i] !== pb[i]) return pa[i].localeCompare(pb[i], 'ko');
        }
        return 0;
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
