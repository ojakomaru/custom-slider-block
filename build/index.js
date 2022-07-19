/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _posts_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./posts-select */ "./src/posts-select.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);







function Edit(props) {
  //分割代入を使って props 経由でプロパティを変数に代入
  const {
    className,
    attributes,
    setAttributes
  } = props; //投稿を選択する関数

  const postArray = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)([]);

  const selectPost = postId => {
    if (postArray.current.includes(parseInt(postId[0]))) {
      let index = postArray.current.indexOf(parseInt(postId[0]));
      postArray.current.splice(index, 1);
      setAttributes({
        selectedPostId: postArray.current
      });
    } else {
      postArray.current.push(parseInt(postId[0]));
      setAttributes({
        selectedPostId: postArray.current
      });
    }
  }; //ツールバーで投稿切り替えボタンを追加する関数


  const getSliderChange = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Toolbar, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button //属性 isPostSlider の値により表示するラベルを切り替え
    , {
      label: attributes.isPostSlider ? "画像スライド" : "投稿スライド" //属性 isPostSlider の値により表示するアイコンを切り替え
      ,
      icon: attributes.isPostSlider ? "images-alt" : "wordpress",
      className: "imgChangeButton" //setAttributes を使って属性の値を更新（真偽値を反転）
      ,
      onClick: () => setAttributes({
        isPostSlider: !attributes.isPostSlider
      })
    })));
  }; //選択された画像の情報を更新する関数


  const onSelectImage = media => {
    // media から map で id プロパティの配列を生成
    const media_ID = media.map(image => image.id); // media から map で url プロパティの配列を生成

    const imageUrl = media.map(image => image.url); // media から map で alt プロパティの配列を生成

    const imageAlt = media.map(image => image.alt); // media から map で caption プロパティの配列を生成

    const imageCaption = media.map(image => image.caption);
    setAttributes({
      mediaID: media_ID,
      //メディア ID の配列
      imageUrl: imageUrl,
      // URL の配列
      imageAlt: imageAlt,
      // alt 属性の配列
      imageCaption: imageCaption // キャプションの配列

    });
  }; //URL の配列から画像を生成


  const getImages = urls => {
    let imagesArray = urls.map(url => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: url,
        className: "image",
        alt: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u753B\u50CF"
      });
    });
    return imagesArray;
  }; //URL とキャプションの配列から画像をキャプション付きで生成（for 文に変更）


  const getImagesWithCaption = (url, caption) => {
    let imagesArray = [];

    for (let i = 0; i < url.length; i++) {
      imagesArray.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: url[i],
        className: "image",
        alt: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u753B\u50CF"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figcaption", {
        className: "block-image-caption"
      }, caption[i] ? caption[i] : "")));
    }

    return imagesArray;
  }; //メディアライブラリを開くボタンをレンダリングする関数（上記関数を使って画像をレンダリング）


  const getImageButton = open => {
    if (attributes.imageUrl.length > 0) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        onClick: open,
        className: "slider-block-container"
      }, attributes.showCaption ? getImagesWithCaption(attributes.imageUrl, attributes.imageCaption) : getImages(attributes.imageUrl));
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "button-container"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: open,
        className: "button button-large"
      }, "\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9"));
    }
  }; //画像を削除する（メディアをリセットする）関数


  const removeMedia = () => {
    setAttributes({
      mediaID: [],
      imageUrl: [],
      imageAlt: [],
      imageCaption: []
    });
  }; //インスペクターを追加する関数


  const getInspectorControls = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: "Slider Settings",
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: "\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u30DC\u30BF\u30F3",
      checked: attributes.showNavigationButton,
      onChange: val => setAttributes({
        showNavigationButton: val
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: "\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3",
      checked: attributes.showPagination,
      onChange: val => setAttributes({
        showPagination: val
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: "\u30B9\u30AF\u30ED\u30FC\u30EB\u30D0\u30FC",
      checked: attributes.showScrollbar,
      onChange: val => setAttributes({
        showScrollbar: val
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
      checked: attributes.showCaption,
      onChange: val => setAttributes({
        showCaption: val
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: "\u30B9\u30E9\u30A4\u30C0\u30FC\u8A73\u7D30\u8A2D\u5B9A",
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: "\u81EA\u52D5\u518D\u751F",
      value: attributes.slideAutoPlay,
      onChange: val => setAttributes({
        slideAutoPlay: val
      }),
      min: 0,
      max: 8000,
      step: 100,
      help: "\u81EA\u52D5\u751F\u6210\u3057\u306A\u3044\u5834\u5408\u306F0\u3092\u6307\u5B9A"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: "\u30B9\u30E9\u30A4\u30C9\u30B9\u30D4\u30FC\u30C9",
      value: attributes.slideSpeed,
      onChange: val => setAttributes({
        slideSpeed: val
      }),
      min: 100,
      max: 1000,
      step: 100,
      help: "\u6570\u5024\u3092\u4E0A\u3052\u308B\u307B\u3069\u3086\u3063\u304F\u308A\u306B\u306A\u308A\u307E\u3059"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: "\u30A8\u30D5\u30A7\u30AF\u30C8",
      value: attributes.slideEffect,
      options: [{
        label: "Slide",
        value: "slide"
      }, {
        label: "Fade",
        value: "fade"
      }, {
        label: "Cube",
        value: "cube"
      }, {
        label: "Coverflow",
        value: "coverflow"
      }, {
        label: "Flip",
        value: "flip"
      }],
      onChange: val => setAttributes({
        slideEffect: val
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
      label: "\u30EB\u30FC\u30D7",
      checked: attributes.slideLoopEnable,
      onChange: val => setAttributes({
        slideLoopEnable: val
      })
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: "\u8868\u793A\u6570",
      help: "\u4E00\u5EA6\u306B\u8868\u793A\u3055\u308C\u308B\u679A\u6570",
      value: attributes.slidesPerView,
      onChange: val => setAttributes({
        slidesPerView: val
      }),
      min: 1,
      max: 5
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
      label: "\u4E2D\u592E\u914D\u7F6E",
      checked: attributes.slideCentered,
      onChange: val => setAttributes({
        slideCentered: val
      })
    }))));
  };

  return [getSliderChange(), //投稿スライド切り替えボタン
  getInspectorControls(), //インスペクター
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, attributes.isPostSlider && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    multiple: true,
    gallery: true,
    onSelect: onSelectImage,
    allowedTypes: ["image"],
    value: attributes.mediaID,
    render: _ref => {
      let {
        open
      } = _ref;
      return getImageButton(open);
    }
  })), attributes.imageUrl.length != 0 && // imageUrl（配列の長さ）で判定
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: removeMedia,
    isLink: true,
    isDestructive: true,
    className: "removeImage"
  }, "\u753B\u50CF\u3092\u524A\u9664"))), !attributes.isPostSlider && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
    label: "\u6295\u7A3F\u30B9\u30E9\u30A4\u30C0\u30FC",
    icon: "wordpress",
    instructions: "\u30B9\u30E9\u30A4\u30C0\u30FC\u306B\u8868\u793A\u3059\u308B\u6295\u7A3F\u3092\u9078\u629E"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_posts_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
    selectedPostId: attributes.selectedPostId,
    selectPost: selectPost
  }))))];
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("oja/custom-slider", {
  title: "Oja Custom Slider",
  description: "スライダーを追加します,こちらのパネルからスライダーの各種設定が可能です。",
  category: "common",
  icon: "smiley",
  supports: {
    html: false
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  //save 関数で null を返す
  save: () => {
    return null;
  }
});

/***/ }),

/***/ "./src/posts-select.js":
/*!*****************************!*\
  !*** ./src/posts-select.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




const PostsSelect = props => {
  const {
    posts,
    selectedPostId,
    selectPost
  } = props; //SelectControl の options プロパティに指定する投稿のタイトルとIDから成るオブジェクトの配列

  let select_options = [];

  if (posts) {
    select_options.push({
      value: 0,
      label: "投稿を選択",
      disabled: true
    });
    posts.forEach(post => {
      select_options.push({
        value: post.id,
        label: post.title.rendered
      });
    });
  } else {
    select_options.push({
      value: 0,
      label: "読み込み中",
      disabled: true
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    id: "oja_posts_select",
    multiple: true,
    options: select_options //投稿データの配列
    ,
    value: selectedPostId //更新された配列
    ,
    onChange: selectPost //値の更新メソッド

  });
};

;
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)((select, props) => {
  //現在の投稿の post ID を取得
  const currentPostId = select("core/editor").getCurrentPostId(),
        //現在の投稿タイプ名を取得
  curentPostType = select('core/editor').getCurrentPostType(); //クエリパラメータ

  const query = {
    per_page: -1,
    order: 'desc',
    status: 'publish',
    exclude: currentPostId //現在の投稿は除外

  };
  return {
    posts: select("core").getEntityRecords('postType', curentPostType, query)
  };
})(PostsSelect));

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcustom_slider"] = self["webpackChunkcustom_slider"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map