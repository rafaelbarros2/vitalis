import { Component, output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  toggleSidebarEvent = output<void>();

  onToggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}