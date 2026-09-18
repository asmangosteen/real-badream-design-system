import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 스크롤이 멈춘 뒤 스크롤바가 머무는 시간(ms).
 *
 * ⚠️ Figma 에 없는 값입니다 — iOS 기본 스크롤 인디케이터 관례값이며
 * 2026-09-18 디자이너 지시가 출처입니다. 사라질 때의 페이드(300ms)는 CSS 쪽
 * `--bd-motion-scrollbar-fade` 토큰에 있습니다.
 */
export const SCROLLBAR_HOLD_MS = 1000;

export interface ScrollAxisState {
  /** 스크롤 진행률 0~1 */
  progress: number;
  /** 보이는 영역 ÷ 전체 콘텐츠 (0~1) */
  ratio: number;
  /** 이 방향으로 실제 스크롤할 게 있는지 */
  scrollable: boolean;
}

export interface ScrollIndicatorState {
  /** 스크롤 중이면 true, 멈추고 SCROLLBAR_HOLD_MS 가 지나면 false */
  visible: boolean;
  vertical: ScrollAxisState;
  horizontal: ScrollAxisState;
}

const IDLE: ScrollAxisState = { progress: 0, ratio: 1, scrollable: false };

function measure(el: HTMLElement): Omit<ScrollIndicatorState, 'visible'> {
  const maxTop = el.scrollHeight - el.clientHeight;
  const maxLeft = el.scrollWidth - el.clientWidth;
  return {
    vertical: {
      // 나눌 값이 0 이면(스크롤할 게 없으면) 진행률은 0 입니다 — NaN 방지
      progress: maxTop > 0 ? el.scrollTop / maxTop : 0,
      ratio: el.scrollHeight > 0 ? el.clientHeight / el.scrollHeight : 1,
      scrollable: maxTop > 0,
    },
    horizontal: {
      progress: maxLeft > 0 ? el.scrollLeft / maxLeft : 0,
      ratio: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
      scrollable: maxLeft > 0,
    },
  };
}

/**
 * 스크롤 컨테이너에 붙여 `ScrollBar` 에 넘길 값을 계산해 주는 훅입니다.
 *
 * ```tsx
 * const [ref, scroll] = useScrollIndicator<HTMLDivElement>();
 * <div ref={ref} style={{ position: 'relative', overflow: 'auto' }}>
 *   {…}
 *   {scroll.vertical.scrollable && (
 *     <ScrollBar visible={scroll.visible} {...scroll.vertical} />
 *   )}
 * </div>
 * ```
 *
 * **스크롤을 하면 노출되고 멈추면 숨겨집니다** — 스크롤이 이어지는 동안에는
 * 타이머가 계속 초기화되므로 손을 떼기 전까지 사라지지 않습니다.
 *
 * ⚠️ 스크롤바를 스크롤 컨테이너 **안**에 두면 콘텐츠와 함께 밀려 올라갑니다.
 * 위 예시처럼 `position: relative` 인 **컨테이너 자신**에 얹거나, 스크롤 영역을
 * 감싸는 별도 래퍼에 두세요.
 */
export function useScrollIndicator<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<ScrollIndicatorState>({
    visible: false,
    vertical: IDLE,
    horizontal: IDLE,
  });

  /** 값만 다시 재고 보임 상태는 건드리지 않습니다(리사이즈·초기 측정용) */
  const remeasure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setState((prev) => ({ ...prev, ...measure(el) }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      setState({ visible: true, ...measure(el) });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setState((prev) => ({ ...prev, visible: false }));
      }, SCROLLBAR_HOLD_MS);
    };

    remeasure();
    el.addEventListener('scroll', onScroll, { passive: true });

    // 콘텐츠나 컨테이너 크기가 바뀌면 thumb 길이도 달라집니다
    const ro = new ResizeObserver(remeasure);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [remeasure]);

  return [ref, state] as const;
}
