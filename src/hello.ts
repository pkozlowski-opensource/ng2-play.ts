import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

@Component({
    selector: 'hello'
})
@View({
    template: `<span *ng-if="name">Hello, {{name}}!</span>`,
    directives: [coreDirectives]
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