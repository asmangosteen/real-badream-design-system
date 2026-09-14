import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker, DatePickerGroup, CalendarHeader, YearMonthWheel } from './DatePicker';
import type { WeekCell } from '../Calendar/Calendar';
import { Cell, Row, Section } from '../../shared/story-helpers';

const w = (start: number, len = 7): WeekCell[] =>
  Array.from({ length: len }, (_, i) => ({ label: String(start + i), type: 'default' as const }));
const WEEKS: WeekCell[][] = [
  [{ type: 'null' }, { type: 'null' }, ...w(1, 5)],
  w(6),
  [...w(13, 1), { label: '14', type: 'pinned' }, { label: '15', type: 'selected' }, { label: '16', type: 'selected' }, { label: '17', type: 'pinned' }, ...w(18, 2)],
  w(20),
  [...w(27, 4), { type: 'null' }, { type: 'null' }, { type: 'null' }],
];

const meta = {
  title: 'Components/Date Time Picker/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Date/Time Picker 패밀리의 **플래그십**입니다. **4개 변형**(State 2 × Time Picker 2, 전수 실측). 352px 고정 폭.',
          '',
          '함께 다루는 컴포넌트 — **Calendar Header**(6변형 + Show Dropdown) · **Year and Month Wheel** · **Date Picker Group**(2변형).',
          '',
          '## 조합 계층',
          '```',
          'Date → Week / Week Header → Month ─┐',
          '                                   ├→ Date Picker → Date Picker Group',
          'Time Field → Time Picker → Group ──┤',
          'Calendar Header · Year Month Wheel ┘',
          '```',
          '',
          '## Date Picker 레이아웃',
          'Calendar Header(56px 고정) → 달력 그리드 **또는** 연/월 휠 → (선택) 구분선 + Time Picker Group',
          '',
          '| State | 달력 영역 | 헤더 구성 |',
          '|---|---|---|',
          '| Default | Week Header + Month | Title=Left · With=Arrows · 아래 화살표 |',
          '| Wheel | Year and Month Wheel | Title=Left · With=Close · 위 화살표 |',
          '',
          '## Calendar Header — Title은 정렬뿐 아니라 크기도 바꿉니다',
          '**Left는 Subtitle 18 SemiBold, Center는 Body1 16 SemiBold** 로 타이포 자체가 다릅니다.',
          '`Show Dropdown`은 6개 variant 축과 별개인 **boolean 프로퍼티**입니다 (Text Input의 `Show Unit`과 같은 패턴).',
          '',
          '⚠️ `Center + Close` 조합의 좌측 패딩 **60px는 토큰이 아니라 하드코딩**입니다.',
          '',
          '## Wheel — 거리 기반 감쇠',
          '선택 행에서 멀어질수록 **Subtitle 18 → Body1 16 → Body2 14**, 투명도 **70% → 50% → 30%**. 상하 대칭입니다.',
          '선택 행만 굵기가 Medium 으로 바뀌고 옅은 파란 배경이 깔립니다.',
          '',
          '> 연과 월은 **각각 독립적으로 스크롤**됩니다 (사용자 확인).',
          '',
          '## ⚠️ Date Picker Group의 두 패널은 동기화되지 않습니다',
          '좌우(또는 상하) 패널은 **서로 독립적인 캘린더**입니다 (사용자 확인).',
          '진열 샘플의 헤더 비대칭(좌=드롭다운만 / 우=화살표만)은 고정 규칙이 아니라,',
          '각 패널이 Calendar Header 6개 변형 중 원하는 것을 독립적으로 고른 결과입니다.',
          '',
          '## ⚠️ Figma 레이어 이름 오류',
          'Arrow Box·닫기 버튼 안 아이콘 레이어명이 전부 `Icon / Default / 24px / plus`로 되어 있지만,',
          '실제 렌더링되는 애셋은 `chevron_left`/`chevron_right`/`close`입니다. **복사·붙여넣기 후 이름 미갱신**으로 보입니다.',
          '',
          '스펙 원본: [`date-picker.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/date-picker/date-picker.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'wheel'] },
    headerWith: { control: 'inline-radio', options: [undefined, 'arrows', 'close', 'nothing'] },
    className: { table: { disable: true } },
    weeks: { table: { disable: true } },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { state: 'default', showTimePicker: false, label: '2026년 9월', weeks: WEEKS },
  render: (args) => (
    <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
      <DatePicker {...args} />
    </div>
  ),
};

/** 4개 변형 전체입니다. */
export const AllVariants: Story = {
  args: { weeks: WEEKS },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {([
        ['default', false, 'Default · Time Off'],
        ['default', true, 'Default · Time On'],
        ['wheel', false, 'Wheel · Time Off'],
        ['wheel', true, 'Wheel · Time On'],
      ] as const).map(([state, time, label]) => (
        <Cell key={label} label={label}>
          <div style={{ outline: '1px solid #EDEEF0' }}>
            <DatePicker state={state} showTimePicker={time} label="2026년 9월" weeks={WEEKS} />
          </div>
        </Cell>
      ))}
    </Row>
  ),
};

/** Calendar Header 6개 변형입니다. */
export const Header: Story = {
  name: 'Calendar Header (6변형)',
  args: { weeks: WEEKS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['left', 'center'] as const).map((title) => (
        <Section key={title} title={`Title = ${title} · ${title === 'left' ? 'Subtitle 18 SB' : 'Body1 16 SB'}`}>
          {(['arrows', 'close', 'nothing'] as const).map((w2) => (
            <div key={w2} style={{ marginBottom: 8 }}>
              <span className="bd-cell__label">With = {w2}{title === 'center' && w2 === 'close' ? ' ⚠️ 좌측 패딩 60px 하드코딩' : ''}</span>
              <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
                <CalendarHeader title={title} with={w2} label="2026년 9월" />
              </div>
            </div>
          ))}
        </Section>
      ))}
      <Section title="Show Dropdown = False (별도 boolean 프로퍼티)">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <CalendarHeader title="left" with="arrows" showDropdown={false} label="2026년 9월" />
        </div>
      </Section>
    </div>
  ),
};

/** 거리 기반 크기·투명도 감쇠를 확인해 보세요. */
export const Wheel: Story = {
  name: 'Year and Month Wheel',
  args: { weeks: WEEKS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
      <YearMonthWheel />
    </div>
  ),
};

/** Date Picker 2개를 Divider로 구분해 배치합니다. */
export const Group: Story = {
  name: 'Date Picker Group',
  args: { weeks: WEEKS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Type = Horizontal (두 패널은 서로 독립적입니다)">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePickerGroup type="horizontal" labels={['2026년 9월', '2026년 10월']} />
        </div>
      </Section>
      <Section title="Type = Vertical">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePickerGroup type="vertical" labels={['2026년 9월', '2026년 10월']} />
        </div>
      </Section>
    </div>
  ),
};
