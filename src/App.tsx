import { createContext, useContext } from 'react'
import { ChangeState, Distributed, GetState, Madoi, SetState } from 'madoi-client'
import { useMadoiModel } from 'madoi-client-react';
import ChatForm from './ChatForm'
import { madoiUrl, madoiKey} from './keys'
import './App.css'

const roomId = "madoi-sample-ts-react-chat-2lakdjf";
const madoiContext = createContext<Madoi>(new Madoi(
  `${madoiUrl}/${roomId}`, madoiKey));

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
  const onFormSubmit = (name: string, message: string)=>{
    chat.addLog(name, message);
  };
  return (
    <div>
      <ChatForm onFormSubmit={onFormSubmit} />
      <div className="chatLog">
        {chat.getLogs().map((l, i)=>
          <div key={i}><span>{l.name}</span>: <span>{l.message}</span></div>
        )}
      </div>
    </div>
  );
}
