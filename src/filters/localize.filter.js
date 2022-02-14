import store from '../store'

const locales = {
  'en-En': {
    ProfileTitle: 'Profile',
  },
  'ua-Ua': {
    ProfileTitle: 'Профіль',

  },
  
}


export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'en-En'
  return locales[locale][key] || `[Localize error]: ${key} not found`
} 
