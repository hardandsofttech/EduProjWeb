import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddThemeBody, Answer, Course, Question, Responce, Theme} from './course.model';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-test-management',
  templateUrl: './testManagement.component.html',
  styleUrls: ['./testManagement.component.css']
})


export class TestManagementComponent implements OnInit {
  BASE_URL = 'http://127.0.0.1:8080/';
  checkedThemeId = '';
  selectedFile: File;
  shownQuestion = new Question();
  course = new Course();

  constructor(public httpClient: HttpClient) {
    this.shownQuestion.imagePreview = 'assets/img/placeholder_image.png';
  }

  ngOnInit(): void {
    this.httpClient.get(this.BASE_URL + 'getCourse/5f7992f328020c2528066feb').subscribe(
      response => {
        console.log(response);
        this.course = plainToClass(Course, response);
      });
  }

  addEmptyAnswer(): void {
    this.shownQuestion.answers.push(new Answer());
  }

  selectTheme(theme: Theme): void {
    if (this.shownQuestion.id != null) {
      this.shownQuestion = new Question();
    }
    this.checkedThemeId = theme.id;
  }

  showQuestion(question): void {
    this.selectedFile = null;
    this.shownQuestion = question;
    console.log(this.shownQuestion.image);
    if (this.shownQuestion.image == null) {
      this.shownQuestion.imagePreview = 'assets/img/placeholder_image.png';
    } else {
      this.httpClient.get(this.BASE_URL + 'getQuestionImage/' + this.shownQuestion.image, {responseType: 'text'}).subscribe(response => {
        console.log(response);
        this.shownQuestion.imagePreview = response;
      });
    }
  }

  deleteAnswer(index): void {
    this.shownQuestion.answers.splice(index, 1);
  }

  showAddThemePopup(): void {
    const themeName = window.prompt('Введите название темы');
    this.httpClient.post(this.BASE_URL + 'addTheme/' + this.course.id, new AddThemeBody(themeName))
      .subscribe(response => {
        this.course.themes.push(plainToClass(Theme, response));
      });
  }

  showImageChooser(): void {
    document.getElementById('chooser').click();
  }

  previewFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (res: any) => {
        this.shownQuestion.imagePreview = res.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    }
  }

  saveQuestion(): void {
    this.uploadPicture(this.shownQuestion.image, imageId => {
      this.shownQuestion.image = imageId;
      this.httpClient.post(this.BASE_URL + 'addQuestion/' + this.course.id + '/' + this.checkedThemeId, this.shownQuestion).subscribe(
        (response: Responce) => {
          if (this.shownQuestion.id == null) {
            this.shownQuestion.id = response.result;
            for (const theme of this.course.themes) {
              if (theme.id === this.checkedThemeId) {
                theme.questions.push(this.shownQuestion);
              }
            }
          }
        });
    });
  }

  uploadPicture(id, callback: (n: string) => any): void {
    if (this.selectedFile != null) {
      const reader = new FileReader();
      reader.onload = (res: any) => {
        let request = '/uploadQuestionImage';
        if (id != null) {
          request += '/' + id;
        }
        this.httpClient.post(this.BASE_URL + request, {result: res.target.result}).subscribe((response: Responce) => {
          this.selectedFile = null;
          callback(response.result);
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      callback(id);
    }
  }
}
