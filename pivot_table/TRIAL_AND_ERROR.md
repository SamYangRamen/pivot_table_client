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