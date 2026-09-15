import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker, DatePickerGroup, CalendarHeader, YearMonthWheel } from './DatePicker';
import type { WeekCell } from '../Calendar/Calendar';
import type { DateRange } from '../Calendar/calendar-data';
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
          '## Date Picker Group의 두 패널은 함께 움직입니다',
          '',
          '⚠️ **2026-09-15 정정.** 이전 판은 "두 패널은 서로 독립적인 캘린더입니다(사용자 확인)" 였는데,',
          '**반대입니다** — 그룹이 기준 달 하나를 들고 첫 패널이 기준 달을, 다음 패널이 그 다음 달을 그립니다.',
          '어느 쪽에서 달을 옮기든(화살표든 휠이든) 둘이 같이 움직이고 제목도 함께 바뀝니다.',
          '가로형에서 화살표가 오른쪽 패널에만 있는 것도 **고정 규칙**입니다 — 하나로 두 달을 함께 옮기니까요.',
          '',
          '휠과 Time Picker 만 패널마다 따로입니다. 자세한 건 [Date Picker Group](#date-picker-group) 참고.',
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

/**
 * **실제 달력으로 동작합니다.** 화살표로 달을 넘기고, 날짜를 누르면 선택됩니다.
 * 오늘은 테두리(`current`), 고른 날짜는 파란 배경(`pinned`)으로 그려집니다.
 * 제목 옆 화살표를 누르면 연·월 휠이 열립니다.
 */
export const Playground: Story = {
  args: { showTimePicker: false },
  render: function Render(args) {
    const [picked, setPicked] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePicker {...args} value={picked} onChange={setPicked} />
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.7, paddingTop: 4 }}>
          고른 날짜:{' '}
          <b style={{ color: '#202837' }}>
            {picked ? `${picked.getFullYear()}. ${picked.getMonth() + 1}. ${picked.getDate()}` : '없음'}
          </b>
          <div style={{ marginTop: 6 }}>오늘: {new Date().toLocaleDateString('ko-KR')}</div>
        </div>
      </div>
    );
  },
};

/**
 * 달마다 주(週) 수가 달라지는 것을 확인하는 진열입니다.
 * **4·5·6주가 모두 나오고, 그만큼 패널 높이도 달라집니다.**
 * Figma 의 Month 에는 `Week Number=5/6` 만 있지만 평년 2월이 일요일에 시작하면 4주로 끝납니다 —
 * 빈 줄로 5주를 맞추지 않고 그대로 4줄로 그립니다(디자이너 확인).
 */
export const 실제달력: Story = {
  name: '실제 달력 · 주 수 변화',
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="같은 컴포넌트, 다른 달">
      <Row>
        {([
          [2026, 8, '2026년 8월 — 6주 (토요일 시작, 31일)'],
          [2026, 9, '2026년 9월 — 5주'],
          [2026, 2, '2026년 2월 — 4주 (일요일 시작 28일)'],
        ] as const).map(([y, m, label]) => (
          <Cell key={label} label={label}>
            <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
              <DatePicker year={y} month={m} today={new Date(2026, 8, 15)} />
            </div>
          </Cell>
        ))}
      </Row>
    </Section>
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
/**
 * **마우스 휠·트랙패드로 돌려보세요.** 네이티브 스크롤을 그대로 쓰기 때문에 관성과 감속이
 * 살아 있고, 멈추면 항목에 달라붙습니다. 항목 클릭이나 ↑↓ 키로도 고를 수 있습니다.
 *
 * ⚠️ **연도와 월은 따로 돕니다** — Figma 진열(1997~2003년 / 10·11·12·1·2·3·4월)이 근거입니다.
 */
export const Wheel: Story = {
  name: 'Year and Month Wheel',
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [ym, setYm] = useState({ year: 2000, month: 1 });
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <YearMonthWheel year={ym.year} month={ym.month} onChange={(year, month) => setYm({ year, month })} />
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.7, paddingTop: 4 }}>
          고른 값: <b style={{ color: '#202837' }}>{ym.year}년 {ym.month}월</b>
          <div style={{ marginTop: 6 }}>연도·월을 각각 돌려보세요</div>
        </div>
      </div>
    );
  },
};

/** Date Picker 2개를 Divider로 구분해 배치합니다. */
/** 진열이 날마다 흔들리지 않게 오늘을 고정합니다 */
const TODAY = new Date(2026, 8, 15);

export const Group: Story = {
  name: 'Date Picker Group',
  args: { weeks: WEEKS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Type = Horizontal · 721×342 — 오른쪽 화살표 하나가 두 달을 함께 옮깁니다">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePickerGroup type="horizontal" defaultYear={2026} defaultMonth={9} today={TODAY} />
        </div>
      </Section>
      <Section title="Type = Horizontal · Time Picker — 패널마다 각자의 시간 값을 가집니다">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePickerGroup type="horizontal" defaultYear={2026} defaultMonth={9} today={TODAY} showTimePicker />
        </div>
      </Section>
      <Section title="Type = Vertical · 352×661 — 연도 없이 달만, 휠·Time Picker 없음">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePickerGroup type="vertical" defaultYear={2026} defaultMonth={9} today={TODAY} />
        </div>
      </Section>
    </div>
  ),
};

/**
 * **날짜 선택 상태 3종**입니다 — Figma `2612:16030` 의 주석을 그대로 옮겼습니다.
 *
 * | 상태 | 모습 | 언제 |
 * |---|---|---|
 * | `current` | 회색 **테두리**만 | 오늘 |
 * | `pinned` | 진한 파란 원 + 흰 글자 | 사용자가 찍은 날짜. **오늘을 찍어도 pinned 로 바뀝니다** |
 * | `selected` | 옅은 파란 배경 | **두 pinned 사이의 날짜들에만.** 단독으로는 절대 쓰이지 않습니다 |
 *
 * 기간일 때는 셀 뒤에 **같은 색 띠**가 깔려 칸 사이 8px 을 메웁니다. 띠는 앵커 칸의
 * **중앙**에서 시작/끝나고, 지나가는 줄은 격자 전체를 채웁니다.
 */
export const 선택상태: Story = {
  name: '선택 상태 · current / pinned / selected',
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="오늘만 — current (테두리)">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePicker year={2026} month={9} today={TODAY} />
        </div>
      </Section>
      <Section title="날짜 하나 찍음 — pinned. 오늘의 테두리는 그대로 남습니다">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePicker year={2026} month={9} today={TODAY} defaultValue={new Date(2026, 8, 8)} />
        </div>
      </Section>
      <Section title="기간 — 양끝이 pinned, 사이가 selected. 뒤에 띠가 깔립니다">
        <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
          <DatePicker
            year={2026}
            month={9}
            today={TODAY}
            selection="range"
            defaultRange={{ start: new Date(2026, 8, 8), end: new Date(2026, 8, 19) }}
          />
        </div>
      </Section>
    </div>
  ),
};

/**
 * 기간은 **두 패널에 걸쳐 이어집니다** (Figma: *"기간은 패널 두개가 붙어도 계속 이어짐"*).
 * 날짜를 눌러 직접 잡아 보세요 — 첫 클릭이 시작, 둘째가 끝, 셋째면 처음부터 다시입니다.
 *
 * 띠는 **패널 사이를 건너뛰지 않습니다.** 각 패널의 띠는 자기 격자 안에서 끝나고,
 * 가운데 33px(여백 16 + 구분선 1 + 여백 16)은 비워 둡니다 — Figma 실측도 같습니다.
 */
export const 기간선택: Story = {
  name: '기간 선택 · 두 패널에 걸침',
  parameters: { controls: { disable: true } },
  render: function Ranged() {
    const [range, setRange] = useState<DateRange>({
      start: new Date(2026, 8, 24),
      end: new Date(2026, 9, 7),
    });
    const fmt = (d: Date | null) => (d ? `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}` : '—');
    return (
      <div>
        <Section title={`선택된 기간 — ${fmt(range.start)} ~ ${fmt(range.end)}`}>
          <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
            <DatePickerGroup
              type="horizontal"
              defaultYear={2026}
              defaultMonth={9}
              today={TODAY}
              selection="range"
              range={range}
              onRangeChange={setRange}
            />
          </div>
        </Section>
      </div>
    );
  },
};
