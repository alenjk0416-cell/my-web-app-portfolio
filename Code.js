// Code.gs

/**
 * 웹 앱 접속 시 HTML을 렌더링합니다.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Inventory Dashboard')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 시트 이름을 목록으로 가져옵니다 (필터용).
 */
function getSheetNames() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  // 시트 이름을 가져오되, 숨겨진 시트나 설정 시트는 제외할 수 있음
  return sheets.map(sheet => sheet.getName());
}

/**
 * 특정 시트(월)의 데이터와 이전 달 데이터, 트렌드를 가져옵니다.
 */
function getSheetData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  
  // 1. 현재 데이터 (선택된 시트 또는 첫 번째 시트)
  let currentSheet;
  if (sheetName) {
    currentSheet = ss.getSheetByName(sheetName);
  }
  if (!currentSheet) {
    currentSheet = sheets[0]; // 기본값: 첫 번째 시트
  }
  
  const currentData = getSheetValuesAsObjects(currentSheet);
  
  // 2. 지난달 데이터 (비교용)
  // 로직: 현재 시트의 바로 다음 순서 시트를 지난달로 가정 (최신순 정렬 가정)
  // 시트가 하나뿐이면 현재 데이터를 그대로 사용하여 변동 없음으로 표시
  const currentIndex = currentSheet.getIndex() - 1; // 0-based index
  let lastMonthData = [];
  
  if (currentIndex + 1 < sheets.length) {
    const prevSheet = sheets[currentIndex + 1];
    lastMonthData = getSheetValuesAsObjects(prevSheet);
  } else {
    // 비교할 과거 시트가 없으면 빈 배열 혹은 현재 데이터 복사(데모용)
    lastMonthData = []; 
  }

  // 3. 히스토리 데이터 (차트용 - 최근 5개 시트의 총합)
  // 시트 이름이 날짜형식(YYYY-MM)이라고 가정하거나 순서대로 가져옴
  const historyLabels = [];
  const historyValues = [];
  
  // 최근 5개 시트 (역순으로 배치하여 차트 흐름 생성)
  // 시트 순서가 [최신, 1달전, 2달전...] 이라고 가정
  const maxHistory = Math.min(sheets.length, 5);
  for (let i = maxHistory - 1; i >= 0; i--) {
    const s = sheets[i];
    const data = s.getDataRange().getValues();
    // 헤더 제외하고 수량 컬럼(D열 가정, 인덱스 3) 합계 계산
    // 실제로는 헤더 이름을 찾아야 정확하지만 편의상 계산
    let sum = 0;
    if (data.length > 1) {
      // 헤더 찾기
      const headers = data[0];
      const qtyIndex = headers.indexOf('数量'); // '数量' 헤더 찾기
      
      if (qtyIndex > -1) {
        for (let r = 1; r < data.length; r++) {
          sum += Number(data[r][qtyIndex]) || 0;
        }
      }
    }
    historyLabels.push(s.getName());
    historyValues.push(sum);
  }

  return {
    current: currentData,
    lastMonthData: lastMonthData,
    historical: {
      labels: historyLabels,
      values: historyValues
    },
    sheetName: currentSheet.getName()
  };
}

/**
 * 헬퍼 함수: 시트 데이터를 JSON 객체 배열로 변환
 * 첫 번째 행을 헤더(Key)로 사용합니다.
 */
function getSheetValuesAsObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return []; // 데이터 없음
  
  const headers = data[0];
  const result = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      // 빈 셀이나 에러 방지
      obj[headers[j]] = row[j];
    }
    result.push(obj);
  }
  return result;
}
