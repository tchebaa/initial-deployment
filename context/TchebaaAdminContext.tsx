
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
    adminsErrorText: string
    setAdminsErrorText: (data: string) => void
    setAdminsError: (data: boolean) => void
    setLoadingAdmins: (data: loadingAdmins) => void
    handleGetAdmins: () => void
    
}


const initialList: IAdminContextValue = {
    admins:[],
    loadingAdmins: false,
    adminsError: false,
    adminsErrorText: '',
    setAdminsErrorText:(data) => {},
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
  const [adminsErrorText, setAdminsErrorText] = useState<string>("")
  



  const handleGetAdmins = async () => {

    try {

      setLoadingAdmins(true)
      setAdminsError(false)
      

      const { data, errors } = await client.models.Admin.list()

   
      const sanitizedAdmins: IAdmin[] = data.map((admin) => ({
        ...admin,
        email: admin.email ?? '', // or `undefined` if preferred
        adminName: admin.adminName ?? '',
        postEventPermissions: admin.postEventPermissions ?? false,
        deleteEventPermissions: admin.deleteEventPermissions ?? false,
        editEventPermissions: admin.editAdminPermissions ?? false,
        ticketCancelPermissions: admin.ticketCancelPermissions ?? false,
        chatPermissions: admin.chatPermissions ?? false,
        addAdminPermissions: admin.addAdminPermissions ?? false,
        editAdminPermissions: admin.editAdminPermissions ?? false,
        deleteAdminPermissions: admin.deleteAdminPermissions ?? false,
        // continue for all Nullable fields...
        }));

   

      setAdmins(sanitizedAdmins)
      

      setLoadingAdmins(false)
      


    } catch(e) {

     const error = e as Error;

        if(error.message) {

            setAdminsErrorText(error.message)
            setLoadingAdmins(false)

        }
    }
      
  }


  useEffect(()=> {

    handleGetAdmins()

  },[])



  return(
    <AdminContext.Provider value={{admins, setAdmins, loadingAdmins, setLoadingAdmins, adminsError, setAdminsError, handleGetAdmins, adminsErrorText, setAdminsErrorText}} >{children}</AdminContext.Provider>
  )

}