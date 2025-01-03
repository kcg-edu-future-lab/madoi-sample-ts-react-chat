import { useEffect, useRef, useState } from "react";
import { Madoi, TypedEventTarget } from "../lib/madoi/madoi";

export abstract class MadoiObject<T extends TypedEventTarget<T>> extends TypedEventTarget<T>{
  abstract getState(): any;
  fireChange(detail: any){
    this.dispatchEvent(new CustomEvent("change", {detail}));
  }
}

export function useMadoiObject<T extends MadoiObject<T>, U>(madoi: Madoi, initialValueFactory: ()=>T)
  : T | null{
  const value = useRef<T>(null!);
  const [_state, setState] = useState<any>();

  useEffect(()=>{
    if(value.current !== null) return;
    value.current = initialValueFactory();
    const onChange = ()=>{
      setState(value.current.getState());
    };
    madoi.register(value.current);
    setState(value.current.getState());
    value.current.addEventListener("change", onChange);
  }, []);

  return value.current;
}
