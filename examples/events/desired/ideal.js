class IdealElement extends HTMLElement {
  constructor(template) {
    super();
    this.template = document.getElementById(template).content;
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(this.template.cloneNode(true));
  }

  connectedCallback() {
    this.lazyMount();
  }

  // https://gist.github.com/franktopel/5d760330a936e32644660774ccba58a7
  lazyMount() {
    // collect the parentNodes
    const parentNodes = [];
    let el = this;
    while (el.parentNode) {
      el = el.parentNode;
      parentNodes.push(el);
    }
    // check if the parser has already passed the end tag of the component
    // in which case this element, or one of its parents, should have a nextSibling
    // if not (no whitespace at all between tags and no nextElementSiblings either)
    // resort to DOMContentLoaded or load having triggered
    if (
      [this, ...parentNodes].some(el => el.nextSibling) ||
      document.readyState !== 'loading'
    ) {
      this.mount();
    } else {
      this.mutationObserver = new MutationObserver(() => {
        if (
          [this, ...parentNodes].some(el => el.nextSibling) ||
          document.readyState !== 'loading'
        ) {
          this.mount();
          this.mutationObserver.disconnect();
        }
      });

      this.mutationObserver.observe(this, { childList: true });
    }
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
