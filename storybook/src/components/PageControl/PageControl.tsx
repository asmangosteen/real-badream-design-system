import './PageControl.css';

export type PageControlType = 'on-light' | 'on-dark';

/** Dots=8+ 는 8개 슬롯에 9페이지 이상을 압축 표현하는 특수 모드입니다 */
export type PageControlDots = 2 | 3 | 4 | 5 | 6 | 7 | '8+';

/**
 * Dots=8+ 일 때 각 슬롯의 반지름을 계산합니다.
 * 실측 결과: Selection 1~4 → `4,4,4,4,4,4,3,2` / Selection 5~8 → `2,3,4,4,4,4,4,4`
 * (축소 방향이 Selection=5 부터 좌측으로 넘어갑니다 — 사용자 확인 완료)
 */
export function overflowRadii(selection: number): number[] {
  return selection <= 4 ? [4, 4, 4, 4, 4, 4, 3, 2] : [2, 3, 4, 4, 4, 4, 4, 4];
}

export interface PageControlProps {
  /** 배경 밝기에 따른 도트 색 팔레트 */
  type?: PageControlType;
  /** 전체 페이지 수. `'8+'` 는 9페이지 이상을 8개 슬롯으로 압축합니다 */
  dots?: PageControlDots;
  /** 현재 페이지 (1부터 시작) */
  selection?: number;
  className?: string;
}

/**
 * 캐러셀·온보딩에서 현재 페이지 위치를 원형 도트로 표시하는 인디케이터입니다.
 *
 * **State 축이 없고, 도트는 클릭할 수 없습니다** (사용자 확인된 순수 표시용 컴포넌트).
 *
 * 스펙 원본: `components/page-control/page-control.md`
 */
export function PageControl({
  type = 'on-light',
  dots = 5,
  selection = 1,
  className,
}: PageControlProps) {
  const count = dots === '8+' ? 8 : dots;
  const clamped = Math.min(Math.max(selection, 1), count);
  const radii = dots === '8+' ? overflowRadii(clamped) : Array(count).fill(4);

  return (
    <div
      className={['bd-page-control', className].filter(Boolean).join(' ')}
      data-type={type}
      data-dots={String(dots)}
      role="group"
      aria-label={`${count}페이지 중 ${clamped}페이지`}
    >
      {radii.map((r, i) => (
        <span className="bd-page-control__slot" key={i}>
          <span
            className="bd-page-control__dot"
            data-selected={i + 1 === clamped}
            style={{ width: r * 2, height: r * 2 }}
          />
        </span>
      ))}
    </div>
  );
}
