import {Component, Input, Output, EventEmitter, OnInit,} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public name = 'Riadh';
  public url = window.location.href;
  public id = "myId";
  public isDisabled = false;
  public  greet = "";
  public  logging = "";
  @Input() public  parentData ="";
  @Output() public Ev = new EventEmitter();
  public colors = ['red','blue','green'];
  constructor() { }

  ngOnInit() {
  }

  onclick(){
    this.greet="welcome"+this.name;
  }
  log(value){
    console.log(value)
  }
  fireEvent(){
    this.Ev.emit('Aywah');
  }
}
