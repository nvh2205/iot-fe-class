import React from "react";
import classNames from "classnames";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCardText,
  CRow,
  CButton,
  CModal,
  CForm,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CModalFooter,
  CFormSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilXCircle, cilPlaylistAdd } from "@coreui/icons";
const Garden = () => {
  const progressGroupExample1 = [
    { title: "Máy lọc không khí" },
    { title: "Máy bơm tự dộng" },
  ];

  const [visible, setVisible] = React.useState(false);

  const handleSubmitA = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <CRow>
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CForm onSubmit={handleSubmitA}>
            <CModalHeader>
              <CModalTitle id="VerticallyCenteredExample">
                Add Garden
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                label="Tên Khu Vườn"
                placeholder="Example....."
                aria-describedby="exampleFormControlInputHelpInline"
                defaultValue={""}
                name="name"
                required
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">
                Lưu
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Khu vườn 1</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">
                          Địa chỉ
                        </div>
                        <div className="fs-5 fw-semibold">
                          Hai Bà Trưng - Hà Nội
                        </div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Nhiệt Độ
                        </div>
                        <div className="fs-5 fw-semibold">24°C - 30°C</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Độ Ẩm
                        </div>
                        <div className="fs-5 fw-semibold">78%</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Lượng Mưa
                        </div>
                        <div className="fs-5 fw-semibold">49mm</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                </CCol>

                <CCol>
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div style={{ flex: "0 0 300px", alignSelf: "center" }}>
                        <span className="text-body-secondary">
                          {item.title}
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="">
                          <div className="text-body-secondary text-truncate small">
                            Chỉ số
                          </div>
                          <div className="fs-5 fw-semibold">49mm</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-4">

                      <CFormSwitch size="xl" label="" id="on_off" />

                        <CButton color="danger" variant="outline" size="smaill">
                          <CIcon icon={cilXCircle} />
                        </CButton>


                      </div>
                    </div>
                  ))}

                  {/* add div for button add  */}
                  <div className="d-flex justify-content-center">
                    <CButton color="info" variant="outline" size="lg">
                      <CIcon icon={cilPlaylistAdd} />
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <CCard
            style={{ width: "18rem" }}
            className="d-flex justify-content-center
 align-items-center m-auto"
          >
            <CCardBody>
              <CCardText
                className="d-flex justify-content-center
 align-items-center"
              >
                <CButton
                  color="info"
                  variant="outline"
                  size="lg"
                  onClick={() => setVisible(true)}
                >
                  <CIcon icon={cilPlaylistAdd} className="mr-2" /> Tạo Khu Vườn
                </CButton>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Garden;
