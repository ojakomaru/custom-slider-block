import { withSelect } from '@wordpress/data';
import { SelectControl } from "@wordpress/components";

const PostsSelect = (props) => {
	const { posts, selectedPostId, selectPost } = props;

	//SelectControl の options プロパティに指定する投稿のタイトルとIDから成るオブジェクトの配列
	let select_options = [];
	if (posts) {
		select_options.push({ value: 0, label: "投稿を選択", disabled: true });
		posts.forEach((post) => {
			select_options.push({ value: post.id, label: post.title.rendered });
		});
	} else {
		select_options.push({ value: 0, label: "読み込み中", disabled: true });
	}

	return (
		<SelectControl
			id="oja_posts_select"
			multiple
			options={select_options} //投稿データの配列
      value={ selectedPostId } //更新された配列
			onChange={selectPost}    //値の更新メソッド
		/>
  );
};;

export default withSelect((select, props) => {
  //現在の投稿の post ID を取得
	const currentPostId  = select("core/editor").getCurrentPostId(),
  //現在の投稿タイプ名を取得
        curentPostType = select('core/editor').getCurrentPostType();
	//クエリパラメータ
	const query = {
		per_page: -1,
    order: 'desc',
    status: 'publish',
		exclude: currentPostId, //現在の投稿は除外
	};
	return {
		posts: select("core").getEntityRecords('postType', curentPostType, query),
	};
})(PostsSelect);