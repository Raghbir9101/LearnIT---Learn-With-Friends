import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import SubjectList from '../Subjects/Subjects'
import QuestionPage from '../Questions/Questions'
import { Context } from '../Context/Context'

function AllRoutes() {
  const { loginUserName } = useContext(Context)
  return (
    <Routes>
      <Route path='/' element={<Login></Login>} />
      <Route path='/subject' element={!loginUserName ? <Navigate to={"/"}/> : <SubjectList></SubjectList>} />
      <Route path='/subject/:subjectID' element={!loginUserName ? <Navigate to={"/"}/> : <QuestionPage></QuestionPage>} />
    </Routes>
  )
}

export default AllRoutes