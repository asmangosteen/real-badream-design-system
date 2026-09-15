import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton, ICON_BUTTON_SPEC, DEFAULT_ICON_COLOR, type IconButtonSize, type IconButtonType } from './IconButton';
import { Cell, Row, Section } from '../../shared/story-helpers';
import { namesOf } from '../Icon/registry';

const OUTLINED_ICONS = namesOf('outlined');


const SIZES: IconButtonSize[] = ['s', 'm', 'l'];
const TYPES: IconButtonType[] = ['ghost', 'tertiary', 'primary', 'secondary', 'destructed', 'destructed-subtle'];

const meta = {
  title: 'Components/Button/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '라벨 없이 아이콘 하나로 액션을 제공하는 정사각형 버튼입니다. **Size(3) × Type(6) × State(4) ≈ 108개 변형.**',
          '',
          '고정 크기 프레임이 아니라 **패딩 × 2 + 아이콘**으로 정사각형이 만들어집니다.',
          '',
          '| Size | 패딩 | 아이콘 | 외곽 정사각형 | radius |',
          '|---|---|---|---|---|',
          '| S | 6px | 16px | **28px** | **8px** |',
          '| M | 8px | 20px | **36px** | 12px |',
          '| L | 8px | 24px | **40px** | 12px |',
          '',
          '**S만 radius가 8px**이고 M/L은 12px로 점프합니다.',
          '',
          '## Button에는 없는 고유 타입 2가지',
          '- **Ghost** — 배경이 전혀 없는(투명) 아이콘 버튼. 헤더·툴바용입니다.',
          '- **Destructed-Subtle** — 파괴적 액션의 저강조 버전. 연한 빨강 배경(`#FFEDEB`)에 빨강 아이콘.',
          '',
          '## ⚠️ Button과 다른 점 2가지',
          '',
          '**1. On(Light/Dark) 축이 없습니다.** *(2026-09-14 Figma 재실측으로 정정)*',
          '어두운 배경용 변형은 별도 축이 아니라 **`Icon Color=White`** 로 표현됩니다.',
          'Icon Color는 Tertiary를 빼면 Type이 결정합니다 — Ghost=Black · Primary/Destructed=White · Secondary=Blue · Destructed-Subtle=Red.',
          '**Tertiary만** Black(밝은 배경) / White(어두운 배경) 중에 고를 수 있습니다.',
          '',
          '**2. Stroke 처리가 다릅니다.**',
          'Button은 Stroke=True일 때 배경이 **흰색으로 바뀌지만**, Icon Button은',
          '`neutral/100` 회색 배경을 **그대로 유지**하고 그 위에 보더만 추가합니다.',
          '',
          '## 실제로 존재하는 조합은 9개뿐입니다',
          '*(2026-09-14 Figma 메타데이터 전수 확인 — 9 조합 × 3 Size × 4 State = 108)*',
          '',
          '| Type | Icon Color | Stroke | Bold Stroke |',
          '|---|---|---|---|',
          '| Ghost | Black | – | – |',
          '| Primary | White | – | – |',
          '| Secondary | Blue | – | – |',
          '| Destructed | White | – | – |',
          '| Destructed-Subtle | Red | – | – |',
          '| Tertiary | Black | False / True | False / True |',
          '| Tertiary | White | False | False |',
          '',
          'Primary·Secondary·Destructed·Ghost에는 **Stroke 변형이 없습니다.**',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- **Black 아이콘 색이 `neutral/800`(#202837)인지 미검증**입니다. 아이콘이 SVG에 색이 구워진 형태라 직접 읽을 수 없어, 변수맵에 있는 값으로 추정했습니다.',
          '  (2026-09-14 재실측에서도 Tertiary White 노드의 변수맵은 `neutral/600`·`common/white-default`만 반환해 Black은 여전히 미확정입니다.)',
          '- Tertiary/Ghost/Destructed-Subtle의 오버레이 **값은 확정**됐지만, 각 값이 hover/pressed 중 어디에 바인딩되는지는 개별 노드로 재검증하지 않았습니다.',
          '- S(28)·M(36)·L(40) 모두 권장 터치 영역 44px보다 작습니다.',
          '- 포커스 링은 Figma에 정의가 없어 구현에서 추가했습니다.',
          '',
          '스펙 원본: [`components/button/icon-button/icon-button.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/button/icon-button/icon-button.md)',
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
    type: { control: 'select', options: TYPES },
    iconColor: { control: 'inline-radio', options: [undefined, 'black', 'white', 'blue', 'red'], description: 'Tertiary 외에는 Type이 색을 결정합니다' },
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
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { iconName: 'close', size: 'm', type: 'ghost', 'aria-label': '닫기', stroke: false, boldStroke: false, disabled: false },
};

/** 3개 Size입니다. S만 radius가 8px입니다. */
export const Sizes: Story = {
  args: { iconName: 'close', 'aria-label': '닫기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Cell key={size} label={`${size.toUpperCase()} · ${ICON_BUTTON_SPEC[size].box}px · radius ${size === 's' ? 8 : 12}`}>
          <IconButton iconName="close" size={size} type="tertiary" aria-label={`닫기 ${size}`} />
        </Cell>
      ))}
    </Row>
  ),
};

/** 6개 Type × 4개 State 전체입니다. */
export const AllVariants: Story = {
  args: { iconName: 'close', 'aria-label': '닫기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {TYPES.map((type) => (
        <Section key={type} title={`Type = ${type}`}>
          <Row>
            <Cell label="Default"><IconButton iconName="menu_kebab" type={type} aria-label={`${type} default`} /></Cell>
            <Cell label="Hover"><IconButton iconName="menu_kebab" type={type} forceState="hover" aria-label={`${type} hover`} /></Cell>
            <Cell label="Pressed"><IconButton iconName="menu_kebab" type={type} forceState="pressed" aria-label={`${type} pressed`} /></Cell>
            <Cell label="Disabled · opacity 20%"><IconButton iconName="menu_kebab" type={type} disabled aria-label={`${type} disabled`} /></Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** Tertiary 전용 Stroke 옵션입니다. 배경이 흰색으로 바뀌지 않는 점이 Button과 다릅니다. */
export const Stroke: Story = {
  args: { iconName: 'close', 'aria-label': '닫기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="Stroke=False"><IconButton iconName="filter" type="tertiary" aria-label="필터" /></Cell>
      <Cell label="Stroke=True · gray-900 10%"><IconButton iconName="filter" type="tertiary" stroke aria-label="필터 stroke" /></Cell>
      <Cell label="Bold Stroke=True · neutral/400"><IconButton iconName="filter" type="tertiary" stroke boldStroke aria-label="필터 bold" /></Cell>
    </Row>
  ),
};

/**
 * Tertiary + **Icon Color=White** 는 어두운 배경용입니다.
 * Figma에 `On` 축은 없고, 이 조합 자체가 어두운 배경 변형입니다.
 */
export const TertiaryWhite: Story = {
  name: 'Tertiary · Icon Color = White',
  args: { iconName: 'close', 'aria-label': '닫기' },
  parameters: { controls: { disable: true }, backgrounds: { value: 'dark' } },
  render: () => (
    <div style={{ padding: 24, background: 'var(--sys-color-neutral-800)', borderRadius: 12, width: 'fit-content' }}>
      <Row>
        <Cell label="Default"><IconButton iconName="close" type="tertiary" iconColor="white" aria-label="닫기" /></Cell>
        <Cell label="Hover"><IconButton iconName="close" type="tertiary" iconColor="white" forceState="hover" aria-label="닫기 hover" /></Cell>
        <Cell label="Pressed"><IconButton iconName="close" type="tertiary" iconColor="white" forceState="pressed" aria-label="닫기 pressed" /></Cell>
        <Cell label="Disabled"><IconButton iconName="close" type="tertiary" iconColor="white" disabled aria-label="닫기 disabled" /></Cell>
      </Row>
    </div>
  ),
};

/** Type 이 정하는 기본 아이콘 색입니다. Tertiary 만 예외적으로 선택할 수 있습니다. */
export const IconColors: Story = {
  name: 'Type → Icon Color 대응',
  args: { iconName: 'close', 'aria-label': '닫기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {TYPES.map((type) => (
        <Cell key={type} label={`${type} → ${DEFAULT_ICON_COLOR[type]}`}>
          <IconButton iconName="heart" type={type} aria-label={type} />
        </Cell>
      ))}
    </Row>
  ),
};
