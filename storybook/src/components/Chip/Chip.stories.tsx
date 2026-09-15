import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Chip, FilterChip, type ChipContents, type ChipSize, type ChipType, type FilterContents } from './Chip';
import { namesOf } from '../Icon/registry';
import { Cell, Row, Section, INTERACTION_STATES } from '../../shared/story-helpers';

const OUTLINED_ICONS = namesOf('outlined');

const SAMPLE_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#2C7BE2"/><circle cx="32" cy="25" r="11" fill="#fff"/><path d="M10 64c0-12.2 9.8-22 22-22s22 9.8 22 22z" fill="#fff"/></svg>`,
  );

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '태그·카테고리·필터 선택에 쓰는 칩입니다. **190개 인스턴스** (Selection 150 + Filter 40).',
          '',
          '## ⚠️ Chip 은 서로 다른 두 컴포넌트입니다',
          '',
          'Figma 에서 **별개의 Component Set 2개**로 나뉘어 있고, 축·모양·용도·코드가 전부 다릅니다.',
          '이 페이지의 스토리도 이름 앞에 `Selection ·` / `Filter ·` 를 붙여 **두 묶음으로 나눠** 두었습니다.',
          '',
          '| | **Chip / Selection** | **Chip / Filter** |',
          '|---|---|---|',
          '| 코드 | `<Chip />` | `<FilterChip />` |',
          '| Figma Component Set | `2270:842` (150개) | `2275:3087` (40개) |',
          '| 용도 | 범용 태그·카테고리 선택 | **드롭다운 필터 트리거 전용** |',
          '| Size 축 | S / M / L | **없음** (단일 크기) |',
          '| radius | 6 / 10 / 12px | **999px 고정** (항상 완전한 필) |',
          '| 아이콘 | `plus` — **교체 가능한 슬롯** | `chevron_down` — **고정, 교체 불가** |',
          '| Contents | Text · Avatar+Text · Avatar+Text+Icon · Icon+Text · Text+Icon | Avatar+Icon · Icon · Avatar+Text+Icon · Text+Icon |',
          '| 왼쪽 패딩 | Size별 8/12/12px, 아바타·아이콘 쪽이 비대칭으로 축소 | 기본 12px, **아바타가 붙으면 6px** |',
          '',
          '> **색·State 규칙(Default / Hover / Pressed / Disabled / Selected)은 둘이 완전히 같습니다.**',
          '> 아래 "Selected에서…" 부터의 설명은 두 유형 공통입니다.',
          '',
          'Button·Badge의 Loading 대신 **Selected** 상태가 있는 것이 특징입니다.',
          '',
          '## Selected에서 Outlined와 Filled가 완전히 다릅니다',
          '',
          '| | Outlined | Filled |',
          '|---|---|---|',
          '| Default | 흰 배경 + 10% 테두리 | `gray-900-5%` 배경 |',
          '| **Selected** | **옅은 파란 배경 + 파란 테두리 60%** | **진한 남색 단색 `neutral/800`** |',
          '',
          'Button의 Primary/Secondary처럼 하나의 브랜드 컬러로 통일하지 않고,',
          'Type마다 서로 다른 강조 방식을 택했습니다.',
          '',
          '## Selection 의 Size 규칙 (Filter 에는 Size 축이 없습니다)',
          '',
          '| Size | 패딩 (세로/가로) | radius | 타이포 |',
          '|---|---|---|---|',
          '| S | 3 / **8** | 6px | Caption1 12/18 |',
          '| M | 6 / **12** | 10px | Body2 14/22 |',
          '| L | 8 / **12** (M과 동일) | 12px | Body1 16/24 |',
          '',
          '**Weight는 3개 Size 전부 Medium 고정**입니다 (Button·Badge처럼 사이즈별로 바뀌지 않습니다).',
          '아바타·아이콘이 붙는 쪽의 패딩이 **비대칭으로 줄어듭니다** (12px → 8px).',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '',
          '**1. Filled의 Hover가 Default와 값이 같습니다.** 둘 다 `rgba(3,9,26,0.05)`라 실측상',
          '시각적 피드백이 전혀 없습니다. Checkbox Angular 미선택과 비슷한 패턴인데 의도인지 불명확합니다.',
          '',
          '**2. 오버레이 토큰 계열이 다릅니다.** Button·Checkbox가 쓰는 `interaction/light-gray` 패밀리가 아니라',
          '`gray-900-2%` / `gray-900-5%` raw 알파를 직접 참조합니다. 토큰 자체는 정의된 값이지만 경로가 다릅니다.',
          '',
          '**3.** Filter의 Selected에서 **아이콘 SVG 애셋 자체가 교체**됩니다 (색이 구워진 별도 파일로 추정).',
          '',
          '> Chip의 Disabled(`opacity/40`)는 Button 문서에서 "사용처 미확인"으로 남아 있던 그 토큰의 실제 사용처입니다.',
          '',
          '스펙 원본: [`components/chip/chip.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/chip/chip.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    type: { control: 'inline-radio', options: ['outlined', 'filled'] },
    contents: {
      control: 'select',
      options: ['text', 'avatar-text', 'avatar-text-icon', 'icon-text', 'text-icon'],
      description: 'Figma Contents 축. 아래 세 속성 중 지정한 것이 이 값을 덮어씁니다',
    },
    showAvatar: { control: 'boolean', description: '왼쪽 아바타 표시 여부' },
    showIcon: { control: 'boolean', description: '아이콘 표시 여부' },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: '⚠️ 아바타가 켜져 있으면 Figma 에 왼쪽 아이콘 변형이 없어 **항상 오른쪽**이 됩니다',
    },
    iconName: { control: 'select', options: OUTLINED_ICONS },
    avatarSrc: { table: { disable: true } },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
    'aria-label': { control: 'text', table: { category: '접근성' } },
    forceState: {
      control: 'inline-radio',
      options: [undefined, 'hover', 'pressed'],
      table: { category: '문서 표시용' },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  /** Selection = `<Chip />` · Filter = `<FilterChip />` */
  kind: 'selection' | 'filter';
  children: string;
  type: ChipType;
  size: ChipSize;
  showAvatar: boolean;
  showIcon: boolean;
  iconPosition: 'left' | 'right';
  showText: boolean;
  iconName: string;
  selected: boolean;
  disabled: boolean;
  forceState?: 'hover' | 'pressed';
  'aria-label'?: string;
};

/**
 * **Selection 과 Filter 를 여기서 모두 조작할 수 있습니다.**
 * 맨 위 `유형` 을 바꾸면 컴포넌트가 `<Chip />` ↔ `<FilterChip />` 로 교체되고,
 * 그 유형에 없는 축(Filter 의 Size·아이콘)은 컨트롤 목록에서 자동으로 사라집니다.
 */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    kind: 'selection',
    children: '전기스쿠터',
    type: 'outlined',
    size: 'm',
    showAvatar: false,
    showIcon: false,
    iconPosition: 'right',
    showText: true,
    iconName: 'plus',
    selected: false,
    disabled: false,
  },
  argTypes: {
    kind: {
      name: '유형',
      control: 'inline-radio',
      options: ['selection', 'filter'],
      description: '**Selection = `<Chip />` · Filter = `<FilterChip />`** — 고른 유형에 맞게 아래 컨트롤이 바뀝니다',
    },
    size: {
      control: 'inline-radio',
      options: ['s', 'm', 'l'],
      if: { arg: 'kind', eq: 'selection' },
      description: '**Selection 전용** — Filter 에는 Size 축이 없습니다',
    },
    showAvatar: {
      name: '아바타',
      control: 'boolean',
      description: '왼쪽에 아바타를 넣습니다. 붙는 쪽 패딩이 줄어듭니다 (S 4 · M 8 · L 6px)',
    },
    showIcon: {
      name: '아이콘',
      control: 'boolean',
      if: { arg: 'kind', eq: 'selection' },
      description: '**Selection 전용** — Filter 의 `chevron_down` 은 끌 수 없습니다',
    },
    iconPosition: {
      name: '아이콘 위치',
      control: 'inline-radio',
      options: ['left', 'right'],
      if: { arg: 'kind', eq: 'selection' },
      description: '⚠️ 아바타를 켜면 Figma 에 왼쪽 아이콘 변형이 없어 **항상 오른쪽**이 됩니다',
    },
    showText: {
      name: '라벨',
      control: 'boolean',
      if: { arg: 'kind', eq: 'filter' },
      description: '**Filter 전용** — 끄면 아바타/아이콘만 남습니다',
    },
    iconName: {
      control: 'select',
      options: OUTLINED_ICONS,
      if: { arg: 'kind', eq: 'selection' },
      description: '**Selection 전용** — Filter 는 `chevron_down` 고정이라 교체할 수 없습니다',
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const shared = {
      type: args.type,
      selected: args.selected,
      disabled: args.disabled,
      forceState: args.forceState,
      avatarSrc: SAMPLE_AVATAR,
      'aria-label': args['aria-label'],
      onClick: () => updateArgs({ selected: !args.selected }),
    };
    return args.kind === 'filter' ? (
      <FilterChip {...shared} showAvatar={args.showAvatar} showText={args.showText}>
        {args.children}
      </FilterChip>
    ) : (
      <Chip
        {...shared}
        size={args.size}
        showAvatar={args.showAvatar}
        showIcon={args.showIcon}
        iconPosition={args.iconPosition}
        iconName={args.iconName}
      >
        {args.children}
      </Chip>
    );
  },
};

/** Selection — Type × State입니다. Filled Hover가 Default와 같다는 점에 유의하세요. */
export const SelectionStates: Story = {
  name: 'Selection · Type × State',
  args: { children: '전기스쿠터' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['outlined', 'filled'] as const).map((type) => (
        <Section key={type} title={`Type = ${type}`}>
          <Row>
            {INTERACTION_STATES.map((st) => (
              <Cell key={st.key} label={st.label + (type === 'filled' && st.key === 'hover' ? ' ⚠️ Default와 동일' : '')}>
                <Chip type={type} disabled={st.disabled} forceState={st.forceState}>
                  전기스쿠터
                </Chip>
              </Cell>
            ))}
            <Cell label={`Selected · ${type === 'outlined' ? '파란 배경+테두리' : '진한 남색 단색'}`}>
              <Chip type={type} selected>
                전기스쿠터
              </Chip>
            </Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** Selection — Size 3종입니다. M과 L의 좌우 패딩이 같습니다. */
export const SelectionSizes: Story = {
  name: 'Selection · Size',
  args: { children: '전기스쿠터' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {([
        ['s', '3/8 · radius 6 · Caption1'],
        ['m', '6/12 · radius 10 · Body2'],
        ['l', '8/12 · radius 12 · Body1'],
      ] as const).map(([size, desc]) => (
        <Cell key={size} label={`${size.toUpperCase()} · ${desc}`}>
          <Chip size={size}>전기스쿠터</Chip>
        </Cell>
      ))}
    </Row>
  ),
};

/** Selection — Contents 5종입니다. 아이콘·아바타 쪽 패딩이 비대칭으로 줄어듭니다. */
export const SelectionContents: Story = {
  name: 'Selection · Contents',
  args: { children: '전기스쿠터' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {([
        ['text', 'Text'],
        ['avatar-text', 'Avatar + Text'],
        ['avatar-text-icon', 'Avatar + Text + Icon'],
        ['icon-text', 'Icon + Text'],
        ['text-icon', 'Text + Icon'],
      ] as const).map(([contents, label]) => (
        <Cell key={contents} label={label}>
          <Chip contents={contents} avatarSrc={SAMPLE_AVATAR}>
            전기스쿠터
          </Chip>
        </Cell>
      ))}
    </Row>
  ),
};

/** 실제로 클릭해서 선택해 보세요. (`<Chip />` — 다중 선택) */
export const 실제동작: Story = {
  name: 'Selection · 실제 동작',
  args: { children: '전기스쿠터' },
  parameters: { controls: { disable: true } },
  render: function Render() {
    // ⚠️ useArgs 로 args 에 없는 키를 쓰면 Docs 페이지에서 값이 저장되지 않아 클릭해도 반응하지 않습니다.
    //    컴포넌트 prop 이 아닌 선택 상태는 useState 로 둡니다.
    const [picked, setPicked] = useState<string[]>(['전기스쿠터']);
    const toggle = (t: string) =>
      setPicked((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    return (
      <Row>
        {['전기스쿠터', '전기자전거', '배달용', '중고'].map((t) => (
          <Chip key={t} selected={picked.includes(t)} onClick={() => toggle(t)}>
            {t}
          </Chip>
        ))}
      </Row>
    );
  },
};

/** Filter — Size 축이 없고 아이콘이 `chevron_down` 으로 고정입니다. */
export const Filter: Story = {
  name: 'Filter · 전체',
  args: { children: '전기스쿠터' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Contents 4종 (Size 축 없음 · radius 999px)">
        <Row>
          {([
            ['text-icon', 'Text + Icon'],
            ['icon', 'Icon 만'],
            ['avatar-icon', 'Avatar + Icon'],
            ['avatar-text-icon', 'Avatar + Text + Icon'],
          ] as const).map(([contents, label]) => (
            <Cell key={contents} label={label}>
              <FilterChip contents={contents} avatarSrc={SAMPLE_AVATAR}>
                브랜드
              </FilterChip>
            </Cell>
          ))}
        </Row>
      </Section>
      {(['outlined', 'filled'] as const).map((type) => (
        <Section key={type} title={`Type = ${type} · State`}>
          <Row>
            {INTERACTION_STATES.map((st) => (
              <Cell key={st.key} label={st.label}>
                <FilterChip type={type} disabled={st.disabled} forceState={st.forceState}>
                  브랜드
                </FilterChip>
              </Cell>
            ))}
            <Cell label="Selected">
              <FilterChip type={type} selected>
                브랜드
              </FilterChip>
            </Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};
