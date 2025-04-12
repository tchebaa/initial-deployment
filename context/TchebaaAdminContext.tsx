
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();


interface IAdmin {
    id?: string;
    email?:string;
    adminName?:string;
    postEventPermissions?: boolean;
    deleteEventPermissions?:boolean;
    editEventPermissions?:boolean;
    ticketCancelPermissions?:boolean;
    chatPermissions?:boolean;
    addAdminPermissions?: boolean;
    editAdminPermissions?: boolean;
    deleteAdminPermissions?: boolean;
  }

  type loadingAdmins = boolean
    
  

interface IAdminContextValue {
    admins?:IAdmin[]
    setAdmins:(data:IAdmin[]) => void
    loadingAdmins: loadingAdmins
    adminsError: boolean
    setAdminsError: (data: boolean) => void
    setLoadingAdmins: (data: loadingAdmins) => void
    handleGetAdmins: () => void
    
}


const initialList: IAdminContextValue = {
    admins:[],
    loadingAdmins: false,
    adminsError: false,
    setLoadingAdmins:(data) => {},
    setAdmins: (data) => {},
    setAdminsError: (data) => {},
    handleGetAdmins: () => {}
  }



const AdminContext = createContext<IAdminContextValue>(initialList);

   

export function useAdmin () {
    return (useContext(AdminContext))
}

type ChildrenProps = { children?: ReactNode };


export function AdminProvider({children}: ChildrenProps) {


  const [admins, setAdmins] = useState<IAdmin[] | []>([])
  const [loadingAdmins, setLoadingAdmins] = useState<boolean>(true)
  const [adminsError, setAdminsError] = useState<boolean>(false)
  



  const handleGetAdmins = async () => {

    try {

      setLoadingAdmins(true)
      setAdminsError(false)

      const { data, errors } = await client.models.Admin.list()

      console.log(data)

      setAdmins(data)
      

      setLoadingAdmins(false)

    } catch(e) {

      setAdminsError(e?.message)
      setLoadingAdmins(false)

    }
      
  }


  useEffect(()=> {

    handleGetAdmins()

  },[])



  return(
    <AdminContext.Provider value={{admins, setAdmins, loadingAdmins, setLoadingAdmins, adminsError, setAdminsError, handleGetAdmins}} >{children}</AdminContext.Provider>
  )

}