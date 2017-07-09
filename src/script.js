export default {
  name: 'vue-simple-typeahead',
  props: {
    // input props
    name: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    disabled: {
      type: Boolean,
      default: false
    },

    // components props
    items: {
      type: Array,
      default: []
    },
    query: {
      default: ''
    },
    validate: {
      type: Function,
      default: _ => true
    },
    filter: {
      type: Function,
      default: (items, query) => items.filter(item => {
        return item.indexOf(query) !== -1
      }) || []
    },
    onSelect: {
      type: Function
    }
  },
  data() {
    return {
      alert: '',
      inFocus: false,
      forceHide: true,
      activeItem: -1,
      inputWidth: ''
    }
  },
  computed: {
    matchesState() {
      return this.inFocus && !this.forceHide
    },
    filteredItems() {
      return this.filter(this.items, this.query)
    }
  },
  watch: {
    query() {
      if (this.query !== '') {
        this.forceHide = false
      } else {
        this.forceHide = true
      }
    }
  },
  events: {
    'hit': 'hit' /*for external trigger*/
  },
  methods: {
    focus() {
      this.inFocus = true
    },
    blur(e) {
      setTimeout(() => {
        this.inFocus = false
      }, 130)
    },
    esc() {
      this.query = ''
      this.activeItem = -1
      this.selectedItem = {}
    },
    up() {
      if (this.matchesState && this.activeItem >= 0) {
        --this.activeItem
      }
    },
    down() {
      if (this.matchesState && this.activeItem < this.filteredItems.length - 1) {
        ++this.activeItem
      }
    },
    enter() {
      this.hit()
    },
    click(index) {
      this.activeItem = index
      this.hit()
    },
    hit() {
      let query
      let match = true

      if (this.filteredItems.length === 1) {
        query = this.filteredItems[0]
      } else if (this.filteredItems.length > 1 && this.activeItem > 0) {
        query = this.filteredItems[this.activeItem]
      }

      if (query) {
        this.activeItem = -1
        this.forceHide = true
      } else {
        match = false
      }

      this.onSelect(match)
    }
  }
}
