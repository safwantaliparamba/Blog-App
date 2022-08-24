
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div className="backdrop" onClick={()=> props.onClick()} ></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className="modal">
            <div className="content">{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    const portalElement = document.getElementById("overlays");
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;