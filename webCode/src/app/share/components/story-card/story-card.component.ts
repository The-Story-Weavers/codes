import { Component, Input } from '@angular/core';
import { ShareModule } from '../../share.module';

@Component({
  selector: 'app-story-card',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './story-card.component.html',
  styleUrl: './story-card.component.less'
})
export class StoryCardComponent {
  @Input() story = null
}
