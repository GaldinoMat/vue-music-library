import HomeView from '@/Views/HomeView.vue'
import SongPlaylistItem from '@/components/SongPlaylistItem/SongPlaylistItem.vue'
import { mount } from '@vue/test-utils'

const wrapperFactory = () => {
  const wrapper = mount(HomeView, {
    global: {
      mocks: {
        $t: (message) => message
      }
    }
  })

  return wrapper
}


describe('Home.vue', () => {
  it.skip('should render list of songs', async () => {
    const wrapper = wrapperFactory()
    const testSongs = [{ docId: 'test1' }, { docId: 'test2' }, { docId: 'test3' }]

    wrapper.vm.songs = testSongs

    expect(items).toHaveLength(testSongs.length)

    items.forEach((itemWrapper, i) => {
      expect(itemWrapper.props().song).toStrictEqual(testSongs[i])
    })
  })
})
