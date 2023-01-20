export const AuthSchema = {
    name: {
        in: ["body"],
        errorMessage: "Invalid name.",
        isString: true,
    },
    password: {
        in: ["body"],
        errorMessage: "Invalid password.",
        isString: true,
    }
}

