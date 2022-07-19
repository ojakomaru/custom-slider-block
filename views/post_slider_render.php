<?php
function post_slider_render_func($attributes, $content) {
  // 投稿が選択されていれば（値が初期値の 0 より大きければ）
  if ($attributes['selectedPostId']) {
    $post_type = get_post_type();
    $args = array(
      'order'   => 'ASC',
      'orderby' => 'title',
      'post_type' => $post_type,
      'post__in' => $attributes['selectedPostId'],
    );

    //スライダーのオプション（attributes の値により data 属性を追加）
    $slider_options = '';

    if($attributes['slideAutoPlay'] !== 0) {
      $slider_options .= 'data-autoplay="'.$attributes['slideAutoPlay'].'"';
    }

    $slider_options .= ' data-speed="'.$attributes['slideSpeed'].'"';

    if($attributes['slideLoopEnable']) {
      $slider_options .= ' data-loop="true"';
    }

    if($attributes['slideEffect'] !== 'slide') {
      $slider_options .= ' data-effect="' .$attributes['slideEffect']. '"';
    }
    // $slider_options .= ' data-slides-per-view="' .$attributes['slidesPerView'] . '"';

    if($attributes['slideCentered']) {
      $slider_options .= ' data-centeredSlides="true"';
    }

    $the_query = new WP_Query( $args );
    if ( $the_query->have_posts() ) {
      //該当する投稿があればスライダーのマークアップを組み立てる
      $output = '<div class="wp-block-oja-custom-slider">';
      $output .= '<div class="swiper oja-post-slider"'. $slider_options .'>';
      $output .= '<div class="swiper-wrapper">';
      while ( $the_query->have_posts() ) {
        $the_query->the_post();
        $output .=
        '<div class="swiper-slide">
          <div class="item_detail">
            <a href="'. get_the_permalink() . '" class="item_page">
              <div class="post_thumbnail">';
                if (has_post_thumbnail()):
                  $output .= get_the_post_thumbnail();
                else:
                  $output .=
                  '<img src="' . get_stylesheet_directory_uri() . '/img/no-image.png" alt="アイキャッチ画像がない時の代替画像です">';
                endif;
              $output .=
              '</div>
              <div class="post_text">
                <h1>' . get_the_title() . '</h1>
              </div>
            </a>
          </div>
        </div>';
      }
      wp_reset_postdata(); //グローバル変数 $post を復元
      $output .= '</div>';

      //ページネーションを表示する場合
      if($attributes['showPagination']) {
        $output .= '<div class="swiper-pagination"></div>';
      }
      //ナビゲーションボタンを表示する場合
      if($attributes['showNavigationButton']) {
        $output .= '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>';
      }
      //スクロールバーを表示する場合
      if($attributes['showScrollbar']) {
        $output .= '<div class="swiper-scrollbar"></div>';
      }
      $output .= '</div></div>';
      return $output;
    }
  } // if ($attributes['selectedPostId'])
}