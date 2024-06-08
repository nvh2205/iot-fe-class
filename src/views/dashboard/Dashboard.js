
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import {
  cilOptions,
  cilPlaylistAdd,
} from "@coreui/icons";
import LoadingOverlay from "react-loading-overlay";

import axios from "axios";

const arrDevices = [
  {
    disabled: true,
    label: "Choose...",
    selected: true,
  },
  {
    label: "Theo Dõi Không Khí",
    value: JSON.stringify({
      AEQ: "12u.g/m3",
    }),
  },
  {
    label: "Theo Dõi Nhiệt Độ",
    value: JSON.stringify({
      temperature: "12°C",
    }),
  },
];

const Dashboard = (props) => {
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleA, setVisibleA] = useState(false);

  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);

  const [device, setDevice] = useState(null);

  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor =
            getStyle("--cui-primary");
          widgetChartRef1.current.update();
        });
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor =
            getStyle("--cui-info");
          widgetChartRef2.current.update();
        });
      }
    });
  }, [widgetChartRef1, widgetChartRef2]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        // const userId = localStorage.getItem("userId");
        const userId = "1086ae96-6dfc-4f9a-9b02-2abd46bbe767";
        const res = await axios.get(`${process.env.API}/device/user/${userId}`);
        setDevices(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getDevices();
  }, []);

  const postDevice = async (data) => {
    try {
      const res = await axios.post(`${process.env.API}/device`, data);
      return res.data;
    } catch (error) {}
  };

  const putDevice = async (id, data) => {
    try {
      const res = await axios.put(`${process.env.API}/device/${id}`, data);
      return res.data;
    } catch (error) {}
  };

  const deleteDevice = async (id) => {
    try {
      const res = await axios.delete(`${process.env.API}/device/${id}`);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVisible(false);
    // const data = new FormData(e.target);
    // postDevice(data);
    // get value from form
    const data = {
      name: e.target.name.value,
      metadata: JSON.parse(e.target.metadata.value),
      info: "example",
      userId: "1086ae96-6dfc-4f9a-9b02-2abd46bbe767",
    };
    // console.log(e.target.metadata);
    const res = await postDevice(data);
    if (res) {
      setDevices([...devices, res]);
    }
    setLoading(false);
  };

  const handleSubmitA = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVisibleA(false);
    // const data = new FormData(e.target);
    // postDevice(data);
    // get value from form
    const data = {
      ...device,
      name: e.target.name.value,
      userId: "1086ae96-6dfc-4f9a-9b02-2abd46bbe767",
    };
    // console.log(e.target.metadata);
    const res = await putDevice(device.id, data);
    if (res) {
      const newDevices = devices.map((device) => {
        if (device.id === res.id) {
          return res;
        }
        return device;
      });
      setDevices(newDevices);
    }
    setLoading(false);
  };

  const handleClick = (value) => {
    setVisibleA(true);
    setDevice(value);
  };

  const handleDelete = async () => {
    setVisibleA(false);
    setLoading(true);
    await deleteDevice(device.id);
    const newDevices = devices.filter((item) => item.id !== device.id);
    console.log(newDevices, "newDevices");
    setDevices(newDevices);
    setLoading(false);
  };

  return (
    <CRow className="mb-4" xs={{ gutter: 4 }}>
      <LoadingOverlay active={loading} spinner text=""></LoadingOverlay>
      {/* Modal */}
      <CModal
        alignment="center"
        visible={visibleA}
        onClose={() => setVisibleA(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CForm onSubmit={handleSubmitA}>
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">
              Update Device
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Tên Thiết Bị"
              placeholder="Example....."
              aria-describedby="exampleFormControlInputHelpInline"
              defaultValue={device?.name || ""}
              name="name"
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => handleDelete()}>
              Xoá
            </CButton>
            <CButton color="primary" type="submit">
              Lưu
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* modal create */}
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">
              Create Device
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Tên Thiết Bị"
              placeholder="Example....."
              aria-describedby="exampleFormControlInputHelpInline"
              name="name"
              required
            />

            <CFormSelect
              className="mt-3"
              options={arrDevices}
              name="metadata"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      {devices.map((device, index) => (
        <CCol sm={6} xl={4} xxl={3}>
          <CCard style={{ width: "18rem" }} className="bg-info">
            <CCardBody>
              <CCardTitle
                className="d-flex justify-content-between
       align-items-center fs-5 "
              >
                {device.name}
                <CButton
                  color=""
                  onClick={() => {
                    handleClick({
                      id: device.id,
                      name: device.name,
                      metadata: device.metadata,
                      info: device.info,
                    });
                  }}
                >
                  {" "}
                  <CIcon icon={cilOptions} />
                </CButton>
              </CCardTitle>
              <CCardText>
                <div className="card-body row text-center">
                  {Object.keys(device.metadata).map((key, index) => (
                    <>
                      <div className="col" key={index}>
                        <div className="fs-5 fw-semibold">
                          {device.metadata[key]}
                        </div>
                        <div className="text-uppercase text-body-secondary small">
                          {key}
                        </div>
                      </div>
                      {index !== Object.keys(device.metadata).length - 1 && (
                        <div className="vr"></div>
                      )}
                    </>
                  ))}
                </div>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
      <CCol
        sm={6}
        xl={4}
        xxl={3}
        className="d-flex justify-content-center
 align-items-center"
      >
        <CCard style={{ width: "18rem" }} className="">
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
                <CIcon icon={cilPlaylistAdd} className="mr-2" /> Tạo Mới Thiết
                Bị
              </CButton>
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};


export default Dashboard;
