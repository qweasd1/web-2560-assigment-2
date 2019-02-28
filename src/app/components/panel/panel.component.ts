import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {CardComponent} from '../card/card.component';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {


  @ViewChild('panel')
  panel: ElementRef<HTMLDivElement>;



  currentScale = 1;
  currentMouseX = 0;
  currentMouseY = 0;


  get isShowDetail(){
    return this.currentScale > 0.5
  }

  cards: CardComponent[] = [];

  constructor(
    public noteService: NoteService,
    public storeService:StoreService
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }


  createNewNote(event: MouseEvent) {

    const rect = this.panel.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left);
    const y = (event.clientY - rect.top);
    this.currentMouseX = x;
    this.currentMouseY = y;
    this._updateChildrenScale(1);
    this.noteService.addNote('', '', x, y);
  }


  scaleDown() {
    const rect = this.panel.nativeElement.getBoundingClientRect();
    this._updateChildrenScale(this.currentScale + 0.1);

  }

  scaleUp() {
    const rect = this.panel.nativeElement.getBoundingClientRect();
    this._updateChildrenScale(this.currentScale - 0.1);
  }

  private changeScale() {

  }

  @HostListener('mousewheel', ['$event']) onMousewheel(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault();
      event.stopPropagation();
      if (this.currentScale < 0.01 && event.deltaY > 0) {
        return;
      }
      const rect = this.panel.nativeElement.getBoundingClientRect();
      this.currentMouseX = (event.clientX - rect.left);
      this.currentMouseY = (event.clientY - rect.top);

      this._updateChildrenScale(this.currentScale - event.deltaY * 0.01);
      // this._updateChildrenScale(this.currentMouseX, this.currentMouseY, this.currentScale - event.deltaY * 0.01);
      // this._updateChildrenScale(mouseX, mouseY, this.currentScale - event.deltaY * 0.01);

      // this._updateMousePosition(event)
      // this.changeScale()
    }


  }


  // private _updateMousePosition(event){
  //   const rect = (event.target as any).getBoundingClientRect();
  //   this.currentMouseX = (event.clientX - rect.left) / this.currentScale
  //   this.currentMouseY = (event.clientY - rect.top)  / this.currentScale
  // }


  private _updateChildrenPosition(xOffset, yOffset) {
    for (let card of this.cards) {
      card.updatePosition(xOffset, yOffset);
    }
  }

  private _updateChildrenScale(newScale) {
    const scaleDiff = newScale / this.currentScale;
    this.currentScale = newScale;
    for (let card of this.cards) {
      card.updateScale(scaleDiff, newScale);
    }
  }


  isPanning: boolean = false;
  panX: number;
  panY: number;

  onMouseDown(event: MouseEvent) {
    const rect = this.panel.nativeElement.getBoundingClientRect();
    this.panX = (event.clientX - rect.left);
    this.panY = (event.clientY - rect.top);
    // console.log(this.panX, this.panY);
    this.isPanning = true;
  }

  onMouseUp() {
    this.isPanning = false;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isPanning) {
      const rect = this.panel.nativeElement.getBoundingClientRect();
      const newPanX = (event.clientX - rect.left);
      const newPanY = (event.clientY - rect.top);
      this._updateChildrenPosition((newPanX - this.panX) / this.currentScale, (newPanY - this.panY) / this.currentScale);

      this.panX = newPanX;
      this.panY = newPanY;
    }

  }

  save(){
    this.storeService.save()
  }


}
