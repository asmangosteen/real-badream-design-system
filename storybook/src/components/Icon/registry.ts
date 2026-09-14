/**
 * assets/icons/ 의 SVG 648개를 전부 읽어들여 색인을 만듭니다.
 * 아이콘 파일을 저장소에 추가하면 여기 자동으로 반영됩니다 (별도 등록 작업 없음).
 *
 * 경로 규칙
 *   default/outlined/24px/bell.svg  → category 'outlined', size 24, name 'bell'
 *   service/32px/이벤트.svg          → category 'service',  size 32, name '이벤트'
 */
const modules = import.meta.glob('../../../../assets/icons/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const ICON_CATEGORIES = [
  'outlined',
  'filled',
  'colored',
  'maker',
  'service',
  'bss',
] as const;
export type IconCategory = (typeof ICON_CATEGORIES)[number];

/** UI 아이콘(단색)만 색을 바꿀 수 있습니다. 브랜드·제조사 아이콘은 원본 색을 유지합니다. */
export const RECOLORABLE: IconCategory[] = ['outlined', 'filled'];

/** 카테고리별 한국어 설명 — 스토리북 갤러리에 표시됩니다 */
export const CATEGORY_LABEL: Record<IconCategory, string> = {
  outlined: 'UI · Outlined (선)',
  filled: 'UI · Filled (면)',
  colored: 'Colored (2색 브랜드)',
  maker: 'Maker (제조사)',
  service: 'Service (서비스)',
  bss: 'BSS (배터리 스테이션)',
};

export interface IconEntry {
  name: string;
  category: IconCategory;
  size: number;
  svg: string;
}

const registry = new Map<string, IconEntry>();
const key = (category: string, size: number, name: string) => `${category}/${size}/${name}`;

for (const [path, raw] of Object.entries(modules)) {
  // .../icons/<category...>/<size>px/<name>.svg
  const m = path.match(/\/icons\/(.+)\/(\d+)px\/([^/]+)\.svg$/);
  if (!m) continue;
  const [, rawCategory, sizeStr, name] = m;
  // 'default/outlined' → 'outlined'
  const category = rawCategory.replace(/^default\//, '') as IconCategory;
  if (!ICON_CATEGORIES.includes(category)) continue;
  registry.set(key(category, Number(sizeStr), name), {
    name,
    category,
    size: Number(sizeStr),
    svg: raw,
  });
}

export const ALL_ICONS = [...registry.values()];

/** 카테고리에 실제로 존재하는 사이즈 목록 (작은 것부터) */
export function sizesOf(category: IconCategory): number[] {
  return [...new Set(ALL_ICONS.filter((i) => i.category === category).map((i) => i.size))].sort(
    (a, b) => a - b,
  );
}

/** 카테고리의 아이콘 이름 목록 (가나다/알파벳순) */
export function namesOf(category: IconCategory): string[] {
  return [...new Set(ALL_ICONS.filter((i) => i.category === category).map((i) => i.name))].sort(
    (a, b) => a.localeCompare(b, 'ko'),
  );
}

/**
 * SVG 소스를 가져옵니다. 요청한 사이즈가 없으면 그 카테고리에서 가장 가까운 사이즈로 대체합니다.
 * recolor=true 면 하드코딩된 색상을 currentColor 로 바꿔 CSS 로 색을 제어할 수 있게 합니다.
 */
export function getIconSvg(
  category: IconCategory,
  name: string,
  size: number,
  recolor: boolean,
): string | null {
  let entry = registry.get(key(category, size, name));
  if (!entry) {
    const available = sizesOf(category);
    const nearest = available.reduce<number | null>(
      (best, s) => (best === null || Math.abs(s - size) < Math.abs(best - size) ? s : best),
      null,
    );
    if (nearest === null) return null;
    entry = registry.get(key(category, nearest, name));
    if (!entry) return null;
  }

  let svg = entry.svg;
  if (recolor) {
    // fill="none" / stroke="none" 은 건드리지 않고 실제 색상값만 currentColor 로 치환
    svg = svg.replace(/(fill|stroke)="(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))"/g, '$1="currentColor"');
  }
  // 바깥에서 width/height 로 크기를 제어할 수 있도록 고정 치수를 제거
  svg = svg.replace(/^(<svg[^>]*?)\swidth="\d+"/, '$1').replace(/^(<svg[^>]*?)\sheight="\d+"/, '$1');
  return svg;
}
