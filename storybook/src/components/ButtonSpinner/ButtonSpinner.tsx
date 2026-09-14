import './ButtonSpinner.css';

export type SpinnerSize = 's' | 'm' | 'l' | 'xl';
/** 버튼 밖에서 단독으로 쓸 때 머리 색을 지정합니다 */
export type SpinnerTone = 'on-fill' | 'on-light';

/**
 * Figma 실측 기하값 (2026-09-14).
 * 링 지름 = frame − padding×2 이고, 두께는 링 지름에 비례합니다.
 */
export const SPINNER_GEOMETRY: Record<
  SpinnerSize,
  { frame: number; padding: number; ring: number; stroke: number }
> = {
  s: { frame: 18, padding: 2.5, ring: 13, stroke: 1.5 },
  m: { frame: 22, padding: 3.5, ring: 15, stroke: 2 },
  l: { frame: 22, padding: 3, ring: 16, stroke: 2 },
  xl: { frame: 24, padding: 0, ring: 24, stroke: 2 },
};

export interface ButtonSpinnerProps {
  /**
   * 변형. **버튼은 XL 변형을 쓰지 않습니다** — Button XL·2XL 과 Text Button L·XL 은
   * `size="l"` 에 `frame={24}` 를 준 형태(링 18px)입니다.
   */
  size?: SpinnerSize;
  /**
   * 프레임 한 변(px)을 덮어씁니다. 패딩은 변형 값을 유지하므로 링만 커집니다 —
   * Figma 에서 인스턴스를 리사이즈한 것과 같은 동작입니다.
   */
  frame?: number;
  /**
   * 버튼 **밖에서 단독으로** 쓸 때만 지정합니다. 버튼 안에서는 비워두면
   * 라벨 색을 그대로 상속합니다(= Figma 원본과 동일한 동작).
   */
  tone?: SpinnerTone;
  /** 링 두께(px). 비워두면 링 지름에 비례해 자동 계산됩니다 */
  stroke?: number;
  /** ⚠️ 1회전 시간(ms). Figma에 모션 데이터가 **전혀 없어** 기본 900ms는 구현 추정값입니다 */
  duration?: number;
  'aria-label'?: string;
  className?: string;
}

/**
 * 버튼이 비동기 작업을 처리하는 동안 보여주는 로딩 인디케이터입니다.
 * Button의 **State=Loading** 에서 라벨 뒤 `spacing/02`(2px) 간격으로 붙습니다.
 *
 * 모양은 잘린 호가 아니라 **끊김 없는 완전한 링**이고, 링 자체가 원뿔형 그라디언트로
 * 칠해져 회전할 때 꼬리처럼 보입니다.
 *
 * **꼬리는 버튼 배경색, 머리는 라벨 색**입니다 — Figma 애셋이
 * `conic-gradient(from 90deg, <버튼배경>, <라벨색>)` 이라 꼬리가 배경에 녹아 사라집니다.
 * 구현은 `transparent → currentColor` 로 해서 배경색을 몰라도 같은 결과가 나오게 했습니다.
 *
 * 스펙 원본: `components/button/button-spinner/button-spinner.md`
 */
export function ButtonSpinner({
  size = 'm',
  frame,
  tone,
  stroke,
  duration,
  className,
  'aria-label': ariaLabel = '로딩 중',
}: ButtonSpinnerProps) {
  const geo = SPINNER_GEOMETRY[size];
  const style: React.CSSProperties = {};
  let resolvedStroke = stroke;

  if (frame) {
    style.width = frame;
    style.height = frame;
    // 프레임을 키우면 Figma 인스턴스 리사이즈와 동일하게 링과 두께가 함께 커집니다
    if (resolvedStroke === undefined) {
      const ring = frame - geo.padding * 2;
      resolvedStroke = Math.round((geo.stroke * ring) / geo.ring * 100) / 100;
    }
  }
  if (resolvedStroke !== undefined) {
    (style as Record<string, string>)['--bd-spinner-stroke'] = `${resolvedStroke}px`;
  }
  if (duration) (style as Record<string, string>)['--bd-spinner-duration'] = `${duration}ms`;

  return (
    <span
      className={['bd-spinner', className].filter(Boolean).join(' ')}
      data-size={size}
      data-tone={tone}
      role="status"
      aria-label={ariaLabel}
      style={style}
    >
      <span className="bd-spinner__ring" />
    </span>
  );
}
