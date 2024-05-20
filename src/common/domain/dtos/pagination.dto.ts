import { ValidationError, ZERO, type ValidationType } from '../../index';
import { type CoreDto } from './core.dto';

export class PaginationDto implements CoreDto<PaginationDto> {
	constructor(
		public readonly page: number,
		public readonly limit: number
	) {
		this.validate(this);
	}

	public validate(dto: PaginationDto): void {
		const errors: ValidationType[] = [];

		if (isNaN(dto.page) || isNaN(dto.limit)) {
			errors.push({ fields: ['page', 'limit'], constraint: 'Page and limit must be numbers' });
		}

		if (dto.page <= ZERO) {
			errors.push({ fields: ['page'], constraint: 'Page must be greater than zero' });
		}

		if (dto.limit <= ZERO) {
			errors.push({ fields: ['limit'], constraint: 'Limit must be greater than zero' });
		}

		if (errors.length > ZERO) throw new ValidationError(errors);
	}
}
