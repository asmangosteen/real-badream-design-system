import { DateCell, type DateCellProps } from '../DateCell/DateCell';
import { weekRangeBand } from './calendar-data';
import './Calendar.css';

/**
 * 한 칸의 설정입니다. **[Date](../DateCell/DateCell.tsx) 의 속성을 그대로 받습니다** —
 * `forceState`(진열용 강제 hover/pressed)처럼 달력이 직접 안 쓰는 것까지 전부 넘어갑니다.
 * `label` 은 `children` 의 지름길입니다.
 */
export interface WeekCell extends Omit<DateCellProps, 'children'> {
  label?: React.ReactNode;
}

export interface WeekProps {
  /** 7개 셀(일~토). 모자라면 빈 칸으로 채웁니다 */
  cells?: WeekCell[];
  className?: string;
}

/**
 * 달력의 **한 주(週) 행**입니다. `Date` 셀 7개를 가로로 배열합니다.
 * 변형 축이 없는 단일 인스턴스이며, 328×40px 고정입니다 (= 40×7 + 8×6).
 *
 * 기간(range)이 이 줄을 지나면 셀 **뒤에 사각형 띠 하나**를 깝니다 — 칸 사이 8px 을 메워야
 * 기간이 한 덩어리로 읽히기 때문입니다. 어디서 시작해 어디서 끊을지는
 * `weekRangeBand` 가 셀 종류만 보고 정합니다(규칙은 그 함수의 주석에).
 *
 * 스펙 원본: `components/date-time-picker/week/week.md`
 */
export function Week({ cells = [], className }: WeekProps) {
  const filled: WeekCell[] = Array.from({ length: 7 }, (_, i) => cells[i] ?? { type: 'null' });
  const band = weekRangeBand(filled);
  return (
    <div className={['bd-week', className].filter(Boolean).join(' ')} role="row">
      {band && (
        <span
          className="bd-week__range"
          aria-hidden="true"
          style={
            {
              '--bd-range-from': band.from,
              '--bd-range-to': band.to,
              '--bd-range-from-half': band.fromHalf ? 1 : 0,
              '--bd-range-to-half': band.toHalf ? 1 : 0,
            } as React.CSSProperties
          }
        />
      )}
      {filled.map(({ label, ...cell }, i) => (
        <DateCell key={i} {...cell}>
          {label}
        </DateCell>
      ))}
    </div>
  );
}

const DAYS = [
  { key: 'sun', label: '일' },
  { key: 'mon', label: '월' },
  { key: 'tue', label: '화' },
  { key: 'wed', label: '수' },
  { key: 'thu', label: '목' },
  { key: 'fri', label: '금' },
  { key: 'sat', label: '토' },
] as const;

export interface WeekHeaderProps {
  className?: string;
}

/**
 * 달력 최상단 **요일 라벨 행**입니다. 328×22px 고정.
 *
 * **일요일만 빨강으로 강조되고, 토요일은 평일과 같은 회색**입니다 —
 * 토요일을 파랑으로 강조하는 흔한 관례와 다릅니다.
 *
 * 텍스트가 하드코딩이라 Figma 에는 교체 슬롯이 없습니다.
 *
 * 스펙 원본: `components/date-time-picker/week-header/week-header.md`
 */
export function WeekHeader({ className }: WeekHeaderProps) {
  return (
    <div className={['bd-week-header', className].filter(Boolean).join(' ')} role="row">
      {DAYS.map((d) => (
        <span key={d.key} className="bd-week-header__cell" data-day={d.key} role="columnheader">
          {d.label}
        </span>
      ))}
    </div>
  );
}

export interface MonthProps {
  /** 주(週) 행 목록. Figma 정의 범위는 **5개 또는 6개**입니다 */
  weeks: WeekCell[][];
  /** 각 [Week](#week) 행에 그대로 넘어갑니다(README 규칙 11) */
  weekProps?: Partial<WeekProps>;
  className?: string;
}

/**
 * 한 달의 날짜를 담는 **달력 그리드 본체**입니다. `Week` 를 5~6개 세로로 쌓습니다.
 *
 * **Week Header(요일 라벨)를 포함하지 않습니다** — 순수하게 날짜 행들의 스택입니다.
 * 높이: 5주 **224px** (40×5 + 6×4) · 6주 **270px** (40×6 + 6×5).
 *
 * > 높이는 애니메이션 없이 즉시 바뀝니다 (사용자 확인).
 *
 * 스펙 원본: `components/date-time-picker/month/month.md`
 */
export function Month({ weeks, weekProps, className }: MonthProps) {
  return (
    <div className={['bd-month', className].filter(Boolean).join(' ')} data-week-number={weeks.length} role="rowgroup">
      {weeks.map((cells, i) => (
        <Week key={i} cells={cells} {...weekProps} />
      ))}
    </div>
  );
}
