/* eslint-disable */
/*eslint comma-dangle: ["error", "always-multiline"]*/
// import { Card } from "react-bootstrap"
// import { Card, CardHeader, CardTitle, Form } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Row, Col, Card, CardHeader, CardTitle, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import { handlePostOffer } from '../../redux/actions/offer/post'
import { RESET_OFFER_POST } from '../../redux/actions/action.types/actionTypes'
import { isObjEmpty } from '../../utility/Utils'

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

const MakeOffer = () => {
  // SETTING INITIAL STATE FOR LOGIN
  const initialState = {
    description: '',
    offeredAmount: '',
  }

  const [state, setState] = useState(initialState)

  // STATE TO TACKLE ERROR MESSAGES
  const [descriptionError, setDescriptionError] = useState('')
  const [offeredAmountError, setOfferedAmountError] = useState('')

  const { register, errors, handleSubmit } = useForm()

  //   REDUX
  const { user } = useSelector((state) => state.auth)
  const { inProcess, errs, isOfferPosted } = useSelector((state) => state.offerPost)

  //   EXTRACTING ID FROM PARAMS
  const { id } = useParams()

  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onSubmit = async () => {
    if (isObjEmpty(errors)) {
      const data = {
        description: state.description,
        offeredAmount: state.offeredAmount,
      }

      console.log(data)
      dispatch(handlePostOffer(data, id))
    }
  }

  useEffect(() => {
    setDescriptionError('')
    setOfferedAmountError('')
    if (errs && errs.length) {
      const descriptionErr = errs.find((err) => err.param === 'description')
      const offeredAmountErr = errs.find((err) => err.param === 'offeredAmount')

      if (descriptionErr) {
        setDescriptionError(descriptionErr.msg)
      }
      if (offeredAmountErr) {
        setOfferedAmountError(offeredAmountErr.msg)
      }
    }
  }, [errs])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_OFFER_POST })
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make Offer</CardTitle>
      </CardHeader>

      {inProcess ? (
        <ComponentSpinner />
      ) : (
        <CardBody>
          <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
            <Row className='mb-2'>
              <Col sm={12} lg={6}>
                <FormGroup>
                  <Label className='' for='offeredAmount'>
                    Enter your offered amount
                  </Label>
                  {offeredAmountError ? (
                    <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                      {offeredAmountError}
                    </span>
                  ) : (
                    ''
                  )}
                  <Input
                    type='number'
                    id='offeredAmount'
                    name='offeredAmount'
                    onChange={onChangeHandler}
                    value={state.offeredAmount}
                    min={100}
                    className={classnames({
                      'is-invalid': errors['offeredAmount'],
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
                  <Label for='description'>Describe Your Offer</Label>
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
            </Row>

            {isOfferPosted ? <p className='text-success'>Offer has been posted successfully!</p> : ''}
            <Button.Ripple type='submit' color='primary'>
              Make Offer
            </Button.Ripple>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default MakeOffer
