import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostConfessionComponent } from './post-confession.component';

describe('PostConfessionComponent', () => {
  let component: PostConfessionComponent;
  let fixture: ComponentFixture<PostConfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostConfessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostConfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
