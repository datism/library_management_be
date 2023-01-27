export const CreateCopySchema = {
    book: {
        in: ["body"],
        errorMessage: "Missing or invalid book id",
        isMongoId: true,
    },
}

export const UpdateCopyStatusSchema = {
    status: {
        in: ["body"],
        errorMessage: "Missing or invalid status",
        isIn: {
            options: [['available', 'pending', 'borrowed', 'lost']],
            errorMessage: "Invalid value for status",
        }
    }
}