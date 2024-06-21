import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/service/commonConfig';
import { StoryLineCardComponent } from 'src/app/share/components/story-line-card/story-line-card.component';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-story-detail',
  standalone: true,
  imports: [ShareModule,StoryLineCardComponent],
  templateUrl: './story-detail.component.html',
  styleUrl: './story-detail.component.less'
})
export class StoryDetailComponent {
  myChecked = false
  lineList = [{},{},{},{},{}];
  page = new Page();

  constructor(private router: Router) {
    this.page.total = 1000
  }

  searchLine() {

  }
  toDetail(line) {
    this.router.navigate(["/index/read"],{ queryParams: { id: '2' }})
  }
  nzPageChange(isReset = false) {}

  toHome(){
    this.router.navigate(['/index/home'])
  }

}
