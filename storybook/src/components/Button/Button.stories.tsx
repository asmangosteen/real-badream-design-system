import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonSize, type ButtonType } from './Button';
import { Cell, Row, Section } from '../../shared/story-helpers';
import { namesOf } from '../Icon/registry';

const OUTLINED_ICONS = namesOf('outlined');


const SIZES: ButtonSize[] = ['s', 'm', 'l', 'xl', '2xl'];
const TYPES: ButtonType[] = ['primary', 'secondary', 'tertiary', 'destructed'];

const meta = {
  title: 'Components/Button/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '주요 액션을 유도하는 CTA 버튼입니다. **8개 변형 축으로 935개 인스턴스**를 구성하는, 이 디자인 시스템에서 가장 큰 컴포넌트입니다.',
          '',
          '## 935개가 어떻게 구성되나 *(2026-09-14 Figma 메타데이터 전수 확인)*',
          '',
          '`11개 스타일 조합 × 5 Size × 17개 State·Contents = 935`',
          '',
          '8개 축을 모두 곱하면 수천 가지가 되지만, **실제로 존재하는 스타일 조합은 11개뿐**입니다.',
          '',
          '| Type | Text Color | Stroke | Bold Stroke | On |',
          '|---|---|---|---|---|',
          '| Primary | White | False | False | Light |',
          '| Secondary | Blue | False | False | Light |',
          '| Tertiary | Blue | False / True | False / True | Light |',
          '| Tertiary | Gray | False / True | False / True | Light |',
          '| Tertiary | White | False | False | **Dark** |',
          '| Destructed | White | False | False | Light |',
          '| Destructed | **Blue**(이름만) | True | False | Light |',
          '',
          '- **Primary·Secondary에는 Stroke 변형이 없습니다.**',
          '- **Bold Stroke는 Tertiary에만 있습니다.**',
          '- **On=Dark는 Tertiary + White 조합에만 있습니다.**',
          '- 17 = (Default·Hover·Pressed·Disabled 4종 × Contents 4종) + (Loading × Text 1종)',
          '',
          '**Size별 스펙**',
          '',
          '| Size | 패딩 (Y/X) | radius | 타이포 | Weight | 인라인 아이콘 | Icon-only 정사각 |',
          '|---|---|---|---|---|---|---|',
          '| S | 4 / 8 | 8px | caption1 12/18 | **600** | 12px | 26px (아이콘 12) |',
          '| M | 4 / 8 | 10px | body2 14/22 | 500 | 16px | 30px (아이콘 16) |',
          '| L | 8 / 12 | 10px | body2 14/22 | 500 | 16px | 38px (아이콘 **20**) |',
          '| XL | 12 / 16 | 12px | body1 16/24 | 500 | 16px | 48px (아이콘 **20**) |',
          '| 2XL | 16 전방향 | 12px | subtitle 18/24 | 500 | 20px | 56px (아이콘 24) |',
          '',
          '**S 사이즈만 Semibold(600)** 이고 나머지는 전부 Medium(500)입니다.',
          '',
          '**Icon-only 정사각형은 임의의 고정값이 아닙니다** *(2026-09-14 재실측으로 확인)* —',
          '그 Size 버튼의 **자연스러운 높이와 정확히 같습니다** (S 26 · M 30 · L 38 · XL 48 · 2XL 56px).',
          '즉 `패딩×2 + 줄높이` 로 계산되는 값이며, 저장소 문서의 "패딩 공식 역산 불가" 설명은 정확하지 않습니다.',
          '',
          '**Loading 스피너 크기** *(2026-09-14 실측)* — S 18 · M 22 · L 22 · XL **24** · 2XL 24px.',
          '(L 의 22px 은 스피너 M/L 두 변형이 같은 크기라 어느 쪽인지 특정되지 않지만 시각적으로 동일합니다.)',
          '',
          '**State 처리 방식**',
          '- Hover/Pressed는 배경 위에 `interaction/*` 반투명 오버레이를 **합성**합니다 (색을 교체하는 게 아닙니다).',
          '  채움 계열(Primary/Destructed/On=Dark)은 어두운 오버레이 15%→30%, 연한 계열(Secondary/Tertiary-light)은 8%→15% / 5%→10%.',
          '- **⚠️ Stroke=True는 예외입니다** *(2026-09-14 정정)* — 배경이 흰색으로 바뀌므로 Type과 무관하게',
          '  `interaction/light-gray`(5%→10%)를 씁니다. Destructed+Stroke도 빨강이 아니라 회색 오버레이입니다.',
          '  (Figma 실측 `410:3573`/`410:3579` = `color/interaction/light-gray/*`)',
          '- **Disabled는 전체 opacity 20%** 입니다. Checkbox(테두리 알파)·Radio 미선택(opacity 40%)과 전부 다릅니다.',
          '- **Loading은 Contents=Text와만 조합됩니다** — 아이콘이 있는 조합에는 Loading 변형이 존재하지 않습니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '',
          '1. **Icon-only의 L/XL 아이콘이 20px** 입니다 — 같은 Size의 Text+Icon 조합(16px)보다 큽니다.',
          '   실측으로 확인된 사실이지만 의도인지 오타인지는 판단할 수 없습니다.',
          '2. **Figma 변형 이름과 실제 렌더링이 다릅니다** — `Text Color=Blue`로 이름 붙은 Destructed+Stroke 변형이',
          '   실제로는 **빨간색** 라벨로 그려집니다. 2026-09-14 재확인: 해당 노드(`410:3561`)의 바인딩 변수가',
          '   `theme/destructed-default #e72f37` · `common/white-default` · `color/gray/900-10` 으로,',
          '   **빨간 라벨 + 흰 배경 + 10% 테두리** 임이 확정됐습니다. 원본 파일의 변형 이름 정정이 필요합니다.',
          '3. **스피너 회전 주기·이징**은 Figma에 정의가 없어 구현값입니다(`900ms linear`).',
          '   ~~모션 데이터가 전혀 없습니다~~ → **2026-09-16 정정.** Hover/Pressed 전환은 Figma에 **반응 440건**으로',
          '   정의되어 있습니다(Hover 150ms · Pressed 50ms · Smart animate · Slow). 구현에도 적용돼 있습니다 —',
          '   근거는 [`docs/INTERACTION.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/docs/INTERACTION.md).',
          '4. **포커스 링**은 Figma에 정의가 없어 구현에서 추가했습니다.',
          '5. Icon-only의 S(26)·M(30)·L(38)은 권장 터치 영역 44px보다 작습니다 — 히트 영역 확장 필요 여부 확인 필요.',
          '',
          '스펙 원본: [`components/button/button/button.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/button/button/button.md)',
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
    type: { control: 'inline-radio', options: TYPES },
    textColor: { control: 'inline-radio', options: [undefined, 'white', 'blue', 'gray'], description: 'Tertiary 전용' },
    contents: { control: 'inline-radio', options: ['text', 'icon', 'text-icon', 'icon-text'] },
    on: { control: 'inline-radio', options: ['light', 'dark'] },
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: '신청하기',
    size: 'l',
    type: 'primary',
    contents: 'text',
    stroke: false,
    boldStroke: false,
    loading: false,
    disabled: false,
    on: 'light',
  },
};

/** 5개 Size입니다. S만 Semibold라는 점에 유의하세요. */
export const Sizes: Story = {
  args: { children: '신청하기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Cell key={size} label={size.toUpperCase()}>
          <Button size={size}>신청하기</Button>
        </Cell>
      ))}
    </Row>
  ),
};

/** 4개 Type입니다. 색이 액션의 중요도를 나타냅니다. */
export const Types: Story = {
  args: { children: '신청하기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {TYPES.map((type) => (
        <Cell key={type} label={type}>
          <Button type={type}>신청하기</Button>
        </Cell>
      ))}
    </Row>
  ),
};

/**
 * Type × State 전체입니다. Hover/Pressed 칸은 강제 표시한 것이고,
 * 실제로 마우스를 올려도 똑같이 동작합니다.
 */
export const States: Story = {
  args: { children: '신청하기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {TYPES.map((type) => (
        <Section key={type} title={`Type = ${type}`}>
          <Row>
            <Cell label="Default"><Button type={type}>신청하기</Button></Cell>
            <Cell label="Hover"><Button type={type} forceState="hover">신청하기</Button></Cell>
            <Cell label="Pressed"><Button type={type} forceState="pressed">신청하기</Button></Cell>
            <Cell label="Disabled · opacity 20%"><Button type={type} disabled>신청하기</Button></Cell>
            <Cell label="Loading"><Button type={type} loading>신청하기</Button></Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** 라벨과 아이콘의 조합 4가지입니다. Icon-only는 패딩 공식이 아닌 고정 정사각형입니다. */
export const Contents: Story = {
  args: { children: '신청하기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {SIZES.map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()}`}>
          <Row>
            <Cell label="Text"><Button size={size}>신청하기</Button></Cell>
            <Cell label="Text + Icon"><Button size={size} contents="text-icon">신청하기</Button></Cell>
            <Cell label="Icon + Text"><Button size={size} contents="icon-text" iconName="arrow_left">신청하기</Button></Cell>
            <Cell label={`Icon only · 아이콘 ${{ s: 12, m: 16, l: 20, xl: 20, '2xl': 24 }[size]}px`}>
              <Button size={size} contents="icon" iconName="plus" aria-label="추가" />
            </Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** Stroke 변형입니다. 배경이 흰색이 되고 1px 보더가 생깁니다. */
export const Stroke: Story = {
  args: { children: '신청하기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Tertiary — Stroke / Bold Stroke">
        <Row>
          <Cell label="Stroke=False"><Button type="tertiary">신청하기</Button></Cell>
          <Cell label="Stroke=True · gray-900 10%"><Button type="tertiary" stroke>신청하기</Button></Cell>
          <Cell label="Bold Stroke=True · neutral/400"><Button type="tertiary" stroke boldStroke>신청하기</Button></Cell>
          <Cell label="Stroke + Blue 라벨"><Button type="tertiary" stroke textColor="blue">신청하기</Button></Cell>
        </Row>
      </Section>
      <Section title="⚠️ Destructed + Stroke — Figma 이름은 'Blue'지만 실제로는 빨간 라벨입니다">
        <Row>
          <Cell label="Destructed 기본"><Button type="destructed">삭제하기</Button></Cell>
          <Cell label='Stroke=True ("Text Color=Blue"로 명명됨)'><Button type="destructed" stroke>삭제하기</Button></Cell>
        </Row>
      </Section>
      <Section title="Stroke=True 의 Hover/Pressed — 빨강이 아니라 회색 오버레이입니다 (2026-09-14 정정)">
        <Row>
          <Cell label="Destructed+Stroke · Default"><Button type="destructed" stroke>삭제하기</Button></Cell>
          <Cell label="Hover · light-gray 5%"><Button type="destructed" stroke forceState="hover">삭제하기</Button></Cell>
          <Cell label="Pressed · light-gray 10%"><Button type="destructed" stroke forceState="pressed">삭제하기</Button></Cell>
          <Cell label="비교) Stroke 없는 Destructed Hover · red 15%"><Button type="destructed" forceState="hover">삭제하기</Button></Cell>
        </Row>
      </Section>
    </div>
  ),
};

/** Tertiary + White 라벨은 어두운 배경 위에서만 쓰입니다. */
export const OnDark: Story = {
  name: 'On = Dark',
  args: { children: '신청하기' },
  parameters: { controls: { disable: true }, backgrounds: { value: 'dark' } },
  render: () => (
    <div style={{ padding: 24, background: 'var(--sys-color-neutral-800)', borderRadius: 12, width: 'fit-content' }}>
      <Row>
        <Cell label="Default"><Button type="tertiary" on="dark" textColor="white">신청하기</Button></Cell>
        <Cell label="Hover · interaction/gray 15%"><Button type="tertiary" on="dark" textColor="white" forceState="hover">신청하기</Button></Cell>
        <Cell label="Pressed · 30%"><Button type="tertiary" on="dark" textColor="white" forceState="pressed">신청하기</Button></Cell>
        <Cell label="Disabled"><Button type="tertiary" on="dark" textColor="white" disabled>신청하기</Button></Cell>
      </Row>
    </div>
  ),
};

/** Loading은 라벨을 유지한 채 뒤에 2px 간격으로 스피너를 붙입니다. */
export const Loading: Story = {
  args: { children: '신청하기' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Cell key={size} label={size.toUpperCase()}>
          <Button size={size} loading>신청하기</Button>
        </Cell>
      ))}
    </Row>
  ),
};
