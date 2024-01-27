import "bootstrap/dist/css/bootstrap.min.css"
import {useEffect, useRef, useState} from "react"
import {Container} from "react-bootstrap"
import {Navigate, Route, Routes} from "react-router-dom"
import {NewNote} from "./NewNote"
import {useLocalStorage} from "./useLocalStorage"
import {NoteList} from "./NoteList"
import {NoteLayout} from "./NoteLayout"
import {Note} from "./Note"
import {EditNote} from "./EditNote"
import {NoteManager} from "./classes/NoteManager";
import {TagManager} from "./classes/TagManager";
import {Tag} from "./classes/Tag";
import {NoteData, RawNote} from "./classes/Note";


function App() {
  const [rawNotes, setRawNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [rawTags, setRawTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteManager = useRef(new NoteManager(rawNotes)).current;
  const tagManager = useRef(new TagManager(rawTags)).current;

  useEffect(() => {
    noteManager.setNotes(rawNotes);
    // Optionally, trigger a state update if needed
  }, [rawNotes]);

  useEffect(() => {
    tagManager.setTags(rawTags);
    // Optionally, trigger a state update if needed
  }, [rawTags]);


  // Handlers for notes
  const onCreateNote = (noteData: NoteData) => {
    noteManager.createNote(noteData);
    setRawNotes(noteManager.getNotes());
  };

  const onUpdateNote = (id: string, noteData: NoteData) => {
    noteManager.updateNote(id, noteData);
    setRawNotes(noteManager.getNotes());
  };

  const onDeleteNote = (id: string) => {
    noteManager.deleteNote(id);
    setRawNotes(noteManager.getNotes());
  };

  // Handlers for tags
  const addTag = (tag: Tag) => {
    tagManager.addTag(tag);
    setRawTags(tagManager.getTags());
  };

  const updateTag = (id: string, label: string) => {
    tagManager.updateTag(id, label);
    setRawTags(tagManager.getTags());
  };

  const deleteTag = (id: string) => {
    tagManager.deleteTag(id);
    setRawTags(tagManager.getTags());
  };

  const notesWithTags = noteManager.getNotes().map(note => {
    return { ...note, tags: tagManager.getTags().filter(tag => note.tagIds.includes(tag.id)) };
  });



  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tagManager.getTags()}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
              onAddTag={addTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tagManager.getTags()}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tagManager.getTags()}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
