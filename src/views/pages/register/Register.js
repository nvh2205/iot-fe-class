import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const handleRegister = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.repeatPassword.value) {
      setError(true)
      return
    }
    setIsLoading(true)
    localStorage.setItem('user', JSON.stringify({ userName: e.target.username.value, isLogin: true }))
    // redirect to home page
    window.location.href = '/'
    setIsLoading(false)
  }


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" name='username' required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    {/* validate password match repeatPassword */}

                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      feedback="Password does not match"
                      required
                      invalid={error && true}
                    />
                  </CInputGroup>
                  <div className={!isLoading ? "d-grid" : "d-flex justify-content-center"}>
                    {isLoading ? <CSpinner className="m-auto" color="primary" /> :
                      <CButton type='submit' color="success"> Create Account</CButton>}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
