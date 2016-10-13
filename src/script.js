export default {
  name: 'vue-simple-typeahead',
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
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    customFilter: {
      type: Function
    },
    // VALIDATION
    validate: {
      type: Function,
      default: _ => true
    },
    modifyItems: {
      type: Function,
      default: _ => _
    },
    // TWO WAY
    query: {
      twoWay: true,
      default: ''
    },
    changeSelectedItem: {
      type: Function
    },
    changeQuery: {
      type: Function
    },
  },
  data() {
    return {
      alert: '',
      inFocus: false,
      forceHide: true,
      activeItem: -1,
      filteredItems: [],
      inputWidth: '',
      class_: this.class,
      query_: this.query
    }
  },
  computed: {
    matchesState() {
      return this.inFocus && !this.forceHide
    },
    filteredItems() {
      if (this.customFilter) {
        return this.customFilter(this.query_, this.items)
      } else {
        return this.items.filter(item => {
          return item.indexOf(this.query_) !== -1
        })
      }
    }
  },
  watch: {
    query_() {
      if (this.query_) {
        this.forceHide = false
      } else {
        this.forceHide = true
      }

      this.changeQuery && this.changeQuery(this.query_)
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
      this.query_ = ''
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
      if (this.filteredItems.length === 1 && this.query_) {
        this.query_ = this.filteredItems[0]
        this.activeItem = 0
      }

      let selectedItem

      if (this.activeItem >= 0) {
        let value = this.filteredItems[this.activeItem]

        selectedItem = {
          value,
          index: this.items.indexOf(value),
        }
      } else {
        selectedItem = {
          value: this.query_,
          index: this.activeItem
        }
      }

      this.query_ = selectedItem.value

      if (this.validate(selectedItem, [].concat(this.filteredItems))) {
        this.activeItem = -1
        this.changeSelectedItem && this.changeSelectedItem(selectedItem)
        this.$nextTick(_ => this.forceHide = true)
      }
    }
  }
}
