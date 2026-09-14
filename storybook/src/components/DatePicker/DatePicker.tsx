import { Icon } from '../Icon/Icon';
import { Divider } from '../Divider/Divider';
import { WeekHeader, Month, type WeekCell } from '../Calendar/Calendar';
import { TimePickerGroup } from '../TimePicker/TimePicker';
import './DatePicker.css';

/* ==================== Calendar Header ==================== */

export type CalendarHeaderTitle = 'left' | 'center';
export type CalendarHeaderWith = 'arrows' | 'close' | 'nothing';

export interface CalendarHeaderProps {
  /** ⚠️ 정렬뿐 아니라 **타이포 크기 자체가 다릅니다** — Left 는 Subtitle 18, Center 는 Body1 16 */
  title?: CalendarHeaderTitle;
  /** 우측(또는 좌우)에 붙는 부가 컨트롤 */
  with?: CalendarHeaderWith;
  /** 제목 옆 펼침/접힘 화살표. **variant 축이 아닌 별도 boolean 프로퍼티**입니다 */
  showDropdown?: boolean;
  /** 펼쳐진 상태면 화살표가 위를 향합니다 */
  expanded?: boolean;
  label?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
  className?: string;
}

/**
 * 달력 상단 **헤더 바**입니다. **6개 변형** + `Show Dropdown` 별도 프로퍼티. 352×56px.
 *
 * 스펙 원본: `components/date-time-picker/calendar-header/calendar-header.md`
 */
export function CalendarHeader({
  title = 'left',
  with: withControl = 'arrows',
  showDropdown = true,
  expanded = false,
  label = '2000년 1월',
  onPrev,
  onNext,
  onClose,
  onToggle,
  className,
}: CalendarHeaderProps) {
  const titleBlock = (
    <span className="bd-calendar-header__title">
      {label}
      {showDropdown && (
        <button type="button" className="bd-calendar-header__btn" style={{ padding: 0 }} onClick={onToggle} aria-label="연·월 선택">
          <Icon name={expanded || withControl === 'close' ? 'arrowhead_up' : 'arrowhead_down'} category="outlined" size={20} />
        </button>
      )}
    </span>
  );

  return (
    <div
      className={['bd-calendar-header', className].filter(Boolean).join(' ')}
      data-title={title}
      data-with={withControl}
    >
      {/* Center + Arrows 만 3분할 구조입니다 */}
      {title === 'center' && withControl === 'arrows' && (
        <button type="button" className="bd-calendar-header__btn" onClick={onPrev} aria-label="이전 달">
          <Icon name="chevron_left" category="outlined" size={24} />
        </button>
      )}

      {titleBlock}
      <span className="bd-calendar-header__spacer" />

      {title === 'left' && withControl === 'arrows' && (
        <>
          <button type="button" className="bd-calendar-header__btn" onClick={onPrev} aria-label="이전 달">
            <Icon name="chevron_left" category="outlined" size={24} />
          </button>
          <button type="button" className="bd-calendar-header__btn" onClick={onNext} aria-label="다음 달">
            <Icon name="chevron_right" category="outlined" size={24} />
          </button>
        </>
      )}
      {title === 'center' && withControl === 'arrows' && (
        <button type="button" className="bd-calendar-header__btn" onClick={onNext} aria-label="다음 달">
          <Icon name="chevron_right" category="outlined" size={24} />
        </button>
      )}
      {withControl === 'close' && (
        <button type="button" className="bd-calendar-header__btn" onClick={onClose} aria-label="닫기">
          <Icon name="close" category="outlined" size={24} />
        </button>
      )}
    </div>
  );
}

/* ==================== Year and Month Wheel ==================== */

export interface YearMonthWheelProps {
  /** 가운데(4번째)가 선택된 값입니다. 7행 고정 */
  rows?: { year: number; month: number }[];
  className?: string;
}

const DEFAULT_ROWS = [1997, 1998, 1999, 2000, 2001, 2002, 2003].map((year, i) => ({
  year,
  month: [10, 11, 12, 1, 2, 3, 4][i],
}));

/**
 * 연/월을 빠르게 고르는 **7행 휠 피커**입니다. 328×254px. 변형 축 없는 단일 인스턴스입니다.
 *
 * 선택 행에서 멀어질수록 글자가 **Subtitle 18 → Body1 16 → Body2 14** 로 작아지고,
 * 투명도도 **70% → 50% → 30%** 로 옅어집니다 (상하 대칭).
 * 선택 행만 굵기가 Medium 으로 바뀌고 옅은 파란 배경이 깔립니다.
 *
 * > 연과 월은 **각각 독립적으로 스크롤**됩니다 (사용자 확인).
 *
 * 스펙 원본: `components/date-time-picker/year-month-wheel/year-month-wheel.md`
 */
export function YearMonthWheel({ rows = DEFAULT_ROWS, className }: YearMonthWheelProps) {
  return (
    <div className={['bd-ym-wheel', className].filter(Boolean).join(' ')} role="listbox">
      {rows.map((r, i) => (
        <div key={i} className="bd-ym-wheel__row" data-distance={Math.abs(i - 3)} role="option" aria-selected={i === 3}>
          <span>{r.year}년</span>
          <span>{r.month}월</span>
        </div>
      ))}
    </div>
  );
}

/* ==================== Date Picker ==================== */

export type DatePickerState = 'default' | 'wheel';

export interface DatePickerProps {
  /** `default` = 달력 그리드 · `wheel` = 연/월 휠 */
  state?: DatePickerState;
  /** 하단 시:분 스테퍼 섹션 */
  showTimePicker?: boolean;
  label?: string;
  weeks?: WeekCell[][];
  /** Group 안에서는 헤더 구성이 좌우 비대칭이 됩니다 */
  headerWith?: CalendarHeaderWith;
  headerShowDropdown?: boolean;
  className?: string;
}

const PLACEHOLDER_WEEKS: WeekCell[][] = Array.from({ length: 5 }, () =>
  Array.from({ length: 7 }, () => ({ label: '00', type: 'default' as const })),
);

/**
 * 달력 + 시간 선택을 한 패널에 담은 **패밀리 플래그십**입니다. **4개 변형**(전수 실측). 352px 고정 폭.
 *
 * 레이아웃: Calendar Header(56px 고정) → 달력 그리드 또는 휠 → (선택) 구분선 + Time Picker Group.
 *
 * 스펙 원본: `components/date-time-picker/date-picker/date-picker.md`
 */
export function DatePicker({
  state = 'default',
  showTimePicker = false,
  label = '2000년 1월',
  weeks = PLACEHOLDER_WEEKS,
  headerWith,
  headerShowDropdown = true,
  className,
}: DatePickerProps) {
  return (
    <div className={['bd-date-picker', className].filter(Boolean).join(' ')} data-state={state}>
      <CalendarHeader
        title="left"
        with={headerWith ?? (state === 'wheel' ? 'close' : 'arrows')}
        showDropdown={headerShowDropdown}
        expanded={state === 'wheel'}
        label={label}
      />
      <div className="bd-date-picker__body">
        {state === 'default' ? (
          <>
            <WeekHeader />
            <Month weeks={weeks} />
          </>
        ) : (
          <YearMonthWheel />
        )}
      </div>
      {showTimePicker && (
        <>
          <Divider />
          <div className="bd-date-picker__time">
            <TimePickerGroup values={['00', '00']} />
          </div>
        </>
      )}
    </div>
  );
}

/* ==================== Date Picker Group ==================== */

export interface DatePickerGroupProps {
  type?: 'horizontal' | 'vertical';
  labels?: [string, string];
  className?: string;
}

/**
 * Date Picker 2개를 Divider 로 구분해 배치합니다. **2개 변형**(전수 실측).
 *
 * ⚠️ **두 패널은 동기화되지 않는 독립 캘린더**입니다 (사용자 확인).
 * 진열 샘플의 좌우 헤더 비대칭(좌=드롭다운만 / 우=화살표만)은 고정 규칙이 아니라
 * 각 패널이 Calendar Header 6개 변형 중 원하는 것을 독립적으로 고른 결과입니다.
 *
 * 스펙 원본: `components/date-time-picker/date-picker-group/date-picker-group.md`
 */
export function DatePickerGroup({
  type = 'horizontal',
  labels = ['2000년 1월', '2000년 2월'],
  className,
}: DatePickerGroupProps) {
  return (
    <div className={['bd-date-picker-group', className].filter(Boolean).join(' ')} data-type={type}>
      <DatePicker label={labels[0]} headerWith="nothing" />
      <Divider type={type === 'horizontal' ? 'vertical' : 'horizontal'} color="var(--sys-color-neutral-200)" />
      <DatePicker label={labels[1]} headerWith="arrows" headerShowDropdown={false} />
    </div>
  );
}
