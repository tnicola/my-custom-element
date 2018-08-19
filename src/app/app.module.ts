import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { InputComponent } from './input.component';
import { MyCustomElementAComponent } from './my-custom-element-a.component';
import { MyCustomElementBComponent } from './my-custom-element-b.component';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { ElementZoneModifiedStrategyFactory } from './elements-modified-zone-strategy';

@NgModule({
  declarations: [
    InputComponent,
    MyCustomElementAComponent,
    MyCustomElementBComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [MyCustomElementAComponent, MyCustomElementBComponent]
})
export class AppModule {

  constructor(private injector: Injector) { }
  ngDoBootstrap() {

    /* Using the original ElementZoneStrategy from the library */
    const strategyFactoryA = new ElementZoneStrategyFactory(MyCustomElementAComponent, this.injector);
    const customElementA =
      createCustomElement(MyCustomElementAComponent, { injector: this.injector, strategyFactory: strategyFactoryA });
    customElements.define('my-custom-element-a', customElementA);

    /* Using the modified ElementZoneStrategy */
    const strategyFactoryB = new ElementZoneModifiedStrategyFactory(MyCustomElementBComponent, this.injector);
    const customElementB = createCustomElement(MyCustomElementBComponent, { injector: this.injector, strategyFactory: strategyFactoryB });
    customElements.define('my-custom-element-b', customElementB);
  }

}
