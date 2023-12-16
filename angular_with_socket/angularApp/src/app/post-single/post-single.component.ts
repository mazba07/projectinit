import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { SocketServiceService } from '../services/socket-service.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent {

  singlePost: any = [];
  comments: any = [];

  constructor(private dataService: DataServiceService,
    private route: ActivatedRoute,
    private socketService: SocketServiceService) {
    this.fetchSinglePostWithAllComments();
  }

  fetchSinglePostWithAllComments() {
    var id = this.route.snapshot.paramMap.get('id');
    var url = 'http://localhost:3000/single-post/' + id;
    this.dataService.getData(url)
      .subscribe(data => {
        this.singlePost = data.body.data.singlePost;
        this.comments = data.body.data.comments;
        console.log(this.singlePost);
        console.log(this.comments);
      });

    this.socketService.listen('postComment-' + id).subscribe((data) => {
      this.fetchSinglePostWithAllComments();
    });
  }

  addNewComment(newPostComment: NgForm) {
    var id = this.route.snapshot.paramMap.get('id');
    var postData: object = {
      "id": id,
      "commetnBody": newPostComment.value.commetnBody
    };
    var url = "http://localhost:3000/post-new-comment/";
    this.dataService.postData(url, false, postData)
      .subscribe(data => {
        console.log(data);
        if (data) {
          newPostComment.reset();
        } else {
          console.log("Somethin went wrong");
        }
      });
  }
}
