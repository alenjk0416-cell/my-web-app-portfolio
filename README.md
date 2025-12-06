# 🎨 Serverless Dynamic Theme Engine
> **Google Apps Script(GAS)와 Vanilla JS로 구현한 10가지 테마의 반응형 웹 애플리케이션**

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 프로젝트 소개
이 프로젝트는 **Google Apps Script**를 백엔드 서버로 활용하여, 단일 코드베이스에서 **10가지의 상이한 UI/UX 테마**를 실시간으로 전환할 수 있는 실험적인 웹 애플리케이션입니다.
별도의 호스팅 비용 없이 구글 워크스페이스(Workspace) 생태계만으로 **풀스택(Full-stack)** 기능을 구현했습니다.

## 🏗 System Architecture (수정됨)
이 프로젝트는 **MVC 패턴**을 변형하여, Google Apps Script 환경에 최적화된 아키텍처를 따르고 있습니다.

```mermaid
graph LR
    User((User)) -- "1. 접속 (URL)" --> GAS["Google Apps Script<br>(ContentService)"]
    GAS -- "2. HTML 템플릿 서빙" --> Browser["Web Browser<br>(SPA Client)"]
    
    subgraph Frontend Logic
    Browser -- "3. 테마 변경 (CSS Var)" --> Layout["Dynamic Layout Engine"]
    Browser -- "4. 데이터 요청" --> Controller["Server Controller<br>(Code.gs)"]
    end
    
    subgraph Backend Serverless
    Controller -- "5. 데이터 조회/가공" --> DB[("Google Sheets<br>Database")]
    DB -- "6. JSON 데이터 반환" --> Controller
    end
    
    Controller -- "7. 비동기 응답" --> Browser
