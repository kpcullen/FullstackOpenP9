import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientServices from '../../services/patients';
import diagnosisServices from '../../services/diagnoses';
import { Diagnosis, Entry, EntryFormValues, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PatientEntries from '../PatientEntries/PatientEntries';
import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const PatientInfo = () => {
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [diagnosesDescriptions, setDiagnosesDescriptions] = useState<
    Diagnosis[]
  >([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    if (typeof id === 'string') {
      const getPatientAndDiagnoses = async () => {
        const patient = await patientServices.getPatient(id);
        setPatientInfo(patient);
        setEntries(patient.entries);
        const diagnoses = await diagnosisServices.getAll();
        setDiagnosesDescriptions(diagnoses);
      };
      void getPatientAndDiagnoses();
    }
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      throw new Error('Unexpected error');
    }
    try {
      const newEntry = await patientServices.addEntry(values, id);
      setEntries([...entries, newEntry]);
      setModalOpen(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);

          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patientInfo) return null;

  return (
    <div>
      <h1>
        {patientInfo.name}{' '}
        {patientInfo.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h1>

      <div>SSN: {patientInfo.ssn}</div>
      <div>Occupation: {patientInfo.occupation}</div>
      <PatientEntries
        patientEntries={entries}
        diagnosesDescriptions={diagnosesDescriptions}
      />
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        diagnosesDescriptions={diagnosesDescriptions}
      />
      <Button onClick={openModal} variant="contained" color="primary">
        Add new entry
      </Button>
    </div>
  );
};

export default PatientInfo;
