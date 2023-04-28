import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as exclude
} from '@vee-validate/rules'
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'

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
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('email', email)
    defineRule('minValue', minValue)
    defineRule('maxValue', maxValue)
    defineRule('passwordMismatch', confirmed)
    defineRule('exclude', exclude)
    defineRule('countryExclude', exclude)

    // Here, we can configure custom error messages to display in Vee-Validate forms
    configure({
      generateMessage: (context) => {
        const messages = {
          required: `The field ${context.field} is required.`,
          min: `The field ${context.field} is too short.`,
          max: `The field ${context.field} is too long.`,
          alphaSpaces: `The field ${context.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${context.field} must be a valid email.`,
          minValue: `The field ${context.field} is too low.`,
          maxValue: `The field ${context.field} is too high.`,
          exclude: `You are not allowed to use this value for ${context.field}.`,
          countryExclude: 'Due to restrictions, we do not accept users from this location',
          passwordMismatch: 'The passwords do not match',
          tos: 'You must accept the terms of service'
        }

        return messages[context.rule.name]
          ? messages[context.rule.name]
          : `The field ${context.field} is invalid`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
