import { useRef } from "react";

type f = (name: string, message: string)=>void;

export default function ChatForm({onFormSubmit}: {onFormSubmit: f}){
    const name = useRef<HTMLInputElement>(null!);
    const message = useRef<HTMLInputElement>(null!);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const n = name.current!.value.trim();
        const m = message.current!.value.trim();
        if(m.length > 0){
            onFormSubmit(n, m);
            message.current!.value = "";
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <input ref={name} size={6} defaultValue="匿名"></input>
            <input ref={message} size={24} placeholder="メッセージ"></input>
            <button>送信</button>
        </form>
    );
}
