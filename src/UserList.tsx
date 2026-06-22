import type { Madoi } from "madoi-client";
import { useOtherPeers, useSelfPeer } from "madoi-client-react";
import { useRef, useState } from "react";

function shortenId(id: string){
  return id.length > 6 ? `${id.slice(0, 6)}..` : id;
}

interface Props{
    madoi: Madoi<{name?: string}>;
}
export function UserList({madoi}: Props){
    const selfPeer = useSelfPeer(madoi);
    const otherPeers = useOtherPeers(madoi);
    const [isNamePopupOpen, setIsNamePopupOpen] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null!)

    const onNameChange = ()=>{
        const name = nameRef.current.value.trim();
        if(name.length > 0){
        madoi.updateSelfPeerProfile("name", name);
        } else {
        madoi.removeSelfPeerProfile("name");
        }
    };

    return <div className="userList">
        <h2>ユーザ一覧</h2>
        <button
          type="button"
          className="selfUser"
          title={selfPeer.id}
          onClick={()=>setIsNamePopupOpen(true)}
        >
          あなた: {selfPeer.profile.name || "匿名"}({shortenId(selfPeer.id)})
        </button>
        {isNamePopupOpen &&
          <div className="namePopupBackdrop" onClick={()=>setIsNamePopupOpen(false)}>
            <div className="namePopup" role="dialog" aria-modal="true"
                aria-labelledby="namePopupTitle" onClick={e=>e.stopPropagation()}>
              <h2 id="namePopupTitle">名前を変更</h2>
              <input
                ref={nameRef}
                autoFocus
                defaultValue={selfPeer.profile.name || "匿名"}
                placeholder="名前"
              />
              <button type="button" onClick={()=>{setIsNamePopupOpen(false); onNameChange();}}>設定して閉じる</button>
            </div>
          </div>
        }
        {otherPeers.length === 0
            ? <div className="emptyUser">まだ参加者はいません</div>
            : otherPeers.map(user=>
                <div key={user.id}>{`${user.profile.name || "匿名"}(${shortenId(user.id)})`}</div>)
        }
      </div>;
}