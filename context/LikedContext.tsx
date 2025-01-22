
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';
import {useUser} from "../context/UserContext"
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();


interface IEvent {
    eventName?: string;
    eventDescription?: string;
    id?: string;
    email?:string;
    userEmail?: string;
    eventId?:string;
    eventMainImage?:{ aspectRatio?: string; url?: string};
    eventImage1?:{ aspectRatio?: string; url?: string};
    eventImage2?:{ aspectRatio?: string; url?: string};
    eventImage3?:{ aspectRatio?: string; url?: string};
    eventImage4?:{ aspectRatio?: string; url?: string};
    dateTimePriceList?: { 
      eventDate?: string;
      eventDays?:number;
      eventHours?:number;
      eventMinutes?:number;
      eventEndDate?:string;
      ticketPriceArray?: {ticketNumber: number; ticketTitle: string; adultPrice: number; adolescentPrice: number; childPrice: number }[]

    }[];
    ageRestriction?:string[] | [];
    location?: {type?:string;
      coordinates?: number [];

    };
    eventAddress?:string;
    categories?: string[];
   
  }

  type loadingEvents = boolean
    
  

interface IEventContextValue {
    likedEvents?:IEvent[]
    loadingLikedEvents?: loadingEvents
    setLoadingLikedEvents:(data: loadingEvents) => void
    setLikedEventList:(data:IEvent[]) => void
    handleGetLikedEvents: () => void
}


const initialList: IEventContextValue = {
    likedEvents:[],
    loadingLikedEvents: false,
    setLoadingLikedEvents:(data) => {},
    setLikedEventList: (data) => {},
    handleGetLikedEvents: () => {}
  }



const LikedContext = createContext<IEventContextValue>(initialList);

   

export function useLikes () {
    return (useContext(LikedContext))
}

type ChildrenProps = { children?: ReactNode };


export function LikeProvider({children}: ChildrenProps) {

  const {userDetails} = useUser()

  const [likedEvents, setLikedEventList] = useState<IEvent[] | []>([])
  const [loadingLikedEvents, setLoadingLikedEvents] = useState<boolean>(true)

  const handleGetLikedEvents = async () => {

    try {

      const { data, errors } = await client.models.LikedEvent.list({

       // filter: {
        //  userEmail: {
         //   beginsWith: userDetails?.username
        //  }
       // }
      });

    } catch(e) {

    }
  }

  useEffect(()=> {

  

  },[])

  return(
    <LikedContext.Provider value={{likedEvents, setLikedEventList, loadingLikedEvents, setLoadingLikedEvents, handleGetLikedEvents}} >{children}</LikedContext.Provider>
  )

}