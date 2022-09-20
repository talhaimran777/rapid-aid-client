/* eslint-disable */
import { Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Badge, Input } from 'reactstrap'
import { Image } from 'react-bootstrap'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchTasks, handleFetchTasksNoUpdatesVersion, initiateTaskFetch } from '../../redux/actions/task/fetch'
import { handleDeleteTask } from '../../redux/actions/task/delete'
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner'
import { MapPin, Calendar, Trash } from 'react-feather'
import { Link } from 'react-router-dom'
import moment from 'moment'
const Tasks = () => {
  const [keyword, setKeyword] = useState('')

  const dispatch = useDispatch()

  // ** REDUX SELECTORS
  const { user } = useSelector((state) => state.auth)
  const { tasks, inProcess } = useSelector((state) => state.taskFetch)
  const { deleteTaskError, deleteTaskInProcess, deleteStatus } = useSelector((state) => state.taskDelete)


  const fetchTasks = useCallback(async () => {
    // dispatch(initiateTaskFetch())
    dispatch(handleFetchTasks())
  }, [dispatch])

  const onChangeHandler = (e) => {
    setKeyword(e.target.value)
  }

  // ** Delete Task Handler
  const handleDeleteTaskHandler = (id) => {
    if(confirm(`Are you sure you want to delete this task with id ${id}?`)) {
      alert("Deleting it!")
    }
  }

  useEffect(() => {
    if (keyword) {
      dispatch(handleFetchTasksNoUpdatesVersion(keyword))
    }

    if (keyword === '') {
      dispatch(handleFetchTasksNoUpdatesVersion(''))
    }
  }, [keyword])

  useEffect(() => {
    fetchTasks()

    return () => {
      dispatch({ type: 'CLEAR_FETCH_TASKS' })
    }
  }, [deleteStatus])

  return inProcess || deleteTaskInProcess ? (
    <ComponentSpinner />
  ) : (
    <Row className='justify-content-center'>
      {/* <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader> */}
      <Col xs={12} sm={10} md={8} lg={7} xl={6}>
        <Input type='search' name='keyword' className='mb-1' placeholder='Search Tasks' onChange={onChangeHandler} />
        {tasks && tasks.length >= 1 ? (
          tasks.map((task) => (
            <Card key={task._id}>
              {/* <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                </CardHeader> */}
              <CardBody>
                <Row className=' align-items-center mb-2'>
                  <Col xs={2} sm={2} md={2} className='text-left text-sm-left'>
                    <Image src={task.avatar} alt='task' roundedCircle height='50px' width='50px' />
                  </Col>
                  <Col xs={10} sm={10} md={6} className='text-left text-sm-left'>
                    {' '}
                    <h3 className='text-truncate text-primary font-weight-bold'>{task.title}</h3>{' '}
                  </Col>
                  <Col xs={12} md={4} className='text-left text-sm-left text-md-right mt-1 mt-md-0'>
                    {' '}
                    <strong className=''>RS </strong>
                    {task.budget}
                  </Col>
                </Row>
                <Row className='align-items-center mb-1'>
                  <Col xs={12} className='text-truncate text-left'>
                    <MapPin className='mr-1' size={20} />
                    <span className='font-weight-light'>{task.address}</span>
                  </Col>
                </Row>
                <Row className='justify-content-center align-items-center'>
                  <Col xs={12} className='text-left'>
                    <Calendar className='mr-1 ' size={20} />
                    <span className='font-weight-light'>{moment(task.dueDate).format('dddd, MMMM Do YYYY')}</span>
                  </Col>
                </Row>

                <hr />

                <Row className='justify-content-left align-items-center' style={{ marginLeft: '3px' }}>
                  <Col>
                    <div className='row align-items-center justify-content-start'>
                      <Badge style={{ padding: '10px' }} className='text-uppercase' color='primary'>
                        {task.status}
                      </Badge>
                      {/* <h4>
                      </h4> */}
                      <Link to={`/tasks/${task._id}`} className='btn btn-primary btn-md ml-2'>
                        Details
                      </Link>
                    </div>
                  </Col>

                  {task.user === user.id && task.status === 'open' ? (
                    <Col className='text-right'>
                      <Trash
                        style={{ cursor: 'pointer' }}
                        onClick={handleDeleteTaskHandler.bind(this, task._id)}
                        size={20}
                        className='text-danger'
                      />
                    </Col>
                  ) : (
                    ''
                  )}
                </Row>
              </CardBody>
            </Card>
            // <Link key={task._id} to={`/tasks/${task._id}`}>
            // </Link>
          ))
        ) : (
          <h1 className='text-center'>No Tasks Available</h1>
        )}
      </Col>
    </Row>
  )
}

export default Tasks
