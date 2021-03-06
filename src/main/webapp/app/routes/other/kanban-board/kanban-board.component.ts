import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
})
export class KanbanBoardComponent implements OnInit {
  list: any[] = [];

  constructor(private http: _HttpClient, public msg: NzMessageService) {}

  ngOnInit(): void {
    this.http.get('/kanban-board').subscribe((res: any) => (this.list = res));
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  del(p: any, i: any, idx: number): void {
    this.http.delete('/kanban-board', { cid: p.id, id: i.id }).subscribe(() => {
      this.msg.success('Success');
      p.list.splice(idx, 1);
    });
  }
}
