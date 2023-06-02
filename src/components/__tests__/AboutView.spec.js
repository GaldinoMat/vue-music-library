import AboutView from '@/views/AboutView.vue'
import { mount } from '@vue/test-utils'

describe('About.vue', () => {
  it('should render the inner text', () => {
    /**
    In vitest, it is necessary to mount the components we want to test. Using mount or shallowMount 
    renders the component, the difference is that using mount we render the whole component including children.
    With shallow mount we limit the children we want to render.
    */
    const wrapper = mount(AboutView, {
      shallow: true
    })

    expect(wrapper.text()).toContain('about')
  })
})
