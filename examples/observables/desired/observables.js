const { interval } = rxjs;

const tick = interval(1000);

customElements.define(
  'i-observables',
  class extends StatefulElement {
    constructor() {
      super('template_observables');

      this.state = {
        value: null,
      };
      this.actions = {
        next: (state, value) => {
          state.value = value;
        },
      };
    }

    mount() {
      this.t0 = this.querySelector('[slot="t0"]');
      this.observer = tick.subscribe(payload => {
        this.update({ type: 'next', payload });
      });
    }

    unmount() {
      this.observer.unsubscribe();
    }

    props(patches, next) {
      patches.forEach(patch => {
        if (patch.path[0] === 'value') {
          this.t0.textContent = `${next.value}`;
        }
      });
    }
  },
);
