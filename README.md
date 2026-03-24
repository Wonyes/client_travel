# ✈️ Travelidge

> **Travelidge**는 소상공인 및 여행업체를 위한 **온라인 예약/결제 통합 관리 시스템**입니다.  
> 자체 플랫폼과 **네이버 스마트스토어**를 연동하여 상품 등록부터 예약, 결제, 주문 관리까지 한 번에 처리할 수 있도록 지원합니다.

- 소상공인 및 업체는 **쉽고 빠르게 상품을 등록**할 수 있습니다.
- 고객은 **간편하게 예약 및 결제**를 통해 원활한 사용자 경험을 제공합니다.

---

## 👨‍💻 개발 기간 및 인원

- **기간**: 2025.02 ~ 2025.05
- **구성**: 2인으로 기획된 프로젝트이며 기획 **공동**, 디자인 및 프론트엔드/CI·CD AWS 배포는 **프론트**가 전담하였습니다.

<div align="center">

| <img src="https://avatars.githubusercontent.com/u/186001551?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/92082963?v=4" width="150" height="150"/> |
| :---: | :---: |
| **BACK-END**<br/>[@silver-sunny](https://github.com/silver-sunny) | **FRONT-END / DESIGN / DevOps**<br/>[@Wonyes](https://github.com/Wonyes) |

</div>

---

## 🌐 배포 링크

| **페이지** | **바로가기** |
| :--- | :--- |
| **사용자 페이지** | [🔗 사용자페이지 바로가기](https://travelidge.shop) |
| **관리자 페이지** | [🔗 관리자페이지 바로가기](https://admin.travelidge.shop) |
| **API 명세서** | [🔗 API명세서 바로가기](https://api.travelidge.shop/swagger-ui) |

---

## 🔧 기술적 도전과 해결 (Troubleshooting & Engineering)

### 1️⃣ Toss 결제 파이프라인 구축 및 단일 라우팅 가드 (UX 최적화)
<details open>
<summary><b>커스텀 API 연동, 단일 주문서 유지 및 '뒤로가기' 중복 결제 완벽 차단</b></summary>
<br />

**문제 상황:** 첫 토스페이먼츠(Toss Payments) 연동 시, 기본 위젯 방식은 현재 서비스에는 적용 불가하다고 판단했습니다. 또한, 결제 완료 후 사용자가 브라우저 '뒤로가기'를 눌렀을 때 이미 결제된 상품임에도 결제창으로 재진입하게 되는 치명적인 결제 오류를 발견했습니다.

**해결 방안:**
- **토스 API 직접 연동:** 위젯 대신 API 방식으로 선회하여 `결제 요청 ➔ URL 파라미터 반환 ➔ 서버 주문 요청 및 결제 완료 ➔ 클라이언트 상태 반영`으로 이어지는 커스텀 결제 흐름을 구축했습니다.
- **주문서 단일화 및 라우팅 제어:** 개별 번호로 주문서를 띄우지 않고 단일 라우트(`product/orderform`)에서 항상 마지막으로 요청된 상품만 뜨도록 사용성을 제어했습니다. 동시에 라우팅 가드를 설정하여, 이미 결제 완료된 건에 대해 뒤로가기를 시도하면 결제창이 아닌 '홈 화면'으로 리다이렉트 시켜 중복 결제를 원천 차단했습니다.
</details>

### 2️⃣ 상태 동기화의 함정 극복 및 TanStack Query 최적화
<details open>
<summary><b>새로고침 없는 '관심 상품(찜하기)' 다중 리스트 동기화 구현</b></summary>
<br />

**문제 상황:** 메인 페이지의 추천/베스트/일반 상품 리스트에 동일한 상품이 중복 노출될 수 있습니다. 한 리스트에서 찜하기(하트)를 누르면 다른 리스트에 있는 동일 상품의 하트는 불이 켜지지 않아, 사용자가 새로고침을 해야만 전체 뷰가 동기화되는 문제가 발생했습니다.

**해결 방안:**
- 단일 하트 컴포넌트에 로컬 상태를 두지 않고, 부모로부터 식별자(`id`), 상태(`favorites`), 제어 함수(`onFavorite`)를 Props로 명확히 주입받아 동일 상품 여부를 렌더링 단계에서 비교하도록 개편했습니다.
- **TanStack Query 도입:** 공식 문서와 블로그를 깊게 탐독하며 Axios와 Query를 연동했습니다. `useMutation`을 활용해 찜하기 성공 시 해당 상품 ID와 관련된 캐시를 즉각 업데이트하여, **새로고침 없이도 모든 리스트의 하트 UI가 즉각(Optimistic) 동기화되도록 사용성을 대폭 개선**했습니다.
</details>

### 3️⃣ 백엔드 밀착 협업을 통한 API 스펙 설계 및 Constant 상태 매핑
<details open>
<summary><b>디자인/기획 주도 및 복잡한 커머스 상태 코드의 프론트엔드 규격화</b></summary>
<br />

**문제 상황:** 서비스 사용성 최적화를 위해 기획 단계부터 백엔드 API 스펙(요청/응답/에러 포맷) 조율에 큰 어려움이 있었습니다. 또한 커머스 특성상 취소, 환불 등 수많은 주문 상태값이 영문 문자열(`CANCEL_REQUEST` 등)로 전달되어 UI 처리가 파편화될 우려가 있었습니다.

**해결 방안:**
- **일일 기획/디자인 피드백:** Figma를 기반으로 백엔드 개발자와 매일 화면을 공유하며 협의를 진행했습니다. 보내고 받는 데이터 스펙을 하나하나 정의하고, 불필요한 페이로드를 제거했으며, 완벽한 에러 핸들링을 위해 Error Response 포맷까지 별도 규격화하여 컴포넌트에 반영했습니다.
- **Constant 기반 Switch 매핑:** 서버에서 내려주는 영문 상태 상수(Constant)를 프론트엔드 단의 상태 객체로 분리했습니다. `Switch` 문을 활용해 `CANCEL_REQUEST` ➔ '취소' 와 같이 각 상태별 텍스트와 전용 CSS 라벨이 자동으로 렌더링되도록 코드를 구조화했습니다.
</details>

### 4️⃣ 인터랙션(Animation) 기반의 앱(App) 라이크 UX 구현
<details open>
<summary><b>디자인 4회 전면 개편 및 트렌디한 마이크로 인터랙션 적용</b></summary>
<br />

**해결 과정:** 최신 트렌드에 맞는 최상의 UI/UX를 찾기 위해 레퍼런스를 끝없이 취합하며 프로젝트 전체 디자인을 4번이나 전면 개편했습니다. 특히 딱딱한 웹 브라우저의 느낌을 지우기 위해, 주문 시트 등장이나 캘린더 오픈 동작 시 **마이크로 애니메이션과 인터랙션**을 정교하게 다듬어 마치 네이티브 모바일 앱(App)을 사용하는 듯한 부드러운 사용자 경험(UX 최적화)을 제공하는 데 심혈을 기울였습니다.
</details>

### 5️⃣ (DevOps) 빌드 병목 해결을 위한 AWS EC2 & Nginx 마이그레이션
<details open>
<summary><b>Jenkins/Docker 환경의 한계를 직접 돌파한 인프라 구축 경험</b></summary>
<br />

**해결 과정:** 초기 Jenkins와 Docker를 활용한 CI/CD 환경에서 프론트엔드 빌드/배포 속도 저하 현상이 심각했습니다. 이를 타개하기 위해 기술 블로그를 참고하여 **AWS EC2 환경으로 직접 마이그레이션을 단행**했습니다. 추가로 `Nginx`를 직접 세팅해 안정적인 웹 서버 환경을 구축하며, 문제 발생 시 인프라 단까지 파고들어 해결해 내는 역량을 증명했습니다.
</details>

<br />

---

## 🖥️ 사용자 및 관리자 서비스 UI (Gallery)

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">🛍️ 메인, 탐색 및 상세 페이지 (클릭하여 열기)</summary>
<br />
<p align="left"><i>상품 탐색부터 상세 정보 확인까지의 주요 UI입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/bcafb10c-45ca-4775-9b05-e1d66f0fe612" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/845ae749-589e-4c7c-9e79-0dc27d72f697" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>메인 추천 및 베스트 상품</i></sub></td>
    <td><sub><i>검색 및 실시간 인기 검색어</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/20836e4b-1e11-408c-8544-c9a991ec5d9c" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/a991e4ef-a70e-4eca-bcb3-146e74ec28ba" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>관심 상품 (찜하기) 목록</i></sub></td>
    <td><sub><i>상품 상세 페이지</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/2b690713-1e26-4efe-b1e1-968f875ffacb" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/4db6baff-3a6f-4d2a-ac5a-ab015905a0a9" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>상품 상세 내 1:1 문의 탭</i></sub></td>
    <td><sub><i>상품 상세 내 리뷰 탭</i></sub></td>
  </tr>
</table>
</details>
<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">💳 장바구니 및 결제 연동 (클릭하여 열기)</summary>
<br />
<p align="left"><i>장바구니 담기부터 토스페이먼츠 간편 결제까지의 파이프라인입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/479b7b48-e7c2-4105-9643-b099f26e38d9" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/6a8b4ca6-8437-4df9-b260-3068a1fa13a5" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>장바구니 리스트</i></sub></td>
    <td><sub><i>상품 결제(주문서) 페이지</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/8bfe97d7-d8ae-4366-b1ff-05c8e5beff9e" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/13e22342-d1f9-469d-9ab0-107569dc6fbc" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>토스페이먼츠(Toss) 연동 결제</i></sub></td>
    <td><sub><i>결제 완료 페이지</i></sub></td>
  </tr>
</table>
</details>
<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">👤 마이페이지 및 정보수정 (클릭하여 열기)</summary>
<br />
<p align="left"><i>개인 프로필 관리 및 내 정보 수정 인터페이스입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/c3aba5e0-ca40-409d-b2ea-e647f53edbf5" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/42ee9ea6-ced2-4eee-8a6a-7844866923ce" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>마이 페이지 홈</i></sub></td>
    <td><sub><i>회원정보 수정 홈</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/9a55fe97-3884-4b0e-81a4-52ac5d0af37d" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/4776becf-5b36-47e2-b181-876ba7f74c0a" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>이름 변경 모달</i></sub></td>
    <td><sub><i>닉네임 변경 폼</i></sub></td>
  </tr>
  <tr align="center">
    <td colspan="2"><img src="https://github.com/user-attachments/assets/955fa59c-da06-4932-9388-be722efe249f" width="32%" /></td>
  </tr>
  <tr align="center">
    <td colspan="2"><sub><i>전화번호 변경 폼</i></sub></td>
  </tr>
</table>
</details>
<br />

<details>
<summary style="font-size: 1.5rem; font-weight: bold; cursor: pointer; color: #0052CC;">🔄 주문 관리, 리뷰 및 CS 내역 (클릭하여 열기)</summary>
<br />
<p align="left"><i>구매/취소 내역 확인 및 리뷰 작성, 고객 문의 내역 관리 화면입니다.</i></p>
<table width="100%">
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/0ba19cab-3066-4ec8-aef8-05dd51724abf" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/e20182f3-bd98-4444-a736-3c7028e440b4" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>주문 및 구매 내역 리스트</i></sub></td>
    <td><sub><i>구매 상세 내역 확인</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/2fab49cb-4375-4cd7-96f8-0fb61c689b75" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/f1000d47-b522-497c-bac9-bd791ffb46c4" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>주문 취소 신청 모달</i></sub></td>
    <td><sub><i>취소 및 반품 완료 내역 확인</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/ab748537-0f89-4803-9a33-7566f003ea44" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/75074a55-b3ec-4524-bd8d-59f2d865dc77" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>환불 상세 처리 내역</i></sub></td>
    <td><sub><i>나의 리뷰 리스트 확인</i></sub></td>
  </tr>
  <tr align="center">
    <td width="50%"><img src="https://github.com/user-attachments/assets/35606ac3-7d94-4fd8-9ba1-4e54e474ac85" width="65%" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/8987b8d3-4028-4f88-9e0b-ae7dfab014ed" width="65%" /></td>
  </tr>
  <tr align="center">
    <td><sub><i>상품 리뷰 작성 폼</i></sub></td>
    <td><sub><i>리뷰 작성 완료 확인</i></sub></td>
  </tr>
  <tr align="center">
    <td colspan="2"><img src="https://github.com/user-attachments/assets/3966741e-3f6d-477b-96da-edf48ff38440" width="32%" /></td>
  </tr>
  <tr align="center">
    <td colspan="2"><sub><i>나의 1:1 상품 문의 내역</i></sub></td>
  </tr>
</table>
</details>

---

## 🚀 주요 기능

### ✅ 공통 및 아키텍처
| **기능** | **설명** |
| :--- | :--- |
| **📅 모듈화된 입력 컴포넌트** | 캘린더, 인풋 등을 단일 컴포넌트에서 분기 처리하여 렌더링 최적화. |
| **💬 중앙 제어 오버레이** | `openAlert`, `openConfirm` 등 함수 호출만으로 동작하는 글로벌 Modal/Toast 시스템. |
| **🎨 공통 스타일 관리** | 상수(Constant) 및 공통 클래스로 디자인을 분리하여 일관성 및 재사용성 극대화. |
| **✨ 앱(App) 라이크 인터랙션** | 주문서, 캘린더 등 주요 UI 렌더링 시 부드러운 애니메이션 및 인터랙션 적용. |
| **🔢 페이징 처리** | 페이징 로직을 공통 커스텀 훅으로 처리하여 일관된 사용자 경험 제공. |
| **🧩 동적 레이아웃 시스템** | `ScrollTable`, 리스트, 드롭다운 등을 컴포넌트화해 API 데이터 주입 시 자동 동작. |

### 📦 데이터 및 상태 관리
| **기능** | **설명** |
| :--- | :--- |
| **🗂️ 관심사 분리 (상태 관리)** | 서버 데이터는 `React Query`로, 클라이언트 뷰 상태는 `Zustand`로 분리하여 효율적 관리. |
| **🔄 비동기 통신 제어** | 공통 API 래핑 모듈과 React Query를 활용해 데이터 패칭, 캐싱, 리페치 로직 간소화. |
| **🗑️ 낙관적 동기화 업데이트** | 다중 리스트에 걸친 하트(찜하기) 및 리뷰 삭제 시, 서버 통신 전 UI를 즉각 동기화 처리. |
| **📝 에러 및 상태 매핑** | 백엔드 에러 및 영문 상태 코드(`CANCEL_REQUEST` 등)를 프론트엔드 스펙에 맞춰 정밀하게 매핑. |

### 👤 사용자 기능 (B2C)
| **기능** | **설명** |
| :--- | :--- |
| **🔑 소셜 회원가입 및 로그인** | OAuth2를 활용한 소셜 로그인, 회원가입 및 프로필 정보 수정 기능 제공 |
| **💳 상품 구매 및 결제 연동** | **Toss API 커스텀 연동**을 통해 간편 결제 파이프라인 및 중복 결제 방지 가드 구축 |
| **📦 주문 라이프사이클 관리** | 단일 주문서 폼(`/orderform`) 제공 및 주문 취소/반품 등 상태 관리 기능 |
| **⭐ 리뷰 및 커뮤니티** | 리뷰 작성(이미지 첨부), 별점 평가, 썸네일 지원 및 부적절 리뷰 신고 시스템 |
| **🔍 상품 검색 및 필터링** | 실시간 인기 검색어 출력, 키워드 검색 및 관심 상품(즐겨찾기) 기능 제공 |
| **💬 실시간 고객 소통** | 상품 상세 페이지 직접 문의 및 마이페이지 1:1 문의 내역 관리 시스템 |
| **🖱️ 드래그 스크롤** | 여러 이미지가 있을 때 마우스 드래그로 가로 스크롤 지원 |

<br />



