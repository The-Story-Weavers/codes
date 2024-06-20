import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoryLineComponent } from './create-story-line.component';

describe('CreateStoryLineComponent', () => {
  let component: CreateStoryLineComponent;
  let fixture: ComponentFixture<CreateStoryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStoryLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStoryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
