import { Icon } from '../Icon/Icon';
import type { NavMode } from '../NavLeading/NavLeading';
import './NavTrailing.css';

export type NavTrailingItemType = 'icon' | 'button';

export interface NavTrailingItemProps {
  type?: NavTrailingItemType;
  mode?: NavMode;
  /** Icon 타입의 글리프. 기본 `plus` 는 플레이스홀더이며 자유 교체 슬롯으로 추정됩니다 */
  iconName?: string;
  /** Button 타입의 라벨 */
  label?: string;
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
}

/**
 * Navigation Bar 우측에 반복 배치되는 **액션 아이템 1개**입니다.
 * `components/navigation-bar/top/` 소속 최하위 서브 아톰입니다.
 *
 * **Type(2) × Mode(2) = 4개 변형**(완전 직교, 전수 실측).
 * `Button` 타입은 [Text Button](/docs/components-text-button--docs)(Size=XL · Blue · Default)을 그대로 재사용합니다.
 *
 * 스펙 원본: `components/navigation-bar/top/trailing-components/trailing-components.md`
 */
export function NavTrailingItem({
  type = 'icon',
  mode = 'light',
  iconName = 'plus',
  label = 'Button',
  onClick,
  className,
  'aria-label': ariaLabel,
}: NavTrailingItemProps) {
  return (
    <button
      type="button"
      className={['bd-nav-trailing-item', className].filter(Boolean).join(' ')}
      data-type={type}
      data-mode={mode}
      onClick={onClick}
      aria-label={ariaLabel ?? (type === 'icon' ? iconName : undefined)}
    >
      <span>{type === 'icon' ? <Icon name={iconName} category="outlined" size={24} /> : label}</span>
    </button>
  );
}

export interface NavTrailingProps {
  /**
   * 항목 목록. ⚠️ Figma 의 `Number`(1/2/3)는 **정확한 개수가 아니라 최댓값**입니다 —
   * 0개부터 최댓값까지 자유롭게 조절할 수 있고 Icon·Button 을 **섞어 쓸 수 있습니다**(사용자 확인).
   */
  items?: NavTrailingItemProps[];
  /**
   * ⚠️ **Trailing 자체에는 Mode 축이 없습니다.** 단독으로는 항상 Light 입니다.
   * Dark 대응은 상위 Top 컴포넌트가 각 항목을 개별 재정의하는 방식입니다.
   */
  mode?: NavMode;
  className?: string;
}

/**
 * Navigation Bar 우측의 **액션 아이템 묶음**입니다.
 *
 * 항목 사이에 gap 클래스가 없어, 각 항목의 세로 패딩(4px)이 서로 맞닿는 방식으로 배치됩니다.
 *
 * 스펙 원본: `components/navigation-bar/top/trailing/trailing.md`
 */
export function NavTrailing({ items = [{ type: 'icon' }], mode = 'light', className }: NavTrailingProps) {
  return (
    <div className={['bd-nav-trailing', className].filter(Boolean).join(' ')} data-count={items.length}>
      {items.map((item, i) => (
        <NavTrailingItem key={i} mode={mode} {...item} />
      ))}
    </div>
  );
}
