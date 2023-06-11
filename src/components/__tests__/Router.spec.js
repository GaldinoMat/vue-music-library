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
    }
  })

  return wrapper
}

describe('SongView.vue', () => {
  it.skip('should render router link', () => {
    const song = songFactory()
    const wrapper = wrapperFactory(song)

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId }
    })
  })
})
