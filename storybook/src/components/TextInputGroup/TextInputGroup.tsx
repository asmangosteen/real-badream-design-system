import { TextInput, type TextInputSize, type TextInputState } from '../TextInput/TextInput';
import './TextInputGroup.css';

export interface TextInputGroupField {
  placeholder?: string;
  value?: string;
  state?: TextInputState;
}

export interface TextInputGroupProps {
  /** 그룹 상단 라벨. **첫 번째 필드에만** 붙습니다 */
  label?: string;
  essential?: boolean;
  /** 필드 목록. Figma 정의 범위는 **2개 또는 3개**입니다 */
  fields: TextInputGroupField[];
  /** 내부 Text Input 의 Size 와 1:1 대응합니다 */
  size?: TextInputSize;
  className?: string;
}

/**
 * Text Input 을 세로로 쌓은 조합 컴포넌트입니다. **6개 변형**(Size 3 × Field 2·3, 전수 실측).
 *
 * 내부 필드는 Text Input 을 그대로 쓰되 **대부분의 토글이 꺼진 간소화 형태**이고,
 * **Label 은 첫 번째 필드에만** 표시됩니다.
 *
 * 스펙 원본: `components/text-input/text-input-group/text-input-group.md`
 */
export function TextInputGroup({ label = 'Label', essential = false, fields, size = 'm', className }: TextInputGroupProps) {
  return (
    <div
      className={['bd-text-input-group', className].filter(Boolean).join(' ')}
      data-size={size}
      data-field={fields.length}
    >
      {fields.map((f, i) => (
        <TextInput
          key={i}
          size={size}
          state={f.state ?? 'default'}
          value={f.value}
          placeholder={f.placeholder}
          /* 첫 번째 필드만 Label 을 갖습니다 */
          showLabel={i === 0}
          label={label}
          essential={essential}
          showButton={false}
          showSupportingText={false}
          showLeftIcon={false}
          showRightIcon={false}
        />
      ))}
    </div>
  );
}
