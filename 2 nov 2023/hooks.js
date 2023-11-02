import { useState } from 'react';

function App() {
  return (
    <div>
      <h1>Count Your clicks</h1>
      <MyButton />
      
    </div>
  );
}

function MyButton() {
  const [x, y] = useState(0);
  function a() {
    y(x + 1);
  }
  return (
    <button onClick={a}>
      Clicked {x} times
    </button>
  );
}

export default App;



