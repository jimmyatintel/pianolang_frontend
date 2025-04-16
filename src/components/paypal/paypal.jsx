import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import { Windows } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";

import {
    clearCart
  } from "../../redux/reducers/cart-actios";
// Renders errors or successfull transactions on the screen.
function Message({ content }) {
    return <p>{content}</p>;
}
function Paypal({order_info}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialOptions = {
        "client-id":
            "AYTOaqTgi-dstx6Vkrg3nCw8i_m_DiY_DYzItcTXuUPrx2XGOWI00puacInx4lYZMtSgx5Tf0B6QZNh7",
        "currency": "TWD",
        "data-page-type": "product-details",
        // components: "buttons",
        // "data-sdk-integration-source": "developer-studio",
        // "enable-funding": "card",
        "disable-funding": "paylater",
        "buyer-country": "US",
    };

    const [message, setMessage] = useState("");
    const [orderid, setOrderid] = useState("");
    return (
        <div >
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "rect",
                        layout: "vertical",
                        color: "gold",
                        label: "paypal",
                    }} 
                    createOrder={async () => {
                        try {
                            const authToken = localStorage.getItem("authToken");
                            const response = await fetch(process.env.REACT_APP_API_URL + "/api/order/newpaypalorder", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `${authToken}`,
                                },
                                body: JSON.stringify(
                                    order_info
                                ),
                            });

                            const orderData = await response.json();

                            if (orderData.id) {
                                console.log("Order ID: ", orderData.id);
                                setOrderid(orderData.id)
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Could not initiate PayPal Checkout...${error}`
                            );
                        }
                    }} 
                    onApprove={async (data, actions) => {
                        try {
                            console.log("Capture ID: ", orderid);
                            const response = await fetch(
                                process.env.REACT_APP_API_URL + `/api/order/paypalcapture?orderID=`+orderid,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            );

                            const orderData = await response.json();
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message

                            const errorDetail = orderData?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            } else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                Windows.alert("付款失敗，請重新操作或是選擇其他付款方式。")
                                throw new Error(
                                    `${errorDetail.description} (${orderData.debug_id})`
                                );
                            } else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                // Or go to another URL:  actions.redirect('thank_you.html');
                                const transaction =
                                    orderData.purchase_units[0].payments
                                        .captures[0];
                                // setMessage(
                                //     `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                // );

                                console.log(
                                    "Capture result",
                                    orderData,
                                    JSON.stringify(orderData, null, 2)
                                );
                                dispatch(clearCart());
                                navigate("/ordercomplete");
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Sorry, your transaction could not be processed...${error}`
                            );
                        }
                    }} 
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </div>
    );
}

export default Paypal; 