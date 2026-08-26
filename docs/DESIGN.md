# DESIGN.md - Badream Design System V3

> Source: `바드림 디자인시스템 V3.pdf` 17 pages + attached interaction token family reference.  
> Purpose: 바드림 디자인 시스템 V3를 다른 웹/앱/문서/AI 개발 환경에서 바로 적용할 수 있도록 정리한 단일 디자인 기준서입니다.  
> This file preserves the design rules, tokens, UX writing rules, examples, icon inventories, and visual identity constraints from the source PDF.  

## 0. Application Contract

이 문서를 적용할 때는 아래 우선순위를 따릅니다.

1. Brand Core & Identity를 모든 서비스, 화면, 컴포넌트, 문구의 최상위 판단 기준으로 둡니다.
2. 색상은 HEX 코드보다 컬러 토큰명을 우선 사용합니다.
3. Typography, Spacing, Radius, Shadow, Opacity는 정의된 Style/Token 값을 임의로 수정하지 않습니다.
4. 바드림은 기본적으로 색상 대비로 위계를 만들며, Drop Shadow는 꼭 필요한 곳에만 사용합니다.
5. UX Writing은 고객 옆에서 다정히 도와주는 동료의 톤을 유지합니다.
6. 로고, 심볼, 캐릭터, 제조사/서비스 아이콘은 원본 에셋을 사용합니다. 임의 변형, 재작도, 색상 변경을 금지합니다.
7. 배경 요소 위 텍스트/컴포넌트의 계층 명암비는 WCAG 기준을 준수해야 합니다.
8. Mobile과 Web 모두 스크롤 시 하단 padding 40px을 필수 적용합니다.


---

## 1. Brand Core & Identity

모든 바드림 서비스 및 디자인시스템 제작 및 운영 과정에서 Brand Core와 Identity를 명심하고, 이에 어긋나지 않도록 주의합니다.

### 1.1 Brand Core

| Layer | Korean | English / Definition |
|---|---|---|
| Essence / 브랜드 에센스 | 효율 | Efficiency |
| Mission / 브랜드 미션 | 이동의 효율을 높인다 | Enhance the efficiency of movement |
| Vision / 브랜드 비전 | D2DM | Door to Door Mobility |
| Value / 브랜드 가치 | 진취적인 | Enterprising |
| Value / 브랜드 가치 | 신뢰를 주는 | Trustworthy |
| Value / 브랜드 가치 | 직관적인 | Clear |

### 1.2 Brand Identity

**모든 이동에 가치를 더한다**  
**Add value to every movement**

### 1.3 Brand Value Cards

| Value | Korean | Meaning |
|---|---|---|
| Enterprising | 진취적인 | 언제나 앞을 보며 전진하는 열정을 전달합니다. |
| Trustworthy | 신뢰를 주는 | 모든 경험에서 신뢰를 느낄 수 있도록 합니다. |
| Clear | 직관적인 | 어떤 상황에서든 쉽고 편리한 서비스 경험을 제공합니다. |

### 1.4 Visual Identity

| Visual Identity | Korean | Definition |
|---|---|---|
| Forward | 나아가는, 이끄는 | 앞을 향해 나아가는 우직함과 뚜렷한 목적성을 가진 직선적 움직임 |
| Neat | 반듯한, 단정한 | 반듯하게 다듬어진 믿음과 느긋한 부드러움의 어우러짐 |
| Essential | 간결한, 필수적인 | 어디서든 한 눈에 확인할 수 있도록 핵심을 나타내는 중심점 |

### 1.5 Practical Design Direction

- 화면은 효율적이고 명확해야 합니다.
- 시각적 장식보다 핵심 정보의 도달성을 우선합니다.
- 직선적인 진행감, 단정한 정렬, 핵심 중심점을 시각 언어로 활용합니다.
- 사용자에게 신뢰와 안정감을 주되, 과하게 딱딱하지 않도록 합니다.

---

## 2. Logo

사이클로이드와 바드림의 정체성을 대표하며, 다른 서비스와 구분되어 고객의 기억에 남을 수 있도록 합니다. 원형 그대로의 형태를 사용하며, 변형 방지를 위해 원본 파일을 이용하여 일관된 고객 경험을 제공합니다.

### 2.1 Global Rules

- 원본 파일을 사용합니다.
- 형태를 임의로 변형하지 않습니다.
- 단독 그래픽 요소로의 사용을 지양합니다.
- 지정된 색상 외 다른 색상을 적용하지 않습니다.
- 로고/심볼/시그니처는 배경 조건에 맞는 승인된 조합만 사용합니다.

### 2.2 CI

#### Signature

단독 그래픽 요소로의 사용을 지양하고, 지정된 색상 외 다른 색상을 적용하지 않습니다.

| Mode | Allowed Usage |
|---|---|
| Color | White BG + Black Signature |
| Color | Black BG + White Signature |
| Mono | White BG + Black Signature |
| Mono | Black BG + White Signature |

### 2.3 BI

#### Symbol

단독 그래픽 요소로의 사용을 지양하고, 지정된 색상 외 다른 색상을 적용하지 않습니다.

| Allowed Symbol Usage |
|---|
| Gradient BG + White Symbol |
| Blue BG + White Symbol |
| White BG + Gradient Symbol |

#### Signature

심볼과 로고타입을 일정한 기준에 맞춰 조합한 것으로, 상황에 따라 적절한 것을 선택하여 사용합니다.

| Direction | Allowed Usage |
|---|---|
| Vertical | Gradient BG + White Signature |
| Vertical | White BG + Gradient Signature |
| Horizontal | Gradient BG + White Signature |
| Horizontal | White BG + Gradient Signature |

### 2.4 App Icon

- `[Gradient BG + White Symbol]` 타입을 활용합니다.
- 지원 타입: `iOS`, `One UI`.

### 2.5 Required Logo Assets

- CI Signature: black signature / white signature / color / mono.
- BI Symbol: white symbol / gradient symbol.
- BI Signature: vertical gradient-bg + white, vertical white-bg + gradient, horizontal gradient-bg + white, horizontal white-bg + gradient.
- App Icon: iOS, One UI.

---

## 3. Character

고객 A/S 및 문의 응대 시, 답변 프로필에 사용합니다.

> 상세 사용범위 및 Variation은 추후 보완 예정입니다.

| Character | Variation |
|---|---|
| 드림맨 | With Background |
| 드림맨 | Without Background |
| 드림걸 | With Background |
| 드림걸 | Without Background |

### 3.1 Character Usage Rules

- 고객 A/S 및 문의 응대 답변 프로필에 사용합니다.
- 원본 캐릭터 이미지를 사용합니다.
- 얼굴, 의상, 비율, 색상을 임의로 수정하지 않습니다.
- 배경 포함/미포함 버전을 상황에 맞게 선택합니다.

---

## 4. UX Writing 1 - Bases

바드림의 UX Writing은 각종 복잡한 여정을 친근하고 다정하게 안내하는 것을 목표로 합니다. 바드림다운 문장이 무엇인가를 정의하고, 서비스 전반에 걸쳐 동일한 Voice & Tone을 적용합니다.

### 4.1 Principles

바드림이 모든 화면에서 지켜야 할 UX Writing 기본 원칙입니다.

> “고객님 옆에서 다정히 함께할게요”

| No. | Principle | Rule |
|---|---|---|
| 1 | 해요체로 다정하게 | `~합니다` 대신 `~해요`, `~할게요`, `~드려요`를 기본으로 사용합니다. 고객에게 부담을 주지 않는 친근한 거리감을 유지합니다. |
| 2 | 옆에서 같이 도와드려요 | 바드림을 딱딱한 시스템이 아닌 동료로 느껴지게끔 표현합니다. `바드림에서 검토해 둘게요`, `알림을 보내드릴게요`처럼 1인칭의 말투를 사용합니다. |
| 3 | 지금 무엇을, 왜 하는지 알려줘요 | 다음 행동이 명확해야 고객이 안심할 수 있습니다. 버튼 선택이나 페이지 이동 등 동작이 이루어지는 전 과정에서 어떤 일이 벌어지고 왜 필요한지 명료하게 설명합니다. |
| 4 | 중요한 정보는 줄을 바꾸어서 | 한 호흡으로 읽히도록 자연스러운 지점에서 줄바꿈합니다. 길이를 줄이려 의미를 잘라내지 않도록 주의합니다. |
| 5 | 겁주지 않고 정확히 | 오류, 환수, 취소 같은 무거운 정보도 위협적으로 안내하지 않도록 주의합니다. 되도록 `있을 수 있어요`로 가능성을 알리고, 다음에 할 일을 함께 안내합니다. |
| 6 | 완료는 짧고 분명하게 | 완료 안내는 `~되었어요`로 결과를 분명히 전달합니다. 군더더기 없이, 한 호흡에 끝나는 길이로 작성합니다. |

### 4.2 Voice & Tone

바드림의 Brand Voice는 일관성을 유지하되, Tone은 상황에 맞춰 유연하게 달라질 수 있습니다.

| Tone Axis | Direction | Rule |
|---|---|---|
| 친근하게 | 친근함 ←→ 격식 | 기본적으로 해요체를 사용합니다. 가급적 `김드림님`과 같이 이름을 직접 사용합니다. 단, 법적 고지 등 책임이 명시되어야 할 경우는 `~합니다`의 격식체를 허용합니다. |
| 정확하게 | 친근함 ←→ 격식 | 기간, 조건, 금액은 구체적으로 서술합니다. `잠시 후`보다 `보통 1~2일 정도`, `많이`보다 `잔여금 1,163,000원보다 많아요`처럼 숫자와 사실을 그대로 사용합니다. |
| 동료처럼 | 사람 ←→ 시스템 | 자동화된 안내문이 아닌 함께 옆에서 알려주는 동료처럼 느낄 수 있도록 합니다. `제가`, `저희가`, `바드림에서` 같은 주어를 살려 능동적인 말투를 사용합니다. |
| 차분하게 | 차분함 ←→ 다급함 | 오류/경고 상황에서 톤을 높이지 않습니다. `!` 남발, `주의!` 같은 자극적인 표현은 피하고, 다음 할 일을 침착하게 알려줍니다. |

---

## 5. UX Writing 2 - Usage

바드림 서비스에 적용된 실제 예시를 보며 전반적인 무드와 세부 규칙을 확인합니다.

> 해당 문서는 실제 서비스에 적용된 문장을 AI로 분석하여 정리한 내용을 포함합니다.

### 5.1 안내 문구

`왜 이 화면이 떴는지`, `다음에 무엇을 하는지`를 설명하는 본문입니다. 바드림에서 가장 길고 가장 자주 쓰입니다.

#### Rules

- 첫 문장은 지금 해야 하는 일을 제공합니다.
- 그 다음 줄에서 이유, 조건, 보조 정보를 한 호흡씩 끊어 추가합니다.
- 줄바꿈은 길이가 아니라 의미 단위로 끊습니다.

#### Examples

| Category | Example |
|---|---|
| 서류작성 / 정보확인 | 먼저 기존에 선택한 정보를 확인해주세요. |
| 전자서명 / 대기 | 혹시 문제는 없는지, 제출한 서류를 검토하고 있어요.<br>검토 결과에 따라 서류 보완이 있을 수 있어요. |
| 전자서명 / 대기 | 검토 완료까지 보통 1~2일 정도 걸려요. |
| 추가보조금 / 유형 선택 | 유형을 선택하면 예상 실구매가에 바로 반영돼요. |
| 신청정보 입력 / 배송 주소 | 기본 설정은 주민등록상 주소로 되어있어요.<br>실제 배송일정은 출고 전 제조사에서 별도로 연락드려요. |
| 정부24 / 발급 안내 | 정부24 화면만 보면 어디를 눌러야 할지 헷갈릴 수 있어요. |
| 바이크 출고 / 출고 대기 | 예상 도착일은 배송 상황에 따라 달라질 수 있어요. |

#### Do & Don’t

| DO | Why | DON’T | Why Not |
|---|---|---|---|
| 검토 완료까지 보통 1~2일 정도 걸려요. | `보통 + 구체적 기간`으로 안심을 줍니다. | 검토에 시간이 소요됩니다. 잠시만 기다려주십시오. | 기간이 모호하고 격식체가 거리감을 만듭니다. |
| 유형을 선택하면 예상 실구매가에 바로 반영돼요. | 행동의 결과를 미리 알려줍니다. | 유형 선택 시 가격이 변동될 수 있습니다. | `있을 수 있다`는 모호함과 격식체가 겹쳐 차가워집니다. |

### 5.2 토스트

사용자의 짧은 액션이 끝났음을 알리는 가장 가벼운 메시지입니다. 화면을 가리지 않고 1~2초 안에 읽히도록 짧게 작성합니다.

#### Rules

- 기본 구조: `명사 + 조사 + ~되었어요`.
- 동사의 결과를 `~되었어요`로 마무리합니다.
- `~되었습니다`, `~완료` 같은 단정적 종결은 가급적 피합니다.
- 토스트에서는 어미에 마침표 `.`를 사용하지 않습니다.

#### Examples

| Category | Example |
|---|---|
| 서류 보완 / 제출 완료 | 보완 서류 제출을 완료했어요 |
| 주문확인 / 옵션 변경 | 주문대수가 변경되었어요 |
| 주문확인 / 추가보조금 | 추가보조금이 적용되었어요 |
| 잔여금 결제 / 가상계좌 확인 | 계좌번호가 복사되었어요 |
| 서류작성 / 전자서명 | 마지막 서명이 완료되었어요 |

#### Do & Don’t

| DO | Why | DON’T | Why Not |
|---|---|---|---|
| 계좌번호가 복사되었어요 | 무엇이 일어났는지 명확히 안내합니다. | 복사 성공 | 주어가 빠지면 결과가 추상적으로 느껴집니다. |
| 마지막 서명이 완료되었어요 | 진행 현황을 단계별로 명확하게 안내합니다. | 서명 완료! | 명사형 종결과 `!` 강조는 시스템 메시지처럼 차갑게 들립니다. |

### 5.3 에러 및 경고

서비스 사용 중 각종 오류 상황이나 주의해야 할 사항을 안내하는 상황에 쓰입니다.

#### Rules

- 상황을 명확히 알리되, 사용자를 다그치지 않습니다.
- `오류`, `실패` 같은 부정적인 단어는 꼭 필요할 때만 사용합니다.
- 제목은 의문형 또는 `~지 않았어요`로 부드럽게 엽니다.
- `무엇이 잘못됐는지 → 다시 시도할 방법` 구조로 원인과 다음 액션을 함께 제시합니다.

#### Examples

| Category | Example |
|---|---|
| 서류제출 / 정부24 | [처리완료] 상태가 보이지 않나요? |
| 서류제출 / 정부24 | 안내과정 중 빠뜨린 부분은 없는지 `안내 처음부터 다시보기`를 눌러 다시 확인해주세요. |
| 주민등록초본 / 인증 오류 | 카카오톡 앱에서 알림을 다시 확인해주세요. 알림이 오지 않았다면 다시 시도를 눌러주세요. |
| 분할결제 / 초과 오류 | 잔여금 1,163,000원보다 많아요. |
| 결제 / 분할결제 | 현대카드는 카드사 정책으로 결제 불가능해요. |
| 보조금심사 / 자격부여 / 불가 | 지자체에서 보조금 신청 승인을 거절했어요.<br>승인불가 사유와 안내를 확인해주세요. |

#### Do & Don’t

| DO | Why | DON’T | Why Not |
|---|---|---|---|
| 인증이 정상적으로 처리되지 않았어요. | 사실만 차분히 전달했고, 사용자 잘못이 아닌 톤입니다. | 인증 실패! 다시 시도하세요. | `실패`와 `!`가 겹치면 책망처럼 들리고, 명령어조로 느껴집니다. |
| 계속 시도해도 오류가 날 경우, 정부24 서버 혹은 알 수 없는 문제일 수 있으니 바드림에 문의해주세요. | 원인 가능성을 열어두고 다음 액션을 제시합니다. | 알 수 없는 오류가 발생했습니다. | 사용자가 다음에 무엇을 해야 할지 알 수 없습니다. |

### 5.4 확인 및 완료

되돌릴 수 없는 행동 직전의 재확인 다이얼로그와 단계가 끝났을 때의 마무리 화면에서 쓰입니다.

#### Rules

- 재확인은 `~할까요?` 의문형으로 사용자가 선택할 여지를 줍니다.
- 책임감과 안도감을 동시에 줄 수 있도록 합니다.
- 완료는 `~되었어요`로 결과를 단정짓습니다.
- 다음에 무엇을 해야 하는지까지 제공합니다.

#### Examples

| Category | Example |
|---|---|
| 서류보완 최종확인 | 다시 한 번 확인해주세요. |
| 서류보완 최종확인 | 보완요청 사유를 확인하고 필요한 서류를 모두 보완하셨나요?<br>아래 버튼을 누르면 수정할 수 없어요. |
| 주민등록초본 / 나가기 | 주민등록초본 발급을 그만할까요? |
| 주민등록초본 / 나가기 | 지금까지 입력한 내용은 저장되지 않아요. |
| 서류작성 / 제출완료 | 보조금 신청서류 제출이 완료되었어요. |
| 서류작성 / 제출완료 | 확인 버튼을 눌러 전자서명 대기 화면으로 이동하세요. |

#### Do & Don’t

| DO | Why | DON’T | Why Not |
|---|---|---|---|
| 제출한 서류를 삭제할까요? | 의문형으로 한 번 더 의사를 묻고, 결정권은 사용자에게 전달합니다. | 정말 삭제하시겠습니까? | 무엇을 삭제하는지가 불명확하고 사용자를 추궁하는 느낌을 줍니다. |
| 예약금 결제가 완료되었어요.<br>확인 버튼을 눌러 보조금 신청유형을 선택하세요. | 완료 상태를 명확히 한 후 다음 액션까지 제시합니다. | 결제 성공 | 문구가 명사형으로 끝나 딱딱하고, 다음 행동이 제시되지 않아 혼란을 야기합니다. |

### 5.5 버튼 및 CTA

화면을 이동하거나 특수한 액션이 필요한 경우 버튼 라벨을 통해 사용자에게 안내합니다.

#### Rules

버튼 라벨은 상황에 따라 명사형, `~하기`형, 문장형의 세 가지 유형으로 사용합니다.

| Type | Usage |
|---|---|
| 명사형 | 수정, 삭제 등 작은 사이즈 버튼에서 명확한 액션 인지가 가능할 경우. CTA 버튼에서 완료, 다음, 이전 등 진행상황 안내가 필요할 경우. |
| `~하기`형 | 대부분의 버튼에서 사용합니다. |
| 문장형 | `~할게요`, `~했어요`, `~돌아올게요` 등 결심, 확인, 약속의 어미로 사용합니다. 다음 액션 안내가 필요할 경우 사용합니다. |

#### Examples

| Category | CTA Label |
|---|---|
| 추가보조금 안내 | 확인했어요 |
| 정부24 / 수신인 등록 | 수신인 등록을 눌렀어요 |
| 서류보완 최종확인 | 네, 최종 제출할게요 |
| 전자서명 / 대기 | 알림 받으면 돌아올게요 |
| 카톡인증 / 완료 | 카카오톡으로 인증 완료했어요 |
| 서류제출 / 제출안내 | 제출하기 |
| 주문확인 / 옵션변경 | 옵션 변경하기 |

#### Do & Don’t

| DO | Why | DON’T | Why Not |
|---|---|---|---|
| 네, 최종 제출할게요 | 중요한 단계에서 친근한 문장형으로 사용자의 결정을 유도합니다. | 제출 | 짧지만 상황에 따라 중요도가 낮아 보일 수 있습니다. |
| 알림 받으면 돌아올게요 | 대기 화면에서 `이 버튼을 누르고 잠시 떠나도 된다`는 약속을 줍니다. | 확인 | 다음 액션을 예상할 수 없습니다. |

### 5.6 대기 및 빈 화면

사용자가 기다리거나, 시스템이 처리 중인 화면에 쓰입니다.

#### Rules

- 대기 중인 화면에 처리하고 있는 일을 명시하여 `바드림이 같이 일하고 있다`고 느끼게 합니다.
- `~하고 있어요` 진행형으로 사용합니다.
- 대기의 마무리를 확인할 방법, 예: 알림, 문자, 다음 화면까지 함께 안내합니다.

#### Examples

| Category | Example |
|---|---|
| 잔여금 결제 / 처리 중 | 결제를 처리하고 있어요! |
| 바이크 출고 / 출고 대기 | 고객님의 바이크를 준비하고 있어요. |
| 초본 발급 / 화면 대기 | 김드림님의 증명서를 발급하고 있어요. |
| 전자서명 / 대기 | 카카오톡 알림이 올 때까지 기다려주세요. |
| 잔여금 입금계좌 | 입금 확인이 끝나면 알림으로 알려드릴게요! |
| 전자서명 / 공고 오픈 전 | 오픈 전까지 바드림에서 서류를 미리 검토해 둘게요. 검토 결과에 따라 서류 보완을 요청드릴 수 있어요. 검토 완료까지 보통 1~2일 정도 걸려요. |

#### Do & Don’t

| DO | Why | DON’T | Why Not |
|---|---|---|---|
| 고객님의 바이크를 준비하고 있어요. | 진행형 + 주체가 보여 누가 무엇을 하는지 분명합니다. | 출고 대기 중 | 상태 라벨에 가까워 사용자에게 명확한 안내가 되지 않습니다. |
| 로딩 아이콘 + 김드림님의 증명서를 발급하고 있어요. | 뒤에서 작업이 진행 중이라는 사실을 명확히 인지할 수 있습니다. | 로딩 아이콘 | 단계가 진행 중인지, 오류 상황인지 불명확합니다. |

---

## 6. UX Writing 3 - Pattern

실제 예시 1,400여 개 문장을 분석하여, 95% 이상을 차지하는 6가지 패턴의 종결 어미를 정리했습니다.

> 예시 출처: `badream_ux_sentences.json` (실서비스 문구 1,455건)

### 6.1 자주 쓰이는 패턴

| Pattern | Usage | Examples |
|---|---|---|
| `~되었어요` | 토스트/완료 어미. 사용자 행동의 결과를 차분하게 안내할 때 | `추가보조금이 적용되었어요` / `예약금 결제가 완료되었어요` |
| `~해주세요` | 명령보다는 부탁의 어조. 다음 행동을 유도할 때 | `주민등록상 지자체를 선택해주세요` / `다시 한 번 확인해주세요` |
| `~할게요` / `~드릴게요` | 대기/알림 안내. 진행 상황과 확인 방법을 안내할 때 | `바드림에서 서류를 미리 검토해 둘게요` / `알림으로 알려드릴게요` |
| `~할까요?` | 되돌릴 수 없는 액션 직전의 재확인. 사용자에게 결정권을 돌려줄 때 | `제출한 서류를 삭제할까요?` / `나중에 작성할까요?` |
| `~할 수 있어요` / `~수 없어요` | 가능성/제약 안내. `불가능합니다` 대신 사실만 부드럽게 안내할 때 | `최대 3회까지 분할할 수 있어요` / `아래 버튼을 누르면 수정할 수 없어요` |
| `~있을 수 있어요` | 리스크/예외 안내. 단정 짓지 않고 가능성을 열어둘 때 | `검토 결과에 따라 서류 보완이 있을 수 있어요` / `추후 다시 보완요청이 올 수 있어요` |

### 6.2 줄바꿈 규칙

바드림에서는 대부분 의미 단위로 줄바꿈합니다. 길이를 맞추기 위한 줄바꿈이 아니라, 한 호흡으로 읽히는 지점을 찾습니다.

| DO | DON’T |
|---|---|
| 정부24 화면이 열리면 바로 진행하지 말고<br>다시 바드림 앱으로 돌아와주세요. | 정부24 화면이 열리면 바로 진행하지<br>말고 다시 바드림 앱으로 돌아와주세요. |

- `하지 말고`와 `돌아와주세요` 사이의 호흡 지점에서 줄바꿈합니다.
- `진행하지`와 `말고` 사이가 끊기면 의미가 어색하게 분절됩니다.

### 6.3 이름과 호칭

`고객님`보다 사용자의 이름, 예: `김드림님`을 부르는 표현을 사용합니다. 시스템 메시지가 아니라 실제 사람의 친근함이 느껴지게 합니다.

| Category | Example |
|---|---|
| Title | 김드림님의<br>주민등록초본을 발급할게요. |
| Title | 김드림님의 증명서를 발급하고 있어요. |

### 6.4 피해야 할 표현

작성한 문장에 아래의 잘못된 예시가 포함될 경우 다시 작성합니다.

| DON’T | DO | Rationale |
|---|---|---|
| `~하시기 바랍니다` / `~하여 주십시오` | `~해주세요` / `~해요` | 법적고지 및 중요안내 상황이 아니면 하십시오체를 사용하지 않습니다. 기본적으로 해요체를 사용합니다. |
| `실패` / `오류 발생` / `처리 불가` | `정상적으로 처리되지 않았어요` / `결제 불가능해요` | 상황을 사실대로 나열하고, 사용자 잘못이 아님을 표현합니다. |
| `완료!!` / `성공!!` / `주의!!` | `제출이 완료되었어요` | 느낌표 남발은 톤을 들뜨게 하고 신뢰를 저하합니다. `!`는 1개만 사용합니다. `되었어요`만으로도 충분히 완료감을 줍니다. |
| `잠시 후 다시 시도해주세요` | `검토 완료까지 보통 1~2일 정도 걸려요. 완료되면 알림으로 알려드릴게요.` | 모호한 기간 안내는 사용자를 불안하게 합니다. 명확한 시간 단위와 확인 방법까지 함께 안내합니다. |
| `고객의 귀책으로 인해 보조금이 환수될 수 있습니다.` | `위 정보가 일치하지 않을 경우, 보조금이 환수될 수 있어요.` | 법률문 같은 어휘는 위협처럼 들릴 수 있습니다. 조건을 사실로 기술하고 가능성을 열어두는 표현을 사용합니다. |

---

---

## 7. Foundations - Shadow

Shadow는 화면 안에서 UI 요소 간 위계와 중요도 정의에 필요한 효과입니다. 바드림 디자인시스템은 기본적으로 색상 대비를 통해 요소를 구분하기 때문에, 꼭 필요한 부분 외에 무분별하게 Drop Shadow를 적용하지 않도록 합니다.

- 상황에 따라 가이드에 없는 Shadow를 추가할 수 있지만, 화면 내 위계를 벗어나지 않도록 유의합니다.
- Shadow는 Style로 등록하여 사용합니다.

|Token|Usage|X|Y|Blur|Spread|Color|Ref Color|CSS|
|---|---|---|---|---|---|---|---|---|
|shadow_01|1차 Depth - 48px 이내의 작은 컴포넌트의 약한 강조에 활용|0|2|4|0|#464D59 / 20%|ref-color-shadow-01|0 2px 4px 0 rgb(70 77 89 / 20%)|
|shadow_02|2차 Depth - 적당한 크기의 컴포넌트의 약한 강조에 활용|0|4|6|-1|#464D59 / 20%|ref-color-shadow-01|0 4px 6px -1px rgb(70 77 89 / 20%)|
|shadow_03|3차 Depth - 기본값으로 사용하기 적합하며, 일반적인 강조에 활용|0|6|12|-2|#464D59 / 20%|ref-color-shadow-01|0 6px 12px -2px rgb(70 77 89 / 20%)|
|shadow_04|4차 Depth - 일반적인 경우보다 조금 더 강한 강조에 활용|0|8|20|-3|#464D59 / 24%|ref-color-shadow-02|0 8px 20px -3px rgb(70 77 89 / 24%)|
|shadow_05|5차 Depth - 깊이감이 필요하거나 가장 강한 강조가 필요할 경우에 활용|0|12|24|-4|#464D59 / 32%|ref-color-shadow-03|0 12px 24px -4px rgb(70 77 89 / 32%)|
|shadow_sh|화면에 Overlay되는 Bottom Sheet에 활용|0|-6|12|-2|#464D59 / 20%|ref-color-shadow-01|0 -6px 12px -2px rgb(70 77 89 / 20%)|

### 7.1 Shadow Usage

|Component|Shadow|
|---|---|
|Pop-Up|shadow_02|
|Bottom Sheet|shadow_sh|
|Toast|X 0 / Y 6 / Blur 16 / Spread 0 / Color #000000 10%|

---
## 8. Foundations - Spacing

Spacing은 UI 요소 간 간격을 정의하고 관리하는 기본 단위입니다. 바드림 디자인시스템은 2·4·8 배수를 기반으로, 일부 구간에서 예외의 값을 적용합니다. 이 방식을 통해 다양한 기기에서 일관된 간격과 최적화된 레이아웃을 제공합니다.

- Gap과 Padding 구분 없이 Spacing 값을 사용합니다.
- Example values: -2px, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 120, 200.

|Token Name|Value|
|---|---|
|ref-spacing-00|-2px|
|ref-spacing-01|1px|
|ref-spacing-02|2px|
|ref-spacing-03|3px|
|ref-spacing-04|4px|
|ref-spacing-05|6px|
|ref-spacing-06|8px|
|ref-spacing-07|10px|
|ref-spacing-08|12px|
|ref-spacing-09|14px|
|ref-spacing-10|16px|
|ref-spacing-11|20px|
|ref-spacing-12|24px|
|ref-spacing-13|28px|
|ref-spacing-14|32px|
|ref-spacing-15|36px|
|ref-spacing-16|40px|
|ref-spacing-17|48px|
|ref-spacing-18|56px|
|ref-spacing-19|64px|
|ref-spacing-20|72px|
|ref-spacing-21|80px|
|ref-spacing-22|120px|
|ref-spacing-23|200px|

---
## 9. Foundations - Radius

Radius는 컴포넌트의 시각적 일관성을 유지하는 핵심 요소입니다. 바드림 디자인시스템은 시멘틱 Radius 토큰을 도입해 디자인과 개발 작업 기준을 통일하고, 시스템 전반의 일관성을 강화하여 어떤 환경에서도 동일한 디자인 경험을 제공합니다.

- Full Bleed Button 등 화면 가로 폭 전체를 차지하는 컴포넌트의 경우, Radius 값을 `0`으로 정합니다.

|Token Name|Value|
|---|---|
|ref-radius-01|2px|
|ref-radius-02|4px|
|ref-radius-03|6px|
|ref-radius-04|8px|
|ref-radius-05|10px|
|ref-radius-06|12px|
|ref-radius-07|16px|
|ref-radius-08|20px|
|ref-radius-09|24px|
|ref-radius-10|32px|
|ref-radius-11|40px|
|ref-radius-12|999px|

### 9.1 Radius Usage

|Component|Value|Token|
|---|---|---|
|Input/Option|12px|ref-radius-06|
|Sheet|16px|ref-radius-07|
|Pop-Up|20px|ref-radius-08|

Example values: 2px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 32px, 40px, 999px.

---
## 10. Foundations - Border Width

예외의 경우를 제외한 대부분의 컴포넌트에 아래와 같은 Border Width값을 적용합니다. 각 값은 컴포넌트의 특징에 따라 활용이 구분됩니다.

Token naming example: `ref-borderwidth-01`

|Token Name|Value|
|---|---:|
|ref-borderwidth-01|0.5px|
|ref-borderwidth-02|1px|
|ref-borderwidth-03|2px|
|ref-borderwidth-04|4px|
|ref-borderwidth-05|6px|
|ref-borderwidth-06|8px|
|ref-borderwidth-07|10px|
|ref-borderwidth-08|12px|
|ref-borderwidth-09|14px|

Example values: 0.5px, 1px, 2px, 4px, 6px, 8px, 10px, 12px, 14px.

---
## 11. Foundations - Grid

바드림 디자인시스템에서는 화면별 기본 Margin값만 엄격하게 적용하고, Grid는 최적화된 레이아웃을 지향점으로 유연하고 확장성 있게 상황에 맞춰 적용합니다.

- Mobile과 Web 모두 스크롤 시 하단 Padding값 40px을 필수로 적용합니다.

### 11.1 Mobile Grid

| Size | Column | Margin | Gutter | Figma Frame | Content Width | Bottom Padding |
|---|---:|---:|---:|---|---:|---:|
| 390 × 844 | 4 | 20px | 12px | figma-iPhone14 | 350px | 40px |

- Margin token: `ref-spacing-11` = 20px
- Gutter token: `ref-spacing-08` = 12px
- Total width: 390px
- Content width: 350px
- Horizontal rhythm: 20px margin / 12px gutter / 20px margin

### 11.2 Web Grid

| Size | Column | Margin | Gutter | Figma Frame | Content Width | Bottom Padding |
|---|---:|---:|---:|---|---:|---:|
| 1920 × 1080 | 12 | 40px | 24px | figma-slide16:9 | 1840px | 40px |

- Margin token: `ref-spacing-16` = 40px
- Gutter token: `ref-spacing-12` = 24px
- Total width: 1920px
- Content width: 1840px
- Horizontal rhythm: 40px margin / 24px gutter / 40px margin

---
## 12. Foundations - Color Chips

Color는 원활한 협업을 위해 HEX 코드 대신 컬러명 혹은 컬러 토큰명을 사용합니다. 기본적으로 컬러트리에 정의된 색상을 사용하며, 새로운 색상이 반복적으로 필요할 경우 추가합니다.

- 색상의 기능과 역할에 따라 일부 요소에 시멘틱 컬러를 지정하여 사용합니다.
- 기능과 역할이 명확하더라도 사용 빈도가 낮으면 제외하는 등, 유연하고 확장성 있게 상황에 맞춰 운영합니다.
- 배경 요소 위의 계층 명암비는 WCAG 기준을 준수해야 합니다.

### 12.1 Design Token - Reference

Token naming example: `ref-color-blue-50` or `ref-color-blue-500-20`.

#### Blue

|Token Name|Value|
|---|---|
|ref-color-blue-50|#EEF4FC|
|ref-color-blue-100|#D0E3FE|
|ref-color-blue-200|#B0D0FD|
|ref-color-blue-300|#84B6FD|
|ref-color-blue-400|#609FF7|
|ref-color-blue-500|#2C7BE2|
|ref-color-blue-600|#2369C6|
|ref-color-blue-700|#1A539E|
|ref-color-blue-800|#123E78|
|ref-color-blue-900|#0D2D57|
#### Deep Blue

|Token Name|Value|
|---|---|
|ref-color-deepBlue-50|#ECEFF2|
|ref-color-deepBlue-100|#CED5DF|
|ref-color-deepBlue-200|#ABB7C9|
|ref-color-deepBlue-300|#8395B2|
|ref-color-deepBlue-400|#5D7499|
|ref-color-deepBlue-500|#36517E|
|ref-color-deepBlue-600|#2D456D|
|ref-color-deepBlue-700|#223555|
|ref-color-deepBlue-800|#192840|
|ref-color-deepBlue-900|#0E182A|
#### Emerald

|Token Name|Value|
|---|---|
|ref-color-emerald-50|#EDF8F3|
|ref-color-emerald-100|#C6EBDB|
|ref-color-emerald-200|#A6E0C8|
|ref-color-emerald-300|#7CD0AF|
|ref-color-emerald-400|#5FC49F|
|ref-color-emerald-500|#33B289|
|ref-color-emerald-600|#2D9F7A|
|ref-color-emerald-700|#227C5F|
|ref-color-emerald-800|#1B5E48|
|ref-color-emerald-900|#174736|
#### Purple

|Token Name|Value|
|---|---|
|ref-color-purple-50|#FAEFFC|
|ref-color-purple-100|#EDC9F4|
|ref-color-purple-200|#E1AAED|
|ref-color-purple-300|#D180E1|
|ref-color-purple-400|#C161D5|
|ref-color-purple-500|#AF3BC6|
|ref-color-purple-600|#9F35B4|
|ref-color-purple-700|#7D298D|
|ref-color-purple-800|#5F216C|
|ref-color-purple-900|#471950|
#### Turquoise

|Token Name|Value|
|---|---|
|ref-color-turquoise-50|#E9FBF9|
|ref-color-turquoise-100|#B6EEE8|
|ref-color-turquoise-200|#90E5DC|
|ref-color-turquoise-300|#5ED8CD|
|ref-color-turquoise-400|#3ACFC3|
|ref-color-turquoise-500|#00BEB3|
|ref-color-turquoise-600|#00ACA2|
|ref-color-turquoise-700|#00877F|
|ref-color-turquoise-800|#046861|
|ref-color-turquoise-900|#064F4A|
#### Red

|Token Name|Value|
|---|---|
|ref-color-red-50|#FFEDEB|
|ref-color-red-100|#FCC4BF|
|ref-color-red-200|#F8A49D|
|ref-color-red-300|#F57870|
|ref-color-red-400|#F05B57|
|ref-color-red-500|#E72F37|
|ref-color-red-600|#D12930|
|ref-color-red-700|#A32226|
|ref-color-red-800|#7E191C|
|ref-color-red-900|#5E1314|
#### Green

|Token Name|Value|
|---|---|
|ref-color-green-50|#EBFAEB|
|ref-color-green-100|#C3EFC3|
|ref-color-green-200|#98E49A|
|ref-color-green-300|#65D46C|
|ref-color-green-400|#32BE46|
|ref-color-green-500|#24A638|
|ref-color-green-600|#1F8F30|
|ref-color-green-700|#1B7026|
|ref-color-green-800|#15561D|
|ref-color-green-900|#104115|
#### Orange

|Token Name|Value|
|---|---|
|ref-color-orange-50|#FFF3ED|
|ref-color-orange-100|#FFD8C3|
|ref-color-orange-200|#FFC3A4|
|ref-color-orange-300|#FFA678|
|ref-color-orange-400|#FF945C|
|ref-color-orange-500|#FF792C|
|ref-color-orange-600|#E96E27|
|ref-color-orange-700|#B65621|
|ref-color-orange-800|#8D4219|
|ref-color-orange-900|#6C3214|
#### Yellow

|Token Name|Value|
|---|---|
|ref-color-yellow-50|#FFF9EA|
|ref-color-yellow-100|#FFEEBF|
|ref-color-yellow-200|#FFE49E|
|ref-color-yellow-300|#FFD774|
|ref-color-yellow-400|#FFCD54|
|ref-color-yellow-500|#FABF21|
|ref-color-yellow-600|#E1AD25|
|ref-color-yellow-700|#B0871A|
|ref-color-yellow-800|#886815|
|ref-color-yellow-900|#674E0F|
#### Gray

|Token Name|Value|
|---|---|
|ref-color-gray-0|#FFFFFF|
|ref-color-gray-50|#FDFDFD|
|ref-color-gray-100|#F6F7F7|
|ref-color-gray-200|#F1F2F3|
|ref-color-gray-300|#DBDCDF|
|ref-color-gray-400|#C2C4C8|
|ref-color-gray-500|#8C9199|
|ref-color-gray-600|#5B616C|
|ref-color-gray-700|#454C58|
|ref-color-gray-800|#202837|
|ref-color-gray-900|#03091A|
|ref-color-gray-1000|#000000|

#### Alpha / Transparent Color Tokens

|Token Name|Value|
|---|---|
|ref-color-blue-500-20|#2C7BE2 20%|
|ref-color-blue-500-40|#2C7BE2 40%|
|ref-color-blue-500-60|#2C7BE2 60%|
|ref-color-blue-500-80|#2C7BE2 80%|
|ref-color-deepBlue-500-20|#36517E 20%|
|ref-color-deepBlue-500-40|#36517E 40%|
|ref-color-deepBlue-500-60|#36517E 60%|
|ref-color-deepBlue-500-80|#36517E 80%|
|ref-color-emerald-500-20|#33B289 20%|
|ref-color-emerald-500-40|#33B289 40%|
|ref-color-emerald-500-60|#33B289 60%|
|ref-color-emerald-500-80|#33B289 80%|
|ref-color-purple-500-20|#AF3BC6 20%|
|ref-color-purple-500-40|#AF3BC6 40%|
|ref-color-purple-500-60|#AF3BC6 60%|
|ref-color-purple-500-80|#AF3BC6 80%|
|ref-color-turquoise-600-20|#00ACA2 20%|
|ref-color-turquoise-600-40|#00ACA2 40%|
|ref-color-turquoise-600-60|#00ACA2 60%|
|ref-color-turquoise-600-80|#00ACA2 80%|
|ref-color-red-500-20|#E72F37 20%|
|ref-color-red-500-40|#E72F37 40%|
|ref-color-red-500-60|#E72F37 60%|
|ref-color-red-500-80|#E72F37 80%|
|ref-color-green-600-20|#1F8F30 20%|
|ref-color-green-600-40|#1F8F30 40%|
|ref-color-green-600-60|#1F8F30 60%|
|ref-color-green-600-80|#1F8F30 80%|
|ref-color-orange-500-20|#FF792C 20%|
|ref-color-orange-500-40|#FF792C 40%|
|ref-color-orange-500-60|#FF792C 60%|
|ref-color-orange-500-80|#FF792C 80%|
|ref-color-yellow-500-20|#FABF21 20%|
|ref-color-yellow-500-40|#FABF21 40%|
|ref-color-yellow-500-60|#FABF21 60%|
|ref-color-yellow-500-80|#FABF21 80%|
|ref-color-gray-900-2|#03091A 2%|
|ref-color-gray-900-5|#03091A 5%|
|ref-color-gray-900-10|#03091A 10%|
|ref-color-gray-900-20|#03091A 20%|
|ref-color-gray-900-40|#03091A 40%|
|ref-color-gray-900-60|#03091A 60%|
|ref-color-gray-900-80|#03091A 80%|
|ref-color-gray-50-5|#FDFDFD 5%|
|ref-color-gray-50-10|#FDFDFD 10%|
|ref-color-gray-50-20|#FDFDFD 20%|
|ref-color-gray-50-40|#FDFDFD 40%|
|ref-color-gray-50-60|#FDFDFD 60%|
|ref-color-gray-50-80|#FDFDFD 80%|

#### Shadow Color Tokens

|Token Name|Value|
|---|---|
|ref-color-shadow-01|#454C58 20%|
|ref-color-shadow-02|#454C58 24%|
|ref-color-shadow-03|#454C58 32%|

### 12.2 Design Token - System

Token naming example: `sys-color-brand-primary-default`.

|Token Name|Reference Value|
|---|---|
|sys-color-brand-primary-lightest|ref-color-blue-50|
|sys-color-brand-primary-lighter|ref-color-blue-100|
|sys-color-brand-primary-light|ref-color-blue-300|
|sys-color-brand-primary-default|ref-color-blue-500|
|sys-color-brand-primary-dark|ref-color-blue-700|
|sys-color-brand-primary-darker|ref-color-blue-900|
|sys-color-brand-secondary-lighter|ref-color-deepBlue-100|
|sys-color-brand-secondary-light|ref-color-deepBlue-300|
|sys-color-brand-secondary-default|ref-color-deepBlue-500|
|sys-color-brand-secondary-dark|ref-color-deepBlue-700|
|sys-color-brand-secondary-darker|ref-color-deepBlue-900|
|sys-color-brand-tertiary-lighter|ref-color-emerald-100|
|sys-color-brand-tertiary-light|ref-color-emerald-300|
|sys-color-brand-tertiary-default|ref-color-emerald-500|
|sys-color-brand-tertiary-dark|ref-color-emerald-700|
|sys-color-brand-tertiary-darker|ref-color-emerald-900|
|sys-color-theme-purple-bg|ref-color-purple-50|
|sys-color-theme-purple-default|ref-color-purple-500|
|sys-color-theme-turquoise-bg|ref-color-turquoise-50|
|sys-color-theme-turquoise-default|ref-color-turquoise-600|
|sys-color-theme-destructed-bg|ref-color-red-50|
|sys-color-theme-destructed-default|ref-color-red-500|
|sys-color-theme-success-bg|ref-color-green-50|
|sys-color-theme-success-default|ref-color-green-600|
|sys-color-theme-warning-bg|ref-color-orange-50|
|sys-color-theme-warning-default|ref-color-orange-500|
|sys-color-theme-rating-bg|ref-color-yellow-50|
|sys-color-theme-rating-default|ref-color-yellow-500|
|sys-color-common-white-default|ref-color-gray-50|
|sys-color-common-white-emphasis|ref-color-gray-0|
|sys-color-common-black-default|ref-color-gray-900|
|sys-color-common-black-emphasis|ref-color-gray-1000|
|sys-color-neutral-100|ref-color-gray-100|
|sys-color-neutral-200|ref-color-gray-200|
|sys-color-neutral-300|ref-color-gray-300|
|sys-color-neutral-400|ref-color-gray-400|
|sys-color-neutral-500|ref-color-gray-500|
|sys-color-neutral-600|ref-color-gray-600|
|sys-color-neutral-700|ref-color-gray-700|
|sys-color-neutral-800|ref-color-gray-800|

### 12.3 Design Token - Interaction

Interaction token은 버튼, 칩, 리스트, 카드, 탭, 아이콘 버튼, 선택 영역처럼 사용자 입력에 반응하는 UI의 배경/피드백 색상에 사용합니다. Interaction 계열은 기존 Reference Color를 기반으로 구성하며, 컴포넌트 상태를 HEX 값으로 직접 지정하지 않고 아래 토큰을 참조합니다.

- 기본 원칙: 클릭/터치/선택/hover 피드백은 Interaction token을 우선 사용합니다.
- 강한 색상의 가벼운 피드백은 alpha token을 사용합니다.
- Light 계열은 밝은 surface, chip, option, selected background에 사용합니다.
- `light-gray`는 neutral surface의 기본/hover/pressed/disabled 상태까지 포함합니다.

> **⚠️ 2026-08-26 정정**: 아래 "Interaction Token Values" 표의 Reference Token / Value 컬럼은 최초 작성 시 실제 Figma 변수와 다르게 잘못 기재되어 있었습니다. `get_variable_defs`로 실측한 결과 실제 값은 **base 계열 = `[color]-900` 15%/30%**, **light-chromatic 계열 = `[default step]` 8%/15%**, **light-gray = `gray-900` 5%/10%** 입니다 (예: `interaction/blue/hover` = `blue-500 20%`가 아니라 **`blue-900 #0D2D57` 15%**). 아래 표에서 **blue, red, gray, light-blue, light-red, light-gray 6개 계열은 실측값으로 정정**했으며, 나머지 chromatic 계열(deep-blue/emerald/purple/turquoise/green/orange/yellow 및 light 변형)은 버튼에서 사용되지 않아 미실측이므로 **"확인 필요"**로 표시했습니다(관측 패턴상 base=`[color]-900` 15/30, light=`[default step]` 8/15로 추정).

#### Interaction Token Families

|Family|Token Count|Usage|
|---|---:|---|
|interaction/gray|2|중립/검정 계열 요소의 hover, pressed 피드백|
|interaction/light-gray|4|밝은 neutral surface의 default, hover, pressed, disabled 상태|
|interaction/blue|2|Primary/blue 계열 요소의 hover, pressed 피드백|
|interaction/light-blue|2|Primary/blue 계열의 밝은 surface 상태|
|interaction/deep-blue|2|Secondary/deep-blue 계열 요소의 hover, pressed 피드백|
|interaction/light-deep-blue|2|Secondary/deep-blue 계열의 밝은 surface 상태|
|interaction/emerald|2|Tertiary/emerald 계열 요소의 hover, pressed 피드백|
|interaction/light-emerald|2|Tertiary/emerald 계열의 밝은 surface 상태|
|interaction/purple|2|Purple theme 요소의 hover, pressed 피드백|
|interaction/light-purple|2|Purple theme의 밝은 surface 상태|
|interaction/turquoise|2|Turquoise theme 요소의 hover, pressed 피드백|
|interaction/light-turquoise|2|Turquoise theme의 밝은 surface 상태|
|interaction/red|2|Destructed/error 계열 요소의 hover, pressed 피드백|
|interaction/light-red|2|Destructed/error 계열의 밝은 surface 상태|
|interaction/green|2|Success 계열 요소의 hover, pressed 피드백|
|interaction/light-green|2|Success 계열의 밝은 surface 상태|
|interaction/orange|2|Warning 계열 요소의 hover, pressed 피드백|
|interaction/light-orange|2|Warning 계열의 밝은 surface 상태|
|interaction/yellow|2|Rating/yellow 계열 요소의 hover, pressed 피드백|
|interaction/light-yellow|2|Rating/yellow 계열의 밝은 surface 상태|

#### Interaction Token Values

|Figma Variable Path|CSS Variable|State|Reference Token|Value|
|---|---|---|---|---|
|interaction/gray/hover|--interaction-gray-hover|hover|gray-900 @15% (#03091A26)|#03091A 15%|
|interaction/gray/pressed|--interaction-gray-pressed|pressed|gray-900 @30% (#03091A4D)|#03091A 30%|
|interaction/light-gray/hover|--interaction-light-gray-hover|hover|ref-color-gray-900-5 (#03091A0D)|#03091A 5%|
|interaction/light-gray/pressed|--interaction-light-gray-pressed|pressed|ref-color-gray-900-10 (#03091A1A)|#03091A 10%|
|interaction/blue/hover|--interaction-blue-hover|hover|blue-900 @15% (#0D2D5726)|#0D2D57 15%|
|interaction/blue/pressed|--interaction-blue-pressed|pressed|blue-900 @30% (#0D2D574D)|#0D2D57 30%|
|interaction/light-blue/hover|--interaction-light-blue-hover|hover|blue-500 @8% (#2C7BE214)|#2C7BE2 8%|
|interaction/light-blue/pressed|--interaction-light-blue-pressed|pressed|blue-500 @15% (#2C7BE226)|#2C7BE2 15%|
|interaction/red/hover|--interaction-red-hover|hover|red-900 @15% (#5E131426)|#5E1314 15%|
|interaction/red/pressed|--interaction-red-pressed|pressed|red-900 @30% (#5E13144D)|#5E1314 30%|
|interaction/light-red/hover|--interaction-light-red-hover|hover|red-500 @8% (#E72F3714)|#E72F37 8%|
|interaction/light-red/pressed|--interaction-light-red-pressed|pressed|red-500 @15% (#E72F3726)|#E72F37 15%|
|interaction/deep-blue/hover·pressed|--interaction-deep-blue-*|hover/pressed|확인 필요 (추정 deepBlue-900 15%/30%)|확인 필요|
|interaction/light-deep-blue/hover·pressed|--interaction-light-deep-blue-*|hover/pressed|확인 필요 (추정 deepBlue-500 8%/15%)|확인 필요|
|interaction/emerald/hover·pressed|--interaction-emerald-*|hover/pressed|확인 필요 (추정 emerald-900 15%/30%)|확인 필요|
|interaction/light-emerald/hover·pressed|--interaction-light-emerald-*|hover/pressed|확인 필요 (추정 emerald-500 8%/15%)|확인 필요|
|interaction/purple/hover·pressed|--interaction-purple-*|hover/pressed|확인 필요 (추정 purple-900 15%/30%)|확인 필요|
|interaction/light-purple/hover·pressed|--interaction-light-purple-*|hover/pressed|확인 필요 (추정 purple-500 8%/15%)|확인 필요|
|interaction/turquoise/hover·pressed|--interaction-turquoise-*|hover/pressed|확인 필요 (추정 turquoise-900 15%/30%)|확인 필요|
|interaction/light-turquoise/hover·pressed|--interaction-light-turquoise-*|hover/pressed|확인 필요 (추정 turquoise-600 8%/15%)|확인 필요|
|interaction/green/hover·pressed|--interaction-green-*|hover/pressed|확인 필요 (추정 green-900 15%/30%)|확인 필요|
|interaction/light-green/hover·pressed|--interaction-light-green-*|hover/pressed|확인 필요 (추정 green-600 8%/15%)|확인 필요|
|interaction/orange/hover·pressed|--interaction-orange-*|hover/pressed|확인 필요 (추정 orange-900 15%/30%)|확인 필요|
|interaction/light-orange/hover·pressed|--interaction-light-orange-*|hover/pressed|확인 필요 (추정 orange-500 8%/15%)|확인 필요|
|interaction/yellow/hover·pressed|--interaction-yellow-*|hover/pressed|확인 필요 (추정 yellow-900 15%/30%)|확인 필요|
|interaction/light-yellow/hover·pressed|--interaction-light-yellow-*|hover/pressed|확인 필요 (추정 yellow-500 8%/15%)|확인 필요|

### 12.4 Palette Default Markers & WCAG Rule

Color Chips 표에는 각 팔레트에서 실제 주요 역할에 쓰이는 기본 단계가 선택 표시되어 있습니다.

| Palette | Default / Selected Step | Token |
|---|---:|---|
| Blue | 500 | ref-color-blue-500 |
| Deep Blue | 500 | ref-color-deepBlue-500 |
| Emerald | 500 | ref-color-emerald-500 |
| Purple | 500 | ref-color-purple-500 |
| Turquoise | 600 | ref-color-turquoise-600 |
| Red / Destructed | 500 | ref-color-red-500 |
| Green / Success | 600 | ref-color-green-600 |
| Orange / Warning | 500 | ref-color-orange-500 |
| Yellow / Rating | 500 | ref-color-yellow-500 |

- 배경 요소 위의 텍스트/아이콘/컴포넌트는 WCAG 기준을 만족해야 합니다.
- 색상의 기능과 역할이 명확하더라도 사용 빈도가 낮으면 시스템 토큰에서 제외할 수 있습니다.
- 시스템 토큰이 없는 색은 Reference Token으로 먼저 정의하고, 반복 사용될 때 System Token으로 승격합니다.

---
## 13. Foundations - Color System

바드림 디자인시스템에서 정의한 Color의 위계와 쓰임입니다. 기능과 역할이 명확하더라도 필요 시 다른 용도에도 사용하는 등, 유연하고 확장성 있게 상황에 맞춰 운영합니다.

- Error 색상은 강조의 상황에서도 사용합니다.

### 13.1 Brand Color

| Color | RGB | HSL | CMYK | HEX |
|---|---|---|---|---|
| Primary | 44 / 123 / 226 | 214 / 76% / 53% | 81 / 46 / 0 / 11 | #2C7BE2 |
| Secondary | 54 / 81 / 126 | 218 / 40% / 35% | 57 / 36 / 0 / 51 | #36517E |
| Tertiary | 51 / 178 / 137 | 161 / 55% / 45% | 71 / 0 / 23 / 30 | #33B289 |

### 13.2 Theme Color

| Color | RGB | HSL | CMYK | HEX |
|---|---|---|---|---|
| Purple | 175 / 59 / 198 | 290 / 55% / 50% | 12 / 70 / 0 / 22 | #AF3BC6 |
| Turquoise | 0 / 172 / 162 | 177 / 100% / 34% | 100 / 0 / 6 / 33 | #00ACA2 |
| Destructed | 231 / 47 / 55 | 357 / 79% / 55% | 0 / 80 / 76 / 9 | #E72F37 |
| Success | 36 / 166 / 56 | 129 / 64% / 40% | 78 / 0 / 66 / 35 | #24A638 |
| Warning | 255 / 121 / 44 | 22 / 100% / 59% | 0 / 53 / 83 / 0 | #FF792C |
| Rating | 250 / 191 / 33 | 44 / 96% / 55% | 0 / 24 / 87 / 2 | #FABF21 |

### 13.3 Surface Color

| Surface | RGB | HSL | CMYK | HEX |
|---|---|---|---|---|
| Mobile | 253 / 253 / 253 | 0 / 0% / 99% | 0 / 0 / 0 / 1 | #FDFDFD |
| Web | 255 / 255 / 255 | 0 / 0% / 100% | 0 / 0 / 0 / 0 | #FFFFFF |

### 13.4 Gradient Color

Gradient는 Style로 별도 등록하여 사용합니다.

#### Gradient White - upward

| Stop | Color | Opacity |
|---:|---|---:|
| 0% | #FDFDFD | 0% |
| 15% | #FDFDFD | 8% |
| 30% | #FDFDFD | 22% |
| 50% | #FDFDFD | 42% |
| 70% | #FDFDFD | 64% |
| 85% | #FDFDFD | 82% |
| 100% | #FDFDFD | 100% |

#### Gradient Blue - downward_diag

| Stop | Color | Opacity |
|---:|---|---:|
| 0% | #84B6FD | 100% |
| 50% | #2C7BE2 | 100% |
| 80% | #009DCF | 100% |

### 13.5 Color Palette

Color Palette 페이지는 Blue, Deep Blue, Emerald, Purple, Turquoise, Red, Green, Orange, Yellow, Gray 팔레트의 단계별 HEX 값과 배경 대비 정보를 함께 보여줍니다. 각 팔레트 카드는 검정 텍스트와 흰색 텍스트의 대비 비율 및 AA/AAA 여부를 표시합니다.

#### Blue

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#0D2D57|1.53 -|13.72 AAA||
|800|#123E78|1.99 -|10.57 AAA||
|700|#1A539E|2.77 -|7.57 AAA||
|600|#2369C6|3.91 -|5.37 AA||
|500|#2C7BE2|5.04 AA|4.17 -|default|
|400|#609FF7|7.80 AAA|2.69 -||
|300|#84B6FD|10.09 AAA|2.08 -||
|200|#B0D0FD|13.29 AAA|1.58 -||
|100|#D0E3FE|16.10 AAA|1.30 -||
|50|#EEF4FC|18.98 AAA|1.11 -||
#### Deep Blue

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#0E182A|1.18 -|17.76 AAA||
|800|#192840|1.42 -|14.80 AAA||
|700|#223555|1.71 -|12.29 AAA||
|600|#2D456D|2.18 -|9.62 AAA||
|500|#36517E|2.64 -|7.97 AAA|default|
|400|#5D7499|4.42 -|4.75 AA||
|300|#8395B2|6.91 AA|3.04 -||
|200|#ABB7C9|10.35 AAA|2.03 -||
|100|#CED5DF|14.21 AAA|1.48 -||
|50|#ECEFF2|18.20 AAA|1.15 -||
#### Emerald

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#174736|1.99 -|10.55 AAA||
|800|#1B5E48|2.74 -|7.66 AAA||
|700|#227C5F|4.12 -|5.10 AA||
|600|#2D9F7A|6.35 AA|3.31 -||
|500|#33B289|7.87 AAA|2.67 -|default|
|400|#5FC49F|9.88 AAA|2.12 -||
|300|#7CD0AF|11.50 AAA|1.83 -||
|200|#A6E0C8|14.12 AAA|1.49 -||
|100|#C6EBDB|16.31 AAA|1.29 -||
|50|#EDF8F3|19.32 AAA|1.09 -||
#### Purple

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#471950|1.52 -|13.79 AAA||
|800|#5F216C|1.92 -|10.93 AAA||
|700|#7D298D|2.57 -|8.16 AAA||
|600|#9F35B4|3.64 -|5.77 AA||
|500|#AF3BC6|4.26 -|4.93 AA|default|
|400|#C161D5|5.94 AA|3.54 -||
|300|#D180E1|7.89 AAA|2.66 -||
|200|#E1AAED|11.17 AAA|1.88 -||
|100|#EDC9F4|14.26 AAA|1.47 -||
|50|#FAEFFC|18.82 AAA|1.12 -||
#### Turquoise

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#064F4A|2.23 -|9.44 AAA||
|800|#046861|3.16 -|6.65 AA||
|700|#00877F|4.77 AA|4.40 -||
|600|#00ACA2|7.42 AAA|2.83 -|default|
|500|#00BEB3|9.02 AAA|2.33 -||
|400|#3ACFC3|10.89 AAA|1.93 -||
|300|#5ED8CD|12.18 AAA|1.72 -||
|200|#90E5DC|14.43 AAA|1.46 -||
|100|#B6EEE8|16.38 AAA|1.28 -||
|50|#E9FBF9|19.63 AAA|1.07 -||
#### Red

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#5E1314|1.58 -|13.30 AAA||
|800|#7E191C|2.04 -|10.28 AAA||
|700|#A32226|2.81 -|7.46 AAA||
|600|#D12930|4.07 -|5.16 AA||
|500|#E72F37|4.86 AA|4.32 -|default|
|400|#F05B57|6.34 AA|3.31 -||
|300|#F57870|7.80 AAA|2.69 -||
|200|#F8A49D|10.79 AAA|1.95 -||
|100|#FCC4BF|13.79 AAA|1.52 -||
|50|#FFEDEB|18.57 AAA|1.13 -||
#### Green

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#104115|1.79 -|11.74 AAA||
|800|#15561D|2.38 -|8.82 AAA||
|700|#1B7026|3.39 -|6.19 AA||
|600|#1F8F30|5.03 AA|4.18 -|default|
|500|#24A638|6.59 AA|3.19 -||
|400|#32BE46|8.59 AAA|2.44 -||
|300|#65D46C|11.19 AAA|1.88 -||
|200|#98E49A|13.90 AAA|1.51 -||
|100|#C3EFC3|16.46 AAA|1.28 -||
|50|#EBFAEB|19.41 AAA|1.08 -||
#### Orange

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#6C3214|2.10 -|9.98 AAA||
|800|#8D4219|2.93 -|7.18 AAA||
|700|#B65621|4.34 -|4.84 AA||
|600|#E96E27|6.72 AA|3.12 -||
|500|#FF792C|8.02 AAA|2.62 -|default|
|400|#FF945C|9.64 AAA|2.18 -||
|300|#FFA678|10.98 AAA|1.91 -||
|200|#FFC3A4|13.59 AAA|1.54 -||
|100|#FFD8C3|15.86 AAA|1.32 -||
|50|#FFF3ED|19.30 AAA|1.09 -||
#### Yellow

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#674E0F|2.67 -|7.86 AAA||
|800|#886815|4.04 -|5.20 AA||
|700|#B0871A|6.33 AA|3.32 -||
|600|#E1AD25|10.21 AAA|2.06 -||
|500|#FABF21|12.54 AAA|1.67 -|default|
|400|#FFCD54|14.11 AAA|1.49 -||
|300|#FFD774|15.22 AAA|1.38 -||
|200|#FFE49E|16.84 AAA|1.25 -||
|100|#FFEEBF|18.23 AAA|1.15 -||
|50|#FFF9EA|19.99 AAA|1.05 -||
#### Gray

|Step|HEX|Black text contrast|White text contrast|Marker|
|---|---|---|---|---|
|900|#03091A|1.06 -|19.85 AAA||
|800|#202837|1.42 -|14.79 AAA||
|700|#454C58|2.43 -|8.65 AAA||
|600|#5B616C|3.37 -|6.23 AA||
|500|#8C9199|6.63 AA|3.17 -||
|400|#C2C4C8|12.02 AAA|1.75 -||
|300|#DBDCDF|15.31 AAA|1.37 -||
|200|#F1F2F3|18.74 AAA|1.12 -||
|100|#F6F7F7|19.57 AAA|1.07 -||
|50|#FDFDFD|20.65 AAA|1.02 -||

---
## 14. Foundations - Opacity

Opacity는 Color Chip에 등록된 투명색 외의 사용이 필요한 상황에서 적용합니다. 상황에 따라 컴포넌트 자체에 투명도를 설정할 수 있으며, 아래의 토큰을 활용합니다.

- `[sys-color-common-black-emphasis]`를 기본 색상으로 하며, Dimmed 상황 시 배경은 투명도 40%로 통일합니다.

### 14.1 Design Token - Reference

|Token Name|Value|
|---|---|
|ref-opacity-0|0%|
|ref-opacity-5|5%|
|ref-opacity-10|10%|
|ref-opacity-20|20%|
|ref-opacity-30|30%|
|ref-opacity-40|40%|
|ref-opacity-50|50%|
|ref-opacity-60|60%|
|ref-opacity-70|70%|
|ref-opacity-80|80%|
|ref-opacity-90|90%|
|ref-opacity-100|100%|

### 14.2 Opacity Usage

|Usage|Value|Token|
|---|---|---|
|Dimmed|40%|ref-opacity-40|

Example values: 100%, 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%, 5%, 0%.

---
## 15. Foundations - Typography

UI 기본 서체는 국문/영문 모두 Pretendard를 사용합니다.

### 15.1 Typography Rules

- UI 기본 서체는 국문/영문 모두 Pretendard를 사용합니다.
- 12px 이하 Size의 사용을 지양합니다.
- Line Height는 Size 기준 약 1.35배 ~ 1.6배를 적용합니다.
- Weight는 Bold, SemiBold, Medium, Regular 4가지를 사용하며, 이외에 다른 Weight 사용을 지양합니다.
- Usage와 Style의 정해진 값을 임의로 수정하여 사용하지 않습니다.
- 기본 Type에 근거하여 쓰임에 따라 명칭을 달리 붙여 사용합니다.
- Typography는 Style로 등록하여 사용합니다.
- Caption 2는 정의된 스타일로 10px을 사용할 수 있습니다.

### 15.2 Typeface Sample

```text
Pretendard
가나다라마바사아자차카타파하
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789!@#$%^&*()
```

### 15.3 Weight Tokens

| Name | Token |
|---|---:|
| Regular | font-weight-400 |
| Medium | font-weight-500 |
| SemiBold | font-weight-600 |
| Bold | font-weight-700 |

### 15.4 Type Styles

|Style|Usage|Size|Line Height|Letter Spacing|Paragraph Spacing|
|---|---|---|---|---|---|
|Display|Display|36px|48px|-0.36px|36px|
|Heading 1|Heading|28px|40px|-0.28px|28px|
|Heading 2|Heading, Title|24px|32px|-0.12px|24px|
|Title|Title, Sub Title, List Title|20px|28px|-0.1px|20px|
|SubTitle|Sub Title, List Title|18px|24px|-0.09px|18px|
|Body 1|List Title, Body, Button Label|16px|24px|-0.04px|16px|
|Body 2|Body, Button Label, Sub Text|14px|22px|-0.04px|14px|
|Caption 1|Button Label, Sub Text, Badge, Caption|12px|18px|-0.03px|12px|
|Caption 2|Badge, Caption|10px|16px|-0.03px|10px|

### 15.5 Available Weights per Type Style

|Style|Weight|Token|Size|Line Height|Letter Spacing|Paragraph Spacing|
|---|---|---|---|---|---|---|
|Display|Regular|font-weight-400|36px|48px|-0.36px|36px|
|Display|Medium|font-weight-500|36px|48px|-0.36px|36px|
|Display|SemiBold|font-weight-600|36px|48px|-0.36px|36px|
|Display|Bold|font-weight-700|36px|48px|-0.36px|36px|
|Heading 1|Regular|font-weight-400|28px|40px|-0.28px|28px|
|Heading 1|Medium|font-weight-500|28px|40px|-0.28px|28px|
|Heading 1|SemiBold|font-weight-600|28px|40px|-0.28px|28px|
|Heading 1|Bold|font-weight-700|28px|40px|-0.28px|28px|
|Heading 2|Regular|font-weight-400|24px|32px|-0.12px|24px|
|Heading 2|Medium|font-weight-500|24px|32px|-0.12px|24px|
|Heading 2|SemiBold|font-weight-600|24px|32px|-0.12px|24px|
|Heading 2|Bold|font-weight-700|24px|32px|-0.12px|24px|
|Title|Regular|font-weight-400|20px|28px|-0.1px|20px|
|Title|Medium|font-weight-500|20px|28px|-0.1px|20px|
|Title|SemiBold|font-weight-600|20px|28px|-0.1px|20px|
|Title|Bold|font-weight-700|20px|28px|-0.1px|20px|
|SubTitle|Regular|font-weight-400|18px|24px|-0.09px|18px|
|SubTitle|Medium|font-weight-500|18px|24px|-0.09px|18px|
|SubTitle|SemiBold|font-weight-600|18px|24px|-0.09px|18px|
|SubTitle|Bold|font-weight-700|18px|24px|-0.09px|18px|
|Body 1|Regular|font-weight-400|16px|24px|-0.04px|16px|
|Body 1|Medium|font-weight-500|16px|24px|-0.04px|16px|
|Body 1|SemiBold|font-weight-600|16px|24px|-0.04px|16px|
|Body 1|Bold|font-weight-700|16px|24px|-0.04px|16px|
|Body 2|Regular|font-weight-400|14px|22px|-0.04px|14px|
|Body 2|Medium|font-weight-500|14px|22px|-0.04px|14px|
|Body 2|SemiBold|font-weight-600|14px|22px|-0.04px|14px|
|Body 2|Bold|font-weight-700|14px|22px|-0.04px|14px|
|Caption 1|Regular|font-weight-400|12px|18px|-0.03px|12px|
|Caption 1|Medium|font-weight-500|12px|18px|-0.03px|12px|
|Caption 1|SemiBold|font-weight-600|12px|18px|-0.03px|12px|
|Caption 1|Bold|font-weight-700|12px|18px|-0.03px|12px|
|Caption 2|Regular|font-weight-400|10px|16px|-0.03px|10px|
|Caption 2|Medium|font-weight-500|10px|16px|-0.03px|10px|
|Caption 2|SemiBold|font-weight-600|10px|16px|-0.03px|10px|
|Caption 2|Bold|font-weight-700|10px|16px|-0.03px|10px|

### 15.6 Typography Sample Texts from Source

Display/Heading/Title sample:

```text
바드림은 복잡한 서류도, 긴 대기도 없이 — 전기이륜차 구독부터 보험, 배터리까지 한 번에 해결되는 착한구독 서비스를 제공합니다.
```

Body sample:

```text
배달을 시작할 때 가장 먼저 마주하는 고민이 바이크 구독이에요. 구독료가 얼마인지, 언제 받을 수 있는지, 신용도가 부족해도 괜찮은지 — 쉽게 알기 어려운 것들이 많습니다. 바드림은 그 과정을 앱 하나로 간단하게 정리했어요. 구독료는 5초 안에 바로 조회할 수 있고, 신청하면 다음날 집 앞으로 바이크가 출고됩니다. 바이크와 보험, 공유배터리 무제한 요금제까지 구독 하나에 모두 포함되어 있어, 필요한 것들을 따로 챙기실 필요가 없어요.
```

---
## 16. Iconography

### 16.1 Guide

- Material Guide를 활용하여 톤과 무드에 맞게 제작합니다.
- Stroke Size는 `2`로 합니다.
- 모든 Line은 Object화 해서 사용합니다.
- Corner Radius 값은 Object화 이후 0~2까지 0.25 단위로 적용합니다.
- Frame Size는 24px × 24px로 설정합니다.
- Constraints는 Scale × Scale로 설정합니다.
- Size는 Default(24px), Large(20px), Medium(16px), Small(12px)이나, 쓰임에 따라 변화할 수 있습니다.
- Key Line / Key Shape / Padding / Live Area 기준을 따릅니다.
- PDF의 키라인 시각 예시는 24px × 24px Frame, Live Area, Size 400% 예시를 포함합니다.

### 16.2 UI Icons - Outlined

```text
backward forward chevron_left chevron_right chevron_up chevron_down arrow_left arrow_right arrow_up arrow_down arrowhead_left arrowhead_right arrowhead_up arrowhead_down arrow_db_hor arrow_db_ver plus minus close check upload download logout_left logout_right renew refresh menu_meatball menu_kebab menu_hamburger menu_bento list table share home search setting filter heart bell comment visibility_on visibility_off pin paperplane question warning info pencil write trashbin thumb_up thumb_down profile person delivery clock headset lock unlock gps card coin phone bss charger battery cradle motorcycle location megaphone zoom_in zoom_out verified face_smile clip link tag shield party rank document document_approved document_add camera image video copy calendar dashboard palette circle tools wrench receipt usb blackbox phone_holder box slide_carrier windshield muffler
```

### 16.3 UI Icons - Filled

```text
home menu_bento dashboard thumb_up thumb_down calendar play pause verified profile question warning info plus_in_circle close_in_circle new hot star_full star_half star_empty
```

### 16.4 UI Icons - Colored

```text
document document_approved delivery card coin motorcycle party megaphone write tag
```

### 16.5 Maker Icons

#### Default

```text
대동모빌리티 블루샤크 와코 맥모터스 DNA모터스 KR모터스 닷스테이션 핸디라이프 더좋은사람 킴스트 샤오다오 이브이모터스 그린모빌리티 E3모빌리티 가브리엘 ZEEHO 이누리
```

#### Profile

```text
대동모빌리티 블루샤크 와코 맥모터스 DNA모터스 KR모터스 닷스테이션 핸디라이프 더좋은사람 킴스트 샤오다오 이브이모터스 그린모빌리티 E3모빌리티 가브리엘 ZEEHO 이누리
```

### 16.6 BSS Icons

#### Default

```text
쿠루 닷스테이션 블루샤크 DNA모터스 젠트로피 E3모빌리티 나누
```

#### Profile

```text
쿠루 닷스테이션 블루샤크 DNA모터스 젠트로피 E3 나누
```

### 16.7 Service Icons

#### Default

```text
바드림모터스 전체 이벤트
```

#### Profile

```text
바드림모터스 전체 이벤트
```

### 16.8 Icon Application Rules

- 24px frame 기준으로 제작합니다.
- 일반 UI 아이콘은 line icon 중심으로 적용합니다.
- 원본 제조사/서비스/BSS 아이콘은 임의 제작하지 않습니다.
- 브랜드/제조사 아이콘은 색상과 형태를 임의 변경하지 않습니다.
- 접근성 라벨이 필요한 버튼형 아이콘에는 `aria-label` 또는 대체 텍스트를 제공합니다.

---
## 17. Portable CSS Token Skeleton

아래 CSS Custom Properties는 바드림 디자인 시스템 V3를 웹에 적용할 때 사용할 수 있는 토큰 스켈레톤입니다. 실제 프로젝트에서는 이 값을 그대로 `:root`에 등록하고, 컴포넌트에서는 HEX 코드 대신 토큰을 참조합니다.

```css
:root {
  /* Font */
  --font-family-base: Pretendard, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Reference Colors */
  /* Blue */
  --ref-color-blue-50: #EEF4FC;
  --ref-color-blue-100: #D0E3FE;
  --ref-color-blue-200: #B0D0FD;
  --ref-color-blue-300: #84B6FD;
  --ref-color-blue-400: #609FF7;
  --ref-color-blue-500: #2C7BE2;
  --ref-color-blue-600: #2369C6;
  --ref-color-blue-700: #1A539E;
  --ref-color-blue-800: #123E78;
  --ref-color-blue-900: #0D2D57;
  /* Deep Blue */
  --ref-color-deepBlue-50: #ECEFF2;
  --ref-color-deepBlue-100: #CED5DF;
  --ref-color-deepBlue-200: #ABB7C9;
  --ref-color-deepBlue-300: #8395B2;
  --ref-color-deepBlue-400: #5D7499;
  --ref-color-deepBlue-500: #36517E;
  --ref-color-deepBlue-600: #2D456D;
  --ref-color-deepBlue-700: #223555;
  --ref-color-deepBlue-800: #192840;
  --ref-color-deepBlue-900: #0E182A;
  /* Emerald */
  --ref-color-emerald-50: #EDF8F3;
  --ref-color-emerald-100: #C6EBDB;
  --ref-color-emerald-200: #A6E0C8;
  --ref-color-emerald-300: #7CD0AF;
  --ref-color-emerald-400: #5FC49F;
  --ref-color-emerald-500: #33B289;
  --ref-color-emerald-600: #2D9F7A;
  --ref-color-emerald-700: #227C5F;
  --ref-color-emerald-800: #1B5E48;
  --ref-color-emerald-900: #174736;
  /* Purple */
  --ref-color-purple-50: #FAEFFC;
  --ref-color-purple-100: #EDC9F4;
  --ref-color-purple-200: #E1AAED;
  --ref-color-purple-300: #D180E1;
  --ref-color-purple-400: #C161D5;
  --ref-color-purple-500: #AF3BC6;
  --ref-color-purple-600: #9F35B4;
  --ref-color-purple-700: #7D298D;
  --ref-color-purple-800: #5F216C;
  --ref-color-purple-900: #471950;
  /* Turquoise */
  --ref-color-turquoise-50: #E9FBF9;
  --ref-color-turquoise-100: #B6EEE8;
  --ref-color-turquoise-200: #90E5DC;
  --ref-color-turquoise-300: #5ED8CD;
  --ref-color-turquoise-400: #3ACFC3;
  --ref-color-turquoise-500: #00BEB3;
  --ref-color-turquoise-600: #00ACA2;
  --ref-color-turquoise-700: #00877F;
  --ref-color-turquoise-800: #046861;
  --ref-color-turquoise-900: #064F4A;
  /* Red */
  --ref-color-red-50: #FFEDEB;
  --ref-color-red-100: #FCC4BF;
  --ref-color-red-200: #F8A49D;
  --ref-color-red-300: #F57870;
  --ref-color-red-400: #F05B57;
  --ref-color-red-500: #E72F37;
  --ref-color-red-600: #D12930;
  --ref-color-red-700: #A32226;
  --ref-color-red-800: #7E191C;
  --ref-color-red-900: #5E1314;
  /* Green */
  --ref-color-green-50: #EBFAEB;
  --ref-color-green-100: #C3EFC3;
  --ref-color-green-200: #98E49A;
  --ref-color-green-300: #65D46C;
  --ref-color-green-400: #32BE46;
  --ref-color-green-500: #24A638;
  --ref-color-green-600: #1F8F30;
  --ref-color-green-700: #1B7026;
  --ref-color-green-800: #15561D;
  --ref-color-green-900: #104115;
  /* Orange */
  --ref-color-orange-50: #FFF3ED;
  --ref-color-orange-100: #FFD8C3;
  --ref-color-orange-200: #FFC3A4;
  --ref-color-orange-300: #FFA678;
  --ref-color-orange-400: #FF945C;
  --ref-color-orange-500: #FF792C;
  --ref-color-orange-600: #E96E27;
  --ref-color-orange-700: #B65621;
  --ref-color-orange-800: #8D4219;
  --ref-color-orange-900: #6C3214;
  /* Yellow */
  --ref-color-yellow-50: #FFF9EA;
  --ref-color-yellow-100: #FFEEBF;
  --ref-color-yellow-200: #FFE49E;
  --ref-color-yellow-300: #FFD774;
  --ref-color-yellow-400: #FFCD54;
  --ref-color-yellow-500: #FABF21;
  --ref-color-yellow-600: #E1AD25;
  --ref-color-yellow-700: #B0871A;
  --ref-color-yellow-800: #886815;
  --ref-color-yellow-900: #674E0F;
  /* Gray */
  --ref-color-gray-0: #FFFFFF;
  --ref-color-gray-50: #FDFDFD;
  --ref-color-gray-100: #F6F7F7;
  --ref-color-gray-200: #F1F2F3;
  --ref-color-gray-300: #DBDCDF;
  --ref-color-gray-400: #C2C4C8;
  --ref-color-gray-500: #8C9199;
  --ref-color-gray-600: #5B616C;
  --ref-color-gray-700: #454C58;
  --ref-color-gray-800: #202837;
  --ref-color-gray-900: #03091A;
  --ref-color-gray-1000: #000000;

  /* Transparent Color Tokens */
  --ref-color-blue-500-20: rgb(44 123 226 / 20%);
  --ref-color-blue-500-40: rgb(44 123 226 / 40%);
  --ref-color-blue-500-60: rgb(44 123 226 / 60%);
  --ref-color-blue-500-80: rgb(44 123 226 / 80%);
  --ref-color-deepBlue-500-20: rgb(54 81 126 / 20%);
  --ref-color-deepBlue-500-40: rgb(54 81 126 / 40%);
  --ref-color-deepBlue-500-60: rgb(54 81 126 / 60%);
  --ref-color-deepBlue-500-80: rgb(54 81 126 / 80%);
  --ref-color-emerald-500-20: rgb(51 178 137 / 20%);
  --ref-color-emerald-500-40: rgb(51 178 137 / 40%);
  --ref-color-emerald-500-60: rgb(51 178 137 / 60%);
  --ref-color-emerald-500-80: rgb(51 178 137 / 80%);
  --ref-color-purple-500-20: rgb(175 59 198 / 20%);
  --ref-color-purple-500-40: rgb(175 59 198 / 40%);
  --ref-color-purple-500-60: rgb(175 59 198 / 60%);
  --ref-color-purple-500-80: rgb(175 59 198 / 80%);
  --ref-color-turquoise-600-20: rgb(0 172 162 / 20%);
  --ref-color-turquoise-600-40: rgb(0 172 162 / 40%);
  --ref-color-turquoise-600-60: rgb(0 172 162 / 60%);
  --ref-color-turquoise-600-80: rgb(0 172 162 / 80%);
  --ref-color-red-500-20: rgb(231 47 55 / 20%);
  --ref-color-red-500-40: rgb(231 47 55 / 40%);
  --ref-color-red-500-60: rgb(231 47 55 / 60%);
  --ref-color-red-500-80: rgb(231 47 55 / 80%);
  --ref-color-green-600-20: rgb(31 143 48 / 20%);
  --ref-color-green-600-40: rgb(31 143 48 / 40%);
  --ref-color-green-600-60: rgb(31 143 48 / 60%);
  --ref-color-green-600-80: rgb(31 143 48 / 80%);
  --ref-color-orange-500-20: rgb(255 121 44 / 20%);
  --ref-color-orange-500-40: rgb(255 121 44 / 40%);
  --ref-color-orange-500-60: rgb(255 121 44 / 60%);
  --ref-color-orange-500-80: rgb(255 121 44 / 80%);
  --ref-color-yellow-500-20: rgb(250 191 33 / 20%);
  --ref-color-yellow-500-40: rgb(250 191 33 / 40%);
  --ref-color-yellow-500-60: rgb(250 191 33 / 60%);
  --ref-color-yellow-500-80: rgb(250 191 33 / 80%);
  --ref-color-gray-900-2: rgb(3 9 26 / 2%);
  --ref-color-gray-900-5: rgb(3 9 26 / 5%);
  --ref-color-gray-900-10: rgb(3 9 26 / 10%);
  --ref-color-gray-900-20: rgb(3 9 26 / 20%);
  --ref-color-gray-900-40: rgb(3 9 26 / 40%);
  --ref-color-gray-900-60: rgb(3 9 26 / 60%);
  --ref-color-gray-900-80: rgb(3 9 26 / 80%);
  --ref-color-gray-50-5: rgb(253 253 253 / 5%);
  --ref-color-gray-50-10: rgb(253 253 253 / 10%);
  --ref-color-gray-50-20: rgb(253 253 253 / 20%);
  --ref-color-gray-50-40: rgb(253 253 253 / 40%);
  --ref-color-gray-50-60: rgb(253 253 253 / 60%);
  --ref-color-gray-50-80: rgb(253 253 253 / 80%);
  --ref-color-shadow-01: rgb(69 76 88 / 20%);
  --ref-color-shadow-02: rgb(69 76 88 / 24%);
  --ref-color-shadow-03: rgb(69 76 88 / 32%);

  /* System Colors */
  --sys-color-brand-primary-lightest: var(--ref-color-blue-50);
  --sys-color-brand-primary-lighter: var(--ref-color-blue-100);
  --sys-color-brand-primary-light: var(--ref-color-blue-300);
  --sys-color-brand-primary-default: var(--ref-color-blue-500);
  --sys-color-brand-primary-dark: var(--ref-color-blue-700);
  --sys-color-brand-primary-darker: var(--ref-color-blue-900);
  --sys-color-brand-secondary-lighter: var(--ref-color-deepBlue-100);
  --sys-color-brand-secondary-light: var(--ref-color-deepBlue-300);
  --sys-color-brand-secondary-default: var(--ref-color-deepBlue-500);
  --sys-color-brand-secondary-dark: var(--ref-color-deepBlue-700);
  --sys-color-brand-secondary-darker: var(--ref-color-deepBlue-900);
  --sys-color-brand-tertiary-lighter: var(--ref-color-emerald-100);
  --sys-color-brand-tertiary-light: var(--ref-color-emerald-300);
  --sys-color-brand-tertiary-default: var(--ref-color-emerald-500);
  --sys-color-brand-tertiary-dark: var(--ref-color-emerald-700);
  --sys-color-brand-tertiary-darker: var(--ref-color-emerald-900);
  --sys-color-theme-purple-bg: var(--ref-color-purple-50);
  --sys-color-theme-purple-default: var(--ref-color-purple-500);
  --sys-color-theme-turquoise-bg: var(--ref-color-turquoise-50);
  --sys-color-theme-turquoise-default: var(--ref-color-turquoise-600);
  --sys-color-theme-destructed-bg: var(--ref-color-red-50);
  --sys-color-theme-destructed-default: var(--ref-color-red-500);
  --sys-color-theme-success-bg: var(--ref-color-green-50);
  --sys-color-theme-success-default: var(--ref-color-green-600);
  --sys-color-theme-warning-bg: var(--ref-color-orange-50);
  --sys-color-theme-warning-default: var(--ref-color-orange-500);
  --sys-color-theme-rating-bg: var(--ref-color-yellow-50);
  --sys-color-theme-rating-default: var(--ref-color-yellow-500);
  --sys-color-common-white-default: var(--ref-color-gray-50);
  --sys-color-common-white-emphasis: var(--ref-color-gray-0);
  --sys-color-common-black-default: var(--ref-color-gray-900);
  --sys-color-common-black-emphasis: var(--ref-color-gray-1000);
  --sys-color-neutral-100: var(--ref-color-gray-100);
  --sys-color-neutral-200: var(--ref-color-gray-200);
  --sys-color-neutral-300: var(--ref-color-gray-300);
  --sys-color-neutral-400: var(--ref-color-gray-400);
  --sys-color-neutral-500: var(--ref-color-gray-500);
  --sys-color-neutral-600: var(--ref-color-gray-600);
  --sys-color-neutral-700: var(--ref-color-gray-700);
  --sys-color-neutral-800: var(--ref-color-gray-800);

  /* Interaction Colors — 2026-08-26 Figma 변수맵 실측값으로 정정 (이전엔 [color]-500 20/40 등으로 잘못 기재).
     실측 6개 계열(blue/red/gray/light-blue/light-red/light-gray)만 확정, 나머지는 확인 필요. */
  --interaction-blue-hover: rgb(13 45 87 / 15%);   /* blue-900 15% */
  --interaction-blue-pressed: rgb(13 45 87 / 30%); /* blue-900 30% */
  --interaction-red-hover: rgb(94 19 20 / 15%);    /* red-900 15% */
  --interaction-red-pressed: rgb(94 19 20 / 30%);  /* red-900 30% */
  --interaction-gray-hover: rgb(3 9 26 / 15%);     /* gray-900 15% */
  --interaction-gray-pressed: rgb(3 9 26 / 30%);   /* gray-900 30% */
  --interaction-light-blue-hover: rgb(44 123 226 / 8%);    /* blue-500 8% */
  --interaction-light-blue-pressed: rgb(44 123 226 / 15%); /* blue-500 15% */
  --interaction-light-red-hover: rgb(231 47 55 / 8%);      /* red-500 8% */
  --interaction-light-red-pressed: rgb(231 47 55 / 15%);   /* red-500 15% */
  --interaction-light-gray-hover: var(--ref-color-gray-900-5);    /* gray-900 5% */
  --interaction-light-gray-pressed: var(--ref-color-gray-900-10); /* gray-900 10% */
  /* 아래 chromatic 계열은 미실측 — 확인 필요. 관측 패턴(base=[color]-900 15/30, light=[default step] 8/15) 기반 추정. */
  --interaction-deep-blue-hover: rgb(14 24 42 / 15%);   /* 추정 — 확인 필요 */
  --interaction-deep-blue-pressed: rgb(14 24 42 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-deep-blue-hover: rgb(54 81 126 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-deep-blue-pressed: rgb(54 81 126 / 15%);/* 추정 — 확인 필요 */
  --interaction-emerald-hover: rgb(23 71 54 / 15%);   /* 추정 — 확인 필요 */
  --interaction-emerald-pressed: rgb(23 71 54 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-emerald-hover: rgb(51 178 137 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-emerald-pressed: rgb(51 178 137 / 15%);/* 추정 — 확인 필요 */
  --interaction-purple-hover: rgb(71 25 80 / 15%);   /* 추정 — 확인 필요 */
  --interaction-purple-pressed: rgb(71 25 80 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-purple-hover: rgb(175 59 198 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-purple-pressed: rgb(175 59 198 / 15%);/* 추정 — 확인 필요 */
  --interaction-turquoise-hover: rgb(6 79 74 / 15%);   /* 추정 — 확인 필요 */
  --interaction-turquoise-pressed: rgb(6 79 74 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-turquoise-hover: rgb(0 172 162 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-turquoise-pressed: rgb(0 172 162 / 15%);/* 추정 — 확인 필요 */
  --interaction-green-hover: rgb(16 65 21 / 15%);   /* 추정 — 확인 필요 */
  --interaction-green-pressed: rgb(16 65 21 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-green-hover: rgb(31 143 48 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-green-pressed: rgb(31 143 48 / 15%);/* 추정 — 확인 필요 */
  --interaction-orange-hover: rgb(108 50 20 / 15%);   /* 추정 — 확인 필요 */
  --interaction-orange-pressed: rgb(108 50 20 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-orange-hover: rgb(255 121 44 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-orange-pressed: rgb(255 121 44 / 15%);/* 추정 — 확인 필요 */
  --interaction-yellow-hover: rgb(103 78 15 / 15%);   /* 추정 — 확인 필요 */
  --interaction-yellow-pressed: rgb(103 78 15 / 30%); /* 추정 — 확인 필요 */
  --interaction-light-yellow-hover: rgb(250 191 33 / 8%);   /* 추정 — 확인 필요 */
  --interaction-light-yellow-pressed: rgb(250 191 33 / 15%);/* 추정 — 확인 필요 */

  /* Gradients */
  --gradient-white-upward: linear-gradient(0deg, rgb(253 253 253 / 0%) 0%, rgb(253 253 253 / 8%) 15%, rgb(253 253 253 / 22%) 30%, rgb(253 253 253 / 42%) 50%, rgb(253 253 253 / 64%) 70%, rgb(253 253 253 / 82%) 85%, rgb(253 253 253 / 100%) 100%);
  --gradient-blue-downward-diag: linear-gradient(135deg, #84B6FD 0%, #2C7BE2 50%, #009DCF 80%);

  /* Spacing */
  --ref-spacing-00: -2px;
  --ref-spacing-01: 1px;
  --ref-spacing-02: 2px;
  --ref-spacing-03: 3px;
  --ref-spacing-04: 4px;
  --ref-spacing-05: 6px;
  --ref-spacing-06: 8px;
  --ref-spacing-07: 10px;
  --ref-spacing-08: 12px;
  --ref-spacing-09: 14px;
  --ref-spacing-10: 16px;
  --ref-spacing-11: 20px;
  --ref-spacing-12: 24px;
  --ref-spacing-13: 28px;
  --ref-spacing-14: 32px;
  --ref-spacing-15: 36px;
  --ref-spacing-16: 40px;
  --ref-spacing-17: 48px;
  --ref-spacing-18: 56px;
  --ref-spacing-19: 64px;
  --ref-spacing-20: 72px;
  --ref-spacing-21: 80px;
  --ref-spacing-22: 120px;
  --ref-spacing-23: 200px;

  /* Radius */
  --ref-radius-01: 2px;
  --ref-radius-02: 4px;
  --ref-radius-03: 6px;
  --ref-radius-04: 8px;
  --ref-radius-05: 10px;
  --ref-radius-06: 12px;
  --ref-radius-07: 16px;
  --ref-radius-08: 20px;
  --ref-radius-09: 24px;
  --ref-radius-10: 32px;
  --ref-radius-11: 40px;
  --ref-radius-12: 999px;
  --radius-input-option: var(--ref-radius-06);
  --radius-sheet: var(--ref-radius-07);
  --radius-popup: var(--ref-radius-08);

  /* Border Width */
  --ref-borderwidth-01: 0.5px;
  --ref-borderwidth-02: 1px;
  --ref-borderwidth-03: 2px;
  --ref-borderwidth-04: 4px;
  --ref-borderwidth-05: 6px;
  --ref-borderwidth-06: 8px;
  --ref-borderwidth-07: 10px;
  --ref-borderwidth-08: 12px;
  --ref-borderwidth-09: 14px;

  /* Opacity */
  --ref-opacity-0: 0%;
  --ref-opacity-5: 5%;
  --ref-opacity-10: 10%;
  --ref-opacity-20: 20%;
  --ref-opacity-30: 30%;
  --ref-opacity-40: 40%;
  --ref-opacity-50: 50%;
  --ref-opacity-60: 60%;
  --ref-opacity-70: 70%;
  --ref-opacity-80: 80%;
  --ref-opacity-90: 90%;
  --ref-opacity-100: 100%;
  --dimmed-opacity: var(--ref-opacity-40);
  --dimmed-bg: rgb(0 0 0 / 40%);

  /* Shadows */
  --shadow-01: 0 2px 4px 0 rgb(70 77 89 / 20%);
  --shadow-02: 0 4px 6px -1px rgb(70 77 89 / 20%);
  --shadow-03: 0 6px 12px -2px rgb(70 77 89 / 20%);
  --shadow-04: 0 8px 20px -3px rgb(70 77 89 / 24%);
  --shadow-05: 0 12px 24px -4px rgb(70 77 89 / 32%);
  --shadow-sh: 0 -6px 12px -2px rgb(70 77 89 / 20%);
  --shadow-toast: 0 6px 16px 0 rgb(0 0 0 / 10%);

  /* Typography */
  --typography-display-size: 36px;
  --typography-display-line-height: 48px;
  --typography-display-letter-spacing: -0.36px;
  --typography-display-paragraph-spacing: 36px;
  --typography-heading-1-size: 28px;
  --typography-heading-1-line-height: 40px;
  --typography-heading-1-letter-spacing: -0.28px;
  --typography-heading-1-paragraph-spacing: 28px;
  --typography-heading-2-size: 24px;
  --typography-heading-2-line-height: 32px;
  --typography-heading-2-letter-spacing: -0.12px;
  --typography-heading-2-paragraph-spacing: 24px;
  --typography-title-size: 20px;
  --typography-title-line-height: 28px;
  --typography-title-letter-spacing: -0.1px;
  --typography-title-paragraph-spacing: 20px;
  --typography-subtitle-size: 18px;
  --typography-subtitle-line-height: 24px;
  --typography-subtitle-letter-spacing: -0.09px;
  --typography-subtitle-paragraph-spacing: 18px;
  --typography-body-1-size: 16px;
  --typography-body-1-line-height: 24px;
  --typography-body-1-letter-spacing: -0.04px;
  --typography-body-1-paragraph-spacing: 16px;
  --typography-body-2-size: 14px;
  --typography-body-2-line-height: 22px;
  --typography-body-2-letter-spacing: -0.04px;
  --typography-body-2-paragraph-spacing: 14px;
  --typography-caption-1-size: 12px;
  --typography-caption-1-line-height: 18px;
  --typography-caption-1-letter-spacing: -0.03px;
  --typography-caption-1-paragraph-spacing: 12px;
  --typography-caption-2-size: 10px;
  --typography-caption-2-line-height: 16px;
  --typography-caption-2-letter-spacing: -0.03px;
  --typography-caption-2-paragraph-spacing: 10px;

  /* Grid */
  --grid-mobile-columns: 4;
  --grid-mobile-margin: var(--ref-spacing-11);
  --grid-mobile-gutter: var(--ref-spacing-08);
  --grid-web-columns: 12;
  --grid-web-margin: var(--ref-spacing-16);
  --grid-web-gutter: var(--ref-spacing-12);
  --scroll-bottom-padding: var(--ref-spacing-16);
}
```

---
## 18. Component Application Guidelines

아래 내용은 PDF에 정의된 Foundation 토큰을 실제 UI 컴포넌트에 적용하기 위한 이식 규칙입니다. 원본 PDF가 별도 컴포넌트 상세 스펙을 모두 포함하지 않는 경우에도, 이 가이드는 정의된 토큰과 Usage 예시를 기준으로 일관성 있게 적용합니다.

### 18.1 Buttons

- 주요 CTA는 `sys-color-brand-primary-default`를 사용합니다.
- 보조 CTA는 `sys-color-brand-secondary-default`, `sys-color-neutral-*`, 또는 흰 배경 + border 조합을 사용합니다.
- Hover, pressed, selected 같은 입력 피드백에는 `interaction/*` 토큰을 우선 사용합니다.
- Filled button의 기본 색상은 System Color를 사용하고, 표면 위의 가벼운 피드백은 Interaction Color를 사용합니다.
- Full Bleed Button은 화면 가로 폭을 모두 차지하는 경우 `border-radius: 0`을 사용할 수 있습니다.
- 버튼 라벨은 UX Writing 규칙에 따라 명사형, `~하기`, 문장형을 구분합니다.
- 완료/중요 CTA에서는 `네, 최종 제출할게요`, `알림 받으면 돌아올게요`처럼 사용자의 다음 행동을 명확히 표현합니다.

### 18.2 Inputs / Options

- 기본 Radius: `ref-radius-06` = 12px.
- 기본 Border Width는 상황에 따라 `ref-borderwidth-01` 또는 `ref-borderwidth-02`를 사용합니다.
- 포커스/선택 상태는 `sys-color-brand-primary-default` 또는 관련 Theme Color의 default token을 사용합니다.
- Placeholder는 사용자가 입력해야 할 정보를 구체적으로 안내합니다.

### 18.3 Pop-Up

- Radius: `ref-radius-08` = 20px.
- Shadow: `shadow_02`.
- Dimmed 배경: `[sys-color-common-black-emphasis]` + `ref-opacity-40`.
- 문구는 되돌릴 수 없는 액션 직전에 사용자의 결정을 확인하는 구조를 사용합니다.
- `제출한 서류를 삭제할까요?`처럼 결정권을 사용자에게 돌려주는 표현을 권장합니다.

### 18.4 Bottom Sheet

- Radius: `ref-radius-07` = 16px.
- Shadow: `shadow_sh`.
- 하단 Sheet는 Overlay 위에 표시합니다.
- 화면 아래에서 올라오는 구조이므로 상단 모서리 중심으로 Radius를 적용합니다.

### 18.5 Toast

- Shadow: X 0 / Y 6 / Blur 16 / Spread 0 / Color #000000 10%.
- 문구는 1~2초 안에 읽히도록 짧게 작성합니다.
- 기본 구조는 `명사 + 조사 + ~되었어요`입니다.
- 토스트에서는 마침표를 사용하지 않습니다.
- 예: `계좌번호가 복사되었어요`, `마지막 서명이 완료되었어요`.

### 18.6 Empty / Waiting State

- 대기 중인 일을 명시합니다.
- `~하고 있어요`, `~할게요`를 활용하여 바드림이 함께 처리하고 있음을 표현합니다.
- 대기의 마무리 확인 방법, 알림, 문자, 다음 화면을 함께 안내합니다.
- 예: `김드림님의 증명서를 발급하고 있어요`, `카카오톡 알림이 올 때까지 기다려주세요`.

---
## 19. Required Assets Checklist

다른 환경에 이 디자인 시스템을 적용할 때 필요한 원본 에셋 목록입니다. 원본 에셋이 없으면 임의로 재작도하거나 색을 바꾸지 말고 placeholder와 required asset 목록을 표시합니다.

### Logo / BI / CI

- CI Signature: Color / Mono.
- CI Signature: White BG + Black Signature.
- CI Signature: Black BG + White Signature.
- BI Symbol: Gradient BG + White Symbol.
- BI Symbol: Blue BG + White Symbol.
- BI Symbol: White BG + Gradient Symbol.
- BI Signature: Vertical, Gradient BG + White Signature.
- BI Signature: Vertical, White BG + Gradient Signature.
- BI Signature: Horizontal, Gradient BG + White Signature.
- BI Signature: Horizontal, White BG + Gradient Signature.
- App Icon: iOS, One UI.

### Character

- 드림맨 With Background.
- 드림맨 Without Background.
- 드림걸 With Background.
- 드림걸 Without Background.

### Icon Assets

- UI Icons: Outlined / Filled / Colored.
- Maker Icons: Default / Profile.
- BSS Icons: Default / Profile.
- Service Icons: Default / Profile.

### Font

- Pretendard.
- Fallback: system-ui, -apple-system, BlinkMacSystemFont, `Segoe UI`, sans-serif.

---
## 20. Source Page Map

| PDF Page | Main Content | Reflected Sections |
|---:|---|---|
| 1 | Brand Core & Identity | 1 |
| 2 | Logo - CI, BI, Signature, Symbol, App Icon | 2, 19 |
| 3 | UX Writing 1 - Bases, Principles, Voice & Tone | 4 |
| 4 | UX Writing 2 - Usage, 안내 문구, 토스트, 에러 및 경고, 확인 및 완료, 버튼 및 CTA, 대기 및 빈 화면 | 5 |
| 5 | UX Writing 3 - Pattern, 자주 쓰는 패턴, 줄바꿈, 이름과 호칭, 피해야 할 표현 | 6 |
| 6 | Iconography - Guide, UI Icons, Maker Icons, BSS Icons, Service Icons | 16, 19 |
| 7 | Typography - rules, Pretendard, type styles, weights, samples | 15, 17 |
| 8 | Color Chips - reference tokens, alpha tokens, shadow colors, system tokens | 12, 17 |
| 9 | Color System - brand/theme/surface/gradient colors | 13, 17 |
| 10 | Color Palette - palette steps and contrast markers | 13.5, 17 |
| 11 | Spacing - design token and example scale | 8, 17 |
| 12 | Grid - Mobile/Web spec | 11, 17 |
| 13 | Shadow - shadow_01~shadow_05, shadow_sh, component usage | 7, 17, 18 |
| 14 | Radius - design token, usage, examples | 9, 17 |
| 15 | Border Width - design token and examples | 10, 17 |
| 16 | Opacity - design token, dimmed usage, examples | 14, 17 |
| 17 | Character - 드림맨, 드림걸 with/without background | 3, 19 |

---
## Appendix A. V3 Page-by-Page Visual Inventory

이 부록은 V3 PDF가 텍스트 레이어 없이 시각 요소 중심으로 구성되어 있는 점을 고려해, 각 페이지에 포함된 정보를 빠르게 대조할 수 있도록 정리한 인벤토리입니다.

### Page 1 - Brand Core & Identity

- Header: `Brand Core & Identity`.
- 안내: 모든 바드림 서비스 및 디자인시스템 제작 및 운영 과정에서 Brand Core와 Identity를 명심하고 이에 어긋나지 않도록 주의합니다.
- Brand Core Pyramid: Essence / Mission / Vision / Value.
- Essence: 효율 / Efficiency.
- Mission: 이동의 효율을 높인다 / Enhance the efficiency of movement.
- Vision: D2DM / Door to Door Mobility.
- Value: 진취적인 Enterprising, 신뢰를 주는 Trustworthy, 직관적인 Clear.
- Brand Identity: 모든 이동에 가치를 더한다 / Add value to every movement.
- Visual Identity: Forward, Neat, Essential.

### Page 2 - Logo

- Header: `Logo`.
- CI: Signature, Color, Mono.
- CI Signature는 단독 그래픽 요소로의 사용을 지양하고 지정된 색상 외 다른 색상을 적용하지 않습니다.
- Color / Mono 모두 White BG + Black Signature, Black BG + White Signature 예시를 포함합니다.
- BI: Symbol, Signature.
- BI Symbol은 Gradient BG + White Symbol, Blue BG + White Symbol, White BG + Gradient Symbol 예시를 포함합니다.
- BI Signature는 Vertical / Horizontal 조합과 Gradient BG + White Signature, White BG + Gradient Signature 예시를 포함합니다.
- App Icon: iOS, One UI. `[Gradient BG + White Symbol]` 타입을 활용합니다.

### Page 3 - UX Writing 1 - Bases

- Header: `UX Writing 1 - Bases`.
- 목표: 각종 복잡한 여정을 친근하고 다정하게 안내합니다.
- Principles: 해요체로 다정하게, 옆에서 같이 도와드려요, 지금 무엇을 왜 하는지 알려줘요, 중요한 정보는 줄을 바꾸어서, 겁주지 않고 정확히, 완료는 짧고 분명하게.
- Core phrase: `고객님 옆에서 다정히 함께할게요`.
- Voice & Tone: 친근하게, 정확하게, 동료처럼, 차분하게.

### Page 4 - UX Writing 2 - Usage

- Header: `UX Writing 2 - Usage`.
- 실제 서비스에 적용된 문장을 AI로 분석하여 정리한 내용을 포함합니다.
- 섹션: 안내 문구, 토스트, 에러 및 경고, 확인 및 완료, 버튼 및 CTA, 대기 및 빈 화면.
- 각 섹션은 규칙, 실제 예시, Do & Don’t 카드로 구성됩니다.
- 안내 문구는 왜 이 화면이 떴는지와 다음에 무엇을 하는지를 설명합니다.
- 토스트는 짧고 빠르게 읽히는 결과 안내입니다.
- 에러 및 경고는 문제를 알리되 위협적으로 표현하지 않고 다음 행동을 함께 안내합니다.
- 확인 및 완료는 결과와 다음 상태를 분명하게 전달합니다.
- 버튼 및 CTA는 사용자에게 주도권을 주며 선택 이후의 행동을 명확히 합니다.
- 대기 및 빈 화면은 현재 처리 중인 일과 기다리는 이유를 알려줍니다.

### Page 5 - UX Writing 3 - Pattern

- Header: `UX Writing 3 - Pattern`.
- 실제 예시 1,400여 개 문장을 분석해 95% 이상을 차지하는 6가지 패턴의 종결 어미를 정리합니다.
- 예시 출처: `badream_ux_sentences.json` 실서비스 문구 1,455건.
- 자주 쓰이는 패턴: `~되었어요`, `~해주세요`, `~할게요 / ~드릴게요`, `~할까요?`, `~할 수 있어요 / ~수 없어요`, `~있을 수 있어요`.
- 줄바꿈 규칙: 의미 단위를 기준으로 줄바꿈합니다.
- 이름과 호칭: `고객님`보다 사용자의 이름을 부르는 표현을 사용합니다. 예시 이름은 `김드림님`.
- 피해야 할 표현과 바람직한 표현을 Don’t/Do 카드로 제시합니다.

### Page 6 - Iconography

- Header: `Iconography`.
- Guide: Material Guide 활용, Stroke Size 2, Line Object화, Corner Radius Object화 이후 0~2px 범위 0.25 단위, Frame Size 24px × 24px, Constraints Scale × Scale, Default/Large/Medium/Small size 기준.
- 24px × 24px Frame, Key Line, Key Shape, Padding, Live Area, Size 400% 예시를 포함합니다.
- UI Icons: Outlined / Filled / Colored.
- Maker Icons: Default / Profile.
- BSS Icons: Default / Profile.
- Service Icons: Default / Profile.

### Page 7 - Typography

- Header: `Typography`.
- 기본 서체: Pretendard.
- Type sample: 한글, 영문 대문자/소문자, 숫자/특수문자 샘플.
- Type Styles: Display, Heading 1, Heading 2, Title, SubTitle, Body 1, Body 2, Caption 1, Caption 2.
- Weight: Regular, Medium, SemiBold, Bold.
- 사용 규칙: 12px 이하 사용 지양, Line Height는 Size 기준 약 1.35~1.6배, 지정된 값 임의 수정 금지, Typography는 Style로 등록.

### Page 8 - Color Chips

- Header: `Color Chips`.
- Design Token - Reference: Blue, Deep Blue, Emerald, Purple, Turquoise, Red, Green, Orange, Yellow, Gray, Shadow.
- Alpha/Transparent tokens: 주요 default color의 20/40/60/80, Gray 900의 2/5/10/20/40/60/80, Gray 50의 5/10/20/40/60/80.
- Design Token - System: Brand, Theme, Common, Neutral 계열 토큰.
- Interaction token family: gray, light-gray, blue, light-blue, deep-blue, light-deep-blue, emerald, light-emerald, purple, light-purple, turquoise, light-turquoise, red, light-red, green, light-green, orange, light-orange, yellow, light-yellow.
- WCAG 기준을 만족하도록 계층 명암비를 관리합니다.

### Page 9 - Color System

- Header: `Color System`.
- Brand Color: Primary, Secondary, Tertiary.
- Theme Color: Purple, Turquoise, Destructed, Success, Warning, Rating.
- Surface Color: Mobile, Web.
- Gradient Color: Gradient White upward, Gradient Blue downward_diag.
- Error 색상은 강조의 상황에서도 사용합니다.

### Page 10 - Color Palette

- Header: `Color Palette`.
- Palette: Blue, Deep Blue, Emerald, Purple, Turquoise, Red, Green, Orange, Yellow, Gray.
- 각 팔레트는 900에서 50까지의 단계 값을 보여줍니다. Gray는 900에서 50까지의 시각 팔레트를 보여주며, Color Chips의 Reference Token에는 0과 1000도 포함합니다.
- 팔레트 카드에는 검정/흰색 텍스트 대비 비율과 AA/AAA 여부가 표시됩니다.
- Default marker: Blue 500, Deep Blue 500, Emerald 500, Purple 500, Turquoise 600, Red 500, Green 600, Orange 500, Yellow 500.

### Page 11 - Spacing

- Header: `Spacing`.
- Spacing은 UI 요소 간 간격을 정의하고 관리하는 기본 단위입니다.
- 2·4·8 배수를 기반으로 하되 일부 구간에서 예외값을 적용합니다.
- Gap과 Padding 구분 없이 Spacing 값을 사용합니다.
- Design Token: `ref-spacing-00` ~ `ref-spacing-23`.
- Example: -2px부터 200px까지의 간격 시각화.

### Page 12 - Grid

- Header: `Grid`.
- 화면별 기본 Margin값만 엄격하게 적용하고 Grid는 최적화된 레이아웃을 지향점으로 유연하게 적용합니다.
- Mobile과 Web 모두 스크롤 시 하단 Padding값 40px을 필수 적용합니다.
- Mobile: 390×844, 4 columns, margin 20px, gutter 12px, Figma iPhone14.
- Web: 1920×1080, 12 columns, margin 40px, gutter 24px, Figma slide 16:9.

### Page 13 - Shadow

- Header: `Shadow`.
- Shadow는 UI 요소 간 위계와 중요도 정의에 필요한 효과입니다.
- 기본적으로 색상 대비로 요소를 구분하며, 꼭 필요한 부분 외에는 Drop Shadow를 무분별하게 적용하지 않습니다.
- Token: `shadow_01`, `shadow_02`, `shadow_03`, `shadow_04`, `shadow_05`, `shadow_sh`.
- Usage: Pop-Up `shadow_02`, Bottom Sheet `shadow_sh`, Toast `0 6px 16px 0 #000000 10%`.

### Page 14 - Radius

- Header: `Radius`.
- Radius는 컴포넌트의 시각적 일관성을 유지하는 핵심 요소입니다.
- 시멘틱 Radius 토큰을 도입해 디자인과 개발 작업 기준을 통일합니다.
- Full Bleed Button 등 화면 가로 폭 전체를 차지하는 컴포넌트의 경우 Radius 값을 0으로 정합니다.
- Design Token: `ref-radius-01` ~ `ref-radius-12`.
- Usage: Input/Option 12px, Sheet 16px, Pop-Up 20px.

### Page 15 - Border Width

- Header: `Border Width`.
- 예외의 경우를 제외한 대부분의 컴포넌트에 정의된 Border Width값을 적용합니다.
- Design Token: `ref-borderwidth-01` ~ `ref-borderwidth-09`.
- Example values: 0.5px, 1px, 2px, 4px, 6px, 8px, 10px, 12px, 14px.

### Page 16 - Opacity

- Header: `Opacity`.
- Opacity는 Color Chip에 등록된 투명색 외의 사용이 필요한 상황에서 적용합니다.
- 상황에 따라 컴포넌트 자체에 투명도를 설정할 수 있으며, 정의된 opacity token을 활용합니다.
- 기본 색상은 `[sys-color-common-black-emphasis]`이며, Dimmed 상황 시 배경은 투명도 40%로 통일합니다.
- Design Token - Reference: `ref-opacity-0`, `ref-opacity-5`, `ref-opacity-10`, `ref-opacity-20`, `ref-opacity-30`, `ref-opacity-40`, `ref-opacity-50`, `ref-opacity-60`, `ref-opacity-70`, `ref-opacity-80`, `ref-opacity-90`, `ref-opacity-100`.
- Usage: Dimmed 40% / `ref-opacity-40`.

### Page 17 - Character

- Header: `Character`.
- 고객 A/S 및 문의 응대 시, 답변 프로필에 사용합니다.
- 상세 사용범위 및 Variation은 추후 보완 예정입니다.
- 드림맨: With Background / Without Background.
- 드림걸: With Background / Without Background.
