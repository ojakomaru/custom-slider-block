<?php
/**
 * Plugin Name:       Oja Custom Slider
 * Description:       おジャコのスライダーブロックです
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            ojako
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-slider
 *
 * @package           oja
 */
/*  Copyright 2021 ojako (email : youthfulday.8348@gmail.com)
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

new OjaSliderBlock;

class OjaSliderBlock {
  public function __construct() {
    // ブロック登録
    add_action( 'init', array($this, 'oja_slider_block_init'));
    // アセットファイルの読み込み
    add_action('enqueue_block_assets', array($this, 'add_oja_swiper_scripts'));
  }

  public function oja_slider_block_init() {
    if ( !function_exists('register_block_type')) {
      return;
    }
    $dir = dirname( __FILE__ );

    $script_asset_path = "$dir/build/index.asset.php";
    if ( ! file_exists( $script_asset_path ) ) {
      throw new Error(
        'You need to run `npm start` or `npm run build` for the "oja/custom-slider" block first.'
      );
    }
    $index_js     = 'build/index.js';
    $script_asset = require( $script_asset_path );
    wp_register_script(
      'oja-slider-script',
      plugins_url( $index_js, __FILE__ ),
      $script_asset['dependencies'],
      $script_asset['version']
    );
  
    $editor_css = 'build/index.css';
    wp_register_style(
      'oja-slider-editor-style',
      plugins_url( $editor_css, __FILE__ ),
      array(),
      filemtime( "$dir/$editor_css" )
    );
  
    $style_css = 'build/style-index.css';
    wp_register_style(
      'oja-slider-style',
      plugins_url( $style_css, __FILE__ ),
      array(),
      filemtime( "$dir/$style_css" )
    );
  
    register_block_type( 'oja/custom-slider', array(
      'editor_script' => 'oja-slider-script',
      'editor_style'  => 'oja-slider-editor-style',
      'style'         => 'oja-slider-style',
      'render_callback' => 'oja_slider_render_func',
      //属性を追加
      'attributes' => [
        //投稿スライダーにする真偽値
        'isPostSlider' => [
          'type'    => 'boolean',
          'default' => true
        ],
        // selectedPostId を属性として追加
        'selectedPostId' => [
          'type' => 'array',
          'default' => []
        ],
        //属性 mediaID（メディア ID の配列）
        'mediaID' => [
          'type'    => 'array',
          'default' => []
        ],
        //属性 imageUrl（URL の配列）
        'imageUrl' => [
          'type'    => 'array',
          'default' => []
        ],
        //属性 imageAlt（alt 属性の配列）
        'imageAlt' => [
          'type'    => 'array',
          'default' => []
        ],
        //属性 imageCaption（キャプションの配列）
        'imageCaption' => [
          'type'    => 'array',
          'default' => []
        ],
        //ナビゲーションボタンの表示・非表示
        'showNavigationButton' => [
          'type'    => 'boolean',
          'default' => true
        ],
        //ページネーションの表示・非表示
        'showPagination' => [
          'type'    => 'boolean',
          'default' => true
        ],
        //スクロールバーンの表示・非表示
        'showScrollbar' => [
          'type'    => 'boolean',
          'default' => true
        ],
        //キャプションの表示・非表示
        'showCaption' => [
          'type'    => 'boolean',
          'default' => true
        ],
        //スライダー自動再生
        'slideAutoPlay' => [
          'type'    => 'number',
          'default' => 3500
        ],
        //スライダースピード
        'slideSpeed' => [
          'type'    => 'number',
          'default' => 400
        ],
        //スライダーのループ設定
        'slideLoopEnable' => [
          'type'    => 'boolean',
          'default' => true
        ],
        //スライダーのエフェクト
        'slideEffect' => [
          'type'    => 'string',
          'default' => 'slide'
        ],
        //スライダーの画像表示枚数
        'slidesPerView' => [
          'type'    => 'number',
          'default' => 1
        ],
        //スライダー画像の中央寄せ
        'slideCentered' => [
          'type'    => 'boolean',
          'default' => true
        ],
      ]
    ) );
  }

  //// カスタムスクリプトのファイル群を読み込み
  public function add_oja_swiper_scripts() {
    $dir = dirname( __FILE__ );

    //Swiper の JavaScript ファイルの読み込み（エンキュー）
    wp_enqueue_script(
      'swiper-slider',
      plugins_url( '/assets/swiper.js', __FILE__ ),
      array(),
      filemtime( "$dir/assets/swiper.js" ),
      true
    );

    //Swiper を初期化するためのファイルの読み込み（エンキュー）
    wp_enqueue_script(
      'swiper-slider-init',
      plugins_url( '/assets/init-swiper.js', __FILE__ ),
      //依存ファイルに上記 Swiper の JavaScript を指定
      array('swiper-slider'),
      filemtime( "$dir/assets/init-swiper.js" ),
      true
    );

    //Swiper の CSS ファイルの読み込み（エンキュー）
    wp_enqueue_style(
      'swipe-style',
      plugins_url( '/assets/swiper.css', __FILE__ ),
      array(),
      filemtime( "$dir/assets/swiper.css"  )
    );

  }
} // class OjaSliderBlock

//ダイナミックブロックによるレンダリング
function oja_slider_render_func($attributes, $content) {
  if( $attributes['isPostSlider']) {
    //画像ブロックレンダリング
    require_once dirname(__FILE__) . '/views/media_slider_render.php';
    return media_slider_render_func($attributes, $content);
  } else {
    require_once dirname(__FILE__) . '/views/post_slider_render.php';
    return post_slider_render_func($attributes, $content);
  }
}


