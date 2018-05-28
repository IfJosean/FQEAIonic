import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  items: Item[] = [];
  students: Item[] = [];

  defaultItem: any = {
    "_id": "5a09d0c4f805432b7c87008f",
    "name": "EA",
    "quatri": "Tardor",
    "studies": "Telematica",
    "__v": 0,
    "profilePic": "assets/img/speakers/Tardor.jpg",
    "studentId": [
      {
        "_id": "5a0984d57043b831eca19ed9",
        "name": "Gurkeerat",
        "address": "C/Pesadilla",
        "__v": 0,
        "phone": {
          "home": "666666666",
          "work": "777777777"
        }
      }
    ]
  };

  constructor(public api: Api) { }

  query() {
    this.items = this.defaultItem;
    this.api.get('student/users/select').subscribe((res: any) => { this.items = res });
    return this.api.get('student/users/select');
  }
  update(item: Item, oldname: String) {
    this.api.post('student/users/update/' + oldname, item).subscribe((res: any)=>{console.log(res.message)});
    return this.api.post('student/users/update/' + oldname, item);
  }
  remove(item: Item) {
    this.api.post('student/users/deleteUser', item).subscribe((res: any)=>{console.log(res.message)});
    return this.api.post('student/users/deleteUser', item);
  }

  queryStudents() {
    this.items = this.defaultItem;
    this.api.get('student/api/todos').subscribe((res: any) => { this.students = res });
    return this.api.get('student/api/todos');
  }

  delateStudentFromSubject(subject: Item) {
    this.api.post('subject/api/deleteStudentSubject/'+subject._id, subject).subscribe((res: any)=>{console.log(res)});
    return this.api.post('subject/api/deleteStudentSubject/'+subject._id, subject);
  }

 /* query(params?: any) {
    return this.api.get('/subject/api/todos', params);
  }*/
  search(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }



  add(item: Item) {
    return this.api.post('subject/api/', item);
  }

  delete(item: Item) {
    this.api.delete('subject/api/'+item._id).subscribe((res: any)=>{console.log(res.message)});
    return this.api.delete('subject/api/'+item.id);
  }
  addStudentToSubjectt(subject: Item){
    this.api.post('subject/api/'+subject._id, subject).subscribe((res: any)=>{console.log(res.message)});
    return this.api.post('subject/api/'+subject._id, subject);
  }

}
