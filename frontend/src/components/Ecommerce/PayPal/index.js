import React, { useRef, useEffect } from "react";

const Paypal = ({ total }) => {
  const paypal = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      window.paypal
        .Buttons({
          style: {
            color: "blue",
          },

          // Set up the transaction
          createOrder: function (data, actions, err) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: parseFloat(total).toFixed(2),
                  },
                },
              ],
            });
          },

          // Finalize the transaction
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },

          // If there's an error
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return <div ref={paypal}></div>;
};

export default Paypal;
