import { Icon } from '../Icon/Icon';
import './NavLeading.css';

/**
 * Home 의 로고는 Mode 별 별도 파일이 아니라 **단색 워드마크 벡터 하나**입니다.
 * Figma 실측(`2573:12738` logo / `2573:12739` Union): 104×24 프레임 안의 102×22 벡터 하나이고,
 * 채우기가 Light=`neutral/600`(#5b616c) · Dark=`common/white-default`(#fdfdfd) **변수에 바인딩**돼 있습니다.
 * 저장소에 단색 워드마크가 없어 Figma 원본을 그대로 내보내
 * `assets/logo/bi/signature/bi-signature-horizontal-mono.svg` 로 추가했습니다(fill=currentColor).
 */
import logoMono from '../../../../assets/logo/bi/signature/bi-signature-horizontal-mono.svg?raw';

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
  /**
   * 버튼의 접근성 이름. Back 은 라벨이 보이면 그 라벨이 이름이 되므로 보통 필요 없고,
   * 라벨을 끄면 "뒤로 가기"가 기본값으로 붙습니다.
   */
  'aria-label'?: string;
  className?: string;
}

/** 기본 접근성 이름 — 아이콘만 있을 때 스크린리더가 읽을 문구입니다 */
const DEFAULT_LABEL: Partial<Record<NavLeadingType, string>> = {
  back: '뒤로 가기',
  close: '닫기',
};

/**
 * Navigation Bar Top 의 **좌측 영역**입니다.
 * `components/navigation-bar/top/` 소속 서브 아톰입니다.
 *
 * **Type(4) × Mode(2) = 8개 변형**(완전 직교, 전수 실측).
 *
 * **Back·Close 는 아이콘과 라벨을 묶은 버튼 하나**입니다 — 라벨 위에 마우스를 올려도 같은 대상이고
 * 키보드로도 잡힙니다. 단 **hover/pressed 색 변화는 없습니다**(Figma 원본이 Icon Button 인스턴스가 아니라
 * 아이콘을 얹은 프레임 — 디자이너 확인, 2026-09-15). 우측 Trailing 은 Icon Button 이라 색까지 바뀝니다.
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
  'aria-label': ariaLabel,
}: NavLeadingProps) {
  const content = (
    <>
      {type === 'back' && (
        <>
          {/* 아이콘은 장식입니다 — 접근성 이름은 라벨 텍스트나 버튼의 aria-label 이 맡습니다 */}
          <Icon name="backward" category="outlined" size={24} />
          {showLabel && <span className="bd-nav-leading__label">{label}</span>}
        </>
      )}
      {type === 'close' && <Icon name="close" category="outlined" size={24} />}
      {type === 'big-title' && <span className="bd-nav-leading__big-title">{title}</span>}
      {type === 'home' && (
        /* Figma 구조 그대로: 230×24 칸(`Frame 1`) 안에 104×24 로고를 왼쪽에 둡니다 */
        <span className="bd-nav-leading__logo-box">
          <span
            className="bd-nav-leading__logo"
            role="img"
            aria-label="바드림"
            dangerouslySetInnerHTML={{ __html: logoMono }}
          />
        </span>
      )}
    </>
  );

  const shared = {
    className: ['bd-nav-leading', className].filter(Boolean).join(' '),
    'data-type': type,
    'data-mode': mode,
  };

  /* Back·Close 는 그 자체가 액션이라 항상 버튼입니다.
     Big Title·Home 은 제목/로고라 기본적으로 정적이고, onClick 을 주면 그때만 버튼이 됩니다. */
  const isAction = type === 'back' || type === 'close' || Boolean(onClick);
  if (!isAction) return <div {...shared}>{content}</div>;

  return (
    <button
      type="button"
      {...shared}
      onClick={onClick}
      aria-label={ariaLabel ?? (type === 'back' && showLabel ? undefined : DEFAULT_LABEL[type])}
    >
      {content}
    </button>
  );
}
