import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { ButtonSpinner, type SpinnerSize } from '../ButtonSpinner/ButtonSpinner';
import './Button.css';

export type ButtonSize = 's' | 'm' | 'l' | 'xl' | '2xl';
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructed';
export type ButtonTextColor = 'white' | 'blue' | 'gray';
export type ButtonContents = 'text' | 'icon' | 'text-icon' | 'icon-text';
export type ButtonForceState = 'hover' | 'pressed';

/** Text+Icon 조합의 아이콘 크기 (Size 축에 종속) */
const INLINE_ICON: Record<ButtonSize, number> = { s: 12, m: 16, l: 16, xl: 16, '2xl': 20 };
/** Icon-only 정사각형 안의 아이콘 크기.
 *  ⚠️ L/XL 이 Text+Icon(16px)보다 큰 20px 인 것은 실측 확인된 사실이며 의도 여부는 확인 필요입니다. */
const ONLY_ICON: Record<ButtonSize, number> = { s: 12, m: 16, l: 20, xl: 20, '2xl': 24 };
/**
 * Loading 스피너 매핑 — 2026-09-14 버튼 내부 인스턴스를 직접 실측한 결과입니다.
 *
 * | Button | 스피너 프레임 | 패딩 | 링 |
 * |---|---|---|---|
 * | S | 18 | 2.5 | 13 |
 * | M | 22 | 3.5 | 15 |
 * | L | 22 | 3 | 16 |
 * | XL | 24 | 3 | **18** |
 * | 2XL | 24 | 3 | **18** |
 *
 * **버튼은 스피너의 XL 변형(링 24px)을 쓰지 않습니다.** XL·2XL 은 L 변형을
 * 프레임 24px 로 키운 형태(패딩 3 유지 → 링 18px)입니다.
 */
const SPINNER: Record<ButtonSize, { size: SpinnerSize; frame?: number }> = {
  s: { size: 's' },
  m: { size: 'm' },
  l: { size: 'l' },
  xl: { size: 'l', frame: 24 },
  '2xl': { size: 'l', frame: 24 },
};

export interface ButtonProps {
  /** 버튼 라벨. Contents 가 `icon` 이면 표시되지 않습니다 */
  children?: ReactNode;
  /** S / M / L / XL / 2XL — 패딩·폰트·radius·아이콘 크기를 한꺼번에 결정합니다 */
  size?: ButtonSize;
  /** 액션의 중요도 */
  type?: ButtonType;
  /** **Tertiary 전용.** 라벨·아이콘 색을 고릅니다 (`white` 는 On=Dark 에서만 관측됨) */
  textColor?: ButtonTextColor;
  /** 배경 채움 대신 흰 배경 + 1px 보더를 씁니다 */
  stroke?: boolean;
  /** **Tertiary 전용.** 옅은 반투명 보더 대신 진한 단색(neutral/400) 보더 */
  boldStroke?: boolean;
  /** 버튼이 놓인 배경. **Tertiary + White 라벨 조합에서만** dark 가 관측됩니다 */
  on?: 'light' | 'dark';
  /** 라벨/아이콘 구성. `text-icon` 은 아이콘이 뒤, `icon-text` 는 앞입니다 */
  contents?: ButtonContents;
  /** 아이콘 이름 (assets/icons 의 outlined 카테고리) */
  iconName?: string;
  /** 처리 중 표시. **Figma 에서 Loading 은 Contents=Text 와만 조합됩니다** */
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  /** 변형 목록 표시용 강제 상태. 실제 서비스에서는 쓰지 않습니다 */
  forceState?: ButtonForceState;
  className?: string;
}

/**
 * 화면 이동·확인·제출 등 주요 액션을 유도하는 CTA 버튼입니다.
 *
 * **8개 변형 축으로 935개 인스턴스**를 구성하는 이 디자인 시스템에서 가장 큰 컴포넌트입니다.
 * Hover/Pressed는 배경 위에 `interaction/*` 반투명 오버레이를 합성해 표현합니다.
 *
 * 스펙 원본: `components/button/button/button.md`
 */
export function Button({
  children,
  size = 'l',
  type = 'primary',
  textColor,
  stroke = false,
  boldStroke = false,
  on = 'light',
  contents = 'text',
  iconName = 'arrow_right',
  loading = false,
  disabled = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const iconOnly = contents === 'icon';
  const iconSize = iconOnly ? ONLY_ICON[size] : INLINE_ICON[size];
  const showIcon = contents !== 'text' && !loading;
  const showText = !iconOnly;

  const icon = showIcon ? <Icon name={iconName} category="outlined" size={iconSize} /> : null;

  return (
    <button
      type="button"
      className={['bd-button', className].filter(Boolean).join(' ')}
      data-size={size}
      data-type={type}
      data-text-color={textColor}
      data-stroke={stroke}
      data-bold-stroke={boldStroke}
      data-on={on}
      data-contents={contents}
      data-loading={loading}
      data-force-state={forceState}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {/* Contents=Icon 은 아이콘만, icon-text 는 앞, text-icon 은 뒤에 배치합니다 */}
      {(iconOnly || contents === 'icon-text') && icon}
      {showText && <span className="bd-button__label">{children}</span>}
      {contents === 'text-icon' && icon}
      {/* Loading: 라벨을 유지한 채 뒤에 spacing/02(2px) 간격으로 스피너를 붙입니다 */}
      {/* tone 을 주지 않으면 스피너가 버튼 라벨 색을 그대로 따릅니다 */}
      {loading && <ButtonSpinner size={SPINNER[size].size} frame={SPINNER[size].frame} />}
    </button>
  );
}
