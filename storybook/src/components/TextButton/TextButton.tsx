import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { ButtonSpinner } from '../ButtonSpinner/ButtonSpinner';
import './TextButton.css';

export type TextButtonSize = 's' | 'm' | 'l' | 'xl';
export type TextButtonColor = 'blue' | 'gray' | 'red';
export type TextButtonContents = 'text' | 'text-icon' | 'icon-text';

/**
 * 아이콘 크기 — 2026-09-14 Figma 재실측으로 **4개 Size 전부 확정**되었습니다
 * (이전에는 M 만 실측되고 S/L/XL 은 "확인 필요"였습니다).
 * 레이어명도 `Icon / Default / {12|16|16|20}px / plus` 로 직접 확인했습니다.
 */
const ICON_SIZE: Record<TextButtonSize, number> = { s: 12, m: 16, l: 16, xl: 20 };

/**
 * Loading 스피너 매핑 — 2026-09-14 실측.
 * Text Button 의 Loading(Contents=Default) 프레임·링 크기:
 * S 18/링13 · M 22/링15 · **L 24/링18** · **XL 24/링18**.
 * Button 과 달리 L 부터 이미 24 프레임을 씁니다.
 */
const SPINNER: Record<TextButtonSize, { size: 's' | 'm' | 'l' | 'xl'; frame?: number }> = {
  s: { size: 's' },
  m: { size: 'm' },
  l: { size: 'l', frame: 24 },
  xl: { size: 'l', frame: 24 },
};

export interface TextButtonProps {
  children?: ReactNode;
  /** S=caption1 · M=body2 · L=body1 · XL=subtitle. **Button 과 매핑이 다릅니다** */
  size?: TextButtonSize;
  /** Blue=주요/링크성 · Gray=중립 · Red=파괴적 액션 */
  color?: TextButtonColor;
  contents?: TextButtonContents;
  iconName?: string;
  /** **라벨 대신 스피너만** 표시됩니다 (Figma 의 Loading 변형은 Contents=Default) */
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  forceState?: 'hover' | 'pressed';
  className?: string;
}

/**
 * 배경 없이 라벨(과 선택적 아이콘)만으로 저강조 액션을 유도하는 인라인 버튼입니다.
 *
 * **배경·패딩·radius가 전혀 없습니다.** Hover/Pressed는 배경 오버레이가 아니라
 * **텍스트 색 자체를 어둡게 합성**해 표현합니다 (Blue 기준 `#2c7be2` → `#276fcd` → `#2364b8`).
 *
 * 스펙 원본: `components/button/text-button/text-button.md`
 */
export function TextButton({
  children,
  size = 'm',
  color = 'blue',
  contents = 'text',
  iconName = 'plus',
  loading = false,
  disabled = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: TextButtonProps) {
  const icon =
    contents !== 'text' && !loading ? (
      <Icon name={iconName} category="outlined" size={ICON_SIZE[size]} />
    ) : null;

  return (
    <button
      type="button"
      className={['bd-text-button', className].filter(Boolean).join(' ')}
      data-size={size}
      data-color={color}
      data-contents={contents}
      data-force-state={forceState}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? (
        <ButtonSpinner size={SPINNER[size].size} frame={SPINNER[size].frame} />
      ) : (
        <>
          {contents === 'icon-text' && icon}
          <span>{children}</span>
          {contents === 'text-icon' && icon}
        </>
      )}
    </button>
  );
}
