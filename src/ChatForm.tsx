import { useRef, type SubmitEventHandler } from "react";

interface ChatInputFormProps{
    onFormSubmit: (message: string)=>void;
}
export default function ChatInputForm({onFormSubmit}: ChatInputFormProps){
    const message = useRef<HTMLInputElement>(null!);
    const onSubmit: SubmitEventHandler = e=>{
        e.preventDefault();
        const m = message.current?.value.trim();
        if(m.length > 0){
            onFormSubmit(m);
            message.current!.value = "";
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <input ref={message} size={24} placeholder="メッセージ"></input>
            <button>送信</button>
        </form>
    );
}
