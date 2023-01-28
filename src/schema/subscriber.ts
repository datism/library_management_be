export const CreateSubscriberSchema = {
    name: {
        in: ["body"],
        errorMessage: "Missing or invalid name",
        isString: true,
    },
    email: {
        in: ["body"],
        errorMessage: "Missing or invalid email",
        isEmail: true,
    },
    phone: {
        in: ["body"],
        errorMessage: "Missing or invalid phone number",
        isString: true,
        optional: true,
    },
}