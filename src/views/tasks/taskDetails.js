/* eslint-disable */
/*eslint comma-dangle: ["error", "always-multiline"]*/
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap'
import classnames from 'classnames'
import { Image } from 'react-bootstrap'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchTask, handleFetchTasks, initiateTaskFetch } from '../../redux/actions/task/fetch'
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
// import { MapPin, Calendar } from 'react-feather'
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner'
import { MapPin, Calendar } from 'react-feather'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { handleAddComment } from '../../redux/actions/comment/add'
import { handleFetchActiveOrder, handleHireWorker } from '../../redux/actions/order'
import { RESET_HIRE_WORKER } from '../../redux/actions/action.types/actionTypes'

const TaskDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [postTime, setPostTime] = useState('')
  const [comment, setComment] = useState('')
  const [hireSuccessModal, setHireSuccessModal] = useState(false)
  const [isOfferPosted, setIsOfferPosted] = useState(false)
  const [isActiveOrder, setIsActiveOrder] = useState(false)

  const { register, errors, handleSubmit } = useForm()

  const { task, inProcess, error } = useSelector((state) => state.taskFetch)
  const { user } = useSelector((state) => state.auth)
  const { order } = useSelector((state) => state.orderFetch)

  const { commentAddInProcess } = useSelector((state) => state.addComment)
  const { isHiringInProcess, isHired } = useSelector((state) => state.hireWorker)
  const { avatar } = user

  //   console.log(params)

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      const data = {}
      data.taskId = task._id
      data.comment = comment.trim()

      dispatch(handleAddComment(data))
      setComment('')
    }
  }

  const getCommentPostedTime = (date) => {
    return moment(date).fromNow()
  }

  const getOfferPostedTime = (date) => {
    return moment(date).fromNow()
  }

  const hireTasker = (offer) => {
    // eslint-disable-next-line no-restricted-globals
    if (
      confirm(`Are you sure you want to hire this worker with ID: ${offer?.user?._id} & Name: ${offer?.user?.name}`)
    ) {
      const data = {}
      data.taskId = id
      data.offerId = offer._id
      data.taskerId = offer?.user?._id

      dispatch(handleHireWorker(data))
    }
  }

  const cleanUp = () => {
    dispatch({ type: RESET_HIRE_WORKER })
  }

  useEffect(() => {
    if (id) {
      dispatch(handleFetchActiveOrder())
      dispatch(handleFetchTask(id))
    }
    return () => {
      cleanUp()
    }
  }, [id])

  useEffect(() => {
    if (task) {
      const { postedDate } = task
      setPostTime(moment(postedDate).fromNow())
    }
  }, [task])

  useEffect(() => {
    if (task?.offers?.length) {
      // console.log(task.offers)
      const { offers } = task
      const found = offers.find((offer) => offer?.user?._id === user.id)
      if (found) {
        setIsOfferPosted(true)
      }
    }
  }, [task?.offers])

  useEffect(() => {
    if (order) {
      setIsActiveOrder(order)
    }
  }, [order])

  useEffect(() => {
    if (isHired) {
      // show modal
      setHireSuccessModal(true)
      dispatch(handleFetchTask(id))
    }
  }, [isHired])

  return inProcess || isHiringInProcess ? (
    <ComponentSpinner />
  ) : !error && task ? (
    <Card>
      <div className='vertically-centered-modal'>
        <Modal
          isOpen={hireSuccessModal}
          toggle={() => setHireSuccessModal(!hireSuccessModal)}
          className='modal-dialog-centered'
        >
          <ModalHeader toggle={() => setHireSuccessModal(!hireSuccessModal)}>Hiring Success</ModalHeader>
          <ModalBody>
            <Alert color='success'>
              <p>You have successfully hired the worker.</p>
            </Alert>
          </ModalBody>
        </Modal>
      </div>

      <CardHeader>
        <CardTitle className='text-primary'>{task.title}</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col sm={12} md={10} lg={8}>
            <CardText>{task.description}</CardText>

            <Row className='mt-3 justify-content-between align-items-center'>
              <Col>
                <Image src={task.avatar} alt='avatar' roundedCircle height='70px' width='70px' className='mb-1' />
                <h5 className='font-weight-bold text-primary'>Posted By</h5>
                <p className='font-weight-light'>{task.name}</p>
              </Col>
              <Col>
                <h5 className='text-primary'>Posted At</h5>
                <p>{postTime || '26 mins ago'}</p>
              </Col>

              {task.user === user.id ? (
                <Col className='d-flex justify-content-end'>
                  <Link to={`/task-update/${task._id}`}>
                    <Button.Ripple disabled={task.status !== 'open'} color='primary'>
                      Update Task
                    </Button.Ripple>
                  </Link>
                </Col>
              ) : (
                ''
              )}

              {task.user !== user.id && !isOfferPosted && !isActiveOrder ? (
                <Col className='d-flex justify-content-end'>
                  <Link to={`/make-offer/${task._id}`}>
                    <Button.Ripple disabled={task.status !== 'open'} color='primary'>
                      Make Offer
                    </Button.Ripple>
                  </Link>
                </Col>
              ) : (
                ''
              )}
            </Row>
            <Row className='my-3 justify-content-between align-items-center'>
              <Col>
                <div className='d-flex mb-1'>
                  <MapPin className='mr-1 text-primary' />
                  <h5 className='font-weight-bold'>{task.address}</h5>
                </div>

                <div className='d-flex'>
                  <Calendar className='mr-1 text-primary' />
                  <h5 className='font-weight-bold'>{moment(task.dueDate).format('dddd, MMMM Do YYYY')}</h5>
                </div>
              </Col>
              {/* <Col>
            <h5>Posted At</h5>
            <p>{postTime || '26 mins ago'}</p>
          </Col> */}
            </Row>

            <CardTitle className='text-primary'>Offers Section</CardTitle>

            <>
              {task && task.offers && task.offers.length > 0 ? (
                task.offers.map((offer) => (
                  <Card className='border px-3 py-2'>
                    <Row className='justify-content-start align-items-center'>
                      <Col sm={2}>
                        <Row className='justify-content-start align-items-center'>
                          <Image
                            src={offer?.user?.avatar}
                            alt='avatar'
                            roundedCircle
                            height='40px'
                            width='40px'
                            className='mr-1 mb-2'
                          />
                          <span className=''>RS {offer.offeredAmount}</span>
                          <Col sm={12}>
                            <span className='font-lg text-primary'>{getOfferPostedTime(offer.date)}</span>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <p>{offer.description}</p>
                      </Col>

                      {task.user === user.id && !isActiveOrder ? (
                        <Col className='mt-1 mt-sm-0'>
                          <Button.Ripple
                            /* eslint-disable */
                            onClick={hireTasker.bind(this, offer)}
                            /* eslint-enable */

                            color='primary'
                            disabled={task.status !== 'open'}
                          >
                            Hire
                          </Button.Ripple>
                        </Col>
                      ) : (
                        ''
                      )}
                    </Row>
                    {/* <h1>Comment</h1> */}
                  </Card>
                ))
              ) : (
                <p>No Offers Available</p>
              )}
            </>

            <CardTitle className='text-primary'>Comment Section</CardTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Label for='comment' className='mb-1'>
                Add Comment
              </Label>
              <Row className='mb-3'>
                <Col className='d-flex justify-content-between align-items-start'>
                  <Image src={avatar} alt='avatar' roundedCircle height='40px' width='40px' className='mr-1' />

                  <Input
                    type='text'
                    name='comment'
                    id='comment'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className={classnames({
                      'is-invalid': errors['comment'],
                    })}
                    innerRef={register({
                      required: true,
                      validate: (value) => value !== '',
                    })}
                  />
                </Col>
                <Col sm={12} className='my-2'>
                  {commentAddInProcess ? <Spinner type='grow' color='primary' /> : ''}
                </Col>
              </Row>
            </form>

            <>
              <CardTitle>Comments</CardTitle>

              {task && task.comments && task.comments.length > 0 ? (
                task.comments.map((comment) => (
                  <Col className=''>
                    <Card className='border p-1'>
                      <Row className='align-items-center'>
                        <Col sm={2} className='mb-1 mb-sm-0'>
                          <Image
                            src={comment.avatar}
                            alt='avatar'
                            roundedCircle
                            height='40px'
                            width='40px'
                            className='mr-1'
                          />
                        </Col>
                        <Col className='text-justify'>
                          <span className=''>{comment.comment}</span>
                        </Col>
                        <Col sm={12} className='mt-1'>
                          <span className='font-lg text-primary'>{getCommentPostedTime(comment.date)}</span>
                        </Col>
                      </Row>
                      {/* <h1>Comment</h1> */}
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No Comments Available</p>
              )}
            </>
            {/* <CardHeader></CardHeader> */}

            {/* <p>{getCommentPostedTime(comment.date)}</p> */}
          </Col>
        </Row>
      </CardBody>
    </Card>
  ) : (
    <h1>Error Fetching Task!</h1>
  )
}

export default TaskDetails
