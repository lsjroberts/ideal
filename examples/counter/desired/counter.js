customElements.define(
  'i-counter',
  class extends IdealElement {
    constructor() {
      super('template_counter');

      this.state = { count: 0 };
      this.actions = {
        increment: state => (state.count += 1),
        decrement: state => (state.count -= 1)
      };
    }

    mount() {
      this.button0 = this.root.querySelector('[data-id="button0"]');
      this.button1 = this.root.querySelector('[data-id="button1"]');
      this.t0 = this.querySelector('[slot="t0"]'); // TODO: null at this point

      this.button0.onclick = payload => {
        this.update({ type: 'increment', payload });
      };
      this.button1.onclick = payload => {
        this.update({ type: 'decrement', payload });
      };
    }

    props(changed, next) {
      if (changed.count) {
        // TODO: this.t0
        this.querySelector('[slot="t0"]').textContent = `Count: ${next.count}`;
      }
    }
  }
);
