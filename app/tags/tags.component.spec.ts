import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, FormsModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags = [
    { id: 1, name: 'Work', color: '#f44336' },
    { id: 2, name: 'Personal', color: '#2196f3' }
  ];

  editing: { id: number; name: string; color: string } | null = null;

  editTag(tag: any) {
    this.editing = { ...tag };
  }

  saveTag() {
    if (this.editing) {
      const index = this.tags.findIndex(tag => tag.id === this.editing?.id);
      if (index !== -1) {
        this.tags[index] = this.editing;
      }
      this.editing = null;
    }
  }

  cancelEdit() {
    this.editing = null;
  }
}
