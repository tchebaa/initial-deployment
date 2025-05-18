
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
    personType?: boolean;
    companyEmail?: string;
    companyName?:string;
    personName?: string;
    sponsored?: boolean;
    eventMainImage?:{ aspectRatio?: string; url?: string};
    eventImage2?:{ aspectRatio?: string; url?: string};
    eventImage3?:{ aspectRatio?: string; url?: string};
    eventImage4?:{ aspectRatio?: string; url?: string};
    dateTimePriceList?: { 
      eventDate?: string;
      eventDays?:number;
      eventHours?:number;
      eventMinutes?:number;
      eventEndDate?:string;
      ticketPriceArray?: {ticketNumber: number; ticketTitle: string; adultPrice: number; adolescentPrice: number; childPrice: number }[] | []

    }[] | [];
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
    likedEventsError?: string
    setLikedEventsError?: (data: string) => void
    setLoadingLikedEvents:(data: loadingEvents) => void
    setLikedEventList:(data:IEvent[]) => void
    handleGetLikedEvents: () => void
}


const initialList: IEventContextValue = {
    likedEvents:[],
    loadingLikedEvents: false,
    likedEventsError: '',
    setLikedEventsError: (data) => {},
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
  const [likedEventsError, setLikedEventsError] = useState<string>('')



  const handleGetLikedEvents = async () => {

    try {

      setLoadingLikedEvents(true)
      setLikedEventsError('')

      const { data, errors } = await client.models.LikedEvent.list({

        filter: {
          userEmail: {
            beginsWith: userDetails?.username
          }
        }
      });

       type Nullable<T> = T | null;

        function sanitizeTicketArray(arr: Nullable<{
        adultPrice: Nullable<number>;
        adolescentPrice: Nullable<number>;
        childPrice: Nullable<number>;
        ticketTitle: Nullable<string>;
        ticketNumber: Nullable<number>;
        }>[] | null | undefined) {
        return (arr ?? [])
            .filter((ticket): ticket is {
            adultPrice: number;
            adolescentPrice: number;
            childPrice: number;
            ticketTitle: string;
            ticketNumber: number;
            } =>
            ticket !== null &&
            ticket.ticketNumber !== null &&
            ticket.ticketTitle !== null &&
            ticket.adultPrice !== null &&
            ticket.adolescentPrice !== null &&
            ticket.childPrice !== null
            );
        }

      const sanitizedEvents: IEvent[] = data.map(event => ({
        ...event,
        userEmail: event.userEmail ?? undefined,
        eventId: event.eventId ?? "", // required
        eventName: event.eventName ?? "",
        eventDescription: event.eventDescription ?? "",
        email: event.email ?? "",
        updatedAt: event.updatedAt,
        id: event.id ?? "",
        personType: event.personType ?? false,
        companyEmail: event.companyEmail ?? "",
        companyName: event.companyName ?? "",
        personName: event.personName ?? "",
        sponsored: event.sponsored ?? false,
        eventMainImage: {
            ...event.eventMainImage,
            aspectRatio: event.eventMainImage?.aspectRatio ?? "",
            url: event.eventMainImage?.url ?? "",
        },
        eventImage2: {
            ...event.eventImage2,
            aspectRatio: event.eventImage2?.aspectRatio ?? "",
            url: event.eventImage2?.url ?? "",
        },
        eventImage3:  {
            ...event.eventImage3,
            aspectRatio: event.eventImage3?.aspectRatio ?? "",
            url: event.eventImage3?.url ?? "",
        },
        eventImage4:  {
            ...event.eventImage2,
            aspectRatio: event.eventImage4?.aspectRatio ?? "",
            url: event.eventImage4?.url ?? "",
        },
        dateTimePriceList: (event.dateTimePriceList ?? [])
            .filter((dt): dt is NonNullable<typeof dt> => dt !== null)
            .map(dt => ({
            eventDate: dt.eventDate ?? undefined,
            eventDays: dt.eventDays ?? undefined,
            eventHours: dt.eventHours ?? undefined,
            eventMinutes: dt.eventMinutes ?? undefined,
            eventEndDate: dt.eventEndDate ?? undefined,
            ticketPriceArray: sanitizeTicketArray(dt?.ticketPriceArray),
            })),
        ageRestriction: (event.ageRestriction ?? []).filter(
            (age): age is string => age !== null
        ),
        location: event.location ?? {},
        eventAddress:event.eventAddress ?? "",
        categories: (event.categories ?? []).filter((c): c is string => c !== null),
            // map other fields similarly...
        }));
    

      setLikedEventList(sanitizedEvents)
      

      setLoadingLikedEvents(false)


    } catch(e) {
      
      const error = e as Error;

        if(error.message) {

        setLikedEventsError(error.message)
        setLoadingLikedEvents(false)

        }

    }
  }


  useEffect(()=> {

    if(userDetails) {

      handleGetLikedEvents()

    }
    

  },[userDetails])



  return(
    <LikedContext.Provider value={{likedEvents, setLikedEventList, loadingLikedEvents, setLoadingLikedEvents, handleGetLikedEvents}} >{children}</LikedContext.Provider>
  )

}