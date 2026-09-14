import { StatusBar, type StatusBarOS } from '../StatusBar/StatusBar';
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
  /** Navigation Bar Top 에 그대로 전달됩니다 */
  navProps?: Omit<NavBarTopProps, 'mode' | 'background'>;
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
      {showStatusBar && <StatusBar os={os} mode={mode} background="off" />}
      {showNavigationBar && <NavBarTop mode={mode} background="off" {...navProps} />}
    </div>
  );
}
