import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import { namesOf } from '../Icon/registry';
import { Section } from '../../shared/story-helpers';

const OUTLINED_ICONS = namesOf('outlined');

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '클릭하면 선택지 목록을 펼치는 **선택형 입력**입니다. **288개 변형.**',
          '[Label](/docs/components-global-label--docs) · [Type Box](/docs/components-global-type-box--docs) ·',
          '[Supporting Text](/docs/components-global-supporting-text--docs) 세 아톰을 그대로 조합해 만들어집니다.',
          '',
          '## Text Input과 다른 점 3가지',
          '',
          '| | Dropdown | Text Input |',
          '|---|---|---|',
          '| 우측 아이콘 | **축 없이 `chevron_down` 고정** | 독립 토글 축 (`arrowhead_down`, 교체 가능) |',
          '| Destructed | **Selected 에서만** | Selected + Typing |',
          '| Type Box 캐럿 | **쓰지 않음** | Selected·Typing 에서 사용 |',
          '| State | 5종 (Typing 없음) | 6종 |',
          '',
          '**Typing 상태 자체가 없습니다** — 직접 타이핑하는 필드가 아니라 목록에서 고르는 컨트롤이기 때문입니다.',
          '',
          '## Size별 baseline 높이 (전 축 True 기준)',
          '',
          '| Size | 높이 | Input radius | 아이콘 |',
          '|---|---|---|---|',
          '| S | 70px | 10px | 16px |',
          '| M | 82px | 10px | 16px |',
          '| L | **100px** | 12px | **20px** |',
          '',
          '> **구현 메모**: Input 박스·버튼의 패딩·radius·타이포 값이 Text Input과 Figma 실측상 완전히 동일해,',
          '> 값을 복제하지 않고 **같은 스타일시트를 공유**하도록 구현했습니다. 한 곳만 고치면 둘 다 반영됩니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- Figma는 **너비 280px 고정**입니다 (진열 프레임 표시값으로 추정).',
          '- 288개 중 **13개만 실측**됐고 나머지는 축 독립성에 근거한 추정입니다.',
          '- 펼쳐진 목록(옵션 리스트) 자체는 별도 컴포넌트로 Figma에 없습니다.',
          '',
          '스펙 원본: [`components/dropdown/dropdown.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/dropdown/dropdown.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    state: { control: 'select', options: ['default', 'hover', 'selected', 'disabled', 'done'] },
    leftIconName: { control: 'select', options: OUTLINED_ICONS },
    supportingTheme: { control: 'select', options: [undefined, 'gray', 'black', 'brand', 'destructed', 'success', 'warning'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: '차종',
    value: '전기스쿠터',
    placeholder: '차종을 선택하세요',
    size: 'm',
    state: 'default',
    destructed: false,
    showButton: true,
    showLabel: true,
    supportingText: '구독 가능한 차종만 표시됩니다',
    showSupportingText: true,
    showLeftIcon: false,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Dropdown {...args} />
    </div>
  ),
};

/** State 5종입니다. Typing이 없다는 점이 Text Input과 다릅니다. */
export const States: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['default', '테두리 10%'],
        ['hover', '테두리 20%'],
        ['selected', '파란 테두리 · 목록 열림'],
        ['disabled', '배경 5% · 테두리 없음'],
        ['done', '값 선택됨'],
      ] as const).map(([state, desc]) => (
        <div key={state} style={{ marginBottom: 20 }}>
          <span className="bd-cell__label">{state} · {desc}</span>
          <Dropdown state={state} label="차종" value="전기스쿠터" placeholder="차종을 선택하세요" supportingText="안내 문구" />
        </div>
      ))}
      <Section title="Destructed = True (Selected 에서만 존재)">
        <Dropdown state="selected" destructed label="차종" placeholder="차종을 선택하세요" supportingText="차종을 선택해주세요" />
      </Section>
    </div>
  ),
};

/** Size 3종입니다. L만 아이콘 20px, radius 12px입니다. */
export const Sizes: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['s', '70px · radius 10 · 아이콘 16'],
        ['m', '82px · radius 10 · 아이콘 16'],
        ['l', '100px · radius 12 · 아이콘 20'],
      ] as const).map(([size, desc]) => (
        <div key={size} style={{ marginBottom: 20 }}>
          <span className="bd-cell__label">{size.toUpperCase()} · {desc}</span>
          <Dropdown size={size} label="차종" showLeftIcon supportingText="안내 문구" />
        </div>
      ))}
    </div>
  ),
};
