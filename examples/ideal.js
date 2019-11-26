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

    this.state = next;
    this.props(patches, next);
  }

  produce(reducer) {
    const next = immer.produce(this.state, reducer);
    this.state = next;
  }
}
