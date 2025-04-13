import React from "react";

function AddCardButton(params) {
    function onAddPlace() {
        dispatchEvent(new CustomEvent("add_card_button_click"));
    }
    return (
        <button className={params.cssClass} type="button" onClick={onAddPlace}></button>
    )
}
export default AddCardButton;