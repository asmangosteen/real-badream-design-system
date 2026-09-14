import './Divider.css';

export const DIVIDER_SIZES = [1, 2, 4, 6, 8, 10, 12, 14] as const;
export type DividerSize = (typeof DIVIDER_SIZES)[number];
export type DividerType = 'horizontal' | 'vertical';

export interface DividerProps {
  /** 방향. Horizontal 은 너비가, Vertical 은 높이가 부모를 꽉 채웁니다 */
  type?: DividerType;
  /** 선의 두께(px). ref-borderwidth 토큰과 1:1 대응합니다 */
  size?: DividerSize;
  /**
   * 선 색상. 기본값은 `neutral/100`(#F6F7F7) 이지만
   * **고정 규칙이 아니라 맥락에 따라 자유롭게 바꿔도 되는 값**입니다 (Footer 가 실사용 예시).
   */
  color?: string;
  className?: string;
}

/**
 * 콘텐츠 영역을 시각적으로 구분하는 선입니다.
 *
 * **Type(2) × Size(8) = 16개 변형.** 색상 축과 State 축이 없습니다.
 *
 * 스펙 원본: `components/divider/divider.md`
 */
export function Divider({ type = 'horizontal', size = 1, color, className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={type}
      className={['bd-divider', className].filter(Boolean).join(' ')}
      data-type={type}
      data-size={size}
      style={color ? { backgroundColor: color } : undefined}
    />
  );
}
