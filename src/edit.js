import { 	BlockControls, MediaUpload, MediaUploadCheck, InspectorControls } from "@wordpress/block-editor";
import {
	Placeholder,
	Button,
	Toolbar,
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	SelectControl,
	CheckboxControl,
	Spinner,
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import PostsSelect from "./posts-select";
import "./editor.scss";
import React, { useRef } from 'react';

export default function Edit(props) {
	//分割代入を使って props 経由でプロパティを変数に代入
	const { className, attributes, setAttributes } = props;

  //投稿を選択する関数
  const postArray = useRef([]);
  const selectPost = (postId) => {
    if (postArray.current.includes(parseInt(postId[0]))) {
      let index = postArray.current.indexOf(parseInt(postId[0]));
      postArray.current.splice(index, 1);
      setAttributes({ selectedPostId: postArray.current});
    } else {
      postArray.current.push(parseInt(postId[0]));
      setAttributes({ selectedPostId: postArray.current});
    }
  };

	//ツールバーで投稿切り替えボタンを追加する関数
	const getSliderChange = () => {
		return (
			<BlockControls>
				<Toolbar>
					<Button
						//属性 isPostSlider の値により表示するラベルを切り替え
						label={attributes.isPostSlider ? "画像スライド" : "投稿スライド"}
						//属性 isPostSlider の値により表示するアイコンを切り替え
						icon={attributes.isPostSlider ? "images-alt" : "wordpress"}
						className="imgChangeButton"
						//setAttributes を使って属性の値を更新（真偽値を反転）
						onClick={() =>
							setAttributes({ isPostSlider: !attributes.isPostSlider })
						}
					/>
				</Toolbar>
			</BlockControls>
		);
	};

	//選択された画像の情報を更新する関数
	const onSelectImage = (media) => {
		// media から map で id プロパティの配列を生成
		const media_ID = media.map((image) => image.id);
		// media から map で url プロパティの配列を生成
		const imageUrl = media.map((image) => image.url);
		// media から map で alt プロパティの配列を生成
		const imageAlt = media.map((image) => image.alt);
		// media から map で caption プロパティの配列を生成
		const imageCaption = media.map((image) => image.caption);

		setAttributes({
			mediaID: media_ID, //メディア ID の配列
			imageUrl: imageUrl, // URL の配列
			imageAlt: imageAlt, // alt 属性の配列
			imageCaption: imageCaption, // キャプションの配列
		});
	};

	//URL の配列から画像を生成
	const getImages = (urls) => {
		let imagesArray = urls.map((url) => {
			return <img src={url} className="image" alt="アップロード画像" />;
		});
		return imagesArray;
	};

	//URL とキャプションの配列から画像をキャプション付きで生成（for 文に変更）
	const getImagesWithCaption = (url, caption) => {
		let imagesArray = [];
		for (let i = 0; i < url.length; i++) {
			imagesArray.push(
				<figure>
					<img src={url[i]} className="image" alt="アップロード画像" />
					<figcaption className="block-image-caption">
						{caption[i] ? caption[i] : ""}
					</figcaption>
				</figure>
			);
		}
		return imagesArray;
	};

	//メディアライブラリを開くボタンをレンダリングする関数（上記関数を使って画像をレンダリング）
	const getImageButton = (open) => {
		if (attributes.imageUrl.length > 0) {
			return (
				<div onClick={open} className="slider-block-container">
					{attributes.showCaption
						? getImagesWithCaption(attributes.imageUrl, attributes.imageCaption)
						: getImages(attributes.imageUrl)}
				</div>
			);
		} else {
			return (
				<div className="button-container">
					<Button onClick={open} className="button button-large">
						画像をアップロード
					</Button>
				</div>
			);
		}
	};

	//画像を削除する（メディアをリセットする）関数
	const removeMedia = () => {
		setAttributes({
			mediaID: [],
			imageUrl: [],
			imageAlt: [],
			imageCaption: [],
		});
	};

	//インスペクターを追加する関数
	const getInspectorControls = () => {
		return (
			<InspectorControls>
				<PanelBody title="Slider Settings" initialOpen={true}>
					<PanelRow>
						<ToggleControl
							label="ナビゲーションボタン"
							checked={attributes.showNavigationButton}
							onChange={(val) => setAttributes({ showNavigationButton: val })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="ページネーション"
							checked={attributes.showPagination}
							onChange={(val) => setAttributes({ showPagination: val })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="スクロールバー"
							checked={attributes.showScrollbar}
							onChange={(val) => setAttributes({ showScrollbar: val })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="キャプション"
							checked={attributes.showCaption}
							onChange={(val) => setAttributes({ showCaption: val })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="スライダー詳細設定" initialOpen={false}>
					<PanelRow>
						<RangeControl
							label="自動再生"
							value={attributes.slideAutoPlay}
							onChange={(val) => setAttributes({ slideAutoPlay: val })}
							min={0}
							max={8000}
							step={100}
							help="自動生成しない場合は0を指定"
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label="スライドスピード"
							value={attributes.slideSpeed}
							onChange={(val) => setAttributes({ slideSpeed: val })}
							min={100}
							max={1000}
							step={100}
							help="数値を上げるほどゆっくりになります"
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="エフェクト"
							value={attributes.slideEffect}
							options={[
								{ label: "Slide", value: "slide" },
								{ label: "Fade", value: "fade" },
								{ label: "Cube", value: "cube" },
								{ label: "Coverflow", value: "coverflow" },
								{ label: "Flip", value: "flip" },
							]}
							onChange={(val) => setAttributes({ slideEffect: val })}
						/>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label="ループ"
							checked={attributes.slideLoopEnable}
							onChange={(val) => setAttributes({ slideLoopEnable: val })}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label="表示数"
              help="一度に表示される枚数"
							value={attributes.slidesPerView}
							onChange={(val) => setAttributes({ slidesPerView: val })}
							min={1}
							max={5}
						/>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label="中央配置"
							checked={attributes.slideCentered}
							onChange={(val) => setAttributes({ slideCentered: val })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	};

	return [
		getSliderChange(), //投稿スライド切り替えボタン
		getInspectorControls(), //インスペクター
		<div className={className}>
			{attributes.isPostSlider && (
				<Fragment>
					<MediaUploadCheck>
						<MediaUpload
							multiple={true}
							gallery={true}
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={attributes.mediaID}
							render={({ open }) => getImageButton(open)}
						/>
					</MediaUploadCheck>
					{attributes.imageUrl.length != 0 && ( // imageUrl（配列の長さ）で判定
						<MediaUploadCheck>
							<Button
								onClick={removeMedia}
								isLink
								isDestructive
								className="removeImage"
							>
								画像を削除
							</Button>
						</MediaUploadCheck>
					)}
				</Fragment>
			)}
			{!attributes.isPostSlider && (
				<div className={className}>
					<Placeholder
						label="投稿スライダー"
						icon="wordpress"
						instructions="スライダーに表示する投稿を選択"
					>
						<PostsSelect
							selectedPostId={attributes.selectedPostId}
							selectPost={selectPost}
						/>
					</Placeholder>
				</div>
			)}
		</div>,
	];
}
