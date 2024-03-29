import React, { useState, useCallback } from 'react';
import { Button } from '@arco-design/web-react';

const MockMemo: React.FC<any> = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  console.log('kkkk')
  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <TestButton title="普通点击" onClick={() => setCount(count + 1)} />
        <TestButton title="useCallback点击" onClick={add} />
      </div>
      <div style={{ marginTop: 20 }}>count: {count}</div>
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        {' '}
        切换
      </Button>
    </div>
  );
};

const TestButton = React.memo((props: any) => {
  console.log(props.title);
  return (
    <Button
      color="primary"
      onClick={props.onClick}
      style={
        props.title === 'useCallback点击'
          ? {
            marginLeft: 20,
          }
          : undefined
      }
    >
      {props.title}
    </Button>
  );
});

export default MockMemo;
