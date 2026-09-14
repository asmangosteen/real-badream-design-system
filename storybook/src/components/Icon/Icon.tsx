import './Icon.css';
import {
  getIconSvg,
  RECOLORABLE,
  type IconCategory,
} from './registry';

export type { IconCategory };

export interface IconProps {
  /** 아이콘 이름 (파일명). 예: `bell`, `arrow_right`, `가브리엘` */
  name: string;
  /**
   * 아이콘 종류.
   * - `outlined` / `filled` — UI 아이콘. **색을 바꿀 수 있습니다**
   * - `colored` / `maker` / `service` / `bss` — 브랜드·제조사 아이콘. **원본 색 고정**
   */
  category?: IconCategory;
  /** px. 해당 사이즈 파일이 없으면 가장 가까운 사이즈로 대체합니다 */
  size?: number;
  /** UI 아이콘일 때만 적용됩니다. 비우면 상위 요소의 글자색을 따릅니다 */
  color?: string;
  className?: string;
  /** 의미 있는 아이콘이면 설명을 넣고, 장식용이면 비워둡니다 */
  'aria-label'?: string;
}

/**
 * 저장소 `assets/icons/` 의 SVG **648개**를 그대로 사용하는 아이콘 컴포넌트입니다.
 * 아이콘을 다시 그리지 않고 원본 파일을 직접 읽으므로, 저장소에 파일을 추가하면 즉시 반영됩니다.
 */
export function Icon({
  name,
  category = 'outlined',
  size = 24,
  color,
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  const recolor = RECOLORABLE.includes(category);
  const svg = getIconSvg(category, name, size, recolor);

  const common = {
    className: ['bd-icon', className].filter(Boolean).join(' '),
    style: { width: size, height: size, ...(recolor && color ? { color } : null) },
    role: ariaLabel ? ('img' as const) : undefined,
    'aria-label': ariaLabel,
    'aria-hidden': ariaLabel ? undefined : true,
  };

  if (!svg) {
    return (
      <span {...common} className={`${common.className} bd-icon--missing`} title={`아이콘 없음: ${category}/${name}`}>
        ?
      </span>
    );
  }
  return <span {...common} dangerouslySetInnerHTML={{ __html: svg }} />;
}
