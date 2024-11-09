const asyncWrapper = require('../middlewares/async')
const { StatusCodes } = require('http-status-codes');
const {NotFoundError, BadRequestError} = require('../errors')
const Notes = require('../models/notes')

const getAllNotes = asyncWrapper(async(req, res, next) => {
    const {userId} = req.user
    const notes = await Notes.find({createdBy:userId})
    res.status(StatusCodes.OK).json({notes, nhits:notes.length})
})

const createNote = asyncWrapper(async(req, res, next) => {
    // console.log(req.body)
    const {userId} = req.user
    const {title, description, tag} = req.body
    const newNote = {
        title:title,
        description:description,
        tag:tag,
        createdBy:userId
    }
    const note = await Notes.create(newNote)
    res.status(StatusCodes.CREATED).json({note})
})

const getNote = asyncWrapper(async(req, res, next) => {
    const {userId} = req.user
    const { id:noteID } = req.params
    const note = await Notes.findOne({createdBy:userId, _id:noteID }) 
    if (!note){
        throw new NotFoundError(`No note with id ${noteID}`)
    }
    res.status(StatusCodes.OK).json({note})
})

const updateNote = asyncWrapper(async(req, res, next) => {
    const {userId} = req.user
    const { id:noteID } = req.params
    const {title, description, tag} = req.body
    if(title === '' || description === ''){
        throw new BadRequestError('title or description fields cannot be empty')
    }
    const updatedNote = {
        title:title,
        description:description,
        tag:tag
    }
    const note = await Notes.findOneAndUpdate({createdBy:userId, _id:noteID }, updatedNote, {
        new:true,
        runValidators:true
    })
    if (!note){
        throw new NotFoundError(`No note with id ${noteID}`)
    }
    res.status(StatusCodes.OK).json({ note })
})

const deleteNote = asyncWrapper(async(req, res, next) => {
    const {userId} = req.user
    const { id:noteID } = req.params
    const note = await Notes.findOneAndDelete({createdBy:userId, _id:noteID })
    if (!note){
        throw new NotFoundError(`No note with id ${noteID}`)
    }
    console.log(note)
    res.status(StatusCodes.OK).json({note})
})

module.exports = {getAllNotes, createNote, getNote, updateNote, deleteNote}