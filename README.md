NccAngularTraining
Time sheet App
Requirement
Create TimeSheet App
Prepare for project
npm install

npm run prepare
Finish component design before working on TaskManagement and Project Management Feature. Follow this expample:
// <!-- Task Page -->

<app-card>
  {/*
    CardComponent
    Input: ???
    Output: ???
  */}

  <app-task-header>
    {/*TaskHeaderComponent
       Input: ???
       Output: ???
     */}
  </app-task-header>

  <app-task-list></app-task-list>
  {/*etc...*/}
  <app-task-form></app-task-form>
</app-card>

Current timesheet app:
Sample app: <http://training-timesheet.nccsoft.vn>
Swagger: <http://training-api-timesheet.nccsoft.vn>
Account: admindev/123qwe
Reuse current backend api and rebuild 3 features: Authentication, Task Manager, Project Manager
Login/Logout
Project Manager
Project Create/Edit should be a separated page. Then we will have 4 child page: General/Team/Tasks/Notification. Use nested route
Use Step UI for 4 child pages: General/Team/Tasks/Notification
Project View should have one more tab, it's Team tab to show members in project. It's the same as Team in Project Create/Edit
Add unit test for each component/service. Read more in:
Angular unit testing tutorial with examples ,
Unit testing Angular apps ,
Angular: Unit Testing Jasmine, Karma
Feel free for choosing which design pattern, UI lib that you want but have to match:
Great UI/UX and Try if we can make it better than the sample.
Clear & Clean source code - Easy for understanding and maintaining.
Use theme config to customize global style
Folder Structure
Consult Sample-Structure
<https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7>
NCC Angular basic checklist
100-days-of-angular  - Recommended
ncc-angular
How to Write Cleaner React Code
<https://angular.io/guide/styleguide#angular-coding-style-guide>
<https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/>
<https://itnext.io/clean-code-checklist-in-angular-️-10d4db877f74>
<https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki?wikiVersion=GBwikiMaster&pagePath=%2FAbout%2FCoding> Convention&pageId=1104&_a=edit
Working Process
View details

This project was generated with Angular CLI  version 14.1.0.

Development server
Run ng serve for a dev server. Navigate to <http://localhost:4200/>. The application will automatically reload if you change any of the source files.

Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running unit tests
Run ng test to execute the unit tests via Karma .

Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference  page.
