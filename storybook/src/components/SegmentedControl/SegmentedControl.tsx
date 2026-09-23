import {
  SegmentedControlItem,
  type SegItemSize,
  type SegmentedControlItemProps,
} from '../SegmentedControlItem/SegmentedControlItem';
import { Squircle } from '../../shared/Squircle';
import './SegmentedControl.css';

export type SegmentedControlSize = SegItemSize;

/**
 * 세그먼트 하나의 설정입니다. 문자열만 주면 라벨로 쓰이고, 객체로 주면
 * **[Segmented Control Item](../SegmentedControlItem/SegmentedControlItem.tsx) 의 속성이 전부** 넘어갑니다
 * (선택 상태·클릭은 컨트롤이 정하므로 뺍니다).
 */
export type SegmentedControlEntry =
  | string
  | (Omit<Partial<SegmentedControlItemProps>, 'children' | 'selected' | 'onClick'> & { label: React.ReactNode });

export interface SegmentedControlProps {
  /** 세그먼트 목록. **2~5개**가 Figma 에 정의된 범위입니다 */
  items: SegmentedControlEntry[];
  /** 현재 선택된 세그먼트의 인덱스 */
  value?: number;
  /** 컨트롤 전체의 크기 단계. 내부 `_Item` 의 Size 와 1:1 대응합니다 */
  size?: SegmentedControlSize;
  onChange?: (index: number) => void;
  'aria-label'?: string;
  className?: string;
}

/**
 * 여러 선택지 중 하나를 고르는 가로 배열 컨트롤입니다.
 * 회색 트랙 위에 `_Item` 들이 놓이고, 선택된 것만 흰 pill 로 부상합니다.
 *
 * **Size(5) × Count(2~5) = 20개 변형.**
 * 세그먼트가 늘어나도 **컨테이너의 padding·gap·radius·높이는 변하지 않고**, 각 `_Item` 이 폭만 나눠 갖습니다.
 * 너비는 고정이 아니라 부모 폭에 맞춰 늘어나는 가변입니다.
 *
 * 항목을 고르면 선택된 흰 pill 이 **미끄러지듯 이동**합니다(200ms).
 *
 * 스펙 원본: `components/segmented-control/segmented-control.md`
 */
export function SegmentedControl({
  items,
  value = 0,
  size = 'm',
  onChange,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps) {
  const style = {
    '--bd-sc-count': items.length,
    '--bd-sc-index': Math.min(Math.max(value, 0), items.length - 1),
  } as React.CSSProperties;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={['bd-segmented-control', className].filter(Boolean).join(' ')}
      data-size={size}
      data-count={items.length}
      style={style}
    >
      <Squircle />
      {/* 흰 pill 하나가 선택 위치로 이동합니다 (항목마다 배경을 켜고 끄지 않습니다) */}
      <span className="bd-segmented-control__indicator" aria-hidden="true">
        <Squircle />
      </span>
      {items.map((item, i) => {
        /* 문자열이면 라벨만, 객체면 Item 속성 전부가 넘어갑니다 */
        const { label, ...entry } = typeof item === 'string' ? { label: item } : item;
        return (
          <SegmentedControlItem key={i} size={size} {...entry} selected={i === value} onClick={() => onChange?.(i)}>
            {label}
          </SegmentedControlItem>
        );
      })}
    </div>
  );
}
