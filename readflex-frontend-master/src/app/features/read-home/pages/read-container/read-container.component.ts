import { Component, OnInit } from '@angular/core';
import { CardStoryComponent } from '../../../../shared/component/card-story/card-story.component';
import { StoryService } from '../../../../shared/services/story/story.service';
import { Story } from '../../../../shared/models/story';

@Component({
  selector: 'app-read-container',
  standalone: true,
  imports: [CardStoryComponent],
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
