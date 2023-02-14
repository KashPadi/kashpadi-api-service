import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import noteTypes from './note.types';
import { INoteDoc, INoteModel } from './note.interface';

const noteSchema = new mongoose.Schema<INoteDoc, INoteModel>(
  {
    denomination: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    redeemDate: {
      type: Date,
    },
    redeemed: {
      type: Boolean,
      default: false,
    },
    visibilty: {
      type: String,
      enum: [noteTypes.PUBLIC, noteTypes.PRIVATE],
      required: true,
    },
    noteId: {
      type: String,
      required: true,
    },
    bundleId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
noteSchema.plugin(toJSON);

const Note = mongoose.model<INoteDoc, INoteModel>('note', noteSchema);

export default Note;
