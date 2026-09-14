import './DateCell.css';

export type DateCellType = 'default' | 'current' | 'selected' | 'pinned' | 'null';

export interface DateCellProps {
  /** 표시할 날짜. `null` 타입에서는 무시됩니다 */
  children?: React.ReactNode;
  /**
   * - `current` 오늘 (테두리로만 구분)
   * - `pinned` **사용자가 직접 찍은 날짜** — 범위 선택의 시작/끝 앵커
   * - `selected` **두 Pinned 사이의 구간** 하이라이트
   * - `null` 문자 그대로 빈 칸
   */
  type?: DateCellType;
  /** ⚠️ **`default`·`current` 에서만 유효**합니다. 나머지 Type 에는 Status 축이 없습니다 */
  disabled?: boolean;
  onClick?: () => void;
  forceState?: 'hover' | 'pressed';
  className?: string;
}

/**
 * 달력의 날짜 셀 하나입니다. **11개 변형**(전수 실측).
 * Size 축이 없고 전 변형 **40×40px 원형**입니다.
 *
 * `Pinned`/`Selected`/`Null` 의 의미가 이 컴포넌트가 **기간(range) 선택을 지원**하도록
 * 설계되었음을 보여줍니다 (사용자 확인).
 *
 * 스펙 원본: `components/date-time-picker/date/date.md`
 */
export function DateCell({ children, type = 'default', disabled = false, onClick, forceState, className }: DateCellProps) {
  return (
    <button
      type="button"
      className={['bd-date-cell', className].filter(Boolean).join(' ')}
      data-type={type}
      data-force-state={forceState}
      disabled={disabled || type === 'null'}
      aria-hidden={type === 'null' || undefined}
      onClick={onClick}
    >
      {type === 'null' ? '' : children}
    </button>
  );
}
