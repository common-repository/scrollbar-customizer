<?php
/**
 * Scrollbar Customizer
 * @support         support@wpmighty.com
 **/

namespace Scrollbarcustomizer;

use Scrollbarcustomizer\Helper;

defined('ABSPATH') or die();

final class Entrypoint
{

    private static $instance;

    public function load()
    {

        if (is_admin()) { // backend

            // load language
            $plugin_rel_path = SCROLLBAR_CUSTOMIZER_DIR . '/languages';
            load_plugin_textdomain( 'scrollbar-customizer', false, $plugin_rel_path );

            Settings::getInstance();

        } else { // frontend
            Scrollbar::getInstance();
        }


    }

    public static function get_instance()
    {

        if (!isset(self::$instance) && !(self::$instance instanceof self)) {

            self::$instance = new self;

        }

        return self::$instance;

    }

}