import React from "react";
import * as events from "../utils/events.js";

function LogoutButton(params) {
    function onSignOut() {
        localStorage.removeItem("jwt");
        events.generateJWTEvent(false, '');
    }
    return (
        <button className={params.cssClass} onClick={onSignOut}>Выйти</button>);
}

export default LogoutButton;