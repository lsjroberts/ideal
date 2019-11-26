customElements.define(
  'i-todo',
  class extends StatefulElement {
    constructor() {
      super('template_todo');

      this.state = {
        todos: [
          {
            label: 'Finish building ideal ui',
            complete: false,
          },
          {
            label: 'Go to the gym',
            complete: false,
          },
        ],
      };
      this.actions = {
        complete: (state, index) => {
          state.todos[index].complete = true;
        },
      };
    }

    mount() {
      // this.todosMap0 = this.root.querySelector('slot[name="todos-map0"]');
      // console.log(this.todosMap0);
      // this.button0.onclick = payload => {
      //   this.update({ type: 'increment', payload });
      // };
      // this.button1.onclick = payload => {
      //   this.update({ type: 'decrement', payload });
      // };
    }

    props(changed, next) {
      changed.forEach(patch => {
        if (patch.path[0] === 'todos' && patch.path[2] === 'complete') {
          const s = this.querySelector(
            `i-todo--todos-map0:nth-child(${patch.path[1] + 1})`,
          );
          s.e0.className = 'bbbbbb';
        }
      });
    }
  },
);

customElements.define(
  'i-todo--todos-map0',
  class extends IdealElement {
    constructor() {
      super('template_todo__todos_map0');
    }

    mount() {
      // TODO: will fail when siblings are added or removed
      this.index = this.parentElement.children.length - 1;

      this.e0 = this.root.querySelector('[data-id="e0"]');

      this.button0 = this.root.querySelector('[data-id="button0"]');
      this.button0.onclick = payload => {
        this.parentElement.parentElement.update({
          type: 'complete',
          payload: this.index,
        });
      };
    }
  },
);

// function getElementIndex(node) {
//   var index = 0;
//   while ((node = node.previousElementSibling)) {
//     index++;
//   }
//   return index;
// }
