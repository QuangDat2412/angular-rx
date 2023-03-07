import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TestComponent } from './test.component';
import { TestRouting } from './test.routing';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRouting,
    MatTableModule,
    MatCardModule,
    MatSortModule,
  ],
  providers: [],
})
export class TestModule {}
