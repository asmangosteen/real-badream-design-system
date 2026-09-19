/**
 * Pagination 의 계산 규칙만 모아 둔 순수 함수 묶음입니다.
 * 컴포넌트와 분리해 둬서 페이지 계산만 따로 검증·재사용할 수 있습니다
 * (Date Picker 의 `calendar-data.ts` 와 같은 구조).
 */

/** 번호 칸의 최대 개수. Figma `Page Numbering Group` 이 항상 9칸입니다 */
export const MAX_PAGE_SLOTS = 9;

/** 생략 없이 앞쪽·뒤쪽을 보여줄 때 노출되는 연속 페이지 수 (`1 2 3 4 5 6 7 ··· 20`) */
const EDGE_RUN = 7;

/** 생략이 양쪽일 때 현재 페이지 좌우로 보여줄 개수 (`1 ··· 7 8 [9] 10 11 ··· 20`) */
const AROUND_CURRENT = 2;

/**
 * **전환 경계의 근거 — 현재 페이지 좌우에 항상 번호가 `AROUND_CURRENT`개씩 보이게 합니다.**
 *
 * Rear 는 `1..7` 을 보여주므로 현재가 7이면 오른쪽에 번호가 없습니다(`… 6 [7] ··· 20`).
 * 그래서 오른쪽 여유 2칸을 남기는 **5** 까지만 Rear 를 씁니다. Front 도 대칭입니다.
 */
const REAR_MAX = EDGE_RUN - AROUND_CURRENT;              // 5
const FRONT_MIN_FROM_END = EDGE_RUN - 1 - AROUND_CURRENT; // 4 → 현재 ≥ 총−4

export type PageSlot =
  | { kind: 'page'; page: number }
  | { kind: 'ellipsis' };

/** Figma `Page Numbering Group` 의 변형 축과 1:1 대응하는 값 */
export type GroupState = 'stable' | 'abbreviated';
export type GroupAbbreviated = 'none' | 'rear' | 'both' | 'front';

/**
 * 총 페이지 수와 현재 페이지로 **9칸에 무엇을 넣을지** 정합니다.
 *
 * | 조건 | 결과 | 모양 |
 * |---|---|---|
 * | 총 ≤ 9 | `none` | 전부 표시 |
 * | 현재 ≤ 5 | `rear` | `1 2 3 4 5 6 7 ··· 끝` |
 * | 현재 ≥ 총−4 | `front` | `1 ··· 끝−6 … 끝` |
 * | 그 외 | `both` | `1 ··· 현재±2 ··· 끝` |
 *
 * **어느 경우에도 현재 페이지 좌우에 번호가 2개씩 보입니다.**
 *
 * ⚠️ **전환 경계는 Figma 에 없는 값입니다** — 2026-09-19 디자이너 지시가 출처입니다.
 * 레이아웃 3종 자체는 Figma 실측값입니다.
 * (같은 날 `현재 ≤ 7` 로 먼저 정했다가, 현재가 14/20 일 때 `1 ··· [14] 15 …` 처럼
 *  **왼쪽에 이전 번호가 없어 어색하다**는 지적으로 `≤ 5` 로 바로잡았습니다.)
 */
export function buildPageSlots(total: number, current: number): PageSlot[] {
  const t = Math.max(1, Math.floor(total));
  const c = clampPage(current, t);
  const page = (n: number): PageSlot => ({ kind: 'page', page: n });
  const gap: PageSlot = { kind: 'ellipsis' };
  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => page(from + i));

  if (t <= MAX_PAGE_SLOTS) return range(1, t);
  if (c <= REAR_MAX) return [...range(1, EDGE_RUN), gap, page(t)];
  if (c >= t - FRONT_MIN_FROM_END) return [page(1), gap, ...range(t - (EDGE_RUN - 1), t)];
  return [page(1), gap, ...range(c - AROUND_CURRENT, c + AROUND_CURRENT), gap, page(t)];
}

/** 위 결과를 Figma 변형 축 이름으로 되돌립니다 (`data-*` 를 Figma 와 1:1 로 맞추기 위한 것) */
export function toGroupVariant(total: number, current: number): { state: GroupState; abbreviated: GroupAbbreviated } {
  const t = Math.max(1, Math.floor(total));
  const c = clampPage(current, t);
  if (t <= MAX_PAGE_SLOTS) return { state: 'stable', abbreviated: 'none' };
  if (c <= REAR_MAX) return { state: 'abbreviated', abbreviated: 'rear' };
  if (c >= t - FRONT_MIN_FROM_END) return { state: 'abbreviated', abbreviated: 'front' };
  return { state: 'abbreviated', abbreviated: 'both' };
}

/**
 * 페이지 번호를 `1 ~ total` 안으로 **자동 보정**합니다.
 *
 * ⚠️ Figma 에 없는 규칙입니다 — 2026-09-19 디자이너 지시("100페이지까지 있는데 101, 130 을
 * 입력하면 자동으로 100 이 되도록")가 출처입니다. `Move to Page` 가 이 함수를 씁니다.
 */
export function clampPage(page: number, total: number): number {
  const t = Math.max(1, Math.floor(total));
  if (!Number.isFinite(page)) return 1;
  return Math.min(t, Math.max(1, Math.floor(page)));
}

/**
 * 번호 칸의 Figma `Contents` 축 값을 자릿수로 정합니다.
 * `0 ~ 000`(1~3자리) = 38px · `0000`(4자리 이상) = 44px.
 */
export type NumberingContents = '0~000' | '0000' | 'abbreviated';
export function toNumberingContents(page: number | undefined, abbreviated: boolean): NumberingContents {
  if (abbreviated) return 'abbreviated';
  return String(Math.abs(Math.floor(page ?? 0))).length >= 4 ? '0000' : '0~000';
}
