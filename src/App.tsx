import { createContext, useContext } from 'react'
import { ChangeState, Distributed, GetState, Madoi, SetState } from 'madoi-client'
import { useMadoiModel } from 'madoi-client-react';
import { v4 } from 'uuid';
import ChatForm from './ChatForm'
import { madoiUrl, madoiKey} from './keys'
import './App.css'
import { UserList } from './UserList';

const selfId = v4();
const roomId = "madoi-sample-ts-react-chat-2lakdjf";
const madoiContext = createContext(new Madoi<{name?: string}>(
  `${madoiUrl}/${roomId}`, madoiKey, {id: selfId, profile: {}}));

type Log = {name: string, message: string};
class Chat{
  private logs: Log[] = [];

  @Distributed()
  @ChangeState()
  addLog(name: string, message: string){
    this.logs = [...this.logs, {name, message}];
  }

  @GetState()
  getLogs(){
    return this.logs;
  }

  @SetState()
  setLogs(logs: Log[]){
    this.logs = logs;
  }
}

export default function App() {
  const madoi = useContext(madoiContext);
  const chat = useMadoiModel(madoi, ()=>new Chat());
  const logs = chat.getLogs();
  const onFormSubmit = (message: string)=>{
    chat.addLog(madoi.getSelfPeer().profile.name || "匿名", message);
  };
  return (
    <div className="app">
      <UserList madoi={madoi} />
      <div className="chatPanel">
        <h2>チャット</h2>
        <ChatForm onFormSubmit={onFormSubmit} />
        <div className="chatLog">
          {logs.map((l, i)=>
            <div key={i}><span>{l.name}</span>: <span>{l.message}</span></div>
          )}
        </div>
      </div>
    </div>
  );
}
