import { Icon } from '../Icon/Icon';
import './NavLeading.css';

export type NavLeadingType = 'back' | 'close' | 'big-title' | 'home';
export type NavMode = 'light' | 'dark';

export interface NavLeadingProps {
  /**
   * ⚠️ **`home` 은 앱 홈 화면 전용**입니다 (사용자 확인, 강한 제약).
   * 나머지 3종은 여러 화면에서 범용으로 씁니다.
   */
  type?: NavLeadingType;
  mode?: NavMode;
  /** Back 의 아이콘 옆 라벨. **Back 에만 있는 prop** 입니다 */
  showLabel?: boolean;
  label?: string;
  /** Big Title 의 제목 텍스트 */
  title?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Navigation Bar Top 의 **좌측 영역**입니다.
 * `components/navigation-bar/top/` 소속 서브 아톰입니다.
 *
 * **Type(4) × Mode(2) = 8개 변형**(완전 직교, 전수 실측).
 *
 * 스펙 원본: `components/navigation-bar/top/leading/leading.md`
 */
export function NavLeading({
  type = 'back',
  mode = 'light',
  showLabel = true,
  label = 'Label',
  title = 'Big Title',
  onClick,
  className,
}: NavLeadingProps) {
  return (
    <div
      className={['bd-nav-leading', className].filter(Boolean).join(' ')}
      data-type={type}
      data-mode={mode}
      onClick={onClick}
    >
      {type === 'back' && (
        <>
          <Icon name="backward" category="outlined" size={24} aria-label="뒤로가기" />
          {showLabel && <span className="bd-nav-leading__label">{label}</span>}
        </>
      )}
      {type === 'close' && <Icon name="close" category="outlined" size={24} aria-label="닫기" />}
      {type === 'big-title' && <span className="bd-nav-leading__big-title">{title}</span>}
      {type === 'home' && (
        /* ⚠️ Figma 는 Light/Dark 로고 SVG 를 별도 파일로 씁니다.
           저장소 assets/logo/bi/ 에서 대응 파일을 골라 넣어야 합니다 — 아래는 가로형 시그니처입니다. */
        <img
          className="bd-nav-leading__logo"
          alt="바드림"
          src={
            mode === 'dark'
              ? new URL('../../../../assets/logo/bi/signature/bi-signature-horizontal-gradient-bg.svg', import.meta.url).href
              : new URL('../../../../assets/logo/bi/signature/bi-signature-horizontal-white-bg.svg', import.meta.url).href
          }
        />
      )}
    </div>
  );
}
