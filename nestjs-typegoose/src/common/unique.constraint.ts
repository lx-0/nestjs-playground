import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    console.log({ args });
    // get records that equal the `email` value from DB.
    // If exist the `email` value in target table, return false. (unique validation error)
    return true;
  }
}
