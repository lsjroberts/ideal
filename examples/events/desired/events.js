customElements.define(
  'i-events',
  class extends StatefulElement {
    constructor() {
      super('template_events');

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

    props(changed, next) {
      changed.forEach(patch => {
        if (patch.path[0] === 'count') {
          this.querySelector('[slot="t0"]').textContent = `${next.count}`;
        } else if (patch.path[0] === 'countInside') {
          this.querySelector('[slot="t1"]').textContent = `${next.countInside}`;
        } else if (patch.path[0] === 'x') {
          this.querySelector('[slot="t2"]').textContent = `${next.x}`;
        } else if (patch.path[0] === 'y') {
          this.querySelector('[slot="t3"]').textContent = `${next.y}`;
        }
      });
    }
  },
);
