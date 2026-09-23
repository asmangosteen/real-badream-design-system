/* ============================================================
   Corner Smoothing(squircle) 경로 계산
   ------------------------------------------------------------
   figma-squircle v1.1.0 알고리즘을 그대로 옮겼습니다.
     Source : https://github.com/phamfoo/figma-squircle (MIT License)
     Math   : https://github.com/MartinRGB/Figma_Squircles_Approximation
     Article: https://www.figma.com/blog/desperately-seeking-squircles/
   디자이너가 넘겨준 `corner-smoothing-preview.html` 에 인라인돼 있던 코드와 같은 버전입니다.

   원본과 다른 점은 **한 가지뿐**입니다 — 경로 시작점을 옮길 수 있게 `x`·`y` 오프셋을 받습니다.
   테두리(Figma `strokeAlign: INSIDE`)를 "바깥 squircle − 안쪽 squircle" 로 그릴 때
   안쪽 경로를 테두리 두께만큼 안으로 밀어야 하기 때문입니다.
   오프셋이 0 이면 원본과 같은 경로입니다(원본은 시작점 M·L 좌표만 반올림하지 않는데,
   여기서는 모든 숫자를 소수 4자리로 맞췄습니다 — 0.0001px 차이라 모양은 같습니다).
   ============================================================ */

interface CornerParams {
  a: number;
  b: number;
  c: number;
  d: number;
  p: number;
  arcSectionLength: number;
  cornerRadius: number;
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** 템플릿 안의 숫자를 소수 4자리로 고정합니다 (원본 `rounded` 태그 함수) */
function rounded(strings: TemplateStringsArray, ...values: Array<number | string>) {
  return strings.reduce((acc, str, i) => {
    const value = values[i];
    if (typeof value === 'number') return acc + str + value.toFixed(4);
    return acc + str + (value ?? '');
  }, '');
}

function getPathParamsForCorner({
  cornerRadius,
  cornerSmoothing,
  roundingAndSmoothingBudget,
}: {
  cornerRadius: number;
  cornerSmoothing: number;
  roundingAndSmoothingBudget: number;
}): CornerParams {
  // preserveSmoothing = false (원본 기본값 · Figma 와 같은 동작)
  // 곡선이 들어갈 자리가 모자라면 smoothing 을 줄여 radius 를 지킵니다.
  // 그래서 radius 가 짧은 변의 절반에 닿는 알약·원은 smoothing 이 0 이 되어 모양이 바뀌지 않습니다.
  const maxCornerSmoothing = roundingAndSmoothingBudget / cornerRadius - 1;
  const smoothing = Math.min(cornerSmoothing, maxCornerSmoothing);
  const p = Math.min((1 + cornerSmoothing) * cornerRadius, roundingAndSmoothingBudget);

  const arcMeasure = 90 * (1 - smoothing);
  const arcSectionLength = Math.sin(toRadians(arcMeasure / 2)) * cornerRadius * Math.sqrt(2);
  const angleAlpha = (90 - arcMeasure) / 2;
  const p3ToP4Distance = cornerRadius * Math.tan(toRadians(angleAlpha / 2));
  const angleBeta = 45 * smoothing;
  const c = p3ToP4Distance * Math.cos(toRadians(angleBeta));
  const d = c * Math.tan(toRadians(angleBeta));
  const b = (p - arcSectionLength - c - d) / 3;
  const a = 2 * b;
  return { a, b, c, d, p, arcSectionLength, cornerRadius };
}

function drawTopRightPath({ cornerRadius, a, b, c, d, p, arcSectionLength }: CornerParams) {
  if (cornerRadius) {
    return rounded`
    c ${a} 0 ${a + b} 0 ${a + b + c} ${d}
    a ${cornerRadius} ${cornerRadius} 0 0 1 ${arcSectionLength} ${arcSectionLength}
    c ${d} ${c}
        ${d} ${b + c}
        ${d} ${a + b + c}`;
  }
  return rounded`l ${p} 0`;
}

function drawBottomRightPath({ cornerRadius, a, b, c, d, p, arcSectionLength }: CornerParams) {
  if (cornerRadius) {
    return rounded`
    c 0 ${a}
      0 ${a + b}
      ${-d} ${a + b + c}
    a ${cornerRadius} ${cornerRadius} 0 0 1 -${arcSectionLength} ${arcSectionLength}
    c ${-c} ${d}
      ${-(b + c)} ${d}
      ${-(a + b + c)} ${d}`;
  }
  return rounded`l 0 ${p}`;
}

function drawBottomLeftPath({ cornerRadius, a, b, c, d, p, arcSectionLength }: CornerParams) {
  if (cornerRadius) {
    return rounded`
    c ${-a} 0
      ${-(a + b)} 0
      ${-(a + b + c)} ${-d}
    a ${cornerRadius} ${cornerRadius} 0 0 1 -${arcSectionLength} -${arcSectionLength}
    c ${-d} ${-c}
      ${-d} ${-(b + c)}
      ${-d} ${-(a + b + c)}`;
  }
  return rounded`l ${-p} 0`;
}

function drawTopLeftPath({ cornerRadius, a, b, c, d, p, arcSectionLength }: CornerParams) {
  if (cornerRadius) {
    return rounded`
    c 0 ${-a}
      0 ${-(a + b)}
      ${d} ${-(a + b + c)}
    a ${cornerRadius} ${cornerRadius} 0 0 1 ${arcSectionLength} -${arcSectionLength}
    c ${c} ${-d}
      ${b + c} ${-d}
      ${a + b + c} ${-d}`;
  }
  return rounded`l 0 ${-p}`;
}

export interface SquirclePathOptions {
  width: number;
  height: number;
  cornerRadius: number;
  /** 0 ~ 1. Figma 의 Corner smoothing 60% = 0.6 */
  cornerSmoothing: number;
  /** 경로 시작점 오프셋 — 원본에 없는 확장입니다. 테두리 안쪽 경로에만 씁니다 */
  x?: number;
  y?: number;
}

/** 네 모서리가 같은 squircle 의 SVG path 문자열 (`clip-path: path()` 에 그대로 넣을 수 있습니다) */
export function getSquirclePath({
  width,
  height,
  cornerRadius,
  cornerSmoothing,
  x = 0,
  y = 0,
}: SquirclePathOptions): string {
  const roundingAndSmoothingBudget = Math.min(width, height) / 2;
  const r = Math.min(cornerRadius, roundingAndSmoothingBudget);
  const params = getPathParamsForCorner({ cornerRadius: r, cornerSmoothing, roundingAndSmoothingBudget });

  // 원본은 M·L 만 절대좌표이고 나머지는 전부 상대좌표라, 오프셋은 이 네 점에만 더하면 됩니다
  return rounded`
    M ${x + width - params.p} ${y}
    ${drawTopRightPath(params)}
    L ${x + width} ${y + height - params.p}
    ${drawBottomRightPath(params)}
    L ${x + params.p} ${y + height}
    ${drawBottomLeftPath(params)}
    L ${x} ${y + params.p}
    ${drawTopLeftPath(params)}
    Z`
    .replace(/[\t\s\n]+/g, ' ')
    .trim();
}
