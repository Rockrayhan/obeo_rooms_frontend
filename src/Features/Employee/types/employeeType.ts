// export interface EmployeeFormData {
//   employee: {
//     firstName: string;
//     middleName?: string;
//     lastName?: string;
//     maidenName?: string;
//     email: string;
//     phone: string;
//     altPhone?: string;
//     county?: string;
//     state?: string;
//     city?: string;
//     zipCode?: string;
//     username?: string;
//     password?: string;
//   };
//   personalInfo: {
//     fatherName: string;
//     motherName: string;
//     dateOfBirth: string; 
//     gender: string;
//     maritalStatus: string;
//     nationality: string;
//     religion: string;
//     bloodGroup: string;
//     nationalIdOrPassport: string;
//   };
// }




export type IEmployee = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  maidenName?: string;
  email: string;
  phone: string;
  altPhone?: string;
  county: string;
  state: string;
  city: string;
  zipCode: string;
  username: string;
  password: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  religion: string;
  bloodGroup: string;
  nationalIdOrPassport: string;
};