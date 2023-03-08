import { Router } from "express";
import PatientController from "./patientController";

const patientControllerB = new PatientController();
const router = Router();

console.log(patientControllerB, "am i yours?");

router.get("/patient/", patientControllerB.getPatient);
// // router.route('/pa').get(patientControllerB)
// router.post('/create-patient', PatientController.createPatient)

export default router;
