# PJ5_personal_account_book

개인 프로젝트: My Account Book 만들기

## 프로젝트 개요

이 프로젝트는 사용자의 지출을 관리하기 위한 웹 애플리케이션이다.
주요 기능으로는 지출 내역의 CRUD(작성, 조회, 수정, 삭제)와 월별 지출 조회 기능을 포함한다.
각 기능은 props-drilling, context API, redux 순으로 상태 관리를 구현했다.

## 0. 기본 설명

### 주요 기능

- 지출 CRUD 기능

  - **작성(Create)**: 지출 항목을 작성하여 입력한 월 목록에 추가할 수 있다.
  - **조회(Read)**: 전체 지출 목록과 월별 지출 내역을 조회할 수 있다.
  - **수정(Update)**: 기존 지출 항목을 수정할 수 있다.
  - **삭제(Delete)**: 지출 항목을 삭제할 수 있다.

- 월별 지출 조회

  - 특정 월을 선택하여 해당 월의 지출 내역을 확인할 수 있다.

- 지출 상세 화면
  - 각 지출 항목을 클릭하면 상세 내용을 볼 수 있으며, 이 화면에서 수정 및 삭제가 가능하다.

### 사용한 기술

- **React**: 컴포넌트 기반 UI 라이브러리로, 프로젝트의 전반적인 구조를 구성하는 데 사용되었다.

- **styled-components**: 스타일링을 위해 사용되었다. 컴포넌트에 스타일을 적용하고, props를 통해 조건부 스타일링을 구현했다.

- **react-router-dom**: 페이지 간 이동을 관리하는 데 사용되었다. 지출 항목의 상세 페이지로의 이동 등을 구현했다.

- **useState, useEffect, useRef**: 상태 관리와 생명주기 관리를 위해 사용되었다. `useRef`는 특히 지출 수정 화면에서 입력 값을 관리하는 데 사용되었다.

- **uuid**: 지출 항목의 고유 id 생성을 위해 사용되었다.

### 기타 사항

- **전역 스타일링**: `styled-components`를 사용하여 전역 스타일링을 적용했다. 전역 스타일링을 적용하기 전에 모든 스타일을 reset 시켰다.
- **데이터 관리**: 로컬 스토리지를 사용하여 선택된 월의 데이터를 저장했다. 저장된 값이 없으면 1월을 기본값으로 설정하도록 구현했다.
- **유효성 검사**: 지출 항목 작성 시 날짜, 항목, 금액, 내용에 대해 각각 유효성 검사를 실시했다.

### 페이지 및 컴포넌트 설명

- `HomePage` : 홈페이지(메인 페이지)

  - `Form` 컴포넌트 : 지출 내용 작성하는 부분
  - `Calendar` 컴포넌트 : 월별 지출 내용 조회를 위한 월 선택하는 부분
  - `Graph` 컴포넌트 : 총 지출 비용과 지출 내역 그래프로 보여주는 부분
  - `Category` 컴포넌트 : 지출 내용 리스트로 보여주는 부분

- `DetailPage` : 상세 페이지
  - `DetailContent` 컴포넌트 : 상세한 지출 내용 출력 및 지출 내용 수정/삭제하는 부분

### state 설명

- `expense` (Router 컴포넌트에 정의 (Redux 방식을 사용하기 전))
  - 지출 내용이 객체 형태로 담긴 배열 상태 변수
  - 배열의 각 요소는 객체로, id(고유값), date(날짜), item(항목), amount(금액), description(내용) 총 5개의 프로퍼티가 있다.
  - 초기값으로는 initialExpense(dummyData 내용)이 들어간다.
- `month` (Calendar 컴포넌트에 정의 (Redux 방식을 사용하기 전))
  - 선택한 월이 들어가는 숫자형 상태 변수
  - 초기값으로는 로컬 스토리지에서 "month"라는 키로 저장된 값을 가져와서 사용자가 마지막으로 작업한 월이 들어간다.
  - 만약 로컬 스토리지에 저장된 값이 없는 경우, 초기값으로 1(월)이 들어간다.
- `date`, `item`, `amount`, `description` (DetailContent 컴포넌트에 정의)
  - 선택한 지출 목록 내용의 날짜, 항목, 비용, 설명을 나타내는 상태 변수
  - 초기값으로는 선택한 지출 목록 내용의 날짜, 항목, 비용, 설명이 각각 들어간다.
  - 이 상태 변수를 \<input> 태그의 `ref` 속성과 연결하여 \<input>의 value를 갱신하도록 설정했다.

## 1. props-drilling 방식으로 구현

### 컴포넌트 구조

```
        ┌─ HomePage ┌─ Form
        │           └─ Calendar ┌─ Graph
Router ─┤                       └─ Category
        │
        └─ DetailPage ── DetailContent
```

- props 1: `expense`, `setExpense()`

  - Router 컴포넌트에서는 `expense` state와 `setExpense()` 함수를 사용할 필요가 없다.
  - 그런데, Router 컴포넌트의 자식 컴포넌트인 HomePage 컴포넌트와 DetailPage 컴포넌트에 모두 필요하기 때문에, 그 둘의 부모 컴포넌트인 Router 컴포넌트에서 선언했다.
  - `expense` state의 흐름
    - `Router`(전달) -> `HomePage`(전달) -> `Calendar`(전달) -> `Graph`, `Category`(**사용**)
    - `Router`(전달) -> `DetailPage`(전달) -> `DetailContent`(**사용**)
  - `setExpense()` 함수의 흐름
    - `Router`(전달) -> `HomePage`(전달) -> `Form`(**사용**)
    - `Router`(전달) -> `DetailPage`(전달) -> `DetailContent`(**사용**)

- props 2: `month`

  - Calendar 컴포넌트에서 선택한 월을 저장하기 위해서 `month`라는 state를 선언했다.
  - 그런데 `month` state가 Graph 컴포넌트와 Category 컴포넌트에도 필요했다.
  - 따라서 원래 HomePage의 자식 컴포넌트였던 Graph 컴포넌트와 Category 컴포넌트롤 Calendar 컴포넌트의 자식 컴포넌트가 되도록 수정했다.
  - `month` state의 흐름
    - `Calendar`(**사용** 및 전달) -> `Graph`, `Category`(**사용**)

- props-drilling 방식의 불편한 점
  - props를 사용하지 않고 전달하는 과정이 잦아서 비효율적이다.
  - 동일한 페이지의 컴포넌트인데도 불구하고 props를 사용하기 위해서 컴포넌트 구조를 그 안에서 또 계층적으로 나눠야 해서 코드 리뷰할 때 페이지의 구조를 해석하기가 어렵다.

## 2. Context API 방식으로 구현

### 컴포넌트 구조

```
        ┌─ HomePage ┌─ Form
        │           └─ Calendar ┌─ Graph
Router ─┤                       └─ Category
        │
        └─ DetailPage ── DetailContent
```

- 컴포넌트 구조는 props-drilling 방식이랑 똑같지만 props를 전달하는 방법이 간소화되었다.
- props 1: `expense`, `setExpense()`
  - `expense` state의 흐름
    - `Router`(Context API 생성) -> `Graph`, `Category`(**사용**)
    - `Router`(Context API 생성) -> `DetailContent`(**사용**)
  - `setExpense()` 함수의 흐름
    - `Router`(Context API 생성) -> `Form`(**사용**)
    - `Router`(Context API 생성) -> `DetailContent`(**사용**)
- props 2: `month`
  - `month`를 사용하지 않고 전달하는 컴포넌트는 없지만(props-drilling 현상은 없지만) context API 방식을 연습하기 위해서 이 부분도 context API 방식으로 변경했다.
  - `month` state의 흐름
    - `Calendar`(**사용** 및 Context API 생성) -> `Graph`, `Category`(**사용**)
- context API 방식의 불편한 점
  - 여전히 단방향(상위 컴포넌트에서 하위 컴포넌트)으로만 state를 전달할 수 있다.

### 수정 사항

- `SharedContext.js` 파일에 있던 `ExpenseContext`와 `MonthContext`를 각각 `ExpenseContext.jsx`, `MonthContext.jsx` 파일로 분리하였다.

- `ExpenseContext.jsx` 파일 내용

  - **Context 생성** : `createContext`를 사용하여 ExpenseContext를 생성하였다.
  - **상태 생성** : `useState`를 사용하여 지출 내용이 객체 형태로 담긴 배열을 나타내는 `expense` 상태 변수를 생성하였다.
  - **Provider 사용** : `ExpenseContext.Provider`로 하위 컴포넌트들에게 상태(`expense`)와 상태 함수(`setExpense`)를 전달하였다.

- `MonthContext.jsx` 파일 내용

  - **Context 생성** : `createContext`를 사용하여 MonthContext를 생성하였다.
  - **상태 생성** : `useState`를 사용하여 선택한 월이 들어가는 숫자형 변수를 나타내는 `month` 상태 변수를 생성하였다.
  - **Provider 사용** : `MonthContext.Provider`로 하위 컴포넌트들에게 상태(`month`)와 상태 함수(`setMonth`)를 전달하였다.

- 바뀐 컴포넌트 구조

  ```
          ┌─ HomePage ┌─ Form
          │           ├─ Calendar
  Router ─┤           ├─ Graph
          │           └─ Category
          │
          └─ DetailPage ── DetailContent
  ```

  - `MonthContext.jsx` 파일에서 Provider를 사용하는 과정까지 마쳤으므로, `HomePage` 컴포넌트에서 `Calendar`, `Graph`, `Category` 컴포넌트를 `<MonthProvider>`로 다음과 같이 감싸주면 된다.
    ```jsx
    <MonthProvider>
      <Calendar />
      <Graph />
      <Category />
    </MonthProvider>
    ```
  - `Calendar` 컴포넌트의 자식 컴포넌트였던 `Graph`와 `Category` 컴포넌트를 `HomePage` 컴포넌트의 자식 컴포넌트가 되도록 옮겼다.

## 3. Redux 방식으로 구현

### 컴포넌트 구조

```
        ┌─ HomePage ┌─ Form
        │           ├─ Calendar
Router ─┤           ├─ Graph
        │           └─ Category
        │
        └─ DetailPage ── DetailContent
```

- 여러 컴포넌트에서 사용하는 state를 전역(Global)에서 관리하므로 컴포넌트 구조를 가시성 있게 나타낼 수 있다.

- 일반 리덕스 방식(**Ducks 패턴**)으로 구현 후 RTK(Redux ToolKit) 방식(**Flux 패턴**)으로 구현했다.

- Global state 1: `expense`

  - 초기값은 initialExpense(data 폴더의 dummyData.json 내용)이다.
  - 리듀서 함수
    - `addExpense` : 새로운 지출 항목을 추가한다.
    - `updateExpense` : 기존 지출 항목을 수정한다.
    - `deleteExpense` : 기존 지출 항목을 삭제한다.

- Global state 2: `month`

  - 초기값은 로컬 스토리지에 "month"라는 키로 저장되어 있는 값이다.
    - 만약 로컬 스토리지에 저장되어 있는 값이 없다면 1로 설정한다.
  - 리듀서 함수
    - `changeMonth` : 선택한 월(달)로 바꾼다.

### 수정/추가 구현 사항

- `Graph` 컴포넌트에 지출 내역을 하나의 막대 그래프로 표현하였다.

  - 각 항목의 비용 합계 비율에 맞게 색이 분포되도록 하였다.
  - 항목 중 비용 합계가 높은 상위 4개 항목은 항목의 이름을 명시하였고, 나머지 항목은 "기타" 항목으로 묶었다.

- redux 방식의 편리한 점
  - state를 전역에서 관리하기 때문에 컴포넌트의 위치에 상관 없이 state를 가져와서 사용하기 좋다.
