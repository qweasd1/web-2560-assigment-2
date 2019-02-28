import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = [];

  constructor() {
  }

  addNote(title: string, content: string, left: number, top: number, color:string= "white") {
    this.notes.push({
      title,
      content,
      color,
      left,
      top,
      offeset:{
        dx:0,
        dy:0
      }
    });
  }
}


export interface Note {
  title: string
  content: string
  color: string,
  left:number,
  top:number,
  offeset:{
    dx:number,
    dy:number
  }
}
