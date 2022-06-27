import {React} from "react";
import "./input.css"

const Input = (props) => {
    return(
        <div className="group">
            <input type="text" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)}/>
            <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currensies.map((currency) => (
                    <option value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}

export default Input;