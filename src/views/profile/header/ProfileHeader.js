import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'

const ProfileHeader = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const { user } = useSelector((state) => state.auth)

  return (
    <Card className='profile-header mb-2'>
      <CardImg src='https://via.placeholder.com/728x200.png/283046/283046' alt='User Profile Image' top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={user.avatar} alt='Card image' />
          </div>
          <div className='profile-title ml-3'>
            <h2 className='text-white'>{user.name}</h2>
            <p className='text-white'>{profile.designation ? profile.designation : 'Update your designation!'}</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              {/* <Nav className='mb-0' pills>

              </Nav> */}
              <Button color='primary'>
                <Link to='/settings-info'>
                  <Edit className='d-block d-md-none' size={14} />
                  <span className='font-weight-bold d-none d-md-block text-white'>Edit</span>
                </Link>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
