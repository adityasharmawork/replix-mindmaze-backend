const mongoose = require('mongoose');

const { Schema } = mongoose;

const executionSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        room: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        executionSuccessful: {
            type: Boolean,
            required: true
        },
        error: {
            type: String
        },
        status: {
            type: String,
            enum: ["Accepted", "Rejected", "Wrong Answer", "Error"],
            required: true
        },
        output: {
            type: String
        },
        expectedoutput: {
            type: String
        },
        code: {
            type: String
        },
        language: {
            type: String
        },
        date: {
            type: String
        },
        testCasesPassed: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

const Execution =  mongoose.model("Execution", executionSchema);

module.exports = Execution;