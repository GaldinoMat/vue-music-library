import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import pt_br from '@/locales/pt_br.json'

export default createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages: {
    pt: pt_br,
    en
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    pt: {
      currency: {
        style: 'currency',
        currency: 'BRL'
      }
    }
  }
})
