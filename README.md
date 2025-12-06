# 🎨 Serverless Dynamic Theme Engine
> **Google Apps Script(GAS)와 Vanilla JS로 구현한 10가지 테마의 반응형 웹 애플리케이션**

## 📋 프로젝트 소개
이 프로젝트는 구글 앱스 스크립트를 서버로 활용하여 만든 웹앱입니다.
하나의 코드로 10가지 디자인(테마)을 실시간으로 바꿀 수 있는 기능을 구현했습니다.

## 🛠 사용 기술
* **Backend:** Google Apps Script (Serverless)
* **Frontend:** HTML5, CSS3, JavaScript (No Framework)
* **Data:** Google Spreadsheet (Database)
## 🏗 System Architecture
이 프로젝트는 **MVC 패턴**을 변형하여, Google Apps Script 환경에 최적화된 아키텍처를 따르고 있습니다.

```mermaid
graph LR
    User((User)) -- "1. 접속 (URL)" --> GAS[Google Apps Script\n(ContentService)]
    GAS -- "2. HTML 템플릿 서빙" --> Browser[Web Browser\n(SPA Client)]
    
    subgraph Frontend Logic
    Browser -- "3. 테마 변경 (CSS Var)" --> Layout[Dynamic Layout Engine]
    Browser -- "4. 데이터 요청\n(google.script.run)" --> Controller[Server Controller\n(Code.gs)]
    end
    
    subgraph Backend Serverless
    Controller -- "5. 데이터 조회/가공" --> DB[(Google Sheets\nDatabase)]
    DB -- "6. JSON 데이터 반환" --> Controller
    end
    
    Controller -- "7. 비동기 응답\n(SuccessHandler)" --> Browser


## ✨ Key Features
### 1. Dynamic Theme & Layout Engine
단순한 색상 변경(Dark Mode)을 넘어, **CSS Variable**과 **Grid System**을 활용해 DOM 구조의 물리적 배치를 실시간으로 변경합니다.
- **Corporate Theme:** 사이드바(Nav)가 상단 헤더(Header)로 이동
- **Mobile Theme:** 데스크톱 브라우저에서도 모바일 앱 경험(Bottom Navigation) 시뮬레이션
- **Terminal Theme:** 개발자 친화적인 Hacker Style 및 Canvas 매트릭스 효과 적용

### 2. Serverless Backend (GAS)
- **Zero Cost Deployment:** Google Workspace 계정만으로 호스팅 및 백엔드 구축
- **Sheet as a Database:** Google Sheets를 CMS로 활용하여 실시간 재고/불명품 데이터 CRUD 처리
- **Custom Router:** `doGet(e)` 함수를 활용한 자체 라우팅 및 템플릿 서빙 구현

---

## 🔥 Trouble Shooting (핵심 문제 해결)
### Q. 단일 HTML 파일에서 1,000줄이 넘는 코드를 어떻게 관리했나요?
**[문제 상황]**
초기에는 `index.html` 하나에 CSS, JS, HTML이 모두 섞여 있어, 테마가 추가될수록 가독성이 떨어지고 유지보수가 불가능에 가까웠습니다.

**[해결 과정]**
Google Apps Script의 `HtmlService`를 활용해 **Include 패턴**을 도입했습니다.
1. `stylesheet.html`, `javascript.html`로 파일을 물리적으로 분리
2. 서버 측(`Code.js`)에 `include()` 헬퍼 함수를 작성하여 렌더링 시점에 파일을 병합
3. **결과:** 관심사 분리(Separation of Concerns)를 통해 코드 탐색 시간을 50% 이상 단축하고 모듈화에 성공했습니다.

### Q. 테마 변경 시 레이아웃 깨짐 현상은 없었나요?
**[해결]** CSS의 `transition` 속성과 JavaScript의 상태 관리를 결합했습니다.
레이아웃이 크게 바뀌는(Layout Shift) 테마(예: Corporate) 전환 시, `requestAnimationFrame`을 통해 캔버스 리사이징을 동기화하여 깜빡임 없는 전환을 구현했습니다.
