import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { SocketServiceService } from '../services/socket-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  post: any = [];

  constructor(private dataService: DataServiceService, private socketService: SocketServiceService) {
    this.fetchAllPost();
  }

  fetchAllPost() {
    var url = 'http://localhost:3000/get-all-post';
    this.dataService.getData(url)
      .subscribe(data => {
        console.log(data);
        this.post = data.body.data;
        if (this.post) {
          this.post = this.post.reverse();
        }
      });

    this.socketService.listen('addedPostHome').subscribe((data) => {
      console.log(data);
      this.post.push(data);
      if (this.post) {
        this.post = this.post.reverse();
      }
    });
  }

  addNewPost(newPost: NgForm) {
    var postData: object = {
      "title": newPost.value.title,
      "body": newPost.value.body
    };
    var url = "http://localhost:3000/add-new-post";
    this.dataService.postData(url, false, postData)
      .subscribe(data => {
        console.log(data);
        if (data) {
          newPost.reset();
        } else {
          console.log("Somethin went wrong");
        }
      });
  }

  deletePost(id: any) {
    var url = 'http://localhost:3000/delete-post/' + id;
    this.dataService.getData(url)
      .subscribe(data => {
        this.fetchAllPost();
      });
  }

}
