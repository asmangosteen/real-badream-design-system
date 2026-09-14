import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './Badge.css';

export const BADGE_THEMES = ['gray', 'brand', 'success', 'destructed', 'warning', 'purple', 'turquoise'] as const;
export type BadgeTheme = (typeof BADGE_THEMES)[number];
export type BadgeSize = 's' | 'm' | 'l';
export type BadgeContentType = 'solid' | 'alpha' | 'outlined';
export type BadgeNumericType = 'solid' | 'empty';

/** 아이콘 크기: S/M 은 12px 고정이고 L 에서만 16px 입니다 */
const BADGE_ICON: Record<BadgeSize, number> = { s: 12, m: 12, l: 16 };

export interface BadgeProps {
  children?: ReactNode;
  /** 배지의 의미/카테고리 */
  theme?: BadgeTheme;
  size?: BadgeSize;
  /** `solid`=진한 채움 · `alpha`=연한 틴트 · `outlined`=흰 배경 + 1px 테두리 */
  type?: BadgeContentType;
  /** 라벨 뒤에 아이콘을 붙입니다. **M/L 은 이때만 좌우 패딩이 비대칭이 됩니다** */
  showIcon?: boolean;
  iconName?: string;
  className?: string;
}

/**
 * 상태·카테고리를 짧게 표시하는 **비인터랙티브** 라벨입니다.
 * Figma에 Hover/Pressed/Disabled 축이 **아예 없습니다**.
 *
 * 스펙 원본: `components/badge/badge.md`
 */
export function Badge({
  children,
  theme = 'gray',
  size = 'm',
  type = 'solid',
  showIcon = false,
  iconName = 'plus',
  className,
}: BadgeProps) {
  return (
    <span
      className={['bd-badge', className].filter(Boolean).join(' ')}
      data-kind="content"
      data-theme={theme}
      data-size={size}
      data-type={type}
      data-has-icon={showIcon}
    >
      {children}
      {showIcon && <Icon name={iconName} category="outlined" size={BADGE_ICON[size]} />}
    </span>
  );
}

export interface NumericBadgeProps {
  /** 표시할 개수. **두 자리 이상이면 정원에서 캡슐형으로 자동 전환**됩니다 */
  count: number;
  /** 이 값을 넘으면 `99+` 처럼 표시합니다 */
  max?: number;
  theme?: BadgeTheme;
  size?: BadgeSize;
  /** `empty` 는 배경만 사라지고 **크기는 solid 와 완전히 동일하게 유지**됩니다 */
  type?: BadgeNumericType;
  className?: string;
}

/**
 * 숫자 카운트 전용 배지입니다.
 * 한 자리(0~9)는 정원, 두 자리 이상은 캡슐형으로 자동 확장됩니다 (높이는 동일).
 *
 * 스펙 원본: `components/badge/badge.md` 4장
 */
export function NumericBadge({
  count,
  max = 99,
  theme = 'gray',
  size = 'm',
  type = 'solid',
  className,
}: NumericBadgeProps) {
  const text = count > max ? `${max}+` : String(count);
  return (
    <span
      className={['bd-badge', className].filter(Boolean).join(' ')}
      data-kind="numeric"
      data-theme={theme}
      data-size={size}
      data-type={type}
      data-multi={text.length > 1}
    >
      {text}
    </span>
  );
}
