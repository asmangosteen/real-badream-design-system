import { StatusBar, type StatusBarOS, type StatusBarProps } from '../StatusBar/StatusBar';
import { NavBarTop, type NavBarTopProps } from '../NavBarTop/NavBarTop';
import type { NavMode } from '../NavLeading/NavLeading';
import './TopBar.css';

export type TopBarBackground = 'no' | 'default' | 'blur';

export interface TopBarProps {
  mode?: NavMode;
  /** `no` = 투명 · `default` = 실제 페이지 배경색 · `blur` = 반투명 + backdrop blur(40px) */
  background?: TopBarBackground;
  /** 하단 구분선. ⚠️ **`background="no"` 에는 이 축 자체가 없습니다** */
  line?: boolean;
  showStatusBar?: boolean;
  showNavigationBar?: boolean;
  /** Status Bar 의 OS. 하위 속성은 전부 자유롭게 승계됩니다 */
  os?: StatusBarOS;
  /**
   * [Navigation Bar Top](../NavBarTop/NavBarTop.tsx) 에 그대로 전달됩니다 — Type 8종과 그 안의 자유도 전부.
   * ⚠️ `mode` · `background` 만 빠집니다 (아래 **잠긴 두 축** 참고)
   */
  navProps?: Omit<NavBarTopProps, 'mode' | 'background'>;
  /**
   * [Status Bar](../StatusBar/StatusBar.tsx) 에 그대로 넘어갑니다 — `time` 등(README 규칙 11).
   * ⚠️ `mode` · `background` 만 빠집니다 (아래 **잠긴 두 축** 참고)
   */
  statusProps?: Omit<Partial<StatusBarProps>, 'mode' | 'background'>;
  className?: string;
}

/**
 * 화면 최상단 **전체 영역**입니다. Status Bar 와 Navigation Bar Top 을 세로로 쌓은 최종 합성 컴포넌트입니다.
 *
 * **Mode(2) × Background(3) × Line = 10개 변형**(비직교 — `background="no"` 에는 Line 이 없습니다).
 *
 * 두 서브 컴포넌트를 **각각 독립적으로 켜고 끌 수 있고**, 하위 속성(Status Bar 의 OS,
 * Navigation Bar Top 의 Type 8종 등)은 전부 자유롭게 승계됩니다.
 *
 * ## ⚠️ 잠긴 두 축 — `mode` · `background`
 *
 * **Top Bar 안에서 쓸 때는 Top Bar 설정만 따릅니다.** 두 서브 컴포넌트의 `mode`·`background` 는
 * 따로 지정할 수 없습니다(개별로 쓸 때만 각 컴포넌트 속성을 따릅니다 — 2026-09-15 디자이너 확인).
 * - **background**: 배경은 Top Bar 컨테이너가 **통째로** 칠합니다. 안쪽까지 켜면 두 겹이 됩니다.
 * - **mode**: 상태바와 내비게이션 바의 색을 **한 화면 안에서 맞추는 값**이라 따로 놀면 안 됩니다.
 *
 * 저장소 규칙 11("조합 컴포넌트는 자식의 속성을 좁히지 않습니다")의 **명시된 예외**입니다 —
 * 규칙 위반으로 보고 되돌리지 마세요(`storybook/README.md` 규칙 11 · `components/top-bar/top-bar.md` 5-1장).
 *
 * 스펙 원본: `components/top-bar/top-bar.md`
 */
export function TopBar({
  mode = 'light',
  background = 'default',
  line = false,
  showStatusBar = true,
  showNavigationBar = true,
  os = 'ios',
  navProps,
  statusProps,
  className,
}: TopBarProps) {
  // Background=No 에는 Line 축이 존재하지 않습니다
  const hasLine = background !== 'no' && line;

  return (
    <div
      className={['bd-top-bar', className].filter(Boolean).join(' ')}
      data-mode={mode}
      data-background={background}
      data-line={hasLine}
    >
      {/* 자유로운 축(os·type 등)은 spread **앞**에 둬서 기본값이 되게 하고,
          잠긴 축(mode·background)은 spread **뒤**에 둬서 무엇이 들어와도 Top Bar 값이 이기게 합니다.
          타입으로도 막고 있지만, 순서까지 맞춰야 런타임에서도 새지 않습니다. */}
      {showStatusBar && <StatusBar os={os} {...statusProps} mode={mode} background="off" />}
      {showNavigationBar && <NavBarTop {...navProps} mode={mode} background="off" />}
    </div>
  );
}
