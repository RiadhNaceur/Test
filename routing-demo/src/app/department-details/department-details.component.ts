import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  public depId;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
    (params: ParamMap) =>
    {let id = parseInt(params.get('id'));
    this.depId = id;
  });
}
  goPrev()
  {
    this.router.navigate(['../',this.depId-1], {relativeTo: this.route});
  }
  goNext(){
    this.router.navigate(['../',this.depId+1], {relativeTo: this.route});
  }

}
