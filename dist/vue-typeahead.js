(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vueTypeahead"] = factory();
	else
		root["vueTypeahead"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(1)
	
	/* script */
	__vue_exports__ = __webpack_require__(3)
	
	/* template */
	var __vue_template__ = __webpack_require__(4)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/hellbeast92/web/vue-typeahead/src/index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-038b39ca", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-038b39ca", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
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
	      default: function _default(_) {
	        return true;
	      }
	    },
	    modifyItems: {
	      type: Function,
	      default: function _default(_) {
	        return _;
	      }
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
	    }
	  },
	  data: function data() {
	    return {
	      alert: '',
	      inFocus: false,
	      forceHide: true,
	      activeItem: -1,
	      filteredItems: [],
	      inputWidth: '',
	      class_: this.class,
	      query_: this.query
	    };
	  },
	
	  computed: {
	    matchesState: function matchesState() {
	      return this.inFocus && !this.forceHide;
	    },
	    filteredItems: function filteredItems() {
	      var _this = this;
	
	      if (this.customFilter) {
	        return this.customFilter(this.query_, this.items);
	      } else {
	        return this.items.filter(function (item) {
	          return item.indexOf(_this.query_) !== -1;
	        });
	      }
	    }
	  },
	  watch: {
	    query_: function query_() {
	      if (this.query_) {
	        this.forceHide = false;
	      } else {
	        this.forceHide = true;
	      }
	
	      this.changeQuery && this.changeQuery(this.query_);
	    }
	  },
	  events: {
	    'hit': 'hit' /*for external trigger*/
	  },
	  methods: {
	    focus: function focus() {
	      this.inFocus = true;
	    },
	    blur: function blur(e) {
	      var _this2 = this;
	
	      setTimeout(function () {
	        _this2.inFocus = false;
	      }, 130);
	    },
	    esc: function esc() {
	      this.query_ = '';
	      this.activeItem = -1;
	      this.selectedItem = {};
	    },
	    up: function up() {
	      if (this.matchesState && this.activeItem >= 0) {
	        --this.activeItem;
	      }
	    },
	    down: function down() {
	      if (this.matchesState && this.activeItem < this.filteredItems.length - 1) {
	        ++this.activeItem;
	      }
	    },
	    enter: function enter() {
	      this.hit();
	    },
	    click: function click(index) {
	      this.activeItem = index;
	      this.hit();
	    },
	    hit: function hit() {
	      var _this3 = this;
	
	      if (this.filteredItems.length === 1 && this.query_) {
	        this.query_ = this.filteredItems[0];
	        this.activeItem = 0;
	      }
	
	      var selectedItem = void 0;
	
	      if (this.activeItem >= 0) {
	        var value = this.filteredItems[this.activeItem];
	
	        selectedItem = {
	          value: value,
	          index: this.items.indexOf(value)
	        };
	      } else {
	        selectedItem = {
	          value: this.query_,
	          index: this.activeItem
	        };
	      }
	
	      this.query_ = selectedItem.value;
	
	      if (this.validate(selectedItem, [].concat(this.filteredItems))) {
	        this.activeItem = -1;
	        this.changeSelectedItem && this.changeSelectedItem(selectedItem);
	        this.$nextTick(function (_) {
	          return _this3.forceHide = true;
	        });
	      }
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "vue-typeahead__container"
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (query_),
	      expression: "query_"
	    }],
	    ref: "input",
	    staticClass: "vue-typeahead__input",
	    class: class_,
	    attrs: {
	      "type": "text",
	      "name": name,
	      "placeholder": placeholder,
	      "autocomplete": autocomplete,
	      "disabled": disabled
	    },
	    domProps: {
	      "value": _s(query_)
	    },
	    on: {
	      "keydown": [function($event) {
	        if ($event.keyCode !== 38) return;
	        $event.preventDefault();
	        up($event)
	      }, function($event) {
	        if ($event.keyCode !== 40) return;
	        $event.preventDefault();
	        down($event)
	      }, function($event) {
	        if ($event.keyCode !== 13) return;
	        $event.preventDefault();
	        enter($event)
	      }, function($event) {
	        if ($event.keyCode !== 27) return;
	        $event.preventDefault();
	        esc($event)
	      }],
	      "blur": blur,
	      "focus": focus,
	      "input": function($event) {
	        if ($event.target.composing) return;
	        query_ = $event.target.value
	      }
	    }
	  }), " ", _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (matchesState),
	      expression: "matchesState"
	    }],
	    staticClass: "vue-typeahead__matches",
	    style: ({
	      width: inputWidth
	    })
	  }, [_l((filteredItems), function(item, index) {
	    return _h('div', {
	      class: {
	        "_active": activeItem === index
	      },
	      domProps: {
	        "innerHTML": _s(modifyItems(item, query_))
	      },
	      on: {
	        "click": function($event) {
	          click(index)
	        }
	      }
	    })
	  })])])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-038b39ca", module.exports)
	  }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-typeahead.js.map