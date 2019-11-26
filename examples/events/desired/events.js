customElements.define(
  'i-events',
  class extends StatefulElement {
    constructor() {
      super('template_events');

      this.t0 = null;
      this.t1 = null;
      this.t2 = null;
      this.t3 = null;

      this.state = {
        count: 0,
        countInside: 0,
        x: 0,
        y: 0,
      };
      this.actions = {
        increment: state => {
          state.count += 1;
        },
        incrementInside: state => {
          state.countInside += 1;
        },
        move: (state, evt) => {
          state.x = evt.clientX;
          state.y = evt.clientY;
        },
      };
    }

    mount() {
      this.t0 = this.querySelector('[slot="t0"]');
      this.t1 = this.querySelector('[slot="t1"]');
      this.t2 = this.querySelector('[slot="t2"]');
      this.t3 = this.querySelector('[slot="t3"]');

      document.addEventListener('click', () => {
        this.update({
          type: 'increment',
        });
      });
      this.addEventListener('click', () => {
        this.update({
          type: 'incrementInside',
        });
      });
      document.addEventListener('mousemove', event => {
        this.update({
          type: 'move',
          payload: event,
        });
      });
    }

    unmount() {
      document.removeEventListener('click');
      this.removeEventListener('click');
      document.removeEventListener('mousemove');
    }

    props(changed, next) {
      changed.forEach(patch => {
        if (patch.path[0] === 'count') {
          this.t0.textContent = `${next.count}`;
        } else if (patch.path[0] === 'countInside') {
          this.t1.textContent = `${next.countInside}`;
        } else if (patch.path[0] === 'x') {
          this.t2.textContent = `${next.x}`;
        } else if (patch.path[0] === 'y') {
          this.t3.textContent = `${next.y}`;
        }
      });
    }
  },
);
