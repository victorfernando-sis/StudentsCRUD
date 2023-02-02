import './App.css';
import { FiUsers } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ModalComponent from './componets/ModalComponent';
import DeleteComponent from './componets/DeleteComponent';

function App() {

  const [baseUrl, setBaseUrl] = useState("https://localhost:7247/api/students");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [action, setAction] = useState({ action: '', id: '' });

  const [selectedStudent, setSelectedStudent] = useState({})

  const toggleModal = (payload) => {
    setIsModalOpen(prev => !prev)
    payload && setAction(payload)
  }
  const togglePopup = (payload) => {
    setIsPopupOpen(prev => !prev)
    payload && setAction(payload)
  }

  const getStudentById = (id) => {
    setSelectedStudent(...data.filter(value => value.studentId === id))
    toggleModal({ action: 'edit', id: id })
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setSelectedStudent(prev => ({ ...prev, [name]: value }))
  }

  const getData = async () => {
    await axios.get(baseUrl)
      .then(res => setData(res.data))
      .catch(error => error)
  }

  const postData = async () => {
    delete selectedStudent.id;
    // console.log("data:", selectedStudent)
    selectedStudent.age = parseInt(selectedStudent.age);
    await axios.post(baseUrl, selectedStudent)
      .then(res => {
        setData(data.concat(res.data));
        toggleModal();
      }).catch(error => {
        console.log(error);
      })

    await axios.get(baseUrl)
      .then(res => setData(res.data))
      .catch(error => error)
  }

  const putData = async (id) => {
    await axios.put(`${baseUrl}/${id}`, selectedStudent)
      .then(res => {
        getData();
        toggleModal();
      }).catch(error => {
        console.log(error);
      })
  }

  const deleteData = async () => {
    if (action.action === 'delete') {
      await axios.delete(`${baseUrl}/${action.id}`)
        .then(res => {
          getData();
          togglePopup();
        }).catch(error => {
          console.log(error)
        })
    }
  }

  console.log(selectedStudent)

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
      {<ModalComponent
        selectedStudent={selectedStudent}
        handleChange={(e) => handleChange(e)}
        postData={() => postData()}
        putData={putData}
        payload={action}
        isModalOpen={isModalOpen}
        toggleModal={() => toggleModal()}
      />}
      {<DeleteComponent
        isPopupOpen={isPopupOpen}
        deleteData={deleteData}
        togglePopup={togglePopup} />}

      <h3>Student List</h3>
      <header>
        <FiUsers className='add_icon' />
        <button className='btn btn-success' onClick={() => toggleModal({ action: 'add', id: null })} >Add New Student</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => getStudentById(student.studentId)} >Edit</button>
                <button className='btn btn-danger' onClick={() => togglePopup({ action: 'delete', id: student.studentId })} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
