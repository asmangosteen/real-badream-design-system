import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextBlinker } from './TextBlinker';
import { Cell, Row } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Global/Text Blinker',
  component: TextBlinker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '입력 필드 안에서 커서 위치를 표시하는 얇은 세로 막대(캐럿)입니다.',
          '**On/Off 2개 변형**뿐인, 이 디자인 시스템에서 가장 단순한 컴포넌트입니다.',
          '`components/global/` 소속 — Input·TextField 의 부품입니다.',
          '',
          '| 항목 | 값 |',
          '|---|---|',
          '| 크기 | 1.5 × 20px (On/Off 공통) |',
          '| radius | 2px (`radius/01`) |',
          '| On 색상 | `brand/primary-default` `#2C7BE2` |',
          '| Off | **같은 색의 alpha 0%** — 별도 회색이 아닙니다 |',
          '',
          '## 색상이 상위 컴포넌트에서 바뀝니다',
          'Text Input 에서 State=Selected/Typing 이면서 에러(Destructed)일 때,',
          '캐럿 색이 `theme/destructed-default`(`#E72F37`)로 **오버라이드**됩니다.',
          '이 축은 Text Blinker 자체에는 없고, 상위 컴포넌트가 인스턴스 색을 바꿔 쓰는 사례입니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- **깜빡임 주기가 Figma에 전혀 없습니다.** 이름이 "Blinker"고 On/Off 두 상태가 있어 깜빡임이 의도된 것은 분명하지만, duration·주기 값이 정의되어 있지 않습니다. 여기서는 구현 기본값 `1s step-end` 를 넣었습니다.',
          '- 브라우저 기본 캐럿과 **중복 표시**되지 않도록 구현 시 주의가 필요합니다 (네이티브 `<input>` 의 caret 을 끄고 이걸 쓰는 방식인지 Figma로는 알 수 없습니다).',
          '',
          '스펙 원본: [`components/global/text-blinker/text-blinker.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/text-blinker/text-blinker.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['on', 'off'] },
    color: { control: 'color' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof TextBlinker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { state: 'on', blink: false },
};

/** 2개 변형 전체입니다. Off는 투명이라 아무것도 보이지 않는 게 정상입니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="On · brand/primary-default">
        <span style={{ display: 'inline-flex', padding: 8, background: 'var(--sys-color-neutral-100)' }}>
          <TextBlinker state="on" />
        </span>
      </Cell>
      <Cell label="Off · 같은 색 alpha 0% (안 보이는 게 정상)">
        <span style={{ display: 'inline-flex', padding: 8, background: 'var(--sys-color-neutral-100)' }}>
          <TextBlinker state="off" />
        </span>
      </Cell>
      <Cell label="⚠️ 깜빡임 (Figma에 주기 없음 · 구현 1s)">
        <span style={{ display: 'inline-flex', padding: 8, background: 'var(--sys-color-neutral-100)' }}>
          <TextBlinker blink />
        </span>
      </Cell>
    </Row>
  ),
};

/** Text Input 이 에러 상태에서 캐럿 색을 바꿔 쓰는 사례입니다. */
export const 색상오버라이드: Story = {
  name: '색상 오버라이드 (상위 컴포넌트)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="기본 · brand/primary-default">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 1, padding: '8px 12px', border: '1px solid #DBDCDF', borderRadius: 8, fontFamily: 'var(--font-family-base)', fontSize: 14 }}>
          입력중<TextBlinker />
        </span>
      </Cell>
      <Cell label="에러 · theme/destructed-default">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 1, padding: '8px 12px', border: '1px solid var(--sys-color-theme-destructed-default)', borderRadius: 8, fontFamily: 'var(--font-family-base)', fontSize: 14 }}>
          입력중<TextBlinker color="var(--sys-color-theme-destructed-default)" />
        </span>
      </Cell>
    </Row>
  ),
};
