class LegacySystem {
  public request(): string {
    return "Dados legados da UniCesumar";
  }
}

interface NewSystem {
  fetchData(): string;
}

class LegacyToNewSystemAdapter implements NewSystem {
  private legacySystem: LegacySystem;

  constructor() {
    this.legacySystem = new LegacySystem();
  }

  fetchData(): string {
    return this.legacySystem.request();
  }
}

const newSystem: NewSystem = new LegacyToNewSystemAdapter();
console.log(newSystem.fetchData());

interface Department {
  getName(): string;
}

class AcademicDepartment implements Department {
  getName(): string {
    return "Departamento Acadêmico da UniCesumar";
  }
}

class AdministrationDepartment implements Department {
  getName(): string {
    return "Departamento Administrativo da UniCesumar";
  }
}

abstract class DepartmentCreator {
  abstract createDepartment(): Department;

  getDepartmentName(): string {
    const department = this.createDepartment();
    return department.getName();
  }
}

class AcademicDepartmentCreator extends DepartmentCreator {
  createDepartment(): Department {
    return new AcademicDepartment();
  }
}

class AdministrationDepartmentCreator extends DepartmentCreator {
  createDepartment(): Department {
    return new AdministrationDepartment();
  }
}

const academicCreator: DepartmentCreator = new AcademicDepartmentCreator();
console.log(academicCreator.getDepartmentName());

const adminCreator: DepartmentCreator = new AdministrationDepartmentCreator();
console.log(adminCreator.getDepartmentName());

interface NewsSubject {
  attach(observer: NewsObserver): void;
  detach(observer: NewsObserver): void;
  notify(): void;
}

class NewsAgency implements NewsSubject {
  private observers: NewsObserver[] = [];
  private news: string = "";

  attach(observer: NewsObserver): void {
    this.observers.push(observer);
  }

  detach(observer: NewsObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.news);
    }
  }

  setNews(news: string): void {
    this.news = news;
    this.notify();
  }
}

interface NewsObserver {
  update(news: string): void;
}

class NewsReader implements NewsObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(news: string): void {
    console.log(`${this.name} está lendo a notícia: ${news}`);
  }
}

const newsAgency = new NewsAgency();
const reader1 = new NewsReader("Alice");
const reader2 = new NewsReader("Bob");

newsAgency.attach(reader1);
newsAgency.attach(reader2);

newsAgency.setNews("Nova turma de Ciência da Computação na UniCesumar!");

newsAgency.detach(reader1);

newsAgency.setNews("Novo curso de Administração na UniCesumar!");
