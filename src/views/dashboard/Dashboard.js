
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
  CFormSwitch,
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

        setDevices([
          {
            "id": "7f683321-cc0f-4c5f-920b-369dae5eed20",
            "name": "Device 2",
            "info": "",
            "metadata": {
              "humidity": "84%",
              "temperature": "29°C"
            },
            "user_id": "1086ae96-6dfc-4f9a-9b02-2abd46bbe767",
            "garden_id": "b2e8d7b2-cfc4-4ced-9824-cf0ad1ab41c7"
          },
          {
            "id": "6b9ba63b-f3da-4ddd-8edb-7b7ddb1c64e1",
            "name": "test",
            "info": "example",
            "metadata": {
              "temperature": "12°C"
            },
            "user_id": "1086ae96-6dfc-4f9a-9b02-2abd46bbe767",
            "garden_id": null
          }
        ]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getDevices();
  }, []);

  const postDevice = async (data) => {

  };

  const putDevice = async (id, data) => {

  };

  const deleteDevice = async (id) => {

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {

    };

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

    setDevices(newDevices);
    setLoading(false);
  };

  return (
    <CRow className="mb-4" xs={{ gutter: 4 }}>
      <LoadingOverlay active={loading} spinner text=""></LoadingOverlay>
      {/* Modal update */}
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
              id="name"
              label="Tên Thiết Bị"
              placeholder="Example....."
              aria-describedby="exampleFormControlInputHelpInline"
              defaultValue={device?.name || ""}
              name="name"
              required
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="code"
              label="Mã code thiết bị"
              placeholder="Example....."
              aria-describedby="exampleFormControlInputHelpInline"
              defaultValue={device?.name || ""}
              name="name"
              required
              className="mb-3"
            />

            <CFormSwitch size="xl" label="Chế độ tự động" id="auto-button" />

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
                <div className="d-flex align-items-center gap-3">
                  <p className="mb-0">{device.name}</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
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
                      {index !== Object.keys(device.metadata).length - 1 && <div className="vr"></div>}
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
