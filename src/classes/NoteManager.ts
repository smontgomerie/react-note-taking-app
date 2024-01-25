import { v4 as uuidV4 } from 'uuid';
import {NoteData, RawNote} from "./Note";

export class NoteManager {
    private notes: RawNote[];

    constructor(initialNotes: RawNote[]) {
        this.notes = initialNotes;
    }

    createNote(noteData: NoteData): RawNote {
        const newNote: RawNote = { ...noteData, id: uuidV4(), tagIds: noteData.tags.map(tag => tag.id) };
        this.notes.push(newNote);
        return newNote;
    }

    updateNote(id: string, updatedData: NoteData): void {
        this.notes = this.notes.map(note =>
            note.id === id ? { ...note, ...updatedData } : note
        );
    }

    deleteNote(id: string): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }

    getNotes(): RawNote[] {
        return this.notes;
    }
}
