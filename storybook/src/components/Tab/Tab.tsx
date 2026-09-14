import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TabItem, type TabItemSize } from '../TabItem/TabItem';
import { IconButton } from '../IconButton/IconButton';
import './Tab.css';

export type TabSize = TabItemSize;
export type TabType = 'hug' | 'fill';

export interface TabEntry {
  label: string;
  /** 강조(경고/오류성) 탭 */
  emphasize?: boolean;
  disabled?: boolean;
}

export interface TabProps {
  /** 탭 목록. **Hug 는 최대 8개, Fill 은 5개 고정**이 Figma 정의 범위입니다 */
  items: TabEntry[];
  /** 활성 탭 인덱스 */
  value?: number;
  /** S = 42px · L = 48px. 탭 바 높이는 내부 `_Item` 높이 그대로입니다 */
  size?: TabSize;
  /**
   * `hug` = 탭이 콘텐츠 폭만큼 차지하고, **탭 로우 자체가 가로 스크롤 컨테이너**가 됩니다 ·
   * `fill` = 탭이 컨테이너 폭을 균등 분할하며 스크롤·페이드가 없습니다.
   * **Fill 에는 Tailing Icon·Side Padding 축이 없습니다.**
   */
  type?: TabType;
  /** 오른쪽 끝 "+" 버튼. 스크롤 영역 **뒤에 고정**됩니다. **Hug 전용**입니다 */
  tailingIcon?: boolean;
  /** 탭 바 좌우 여백. **Hug 전용**입니다 */
  sidePadding?: boolean;
  onChange?: (index: number) => void;
  'aria-label'?: string;
  className?: string;
}

/**
 * 여러 개의 `_Item`(Tab Item)을 가로로 배열한 탭 바입니다.
 *
 * **10개 변형**(전수 실측). Segmented Control 과 달리 배경 트랙·pill 이 없고,
 * 하단 구분선(1px `neutral/100`) 위에 탭이 놓이며 활성 탭만 밑줄로 표시됩니다.
 *
 * `Type=Hug` 는 넘치는 만큼 가로로 스크롤되고, **숨겨진 콘텐츠가 남아 있는 쪽에만**
 * 가장자리 페이드가 나타납니다(끝에 닿으면 사라짐).
 *
 * 탭을 누르면 **밑줄이 그 탭으로 미끄러지듯 이동**합니다(200ms).
 *
 * ⚠️ Trailing "+" 버튼을 눌렀을 때의 동작은 **아직 정해지지 않았습니다.**
 *
 * 스펙 원본: `components/tab/tab.md`
 */
export function Tab({
  items,
  value = 0,
  size = 's',
  type = 'hug',
  tailingIcon = false,
  sidePadding = false,
  onChange,
  className,
  'aria-label': ariaLabel,
}: TabProps) {
  // Fill 에는 Tailing Icon·Side Padding 축이 존재하지 않습니다
  const showTrailing = type === 'hug' && tailingIcon;
  const hasSidePadding = type === 'hug' && sidePadding;

  /* ---------- 오버플로우 페이드 (Hug 전용) ----------
     탭 로우의 스크롤 위치를 읽어 좌/우 페이드 표시 여부를 정합니다.
     그 방향에 아직 숨겨진 탭이 있을 때만 보이고, 끝에 닿으면 사라집니다. */
  const listRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ start: false, end: false });

  const syncFade = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const next = {
      start: el.scrollLeft > 0,
      // -1px 버퍼 — 부동소수점 오차로 끝에 닿아도 페이드가 남는 것을 막습니다
      end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    };
    setFade((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  /* ---------- 선택 밑줄 (Segmented Control 의 pill 과 같은 방식) ----------
     탭마다 폭이 달라 CSS 계산으로는 위치를 못 구하므로, 활성 탭을 실측해 옮깁니다.
     스크롤 영역 안에 두므로 가로 스크롤을 따라 함께 움직입니다. */
  const [underline, setUnderline] = useState<{ x: number; w: number } | null>(null);
  const [animate, setAnimate] = useState(false);

  const syncUnderline = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('.bd-tab-item[data-active="true"]');
    if (!active) return setUnderline(null);
    const next = { x: active.offsetLeft, w: active.offsetWidth };
    setUnderline((prev) => (prev && prev.x === next.x && prev.w === next.w ? prev : next));
  }, []);

  // 첫 배치는 애니메이션 없이 놓고, 그 다음부터 미끄러지게 합니다
  useEffect(() => {
    if (!underline || animate) return;
    const id = setTimeout(() => setAnimate(true), 0);
    return () => clearTimeout(id);
  }, [underline, animate]);

  useLayoutEffect(syncUnderline, [syncUnderline, value, items, size, type, showTrailing, hasSidePadding]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // 컨테이너 폭(Fill) · 글꼴 로딩으로 탭 폭이 바뀌면 다시 재어야 합니다
    const observer = new ResizeObserver(syncUnderline);
    observer.observe(el);
    el.querySelectorAll('.bd-tab-item').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [syncUnderline, items.length, size, type]);

  const activeItem = items[value];
  const underlineTone = activeItem?.disabled ? 'disabled' : activeItem?.emphasize ? 'emphasize' : 'active';


  useEffect(() => {
    if (type !== 'hug') {
      setFade((prev) => (prev.start || prev.end ? { start: false, end: false } : prev));
      return;
    }
    const el = listRef.current;
    if (!el) return;
    syncFade();
    el.addEventListener('scroll', syncFade, { passive: true });
    const observer = new ResizeObserver(syncFade);
    observer.observe(el);
    window.addEventListener('resize', syncFade);
    return () => {
      el.removeEventListener('scroll', syncFade);
      observer.disconnect();
      window.removeEventListener('resize', syncFade);
    };
    // 탭 개수·Size·여백 축이 바뀌면 스크롤 폭이 달라지므로 다시 계산합니다
  }, [type, items.length, size, showTrailing, hasSidePadding, syncFade]);

  return (
    <div
      className={['bd-tab', className].filter(Boolean).join(' ')}
      data-size={size}
      data-type={type}
      data-tailing={showTrailing}
      data-side-padding={hasSidePadding}
    >
      {/* 스크롤 컨테이너는 탭 로우 자체입니다 (별도 래퍼로 감싸지 않습니다) */}
      <div className="bd-tab__list" role="tablist" aria-label={ariaLabel} ref={listRef}>
        {items.map((item, i) => (
          <TabItem
            key={item.label}
            size={size}
            active={i === value}
            emphasize={item.emphasize}
            disabled={item.disabled}
            onClick={() => onChange?.(i)}
          >
            {item.label}
          </TabItem>
        ))}
        {underline && (
          <span
            className="bd-tab__underline"
            aria-hidden="true"
            data-tone={underlineTone}
            data-animate={animate}
            style={{ '--bd-tab-ul-x': `${underline.x}px`, '--bd-tab-ul-w': `${underline.w}px` } as React.CSSProperties}
          />
        )}
      </div>
      {type === 'hug' && (
        <>
          <span className="bd-tab__fade" data-edge="start" data-visible={fade.start} aria-hidden="true" />
          <span className="bd-tab__fade" data-edge="end" data-visible={fade.end} aria-hidden="true" />
        </>
      )}
      {showTrailing && (
        /* Figma 실측(2262:1842) — 탭 바 높이와 같은 정사각형 슬롯 안에
           Icon Button(Ghost · 패딩 8 · radius 12 · 아이콘 S 20 / L 24px)이 들어갑니다 */
        <span className="bd-tab__trailing">
          <IconButton
            iconName="plus"
            size={size === 's' ? 'm' : 'l'}
            type="ghost"
            aria-label="더보기"
          />
        </span>
      )}
    </div>
  );
}
