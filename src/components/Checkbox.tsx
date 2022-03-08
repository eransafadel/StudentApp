import { useState } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";

import "./Checkbox.module.css";
import classes from "./Checkbox.module.css";

interface Props {
    onClick: ()=>void,
    text:string
}




const Checkbox: React.FC = ()=>{

    const [isChecked, setIsChecked] = useState(false);
    const checkboxAnimationRef = useSpringRef();
    const checkboxAnimationStyle = useSpring({
      backgroundColor: isChecked ? "#808" : "#fff",
      borderColor: isChecked ? "#808" : "#ddd",
      config: config.gentle,
      ref: checkboxAnimationRef
    });
  
    const [checkmarkLength, setCheckmarkLength] = useState<number>(0);
  
    const checkmarkAnimationRef = useSpringRef();
    const checkmarkAnimationStyle = useSpring({
      x: isChecked ? 0 : checkmarkLength,
      config: config.gentle,
      ref: checkmarkAnimationRef
    });
  
    useChain(
      isChecked
        ? [checkboxAnimationRef, checkmarkAnimationRef]
        : [checkmarkAnimationRef, checkboxAnimationRef],
      [0, 0.1]
    );



  return (
   <div className={classes.borderSize}>
    <label >
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${isChecked ? "checkbox--active" : ""} ${classes.borderSize}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"

      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
    </label>
    </div>
  );
}




export default Checkbox;