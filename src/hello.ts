import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
    selector: 'hello'
})
@View({
    template: `<span *ng-if="name">Hello, {{name}}!</span>`,
    directives: [CORE_DIRECTIVES]
})
export class Hello {
    name: string = 'World';
    constructor() {
        setTimeout(() => {
            this.name = 'NEW World'
        }, 2000);
    }
}

bootstrap(Hello);