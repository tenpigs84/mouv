import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService, TitleService, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forum-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumViewComponent implements OnInit, OnDestroy {
  private router$!: Subscription;
  id = 0;
  i: any;
  // replies
  s = {
    pi: 1,
    ps: 6,
  };
  total = 0;
  replies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private scroll: ScrollService,
    private title: TitleService,
    @Inject(DOCUMENT) private doc: any,
    public msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.router$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.load();
    });
  }

  load(): void {
    this.http.get(`/forum/${this.id}`).subscribe((res: any) => {
      this.i = res;
      this.title.setTitle(res.title);
      this.cd.detectChanges();
    });
    this.loadReplies();
  }

  loadReplies(change: boolean = false): void {
    this.http.get(`/forum/${this.id}/replies`, this.s).subscribe((res: any) => {
      this.replies = res.list;
      this.total = res.total;
      if (change) {
        this.scroll.scrollToElement(this.doc.querySelector('#replies'));
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
