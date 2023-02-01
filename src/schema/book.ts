export const CreateBookSchema = {
    title: {
        in: ["body"],
        errorMessage: "Missing or invalid title",
        isString: true,
    },
    description: {
        in: ["body"],
        errorMessage: "Missing or invalid description",
        isString: true,
    },
    category: {
        in: ["body"],
        errorMessage: "Missing or invalid category",
        isIn: {
            options: [['Essays', 'Case Studies', 'Syllabus', 'Thesis']],
            errorMessage: "Invalid value for category",
        }
    },
    type: {
        in: ["body"],
        errorMessage: "Missing or invalid type",
        isIn: {
            options: [["Art", "Language", "Literature", "Gymnastics", 'Physics', 'Chemistry', 'Biology', 'Math', 'History']],
            errorMessage: "Invalid value for type",
        }
    },
    author: {
        in: ["body"],
        errorMessage: "Missing or invalid author",
        isString: true,
    },
    publisher: {
        in: ["body"],
        errorMessage: "Missing or invalid publisher",
        isString: true,
    },
    publisherDate: {
        in: ["body"],
        errorMessage: "Missing or invalid publisher date",
        isDate: true,
        optional: true,
    }
    // No need validation for file uploading since it is validated on multer uploading
}