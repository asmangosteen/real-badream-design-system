import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';

/**
 * 기본 Docs 템플릿은 첫 번째 스토리(대개 Playground)를 Primary 블록과 STORIES 목록에
 * **두 번** 그립니다. 두 복사본이 같은 args 를 공유하는데, args 가 바뀌면 Primary 쪽만
 * 다시 그려져서 아래 복사본은 눌러도 반응하지 않는 것처럼 보입니다.
 * `includePrimary={false}` 로 중복 렌더를 없앱니다.
 */
export const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <Controls />
    <Stories includePrimary={false} />
  </>
);
