import { API_URL } from "@/constans";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { message, notification } from "antd";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51OJmapIW9JnRLuqYJGye1vj7BkFHGLKKkzaG11y6b3Ds3Ji7RaITTUARoNGCoY9A1qa9T9DujBIGzY2TNRwLAjVv00WDZ5zk4U');


interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: any;
  total: number;

}

function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  total
}: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setclientSecret] = useState();

  const loadClientSecret = async () => {

    try {
      setLoading(true)
      const { data } = await axios.post(`${API_URL}/payment`, {
        amount: total,
        corrency: 'usd'
      });
      setclientSecret(data);

    } catch (error: any) {
      notification.error({
        message: 'error loadClient',
        description: error.message,
      });

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadClientSecret();
  }, []);


  return (
    <Modal
      title={
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Checkout</span>
          <span>Total: ${total}</span>
        </div>
      }
      open={showCheckoutModal}
      onCancel={() => setShowCheckoutModal(false)}
      centered
      closable={false}
      footer={false}
    >
      <hr className="my-5" />
      <div className="mt-5">
        {stripePromise && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{clientSecret: clientSecret}}

          >
            <CheckoutForm
            total={total}
            setShowCheckoutModal={setShowCheckoutModal}

            />
          </Elements>

        )}

      </div>


    </Modal>
  )
}

export default CheckoutModal;