import {en, fr} from './assets/languages'
import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'

const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    }
}

i18next.use(initReactI18next).init({
    debug: true,
    lng: 'en',
    compatibilityJSON: 'v4',
    fallbackLng: "en",
    resources: resources
})

export default i18next;