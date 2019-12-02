const { interval } = rxjs;

const tick = interval(1000);

customElements.define(
  'i-observables',
  class extends ObservableElement {
    constructor() {
      super('template_observables');
      this.observable = tick;
    }

    mount() {
      super.mount();
      this.t0 = this.querySelector('[slot="t0"]');
    }

    subscribe(next) {
      this.t0.textContent = `${next}`;
    }
  },
);
