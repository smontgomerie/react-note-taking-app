import {SimplifiedNote} from "../NoteList";
import {Tag} from "./Tag";

class FilterManager {
    static filterNotes(notes: SimplifiedNote[], title: string, selectedTags: Tag[]): SimplifiedNote[] {
        return notes.filter(note => {
            return (
                (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
            );
        });
    }
}
