import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLineCardComponent } from './story-line-card.component';

describe('StoryLineCardComponent', () => {
  let component: StoryLineCardComponent;
  let fixture: ComponentFixture<StoryLineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryLineCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryLineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
