import { DateCell, type DateCellType } from '../DateCell/DateCell';
import './Calendar.css';

export interface WeekCell {
  label?: React.ReactNode;
  type?: DateCellType;
  disabled?: boolean;
  onClick?: () => void;
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
 * 스펙 원본: `components/date-time-picker/week/week.md`
 */
export function Week({ cells = [], className }: WeekProps) {
  const filled: WeekCell[] = Array.from({ length: 7 }, (_, i) => cells[i] ?? { type: 'null' });
  return (
    <div className={['bd-week', className].filter(Boolean).join(' ')} role="row">
      {filled.map((c, i) => (
        <DateCell key={i} type={c.type} disabled={c.disabled} onClick={c.onClick}>
          {c.label}
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
export function WeekHeader({ className }: { className?: string }) {
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
export function Month({ weeks, className }: MonthProps) {
  return (
    <div className={['bd-month', className].filter(Boolean).join(' ')} data-week-number={weeks.length} role="rowgroup">
      {weeks.map((cells, i) => (
        <Week key={i} cells={cells} />
      ))}
    </div>
  );
}
