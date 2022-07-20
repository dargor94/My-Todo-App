import {useState} from "react";
import "./css/formInput.css";

export const FormInput = (props) => {

    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = () => {
        setFocused(true);
    };
    return props.type !== "hidden" ? (<div className="formInput">

        <label>{label}</label>
        <input
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
        />

        <span>{errorMessage}</span>
    </div>) : (<></>);


}