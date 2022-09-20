/* eslint-disable */
/*eslint comma-dangle: ["error", "always-multiline"]*/
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input, FormGroup, Row, Col, Button, Form, Card, CardBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Menu from '../menu/Menu'
import { handleFetchOwnProfile } from '../../../redux/actions/profile/fetch/getOwnProfile'
import { handleUpdateOwnProfile } from '../../../redux/actions/profile/update/updateOwnProfile'
import { isObjEmpty } from '@utils'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '500px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

const UpdateInfo = () => {
  // STATE FOR GRABBING DATA TO REGSITER A USER
  const initialState = {
    designation: '',
    bio: '',
    country: '',
    city: '',
    address: '',
    website: '',
    phone: '',
  }
  const [state, setState] = useState(initialState)
  const [birthDate, setBirthDate] = useState(Date.now())

  const { register, errors, handleSubmit, control, trigger } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (isObjEmpty) {
      const data = {}

      data.country = 'Pakistan'
      data.designation = state.designation.trim()

      if (state.bio) {
        data.bio = state.bio.trim()
      }

      if (birthDate) {
        // console.log(birthDate)
        data.birthDate = birthDate
      }

      if (state.website) {
        data.website = state.website.trim()
      }

      data.city = state.city.trim()
      data.address = state.address.trim()
      data.phone = state.phone.trim()

      console.log(data)
      dispatch(handleUpdateOwnProfile(data))
    }
  }

  const { fetchOwnProfileInProcess, profile, updateOwnProfileInProcess, updateSuccess } = useSelector(
    (state) => state.profile
  )

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(handleFetchOwnProfile())
  }, [])

  useEffect(() => {
    // dispatch(handleFetchOwnProfile())

    if (profile) {
      setState({ ...profile })

      setBirthDate(profile.birthDate)
    }
  }, [profile])

  return (
    <Card>
      <Menu currentActive='info' />

      {fetchOwnProfileInProcess || updateOwnProfileInProcess ? (
        <ComponentSpinner />
      ) : (
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6'>
                <FormGroup>
                  <Label for='designation'>Designation</Label>
                  <Input
                    onChange={onChangeHandler}
                    id='designation'
                    type='text'
                    name='designation'
                    value={state.designation || ''}
                    placeholder='Certified Instructor'
                    className={classnames({
                      'is-invalid': errors.designation,
                    })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
              </Col>
              <Col sm='12'>
                <FormGroup>
                  <Label for='bio'>Bio</Label>
                  <Input
                    onChange={onChangeHandler}
                    value={state.bio || ''}
                    id='bio'
                    rows='4'
                    name='bio'
                    type='textarea'
                    placeholder='Your Bio data here...'
                  />
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label for='birth-date'>Birth Date</Label>

                  <Flatpickr
                    className='form-control'
                    name='birthDate'
                    value={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    id='birthDate'
                  />
                  {/* <Controller
                    name='dob'
                    as={Flatpickr}
                    id='birth-date'
                    control={control}
                    placeholder='Birth Date'
                    className={classnames('form-control', {
                      'is-invalid': errors.dob,
                    })}
                  /> */}
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label for='country'>Country</Label>
                  <Input id='country' type='text' name='country' value='Pakistan' readOnly />
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label for='city'>City</Label>
                  <Input
                    onChange={onChangeHandler}
                    id='city'
                    type='text'
                    name='city'
                    placeholder='Lahore'
                    value={state.city || ''}
                    className={classnames({
                      'is-invalid': errors.city,
                    })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label for='address'>address</Label>
                  <Input
                    onChange={onChangeHandler}
                    id='address'
                    type='text'
                    name='address'
                    placeholder='Home Address'
                    value={state.address || ''}
                    className={classnames({
                      'is-invalid': errors.address,
                    })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label for='website'>Website</Label>
                  <Input
                    onChange={onChangeHandler}
                    type='text'
                    id='website'
                    name='website'
                    value={state.website || ''}
                    placeholder='Website Address'
                  />
                </FormGroup>
              </Col>
              <Col sm='6'>
                <FormGroup>
                  <Label for='phone'>Phone</Label>
                  <Input
                    onChange={onChangeHandler}
                    id='phone'
                    name='phone'
                    placeholder='Phone Number'
                    value={state.phone || ''}
                    className={classnames({
                      'is-invalid': errors.phone,
                    })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
              </Col>
              <Col className='mt-1' sm='12'>
                {updateSuccess ? <p className='text-success'> Profile updated successfully!</p> : ''}
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Save
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default UpdateInfo
