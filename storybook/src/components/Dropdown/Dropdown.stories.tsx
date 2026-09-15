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
          '| 우측 아이콘 | **교체 축 없는 Chevron** — 단, 열리면 `chevron_up` 으로 뒤집힘 | 독립 토글 축 (`arrowhead_down`, 교체 가능) |',
          '| 우측 아이콘 색 | **열려 있으면 테두리와 같은 색**(파랑/에러 빨강) | 좌우 같은 규칙 |',
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
          '## State별 아이콘 색 (2026-09-15 재실측)',
          '',
          '아이콘은 글자색을 따라가지 않고 **State마다 색이 정해져 있습니다.**',
          '이 값이 스펙에 아예 없어 구현이 상자 글자색을 그대로 물려받아 **전부 새까맣게** 나오고 있었습니다.',
          '',
          '| State | 좌측 아이콘 | Chevron |',
          '|---|---|---|',
          '| Default · Hover · Done | `neutral/500` | `neutral/500` |',
          '| Selected | `neutral/800` | **`brand/primary-default`** |',
          '| Selected + Destructed | `neutral/800` | **`theme/destructed-default`** |',
          '| Disabled | `neutral/400` | `neutral/400` |',
          '',
          '**좌우가 따로 움직입니다.** 좌측은 Text Input과 같은 규칙이지만, Chevron만은 열려 있는 동안',
          '테두리와 같은 색이 됩니다 — 테두리·화살표가 한 덩어리로 읽히게 한 것입니다.',
          '',
          '## 아직 목록(Menu)이 없습니다',
          '',
          '`selected`는 **"열린 모습"만** 그립니다. 실제로 아래에 뜨는 선택지 목록은',
          'Figma의 **`❖ Menu` 페이지**에 따로 있고 아직 옮기지 않았습니다.',
          '트리거 쪽 계약(`<button>` · `aria-haspopup="listbox"` · `aria-expanded`)은 미리 맞춰 뒀습니다.',
          '',
          '## 너비는 가변입니다',
          '컨테이너 너비는 **고정이 아니라 부모(화면) 폭에 맞춰 늘어납니다**(디자이너 확인 완료).',
          'Figma 노드에 박힌 280px 는 진열 프레임 폭일 뿐입니다.',
          '',
          '## Destructed의 하단 Supporting Text는 빨강입니다',
          '',
          '에러일 때 하단 안내 문구도 `Theme=Destructed`(빨강)로 함께 바뀝니다.',
          '',
          '> ⚠️ **이 항목만 구현이 Figma보다 앞서 있습니다.** Figma 변형은 아직 `Theme=Gray` 그대로라',
          '> 테두리·버튼만 빨갛고 안내 문구는 회색입니다. 색상 단독 의존(WCAG 1.4.1)을 피하려고',
          '> **디자이너가 빨강으로 확정했고(2026-09-15) Figma 쪽을 맞추기로 했습니다.**',
          '> 재실측할 때 회색으로 되돌리지 마세요 — 실측값이 아니라 지시가 기준입니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- 288개 중 **13개만 실측**됐고 나머지는 축 독립성에 근거한 추정입니다.',
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
        ['selected', '파란 테두리 · Chevron 위 · 값 채워짐'],
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
