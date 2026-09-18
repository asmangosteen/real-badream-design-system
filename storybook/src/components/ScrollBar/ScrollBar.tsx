import type { CSSProperties } from 'react';
import './ScrollBar.css';

export type ScrollBarType = 'vertical' | 'horizontal';
/** Figma `Position` 축. **상태 3단계가 아니라 스크롤 진행률 0% / 50% / 100% 예시**입니다 */
export type ScrollBarPosition = 'top' | 'middle' | 'bottom';

/** Figma Position 축 → 스크롤 진행률(0~1) */
const POSITION_PROGRESS: Record<ScrollBarPosition, number> = { top: 0, middle: 0.5, bottom: 1 };

/**
 * thumb 최소 길이(px).
 *
 * ⚠️ Figma 에 없는 값입니다 — 2026-09-18 디자이너 지시가 출처입니다.
 * 두께 6px 의 4배이며, 목록이 길 때 thumb 이 두께와 비슷해져 막대가 아니라
 * 동그라미로 보이는 것을 막습니다.
 */
export const SCROLLBAR_MIN_THUMB = 24;

/** Figma 실측 비율(트랙 180px : thumb 60px). **고정 규격이 아니라 "3페이지 분량" 예시값**입니다 */
const DEFAULT_RATIO = 1 / 3;

export interface ScrollBarProps {
  /** 스크롤 방향 */
  type?: ScrollBarType;
  /**
   * Figma `Position` 축. 진행률 0% / 50% / 100% 예시입니다.
   *
   * **Horizontal 에서는 `top`=왼쪽 끝 · `bottom`=오른쪽 끝**을 뜻합니다(Figma 변형 이름 그대로).
   */
  position?: ScrollBarPosition;
  /** 스크롤 진행률 `0`~`1`. 주면 `position` 대신 이 값을 씁니다 — 실제 서비스는 이쪽을 씁니다 */
  progress?: number;
  /** 보이는 영역 ÷ 전체 콘텐츠 (`0`~`1`). thumb 길이를 정합니다. 최소 24px 는 CSS 가 보장합니다 */
  ratio?: number;
  /** 보임 여부. 스크롤 중에만 `true` 로 두면 됩니다 — `useScrollIndicator` 가 대신 계산해 줍니다 */
  visible?: boolean;
  className?: string;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * 스크롤 가능한 영역의 현재 위치를 보여주는 **순수 표시용 인디케이터**입니다.
 *
 * - **드래그할 수 없습니다** — `pointer-events: none` · `aria-hidden` (디자이너 확정).
 *   밑에 깔린 콘텐츠의 터치를 가로채지 않습니다.
 * - `position: absolute` 로 스크롤 영역 위에 **겹쳐 놓습니다.**
 *   ⚠️ 부모는 `position: relative` 이면서 **스크롤하지 않는 래퍼**여야 합니다 —
 *   스크롤 컨테이너 안에 두면 콘텐츠와 함께 밀려 올라가 사라집니다.
 * - 트랙에 배경이 없어 **thumb 만 보입니다.**
 *
 * 여백은 CSS 변수로 열려 있습니다 — `--bd-scrollbar-offset`(고정되는 변, 기본 2px) ·
 * `--bd-scrollbar-inset`(나머지 두 변, 기본 0). **나머지 두 변은 감싸는 컴포넌트가 정합니다.**
 *
 * 스펙 원본: `components/scroll-bar/scroll-bar.md`
 */
export function ScrollBar({
  type = 'vertical',
  position = 'top',
  progress,
  ratio = DEFAULT_RATIO,
  visible = true,
  className,
}: ScrollBarProps) {
  const p = clamp01(progress ?? POSITION_PROGRESS[position]);

  return (
    <div
      aria-hidden="true"
      className={['bd-scrollbar', className].filter(Boolean).join(' ')}
      data-type={type}
      data-position={position}
      data-visible={visible}
      style={
        {
          '--bd-sb-progress': p,
          '--bd-sb-ratio': clamp01(ratio),
        } as CSSProperties
      }
    >
      <span className="bd-scrollbar__thumb" />
    </div>
  );
}
