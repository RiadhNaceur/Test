import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upload-img';
  selectedFile: File = null;
  options;
  urls =[];
  files: File[];
  constructor(private http: HttpClient){}

  onSelected(event){
    if (event.target.files) {
      this.files = event.target.files;
      /*var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {

        var reader = new FileReader();

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]); // read file as data url
      

    }*/
  }
  }
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    this.options = { content: fd };
    //fd.append('test', 'this is a test');
    this.http.post('https://file.io', fd, this.options)
    .subscribe((response: any) =>{
        console.log(response);
      });
  }

  basicUpload(files: File[]){
    files = this.files;
    console.log(files);
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    this.http.post('http://juridique.positiftunisie.com/public/user/addws', formData)
      .subscribe(event => {
        console.log('done')
      })
  }
}
