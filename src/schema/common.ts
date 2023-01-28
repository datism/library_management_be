export const RequiredMongoIdSchema = {
    id: {
        in: ["params"],
        errorMessage: "Missing or invalid mongo object id",
        isMongoId: true,
    },
}