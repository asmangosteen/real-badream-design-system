import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Divider } from '../Divider/Divider';
import { WeekHeader, Month, type WeekCell } from '../Calendar/Calendar';
import { buildMonthWeeks, addMonths, formatYearMonth, formatMonth } from '../Calendar/calendar-data';
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
  /* Figma 에서 이 화살표는 Icon Button 이 아니라 `Year and Month` 프레임 안의 **맨아이콘 20px** 입니다.
     그래서 아이콘만 버튼으로 감싸지 않고, **제목 글자까지 통째로** 누를 수 있게 만듭니다
     (아이콘만 눌리면 실제로 조준하기 어렵습니다). 색은 글자 neutral/800 · 아이콘 neutral/600 이라
     버튼이 글자색을 갖고 아이콘 래퍼가 자기 색을 따로 가집니다. */
  const titleContent = (
    <>
      {label}
      {showDropdown && (
        <span className="bd-calendar-header__toggle-icon">
          <Icon name={expanded || withControl === 'close' ? 'arrowhead_up' : 'arrowhead_down'} category="outlined" size={20} />
        </span>
      )}
    </>
  );
  const titleBlock = showDropdown ? (
    <button
      type="button"
      className="bd-calendar-header__title"
      data-interactive="true"
      onClick={onToggle}
      aria-label={`${label}, 연·월 선택`}
      aria-expanded={expanded}
    >
      {titleContent}
    </button>
  ) : (
    <span className="bd-calendar-header__title">{titleContent}</span>
  );

  /* 이전/다음·닫기는 Figma 에서 **Icon Button 인스턴스**(Size=L · Type=Ghost · Icon Color=Black)
     입니다. 자체 button 을 쓰면 Icon Button 의 hover/pressed 오버레이가 빠지므로
     컴포넌트를 그대로 씁니다. 아이콘 색만 헤더에서 neutral/600 으로 덮어씁니다
     (Figma 도 인스턴스 오버라이드입니다 — Icon Button 원본 Ghost 는 neutral/800). */
  const control = (iconName: string, onClick: (() => void) | undefined, ariaLabel: string) => (
    <IconButton size="l" type="ghost" iconName={iconName} onClick={onClick} aria-label={ariaLabel} />
  );

  return (
    <div
      className={['bd-calendar-header', className].filter(Boolean).join(' ')}
      data-title={title}
      data-with={withControl}
    >
      {/* Center + Arrows 만 3분할 구조입니다 */}
      {title === 'center' && withControl === 'arrows' && control('chevron_left', onPrev, '이전 달')}

      {titleBlock}

      {/* Figma 의 `Arrow Box`(80×40) — 두 화살표는 gap 0 으로 붙어 있습니다 */}
      {title === 'left' && withControl === 'arrows' && (
        <span className="bd-calendar-header__arrows">
          {control('chevron_left', onPrev, '이전 달')}
          {control('chevron_right', onNext, '다음 달')}
        </span>
      )}
      {title === 'center' && withControl === 'arrows' && control('chevron_right', onNext, '다음 달')}
      {withControl === 'close' && control('close', onClose, '닫기')}
    </div>
  );
}

/* ==================== Year and Month Wheel ==================== */

/* Figma 실측(`2224:3190`) — 328×254, 상하 패딩 32, 스크롤 영역 190px.
   가운데에서 멀어질수록 **간격·글자 크기·투명도가 함께 줄어드는 진짜 휠**입니다.

   | 거리 | 중심 오프셋 | 글자      | 투명도 |
   |-----|-----------|----------|-------|
   | 0   | 0         | 18 Medium | 1.0   |
   | 1   | 32        | 18 Regular| 0.7   |
   | 2   | 60        | 16 Regular| 0.5   |
   | 3   | 84        | 14 Regular| 0.3   |

   오프셋 0/32/60/84 는 반지름 92px · 한 칸 20.4°(0.3554rad) 인 원통에 정확히 들어맞습니다
   (`R·sin(d·α)` = 32.0 / 60.1 / 84.3). 그래서 중간값도 이 식으로 이어 붙여
   스크롤 중에 끊김 없이 휘어지게 만듭니다.

   ⚠️ **연도와 월은 서로 독립된 열입니다.** Figma 진열이 1997~2003년 / 10·11·12·1·2·3·4월 로
   되어 있어, 연도는 1년씩·월은 1달씩 따로 돕니다. (이전 구현은 둘을 한 덩어리로 움직여
   1999년 12월 → 1998년 11월 같은 잘못된 조합이 나왔습니다) */
const WHEEL = {
  viewport: 190,
  slot: 32,
} as const;
const WHEEL_PAD = (WHEEL.viewport - WHEEL.slot) / 2;   // 79px — 첫·마지막 항목도 가운데에 올 수 있게
/** 거리별 중심 오프셋 — Figma 실측 0/32/60/84. 간격이 32→28→24 로 4씩 줄어드는 패턴이라
 *  바깥쪽은 20 을 이어 붙여 104 로 둡니다. 원통 공식(R·sin)으로는 84 가 나오지 않아
 *  실측 정지점을 그대로 쓰고 사이만 이어 줍니다. */
const OFFSET_STOPS = [0, 32, 60, 84, 104];
const OPACITY_STOPS = [1, 0.7, 0.5, 0.3, 0];
const FONT_STOPS = [18, 18, 16, 14, 14];
/** 월 열은 무한히 감깁니다 — 같은 목록을 이만큼 반복해 이어 붙이고 가운데 벌에서 시작합니다 */
const LOOP_COPIES = 5;
const LOOP_MIDDLE = 2;

/** 거리(실수)에 따라 두 정지점 사이를 이어 줍니다 */
function lerpStops(stops: readonly number[], x: number): number {
  const c = Math.min(Math.max(x, 0), stops.length - 1);
  const i = Math.floor(c);
  return stops[i] + (stops[Math.min(i + 1, stops.length - 1)] - stops[i]) * (c - i);
}

interface WheelColumnProps {
  values: number[];
  index: number;
  onIndexChange: (index: number) => void;
  format: (value: number) => string;
  align: 'center' | 'left';
  width: number;
  ariaLabel: string;
  /** 켜면 목록이 끝없이 감깁니다 (Figma 의 월 열이 1월 위에 12·11·10월 을 보여 줍니다) */
  loop?: boolean;
}

/** 휠 한 열. 네이티브 스크롤 + `scroll-snap` 을 그대로 쓰기 때문에
 *  트랙패드의 관성·감속이 살아 있고, 손을 떼면 항목에 정확히 달라붙습니다.
 *  휘어 보이게 하는 변형만 스크롤에 맞춰 직접 계산합니다(레이아웃에는 영향 없음). */
function WheelColumn({ values, index, onIndexChange, format, align, width, ariaLabel, loop = false }: WheelColumnProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const settleRef = useRef<number | undefined>(undefined);
  /* 사용자가 돌려서 값이 바뀐 경우에는 아래 layout effect 가 **다시 스크롤을 걸면 안 됩니다.**
     이미 손가락(또는 스냅)이 그 자리에 데려다 놨는데 프로그램 스크롤이 겹치면
     둘이 서로 밀어내며 엉뚱한 칸에 멈춥니다. */
  const selfScroll = useRef(false);
  /* 반대 방향의 사고도 막아야 합니다 — **프로그램이 건 스크롤이 목표에 닿기 전에**
     정착 타이머가 터지면, 지나가던 칸을 "사용자가 고른 값"으로 착각해 확정해 버립니다.
     Date Picker Group 처럼 한쪽 휠을 고르면 **다른 쪽 휠이 따라 움직이는** 구조에서는
     그 오작동 한 번이 기준 달을 통째로 밀어 버립니다.
     목표 위치를 들고 있다가, 도착했거나 스크롤이 멈춰 버린 게 확실할 때만 가드를 풉니다. */
  const syncingTo = useRef<number | null>(null);
  /** 직전 정착 시점의 스크롤 위치 — 부드러운 스크롤이 중간에 끊겼는지 판별합니다 */
  const settledAt = useRef(-1);
  const len = values.length;
  // 감기는 열은 같은 목록을 여러 벌 이어 붙이고, 멈출 때마다 가운데 벌로 되돌립니다
  const slots = loop ? Array.from({ length: len * LOOP_COPIES }, (_, i) => values[i % len]) : values;
  const rawIndex = loop ? LOOP_MIDDLE * len + index : index;

  const paint = useCallback(() => {
    const view = viewRef.current;
    if (!view) return;
    const center = view.scrollTop + WHEEL.viewport / 2;
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const natural = WHEEL_PAD + i * WHEEL.slot + WHEEL.slot / 2;
      const d = (natural - center) / WHEEL.slot;
      const ad = Math.abs(d);
      // 실측 오프셋으로 옮긴 위치 − 원래 자리 = 안쪽으로 당겨야 할 만큼
      const curved = lerpStops(OFFSET_STOPS, ad) * Math.sign(d);
      item.style.transform = `translateY(${(curved - d * WHEEL.slot).toFixed(2)}px)`;
      item.style.opacity = lerpStops(OPACITY_STOPS, ad).toFixed(3);
      item.style.fontSize = `${lerpStops(FONT_STOPS, ad).toFixed(2)}px`;
      item.dataset.center = ad < 0.5 ? 'true' : 'false';
    });
  }, []);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(paint);
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      const view = viewRef.current;
      if (!view) return;
      const top = view.scrollTop;

      /* 프로그램 스크롤이 가는 중이면 값을 되돌려 보내지 않습니다.
         · 목표에 닿았으면 어차피 바깥 값과 같은 자리이니 확정할 게 없습니다.
         · 아직 가는 중이면 지금 위치는 **지나가던 칸**일 뿐입니다.
         · 위치가 직전 정착 때와 똑같으면 스크롤이 끊긴 것이므로 가드를 풀고 평소대로 처리합니다. */
      const target = syncingTo.current;
      if (target !== null) {
        const arrived = Math.abs(top - target) <= 1;
        const stalled = top === settledAt.current;
        settledAt.current = top;
        if (arrived || stalled) syncingTo.current = null;
        if (arrived || !stalled) return;
      }
      settledAt.current = top;

      const raw = Math.round(top / WHEEL.slot);
      if (loop) {
        const value = ((raw % len) + len) % len;
        const canonical = LOOP_MIDDLE * len + value;
        // 멈춘 뒤에 가운데 벌로 되돌립니다 — 같은 목록이라 눈에 보이지 않습니다.
        // 이것도 프로그램 스크롤이라 가드를 걸어 둡니다.
        if (raw !== canonical) {
          syncingTo.current = canonical * WHEEL.slot;
          settledAt.current = -1;
          view.scrollTop = canonical * WHEEL.slot;
        }
        if (value !== index) { selfScroll.current = true; onIndexChange(value); }
      } else {
        const next = Math.min(Math.max(raw, 0), len - 1);
        if (next !== index) { selfScroll.current = true; onIndexChange(next); }
      }
    }, 110);
  }, [paint, index, onIndexChange, len, loop]);

  // 바깥에서 값이 바뀌면 스크롤 위치를 맞춥니다. 첫 그림은 애니메이션 없이.
  const mounted = useRef(false);
  useLayoutEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (selfScroll.current) {
      // 사용자가 직접 돌려서 바뀐 값 — 이미 제자리에 있으므로 그리기만 합니다
      selfScroll.current = false;
      paint();
      return;
    }
    const top = rawIndex * WHEEL.slot;
    if (Math.abs(view.scrollTop - top) > 1) {
      syncingTo.current = top;
      settledAt.current = -1;
      view.scrollTo({ top, behavior: mounted.current ? 'smooth' : 'auto' });
    }
    mounted.current = true;
    paint();
  }, [rawIndex, paint]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const takeOver = () => {
    syncingTo.current = null;
    settledAt.current = -1;
  };

  return (
    <div
      ref={viewRef}
      className="bd-ym-wheel__col"
      style={{ width }}
      data-align={align}
      role="listbox"
      aria-label={ariaLabel}
      tabIndex={0}
      onScroll={handleScroll}
      /* 사용자가 직접 잡으면 프로그램 스크롤 가드를 즉시 풉니다 —
         안 그러면 따라가던 스크롤이 끝날 때까지 사용자의 조작이 먹히지 않습니다. */
      onPointerDown={takeOver}
      onWheel={takeOver}
      onTouchStart={takeOver}
      onKeyDown={(e) => {
        takeOver();
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault();
        const step = e.key === 'ArrowDown' ? 1 : -1;
        onIndexChange(loop ? (((index + step) % len) + len) % len : Math.min(Math.max(index + step, 0), len - 1));
      }}
    >
      <div className="bd-ym-wheel__pad" />
      {slots.map((v, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="bd-ym-wheel__item"
          role="option"
          aria-selected={i === rawIndex}
          onClick={() => onIndexChange(loop ? i % len : i)}
        >
          {format(v)}
        </div>
      ))}
      <div className="bd-ym-wheel__pad" />
    </div>
  );
}

export interface YearMonthWheelProps {
  /** 가운데에 오는 연도 */
  year?: number;
  /** 가운데에 오는 달 (1~12) */
  month?: number;
  onChange?: (year: number, month: number) => void;
  /** 고를 수 있는 연도 범위 */
  minYear?: number;
  maxYear?: number;
  className?: string;
}

/**
 * 연·월을 고르는 **휠**입니다. 328×254px.
 *
 * **마우스 휠·트랙패드로 돌릴 수 있습니다.** 네이티브 스크롤 + `scroll-snap` 을 쓰기 때문에
 * 트랙패드의 관성과 감속이 그대로 살아 있고, 멈추면 항목에 달라붙습니다.
 * 항목을 클릭하거나 ↑↓ 키로도 고를 수 있습니다.
 *
 * ⚠️ **연도와 월은 따로 돕니다** — Figma 진열이 그렇게 되어 있습니다(3장 참고).
 *
 * 스펙 원본: `components/date-time-picker/year-month-wheel/year-month-wheel.md`
 */
export function YearMonthWheel({
  year,
  month,
  onChange,
  minYear,
  maxYear,
  className,
}: YearMonthWheelProps) {
  const now = new Date();
  const [innerYear, setInnerYear] = useState(year ?? now.getFullYear());
  const [innerMonth, setInnerMonth] = useState(month ?? now.getMonth() + 1);
  const shownYear = year ?? innerYear;
  const shownMonth = month ?? innerMonth;

  /* ⚠️ 연도 목록은 **고정돼 있어야 합니다.**
     범위를 현재 선택값에서 파생시키면(예: `year − 60 … year + 20`) 연도를 고를 때마다
     목록 전체가 밀려서 같은 연도의 위치가 달라지고, 스크롤이 엉뚱한 칸으로 튑니다.
     그래서 "오늘"을 기준으로 한 번 정하고 선택값과 무관하게 유지합니다. */
  const anchor = useRef(now.getFullYear()).current;
  const lo = Math.min(minYear ?? anchor - 100, shownYear);
  const hi = Math.max(maxYear ?? anchor + 20, shownYear);
  const years = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const commit = (y: number, m: number) => {
    if (year === undefined) setInnerYear(y);
    if (month === undefined) setInnerMonth(m);
    onChange?.(y, m);
  };

  return (
    <div className={['bd-ym-wheel', className].filter(Boolean).join(' ')}>
      {/* 가운데 선택 알약 — 두 열 뒤에 깔립니다 */}
      <div className="bd-ym-wheel__pill" aria-hidden="true" />
      <div className="bd-ym-wheel__cols">
        <WheelColumn
          values={years}
          index={Math.max(years.indexOf(shownYear), 0)}
          onIndexChange={(i) => commit(years[i], shownMonth)}
          format={(v) => `${v}년`}
          align="center"
          width={80}
          ariaLabel="연도"
        />
        <WheelColumn
          values={months}
          index={shownMonth - 1}
          onIndexChange={(i) => commit(shownYear, months[i])}
          format={(v) => `${v}월`}
          align="left"
          width={40}
          ariaLabel="월"
          loop
        />
      </div>
    </div>
  );
}

export type DatePickerState = 'default' | 'wheel';

export interface DatePickerProps {
  /** `default` = 달력 그리드 · `wheel` = 연/월 휠.
   *  **주지 않으면** 제목 옆 화살표로 직접 여닫습니다 */
  state?: DatePickerState;
  /** 하단 시:분 스테퍼 섹션 */
  showTimePicker?: boolean;

  /* ---- 실제 달력으로 동작시킬 때 쓰는 값들 ---- */
  /** 보여줄 연도. 주면 외부가 제어하고, 안 주면 화살표로 내부에서 넘깁니다 */
  year?: number;
  /** 보여줄 달 (1~12) */
  month?: number;
  /** 처음 보여줄 연도 (비제어) */
  defaultYear?: number;
  /** 처음 보여줄 달 (비제어, 1~12) */
  defaultMonth?: number;
  /** 선택된 날짜. 주면 외부가 제어합니다 */
  value?: Date | null;
  /** 처음 선택된 날짜 (비제어) */
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  onMonthChange?: (year: number, month: number) => void;
  /** `current`(테두리 셀)로 표시할 오늘. `null` 이면 표시하지 않습니다 */
  today?: Date | null;

  /* ---- 변형 진열용 고정값 ---- */
  /** ⚠️ 주면 연·월 계산 대신 이 격자를 그대로 그립니다 (스토리 진열용) */
  weeks?: WeekCell[][];
  /** ⚠️ 주면 연·월에서 만든 라벨 대신 이 글자를 씁니다 (스토리 진열용) */
  label?: string;

  /** Group 안에서는 헤더 구성이 좌우 비대칭이 됩니다 */
  headerWith?: CalendarHeaderWith;
  headerShowDropdown?: boolean;
  className?: string;
}

/**
 * 달력 + 시간 선택을 한 패널에 담은 **패밀리 플래그십**입니다. **4개 변형**(전수 실측). 352px 고정 폭.
 *
 * **실제 달력으로 동작합니다.** `weeks` 를 주지 않으면 연·월로 진짜 날짜 격자를 계산하고,
 * 헤더 화살표로 달을 넘기고 날짜를 눌러 고를 수 있습니다. 오늘은 `current`, 고른 날짜는
 * `pinned` 로 그려집니다. 날짜 규칙은 `Calendar/calendar-data.ts` 의 순수 함수에 있습니다.
 *
 * 레이아웃: Calendar Header(56px 고정) → 달력 그리드 또는 휠 → (선택) 구분선 + Time Picker Group.
 *
 * 스펙 원본: `components/date-time-picker/date-picker/date-picker.md`
 */
export function DatePicker({
  state,
  showTimePicker = false,
  label,
  weeks,
  year,
  month,
  defaultYear,
  defaultMonth,
  value,
  defaultValue = null,
  onChange,
  onMonthChange,
  today = new Date(),
  headerWith,
  headerShowDropdown = true,
  className,
}: DatePickerProps) {
  const base = today ?? new Date();
  // 연·월을 주지 않으면 내부에서 들고 있습니다(화살표로 넘길 수 있게)
  const [cursor, setCursor] = useState(() => ({
    year: defaultYear ?? base.getFullYear(),
    month: defaultMonth ?? base.getMonth() + 1,
  }));
  const shownYear = year ?? cursor.year;
  const shownMonth = month ?? cursor.month;

  // 선택 날짜도 주지 않으면 내부 상태를 씁니다
  const [picked, setPicked] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : picked;

  // state 를 주지 않으면 제목 옆 화살표로 휠을 여닫습니다
  const [wheelOpen, setWheelOpen] = useState(false);
  const effState: DatePickerState = state ?? (wheelOpen ? 'wheel' : 'default');

  const goMonth = (delta: number) => {
    const next = addMonths(shownYear, shownMonth, delta);
    if (year === undefined && month === undefined) setCursor(next);
    onMonthChange?.(next.year, next.month);
  };
  const selectDate = (date: Date) => {
    if (value === undefined) setPicked(date);
    onChange?.(date);
  };

  /* weeks 를 직접 주면 그 값을 그대로 그립니다(변형 진열용).
     주지 않으면 연·월로 실제 날짜를 계산합니다. */
  const grid =
    weeks ??
    buildMonthWeeks(shownYear, shownMonth, { today, selected, onSelect: selectDate });

  return (
    <div className={['bd-date-picker', className].filter(Boolean).join(' ')} data-state={effState}>
      <CalendarHeader
        title="left"
        /* 휠이 열려 있으면 `headerWith` 와 무관하게 닫기 버튼입니다 (Figma: State=Wheel → With=Close).
           Group 은 패널마다 `headerWith` 를 고정해 넘기는데, 그 값이 휠 상태까지 덮으면
           휠을 열어 놓고 닫을 방법이 없어집니다. */
        with={effState === 'wheel' ? 'close' : (headerWith ?? 'arrows')}
        showDropdown={headerShowDropdown}
        expanded={effState === 'wheel'}
        label={label ?? formatYearMonth(shownYear, shownMonth)}
        onPrev={() => goMonth(-1)}
        onNext={() => goMonth(1)}
        onToggle={() => setWheelOpen((v) => !v)}
        onClose={() => setWheelOpen(false)}
      />
      <div className="bd-date-picker__body">
        {effState === 'default' ? (
          <>
            <WeekHeader />
            <Month weeks={grid} />
          </>
        ) : (
          <YearMonthWheel
            year={shownYear}
            month={shownMonth}
            onChange={(y, m) => {
              if (year === undefined && month === undefined) setCursor({ year: y, month: m });
              onMonthChange?.(y, m);
            }}
          />
        )}
      </div>
      {showTimePicker && (
        <>
          <Divider />
          <div className="bd-date-picker__time">
            <TimePickerGroup defaultValue="00:00" />
          </div>
        </>
      )}
    </div>
  );
}

export interface DatePickerGroupProps {
  /** `horizontal` = 좌우 두 달 · `vertical` = 위아래 두 달 */
  type?: 'horizontal' | 'vertical';

  /* ---- 실제 달력으로 동작시킬 때 쓰는 값들 ---- */
  /** **첫 패널**이 보여줄 연도. 다음 패널은 자동으로 그 다음 달입니다 */
  year?: number;
  /** 첫 패널이 보여줄 달 (1~12) */
  month?: number;
  defaultYear?: number;
  defaultMonth?: number;
  /** 기준 달이 움직일 때마다 **첫 패널 기준**으로 알려 줍니다 */
  onMonthChange?: (year: number, month: number) => void;
  /** 선택된 날짜. 두 패널이 **하나를 나눠 씁니다** */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  today?: Date | null;

  /**
   * 패널마다 시:분 스테퍼를 답니다 — 두 패널이 **각자의 시간 값**을 가집니다.
   * `vertical` 에서는 무시됩니다 (부수 화면 없이 달력만 씁니다).
   */
  showTimePicker?: boolean;
  className?: string;
}

/** Figma 가로 그룹은 두 달, 세로 그룹도 두 달입니다 */
const GROUP_PANELS = 2;

/**
 * Date Picker 두 개를 이어 붙여 **연속된 두 달**을 한 번에 보여 줍니다. **2개 변형**(전수 실측).
 * 가로 721×342 · 세로 352×661.
 *
 * ## 두 패널은 독립적이지 않습니다
 *
 * 그룹이 **기준 달 하나**를 들고, 첫 패널이 기준 달을 · 다음 패널이 그 다음 달을 그립니다.
 * 그래서 어느 쪽에서 달을 옮기든(화살표든 휠이든) 둘이 **같이** 움직이고 제목도 함께 바뀝니다.
 * 날짜 선택도 하나를 나눠 쓰므로, 9월 패널에서 고르든 10월 패널에서 고르든 같은 값이 됩니다.
 *
 * ## 두 변형이 서로 꽤 다릅니다
 *
 * | | Horizontal | Vertical |
 * |---|---|---|
 * | 제목 | `2000년 1월` | **`1월`** — 연도 없음 |
 * | 제목 옆 펼침 화살표 | 양쪽 다 있음 | 없음 |
 * | 연·월 휠 | 패널마다 따로 열림 | 없음 |
 * | 이전/다음 화살표 | **마지막 패널에만** | 없음 |
 * | Time Picker | 패널마다 따로 | 없음 |
 * | 패널 크기 | 360px · 달력 여백 16 | 352px · 달력 여백 세로 8 / 가로 12 |
 *
 * 세로형은 **특정 상황에서만 쓰는 고정 표시**라 부수 화면이 전부 빠져 있습니다(사용자 확인).
 *
 * 스펙 원본: `components/date-time-picker/date-picker-group/date-picker-group.md`
 */
export function DatePickerGroup({
  type = 'horizontal',
  year,
  month,
  defaultYear,
  defaultMonth,
  onMonthChange,
  value,
  defaultValue = null,
  onChange,
  today = new Date(),
  showTimePicker = false,
  className,
}: DatePickerGroupProps) {
  const base = today ?? new Date();
  /* 두 패널이 **기준 달 하나**를 나눠 씁니다 — 패널 i 는 기준 달 + i 개월. */
  const [cursor, setCursor] = useState(() => ({
    year: defaultYear ?? base.getFullYear(),
    month: defaultMonth ?? base.getMonth() + 1,
  }));
  const shownYear = year ?? cursor.year;
  const shownMonth = month ?? cursor.month;

  const [picked, setPicked] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : picked;

  const vertical = type === 'vertical';
  const panels = Array.from({ length: GROUP_PANELS }, (_, i) => addMonths(shownYear, shownMonth, i));

  /**
   * 패널이 "이제 이 달을 보여주고 싶다" 고 알려오면 **그 패널의 자리만큼 빼서** 기준 달을 옮깁니다.
   * 화살표든 휠이든 똑같이 이 길로 들어오므로, 어느 쪽을 건드려도 둘이 같은 간격을 유지한 채 따라옵니다.
   */
  const moveTo = (index: number, y: number, m: number) => {
    const next = addMonths(y, m, -index);
    if (year === undefined && month === undefined) setCursor(next);
    onMonthChange?.(next.year, next.month);
  };

  const selectDate = (date: Date) => {
    if (value === undefined) setPicked(date);
    onChange?.(date);
  };

  return (
    <div className={['bd-date-picker-group', className].filter(Boolean).join(' ')} data-type={type}>
      {panels.map((panel, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <Divider type={vertical ? 'horizontal' : 'vertical'} color="var(--sys-color-neutral-200)" />
          )}
          <DatePicker
            year={panel.year}
            month={panel.month}
            value={selected}
            today={today}
            onChange={selectDate}
            onMonthChange={(y, m) => moveTo(i, y, m)}
            /* 이전/다음 화살표는 **마지막 패널에만** 답니다(Figma). 하나만 있어도 둘이 같이 움직이므로
               패널마다 달면 같은 일을 하는 화살표가 두 벌 생깁니다. 세로형은 아예 없습니다. */
            headerWith={!vertical && i === GROUP_PANELS - 1 ? 'arrows' : 'nothing'}
            /* 가로형은 양쪽 다 제목을 눌러 각자의 휠을 엽니다. 세로형은 휠이 없습니다. */
            headerShowDropdown={!vertical}
            /* 세로형만 연도를 빼고 달만 씁니다 (Figma "1월"/"2월") */
            label={vertical ? formatMonth(panel.month) : undefined}
            showTimePicker={!vertical && showTimePicker}
          />
        </Fragment>
      ))}
    </div>
  );
}
