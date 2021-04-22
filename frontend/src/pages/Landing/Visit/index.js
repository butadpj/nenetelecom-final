import React, { useRef, useState } from "react";
import "./Visit.css";

import check from "../../../assets/svgs/check-solid.svg";
import Button from "../../../components/Button/";

const Visit = () => {
  const toolTip = useRef(null);
  const [
    address,
    setAddress,
  ] = useState(`Greenhills Mall (2nd Floor), Ortigas Ave, San Juan 1502 Manila,
              Philippines`);

  const showToolTip = (toolTip) => {
    navigator.clipboard.writeText(address);
    toolTip.current.classList.add("tooltip-show");

    setTimeout(() => {
      toolTip.current.classList.remove("tooltip-show");
    }, 2000);
  };

  return (
    <section className="visit" id="visit">
      <div className="circle-top"></div>
      <div className="circle-bottom"></div>
      <div className="bg-box">
        <main>
          <div className="call-to-action">
            <h1 className="text-lg">OR VISIT US DIRECTLY</h1>
            <div className="tooltip">
              <Button
                type="button"
                text={
                  <div>
                    <div ref={toolTip} className="tooltiptext" id="myTooltip">
                      <img src={check} alt="" />
                      <span>Copied to clipboard</span>
                    </div>
                    GET ADDRESS
                  </div>
                }
                cName="get-direction-btn"
                functionality={() => showToolTip(toolTip)}
              />
            </div>
          </div>

          <div className="helper">
            <h3 className="text-md">
              WHEN YOU'RE THERE, LOOK/ASK FOR OUR STALL NUMBER.
            </h3>
          </div>

          <div className="stall-info">
            <h1 className="text-xl stall-number">#U16</h1>
            <h3 className="text-sm">
              Note that our stall number is changing every month
            </h3>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Visit;
