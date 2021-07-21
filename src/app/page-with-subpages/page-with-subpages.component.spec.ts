import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithSubpagesComponent } from './page-with-subpages.component';

describe('PageWithSubpagesComponent', () => {
  let component: PageWithSubpagesComponent;
  let fixture: ComponentFixture<PageWithSubpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWithSubpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithSubpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
