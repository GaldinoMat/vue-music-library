import HomeView from '@/Views/HomeView.vue'
import SongPlaylistItem from '@/components/SongPlaylistItem/SongPlaylistItem.vue'
import { shallowMount } from '@vue/test-utils'

const wrapperFactory = (songs) => {
  const wrapper = shallowMount(HomeView, {
    data() {
      return {
        songs
      }
    },
    global: {
      mocks: {
        $t: (message) => message
      }
    }
  })

  return wrapper
}

describe('Home.vue', () => {
  it('should render list of songs', () => {
    const songs = [{}, {}, {}]
    const wrapper = wrapperFactory(songs)

    const items = wrapper.findAllComponents(SongPlaylistItem)

    expect(items).toHaveLength(songs.length)

    items.forEach((itemWrapper, i) => {
      expect(itemWrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
