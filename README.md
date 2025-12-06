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
