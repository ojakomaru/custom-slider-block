import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';

registerBlockType("oja/custom-slider", {
	title: "Oja Custom Slider",
	description:
		"スライダーを追加します,こちらのパネルからスライダーの各種設定が可能です。",
	category: "common",
	icon: "smiley",
	supports: {
		html: false,
	},
	edit: Edit,
	//save 関数で null を返す
	save: () => {
		return null;
	},
});
