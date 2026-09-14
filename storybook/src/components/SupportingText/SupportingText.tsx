import { Icon } from '../Icon/Icon';
import './SupportingText.css';

export type SupportingTextSize = 's' | 'm' | 'l';
export const SUPPORTING_TEXT_THEMES = ['gray', 'black', 'brand', 'destructed', 'success', 'warning'] as const;
export type SupportingTextTheme = (typeof SUPPORTING_TEXT_THEMES)[number];

/**
 * 아이콘 크기: S 만 12px, M·L 은 16px 로 동일.
 * ⚠️ Figma 의 인스턴스 스왑 슬롯은 **`Icon S` 와 `Icon M` 둘뿐**이고,
 *    **L 은 `Icon M` 슬롯을 그대로 공유**합니다 (`Icon L` 은 존재하지 않습니다).
 */
const ICON_SIZE: Record<SupportingTextSize, number> = { s: 12, m: 16, l: 16 };
/** Figma 기본 글리프 — `Icon / Default / {12|16}px / warning_filled` */
const DEFAULT_ICON = 'warning_filled';

export interface SupportingTextProps {
  /** 안내 문구 */
  children?: React.ReactNode;
  /** S 는 Caption2 10 Medium · **M 과 L 은 타이포가 같고 좌우 패딩만 다릅니다** */
  size?: SupportingTextSize;
  /** 문구의 의미를 색으로 구분합니다. **카운터 색은 바뀌지 않습니다** */
  theme?: SupportingTextTheme;
  /**
   * 아이콘 표시 여부. Figma 의 `Show Icon` boolean 프로퍼티에 대응합니다
   * (Size·Theme·Text Count 3개 variant 축과는 별개입니다).
   */
  showIcon?: boolean;
  /**
   * 아이콘 글리프. Figma 의 **인스턴스 스왑 프로퍼티**(`Icon S` / `Icon M`)에 대응하며
   * 기본 글리프는 `warning_filled` 입니다. 자유롭게 교체할 수 있습니다.
   */
  iconName?: string;
  /** 글자 수 카운터를 함께 보여줍니다 */
  showCount?: boolean;
  current?: number;
  max?: number;
  className?: string;
}

/**
 * 입력 필드 아래에 붙는 **헬퍼·에러·성공 문구**입니다.
 *
 * **Size(3) × Theme(6) × Text Count(2) = 36개 변형.** `components/global/` 소속입니다.
 * 세 축은 서로 완전히 독립적입니다 — Theme은 색만, Size는 타이포·패딩만, Text Count는 카운터 유무만 바꿉니다.
 * 여기에 variant 가 아닌 별도 프로퍼티 3개(`Text` · `Show Icon` · `Icon S`/`Icon M`)가 더 있습니다.
 *
 * 스펙 원본: `components/global/supporting-text/supporting-text.md`
 */
export function SupportingText({
  children,
  size = 'm',
  theme = 'gray',
  showIcon = true,
  iconName = DEFAULT_ICON,
  showCount = false,
  current = 0,
  max = 100,
  className,
}: SupportingTextProps) {
  return (
    <div
      className={['bd-supporting-text', className].filter(Boolean).join(' ')}
      data-size={size}
      data-theme={theme}
      data-has-count={showCount}
    >
      <span className="bd-supporting-text__content">
        {showIcon && iconName && (
          <span className="bd-supporting-text__icon">
            <Icon name={iconName} category="filled" size={ICON_SIZE[size]} />
          </span>
        )}
        <span>{children}</span>
      </span>
      {/* 카운터는 Theme 과 무관하게 항상 회색입니다 */}
      {showCount && (
        <span className="bd-supporting-text__count">
          {current}/{max}
        </span>
      )}
    </div>
  );
}
