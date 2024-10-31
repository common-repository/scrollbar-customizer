<?php

/**
 * Plugin Name:       Scrollbar Customizer
 * Plugin URI:        https://wpmighty.com/wordpress-plugins/scrollbar-customizer
 * Description:       Scrollbar Customizer is an advanced WordPress plugin that let you easily customize and change the design and control of the scrollbar in your website.
 * Version:           1.5.0
 * Requires at least: 5.4
 * Requires PHP:      7.2
 * Author:            WPMighty
 * Author URI:        https://wpmighty.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       scrollbar-customizer
 * Domain Path:       /languages
 */
use  Scrollbarcustomizer\Entrypoint ;
defined( 'ABSPATH' ) or die;

if ( !defined( 'SCROLLBAR_CUSTOMIZER_DIR' ) ) {
    define( 'SCROLLBAR_CUSTOMIZER_DIR', dirname( __FILE__ ) );
    define( 'SCROLLBAR_CUSTOMIZER_URL', plugins_url( plugin_basename( SCROLLBAR_CUSTOMIZER_DIR ) ) );
}


if ( function_exists( 'wpcsb_fs' ) ) {
    wpcsb_fs()->set_basename( false, __FILE__ );
} else {
    
    if ( !function_exists( 'wpcsb_fs' ) ) {
        // Create a helper function for easy SDK access.
        function wpcsb_fs()
        {
            global  $wpcsb_fs ;
            
            if ( !isset( $wpcsb_fs ) ) {
                // Activate multisite network integration.
                if ( !defined( 'WP_FS__PRODUCT_10150_MULTISITE' ) ) {
                    define( 'WP_FS__PRODUCT_10150_MULTISITE', true );
                }
                // Include Freemius SDK.
                require_once dirname( __FILE__ ) . '/libraries/vendor/freemius/wordpress-sdk/start.php';
                $wpcsb_fs = fs_dynamic_init( array(
                    'id'             => '10150',
                    'slug'           => 'scrollbar-customizer',
                    'premium_slug'   => 'scrollbar-customizer-pro',
                    'type'           => 'plugin',
                    'public_key'     => 'pk_c5c1fe6afdc3a972eabc1a9966f22',
                    'is_premium'     => false,
                    'premium_suffix' => 'Pro',
                    'has_addons'     => false,
                    'has_paid_plans' => true,
                    'trial'          => array(
                    'days'               => 30,
                    'is_require_payment' => false,
                ),
                    'menu'           => array(
                    'slug'    => 'wp_customscrollbar_settings',
                    'network' => true,
                    'parent'  => array(
                    'slug' => 'themes.php',
                ),
                ),
                    'is_live'        => true,
                ) );
            }
            
            return $wpcsb_fs;
        }
        
        // Init Freemius.
        wpcsb_fs();
        // Signal that SDK was initiated.
        do_action( 'wpcsb_fs_loaded' );
    }
    
    require_once __DIR__ . '/libraries/vendor/autoload.php';
    add_action( 'plugins_loaded', [ Entrypoint::get_instance(), 'load' ] );
}
