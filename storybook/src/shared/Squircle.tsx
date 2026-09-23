import { useLayoutEffect, useRef } from 'react';
import { getSquirclePath } from './squircle-path';
import './Squircle.css';

/* ============================================================
   Squircle — 컴포넌트의 채우기·테두리·그림자를 Corner Smoothing 곡선으로 그리는 레이어
   ------------------------------------------------------------
   Figma 는 저장소의 모든 컴포넌트에 **Corner smoothing 60%** 를 걸어 둡니다(2026-09-23 적용).
   CSS `border-radius` 는 원호라서 이 곡선을 못 그립니다. 그래서
   figma-squircle 경로를 `clip-path: path()` 로 씌웁니다.

   **왜 컴포넌트 자신이 아니라 이 레이어에 clip-path 를 거는가**
   컴포넌트 요소에 직접 걸면 그 요소가 그리는 것이 전부 잘립니다.
     · 포커스 링(`outline`, 요소 바깥 2px) — 통째로 사라집니다
     · 바깥 그림자(Segmented Control 알약) — 통째로 사라집니다
     · 안쪽 그림자로 그린 테두리 — 모서리에서 끊깁니다
   그래서 컴포넌트는 배경을 칠하지 않고, 첫 자식인 이 레이어가 뒤에 깔려 대신 칠합니다.
     ::before  채우기 (배경색 + hover/pressed 오버레이)  ← squircle 로 자름
     ::after   테두리 (바깥 squircle − 안쪽 squircle)    ← 짝홀 규칙으로 가운데를 뚫음
     레이어    그림자 (`filter: drop-shadow`)             ← 잘린 모양을 따라 그림자가 생김
   포커스 링은 Figma 에 없는 구현 값이라(2026-09-23 결정) 지금처럼 `border-radius` 원호를 유지합니다.

   **쓰는 법** — 컴포넌트 요소의 첫 자식으로 `<Squircle />` 한 줄을 넣고,
   CSS 에서 `.컴포넌트 > .bd-sq { --bd-sq-fill: …; }` 로 색을 넘깁니다(Squircle.css 참고).
   레이어가 부모를 꽉 채우므로(inset: 0) **자기 크기를 재면 곧 부모 크기**이고,
   radius 도 `border-radius: inherit` 로 부모 값을 그대로 받아 옵니다. 넘길 prop 이 없습니다.
   ============================================================ */

/** 마지막으로 계산한 입력값. 같으면 style 을 다시 쓰지 않습니다 */
const lastKey = new WeakMap<HTMLElement, string>();

function px(value: string, basis: number) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return 0;
  return value.trim().endsWith('%') ? (basis * n) / 100 : n;
}

function applySquircle(el: HTMLElement) {
  const cs = getComputedStyle(el);
  // 레이어는 box-sizing 과 무관하게 padding·border 가 0 이라 width/height 가 곧 외곽 크기입니다.
  // offsetWidth 는 정수로 반올림돼 1/3 분할 같은 폭에서 0.5px 틈이 생기므로 쓰지 않습니다.
  const width = parseFloat(cs.width);
  const height = parseFloat(cs.height);
  if (!(width > 0) || !(height > 0)) return; // 숨겨진 동안은 건너뜀 — 보이면 ResizeObserver 가 다시 부릅니다

  const radius = px(cs.borderTopLeftRadius, Math.min(width, height));
  const smoothing = parseFloat(cs.getPropertyValue('--bd-corner-smoothing')) || 0;
  const stroke = parseFloat(cs.getPropertyValue('--bd-sq-stroke-width')) || 0;

  const key = `${width}|${height}|${radius}|${smoothing}|${stroke}`;
  if (lastKey.get(el) === key) return;
  lastKey.set(el, key);

  if (radius <= 0) {
    // 직각이면 곡선이 없습니다 — 폴백(일반 border-radius) 그대로 둡니다
    el.removeAttribute('data-sq');
    return;
  }

  const outer = getSquirclePath({ width, height, cornerRadius: radius, cornerSmoothing: smoothing });
  el.style.setProperty('--bd-sq-fill-path', `path('${outer}')`);

  if (stroke > 0 && width > stroke * 2 && height > stroke * 2) {
    const inner = getSquirclePath({
      width: width - stroke * 2,
      height: height - stroke * 2,
      cornerRadius: Math.max(radius - stroke, 0),
      cornerSmoothing: smoothing,
      x: stroke,
      y: stroke,
    });
    el.style.setProperty('--bd-sq-ring-path', `path(evenodd, '${outer} ${inner}')`);
  } else {
    el.style.setProperty('--bd-sq-ring-path', 'inset(50%)'); // 테두리 없음 — 전부 잘라 냄
  }
  el.setAttribute('data-sq', '');
}

export function Squircle() {
  const ref = useRef<HTMLSpanElement>(null);

  // 부모가 다시 그려질 때마다(Size·Type prop 변경 → radius·크기 변경) 다시 잽니다.
  // 입력이 같으면 lastKey 에서 바로 빠져나가므로 비용이 거의 없습니다.
  useLayoutEffect(() => {
    if (ref.current) applySquircle(ref.current);
  });

  // prop 변경 없이 크기만 바뀌는 경우(부모 폭을 따라 늘어나는 Text Input, 웹폰트 로딩 등)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => applySquircle(el));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className="bd-sq" aria-hidden="true" />;
}
