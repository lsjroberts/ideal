class IdealElement extends HTMLElement {
  constructor(template) {
    super();
    this.template = document.getElementById(template).content;
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(this.template.cloneNode(true));
  }

  connectedCallback() {
    this.mount();
  }
}

class StatefulElement extends IdealElement {
  update(action) {
    const [next, patches] = immer.produceWithPatches(this.state, draft => {
      this.actions[action.type](draft, action.payload);
    });

    console.log({ next, patches });

    this.state = next;
    this.props(patches, next);
  }
}
