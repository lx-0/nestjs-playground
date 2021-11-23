import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueConstraint } from './unique.constraint';

export function Unique(
  callback: (value: unknown) => Promise<boolean>,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    if (typeof object !== 'object' || object === null) {
      return;
    }
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraint,
    });
  };
}
