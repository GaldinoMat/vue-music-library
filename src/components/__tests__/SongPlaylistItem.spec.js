import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongPlaylistItem from '@/components/SongPlaylistItem/SongPlaylistItem.vue'

const songFactory = () => {
  const song = {
    docId: 'abc',
    modifiedName: 'file_example_MP3_1MG.mp3',
    displayName: 'TestAuthor'
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

describe('SongPlaylistItem.vue', () => {
  it('should render song.displayName', () => {
    const song = songFactory()
    const wrapper = wrapperFactory(song)

    const compositionAuthor = wrapper.find('#SongAuthor')

    expect(compositionAuthor.text()).toBe(song.displayName)
  })

  it('should render song.docId in id attribute', () => {
    const song = songFactory()
    const wrapper = wrapperFactory(song)

    // const compositionAuthor = wrapper.find('#SongAuthor')

    expect(wrapper.attributes().id).toBe(`songId-${song.docId}`)
  })

  it.skip('should render song.modifiedName', () => {
    const song = songFactory()
    const wrapper = wrapperFactory(song)

    const compositionName = wrapper.attributes('#SongName')

    expect(compositionName.text()).toBe(song.modifiedName)
  })
})
