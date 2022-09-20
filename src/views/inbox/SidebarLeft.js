/* eslint-disable */
/*eslint comma-dangle: ["error", "always-multiline"]*/

// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { selectChat } from './store/actions'

// ** Utils
import { formatDateToMonthShort } from '@utils'
import moment from 'moment'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search, CheckSquare, Bell, User, Trash } from 'react-feather'
import { CardText, InputGroup, InputGroupAddon, Input, InputGroupText, Badge, CustomInput, Button } from 'reactstrap'
import { handleFetchConversations, handleFetchMessages } from '../../redux/actions/chat/fetch'
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner'

const SidebarLeft = (props) => {
  // ** Props & Store
  const { store, sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft } = props
  const { chats, contacts, userProfile } = store

  // ** Redux Selector
  const { conversations, conversationsFetchInProcess } = useSelector((state) => state.chat)
  const { user, socketClient } = useSelector((state) => state.auth)

  // ** Dispatch
  const dispatch = useDispatch()

  // ** State
  const [about, setAbout] = useState('')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState({})
  const [status, setStatus] = useState('online')
  const [filteredChat, setFilteredChat] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])

  // ** Handles User Chat Click
  const handleFetchChat = (id) => {
    dispatch(handleFetchMessages(id))
    // socketClient.emit('join', `${user.id}--with--${id}`)
    // socketClient.emit('join', `${id}--with--${user.id}`)
  }

  // ** FETCHING CONVERSATIONS
  useEffect(() => {
    dispatch(handleFetchConversations())
  }, [])

  // ** Renders Chat
  const renderChats = () => {
    console.log(conversations)
    // conversations.map((conversation) => {
    //   return (
    //     <li
    //     // className={classnames({
    //     //   active: true,
    //     // })}
    //     // key={item.id}
    //     // onClick={() => handleUserClick('chat', item.id)}
    //     >
    //       <Avatar img={conversation.recipients[0].avatar} imgHeight='42' imgWidth='42' />
    //       <div className='chat-info flex-grow-1'>
    //         <h5 className='mb-0'>Talha Imran</h5>
    //         <CardText className='text-truncate'>Hello</CardText>
    //       </div>
    //       <div className='chat-meta text-nowrap'>
    //         <small className='float-right mb-25 chat-time ml-25'>5 pm</small>
    //       </div>
    //     </li>
    //   )
    // })
    // if (chats && chats.length) {
    //   if (query.length && !filteredChat.length) {
    //     return (
    //       <li className='no-results show'>
    //         <h6 className='mb-0'>No Chats Found</h6>
    //       </li>
    //     )
    //   } else {
    //     const arrToMap = query.length && filteredChat.length ? filteredChat : chats
    //     return arrToMap.map((item) => {
    //       const time = formatDateToMonthShort(item.chat.lastMessage ? item.chat.lastMessage.time : new Date())
    //       return (
    //         <li
    //           className={classnames({
    //             active: active.type === 'chat' && active.id === item.id,
    //           })}
    //           key={item.id}
    //           onClick={() => handleUserClick('chat', item.id)}
    //         >
    //           <Avatar img={item.avatar} imgHeight='42' imgWidth='42' status={item.status} />
    //           <div className='chat-info flex-grow-1'>
    //             <h5 className='mb-0'>{item.fullName}</h5>
    //             <CardText className='text-truncate'>
    //               {item.chat.lastMessage ? item.chat.lastMessage.message : chats[chats.length - 1].message}
    //             </CardText>
    //           </div>
    //           <div className='chat-meta text-nowrap'>
    //             <small className='float-right mb-25 chat-time ml-25'>{time}</small>
    //             {item.chat.unseenMsgs >= 1 ? (
    //               <Badge className='float-right' color='danger' pill>
    //                 {item.chat.unseenMsgs}
    //               </Badge>
    //             ) : null}
    //           </div>
    //         </li>
    //       )
    //     })
    //   }
    // } else {
    //   return null
    // }
  }

  // ** Renders Contact
  const renderContacts = () => {
    if (contacts && contacts.length) {
      if (query.length && !filteredContacts.length) {
        return (
          <li className='no-results show'>
            <h6 className='mb-0'>No Chats Found</h6>
          </li>
        )
      } else {
        const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts
        return arrToMap.map((item) => {
          return (
            <li
              className={classnames({
                active: active.type === 'contact' && active.id === item.id,
              })}
              key={item.fullName}
              onClick={() => handleUserClick('contact', item.id)}
            >
              <Avatar img={item.avatar} imgHeight='42' imgWidth='42' />
              <div className='chat-info flex-grow-1'>
                <h5 className='mb-0'>{item.fullName}</h5>
                <CardText className='text-truncate'>{item.about}</CardText>
              </div>
            </li>
          )
        })
      }
    } else {
      return null
    }
  }

  // ** Handles Filter
  const handleFilter = (e) => {
    setQuery(e.target.value)
    const searchFilterFunction = (contact) => contact.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    const filteredChatsArr = chats.filter(searchFilterFunction)
    const filteredContactssArr = contacts.filter(searchFilterFunction)
    setFilteredChat([...filteredChatsArr])
    setFilteredContacts([...filteredContactssArr])
  }

  return store ? (
    <div className='sidebar-left'>
      <div className='sidebar'>
        <div className='sidebar-content'>
          <div className='chat-fixed-search'>
            <div className='d-flex align-items-center w-100'>
              {/* <div className='sidebar-profile-toggle' onClick={handleUserSidebarLeft}>
                {Object.keys(userProfile).length ? (
                  <Avatar
                    className='avatar-border'
                    img={userProfile.avatar}
                    status={status}
                    imgHeight='42'
                    imgWidth='42'
                  />
                ) : null}
              </div> */}
              <InputGroup className='input-group-merge ml-1 w-100'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText className='round'>
                    <Search className='text-muted' size={14} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  value={query}
                  className='round'
                  placeholder='Search or start a new chat'
                  onChange={handleFilter}
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
            <h4 className='chat-list-title'>Chats</h4>
            <ul className='chat-users-list chat-list media-list'>
              {conversationsFetchInProcess ? (
                <ComponentSpinner />
              ) : conversations && conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <li
                    // className={classnames({
                    //   active: true,
                    // })}
                    key={conversation._id}
                    onClick={() => handleFetchChat(conversation.recipients[0]._id)}
                  >
                    <Avatar img={conversation.recipients[0].avatar} imgHeight='42' imgWidth='42' />
                    <div className='chat-info flex-grow-1'>
                      <h5 className='mb-0'>{conversation.recipients[0].name}</h5>
                      <CardText className='text-truncate'>{conversation.lastMessage}</CardText>
                      <small style={{ fontSize: '10px' }} className='float-right chat-time'>
                        {moment(conversation.date).fromNow()}
                      </small>
                    </div>
                  </li>
                ))
              ) : (
                <li className='no-results show'>You do not have any messages!</li>
              )}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null
}

export default SidebarLeft
