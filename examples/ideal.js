class IdealElement extends HTMLParsedElement {
  constructor(template) {
    super();
    this.template = document.getElementById(template).content;
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(this.template.cloneNode(true));
  }

  mount() {}

  parsedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }
}

class StatefulElement extends IdealElement {
  update(action) {
    const [next, patches] = immer.produceWithPatches(this.state, draft => {
      this.actions[action.type](draft, action.payload);
    });

    console.log({ patches, next });

    this.state = next;
    this.props(patches, next);
  }

  produce(reducer) {
    const next = immer.produce(this.state, reducer);
    this.state = next;
  }
}

class ObservableElement extends StatefulElement {
  constructor(template) {
    super(template);
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
    this.observer = this.observable.subscribe(payload => {
      this.update({ type: 'next', payload });
    });
  }

  unmount() {
    this.observer.unsubscribe();
  }

  props(patches, next) {
    patches.forEach(patch => {
      if (patch.path[0] === 'value') {
        this.subscribe(next.value);
      }
    });
  }

  subscribe(next) {}
}
