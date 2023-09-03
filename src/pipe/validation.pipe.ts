import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata):Promise<any> {
    if (metadata.type === 'param' && metadata.data === 'id') {
      const id = +value;
      if (isNaN(id) || id <= 0) {
        throw new BadRequestException(`Invalid id: ${value}`);
      }
      return id;
    }

    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      let messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(
          ', |'
        )}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}