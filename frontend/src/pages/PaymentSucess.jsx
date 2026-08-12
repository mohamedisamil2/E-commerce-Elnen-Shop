import { useEffect } from "react";
import { orderStore } from "../stores/orderStore";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSucess() {
  const { confirmStripePayment } = orderStore();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    if (!sessionId) return;

    const verify = async () => {
      await confirmStripePayment(sessionId);
      navigate("/order");
    };

    verify();
  }, [confirmStripePayment, location.search, navigate]);

  return (
    <>
      <h1>Processing your payment...</h1>
    </>
  );
}

export default PaymentSucess;
