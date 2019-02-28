import { Injectable } from '@angular/core';
import {NoteService} from './note.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private noteService:NoteService
  ) {
    const notes = window.localStorage.getItem("notes-wall.notes")
    if(notes){
      this.noteService.notes = JSON.parse(notes)
    }
    else {
      this.noteService.addNote('Review new paper', 'A new ACL paper is worth to read', 200, 200,"lightyellow");
      this.noteService.addNote('Watch Movie with Hannah', 'Hannah wants to see atali battle angel this weekend', 500, 500, "lightblue");
      this.noteService.addNote('Cook Meal', 'Cook Meal for Hannah tonight with lamb from Costco', 900, 560);
      this.save()
    }
  }

  save(){
    window.localStorage.setItem("notes-wall.notes",JSON.stringify(this.noteService.notes))
    console.log("reach");
  }
}
