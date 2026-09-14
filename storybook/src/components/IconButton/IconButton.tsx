import { Icon } from '../Icon/Icon';
import './IconButton.css';

export type IconButtonSize = 's' | 'm' | 'l';
export type IconButtonColor = 'black' | 'white' | 'blue' | 'red';
export type IconButtonType =
  | 'ghost'
  | 'tertiary'
  | 'primary'
  | 'secondary'
  | 'destructed'
  | 'destructed-subtle';

/** Type 이 정하는 기본 아이콘 색. Tertiary 만 white 로 바꿀 수 있습니다 (Figma 실측 9개 조합 기준) */
export const DEFAULT_ICON_COLOR: Record<IconButtonType, IconButtonColor> = {
  ghost: 'black',
  tertiary: 'black',
  primary: 'white',
  secondary: 'blue',
  destructed: 'white',
  'destructed-subtle': 'red',
};

/** 아이콘 크기 · 외곽 정사각형 = 패딩×2 + 아이콘 */
export const ICON_BUTTON_SPEC: Record<IconButtonSize, { icon: number; box: number; padding: number }> = {
  s: { icon: 16, box: 28, padding: 6 },
  m: { icon: 20, box: 36, padding: 8 },
  l: { icon: 24, box: 40, padding: 8 },
};

export interface IconButtonProps {
  /** 아이콘 이름 (assets/icons 의 outlined 카테고리) */
  iconName: string;
  /** S=28px(패딩 6·아이콘 16) · M=36px(8·20) · L=40px(8·24). **S 만 radius 8px** 이고 M/L 은 12px */
  size?: IconButtonSize;
  /** `ghost` 와 `destructed-subtle` 은 Button 에는 없는 이 컴포넌트 고유 타입입니다 */
  type?: IconButtonType;
  /** **Tertiary 전용.** 1px 보더를 추가합니다 (배경은 neutral/100 을 유지) */
  stroke?: boolean;
  /** **Tertiary 전용.** 옅은 반투명 보더 대신 진한 단색(neutral/400) 보더 */
  boldStroke?: boolean;
  /**
   * 아이콘 색. **Tertiary 를 뺀 나머지 Type 은 색이 하나로 정해져 있습니다** —
   * Ghost=Black · Primary/Destructed=White · Secondary=Blue · Destructed-Subtle=Red.
   * Tertiary 만 `black`(밝은 배경) / `white`(어두운 배경, 배경도 neutral/600 으로 반전) 중에 고를 수 있습니다.
   */
  iconColor?: IconButtonColor;
  disabled?: boolean;
  onClick?: () => void;
  /** 라벨이 없으므로 **필수**입니다 */
  'aria-label': string;
  forceState?: 'hover' | 'pressed';
  className?: string;
}

/**
 * 라벨 없이 아이콘 하나만으로 액션을 제공하는 정사각형 버튼입니다.
 *
 * 고정 크기 프레임이 아니라 **패딩 × 2 + 아이콘**으로 정사각형이 만들어집니다.
 * 라벨이 없으므로 `aria-label` 이 필수입니다.
 *
 * **Button 과 달리 On(Light/Dark) 축이 없습니다** — 어두운 배경용은 `iconColor="white"` 로 표현합니다.
 *
 * 스펙 원본: `components/button/icon-button/icon-button.md`
 */
export function IconButton({
  iconName,
  size = 'm',
  type = 'ghost',
  stroke = false,
  boldStroke = false,
  iconColor,
  disabled = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={['bd-icon-button', className].filter(Boolean).join(' ')}
      data-size={size}
      data-type={type}
      data-stroke={stroke}
      data-bold-stroke={boldStroke}
      data-icon-color={iconColor ?? DEFAULT_ICON_COLOR[type]}
      data-force-state={forceState}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <Icon name={iconName} category="outlined" size={ICON_BUTTON_SPEC[size].icon} />
    </button>
  );
}
