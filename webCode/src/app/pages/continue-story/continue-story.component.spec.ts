import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueStoryComponent } from './continue-story.component';

describe('ContinueStoryComponent', () => {
  let component: ContinueStoryComponent;
  let fixture: ComponentFixture<ContinueStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinueStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
