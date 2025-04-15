import { Injectable } from '@angular/core';
import { Tag } from './tag/tag';

@Injectable({ providedIn: 'root' })
export class StorageService {
  save(tags: Tag[]) {
    localStorage.setItem('tags', JSON.stringify(tags));
  }

  load(): Tag[] {
    const data = localStorage.getItem('tags');
    return data ? JSON.parse(data) : [];
  }
}
