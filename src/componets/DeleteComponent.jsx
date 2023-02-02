import React from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';


function DeleteComponent({ isPopupOpen, togglePopup, deleteData }) {
    return (
        <Modal isOpen={isPopupOpen}>
            <ModalBody>
                Are you sure you want to delete student number?
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={() => deleteData()}>Yes</button>
                <button className='btn btn-danger' onClick={() => togglePopup()} >Cancel</button>
            </ModalFooter>

        </Modal>
    )
}

export default DeleteComponent