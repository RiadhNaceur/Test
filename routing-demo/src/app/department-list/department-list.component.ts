import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments = [
    {"id": 1, "name": "Angular"},
    {"id": 2, "name": "Node"},
    {"id": 3, "name": "React"},
    {"id": 4, "name": "Vue Js"}
  ];
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSelect(department){
    this.router.navigate([department.id], {relativeTo: this.route});
  }
}
