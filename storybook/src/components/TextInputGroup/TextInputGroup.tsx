import { TextInput, type TextInputProps, type TextInputSize } from '../TextInput/TextInput';
import type { SupportingTextTheme } from '../SupportingText/SupportingText';
import './TextInputGroup.css';

/**
 * 한 행의 설정입니다. **[Text Input](../TextInput/TextInput.tsx) 의 속성을 하나도 빼지 않고 그대로 받습니다** —
 * 그룹은 Text Input 을 2~3개 합쳐 놓은 것이고, 각 행은 그냥 Text Input 입니다.
 *
 * 그룹이 주는 값(`size`·`label`·`supportingText` 등)은 **기본값일 뿐**이라
 * 행에서 주면 행 쪽이 이깁니다.
 */
export type TextInputGroupField = TextInputProps;

export interface TextInputGroupProps {
  /** 라벨의 기본값. **첫 번째 행에만** 붙습니다(행이 자기 `label` 을 주면 그쪽이 이깁니다) */
  label?: string;
  essential?: boolean;
  /** 행 목록. Figma 정의 범위는 **2개 또는 3개**입니다 */
  fields: TextInputGroupField[];
  /** 모든 행의 Size 기본값. Figma 는 그룹 Size 와 내부 Text Input Size 가 1:1 입니다 */
  size?: TextInputSize;
  /** 안내 문구의 기본값. **맨 아래 행 아래에만** 놓입니다 */
  supportingText?: string;
  supportingTheme?: SupportingTextTheme;
  showSupportingText?: boolean;
  className?: string;
}

/**
 * Text Input 을 세로로 쌓은 조합 컴포넌트입니다. **6개 변형**(Size 3 × Field 2·3, 전수 실측).
 *
 * **그냥 Text Input 2~3개입니다.** 각 행은 `TextInputProps` 를 하나도 빼지 않고 그대로 받고,
 * 그룹이 주는 값은 전부 **기본값**일 뿐이라 행에서 주면 행이 이깁니다.
 *
 * **실제로 입력할 수 있습니다** — 행에 `state` 를 주지 않으면 Text Input 이 자동 모드로 들어가
 * 마우스·키보드 조작을 그대로 따라갑니다.
 *
 * ## 그룹이 강제하는 것은 자리 두 개뿐입니다
 *
 * | | 규칙 | 근거 |
 * |---|---|---|
 * | 라벨 | **첫 행에만** 그립니다 | Figma 실측 — 두·세 번째 행은 `Show Label=False` 변형 |
 * | 안내 문구 | **맨 아래 행 아래에만** 그립니다 | 사용자 지시 |
 *
 * 속성을 막는 게 아니라 **자리만 정합니다.** 행이 `showLabel`/`showSupportingText` 를 켜도
 * 그 자리가 아니면 그리지 않습니다 — 중간 행에 라벨이 끼면 그룹으로 안 읽히기 때문입니다.
 *
 * ## 행 기본값만 Text Input 단독일 때와 다릅니다
 *
 * 버튼·좌우 아이콘이 **꺼진 채로** 시작하고 값은 **빈 문자열**입니다
 * (Figma 6개 변형이 전부 그 모습이고, 단독 기본값 `'Input Text'` 를 그대로 두면
 * 빈 칸이어야 할 행에 글자가 미리 채워집니다). 행에서 켜면 그대로 켜집니다.
 *
 * 스펙 원본: `components/text-input/text-input-group/text-input-group.md`
 */
export function TextInputGroup({
  label = 'Label',
  essential = false,
  fields,
  size = 'm',
  supportingText = 'Supporting text',
  supportingTheme,
  showSupportingText = false,
  className,
}: TextInputGroupProps) {
  const lastIndex = fields.length - 1;
  /* 어느 행이든 에러로 표시돼 있으면 그룹의 안내 문구가 빨강이 됩니다.
     안내 문구는 맨 아래 한 자리뿐이라, 위쪽 행의 에러를 알릴 길이 이것밖에 없습니다.
     ⚠️ Figma 에 근거가 없는 파생 규칙입니다(스펙 4.1장에 적어 뒀습니다). */
  const anyError = fields.some((f) => f.destructed);

  return (
    <div
      className={['bd-text-input-group', className].filter(Boolean).join(' ')}
      data-size={size}
      data-field={fields.length}
    >
      {fields.map((f, i) => (
        <TextInput
          key={i}
          /* 행이 준 것을 **먼저** 펼칩니다. 아래는 행이 주지 않았을 때만 쓰이는 기본값입니다 —
             `??` 로 받으므로 행 값이 언제나 이깁니다.

             `state` 를 여기서 건드리지 않는 것이 중요합니다. 주지 않으면 Text Input 이 자동 모드로
             들어가 실제 입력을 받습니다. 예전에는 `state ?? 'default'` 로 고정해 버려서
             **어떤 행도 입력이 되지 않았습니다.** */
          {...f}
          size={f.size ?? size}
          label={f.label ?? label}
          essential={f.essential ?? essential}
          supportingText={f.supportingText ?? supportingText}
          supportingTheme={f.supportingTheme ?? supportingTheme ?? (anyError ? 'destructed' : undefined)}
          /* Figma 6개 변형이 전부 꺼진 모습이라 **기본값만** 바꿉니다 — 행에서 켜면 켜집니다 */
          value={f.value ?? ''}
          showButton={f.showButton ?? false}
          showLeftIcon={f.showLeftIcon ?? false}
          showRightIcon={f.showRightIcon ?? false}
          /* 여기 둘만 그룹이 **자리를 강제**합니다. 행이 켜도 그 자리가 아니면 그리지 않습니다. */
          showLabel={i === 0 && (f.showLabel ?? true)}
          showSupportingText={i === lastIndex && (f.showSupportingText ?? showSupportingText)}
        />
      ))}
    </div>
  );
}
