import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const PatientSchema = mongoose
  .Schema(
    {
      patientId: {
        type: String,
        // required: true,
      },
      firstName: {
        type: String,
        required: true,
        //   unique: true,
      },
      healthCenterId: {
        type: String,
        // required: true,
        //   unique: true,
      },
      lastName: {
        type: String,
        required: true,
        //   unique: true,
      },
      nickname: {
        type: String,
        // required: true,
      },
      dateOfBirth: {
        type: Date,
        // enum: [0, 1],
        // default: "patient",
      },
      gender: {
        type: String,
      },
      spPHA: {
        type: Boolean,
        default: false,
      },
      spPWSUD: {
        type: Boolean,
        default: false,
      },
      spPESW: {
        type: Boolean,
        default: false,
      },
      spCovid: {
        type: Boolean,
        default: false,
      },
      type: {
        type: Boolean,
        default: false,
        // enum: [0, 1],
        // default: 0,
      },
      biologicalGender: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: false,
      },
      genderIndentity: {
        type: String,
        enum: [
          "Cis Male",
          "Cis Female",
          "Transgender Man",
          "Transgender Woman",
          "Non Binary",
          "Other",
        ],
        required: false,
      },
      sexualOrientation: {
        type: String,
        enum: [
          "HeteroSexual",
          "Lesbian / Gay",
          "Bisexual",
          "Something else",
          "Don't know",
        ],
        required: false,
      },
      race: {
        type: String,
        enum: [
          "American Indian or Alaska Native",
          "Asian",
          "Black or African American",
          "Native Hawaiian",
          "Other Pacific Islander",
          "White",
        ],
        required: false,
      },
      ethnicity: {
        type: String,
        enum: [
          "No, not of Hispanic, Latino/a, or Spanish origin",
          "Yes, Mexican, Mexican American, Chicano/a",
          "Yes, Puerto Rican",
          "Yes, Cuban",
          "Yes, Central or South American",
          "Yes, Another Hispanic, Latino/a or Spanish origin",
        ],
        required: false,
      },
      contactPhone: {
        type: String,
        // required: true,
      },
      contactEmail: {
        type: String,
        // required: true,
      },
      contactNickName: {
        type: String,
        // required: true,
      },
      contactPrefferedMethod: {
        type: String,
        // required: true,
      },
      contactAddress1: {
        type: String,
        // required: true,
      },
      location: {
        type: String,
        // required: true,
      },
      contactCity: {
        type: String,
        // required: true,
      },
      contactState: {
        type: String,
        // required: true,
      },
      contactZipCode: {
        type: String,
        // required: true,
      },
      // insuranceName: {
      //   type: String,
      //   required: true,
      // },
      location: {
        type: String,
        // required: true,
      },
      organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
    },
    {
      timestamps: true,
    }
  )
  .index({
    firstName: "text",
    lastName: "text",
    nickname: "text",
    patientId: "text",
  });

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
