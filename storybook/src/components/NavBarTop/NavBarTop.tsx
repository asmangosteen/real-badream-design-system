import { NavLeading, type NavLeadingProps, type NavMode } from '../NavLeading/NavLeading';
import { NavTrailing, type NavTrailingItemProps, type NavTrailingProps } from '../NavTrailing/NavTrailing';
import { NavSmalltitle, type NavSmalltitleProps } from '../NavSmalltitle/NavSmalltitle';
import './NavBarTop.css';

export const NAVBAR_TOP_TYPES = [
  'big-title',
  'notitle-back',
  'notitle-close',
  'smalltitle-back',
  'smalltitle-close',
  'seg-back',
  'seg-close',
  'home',
] as const;
export type NavBarTopType = (typeof NAVBAR_TOP_TYPES)[number];

/**
 * Type 별 구성 — Trailing 개수는 **최댓값**이며 0~최댓값 사이로 자유 조절 가능합니다.
 *
 * `showBackLabel` 은 Figma 각 Type 샘플의 `Show Label` 실측값입니다.
 * 라벨은 **어느 Type 에서든 자유롭게 켜고 끌 수 있고**(사용자 확인), 여기 값은 기본값일 뿐입니다 —
 * Seg 계열만 가운데 Segmented Control 에 자리를 내주려고 기본이 꺼져 있습니다.
 */
export const NAVBAR_TOP_CONFIG: Record<
  NavBarTopType,
  {
    leading: 'back' | 'close' | 'big-title' | 'home';
    center: 'none' | 'default' | 'segmented-control';
    maxTrailing: number;
    showBackLabel: boolean;
  }
> = {
  'big-title': { leading: 'big-title', center: 'none', maxTrailing: 3, showBackLabel: true },
  'notitle-back': { leading: 'back', center: 'none', maxTrailing: 3, showBackLabel: true },
  'notitle-close': { leading: 'close', center: 'none', maxTrailing: 3, showBackLabel: true },
  'smalltitle-back': { leading: 'back', center: 'default', maxTrailing: 2, showBackLabel: true },
  'smalltitle-close': { leading: 'close', center: 'default', maxTrailing: 2, showBackLabel: true },
  'seg-back': { leading: 'back', center: 'segmented-control', maxTrailing: 1, showBackLabel: false },
  'seg-close': { leading: 'close', center: 'segmented-control', maxTrailing: 1, showBackLabel: false },
  home: { leading: 'home', center: 'none', maxTrailing: 3, showBackLabel: true },
};

export interface NavBarTopProps {
  /** ⚠️ **`home` 은 홈 화면 전용**입니다 (사용자 확인, 강한 제약) */
  type?: NavBarTopType;
  mode?: NavMode;
  /** `off` 는 투명 — 화면 콘텐츠 위에 겹쳐 쓰는 용도입니다 */
  background?: 'on' | 'off';
  /**
   * Back 의 라벨. **어느 Type 에서든 자유롭게 켜고 끌 수 있습니다.**
   * 비워 두면 Type 별 Figma 기본값을 따릅니다(Seg 계열만 꺼짐 — `NAVBAR_TOP_CONFIG` 참고).
   */
  showBackLabel?: boolean;
  backLabel?: string;
  title?: string;
  /** 우측 액션. Type 별 **최댓값을 넘지 않는 선에서** 자유 조절하고 Icon·Button 을 섞어 쓸 수 있습니다 */
  trailingItems?: NavTrailingItemProps[];
  showLeading?: boolean;
  showTrailing?: boolean;
  showSmalltitle?: boolean;
  /* 아토믹 디자인 — 세 서브 아톰의 속성을 전부 열어 둡니다(README 규칙 11).
     `mode` 는 Top 이 한꺼번에 맞추지만 막지는 않습니다. */
  /** 좌측 [Leading](../NavLeading/NavLeading.tsx) 에 그대로 넘어갑니다 */
  leadingProps?: Partial<NavLeadingProps>;
  /** 가운데 [Smalltitle](../NavSmalltitle/NavSmalltitle.tsx) 에 그대로 넘어갑니다 */
  smalltitleProps?: Partial<NavSmalltitleProps>;
  /** 우측 [Trailing](../NavTrailing/NavTrailing.tsx) 에 그대로 넘어갑니다 */
  trailingProps?: Partial<NavTrailingProps>;
  /** Seg 계열의 가운데 [Segmented Control](/docs/components-segmented-control--docs) 항목 (Size=S · Count=2 고정) */
  segments?: [string, string];
  /**
   * 선택된 세그먼트. **주면 제어 모드**가 되므로 `onSegmentChange` 와 함께 써야 합니다.
   * 비워 두면 내부 state 로 동작해 그냥 눌러서 전환됩니다(단독 Segmented Control 과 동일).
   */
  segmentValue?: number;
  /** 비제어 모드의 초기 선택값 */
  defaultSegmentValue?: number;
  onSegmentChange?: (i: number) => void;
  className?: string;
}

/**
 * 화면 최상단 **상단 내비게이션 바**입니다. 전 변형 공통 **390px 고정 폭.**
 *
 * **Type(8) × Mode(2) × Background(2) = 32개 변형** — 이 패밀리의 플래그십이며 실제로 화면에 쓰이는 컴포넌트입니다.
 * [Leading](/docs/components-global-nav-leading--docs) · Trailing · Smalltitle 을 조합합니다.
 *
 * 스펙 원본: `components/navigation-bar/top/top/top.md`
 */
export function NavBarTop({
  type = 'notitle-back',
  mode = 'light',
  background = 'on',
  showBackLabel,
  backLabel = 'Label',
  title = 'Subtitle',
  trailingItems,
  showLeading = true,
  showTrailing = true,
  showSmalltitle = true,
  leadingProps,
  smalltitleProps,
  trailingProps,
  segments = ['Tab 1', 'Tab 2'],
  segmentValue,
  defaultSegmentValue,
  onSegmentChange,
  className,
}: NavBarTopProps) {
  const cfg = NAVBAR_TOP_CONFIG[type];
  // 최댓값을 넘지 않도록 잘라냅니다
  const items = (trailingItems ?? Array.from({ length: cfg.maxTrailing }, () => ({ type: 'icon' as const }))).slice(
    0,
    cfg.maxTrailing,
  );

  return (
    <div
      className={['bd-navbar-top', className].filter(Boolean).join(' ')}
      data-type={type}
      data-mode={mode}
      data-background={background}
    >
      <div className="bd-navbar-top__leading" hidden={!showLeading}>
        <NavLeading
          type={cfg.leading}
          mode={mode}
          showLabel={showBackLabel ?? cfg.showBackLabel}
          label={backLabel}
          title={type === 'big-title' ? title : undefined}
          {...leadingProps}
        />
      </div>

      {cfg.center !== 'none' && (
        <div className="bd-navbar-top__center" hidden={!showSmalltitle}>
          <NavSmalltitle
            type={cfg.center}
            mode={mode}
            title={title}
            segments={segments}
            segmentValue={segmentValue}
            defaultSegmentValue={defaultSegmentValue}
            onSegmentChange={onSegmentChange}
            {...smalltitleProps}
          />
        </div>
      )}

      {showTrailing && (
        <div className="bd-navbar-top__trailing">
          <NavTrailing mode={mode} items={items} {...trailingProps} />
        </div>
      )}
    </div>
  );
}
