import { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import ChatForm from './ChatForm'
import { Madoi } from './madoi/madoi'
import './App.css'

function App() {
  const log = useRef<HTMLDivElement>(null!);
  let addLog = (name: string, message: string)=>{
    const p = document.createElement("div");
    createRoot(p).render(
      <div><b>{name}</b>: <span>{message}</span></div>
    );
    log.current.append(p);
  };
  const m = new Madoi(`wss://fungo.kcg.edu/madoi-20220920/rooms/chat-ldsngksjde4a`);
  addLog = m.registerFunction(addLog, {maxLog: 1000});
  return (
    <div className="App">
      <ChatForm onFormSubmit={addLog} />
      <div ref={log} id="chatLogDiv">
      </div>
    </div>
  );
}

export default App
