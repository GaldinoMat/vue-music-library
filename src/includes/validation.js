import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed
} from '@vee-validate/rules'
import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate'

/** 
Vues uses the install method to run dependencies when building the application, 
and we can put components, methods or objects inside of it 
*/
export default {
  /**
    Here we can use two arguments. The app argument is a reference to the Vue application, 
    having access the same methods and properties we encounter on the Vue instance.
    The options argument is aditional data being passed from the Vue instance to the Vue plugin
  */
  install(app) {
    // Exporting components
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    // Exporting methods
    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('email', email)
    defineRule('minValue', minValue)
    defineRule('maxValue', maxValue)
    defineRule('confirmed', confirmed)
  }
}
