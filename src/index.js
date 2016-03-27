import './style.sss'
import template from './template.html'

export default function(Vue) {
return {
  template,
  props: {
    items: {
      type: Array,
      default: []
    },
    class: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: String,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    // VALIDATION
    validate: {
      type: Function,
      default: _ => true
    },
    // TWO WAY
    query: {
      twoWay: true,
      default: ''
    },
    selectedItem: {
      twoWay: true,
    }
  },
  data() {
    return {
      alert: '',
      inFocus: false,
      forceHide: true,
      activeItem: -1,
      filteredItems: [],
      inputWidth: ''
    };
  },
  computed: {
    matchesState() {
      return this.inFocus && !this.forceHide;
    },
  },
  watch: {
    ['query']() {
      if (this.query) {
        this.forceHide = false;
      } else {
        this.forceHide = true;
      }
    },
    'matchesState': 'setInputWidth'
  },
  events: {
    'hit': 'hit' /*for external trigger*/
  },
  filters: {
    setFilteredItems(val) {
      return this.filteredItems = val;
    }
  },
  attached() {
    let debounceSetInputWidth = Vue.util.debounce(this.setInputWidth, 150)

    this.setInputWidth()
    window.addEventListener('resize', debounceSetInputWidth)
  },
  methods: {
    focus() {
      this.inFocus = true;
    },
    blur(e) {
      setTimeout(() => {
        this.inFocus = false;
      }, 130);
    },
    esc() {
      this.query = '';
      this.activeItem = -1;
      this.selectedItem = {};
    },
    up() {
      if (this.matchesState && this.activeItem >= 0) {
        --this.activeItem;
      }
    },
    down() {
      if (this.matchesState
          && this.activeItem < this.filteredItems.length - 1) {
        ++this.activeItem;
      }
    },
    enter() {
      this.hit();
    },
    click(index) {
      this.activeItem = index;
      this.hit();
    },
    hit() {
      if (this.filteredItems.length === 1
      && this.query === this.filteredItems[0]) {
        this.activeItem = 0;
      }

      let selectedItem;

      if (this.activeItem >= 0) {
        let value = this.filteredItems[this.activeItem];

        selectedItem = {
          value,
          index: this.items.indexOf(value),
        };
      } else {
        selectedItem = {
          index: this.activeItem,
          value: this.query
        };
      }

      this.query = selectedItem.value;

      if (this.validate(selectedItem, [].concat(this.filteredItems))) {
        this.selectedItem = selectedItem;
        this.activeItem = -1;
        this.$nextTick(_ => this.forceHide = true);
      }
    },
    setInputWidth() {
      this.inputWidth = this.matchesState
        ? `${this.$els.input.offsetWidth}px`
        : '';
    }
  }
}
};
