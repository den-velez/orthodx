import DoctorHeaderComponent from "@/components/headers/doctorHeaderComponent";
import PatientHeaderComponent from "@/components/headers/patientHeaderComponent";

const DoctorPage = () => {
  return (
    <main>
      <DoctorHeaderComponent />
      <h1 className='text-h1 text-white'>Doctor Page</h1>
      <PatientHeaderComponent />
    </main>
  );
};

export default DoctorPage;
