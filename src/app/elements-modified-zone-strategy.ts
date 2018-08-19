import { NgZone, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { NgElementStrategyEvent, NgElementStrategy, createCustomElement, NgElementStrategyFactory } from '@angular/elements';

export class ElementModifiedZoneStrategy implements NgElementStrategy {
  private ngZone: NgZone;

  events: Observable<NgElementStrategyEvent>;

  constructor(protected strategy: NgElementStrategy, protected injector: Injector) {
    this.ngZone = this.injector.get<NgZone>(NgZone);
  }

  connect(element: HTMLElement): void {
    this.runInZone(() => { this.strategy.connect(element); });

    this.events = this.strategy.events;
  }

  disconnect(): void {
    this.runInZone(() => { this.strategy.disconnect(); });
  }
  getInputValue(propName: string) {
    // tslint:disable-next-line:arrow-return-shorthand
    return this.runInZone(() => { return this.strategy.getInputValue(propName); });
  }
  setInputValue(propName: string, value: string): void {
    this.runInZone(() => { this.strategy.setInputValue(propName, value); });
  }

  private runInZone(fn: () => any) { return this.ngZone.run(fn); }
}

export class ElementZoneModifiedStrategyFactory implements NgElementStrategyFactory {
  static counter = 1;
  private ngElement;

  protected string4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  protected generateName() {
    let result = 'dummy-name-n';

    const temp = ElementZoneModifiedStrategyFactory.counter + '';

    result = result + temp + '-' + this.string4() + this.string4() + this.string4() + '-' +
      this.string4() + this.string4() + '-' + this.string4();

    ElementZoneModifiedStrategyFactory.counter++;
    return result;
  }

  constructor(private component: Type<any>, private injector: Injector) {
    this.ngElement = createCustomElement(this.component, { injector: this.injector });
    // this is to keep the document-register-element polyfill happy
    // it doesn't like creating elements before the define, so we fill the registry with a random definition
    customElements.define(this.generateName(), this.ngElement);
  }

  create(injector: Injector): NgElementStrategy {
    // the only way to get a default strategy outside @angular/elements
    // is to create the ngElement/ngElementImpl and get it from a property
    let tempElement = new this.ngElement(this.injector);
    const strategy = tempElement['ngElementStrategy'];
    tempElement = null;

    return new ElementModifiedZoneStrategy(strategy, this.injector);
  }
}

