/*eslint comma-dangle: ["error", "always-multiline"]*/
// ** React Imports
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
// import { sendMsg } from './store/actions'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
} from 'reactstrap'
import { handleSendMessage } from '../../redux/actions/chat/message/post'
import { handleUpdateLocalChat } from '../../redux/actions/chat/update/chat'
import { handleFetchConversations } from '../../redux/actions/chat/fetch'
import { CLEAR_CHAT_DATA } from '../../redux/actions/action.types/actionTypes'

const ChatLog = () => {
  // ** State
  const [msg, setMsg] = useState('')

  // ** Refs & Dispatch
  const chatArea = useRef(null)
  const dispatch = useDispatch()

  // ** Redux Selector
  const { messages, showChat, currentChatUserId, conversations } = useSelector((state) => state.chat)
  const { user, socketClient } = useSelector((state) => state.auth)

  // const { messages } = chat

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = chatContainer.scrollHeight
  }

  // const scrollToBottom = () => {
  //   chatArea.current?.scroll({
  // top: chatArea.current.scrollHeight,
  // behavior: 'smooth',
  //   })
  // }

  useEffect(() => {
    if (messages && chatArea && chatArea.current) {
      scrollToBottom()
    }
  }, [messages])

  // ** If user chat is not empty scrollToBottom
  // useEffect(() => {
  //   const selectedUserLen = Object.keys(selectedUser).length

  //   if (selectedUserLen) {
  //     scrollToBottom()
  //   }
  // }, [selectedUser])

  // ** Formats chat data based on sender
  // const formattedChatData = () => {
  //   let chatLog = []
  //   if (selectedUser.chat) {
  //     chatLog = selectedUser.chat.chat
  //   }

  //   const formattedChatLog = []
  //   let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : undefined
  //   let msgGroup = {
  //     senderId: chatMessageSenderId,
  //     messages: [],
  //   }
  //   chatLog.forEach((msg, index) => {
  //     if (chatMessageSenderId === msg.senderId) {
  //       msgGroup.messages.push({
  //         msg: msg.message,
  //         time: msg.time,
  //       })
  //     } else {
  //       chatMessageSenderId = msg.senderId
  //       formattedChatLog.push(msgGroup)
  //       msgGroup = {
  //         senderId: msg.senderId,
  //         messages: [
  //           {
  //             msg: msg.message,
  //             time: msg.time,
  //           },
  //         ],
  //       }
  //     }
  //     if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
  //   })
  //   return formattedChatLog
  // }

  // ** Renders user chat
  // const renderChats = () => {
  //   return formattedChatData().map((item, index) => {
  //     return (
  //       <div
  //         key={index}
  //         className={classnames('chat', {
  //           'chat-left': item.senderId !== 11,
  //         })}
  //       >
  //         <div className='chat-avatar'>
  //           <Avatar
  //             className='box-shadow-1 cursor-pointer'
  //             img={item.senderId === 11 ? userProfile.avatar : selectedUser.contact.avatar}
  //           />
  //         </div>

  //         <div className='chat-body'>
  //           {item.messages.map((chat) => (
  //             <div key={chat.msg} className='chat-content'>
  //               <p>{chat.msg}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     )
  //   })
  // }

  // ** Opens right sidebar & handles its data
  // const handleAvatarClick = (obj) => {
  //   handleUserSidebarRight()
  //   handleUser(obj)
  // }

  // ** On mobile screen open left sidebar on Start Conversation Click
  // const handleStartConversation = () => {
  //   if (!Object.keys(selectedUser).length && !userSidebarLeft && window.innerWidth <= 1200) {
  //     handleSidebar()
  //   }
  // }

  // ** Sends New Msg
  const handleSendMsg = (e) => {
    e.preventDefault()
    if (msg.length) {
      // dispatch(sendMsg({ ...selectedUser, message: msg }))
      const data = {
        to: currentChatUserId,
        message: msg,
        oldMessages: messages,
        oldConversations: conversations,
      }

      dispatch(handleSendMessage(data))
      setMsg('')
    }
  }

  // ** Render a new message once you send it to someone
  useEffect(() => {
    if (socketClient) {
      socketClient.on(`${user.id}`, (messages) => {
        dispatch(handleUpdateLocalChat(messages))
        dispatch(handleFetchConversations())
      })
    }

    return () => {
      dispatch({ type: CLEAR_CHAT_DATA })
    }
  }, [])

  // ** ChatWrapper tag based on chat's length
  // const ChatWrapper = Object.keys(selectedUser).length && selectedUser.chat ? PerfectScrollbar : 'div'

  return (
    <div className='chat-app-window'>
      {/* <div className={classnames('start-chat-area', { 'd-none': Object.keys(selectedUser).length })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div> */}
      {/* {Object.keys(selectedUser).length ? (
      
      ) : null} */}

      {messages && messages.length && showChat ? (
        <div className='active-chat d-flex flex-column'>
          <PerfectScrollbar ref={chatArea} className='user-chats flex-grow-1' options={{ wheelPropagation: true }}>
            <div className='chats'>
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={classnames({
                    'chat-left':
                      message.from && message.from._id ? message.from._id !== user.id : message.from !== user.id,
                  })}
                >
                  <div className='chat-avatar'>
                    <Avatar className='box-shadow-1 cursor-pointer' img={message.avatar} />
                  </div>

                  <div className='chat-body'>
                    {/* {item.messages.map((chat) => (
                ))} */}
                    <div key={1} className='chat-content'>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PerfectScrollbar>

          <Form className='chat-app-form' onSubmit={handleSendMsg}>
            <InputGroup className='input-group-merge mr-1 form-send-message'>
              <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Type your message here' />
            </InputGroup>
            <Button className='send' color='primary'>
              <Send size={14} className='d-lg-none' />
              <span className='d-none d-lg-block'>Send</span>
            </Button>
          </Form>
        </div>
      ) : (
        <div className='start-chat-area'>
          <div className='start-chat-icon mb-1'>
            <MessageSquare />
          </div>
          <h4 className='sidebar-toggle start-chat-text'>Start Conversation</h4>
        </div>
      )}
    </div>
  )
}

export default ChatLog
