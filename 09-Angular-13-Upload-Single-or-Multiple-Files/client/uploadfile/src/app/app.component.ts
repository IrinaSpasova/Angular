
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uploadfile';

  images: any;
  multipleImages = [];


  constructor(private http: HttpClient) {
    
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.images = file;
    }
    }

    onSubmit(){
      const formdata = new FormData();
 
    formdata.append('file', this.images);
 
    // post request to express backend
 
    this.http.post<any>('http://localhost:3000/file', formdata)
    .subscribe(
      (res) => {
        console.log(res);
        
      },
      (err) => {
        console.log(err);
      }
    );
    }
}
