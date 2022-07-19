<?php
function media_slider_render_func($attributes, $content) {

  //属性 imageUrl が空なら何も表示しない
  if (empty($attributes['imageUrl'])) {
    return '';
  }

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
  $slider_options .= ' data-slides-per-view="' .$attributes['slidesPerView'] . '"';

  if($attributes['slideCentered']) {
    $slider_options .= ' data-centeredSlides="true"';
  }
  //属性 imageUrl が空でなければスライダーのマークアップを組み立てる
  $output = '<div class="wp-block-oja-custom-slider">';
  $output .= '<div class="swiper oja-media-slider"'. $slider_options .'>';
  $output .= '<div class="swiper-wrapper">';

  $imageUrl = $attributes['imageUrl'];
  $imageCaption = $attributes['imageCaption'];
  $imageAlt = $attributes['imageAlt'];

  for($i = 0; $i < count($imageUrl); $i ++) {
    $img_url     = esc_url($imageUrl[$i]);
    $img_caption = $imageCaption[$i] ? esc_html($imageCaption[$i]): '';
    $img_alt     = $imageAlt[$i] ? esc_attr($imageAlt[$i]): '';
    if($img_alt !=="") {
      $output .= '<div class="swiper-slide">
                    <div class="media_slide">
                      <img className="card_image" src="'. $img_url . '" alt="' . $img_alt . '" />
                    </div>';
    } else {
      $output .= '<div class="swiper-slide">
                    <div class="media_slide">
                      <img className="card_image" src="'. $img_url . '" alt="" aria-hidden="true" />
                    </div>';
    }
    //キャプションを表示する場合
    if($attributes['showCaption']) {
      if($img_caption) {
        $output .= '<div class="caption">'. $img_caption . '</div>';
      }
    }
    $output .= '</div>';
  }

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