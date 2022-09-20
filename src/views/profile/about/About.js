import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout = (props) => {
  //   console.log(props)

  const { profile } = props

  const { user, bio, designation, country, city, website } = profile
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>About</h5>
        <CardText className='text-justify'>{bio ? bio : 'Update your bio!'}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>Designation:</h5>
          <CardText>{designation ? designation : 'Update your designation!'}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Lives:</h5>
          <CardText>{city && country ? `${city}, ${country}` : 'Update your city!'}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{user && user.email ? user.email : ''}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Website:</h5>
          <CardText>{website ? website : 'Update your website!'}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
