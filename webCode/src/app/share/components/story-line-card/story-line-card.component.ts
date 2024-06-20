import { Component, Input } from '@angular/core';
import { ShareModule } from '../../share.module';
import { NgxJdenticonModule } from 'ngx-jdenticon';

@Component({
  selector: 'app-story-line-card',
  standalone: true,
  imports: [ShareModule,NgxJdenticonModule],
  templateUrl: './story-line-card.component.html',
  styleUrl: './story-line-card.component.less'
})
export class StoryLineCardComponent {
  @Input() line = null
}
