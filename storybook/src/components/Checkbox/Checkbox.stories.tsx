import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Checkbox } from './Checkbox';
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
          '| 스타일 | radius | 아이콘 크기 | 고유 축 |',
          '|---|---|---|---|',
          '| **Angular** 사각형 | 4px | 16px (박스를 꽉 채움) | `Indeterminate` (부분선택) |',
          '| **Rounded** 원형 | 999px | 12px (원 안 중앙) | `Outlined` (미선택 테두리 유무) |',
          '',
          '**Size 축이 없습니다** — 둘 다 16×16px 고정입니다.',
          '',
          '**꼭 알아야 할 차이점**',
          '- **Angular 미선택은 Hover/Pressed에 색 변화가 전혀 없습니다** (실측 확인된 사실).',
          '- Disabled는 Button의 opacity 방식이 아닙니다. 미선택은 **테두리 알파만 10%→5%**, 선택됨은 **배경을 `neutral/400` 단색으로 교체**합니다.',
          '- Rounded의 `Outlined=False` 미선택은 **Disabled일 때 배경이 전혀 변하지 않습니다** (의도적인지는 확인 필요).',
          '',
          '**⚠️ Figma에 없어 구현에서 추가한 것 (디자이너 확인 필요)**',
          '- 포커스 링 — Figma에 Focused 상태 정의가 없습니다.',
          '- 상태 전환 애니메이션 없음 — Figma에 모션 데이터가 없어 임의로 만들지 않았습니다.',
          '',
          '스펙 원본: [`components/checkbox/checkbox.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/checkbox/checkbox.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['angular', 'rounded'] },
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
  args: { type: 'angular', checked: false, indeterminate: false, outlined: true, disabled: false, 'aria-label': '동의합니다' },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />;
  },
};

/**
 * Figma 두 Component Set의 **24개 변형 전체**입니다.
 * Hover/Pressed 칸은 실제 마우스를 올리지 않아도 보이도록 강제 표시한 것입니다.
 */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Checkbox / Angular — 12개">
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

      <Section title="Checkbox / Rounded — 12개">
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
    return (
      <Row>
        <Cell label="Angular">
          <Checkbox type="angular" checked={a} onChange={(next) => setA(next)} aria-label="Angular" />
        </Cell>
        <Cell label="Angular · 부분선택">
          <Checkbox type="angular" checked indeterminate aria-label="부분선택" />
        </Cell>
        <Cell label="Rounded · Outlined">
          <Checkbox type="rounded" outlined checked={b} onChange={(next) => setB(next)} aria-label="Rounded outlined" />
        </Cell>
        <Cell label="Rounded · Filled">
          <Checkbox type="rounded" outlined={false} checked={c} onChange={(next) => setC(next)} aria-label="Rounded filled" />
        </Cell>
      </Row>
    );
  },
};
