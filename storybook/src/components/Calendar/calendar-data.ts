/* ============================================================
   달력 데이터 — 연·월로 실제 날짜 격자를 만드는 순수 함수들입니다.

   `Week` · `Month` · `DateCell` 은 전부 "그리기만 하는" 컴포넌트라,
   무엇을 그릴지는 여기서 계산해 `WeekCell[][]` 로 넘깁니다.
   컴포넌트와 분리해 둔 이유는 날짜 규칙만 따로 검증·재사용하기 위해서입니다.
   ============================================================ */
import type { DateCellType } from '../DateCell/DateCell';
import type { WeekCell } from './Calendar';

/** 요일 순서는 Week Header 와 같은 **일요일 시작**입니다 */
export const WEEK_START_DAY = 0;

/** 그 달의 날수. `new Date(year, month, 0)` 은 "month 의 0일" = 이전 달 마지막 날입니다 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** 1일이 무슨 요일인지 (0=일 … 6=토) */
export function firstWeekday(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

/** 달 이동. month 는 1~12 이고 넘치면 연도가 함께 바뀝니다 */
export function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const zero = year * 12 + (month - 1) + delta;
  return { year: Math.floor(zero / 12), month: (zero % 12) + 1 };
}

/** Calendar Header 의 라벨 형식 */
export function formatYearMonth(year: number, month: number): string {
  return `${year}년 ${month}월`;
}

/** 연도를 뺀 달만. Date Picker Group 의 Vertical 이 이 형식을 씁니다(Figma "1월"/"2월"). */
export function formatMonth(month: number): string {
  return `${month}월`;
}

/** 시·분을 버리고 날짜만 비교합니다 */
export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export interface MonthGridOptions {
  /** 오늘 — `current`(테두리만 있는 셀)로 표시합니다. `null` 이면 표시하지 않습니다 */
  today?: Date | null;
  /** 사용자가 찍은 **한 날짜** — `pinned`(파란 배경 + 흰 글자) */
  selected?: Date | null;
  /** 기간의 시작·끝. **양끝은 둘 다 `pinned`**, 그 사이만 `selected` 입니다 */
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  /** 선택 가능 범위 밖은 Disabled 로 그립니다 */
  min?: Date | null;
  max?: Date | null;
  onSelect?: (date: Date) => void;
}

/**
 * 한 달의 날짜 격자를 만듭니다.
 *
 * - 1일 앞과 마지막 날 뒤의 빈 칸은 Figma 의 `Null` 타입(문자 그대로 빈 칸)으로 채웁니다.
 *   **이전·다음 달 날짜를 흐리게 보여주는 방식이 아닙니다** — Figma 에 그런 변형이 없습니다.
 * - Type 우선순위: `pinned` > `selected`(기간 사이) > `current`(오늘) > `default`.
 *   Figma 의 Type 은 하나만 고를 수 있는 축이라 겹치면 위 순서로 정합니다.
 *   `pinned` 가 `current` 를 이기는 건 Figma 주석에 그대로 적혀 있습니다 —
 *   *"오늘날짜를 선택해도 pinned로 바뀜"*. 반대로 **다른 날을 찍어도 오늘의 테두리는 남습니다**
 *   (`2612:15726` 에 Pinned 와 Current 가 같이 찍혀 있습니다).
 *   ⚠️ **기간 안에 든 오늘**만은 `current` 테두리를 잃습니다 — Figma 에 그 조합의 예시가 없어
 *   위 우선순위로 정한 것입니다(디자이너 확인 필요).
 * - 주(週) 수는 그 달이 실제로 차지하는 만큼입니다 — **4·5·6주 모두 나옵니다.**
 *   Figma 의 Month 에는 `Week Number=5/6` 만 있지만, 평년 2월이 일요일에 시작하면
 *   4주로 끝납니다(예: 2026년 2월). 그럴 땐 **그대로 4줄로 그립니다**(디자이너 확인, 2026-09-15).
 *   빈 줄로 5주를 맞추지 않으므로 그런 달에는 패널이 그만큼 짧아집니다.
 */
export function buildMonthWeeks(year: number, month: number, options: MonthGridOptions = {}): WeekCell[][] {
  const { today = new Date(), selected, rangeStart, rangeEnd, min, max, onSelect } = options;
  const lead = firstWeekday(year, month);
  const total = daysInMonth(year, month);
  const blank = (): WeekCell => ({ type: 'null' });

  /* 거꾸로 잡힌 기간(끝 < 시작)도 그대로 받아 바로 세웁니다 —
     드래그나 두 번째 클릭이 앞 날짜로 떨어지는 건 정상적인 입력이라 오류로 보지 않습니다. */
  const [from, to] =
    rangeStart && rangeEnd && startOfDay(rangeEnd) < startOfDay(rangeStart)
      ? [rangeEnd, rangeStart]
      : [rangeStart, rangeEnd];

  const cells: WeekCell[] = Array.from({ length: lead }, blank);

  for (let day = 1; day <= total; day++) {
    const date = new Date(year, month - 1, day);
    const t = startOfDay(date);
    const disabled = (min != null && t < startOfDay(min)) || (max != null && t > startOfDay(max));

    let type: DateCellType = 'default';
    /* 기간의 **양끝은 둘 다 pinned** 입니다. `selected` 는 그 사이에만 씁니다 —
       Figma 주석: *"selected는 무조건 기간 사이 선택 시 적용됨"*. */
    if (isSameDay(date, selected) || isSameDay(date, from) || isSameDay(date, to)) type = 'pinned';
    else if (from && to && t > startOfDay(from) && t < startOfDay(to)) type = 'selected';
    else if (isSameDay(date, today)) type = 'current';

    cells.push({
      label: String(day),
      type,
      disabled,
      onClick: disabled || !onSelect ? undefined : () => onSelect(date),
    });
  }

  while (cells.length % 7 !== 0) cells.push(blank());

  const weeks: WeekCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** 한 주(週) 뒤에 까는 **기간 띠**의 가로 범위. 칸 번호(0=일 … 6=토) 기준입니다 */
export interface WeekRangeBand {
  /** 띠가 덮는 첫 칸 */
  from: number;
  /** 띠가 덮는 마지막 칸 */
  to: number;
  /** `from` 칸이 기간의 **시작 앵커(pinned)** 라 띠가 그 칸 **중앙**에서 시작하는가 */
  fromHalf: boolean;
  /** `to` 칸이 기간의 **끝 앵커(pinned)** 라 띠가 그 칸 **중앙**에서 끝나는가 */
  toHalf: boolean;
}

/**
 * 한 주 행의 셀 종류만 보고 **그 줄에 깔 기간 띠**를 구합니다.
 *
 * 기간은 칸마다 따로 칠하는 게 아니라 **줄마다 사각형 하나**입니다 — Figma 도 그렇게 그려져
 * 있습니다(`Month` 프레임 안에 Week 인스턴스들과 나란히 `Rectangle` 이 깔려 있고, z-순서상
 * 항상 Week 보다 **뒤**입니다). 칸 사이 8px 을 메워야 기간이 한 덩어리로 읽히기 때문입니다.
 *
 * 양끝 처리가 핵심입니다 (Figma 실측 7개 사각형 전수 일치):
 *
 * | 줄의 상황 | 왼쪽 끝 | 오른쪽 끝 |
 * |---|---|---|
 * | 그 줄에 앵커(pinned)가 있다 | 앵커 칸의 **중앙** | 앵커 칸의 **중앙** |
 * | 기간이 줄을 가로질러 지나간다 | 첫 칸의 **왼쪽 변** | 마지막 칸의 **오른쪽 변** |
 *
 * 그래서 가운데 줄은 `0 → 328`(줄 전체)이고, 앵커가 있는 줄만 그 칸 중앙에서 잘립니다.
 * 앵커 칸은 Pinned(진한 파란 원)라 띠가 원의 중앙에서 나오는 것처럼 보입니다.
 *
 * 띠가 필요한지는 **`selected` 칸이 있는지**로 판단합니다 — `selected` 는 기간 사이에만 쓰이므로
 * 혼자 찍힌 `pinned`(단일 선택)에는 띠가 생기지 않습니다. 단, 이틀짜리 기간이 한 줄에 나란히
 * 붙으면 사이 칸이 없어 `selected` 가 하나도 없으므로, **한 줄에 pinned 가 둘이면** 그 사이를 잇습니다.
 */
export function weekRangeBand(cells: WeekCell[]): WeekRangeBand | null {
  const typeAt = (i: number): DateCellType => cells[i]?.type ?? 'null';
  const inner: number[] = [];
  const pins: number[] = [];
  for (let i = 0; i < 7; i++) {
    if (typeAt(i) === 'selected') inner.push(i);
    else if (typeAt(i) === 'pinned') pins.push(i);
  }

  if (inner.length === 0) {
    // 사이 칸이 없는 이틀짜리 기간. pinned 가 하나뿐이면 단일 선택이라 띠가 없습니다.
    if (pins.length < 2) return null;
    return { from: pins[0], to: pins[pins.length - 1], fromHalf: true, toHalf: true };
  }

  const lo = inner[0];
  const hi = inner[inner.length - 1];
  const fromHalf = lo > 0 && typeAt(lo - 1) === 'pinned';
  const toHalf = hi < 6 && typeAt(hi + 1) === 'pinned';
  return { from: fromHalf ? lo - 1 : lo, to: toHalf ? hi + 1 : hi, fromHalf, toHalf };
}

/** 기간 선택 값. 첫 클릭 뒤에는 `end` 가 `null` 인 **반쯤 잡힌 기간**이 됩니다 */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export const EMPTY_RANGE: DateRange = { start: null, end: null };

/**
 * 기간 선택에서 날짜 하나를 눌렀을 때의 **다음 기간**을 구합니다.
 *
 * | 지금 상태 | 누르면 |
 * |---|---|
 * | 비어 있음 | 시작만 잡힘 (`pinned` 하나) |
 * | 시작만 잡힘 | 끝이 잡혀 기간 완성 — 앞 날짜를 누르면 **뒤집어** 시작/끝을 바로 세웁니다 |
 * | 시작·끝 다 잡힘 | 처음부터 다시 — 누른 날짜가 새 시작 |
 *
 * ⚠️ Figma(`2612:16030`)는 **결과 상태**만 보여 줍니다 — 몇 번째 클릭에 무엇이 되는지는
 * 규정돼 있지 않아 위 흐름은 통상적인 기간 선택 방식으로 정한 것입니다(디자이너 확인 필요).
 * 확정된 건 *"pinned 된 두 날짜 사이에 selected"* 라는 **결과**뿐입니다.
 */
export function nextRange(current: DateRange | null | undefined, date: Date): DateRange {
  const start = current?.start ?? null;
  const end = current?.end ?? null;
  if (!start || end) return { start: date, end: null };
  return startOfDay(date) < startOfDay(start) ? { start: date, end: start } : { start, end: date };
}
