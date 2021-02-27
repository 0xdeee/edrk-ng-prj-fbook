import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/posts/posts.model';

@Pipe({
  name: 'postSort',
})
export class PostSortPipe implements PipeTransform {
  transform(posts: any): any {
    posts.sort((a: any, b: any) => {
      return (
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
    });
    return posts;
  }
}
