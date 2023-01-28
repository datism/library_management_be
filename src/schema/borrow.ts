export const CreateBorrowSchema = {
    subscriber: {
        in: ["body"],
        errorMessage: "Missing or invalid subscriber id",
        isMongoId: true,
    },
    copy: {
        in: ["body"],
        errorMessage: "Missing or invalid copy id",
        isMongoId: true,
    },
}

export const UpdateBorrowStatusSchema = {
    status: {
        in: ["body"],
        errorMessage: "Missing or invalid status",
        isIn: {
            options: [['inProgress', 'returned', 'lost', 'overdue']],
            errorMessage: "Invalid value for status",
        }
    }
}