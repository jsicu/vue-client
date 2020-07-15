import wsCache from '@/cache'

const app = {
  state: {
    sidebar: {
      opened: !+wsCache.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    size: wsCache.get('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        wsCache.set('sidebarStatus', 0)
      } else {
        wsCache.set('sidebarStatus', 1)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      wsCache.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      wsCache.set('size', size)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
