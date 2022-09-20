import { useState, Fragment } from 'react'
import { isObjEmpty } from '@utils'
import Avatar from '@components/avatar'
import { Link, User } from 'react-feather'
import { Form, Label, Input, Button, Row, Col, FormGroup, Card, CardBody } from 'reactstrap'
import Menu from '../menu/Menu'

const SocialTabContent = () => {
  const [twitter, setTwitter] = useState('')
  const [facebook, setFacebook] = useState('')
  const [google, setGoogle] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [instagram, setInstagram] = useState('')
  const [quora, setQuora] = useState('')

  return (
    <Card>
      <CardBody>
        <Menu currentActive='social' />

        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col sm='12'>
              <div className='d-flex align-items-center mb-2'>
                <Link size={18} />
                <h4 className='mb-0 ml-75'>Social Links</h4>
              </div>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='account-twitter'>Twitter</Label>
                <Input
                  id='account-twitter'
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder='Add Link'
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='account-facebook'>Facebook</Label>
                <Input
                  id='account-facebook'
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder='Add Link'
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='account-google'>Google</Label>
                <Input
                  id='account-google'
                  value={google}
                  onChange={(e) => setGoogle(e.target.value)}
                  placeholder='Add Link'
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='account-linkedIn'>LinkedIn</Label>
                <Input
                  id='account-linkedIn'
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  placeholder='Add Link'
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='account-instagram'>Instagram</Label>
                <Input
                  id='account-instagram'
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder='Add Link'
                />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='account-quora'>Quora</Label>
                <Input
                  id='account-quora'
                  value={quora}
                  onChange={(e) => setQuora(e.target.value)}
                  placeholder='Add Link'
                />
              </FormGroup>
            </Col>
            <Col className='mt-1' sm='12'>
              <Button.Ripple className='mr-1' color='primary'>
                Save
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default SocialTabContent
