import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './layout-routing';
import { LayoutComponent } from './layout.component';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [LayoutComponent, AppHeaderComponent, AppSidebarComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    SharedModule,
    MatButtonModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
  ],
})
export class LayoutModule {}
