class IdealElement extends HTMLParsedElement {
  constructor(template) {
    super();
    this.template = document.getElementById(template).content;
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(this.template.cloneNode(true));
  }

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
}
