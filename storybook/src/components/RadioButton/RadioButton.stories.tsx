import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { RadioButton } from './RadioButton';
import { Cell, Row, Section, INTERACTION_STATES } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Radio Button',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '여러 선택지 중 하나만 고르는 단일 선택 입력입니다. **Checked(2) × State(4) × Size(3) = 24개 변형**(전수 실측).',
          '',
          '**핵심 규칙** — 내부 dot은 3개 Size 전부 **컨테이너 지름의 정확히 50%**입니다 (S 16→8, M 20→10, L 24→12).',
          '테두리 두께는 가장 작은 S(16px)에서도 `1px`로 3종 공통입니다 (Avatar가 12px에서 0.5px로 얇아지는 것과 다름).',
          '',
          '**Checkbox와 헷갈리기 쉬운 차이점 3가지**',
          '1. Radio는 **Size 축(S/M/L)이 있고**, Checkbox는 16px 고정입니다.',
          '2. Radio는 **미선택에도 Hover/Pressed 시각 피드백이 있습니다**. Checkbox Angular 미선택은 변화가 전혀 없습니다.',
          '3. **미선택 Disabled 처리가 다릅니다** — Radio는 전체 `opacity 40%`, Checkbox는 테두리 알파를 10%→5%로 낮춥니다.',
          '   (선택됨 Disabled는 둘 다 배경을 `neutral/400` 단색으로 교체합니다.)',
          '',
          '**⚠️ Figma에 없어 구현에서 추가한 것 (디자이너 확인 필요)**',
          '- 포커스 링 — Figma에 Focused 상태 정의가 없습니다.',
          '',
          '스펙 원본: [`components/radio-button/radio-button.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/radio-button/radio-button.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
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
    name: { table: { disable: true } },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { size: 'm', checked: false, disabled: false, 'aria-label': '선택지' },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <RadioButton {...args} onChange={() => updateArgs({ checked: !args.checked })} />;
  },
};

/** Figma 컴포넌트 셋의 **24개 변형 전체**입니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['s', 'm', 'l'] as const).map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()} (${{ s: 16, m: 20, l: 24 }[size]}px · dot ${{ s: 8, m: 10, l: 12 }[size]}px)`}>
          {[false, true].map((checked) => (
            <Row key={String(checked)}>
              {INTERACTION_STATES.map((st) => (
                <Cell key={st.key} label={`Checked=${checked ? 'True' : 'False'} · ${st.label}`}>
                  <RadioButton
                    size={size}
                    checked={checked}
                    disabled={st.disabled}
                    forceState={st.forceState}
                    aria-label={`${size} ${checked} ${st.label}`}
                  />
                </Cell>
              ))}
            </Row>
          ))}
        </Section>
      ))}
    </div>
  ),
};

/** 하나만 선택되는 그룹 동작입니다. 클릭해서 확인해 보세요. */
export const 그룹동작: Story = {
  name: '그룹 동작',
  args: {},
  parameters: { controls: { disable: true } },
  render: function Render() {
    // ⚠️ useArgs 로 args 에 없는 키를 쓰면 Docs 페이지에서 값이 저장되지 않아 클릭해도 반응하지 않습니다.
    //    컴포넌트 prop 이 아닌 선택 상태는 useState 로 둡니다.
    const [picked, setPicked] = useState('착한구독');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {['착한구독', '신차구매', '중고구매'].map((option) => (
          <label
            key={option}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--typography-body-2-size)',
              color: 'var(--sys-color-neutral-800)',
              cursor: 'pointer',
            }}
          >
            <RadioButton
              size="m"
              name="plan"
              value={option}
              checked={picked === option}
              onChange={() => setPicked(option)}
              aria-label={option}
            />
            {option}
          </label>
        ))}
      </div>
    );
  },
};
