/* eslint-disable */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap'
import { handleFetchActiveOrder, handleOrderComplete } from '../redux/actions/order'
import moment from 'moment'
import { isObjEmpty } from '../utility/Utils'
import { RESET_ORDER_COMPLETE } from '../redux/actions/action.types/actionTypes'

const Home = () => {
  const [orderCompleteStatusModal, setOrderCompleteStatus] = useState(false)

  const { order, inProcess } = useSelector((state) => state.orderFetch)
  const { user } = useSelector((state) => state.auth)
  const { orderCompleteStatus, completingOrderInProcess } = useSelector((state) => state.orderComplete)

  const dispatch = useDispatch()

  const markOrderComplete = (order) => {
    console.log(order?.taskId)
    const { taskId, _id } = order

    const data = {}

    data.taskId = taskId?._id
    data.orderId = _id

    dispatch(handleOrderComplete(data))
  }

  useEffect(() => {
    dispatch(handleFetchActiveOrder())

    if (orderCompleteStatus) {
      setOrderCompleteStatus(true)
    }

    return () => {
      dispatch({ type: RESET_ORDER_COMPLETE })
    }
  }, [orderCompleteStatus])
  return (
    <div>
      <div className='vertically-centered-modal'>
        <Modal
          isOpen={orderCompleteStatusModal}
          toggle={() => setOrderCompleteStatus(!orderCompleteStatusModal)}
          className='modal-dialog-centered'
        >
          <ModalHeader toggle={() => setOrderCompleteStatus(!orderCompleteStatusModal)}>Order Completed</ModalHeader>
          <ModalBody>
            <Alert color='success'>
              <p>Congrats your order has been completed successfully!.</p>
            </Alert>
          </ModalBody>
        </Modal>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Order Details</CardTitle>
        </CardHeader>

        {inProcess ? (
          <CardBody>
            <CardText>Fetching acitve order</CardText>
          </CardBody>
        ) : (
          <CardBody>
            {!order ? <CardText>You don't have any active order!</CardText> : ''}

            {user?.id === order?.taskerId ? (
              <CardText>You have a due order to be completed {moment(order?.taskId?.dueDate).fromNow()}</CardText>
            ) : (
              ''
            )}

            {user?.id === order?.hirerId ? (
              <CardText>Your order will be completed {moment(order?.taskId?.dueDate).fromNow()}</CardText>
            ) : (
              ''
            )}

            {/* REACT STRAP SPINNER */}
            {completingOrderInProcess ? (
              <div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ) : (
              ''
            )}

            {user?.id === order?.hirerId ? (
              <div className=''>
                <CardText>If your order has been completed then mark your order as completed!</CardText>
                <Button.Ripple onClick={markOrderComplete.bind(this, order)} color='primary'>
                  Mark Complete
                </Button.Ripple>
              </div>
            ) : (
              ''
            )}
          </CardBody>
        )}
      </Card>
    </div>
  )
}

export default Home
