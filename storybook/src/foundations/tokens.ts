/**
 * tokens/tokens.css 원본을 그대로 읽어 파싱합니다.
 * 값을 여기 옮겨 적지 않기 때문에, 토큰 파일이 바뀌면 문서도 자동으로 따라 바뀝니다.
 */
import tokensCss from '../../../tokens/tokens.css?raw';

export interface TokenEntry {
  name: string;   // --ref-color-blue-500
  value: string;  // #2C7BE2
  group: string;  // 직전 주석 헤더 (예: "Blue")
  section: string;// 직전 ====== 섹션 헤더 (예: "Reference Colors")
}

function parse(css: string): TokenEntry[] {
  const out: TokenEntry[] = [];
  let section = '';
  let group = '';

  for (const rawLine of css.split('\n')) {
    const line = rawLine.trim();

    const bigHeader = line.match(/^\/\*\s*=+\s*(.+?)\s*=+\s*\*\/$/);
    if (bigHeader) {
      section = bigHeader[1];
      group = '';
      continue;
    }
    const smallHeader = line.match(/^\/\*\s*([^*=]{1,60}?)\s*\*\/$/);
    if (smallHeader) {
      group = smallHeader[1];
      continue;
    }
    const decl = line.match(/^(--[\w-]+)\s*:\s*([^;]+);/);
    if (decl) {
      out.push({ name: decl[1], value: decl[2].trim(), group, section });
    }
  }
  return out;
}

export const ALL_TOKENS = parse(tokensCss);

export const byPrefix = (prefix: string) => ALL_TOKENS.filter((t) => t.name.startsWith(prefix));

export const bySection = (match: string) =>
  ALL_TOKENS.filter((t) => t.section.toLowerCase().includes(match.toLowerCase()));

/** var(--x) 참조를 실제 값까지 따라갑니다 */
export function resolve(value: string, depth = 0): string {
  if (depth > 8) return value;
  const m = value.match(/^var\((--[\w-]+)(?:\s*,\s*(.+))?\)$/);
  if (!m) return value;
  const target = ALL_TOKENS.find((t) => t.name === m[1]);
  return target ? resolve(target.value, depth + 1) : (m[2] ?? value);
}

/** 한 섹션 안에서 group 별로 묶습니다 */
export function groupBy(tokens: TokenEntry[]): Record<string, TokenEntry[]> {
  const map: Record<string, TokenEntry[]> = {};
  for (const t of tokens) {
    const key = t.group || '기타';
    (map[key] ??= []).push(t);
  }
  return map;
}
