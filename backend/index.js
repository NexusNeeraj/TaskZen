require("dotenv").config();

const connectDB = require("./config/db");
const mongoose = require("mongoose");

connectDB();


const User = require("./models/user_model");
const Note = require("./models/note_model");

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities"); 

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.post("/create-account", async (req, res) => {

    const { fullName, email, password } = req.body;

    if(!fullName){
        return res.status(400).json({error:true, message:"Full name is required"});
    }
    
    if(!email){
        return res.status(400).json({error:true, message:"Email is required"});
    } 
    
    if(!password){
        return res.status(400).json({error:true, message: "Password is required"});
    }

    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.status(400).json({error:true, message: "User already exists"});
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "User created successfully",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    if(!email){
        return res.status(400).json({error:true, message:"Email is required"});
    }

    if(!password){
        return res.status(400).json({error:true, message: "Password is required"});
    }
    
    const userInfo = await User.findOne({email: email});
    
    if(!userInfo){
        return res.status(401).json({error:true, message: "User not found"});
    }

    if(userInfo.email === email && userInfo.password === password){
        const user = { user: userInfo };
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    
        return res.json({
            error: false,
            message: "Logged in successfully",
            email,
            accessToken,
        });
    } else{
        return res.status(400).json({error:true, message: "Invalid email or password"});
    }
});

//get user

app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user.user;
    console.log(req.user.user);
    console.log(user._id);
    const isUser = await User.findOne({_id: user._id});

    if(!isUser){
        return res.status(401).json({error:true, message: "User not found"});
    }
    
    return res.json({
        user:{
            fullName: isUser.fullName,
            email: isUser.email,
            _id: isUser._id,
            createdOn: isUser.createdOn,
        },
        message: "",
    });
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user.user;

    console.log(user);

    if(!title){
        return res.status(400).json({error:true, message:"Title is required"});
    }
    
    if(!content){
        return res.status(400).json({error:true, message:"Content is required"});
    } 

    try {
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// edit notes

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user.user;

    if(!title && !content && !tags) {
        return res.status(400).json({error:true, message:"No changes provided."});
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(404).json({error:true, message: "Note not found"});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }

});

// get All notes

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user.user;

    try {
        const notes = await Note.find({ userId: user._id 
        }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "Notes fetched successfully",
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user.user;

    try {
        const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(404).json({error:true, message: "Note not found"});
        }

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// update isPinned value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({error:true, message: "Note not found"});
        }

        note.isPinned = isPinned || false;

        await note.save();
        
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error) {
        return res.json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// search notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user.user;
    const { query } = req.query;

    if(!query){
        return res.status(400).json({
            error: true,
            message:'Search query is required'
        });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, 'i') } },
                { content: { $regex: new RegExp(query, 'i') } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;