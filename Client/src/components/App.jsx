import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HeadDoctorInfoBlock from './user/HeadDoctorInfoBlock';
import HospitalInfoBlock from './user/HospitalInfoBlock';
import AddHeadOfDepartmentBlock from './user/AddHeadOfDepartmentBlock';
import AssignHeadOfDepartmentBlock from './user/AssignHeadOfDepartmentBlock';
import AddSpecialtyBlock from './user/AddSpecialtyBlock';
import ShowHeadsOfDepartmentsBlock from './user/ShowHeadsOfDepartmentsBlock';
import ShowDepartmentsBlock from './user/ShowDepartmentsBlock';
import HeadOfDepartmentInfoBlock from './user/HeadOfDepartmentInfoBlock';
import AddDoctorBlock from './user/AddDoctorBlock';
import ShowDoctorsBlock from './user/ShowDoctorsBlock';
import DoctorInfoBlock from './user/DoctorInfoBlock';
import AddPatientBlock from './user/AddPatientBlock';
import AssignTreatmentBlock from './user/AssignTreatmentBlock';
import ShowPatientsBlock from './user/ShowPatientsBlock';
import ShowHistoryOfIllnessesBlock from './user/ShowHistoryOfIllnessesBlock';
import DepartmentInfoBlock from './user/DepartmentInfoBlock';
import PatientInfoBlock from './user/PatientInfoBlock';
import ShowPatientsHistoryOfIllnessesBlock from './user/ShowPatientsHistoryOfIllnessesBlock';
import ShowCurrentTreatmentBlock from './user/ShowCurrentTreatmentBlock';
import RequireAuth from './RequireAuth';
import Logoff from './Logoff';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/headdoctor">
        <Route
          path="me"
          element={
            <RequireAuth>
              <HeadDoctorInfoBlock />
            </RequireAuth>
          }
        />
        <Route
          path="hospital"
          element={
            <RequireAuth>
              <HospitalInfoBlock />
            </RequireAuth>
          }
        />
        <Route path="add">
          <Route
            path="headofdepartment"
            element={
              <RequireAuth>
                <AddHeadOfDepartmentBlock />
              </RequireAuth>
            }
          />
          <Route
            path="specialty"
            element={
              <RequireAuth>
                <AddSpecialtyBlock />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="assignHeadOfDepartment"
          element={
            <RequireAuth>
              <AssignHeadOfDepartmentBlock />
            </RequireAuth>
          }
        />
        <Route path="show">
          <Route
            path="headsofdepartments"
            element={
              <RequireAuth>
                <ShowHeadsOfDepartmentsBlock />
              </RequireAuth>
            }
          />
          <Route
            path="departments"
            element={
              <RequireAuth>
                <ShowDepartmentsBlock />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
      <Route path="/headofdepartment">
        <Route
          path="me"
          element={
            <RequireAuth>
              <HeadOfDepartmentInfoBlock />
            </RequireAuth>
          }
        />
        <Route
          path="department"
          element={
            <RequireAuth>
              <DepartmentInfoBlock />
            </RequireAuth>
          }
        />
        <Route path="add">
          <Route
            path="doctor"
            element={
              <RequireAuth>
                <AddDoctorBlock />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="show">
          <Route
            path="doctors"
            element={
              <RequireAuth>
                <ShowDoctorsBlock />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
      <Route path="/doctor">
        <Route
          path="me"
          element={
            <RequireAuth>
              <DoctorInfoBlock />
            </RequireAuth>
          }
        />
        <Route path="add">
          <Route
            path="patient"
            element={
              <RequireAuth>
                <AddPatientBlock />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="assignTreatment"
          element={
            <RequireAuth>
              <AssignTreatmentBlock />
            </RequireAuth>
          }
        />
        <Route path="show">
          <Route
            path="patients"
            element={
              <RequireAuth>
                <ShowPatientsBlock />
              </RequireAuth>
            }
          />
          <Route
            path="historyOfIllnesses"
            element={
              <RequireAuth>
                <ShowHistoryOfIllnessesBlock />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
      <Route path="/patient">
        <Route
          path="me"
          element={
            <RequireAuth>
              <PatientInfoBlock />
            </RequireAuth>
          }
        />
        <Route path="show">
          <Route
            path="currentTreatment"
            element={
              <RequireAuth>
                <ShowCurrentTreatmentBlock />
              </RequireAuth>
            }
          />
          <Route
            path="historyOfIllnesses"
            element={
              <RequireAuth>
                <ShowPatientsHistoryOfIllnessesBlock />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
      <Route path="/logoff" element={<Logoff />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
