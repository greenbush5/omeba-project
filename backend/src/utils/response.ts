import { StatusCodes } from 'http-status-codes';

export default function createResponse(value: any, code: StatusCodes, success: boolean) {
	return { value, code, success };
}