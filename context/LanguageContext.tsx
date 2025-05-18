
import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';
import {useTranslation} from 'react-i18next'
import i18next from 'i18next';
import { getLocales} from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage';


    
type currentLanguageCode = string

interface ILanguageContextValue {
    currentLanguageCode: string
    loadingLanguage: boolean
    setLoadingLanguage:(data: boolean) => void
    setCurrentLanguageCode?: (data: string) => void
    handleChangeLanguage:(data: string) => void
    t: typeof i18next.t
   
}


const initialList: ILanguageContextValue = {
    currentLanguageCode: "en",
    loadingLanguage: false,
    setLoadingLanguage:(data) => {},
    setCurrentLanguageCode: (data) => {}, 
    handleChangeLanguage:(data) => {},
    t: i18next.t
  }



const LanguageContext = createContext<ILanguageContextValue>(initialList);

   

export function useLanguage () {
    return (useContext(LanguageContext))
}

type ChildrenProps = { children?: ReactNode };


export function LanguageProvider({children}: ChildrenProps) {

    const [currentLanguageCode, setCurrentLanguageCode] = useState<currentLanguageCode>('en')
    const [loadingLanguage, setLoadingLanguage] = useState<boolean>(false)

    type languageCode = string

    const {languageCode} = getLocales()[0]
    const {t} = useTranslation()


    const getLanguageCode = async () => {

      try {
        
        const value = await AsyncStorage.getItem('languagecode');

        if (value !== null) {
          
          setLoadingLanguage(true)
          setCurrentLanguageCode(value)
          i18next.changeLanguage(value)
          setLoadingLanguage(false)

        } else {

          setLoadingLanguage(true)

          const safeLanguageCode = languageCode ?? "en";
          setCurrentLanguageCode(safeLanguageCode);
          i18next.changeLanguage(safeLanguageCode);
          
          setLoadingLanguage(false)
        }
      } catch (e) {
        
      }
    };

    const handleChangeLanguage = async (item: string) => {

        setLoadingLanguage(true)

        i18next.changeLanguage(item)

        setCurrentLanguageCode(item)

        try {

          await AsyncStorage.setItem('languagecode', item);

        } catch (e) {
          // saving error
        }

        setLoadingLanguage(false)
        
    }
  
    useEffect(()=> {

      getLanguageCode()

    },[])


  return(
    <LanguageContext.Provider value={{loadingLanguage, setLoadingLanguage, currentLanguageCode, setCurrentLanguageCode, handleChangeLanguage, t}} >{children}</LanguageContext.Provider>
  )

}