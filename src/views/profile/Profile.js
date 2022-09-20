/*eslint comma-dangle: ["error", "always-multiline"]*/

import '@styles/react/pages/page-profile.scss'
import ProfileHeader from './header/ProfileHeader'
import { Fragment, useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Badge,
  Input,
  Button,
  Label,
  Spinner,
} from 'reactstrap'
import ProfileAbout from './about/About'
import ProfileOverview from './overview/ProfileOverview'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchOwnProfile } from '../../redux/actions/profile/fetch/getOwnProfile'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '1000px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

const Profile = () => {
  const [ownProfile, setOwnProfile] = useState({})

  const { fetchOwnProfileInProcess, profile } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleFetchOwnProfile())
  }, [])

  useEffect(() => {
    // dispatch(handleFetchOwnProfile())

    if (profile) {
      setOwnProfile(profile)
    }
  }, [profile])

  return (
    <Fragment>
      <div id='user-profile'>
        <Row>
          <Col sm='12'>
            <ProfileHeader profile={ownProfile} />
          </Col>
        </Row>

        {fetchOwnProfileInProcess ? (
          <ComponentSpinner />
        ) : (
          <Row>
            <Col sm={3}>
              <ProfileAbout profile={ownProfile} />
            </Col>
          </Row>
        )}
      </div>
    </Fragment>
  )
}

export default Profile
