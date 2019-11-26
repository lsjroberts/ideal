customElements.define(
  'i-counter',
  class extends StatefulElement {
    constructor() {
      super('template_counter');

      this.state = { count: 0 };
      this.actions = {
        increment: state => {
          state.count += 1;
        },
      };
    }

    mount() {
      this.button0 = this.root.querySelector('[data-id="button0"]');
      this.t0 = this.querySelector('[slot="t0"]');

      const initial = Number(this.getAttribute('initial'));
      this.produce(state => {
        state.count = initial;
      });
      this.t0.textContent = initial;

      this.button0.onclick = payload => {
        this.update({ type: 'increment', payload });
      };
    }

    props(changed, next) {
      changed.forEach(patch => {
        if (patch.path[0] === 'count') {
          this.t0.textContent = `${next.count}`;
        }
      });
    }
  },
);
