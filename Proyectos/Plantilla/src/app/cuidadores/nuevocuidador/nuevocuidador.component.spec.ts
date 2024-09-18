import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevocuidadorComponent } from './nuevocuidador.component';

describe('NuevocuidadorComponent', () => {
  let component: NuevocuidadorComponent;
  let fixture: ComponentFixture<NuevocuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevocuidadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevocuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
