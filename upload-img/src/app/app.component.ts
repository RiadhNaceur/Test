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
  constructor(private http: HttpClient){

  }

  onSelected(event){
   this.selectedFile = <File> event.target.files[0];
    console.log(<File> event.target.files[0]);
  }
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile , this.selectedFile.name);
    this.options = { content: fd };
    //fd.append('test', 'this is a test');
    this.http.post('http://juridique.positiftunisie.com/public/user/addws', fd, this.options)
    .subscribe((response: any) =>{
        console.log(response);
      });
  }
}
