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

  update(action) {
    const next = immer.produce(this.state, draft => {
      this.actions[action.type](draft, action.payload);
    });

    this.state = next;
    const changed = { count: true }; // TODO
    this.props(changed, next);
  }
}
