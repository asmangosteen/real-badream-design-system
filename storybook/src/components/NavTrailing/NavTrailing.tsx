import { IconButton, type IconButtonProps } from '../IconButton/IconButton';
import { TextButton, type TextButtonProps } from '../TextButton/TextButton';
import type { NavMode } from '../NavLeading/NavLeading';
import './NavTrailing.css';

export type NavTrailingItemType = 'icon' | 'button';

export interface NavTrailingItemProps {
  type?: NavTrailingItemType;
  mode?: NavMode;
  /** Icon 타입의 글리프. 기본 `plus` 는 Figma 의 자리표시용 값이며 화면마다 골라 씁니다 */
  iconName?: string;
  /** Button 타입의 라벨 */
  label?: string;
  onClick?: () => void;
  'aria-label'?: string;
  /* 아토믹 디자인 — 안에 들어가는 두 버튼의 속성을 전부 열어 둡니다(README 규칙 11) */
  /** Icon 타입이 쓰는 [Icon Button](../IconButton/IconButton.tsx) 에 그대로 넘어갑니다 */
  iconButtonProps?: Partial<IconButtonProps>;
  /** Button 타입이 쓰는 [Text Button](../TextButton/TextButton.tsx) 에 그대로 넘어갑니다 */
  textButtonProps?: Partial<TextButtonProps>;
  className?: string;
}

/**
 * Navigation Bar 우측에 반복 배치되는 **액션 아이템 1개**입니다.
 * `components/navigation-bar/top/` 소속 최하위 서브 아톰입니다.
 *
 * **Type(2) × Mode(2) = 4개 변형**(완전 직교, 전수 실측).
 *
 * 2026-09-15 Figma 재실측 — 이 컴포넌트는 **직접 그린 버튼이 아니라 인스턴스를 얹은 껍데기**입니다.
 * `Icon` = [Icon Button](/docs/components-icon-button--docs)(Size=L · Ghost · Black · Stroke=False),
 * `Button` = [Text Button](/docs/components-text-button--docs)(Size=XL · Blue · Default · Contents=Text).
 * 예전 구현은 두 버튼을 흉내만 내서 **hover/pressed 피드백이 통째로 빠져 있었습니다.**
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
  iconButtonProps,
  textButtonProps,
  'aria-label': ariaLabel,
}: NavTrailingItemProps) {
  return (
    <span
      className={['bd-nav-trailing-item', className].filter(Boolean).join(' ')}
      data-type={type}
      data-mode={mode}
    >
      {type === 'icon' ? (
        <IconButton
          size="l"
          type="ghost"
          stroke={false}
          iconName={iconName}
          onClick={onClick}
          aria-label={ariaLabel ?? iconName}
          {...iconButtonProps}
        />
      ) : (
        <TextButton size="xl" color="blue" contents="text" onClick={onClick} aria-label={ariaLabel} {...textButtonProps}>
          {textButtonProps?.children ?? label}
        </TextButton>
      )}
    </span>
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
 * 항목 사이 gap 이 0이라, 각 항목의 세로 패딩(4px)이 서로 맞닿는 방식으로 배치됩니다.
 * 묶음 자체는 우측 패딩 12px 을 갖고 오른쪽 끝에 정렬됩니다.
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
