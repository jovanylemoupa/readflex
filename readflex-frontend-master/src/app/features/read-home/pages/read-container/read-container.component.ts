import { Component, OnInit } from '@angular/core';
import { CardStoryComponent } from '../../../../shared/component/card-story/card-story.component';
import { StoryService } from '../../../../shared/services/story/story.service';
import { Story } from '../../../../shared/models/story';
import { BookComponent } from '../../../../shared/component/book/book.component';

@Component({
  selector: 'app-read-container',
  standalone: true,
  imports: [CardStoryComponent, BookComponent],
  templateUrl: './read-container.component.html',
  styleUrl: './read-container.component.scss',
})
export class ReadContainerComponent implements OnInit {
  stories!: Story[];
  constructor(private storyservice: StoryService) {}

  ngOnInit(): void {
    this.getStories();
  }
  getStories(): void {
    this.stories = this.storyservice.getStoriesOverview();
  }
}
