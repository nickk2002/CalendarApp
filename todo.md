### Deploy Command 
`eas build -p android --profile preview`

### Bugs

- [X] fix bug with Aula-A and Aula-Auditorium
- [X] Keyboard does not open automatically when adding task
- [X] Can't write a long description because of 30 char limit
- [X] Changing description of Calendar Task does bad things

### UI

- [ ] Different colors and same color for a course
- [X] Status bar color for dark mode
- [X] Default theme is `white`
- [ ] Status bar for `white` mode should be `white`
- [X] Status bar translucent
- [X] Make 30 Minutes Time interval look ok
- [ ] Update start time to `7 30`
- [ ] Iconita de la aplicatie arata rau
- [ ] UI Dark mode screen transitions have white flickering
- [ ] fix flickering of tasks when updating them (`setTasks()` triggers a problem)
- [ ] less than one hour tasks look bad in the UI

### Features
- [ ] Refresh calendar button with last refresh date
- [ ] Do something with things that appear in calendar but I do not want to show them
- [ ] Calendar View without free time
- [ ] Task view for today
- [ ] Add link to the building name
- [X] Exam fix names
- [X] Wait for calendar to load in main screen
- [X] Show location in task view
- [X] Scroll Modal Edit Task
- [X] Persistent location in storage Hope
- [ ] more tasks same hour => no fix for this yet
- [X] wrap header text => Added margin
- [X] Date picker for Current Day
- [ ] dark mode/light mode preference save in local storage
- [X] Bug when creating a task at the end of the day it is not full width
- [ ] Repeat functionality for events
- [X] Sa adaug alte rugaciuni scriind direct pe tel

### Code
- [X] Fix `ts` issues with placeholder on `MyText`
- [ ] Remove unused dependencies