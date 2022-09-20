/* eslint-disable */
/*eslint comma-dangle: ["error", "always-multiline"]*/
// import { Card } from "react-bootstrap"
// import { Card, CardHeader, CardTitle, Form } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import { useState, useContext, Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
// import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import {
  Alert,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip,
} from 'reactstrap'

// import { Fragment, useState } from 'react'
// import { Label } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'
import { RESET_TASK_UPDATE } from '../../redux/actions/action.types/actionTypes'
import { handleFetchTask } from '../../redux/actions/task/fetch'
import { handleUpdateTask } from '../../redux/actions/task/update'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '600px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

const UpdateTask = () => {
  // SETTING INITIAL STATE FOR LOGIN
  const initialState = {
    title: '',
    description: '',
    address: '',
    budget: '',
  }

  const [state, setState] = useState(initialState)

  // STATE TO TACKLE ERROR MESSAGES
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [addressError, setAddressError] = useState('')

  const [dueDate, setDueDate] = useState()
  const { register, errors, handleSubmit } = useForm()

  //   REDUX
  const { user } = useSelector((state) => state.auth)
  //   const { status, inProcess, errs } = useSelector((state) => state.taskPost)
  const { task, inProcess, error } = useSelector((state) => state.taskFetch)
  const { updateStatus, updatedTask, updateTaskInProcess, errs } = useSelector((state) => state.taskUpdate)

  //   EXTRACTING ID FROM PARAMS
  const { id } = useParams()

  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmit = async () => {
    if (isObjEmpty(errors)) {
      const data = {
        ...state,
        dueDate,
        userId: user.id,
      }
      dispatch(handleUpdateTask(data, id))
    }
  }

  useEffect(() => {
    setTitleError('')
    setDescriptionError('')
    setAddressError('')
    if (errs && errs.length) {
      // setErrorState({ titleError: '', descriptionError: '', addressError: '' })

      const titleERR = errs.find((err) => err.param === 'title')
      const descriptionERR = errs.find((err) => err.param === 'description')
      const addressERR = errs.find((err) => err.param === 'address')

      if (titleERR) {
        setTitleError(titleERR.msg)
      }

      if (descriptionERR) {
        setDescriptionError(descriptionERR.msg)
      }

      if (addressERR) {
        setAddressError(addressERR.msg)
      }

      // if (addressERR) {
      //   setErrorState({ ...errorState, addressError: addressERR.msg })
      // }
    }
  }, [errs])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_TASK_UPDATE })
    }
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(handleFetchTask(id))
    }
  }, [id])

  useEffect(() => {
    if (task) {
      setState({ ...task })
      setDueDate(task.dueDate)
    }
  }, [task])

  useEffect(() => {
    if (updatedTask) {
      setState({ ...updatedTask })
      setDueDate(updatedTask.dueDate)
    }
  }, [updatedTask])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Task</CardTitle>
      </CardHeader>

      {inProcess || updateTaskInProcess ? (
        <ComponentSpinner />
      ) : error ? (
        <CardBody>
          <CardText>Task was not found!</CardText>
        </CardBody>
      ) : (
        <CardBody>
          <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row className='mb-2'>
              <Col sm={12} lg={6}>
                <FormGroup>
                  <Label className='' for='title'>
                    Task Title
                  </Label>

                  {titleError ? (
                    <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                      {titleError}
                    </span>
                  ) : (
                    ''
                  )}

                  <Input
                    autoFocus
                    type='text'
                    // value={email}
                    id='title'
                    name='title'
                    onChange={onChangeHandler}
                    value={state.title}
                    className={classnames({
                      'is-invalid': errors['title'],
                    })}
                    innerRef={register({
                      required: true,
                      validate: (value) => value !== '',
                    })}
                  />
                </FormGroup>
              </Col>

              <Col sm={12} lg={6}>
                <FormGroup>
                  <Label for='description'>Task Description</Label>
                  {descriptionError ? (
                    <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                      {descriptionError}
                    </span>
                  ) : (
                    ''
                  )}

                  <Input
                    type='textarea'
                    name='description'
                    id='description'
                    rows={5}
                    onChange={onChangeHandler}
                    value={state.description}
                    className={classnames({
                      'is-invalid': errors['description'],
                    })}
                    innerRef={register({
                      required: true,
                      validate: (value) => value !== '',
                    })}
                  />
                </FormGroup>
              </Col>

              <Col sm={12} lg={6}>
                <FormGroup>
                  <Label className='' for='address'>
                    Give Address
                  </Label>

                  {addressError ? (
                    <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                      {addressError}
                    </span>
                  ) : (
                    ''
                  )}

                  <Input
                    type='text'
                    id='address'
                    name='address'
                    onChange={onChangeHandler}
                    value={state.address}
                    className={classnames({
                      'is-invalid': errors['address'],
                    })}
                    innerRef={register({
                      required: true,
                      validate: (value) => value !== '',
                    })}
                  />
                </FormGroup>
              </Col>

              <Col sm={12} lg={6}>
                <FormGroup>
                  <Label className='' for='budget'>
                    Enter your budget
                  </Label>
                  <Input
                    type='number'
                    // value={email}
                    id='budget'
                    name='budget'
                    onChange={onChangeHandler}
                    value={state.budget}
                    min={100}
                    className={classnames({
                      'is-invalid': errors['budget'],
                    })}
                    innerRef={register({
                      required: true,
                      validate: (value) => value !== '',
                    })}
                  />
                </FormGroup>
              </Col>

              <Col sm={4}>
                <FormGroup>
                  <Label for='dueDate'>Select Due Date</Label>
                  <Flatpickr
                    value={dueDate}
                    id='dueDate'
                    name='dueDate'
                    className='form-control'
                    onChange={(date) => setDueDate(date)}
                    options={{
                      altInput: true,
                      altFormat: 'F j, Y',
                      dateFormat: 'Y-m-d',
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            {updateStatus === 'SUCCESS' ? <p className='text-success'>Task has been updated successfully!</p> : ''}
            <Button.Ripple type='submit' color='primary'>
              Save Task
            </Button.Ripple>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default UpdateTask
