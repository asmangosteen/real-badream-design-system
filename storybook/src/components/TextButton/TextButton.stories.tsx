import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextButton, type TextButtonSize, type TextButtonColor } from './TextButton';
import { Cell, Row, Section } from '../../shared/story-helpers';
import { namesOf } from '../Icon/registry';

const OUTLINED_ICONS = namesOf('outlined');


const SIZES: TextButtonSize[] = ['s', 'm', 'l', 'xl'];
const COLORS: TextButtonColor[] = ['blue', 'gray', 'red'];

const meta = {
  title: 'Components/Button/Text Button',
  component: TextButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '배경 없이 라벨만으로 저강조 액션을 유도하는 인라인 버튼입니다. **Size(4) × Text Color(3) × State(5) × Contents(3) ≈ 156개 변형.**',
          '',
          '## Button과 헷갈리기 쉬운 차이 2가지',
          '',
          '**1. 배경·패딩·radius가 전혀 없습니다.**',
          'Button은 배경 위에 반투명 오버레이를 얹어 Hover/Pressed를 표현하지만,',
          'Text Button은 얹을 배경이 없어 **텍스트 색 자체를 어둡게 합성**합니다.',
          '',
          '| State | Blue 라벨 실측 색 | 합성 공식 |',
          '|---|---|---|',
          '| Default | `#2C7BE2` | brand/primary-default |',
          '| Hover | `#276FCD` | 위에 `#0D2D57` 15% 합성 |',
          '| Pressed | `#2364B8` | 위에 `#0D2D57` 30% 합성 |',
          '',
          '**2. Size↔타이포 매핑이 Button과 다릅니다.**',
          '',
          '| Size | Text Button | Button |',
          '|---|---|---|',
          '| S | caption1 12/18 · **600** | caption1 · **600** |',
          '| M | body2 14/22 | body2 |',
          '| L | **body1 16/24** | body2 |',
          '| XL | **subtitle 18/24** | body1 |',
          '',
          '**Loading은 라벨 대신 스피너로 대체됩니다** (Button은 라벨을 유지한 채 스피너를 덧붙임).',
          'Figma에서 Loading은 Contents 축의 별도 값 **`Default`** 로 되어 있습니다 (Text/Text+Icon/Icon+Text와 나란한 4번째 값).',
          '',
          '## 2026-09-14 Figma 재실측으로 확정·정정된 것',
          '',
          '**① 아이콘 크기가 4개 Size 전부 확정됐습니다.** (이전에는 M만 실측되고 나머지는 추정이었습니다)',
          '',
          '| Size | 아이콘 | 텍스트↔아이콘 간격 | 전체 높이 |',
          '|---|---|---|---|',
          '| S | **12px** | **0px** ⚠️ | 18px |',
          '| M | 16px | 2px | 22px |',
          '| L | 16px | 2px | 24px |',
          '| XL | 20px | 2px | 24px |',
          '',
          '**② ⚠️ S만 간격이 0입니다 — 저장소 스펙 문서와 다릅니다.**',
          '문서에는 "전 사이즈 공통 `spacing/02`(2px)"로 되어 있지만, S 노드(`439:21286`)를 실측하니',
          '텍스트가 `x=0~25`에서 끝나고 12px 아이콘이 **`x=25`에서 바로 시작**합니다. 간격이 없습니다.',
          'M(`x=28→30`) · L(`x=32→34`) · XL(`x=36→38`)은 모두 2px가 맞습니다.',
          '**의도된 것인지 확인이 필요합니다.**',
          '',
          '**③ Loading 스피너 크기** — S 18 · M 22 · **L 24** · XL 24px.',
          'L이 XL과 같은 24px이라 Button의 매핑(L=22)과 다릅니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- **S의 텍스트↔아이콘 간격 0px이 의도된 것인지** — 저장소 스펙 문서는 2px이라고 되어 있습니다. (위 ② 참고)',
          '- **Loading 스피너 색**에 대한 규정이 없어 라벨 색을 따르게 했습니다.',
          '- 포커스 링은 Figma에 정의가 없어 구현에서 추가했습니다.',
          '',
          '스펙 원본: [`components/button/text-button/text-button.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/button/text-button/text-button.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: OUTLINED_ICONS,
      description: '아이콘 이름. 전체 목록은 **Components → Icon → 전체 갤러리** 에서 볼 수 있습니다',
    },
    size: { control: 'inline-radio', options: SIZES },
    color: { control: 'inline-radio', options: COLORS },
    contents: { control: 'inline-radio', options: ['text', 'text-icon', 'icon-text'] },
    'aria-label': {
      control: 'text',
      table: { category: '접근성' },
      description: '화면에 글자가 없을 때 스크린리더가 읽을 이름입니다. **디자인 변형 축이 아닙니다.**',
    },
    forceState: {
      control: 'inline-radio',
      options: [undefined, 'hover', 'pressed'],
      table: { category: '문서 표시용' },
      description: '변형 목록에서 Hover/Pressed 를 강제로 보여줄 때만 씁니다. **실제 서비스 코드에서는 쓰지 않습니다.**',
    },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: '전체보기', size: 'm', color: 'blue', contents: 'text', loading: false, disabled: false },
};

/** 4개 Size입니다. L=body1, XL=subtitle로 Button과 매핑이 다릅니다. */
export const Sizes: Story = {
  args: { children: '전체보기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Cell key={size} label={`${size.toUpperCase()} · ${{ s: 'caption1 600', m: 'body2', l: 'body1', xl: 'subtitle' }[size]}`}>
          <TextButton size={size}>전체보기</TextButton>
        </Cell>
      ))}
    </Row>
  ),
};

/** Text Color 3종 × State 5종입니다. Hover/Pressed에서 글자색이 직접 어두워집니다. */
export const States: Story = {
  args: { children: '전체보기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {COLORS.map((color) => (
        <Section key={color} title={`Text Color = ${color}`}>
          <Row>
            <Cell label="Default"><TextButton color={color}>전체보기</TextButton></Cell>
            <Cell label="Hover · 15% 합성"><TextButton color={color} forceState="hover">전체보기</TextButton></Cell>
            <Cell label="Pressed · 30% 합성"><TextButton color={color} forceState="pressed">전체보기</TextButton></Cell>
            <Cell label="Disabled · opacity 20%"><TextButton color={color} disabled>전체보기</TextButton></Cell>
            <Cell label="Loading · 라벨 대체"><TextButton color={color} loading>전체보기</TextButton></Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** 라벨과 아이콘의 조합입니다. **S만 간격이 0px** 이고 나머지는 2px입니다. */
export const Contents: Story = {
  args: { children: '전체보기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {SIZES.map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()}`}>
          <Row>
            <Cell label="Text"><TextButton size={size}>전체보기</TextButton></Cell>
            <Cell label={`Text + Icon · 아이콘 ${{ s: 12, m: 16, l: 16, xl: 20 }[size]}px · 간격 ${size === 's' ? '0' : '2'}px`}>
              <TextButton size={size} contents="text-icon" iconName="chevron_right">전체보기</TextButton>
            </Cell>
            <Cell label="Icon + Text"><TextButton size={size} contents="icon-text" iconName="plus">전체보기</TextButton></Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/**
 * Loading 은 라벨을 스피너로 **대체**합니다 (Button 은 라벨을 유지한 채 덧붙임).
 * 2026-09-14 Figma 실측 크기: S 18 · M 22 · **L 24** · XL 24px —
 * L 이 XL 과 같아서 Button 의 매핑(L=22)과 다릅니다.
 */
export const Loading: Story = {
  args: { children: '전체보기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Cell key={size} label={`${size.toUpperCase()} · ${{ s: 18, m: 22, l: 24, xl: 24 }[size]}px`}>
          <TextButton size={size} loading>전체보기</TextButton>
        </Cell>
      ))}
    </Row>
  ),
};
