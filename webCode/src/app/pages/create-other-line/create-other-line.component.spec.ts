import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherLineComponent } from './create-other-line.component';

describe('CreateOtherLineComponent', () => {
  let component: CreateOtherLineComponent;
  let fixture: ComponentFixture<CreateOtherLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOtherLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOtherLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
