import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Checkbox, CHECKBOX_SIZES } from './Checkbox';
import { Cell, Row, Section, INTERACTION_STATES } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '다중 선택·동의·전체선택에 쓰는 체크 입력입니다. Figma에서는 **2개의 Component Set으로 분리**되어 있습니다.',
          '',
          '| 스타일 | radius | 고유 축 |',
          '|---|---|---|',
          '| **Angular** 사각형 | 16px→`4px` · 20px→`6px` | `Indeterminate` (부분선택) |',
          '| **Rounded** 원형 | `999px` (Size 무관) | `Outlined` (미선택 테두리 유무) |',
          '',
          '## Size 축 — `16px` / `20px`',
          '',
          '**2026-09-16 Figma에 Size 축이 추가되어 변형이 24개 → 48개가 되었습니다.**',
          '두 Size는 **색이 완전히 같고**, 달라지는 것은 박스 한 변·Angular radius·Rounded 아이콘뿐입니다.',
          '',
          '| Size | 박스 | Angular radius | Angular 아이콘 | Rounded 아이콘 |',
          '|---|---|---|---|---|',
          '| `16` | 16×16 | 4px (`radius/02`) | 16px — 박스를 꽉 채움 | 12px |',
          '| `20` | 20×20 | **6px** (`radius/03`) | **16px — 그대로** (사방 2px 여백) | **16px** |',
          '',
          '**두 슬롯이 서로 다른 계단을 탑니다** — Angular 아이콘은 두 Size 모두 16px로 **커지지 않고**,',
          'Rounded 아이콘만 12→16px로 커집니다. 결과적으로 20px에서는 Angular와 Rounded의 체크 글리프가',
          '같은 크기(10.94px)가 되고, 16px에서는 다릅니다(10.94px vs 8.21px). 전수 실측값이며 비율 계산이 아닙니다.',
          '',
          '> ✅ **2026-09-16 디자이너 확인 — 의도된 설계입니다.** 오타나 누락이 아닙니다.',
          '',
          '테두리는 두 Size 모두 `1px`(`strokeAlign: INSIDE`)입니다.',
          '',
          '**꼭 알아야 할 차이점**',
          '- **Rounded는 미선택에도 회색 체크가 보입니다** — `neutral/400`(#c2c4c8), Disabled는 `neutral/300`(#dbdcdf).',
          '  Angular 미선택에는 아이콘 레이어 자체가 없습니다.',
          '- **Hover/Pressed 오버레이가 배경별로 3갈래입니다** (2026-09-18 Figma 갱신):',
          '  - 흰 배경 미선택(Angular 미선택 · Rounded Outlined=True) → `gray/900-2`(2%) · `gray/900-5`(5%)',
          '    — ⚠️ 예전엔 Angular=피드백 없음, Rounded 흰 배경=light-gray(5%/10%)였습니다.',
          '  - 연회색 미선택(Rounded Outlined=False) → `interaction/light-gray`(5%/10%)',
          '  - 파랑 선택(Checked=True) → `interaction/blue`(15%/30%)',
          '- Disabled는 Button의 opacity 방식이 아닙니다. 미선택은 **테두리 알파만 10%→5%**, 선택됨은 **배경을 `neutral/400` 단색으로 교체**합니다.',
          '- Rounded의 `Outlined=False` 미선택은 Disabled일 때 **배경·테두리가 전혀 변하지 않고 체크 색만 옅어집니다** — 그것이 유일한 비활성 신호입니다.',
          '',
          '**⚠️ Figma에 없어 구현에서 추가한 것 (디자이너 확인 필요)**',
          '- 포커스 링 — Figma에 Focused 상태 정의가 없습니다.',
          '',
          '상태 전환은 Figma 프로토타입 반응대로 **Hover 150ms · Pressed 50ms · Slow**입니다(반응 24건).',
          'Checked 축은 전환하지 않고 즉시 바뀝니다 — 근거는 [`docs/INTERACTION.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/docs/INTERACTION.md) 7.3절.',
          '',
          '스펙 원본: [`components/checkbox/checkbox.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/checkbox/checkbox.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['angular', 'rounded'] },
    size: {
      control: 'inline-radio',
      options: CHECKBOX_SIZES,
      description: '박스 한 변의 길이(px). Figma Size 축 `16px` / `20px` 과 1:1 대응합니다.',
    },
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
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'angular', size: 16, checked: false, indeterminate: false, outlined: true, disabled: false, 'aria-label': '동의합니다' },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />;
  },
};

/**
 * Figma 두 Component Set의 **48개 변형 전체**입니다 (각 24개 × 2 Size).
 * Hover/Pressed 칸은 실제 마우스를 올리지 않아도 보이도록 강제 표시한 것입니다.
 */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {CHECKBOX_SIZES.map((size) => (
        <div key={size}>
          <Section title={`Checkbox / Angular · Size=${size}px — 12개`}>
            {[
              { label: 'Checked=False', checked: false, indeterminate: false },
              { label: 'Checked=True · Indeterminate=Off', checked: true, indeterminate: false },
              { label: 'Checked=True · Indeterminate=On', checked: true, indeterminate: true },
            ].map((cfg) => (
              <Row key={cfg.label}>
                {INTERACTION_STATES.map((st) => (
                  <Cell key={st.key} label={`${cfg.label} · ${st.label}`}>
                    <Checkbox
                      type="angular"
                      size={size}
                      checked={cfg.checked}
                      indeterminate={cfg.indeterminate}
                      disabled={st.disabled}
                      forceState={st.forceState}
                      aria-label={`${cfg.label} ${st.label}`}
                    />
                  </Cell>
                ))}
              </Row>
            ))}
          </Section>

          <Section title={`Checkbox / Rounded · Size=${size}px — 12개`}>
            {[
              { label: 'Checked=False · Outlined=True', checked: false, outlined: true },
              { label: 'Checked=False · Outlined=False', checked: false, outlined: false },
              { label: 'Checked=True', checked: true, outlined: false },
            ].map((cfg) => (
              <Row key={cfg.label}>
                {INTERACTION_STATES.map((st) => (
                  <Cell key={st.key} label={`${cfg.label} · ${st.label}`}>
                    <Checkbox
                      type="rounded"
                      size={size}
                      checked={cfg.checked}
                      outlined={cfg.outlined}
                      disabled={st.disabled}
                      forceState={st.forceState}
                      aria-label={`${cfg.label} ${st.label}`}
                    />
                  </Cell>
                ))}
              </Row>
            ))}
          </Section>
        </div>
      ))}
    </div>
  ),
};

/**
 * 두 Size를 나란히 둔 비교입니다. **색은 완전히 같고** 박스·radius·Rounded 아이콘만 달라집니다.
 *
 * Angular의 체크 아이콘은 두 Size 모두 16px이라 20px 박스에서 사방 2px 여백이 생기고,
 * Rounded는 아이콘이 12→16px로 함께 커집니다.
 */
export const Sizes: Story = {
  name: 'Size 비교 (16px / 20px)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {[
        { type: 'angular' as const, title: 'Angular — radius 4px → 6px · 아이콘 16px 고정' },
        { type: 'rounded' as const, title: 'Rounded — radius 999px 고정 · 아이콘 12px → 16px' },
      ].map((cfg) => (
        <Section key={cfg.type} title={cfg.title}>
          <Row>
            {CHECKBOX_SIZES.map((size) => (
              <Cell key={`off-${size}`} label={`${size}px · 미선택`}>
                <Checkbox type={cfg.type} size={size} aria-label={`${cfg.type} ${size} 미선택`} />
              </Cell>
            ))}
            {CHECKBOX_SIZES.map((size) => (
              <Cell key={`on-${size}`} label={`${size}px · 선택`}>
                <Checkbox type={cfg.type} size={size} checked aria-label={`${cfg.type} ${size} 선택`} />
              </Cell>
            ))}
            {cfg.type === 'angular' &&
              CHECKBOX_SIZES.map((size) => (
                <Cell key={`ind-${size}`} label={`${size}px · 부분선택`}>
                  <Checkbox type="angular" size={size} checked indeterminate aria-label={`부분선택 ${size}`} />
                </Cell>
              ))}
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** 실제로 클릭해서 동작을 확인해 보세요. */
export const 실제동작: Story = {
  name: '실제 동작',
  args: {},
  parameters: { controls: { disable: true } },
  render: function Render() {
    // ⚠️ useArgs 로 args 에 없는 키를 쓰면 Docs 페이지에서 값이 저장되지 않아 클릭해도 반응하지 않습니다.
    //    컴포넌트 prop 이 아닌 선택 상태는 useState 로 둡니다.
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const [c, setC] = useState(false);
    const [d, setD] = useState(false);
    return (
      <Row>
        <Cell label="Angular · 16px">
          <Checkbox type="angular" checked={a} onChange={(next) => setA(next)} aria-label="Angular 16" />
        </Cell>
        <Cell label="Angular · 20px">
          <Checkbox type="angular" size={20} checked={d} onChange={(next) => setD(next)} aria-label="Angular 20" />
        </Cell>
        <Cell label="Angular · 부분선택">
          <Checkbox type="angular" checked indeterminate aria-label="부분선택" />
        </Cell>
        <Cell label="Rounded · Outlined">
          <Checkbox type="rounded" outlined checked={b} onChange={(next) => setB(next)} aria-label="Rounded outlined" />
        </Cell>
        <Cell label="Rounded · Filled · 20px">
          <Checkbox type="rounded" size={20} outlined={false} checked={c} onChange={(next) => setC(next)} aria-label="Rounded filled" />
        </Cell>
      </Row>
    );
  },
};
