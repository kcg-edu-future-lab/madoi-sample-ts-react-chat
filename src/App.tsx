import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import ChatForm from './ChatForm'
import { Madoi } from '../lib/madoi/madoi'
import './App.css'

export default function App() {
  const log = useRef<HTMLDivElement>(null!);
  const addLog = useRef<(name: string, message: string)=>void>(null!);
  const onFormSubmit = (name: string, message: string)=>{
    addLog.current?.(name, message);
  };
  useEffect(()=>{
    console.log("useEffect");
    const roomId = "madoi-sample-chat-react-ts-2lakdjf";
    const m = new Madoi(`ws://localhost:8080/madoi/rooms/${roomId}`, "ahfuTep6ooDi7Oa4");
    addLog.current = m.registerFunction((name, message)=>{
      console.log("addLog")
      const p = document.createElement("div");
      createRoot(p).render(
        <div><b>{name}</b>: <span>{message}</span></div>
      );
      log.current?.append(p);
    }, {share: {maxLog: 1000}});
    return ()=>{
      m.close();
    }
  }, []);
  return (
    <div className="App">
      <ChatForm onFormSubmit={onFormSubmit} />
      <div ref={log}>
      </div>
    </div>
  );
}
