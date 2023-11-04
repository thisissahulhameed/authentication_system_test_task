import * as emailValidator from "email-validator";
import * as passwordValidator from "password-validator";

export const validateEmail = (email) => {
  if (emailValidator.validate(email)) {
    return true;
  } else {
    return false;
  }
};


const passSchema = new passwordValidator();

passSchema
  .is().min(8)
  .has().uppercase() 
  .has().lowercase()
  .has().digits(2)     
  .has().symbols(1)                     

export const validatePass=(password)=>{
  console.log(passSchema.validate(password),"the validatio")
  return passSchema.validate(password)
}