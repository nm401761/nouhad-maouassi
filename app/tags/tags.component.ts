import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StorageService } from '../storage.service';
import { TagComponent } from '../tag/tag.component';
import { Tag } from '../tag/tag';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, FormsModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags: Tag[] = [];
  loaded: boolean = false;
  editing: Tag | null = null;

  constructor(private storage: StorageService) {
    this.loadTags();
  }
// la methode load tags() qui chargera si pas deja charges
dialogAddTag(): false {
  const name = window.prompt("Nom de la nouvelle étiquette :");

  if (name && name.trim() !== '') {
    const newTag: Tag = {
      id: Date.now(),
      name: name.trim(),
      color: '#000000' // ou une couleur par défaut
    };

    this.tags.push(newTag);
    this.storage.save(this.tags);
  }

  return false; // ← pour empêcher le comportement par défaut du lien
}

  loadTags() {
    if (this.loaded) return;
    this.tags = this.storage.load();
    this.loaded = true;
  }

  saveTag() {
    if (!this.editing) return;

    if (this.editing.id === 0) {
      this.editing.id = Date.now();
      this.tags.push({ ...this.editing });
    } else {
      const index = this.tags.findIndex(t => t.id === this.editing!.id);
      if (index !== -1) this.tags[index] = { ...this.editing };
    }

    this.storage.save(this.tags);
    this.editing = null;
  }

  cancelEditing() {
    this.editing = null;
  }

  edit(tag: Tag) {
    this.editing = { ...tag };
  }

  deleteTag(tag: Tag) {
    this.tags = this.tags.filter(t => t.id !== tag.id);
    this.storage.save(this.tags);
  }
}
