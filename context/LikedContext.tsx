
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';

const ageRestriction: string [] = []

interface IEvent {
    eventName?: string;
    eventDescription?: string;
    _id?: string;
    email?:string;
    eventMainImage?:{ aspectRatio?: string; url?: string};
    eventImage1?:{ aspectRatio?: string; url?: string};
    eventImage2?:{ aspectRatio?: string; url?: string};
    eventImage3?:{ aspectRatio?: string; url?: string};
    eventImage4?:{ aspectRatio?: string; url?: string};
    dateTimePrice?: { adultPrice?: number;
      adolescentPrice?: number;
      childPrice?:number;
      eventDate?: string;
      eventDays?:number;
      eventHours?:number;
      eventMinutes?:number;
      ticketTitle?: string;
      _id?:string;
      eventEndDate?:string
    }[];
    ageRestriction?:string[];
    location?: {type?:string;
      coordinates?: {$numberDecimal?:string}[];

    };
    address?:string;
    categories?: string[]
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