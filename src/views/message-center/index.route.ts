export default [
  {
    name: 'Chat',
    path: '/chat',
    component: () => import(/* webpackChunkName: "chat" */ './chat')
  },
  {
    name: 'ChatList',
    path: '/chat-list',
    meta: {
      name: '消息列表'
    },
    component: () => import(/* webpackChunkName: "chat-list" */ './chat-list')
  }
]
