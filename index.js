const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const Execution = require('./executionModel');

dotenv.config();


const { connectDB } = require('./db');
const Review = require('./ReviewModel');
// const path = require('path');

// const _dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.post("/api/save", async (req, res) => {
    try {
        const newExecution = new Execution(req.body);
        
        await newExecution.save();
        
        res.status(201).json({ message: "Execution saved successfully!", data: newExecution });
    } catch (error) {
        console.error("Error saving execution:", error);
        res.status(400).json({ message: "Failed to save execution", error: error.message });
    }
});

// app.get("/api/admin/executions", async (req, res) => {
//     try {
//         const executions = await Execution.find({}).sort({ createdAt: -1 });
//         res.status(200).json(executions);
//     } catch (error) {
//         console.error("Error fetching all executions:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

app.get("/api/admin/executions", async (req, res) => {
    try {
        const executions = await Execution.find({}).sort({ createdAt: -1 });

        // Map over the executions to format the date
        const formattedExecutions = executions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching all executions:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/api/admin/accepted", async (req, res) => {
    try {
        const acceptedExecutions = await Execution.find({ status: "Accepted" }).sort({ createdAt: -1 });

        const formattedExecutions = acceptedExecutions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching accepted executions:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/api/admin/rejected", async (req, res) => {
    try {
        const rejectedExecutions = await Execution.find({ status: "Rejected" }).sort({ createdAt: -1 });

        const formattedExecutions = rejectedExecutions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching rejected executions:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/api/admin/wrong", async (req, res) => {
    try {
        const rejectedExecutions = await Execution.find({ status: "Wrong Answer" }).sort({ createdAt: -1 });

        const formattedExecutions = rejectedExecutions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching rejected executions:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



app.get("/api/admin/email/:mailid", async (req, res) => {
    try {
        const { mailid } = req.params;
        const userExecutions = await Execution.find({ email: mailid }).sort({ createdAt: -1 });

        const formattedExecutions = userExecutions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching executions by email:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.get("/api/admin/room/:roomno", async (req, res) => {
    try {
        const { roomno } = req.params;
        const roomExecutions = await Execution.find({ room: roomno }).sort({ createdAt: -1 });

        const formattedExecutions = roomExecutions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching executions by room:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.get("/api/admin/winners/:roomno", async (req, res) => {
    try {
        const { roomno } = req.params;
        const winnerExecutions = await Execution.find({ room: roomno, status: "Accepted" });

        const formattedExecutions = winnerExecutions.map(execution => {
            const dateTimestamp = parseInt(execution.date, 10); // Convert string to number
            const dateObject = new Date(dateTimestamp);

            // Options for IST formatting
            const options = {
                timeZone: 'Asia/Kolkata', // IST timezone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false // Use 24-hour format
            };

            const istDateString = dateObject.toLocaleString('en-IN', options);

            return {
                ...execution.toObject(), // Convert Mongoose document to plain JavaScript object
                date: istDateString
            };
        });

        res.status(200).json(formattedExecutions);
    } catch (error) {
        console.error("Error fetching executions by room:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});










app.post("/api/reviews/save", async (req, res) => {
     try {
        const { email, name, rating, tags, comment } = req.body;

        // Backend validation: rating is mandatory
        if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'A valid star rating between 1 and 5 is required.' });
        }

        const newReview = new Review({
            email,
            name,
            rating,
            tags,
            comment,
        });

        const savedReview = await newReview.save();

        res.status(201).json({ 
            message: 'Feedback saved successfully!', 
            review: savedReview 
        });

    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Server error while saving feedback.' });
    }
});



app.get("/api/reviews/all", async (req, res) => {
     try {
        // Find all reviews and sort them by the 'submittedAt' field in descending order
        const reviews = await Review.find().sort({ submittedAt: -1 });
        
        res.status(200).json(reviews);

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error while fetching reviews.' });
    }
});









app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.use(express.static(path.join(_dirname, "/client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
// })

app.listen(PORT, async () => {
    console.log(`Server listening on Port: ${PORT}`);
    await connectDB();
    console.log("MongoDB connected successfully!");
});