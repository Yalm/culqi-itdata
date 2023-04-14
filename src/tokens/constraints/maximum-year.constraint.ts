import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'maximumYear', async: false })
export class MaximumYear implements ValidatorConstraintInterface {
  validate(year: string) {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 5);
    return currentDate.getFullYear() >= parseInt(year, 10);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not be more than 5 years from the current one`;
  }
}
