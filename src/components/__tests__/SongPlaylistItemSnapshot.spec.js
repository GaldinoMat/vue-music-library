import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongPlaylistItem from '@/components/SongPlaylistItem/SongPlaylistItem.vue'

const songFactory = () => {
  const song = {
    docId: 'abc',
    modifiedName: 'file_example_MP3_1MG.mp3',
    displayName: 'TestAuthor',
    commentCount: 5
  }

  return song
}

const wrapperFactory = (newSong) => {
  const wrapper = shallowMount(SongPlaylistItem, {
    props: {
      song: newSong
    },
    global: {
      components: {
        RouterLink: RouterLinkStub
      }
    }
  })

  return wrapper
}

describe('SongPlaylistItem snapshot', () => {
  it('should render correctly', () => {
    const song = songFactory()
    const wrapper = wrapperFactory(song)

    expect(wrapper.element).toMatchSnapshot()
  })
})
