
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';



interface IEvent {
    name?: string;
    photo?: string;
  }

interface IEventContextValue {
    eventList?:IEvent[],
    setEventList:(data:IEvent[]) => void
}


const initialList: IEventContextValue = {
    eventList:[],
    setEventList: (data) => {}
  }



const LikedContext = createContext<IEventContextValue>(initialList);

   

export function useLikes () {
    return (useContext(LikedContext))
}

type ChildrenProps = { children?: ReactNode };


export function LikeProvider({children}: ChildrenProps) {

  const [eventList, setEventList] = useState<IEvent[]>([])

  return(
    <LikedContext.Provider value={{eventList, setEventList}} >{children}</LikedContext.Provider>
  )

}