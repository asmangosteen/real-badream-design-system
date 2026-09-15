import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './TextInput';
import { namesOf } from '../Icon/registry';
import { Section } from '../../shared/story-helpers';

const OUTLINED_ICONS = namesOf('outlined');

const meta = {
  title: 'Components/Text Input',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '사용자가 직접 텍스트를 입력하는 필드입니다. **768개 변형** + `Show Unit` 별도 프로퍼티.',
          '',
          '[Label](/docs/components-global-label--docs) · [Type Box](/docs/components-global-type-box--docs) ·',
          '[Text Blinker](/docs/components-global-text-blinker--docs) · [Supporting Text](/docs/components-global-supporting-text--docs)',
          '**4개 서브 아톰이 실제로 조립되는 곳**입니다.',
          '',
          '## 꼭 알아야 할 규칙 4가지',
          '',
          '**1. 우측은 "한 자리"입니다 — 아이콘과 단위를 같이 쓰지 않습니다.**',
          '`Show Unit`을 켜면 **단위가 우측 아이콘을 대신**합니다. 둘이 나란히 놓이는 일은 없습니다.',
          'Figma에 둘 다 그려진 노드가 있는 건 **변형을 한눈에 보여주려는 진열용**입니다.',
          '',
          '그 한 자리에 무엇이 놓이는지 — 위에서부터 우선합니다.',
          '',
          '| 우선순위 | 조건 | 우측에 놓이는 것 |',
          '|---|---|---|',
          '| 1 | **입력 중**(Typing) | **`close_in_circle` 지우기 버튼** (Figma 고정, 자유 슬롯 아님) |',
          '| 2 | `Show Unit` = True · **포커스 없음** | 단위 텍스트 (예: `km`) |',
          '| 2 | `Show Unit` = True · **포커스 있음**(Selected) | **비움** — 입력 중에는 단위를 감춥니다 |',
          '| 3 | 그 외 | 우측 아이콘 (`arrowhead_down`) |',
          '',
          '**2. Destructed는 Selected·Typing에서만 존재합니다.**',
          'Default/Hover/Disabled/Done에는 `Destructed=True` 조합 자체가 Figma에 없습니다.',
          '에러일 때 테두리·버튼 배경·**캐럿 색**이 전부 빨강으로 바뀝니다.',
          '**Destructed는 포커스가 들어간 상태에서만 보이므로, 그동안 단위도 함께 감춰집니다.**',
          '',
          '**3. Show Unit은 variant 축이 아닙니다.**',
          '768개(8축 조합)에 포함되지 않는 **별도 boolean 프로퍼티**입니다.',
          '단위 글자는 **값 글자와 완전히 같은 스타일**입니다 (`neutral/800` · M 기준 Body2 14px Regular) — 회색 보조 텍스트가 아닙니다.',
          '',
          '**4. L만 아이콘이 20px입니다.** S·M은 16px이고, radius도 L만 12px로 커집니다.',
          '',
          '## State 6종',
          '',
          '| State | 테두리 | Type Box | 우측 아이콘 | 아이콘 색 (좌 / 우) |',
          '|---|---|---|---|---|',
          '| Default | `gray-900-10%` | Placeholder | `arrowhead_down` | `neutral/500` / `neutral/500` |',
          '| Hover | `gray-900-20%` (더 진함) | Placeholder | `arrowhead_down` | `neutral/500` / `neutral/500` |',
          '| Disabled | 없음 (배경 `gray-900-5%`) | Placeholder, **`neutral/400`** | `arrowhead_down` | `neutral/400` / `neutral/400` |',
          '| Done | `gray-900-10%` | Done (값 채워짐) | `arrowhead_down` | `neutral/500` / `neutral/500` |',
          '| Selected | **브랜드 블루** | Selected (**캐럿 앞**) | `arrowhead_down` | **`neutral/800`** / **`neutral/800`** |',
          '| Typing | **브랜드 블루** | Typing (**캐럿 뒤**) | **`close_in_circle`** | **`neutral/800`** / `neutral/500` |',
          '',
          '## 아이콘 색은 글자색을 따라가지 않습니다',
          '**포커스가 가 있을 때(Selected·Typing)만 `neutral/800` 으로 진해지고**, 그 외에는 placeholder 와 같은 `neutral/500` 입니다.',
          '- **Done 은 값이 `neutral/800` 으로 진해지는데도 아이콘은 `neutral/500` 그대로**입니다.',
          '- **Typing 의 우측 지우기 버튼만 예외로 `neutral/500`** 을 유지합니다 (좌측은 진해집니다).',
          '',
          '## 너비는 가변입니다',
          '컨테이너 너비는 **고정이 아니라 부모(화면) 폭에 맞춰 늘어납니다.**',
          'Figma 노드에 박힌 280px 는 진열 프레임 폭일 뿐입니다.',
          '',
          '> **⚠️ `value` 와 `destructed` 는 State 에 종속됩니다 — Playground 에서 바꿔도 안 보일 수 있습니다.**',
          '> · `value` 는 **Done · Selected · Typing** 에서만 보입니다. 앞의 세 State 는 Figma 상 **값이 비어 있는 상태**라 placeholder 가 대신 나옵니다.',
          '> · `destructed`(에러) 는 **Selected · Typing** 에서만 적용됩니다. Figma 에 그 두 조합만 존재합니다.',
          '>',
          '> 둘 중 하나를 확인하려면 `state` 를 먼저 바꾼 뒤 조작하세요.',
          '',
          '## Dropdown과 다른 점 3가지',
          '- **Right Icon이 독립 축**입니다 (Dropdown은 chevron 고정 슬롯).',
          '- 기본 아이콘이 `chevron_down` 이 아니라 **`arrowhead_down`** 입니다.',
          '- **Type Box의 캐럿 상태가 실제로 쓰입니다** — Dropdown에서는 쓰이지 않습니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- 768개 중 **15개만 실측**됐고 나머지는 축 독립성에 근거한 추정입니다.',
          '',
          '스펙 원본: [`components/text-input/text-input/text-input.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/text-input/text-input/text-input.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    state: {
      control: 'select',
      options: [undefined, 'default', 'hover', 'disabled', 'done', 'selected', 'typing'],
      description:
        '**비워두면(`undefined`) 실제로 조작할 수 있습니다** — 마우스를 올리면 Hover, 클릭하면 Selected, ' +
        '글자를 치면 Typing, 포커스를 풀면 Done 으로 자동 전환됩니다. ' +
        '값을 고르면 **그 State 로 고정**되어 스펙 진열용 표시가 됩니다(조작 불가).',
    },
    value: {
      description:
        '자동 모드에서는 **입력 필드의 초기값**이고, 직접 타이핑하면 바뀝니다. ' +
        '⚠️ `state` 를 고정한 경우에는 `done`·`selected`·`typing` 에서만 보입니다 ' +
        '(`default`·`hover`·`disabled` 는 Figma 상 값이 비어 있는 상태).',
    },
    destructed: {
      description:
        '⚠️ **`selected`·`typing` 에서만 적용됩니다.** Figma 에 Destructed 조합이 그 두 State 에만 존재합니다. ' +
        '자동 모드라면 필드를 클릭해 포커스를 준 상태에서 켜보세요.',
    },
    onChange: { table: { disable: true } },
    onButtonClick: { table: { disable: true } },
    leftIconName: { control: 'select', options: OUTLINED_ICONS },
    rightIconName: { control: 'select', options: OUTLINED_ICONS },
    supportingTheme: { control: 'select', options: [undefined, 'gray', 'black', 'brand', 'destructed', 'success', 'warning'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * **실제로 조작할 수 있습니다** — 마우스를 올리고, 글자를 치고, 지우기·확인 버튼을 눌러보세요.
 * `state` 컨트롤에 값을 고르면 그 State 로 고정되어 스펙 진열용 표시로 바뀝니다.
 */
export const Playground: Story = {
  args: {
    label: '주행거리',
    value: '12,500',
    placeholder: '숫자만 입력하세요',
    size: 'm',
    destructed: false,
    essential: true,
    showButton: true,
    buttonLabel: '확인',
    showLabel: true,
    supportingText: '최근 계기판 기준으로 입력해주세요',
    showSupportingText: true,
    showLeftIcon: false,
    showRightIcon: true,
    showUnit: true,
    unit: 'km',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <TextInput {...args} />
    </div>
  ),
};

/** State 6종입니다. Typing에서 우측 아이콘이 지우기 버튼으로 바뀝니다. */
export const States: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['default', '테두리 10%'],
        ['hover', '테두리 20% (더 진함)'],
        ['disabled', '배경 5% · 테두리 없음 · 글자 neutral/400'],
        ['done', '값 채워짐 · 캐럿 없음'],
        ['selected', '파란 테두리 · 캐럿 앞'],
        ['typing', '파란 테두리 · 캐럿 뒤 · 아이콘이 지우기로 강제 대체'],
      ] as const).map(([state, desc]) => (
        <div key={state} style={{ marginBottom: 20 }}>
          <span className="bd-cell__label">{state} · {desc}</span>
          <TextInput state={state} label="이름" placeholder="이름을 입력하세요" value="홍길동" supportingText="실명을 입력해주세요" />
        </div>
      ))}
    </div>
  ),
};

/** Destructed는 Selected·Typing에서만 존재합니다. 테두리·버튼·캐럿이 전부 빨강이 됩니다. */
export const Destructed: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      <Section title="Destructed = True (Selected·Typing 에서만 존재)">
        {(['selected', 'typing'] as const).map((state) => (
          <div key={state} style={{ marginBottom: 20 }}>
            <span className="bd-cell__label">{state}</span>
            <TextInput
              state={state}
              destructed
              label="비밀번호"
              value="abc"
              placeholder="8자 이상"
              supportingText="8자 이상 입력해주세요"
            />
          </div>
        ))}
      </Section>
      <Section title="❌ Default·Hover·Disabled·Done 에는 Destructed 조합이 Figma에 없습니다">
        <span className="bd-cell__label">에러는 포커스된 상태에서만 표시하는 설계로 보입니다.</span>
      </Section>
    </div>
  ),
};

/** Size 3종입니다. L만 아이콘이 20px, radius 12px입니다. */
export const Sizes: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['s', '패딩 6/10 · radius 10 · 아이콘 16'],
        ['m', '패딩 8/12 · radius 10 · 아이콘 16'],
        ['l', '패딩 12/14 · radius 12 · 아이콘 **20**'],
      ] as const).map(([size, desc]) => (
        <div key={size} style={{ marginBottom: 20 }}>
          <span className="bd-cell__label">{size.toUpperCase()} · {desc}</span>
          <TextInput size={size} label="이름" showLeftIcon supportingText="안내 문구" />
        </div>
      ))}
    </div>
  ),
};

/** 5개 토글 축을 하나씩 꺼본 모습입니다. */
export const Toggles: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['전부 켬', {}],
        ['Show Button = False', { showButton: false }],
        ['Show Label = False', { showLabel: false }],
        ['Supporting Text = False', { showSupportingText: false }],
        ['Left Icon = False', { showLeftIcon: false }],
        ['Right Icon = False', { showRightIcon: false }],
        ['전부 끔', { showButton: false, showLabel: false, showSupportingText: false, showLeftIcon: false, showRightIcon: false }],
        ['Show Unit = True — 단위가 우측 아이콘을 대신합니다 (같이 쓰지 않음)', { showUnit: true }],
      ] as const).map(([label, extra]) => (
        <div key={label} style={{ marginBottom: 18 }}>
          <span className="bd-cell__label">{label}</span>
          <TextInput showLeftIcon label="주행거리" supportingText="안내 문구" {...extra} />
        </div>
      ))}
    </div>
  ),
};
