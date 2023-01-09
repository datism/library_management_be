/* eslint-disable max-classes-per-file */
export class CustomError {
    code: number;
    data: any;
    message: string;
    customCode: number;

    constructor({
        code = 500,
        data = {},
        message = 'Error',
        customCode = 50000,
    }: {
        code: number,
        data?: any,
        message?: string,
        customCode?: number
    }) {
        this.code = code;
        this.data = data;
        this.message = message;
        this.customCode = customCode;
    }
}

export class BadRequest extends CustomError {
    constructor({
        data,
        message = 'Bad request',
    } : {
        data?: any,
        message?: string,
    } = {}) {
        super({
            data,
            message,
            code: 400,
            customCode: 40000
        })
    }
}

export class Unauthorized extends CustomError {
    constructor({
        data,
        message = 'Unauthorized',
    } : {
        data?: any,
        message?: string,
    } = {}) {
        super({
            data,
            message,
            code: 401,
            customCode: 40100
        })
    }
}

export class Forbidden extends CustomError {
    constructor({
        data,
        message
    } : {
        data?: any,
        message?: string
    } = {}) {
        super({
            data,
            message: message || "You don't have access to this resource",
            code: 403,
            customCode: 40300
        });
    }
}

export class NotFound extends CustomError {
    constructor({
        data,
        message
    } : {
        data?: any,
        message?: string
    } = {}) {
        super({
            data,
            message: message || 'Not found',
            code: 404,
            customCode: 40400
        });
    }
}

export class InternalServerError extends CustomError {
    constructor({
        data,
        message
    } : {
        data?: any,
        message?: string
    } = {}) {
        super({
            data,
            message: message || 'Internal Server Error',
            code: 500,
            customCode: 50000
        });
    }
}

export const isCustomError = (error: any): error is CustomError => !!error.customCode;
