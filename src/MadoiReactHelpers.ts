import { useEffect, useRef, useState } from "react";
import { Madoi, TypedEventTarget } from "./lib/madoi/madoi";

export abstract class MadoiObject<T extends TypedEventTarget<T>> extends TypedEventTarget<T>{
  fireChange(detail: any){
    this.dispatchEvent(new CustomEvent("change", {detail}));
  }
}

export function useMadoiObject<T extends MadoiObject<T>, U>(madoi: Madoi, factory: ()=>T)
  : T | null{
  const value = useRef<T>(null!);
  const [_state, setState] = useState<any>();

  useEffect(()=>{
    if(value.current !== null) return;
    const obj = factory();
    value.current = obj;
    let getStateMethod = null;
    for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
      const cfg = (obj as any)[p].madoiMethodConfig_;
      if(!cfg) continue;
      if(cfg["getState"]){
        getStateMethod = (obj as any)[p];
      }
    }
    if(getStateMethod == null){
      throw new Error(`${typeof obj} must declare @GetState method.`);
    }
    const onChange = ()=>{
      setState(getStateMethod.apply(value.current));
    };
    madoi.register(value.current);
    setState(getStateMethod.apply(value.current));
    value.current.addEventListener("change", onChange);
  }, []);

  return value.current;
}
