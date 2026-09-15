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
  /** 사용자가 찍은 날짜 — `pinned`(파란 배경 + 흰 글자) */
  selected?: Date | null;
  /** 기간 선택의 시작·끝. 그 사이 날짜는 `selected`(연한 파란 배경) */
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
 * - Type 우선순위: `pinned` > `selected`(기간) > `current`(오늘) > `default`.
 *   Figma 의 Type 은 하나만 고를 수 있는 축이라 겹치면 위 순서로 정합니다.
 *   ⚠️ 그래서 **기간 안에 든 오늘은 `current` 테두리를 잃습니다**(기간 표시를 우선).
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

  const cells: WeekCell[] = Array.from({ length: lead }, blank);

  for (let day = 1; day <= total; day++) {
    const date = new Date(year, month - 1, day);
    const t = startOfDay(date);
    const disabled = (min != null && t < startOfDay(min)) || (max != null && t > startOfDay(max));

    let type: DateCellType = 'default';
    if (isSameDay(date, selected)) type = 'pinned';
    else if (rangeStart && rangeEnd && t >= startOfDay(rangeStart) && t <= startOfDay(rangeEnd)) type = 'selected';
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
