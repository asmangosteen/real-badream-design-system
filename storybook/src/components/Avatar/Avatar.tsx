import { useState } from 'react';
import './Avatar.css';

export const AVATAR_SIZES = [12, 16, 20, 24, 32, 40, 48] as const;
export type AvatarSize = (typeof AVATAR_SIZES)[number];

export interface AvatarProps {
  /** 프로필 이미지 주소. 비우거나 로드에 실패하면 이니셜로 대체됩니다 */
  src?: string;
  /** 스크린리더가 읽을 사용자 식별 텍스트. **필수** — 스펙 6장 참고 */
  alt: string;
  /** 원의 지름(px). 12px 에서만 테두리가 0.5px 로 얇아집니다 */
  size?: AvatarSize;
  className?: string;
}

/**
 * 사용자 프로필 이미지를 원형으로 표시합니다.
 *
 * **Hover / Pressed / Disabled 상태가 없는 순수 표시용 컴포넌트**입니다.
 * Chip 안에서는 항상 16px 버전만 쓰입니다.
 *
 * 스펙 원본: `components/avatar/avatar.md`
 */
export function Avatar({ src, alt, size = 40, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={['bd-avatar', className].filter(Boolean).join(' ')}
      data-size={size}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img className="bd-avatar__img" src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <span
          className="bd-avatar__fallback"
          style={{ fontSize: Math.max(8, Math.round(size * 0.4)) }}
          role="img"
          aria-label={alt}
        >
          {alt.trim().charAt(0) || '?'}
        </span>
      )}
    </span>
  );
}
