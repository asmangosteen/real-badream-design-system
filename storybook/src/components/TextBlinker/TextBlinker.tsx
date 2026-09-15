import './TextBlinker.css';

export interface TextBlinkerProps {
  /** `off` 는 같은 색의 alpha 0% 입니다 (별도 회색이 아닙니다) */
  state?: 'on' | 'off';
  /**
   * 깜빡임. Figma 프로토타입 반응 실측값(200ms 유지 + 150ms Ease in and out 페이드,
   * 양방향)을 그대로 옮겨 **한 주기 700ms 의 페이드**로 깜빡입니다.
   * 계단식(step)이 아니라 부드럽게 사라졌다 나타납니다.
   */
  blink?: boolean;
  /** 커서 색. Text Input 이 에러 상태에서 destructed 색으로 바꿔 씁니다 */
  color?: string;
  /**
   * 캐럿 높이(px). 컴포넌트 자체 기본값은 20px 이지만,
   * **Type Box 는 글자 크기에 맞춰 S 16 · M 18 · L 20 으로 리사이즈해 씁니다**(Figma 실측).
   */
  height?: number;
  className?: string;
}

/**
 * 입력 필드 안에서 커서 위치를 표시하는 얇은 세로 막대(캐럿)입니다.
 *
 * **On/Off 두 상태뿐인 가장 단순한 아톰**입니다. 너비 1.5px 와 radius 2px 는 공통이고,
 * 높이는 컴포넌트 기본값이 20px 이지만 **상위에서 글자 크기에 맞춰 리사이즈**해 씁니다.
 *
 * 스펙 원본: `components/global/text-blinker/text-blinker.md`
 */
export function TextBlinker({ state = 'on', blink = false, color, height, className }: TextBlinkerProps) {
  return (
    <span
      aria-hidden="true"
      className={['bd-text-blinker', className].filter(Boolean).join(' ')}
      data-state={state}
      data-blink={blink}
      style={
        {
          ...(color ? { '--bd-blinker-color': color } : null),
          ...(height ? { '--bd-blinker-height': `${height}px` } : null),
        } as React.CSSProperties
      }
    />
  );
}
