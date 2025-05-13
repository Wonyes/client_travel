
# ✈️ Traveldige


> **Travelidge**는 소상공인 및 여행업체를 위한 **온라인 예약/결제 통합 관리 시스템**입니다.  
> 자체 플랫폼과 **네이버 스마트스토어**를 연동하여 상품 등록부터 예약, 결제, 주문 관리까지 한 번에 처리할 수 있도록 지원합니다.

- 소상공인 및 업체는 **쉽고 빠르게 상품을 등록**할 수 있습니다.
- 고객은 **간편하게 예약 및 결제**를 통해 원활한 사용자 경험을 제공합니다.
---

## 👨‍💻 개발 기간 및 인원

- **기간**: 2025.02 ~ 2025.05
- **구성**: 2인으로 기획된 프로젝트이며 기획 **공동** 디자인 **프론트**가 담당하였습니다.

|<img src="https://avatars.githubusercontent.com/u/186001551?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/92082963?v=4" width="150" height="150"/>|
|:-:|:-:|
|BACK-END<br/>[@silver-sunny](https://github.com/silver-sunny)|FRONT-END / DESIGN<br/>[@Wonyes](https://github.com/Wonyes)|

---

## 🌐 배포 링크
| **페이지**          | **바로가기**                                                                                    
|-------------------------|-----------------------------------------------------------------------------------------------|
| 사용자 페이지 | [사용자페이지 바로가기](https://travelidge.shop) |   
| 관리자 페이지 | [관리자페이지 바로가기](https://admin.travelidge.shop) |
| API 명세 |[API명세서 바로가기](https://api.travelidge.shop/swagger-ui) |
---

## 🛠 기술 스택

### 🌐 Front-end

| **라이브러리**          | **설명**                                                                                       | **버전**   |
|-------------------------|-----------------------------------------------------------------------------------------------|------------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) | React를 사용하여 동적인 UI를 구현하고, Vite로 빠르고 효율적인 개발 환경을 제공합니다. | 18.2.0   |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Vite를 사용하여 빠른 빌드와 핫 리로딩을 통해 개발 생산성을 극대화합니다.             | 5.3.1    |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | TypeScript로 타입 안전성을 강화하여, 코드 작성 시 오류를 사전에 예방합니다.         | 5.7      |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | React Router를 사용하여 애플리케이션 내의 페이지 간 네비게이션을 구현합니다.        | 7.2.0    |
| ![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | React Query로 서버 데이터를 캐싱하고, API 통신을 효율적으로 관리합니다.             | 5.74.4   |
| ![Axios](https://img.shields.io/badge/Axios-5A29E3?style=for-the-badge&logo=axios&logoColor=white) | Axios를 사용하여 API 통신을 처리하고, token 검사 및 요청을 관리합니다.              | 1.0.2    |
| ![Zustand](https://img.shields.io/badge/Zustand-FF0000?style=for-the-badge) | Zustand로 애플리케이션의 상태를 효율적으로 관리합니다.                               | 5.0.4    |
| ![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) | Styled-Components를 활용해 컴포넌트 단위로 스타일을 정의하고, 코드의 재사용성을 높였습니다. | 6.1.15   |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-00C853?style=for-the-badge&logo=framer&logoColor=white) | Framer Motion을 활용하여 애니메이션을 추가하여 사용자 경험을 향상시킵니다.          | 12.5.0   |
| ![Swiper](https://img.shields.io/badge/Swiper-6A5DFF?style=for-the-badge&logo=swiper&logoColor=white) | Swiper를 사용하여 다양한 슬라이더 UI를 구현합니다.                                  | 11.2.6   |
| ![Date-Fns](https://img.shields.io/badge/Date--Fns-1D61D1?style=for-the-badge&logo=date-fns&logoColor=white) | Date-Fns를 사용하여 날짜와 시간을 효율적으로 처리합니다.                             | 4.1.0    |

---


### ⚙ CI/CD
| **기술**                | **설명**                                                                                      
|-------------------------|-----------------------------------------------------------------------------------------------
| ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white) | Jenkins를 사용하여 CI/CD 파이프라인을 구축하고, 자동화된 빌드 및 배포를 관리합니다.  |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) | Docker를 활용하여 애플리케이션을 컨테이너화하고, 일관된 실행 환경을 제공합니다.     |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) | Nginx를 사용하여 리버스 프록시 설정 및 트래픽 분배를 효율적으로 처리합니다.          |
  
---
## 🚀 주요 기능

### ✅ **공통**

| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| **캘린더, 인풋, 텍스트 입력창** | 한 컴포넌트에서 종류별로 나눠서 사용 가능. 필요한 경우에만 렌더링되도록 조정됨. |
| **모달, 알림, 확인창, 토스트**  | Modal, Alert, Confirm, Toast 등 다양한 UI 및 기능 요소를 한 컴포넌트에서 관리 가능. |
| **공통 스타일 관리**           | 자주 사용되는 스타일은 모두 공통으로 분리하여 재사용성을 극대화.          |
| **좋아요 및 드래그 기능**       | 여러 페이지에서 사용되는 좋아요 및 드래그 기능을 함수 형태로 분리하여 편리하게 사용 가능. |
| **페이징 처리**                | 페이징 로직을 공통으로 처리하여 일관된 사용자 경험 제공.                 |

---

### 👤 **사용자 기능**
| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| 소셜 회원가입 및 로그인       | OAuth2를 활용한 소셜 로그인 및 회원가입 기능 제공                       |
| 회원 정보 수정                | 사용자 프로필 및 계정 정보를 수정할 수 있는 기능                        |
| 장바구니 관리                 | 상품을 장바구니에 추가, 삭제, 수정할 수 있는 기능                       |
| 상품 구매 및 결제             | Toss API를 연동하여 간편 결제 및 구매 기능 제공                        |
| 주문 관리                    | 주문 취소, 반품 등 주문 상태를 관리할 수 있는 기능                      |
| 리뷰 작성 및 신고             | 상품 리뷰 작성 및 부적절한 리뷰 신고 기능                              |
| 관심상품 등록                | 관심상품으로 등록하여 즐겨찾기 기능 제공                               |
| 후기 작성                    | 구매 후 후기 작성 기능                                                 |
| 상품 검색 및 인기 검색어 출력 | 키워드 기반 검색 및 인기 검색어를 실시간으로 출력                      |
| 상품 문의 및 1:1 문의 작성    | 상품 관련 문의 및 1:1 문의 작성 기능 제공                              |

---

### 🔧 **관리자 기능**
| **기능**                     | **설명**                                                                 |
|------------------------------|-------------------------------------------------------------------------|
| 관리자 로그인                | 관리자 계정으로 로그인 가능                                             |
| 관리자 계정 생성 및 삭제      | 관리자 계정을 생성하거나 삭제할 수 있는 기능                            |
| 상품 및 카테고리 관리         | 상품 및 카테고리를 추가, 수정, 삭제할 수 있는 기능                      |
| 네이버 스마트스토어 연동      | 네이버 스마트스토어와 연동하여 상품 및 주문 데이터를 동기화             |
| 주문 상태 관리               | 주문 확인, 취소, 반품 상태를 관리할 수 있는 기능                        |
| 티켓 발급 및 사용 처리        | 예약 티켓 발급 및 사용 상태를 관리                                     |
| 리뷰 신고 관리               | 신고된 리뷰를 확인하고 처리할 수 있는 기능                              |
| 상품 문의 및 1:1 문의 응답    | 사용자 문의에 대한 응답 기능                                           |
| 추천상품 등록 및 삭제         | 추천상품을 등록하거나 삭제할 수 있는 기능                              |
  



