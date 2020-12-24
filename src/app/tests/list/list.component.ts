import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  quizes : any

  constructor() { 

    
    this.quizes = [

      {
        "testId": 1,
        "quizname": "Контрольная #5",
        "createdBy": "Александра Ивановна",
        "deadlineDate": "12/07/2012",
        "questions": [
          {
            "uuid": "e0f44654-45f3-11eb-b378-0242ac130002",
            "text": "Sin(30)?",
            "answers": [
              "1/2", "1/5", "1/7"
            ],
            "correct": 1
          },
        ]
      },


    ]


  }

  ngOnInit(): void {
  }

}
