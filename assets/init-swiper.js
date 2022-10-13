//swiper クラスを指定した要素（スライダーのコンテナ）を取得
const sliderElems = document.getElementsByClassName("swiper");

//取得した要素が1以上であればそれぞれの要素に対して以下を実行
if (sliderElems && sliderElems.length > 0) {
	for (let element of sliderElems) {
		//data 属性の値をパラメータの値として使用する変数に格納
		let elementSpeed = element.getAttribute("data-speed"), //遷移時間
			elementDirection = element.getAttribute("data-direction"), //スライドする方法。’horizontal’（横）か’vertical’（縦）
			elementAutoPlay = element.getAttribute("data-autoplay"), //自動再生
			elementLoop = element.getAttribute("data-loop"), //ループ
			elementEffect = element.getAttribute("data-effect"), //スライドエフェクト
			elementSlidesPerView = element.getAttribute("data-slides-per-view"), //ビューの表示枚数
			elementSlidesPerGroup = element.getAttribute("data-slides-per-group"), //指定した数のスライドがグループ化されて、同時にスライドする
			elementSpaceBetween = element.getAttribute("data-space-between"), //スライド同士の距離を設定
			elementCenteredSlides = element.getAttribute("data-centered-slides"); //三枚以上のスライドで、最初のスライド（アクティブなスライド）をセンターにする

		//data 属性が設定されていない場合は初期値（デフォルト）を設定及び型を変換
		if (!elementSpeed) {
			elementSpeed = 300;
		}
		if (!elementDirection) {
			elementDirection = "horizontal";
		}
		//data-autoplay が設定されていれば値を数値に変換し、設定されていなければ大きな値を設定
		if (elementAutoPlay) {
			elementAutoPlay = parseInt(elementAutoPlay);
		} else {
			elementAutoPlay = 999999999;
		}
		//真偽値の場合は文字列から真偽値に変換
		if (elementLoop == "true") {
			elementLoop = true;
		} else {
			elementLoop = false;
		}
		if (!elementSlidesPerView) {
			elementSlidesPerView = 1;
		}
		if (elementCenteredSlides == "true") {
			elementCenteredSlides = true;
		} else {
			elementCenteredSlides = false;
		}
		if (!elementSlidesPerGroup) {
			elementSlidesPerGroup = 1;
		}
		if (!elementSpaceBetween) {
			elementSpaceBetween = 0;
		}
		if (!elementEffect) {
			elementEffect = "slide";
		}

		let breakPoint;
		if (elementEffect && elementEffect !== "slide") {
			breakPoint = "";
		} else if (element.classList.contains("oja-media-slider")) {
			breakPoint = "";
		} else {
			breakPoint = {
				slidesPerView: 1,
				spaceBetween: 10,
				//breakpoints
				768: {
					slidesPerView: 2,
					spaceBetween: 22,
				},
				1080: {
					slidesPerView: 3,
					spaceBetween: 17,
				},
			};
		}

		//上記パラメータを使って Swiper を初期化
		let swiperSlider = new Swiper(element, {
			allowTouchMove: true, //フリック操作を有効に
			direction: elementDirection,
			speed: parseInt(elementSpeed),
			autoplay: {
				delay: elementAutoPlay,
			},
			loop: elementLoop,
			effect: elementEffect,
			slidesPerView: parseFloat(elementSlidesPerView),
			centeredSlides: elementCenteredSlides,
			slidesPerGroup: parseInt(elementSlidesPerGroup),
			spaceBetween: parseInt(elementSpaceBetween),

			pagination: {
				el: ".swiper-pagination",
				type: "bullets",
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 3,
			},
			navigation: {
				nextEl: ".swiper-button-next", //「次へボタン」要素の指定
				prevEl: ".swiper-button-prev", //「前へボタン」要素の指定
			},
			scrollbar: {
				el: ".swiper-scrollbar", //要素の指定
				draggable: true,
			},
			breakpoints: breakPoint, //レスポンシブ表示枚数
		});
	}
}
