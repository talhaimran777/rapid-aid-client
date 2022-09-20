// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn, getImageURL } from '@utils'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { handleLogout } from '../../../../redux/actions/auth/authActions'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** REDUX SELECTORS
  const { user } = useSelector((state) => state.auth)

  // ** State
  const [userData, setUserData] = useState(null)

  // ** GETTING PROFILE IMAGE URL FROM EMAIL
  // const imageURL = getImageURL(user.email, 40)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={(e) => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{(user && user['name']) || 'John Doe'}</span>
          <span className='user-email'>{(user && user.email) || 'john231@gmail.com'}</span>
        </div>
        <Avatar img={user.avatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
          <Link to={`/profile/me`}>
            <User size={14} className='mr-75' />
            <span className='align-middle'>Profile</span>
          </Link>
        </DropdownItem>
        <DropdownItem tag={Link} to='#' onClick={(e) => e.preventDefault()}>
          <Link to={`/inbox`}>
            <Mail size={14} className='mr-75' />
            <span className='align-middle'>Inbox</span>
          </Link>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
