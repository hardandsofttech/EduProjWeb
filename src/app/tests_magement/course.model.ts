export class Answer {
  text: string;
  points: number;
}

export class Question {
  id: string;
  questionText: string;
  image: string;
  imagePreview: string;
  answers: Answer[] = [];
}

export class Theme {
  constructor(id, themeName) {
    this.id = id;
    this.themeName = themeName;
  }

  id: string;
  themeName: string;
  questions: Question[];
}

export class Course {
  id: string;
  name: string;
  lessons?: any;
  themes: Theme[];
}

export class AddThemeBody {
  constructor(themeName) {
    this.themeName = themeName;
  }

  themeName: string;
}

export class Responce {
  result: string;
}
