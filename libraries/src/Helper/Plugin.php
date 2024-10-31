<?php
/**
 * Scrollbar Customizer
 * @support         support@wpmighty.com
 **/

namespace Scrollbarcustomizer\Helper;

defined( 'ABSPATH' ) or die();

final class Plugin
{
    /*
     * Get plugin information like version, name ..
     */
    public static function getData()
    {
        require_once ABSPATH.'/wp-admin/includes/plugin.php';

        return get_plugin_data( SCROLLBAR_CUSTOMIZER_DIR.'/scrollbar-customizer.php');

    }

    public static function getUrl(){

        return SCROLLBAR_CUSTOMIZER_URL;

    }


}