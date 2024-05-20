import { type CoreDto, ValidationError, type ValidationType, ZERO } from '../../../common';

export class GetTodoByIdDto implements CoreDto<GetTodoByIdDto> {
	constructor(public readonly id: number) {
		this.validate(this);
	}

	public validate(dto: GetTodoByIdDto): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid number' });
		}

		if (errors.length > ZERO) throw new ValidationError(errors);
	}
}
