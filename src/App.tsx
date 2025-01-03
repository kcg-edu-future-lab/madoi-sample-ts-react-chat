import { createContext, useContext } from 'react'
import { GetState, Madoi, SetState, Share, ShareClass } from '../lib/madoi/madoi'
import { MadoiObject, useMadoiObject } from './MadoiReactHelpers';
import ChatForm from './ChatForm'
import './App.css'

const roomId = "madoi-sample-chat-react-ts-2lakdjf";
const apikey = "ahfuTep6ooDi7Oa4";
const madoiContext = createContext<Madoi>(new Madoi(
  `ws://localhost:8080/madoi/rooms/${roomId}`,
  apikey));

type Log = {name: string, message: string};
@ShareClass({className: "Chat"})
class Chat extends MadoiObject<Chat>{
  private logs: Log[] = [];

  constructor(){
    super();
    console.log("Chat.constructor()");
  }

  @Share()
  addLog(name: string, message: string){
    this.logs = [...this.logs, {name, message}];
    this.fireChange({detail: this.logs});
  }

  @GetState()
  getState(){
    return this.logs;
  }

  @SetState()
  setState(logs: Log[]){
    this.logs = logs;
    this.fireChange({detail: this.logs});
  }
}

export default function App() {
  const madoi = useContext(madoiContext);
  const chat = useMadoiObject(madoi, ()=>new Chat());
  const onFormSubmit = (name: string, message: string)=>{
    chat?.addLog(name, message);
  };
  return (
    <div className="App">
      <ChatForm onFormSubmit={onFormSubmit} />
      {(chat?.getState() || []).map((l, i)=>
        <div key={i}><span>{l.name}</span>: <span>{l.message}</span></div>
      )}
    </div>
  );
}
