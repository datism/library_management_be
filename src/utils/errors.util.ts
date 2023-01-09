// TODO: Refactor this method to src/error and remove this file
export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}