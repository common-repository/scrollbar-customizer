<?php
/**
 * Scrollbar Customizer
 * @support         support@wpmighty.com
 **/

namespace Scrollbarcustomizer;

use Scrollbarcustomizer\Helper\Plugin;

defined( 'ABSPATH' ) or die();

final class Scrollbar
{

    private static $instance;
    private $options = [];
    public $pluginInfo = [];

    public function __construct()
    {

        // run on frontend only
        if (is_admin())
            return;

        // only on desktop
        if(!$this->isDesktop())
            return;

        // get plugin data
        $this->pluginInfo = Plugin::getData();


        // get page settings as array
        $this->options = Settings::getOptions();

        // wrap body content with our div tag
        add_action('wp_head', array($this, 'wrapBodyContent'), -1);

        // load assets
        add_action('wp_enqueue_scripts',[$this,'loadAssets']);


    }

    public function loadAssets(){

        // build js settings
        $jsSettings = [
            'wheelSpeed' => $this->options['wheel_speed'],
            'minBarLength' => $this->options['min_bar_length'],
            'maxBarLength' => $this->options['max_bar_length'],
            'scrollWidth' => $this->options['bar_width']
        ];

        // load js files
        wp_enqueue_script('scrollbar-customizer',  Plugin::getUrl(). '/assets/js/scrollbar.js', array(), $this->pluginInfo['Version'], true);

        // load inline js
        wp_localize_script('scrollbar-customizer', 'wpcsbData', $jsSettings);



        // laod css files
        wp_enqueue_style('scrollbar-customizer', Plugin::getUrl() . '/assets/css/scrollbar.css', array(), $this->pluginInfo['Version']);
        wp_add_inline_style( 'scrollbar-customizer', $this->options['custom_css'] );


        // load inline css

        $inlineCSS =  ":root{
            --wpcsb-scrollbar-width: {$this->options['bar_width']}px;
            --wpcsb-scrollbar-padding: {$this->options['bar_side_space']}px;
            --wpcsb-scrollbar-radius: {$this->options['bar_border_radius']}px;
            --wpcsb-scrollbar-bg: {$this->options['bar_bg_color']};
            --wpcsb-scrollbar-bg-dark: {$this->options['darkmode_bar_bg_color']};
            --wpcsb-scrollbar-primary: {$this->options['dragger_color']};
            --wpcsb-scrollbar-primary-dark: {$this->options['darkmode_dragger_color']};
            --wpcsb-scrollbar-secondary: {$this->options['second_dragger_color']};            
            --wpcsb-scrollbar-secondary-dark: {$this->options['darkmode_second_dragger_color']};            
        }";

        wp_add_inline_style('scrollbar-customizer', $inlineCSS);

    }

    public function isDesktop(){

        $device = new \Mobile_Detect();
        if ($device->isMobile() or $device->isTablet()) {
            return false;
        }

        return true;
    }


    public function wrapBodyContent(){

        ob_start();

        //get buffer on shutdown
        add_action('shutdown', array($this, 'insertDivAtBodyContent'), -1);

    }


    // insert div at body content
    public function insertDivAtBodyContent(){

        $class = $this->options['animation_on_hover'] ? 'wpcsb wpcsbAnimate' : 'wpcsb';

        print(preg_replace(
            "/<body(.*?)>(.*?)<\/body>/is", '<body$1>' . PHP_EOL . '<div id="wpcsbScrollbar" class="' . $class . '">$2</div>' . PHP_EOL . '</body>', ob_get_clean()));

    }



    public static function getInstance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) {

            self::$instance = new self;

        }

        return self::$instance;

    }


}
