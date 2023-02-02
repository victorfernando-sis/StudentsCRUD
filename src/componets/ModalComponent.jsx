import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function ModalComponent({ isModalOpen, toggleModal, payload, selectedStudent, handleChange, postData, putData }) {

    return (
        <>
            <Modal isOpen={isModalOpen}>
                <ModalHeader>{payload.action === 'edit' ? "Edit" : "Add"} Student</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        {payload.action === 'edit' &&
                            <>
                                <label>Id: </label>
                                <br />
                                <input readOnly disabled type='text' name='name' value={payload.id} className='form-control' />
                                <br />
                            </>
                        }
                        <label>Name: </label>
                        <br />
                        <input type='text' name='name' value={selectedStudent.name} onChange={(e) => handleChange(e)} className='form-control' />
                        <br />
                        <label>Email: </label>
                        <br />
                        <input type='text' name='email' value={selectedStudent.email} onChange={(e) => handleChange(e)} className='form-control' />
                        <br />
                        <label>Age: </label>
                        <br />
                        <input type='text' name='age' value={selectedStudent.age} onChange={(e) => handleChange(e)} className='form-control' />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => payload.action === 'edit' ? putData(payload.id) : postData()}>Save</button>
                    <button className='btn btn-danger' onClick={() => toggleModal()}> Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalComponent
