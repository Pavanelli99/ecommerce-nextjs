'use client'
import { CartState, ClearCart } from '@/redux/cartSlice';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, notification } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CheckoutForm({
  total,
  setShowCheckoutModal,

}: {
total: number,
setShowCheckoutModal: any}) {
  const [loading, setsetLoading] = useState(false);
  const elements =  useElements();
  const stripe = useStripe();
  const {cartItems}: CartState = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  const handleSubmit = async (event: any) => {
    try {
      setsetLoading(true);
      event.preventDefault();

      if(!stripe || !elements)
      throw new Error("Stripe.js hasn`t loaded yet.")

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
           return_url: "https://localhost:3000/cart"
        },
        redirect: 'if_required',
      });

      if(result.error){
        throw result.error
      }

      notification.success({
        message: "Payment successful",
        description: "Your payment was processed successfully"
      })

      const userId = '123'; // para tirar o erro de userId no orderpayload


      const orderPayload = {
        user: userId,
        items: cartItems,
        paymentStatus: "paid",
        orderStatus: "order placed",
        shippingAddress: result.paymentIntent.shipping,
        transationId: result.paymentIntent.id,
        total
      }

      //save order data to backend
      //fazer
      // não esquecer de atualizar o estoque

      dispatch (ClearCart())
      notification.success({
        message: "Order placed successfully",
        description: "Your order was placed successfully",
      });

    } catch (error: any) {
      notification.error({
        message: "Payment failed",
        description: error.message,
      });

    }finally{
      setsetLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="h-[350px] overflow-y-scroll pr-5">
        <PaymentElement />
        <AddressElement
        options = {{
          allowedCountries:["US", "BR"],
          mode: 'shipping',
        }}
        />
        </div>
        <div className='flex gap-5'>
          <Button
          htmlType='button'
          className='mt-5'
          block
          onClick={() => setShowCheckoutModal(false)}
          >Cancel </Button>
          <Button
          type='primary'
          htmlType='submit'
          className='mt-5'
          block
          >Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm