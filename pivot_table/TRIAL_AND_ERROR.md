# 시행착오

본 토이 프로젝트를 진행하면서 막히거나 해결했던 부분들을 요약 정리한 내용을 작성함



## Redirect 기능에 관하여

아예 페이지가 전환되는 것처럼 보이기 위해서는 아래와 같이 `Switch` 구문을 써서 작성해주어야 함

그렇지 않으면 이전에 렌더링되었던 내용이 사라지지 않고 바로 아래에 이어서 다음 컴포넌트가 리렌더링됨

```javascript
<Switch>
    <Route path='/LoadSheet' component={LoadSheet} />
    <Route path='/NewSheet' component={NewSheet} />
    <Route path='/' exact component={Home} />
</Switch>
```

어떤 컴포넌트에 다른 컴포넌트를 이어서 렌더링하고 싶으면, 아래와 같이 Route path를 작성해주어야 함

아래 예시는 `NewSheet` 컴포넌트에서 `Link` 태그로 감싸진 어떤 버튼을 눌러 `EditSheet` 컴포넌트로 라우팅할 때의 예시임

```typescript
<Route path="/NewSheet/EditSheet" component={EditSheet} />
```



## 에러 처리



### Can't resolve 'react-router-dom'

`npm install react-router-dom`



### has no exported member FC

`npm i @types/react@latest --save-dev`



### cannot find module ... its corresponding type declarations

src/ 경로에만 개발 중이던 파일들을 각 용도에 맞게 디렉터리들을 만들어서 이동시켰더니, import 문장들에 빨간줄이 뜨면서 위와 같은 오류 메시지가 발생했다.

https://pythonq.com/so/import/1867577

tsconfig.json의 compilerOptions에서 baseUrl을 "."으로 설정하면 해결된다.



### JSX.Element[] 배열 안에 HTML 태그를 push한 것을 return할 때 렌더링이 안 되는 문제

```react
const panelData: JSX.Element[] = [];

...

panelData.push(
	<...>...<...> // HTML 태그
);

...

return (
	...
	<div>{panelData}</div>
	...
);
```

단순히 위와 같이 적으면 렌더링이 되지 않는다.

```react
const [panel, setPanel] = useState<JSX.Element[]>();
const panelData: JSX.Element[] = [];

...

panelData.push(
	<...>...<...> // HTML 태그
);

...

setPanel(panelData);

return (
	...
	<div>{panelData}</div>
	...
);
```

그런데 위와 같이 JSX.Element[] 배열을 useState()에 넣어놓고 return하면 정상적으로 렌더링이 된다.

왜 그런지 아직 원인을 파악하지 못했음



### observable 데코레이터 하나만으로는 제기능을 하지 못함

생성자에서 `makeObservable(this);` 라는 메서드를 사용해야 비로소 실시간으로 관찰하게 됨



### Component Unmount 시 useState의 state에 접근할 수 없는 문제

```react
const [state, setState] = usestate(0);

...

const changeState = (value) => {
    setState(value);
}

...

useEffect(() => {
    ...
    return () => {
        alert(state);
    }
}, [])

...
```

state의 변경이 일어났음에도 불구하고, useEffect의 return하는 부분에서 alert을 해보면 undefined로 출력되는 것을 확인할 수 있었음

https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%EB%B2%A4%ED%8A%B8

https://velog.io/@st2702/React-Lifecycle-%EC%83%9D%EB%AA%85%EC%A3%BC%EA%B8%B0

그 이유는 useEffect의 return 부분(class형 컴포넌트의 `componentWillunmount()`와 같음)은 컴포넌트가 소멸된 시점에, 즉 DOM에서 이미 삭제된 이후에 실행되는 내용이기 때문이다.

![image](https://user-images.githubusercontent.com/53200166/142371680-f781a414-f5c4-462f-ba96-b120536da962.png)

![image](https://user-images.githubusercontent.com/53200166/142372002-807c829e-69a8-4eba-ab9f-624ef2e9d7ee.png)

그림을 참조해 보았을 때, Unmount 도중이 아닌, Unmount가 완전히 종료된 이후의 시점에서 `componentWillUnmount()`가 실행된다고 설명되어 있다.

https://velog.io/@juno7803/React-useRef-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0

자료를 더 찾다보니, 나와 비슷한 경험을 한 블로그의 글을 찾을 수 있었음

`useRef`는 **컴포넌트의 전 생애주기를 통해 유지**가 되며, 리렌더링을 발생시키지 않는다는 특성을 가진다고 한다. 즉, 렌더링과는 상관없이 값을 계속 유지시킨다.

따라서 Unmount가 된 이후의 시점까지도 살아있기 때문에, 아래와 같이 코드를 작성하면 변경된 이후의 state 값을 출력할 수 있게 된다.

```react
const [state, setState] = usestate(0);
const result = useRef(state);

...

const changeState = (value) => {
    setState(value);
}

useEffect(() => {
    result.current = state;
}, [state])

useEffect(() => {
    ...
    return () => {
        alert(result.current);
    }
}, [])

...
```



### Map의 Key는 유일한 값이어야 하는 것 같다.

```react
const map<{a:number, b: number, ...}, {...}> = new Map();
```

위와 같이 Key 자리에 a, b, ... 등 여러 개의 값이 들어가면 정상적으로 작동되지 않는 것 같다. 즉

```react
const map<number, {...}> = new Map();
const map<string, {...}> = new Map();
```

위와 같이 단일 값으로 하면 오류가 발생하지 않는다. 예를 들어

```react
const map<{r:number, c:number}, {a:number, b:number}> = new Map();
```

위와 같은 map은 set 및 get이 제대로 작동하지 않았으나

```react
const map<number, {a:number, b:number}> = new Map();
```

위와 같은 map은 정상적으로 작동하였다.



### 자식 컴포넌트에서 부모 컴포넌트의 값을 변경하는 방법

https://developer-talk.tistory.com/117

부모 컴포넌트에서 useState에 접근하는 메서드를 만들고, 해당 메서드를 자식 컴포넌트에게 props로 넘겨준 뒤 자식 컴포넌트에서 해당 메서드를 호출하면 된다.



### DB 데이터 로딩이 비동기 처리 문제

DB에서 꺼내온 데이터가 시트에 그려지지 않아서 DB 데이터 로딩이 비동기 처리가 되고 있는 줄로만 알았다.

이리저리 삽질을 해본 결과, 아래와 같은 코드를 통해, 데이터가 가져와지긴 하지만 valueStore에 정상적으로 저장이 안되고 있다는 것을 확인하였음

```react
        repo.getCellInfoList(valueStore.getSheetId()).then(response => {
            valueStore.initCells(response);
            setTimeout(() => {
                console.log(response);

                setTimeout(() => {
                    console.log(valueStore.getCells());

                    setTimeout(() => {
                        setIsDataLoaded(true);
                    }, 2000);
                }, 2000);
            }, 2000);
```

따라서 해당 부분을 찾아 수정하였더니 정상적으로 작동함.

이 삽질을 통해 알게 된 사실:

- 아래의 구조에서 컴포넌트의 호출은 순차적이지만, 데이터의 흐름은 비동기적이다. 왜냐하면 alert이 작동하기 때문이다.

  ```
  컴포넌트1 {
      데이터A 불러오기
      return 컴포넌트2
  }
  
  컴포넌트2 {
      if 데이터A가 안불러와졌으면 {
      	alert("데이터 안불러와짐")
      }
      
  	return 컴포넌트3
  }
  
  ...
  ```

- 따라서 데이터가 모두 불러와진 후에 다음 컴포넌트를 호출하고 싶다면 아래와 같이 설정하면 된다.

  ```react
  return (
  	{isDataLoaded && <...tag...>}
  )
  ```

  