<?php

/**
 * Scrollbar Customizer
 * @support         support@wpmighty.com
 **/
namespace Scrollbarcustomizer;

// check here how to use settings builder: https://github.com/boospot/boo-settings-helper/wiki/Detailed-Example
use  RecursiveArrayIterator ;
use  RecursiveIteratorIterator ;
defined( 'ABSPATH' ) or die;
class Settings
{
    private static  $instance ;
    private static  $fields ;
    public function __construct()
    {
        // set fields
        static::setFields();
        // load admin assets
        add_action( 'admin_enqueue_scripts', [ $this, 'loadAssets' ] );
        // build menu
        add_action( 'admin_menu', [ $this, 'build' ] );
    }
    
    public function loadAssets( $hook_suffix )
    {
        // make sure to load assets on plugin settings page and not other pages
        if ( $hook_suffix != 'appearance_page_wp_customscrollbar_settings' ) {
            return;
        }
        // code mirror for custom css field
        $cm_settings['codeEditor'] = wp_enqueue_code_editor( array(
            'type' => 'text/css',
        ) );
        wp_localize_script( 'jquery', 'ScrollbarcustomizerSettings', $cm_settings );
        wp_enqueue_script( 'wp-theme-plugin-editor' );
        wp_enqueue_style( 'wp-codemirror' );
        // load css and js file
        wp_register_style( 'scrollbar-customizer-settings', SCROLLBAR_CUSTOMIZER_URL . '/assets/css/settings.css' );
        wp_register_script( 'scrollbar-customizer-settings', SCROLLBAR_CUSTOMIZER_URL . '/assets/js/settings.js' );
        wp_enqueue_style( 'scrollbar-customizer-settings' );
        wp_enqueue_script( 'scrollbar-customizer-settings' );
    }
    
    public function build()
    {
        // build settings page
        $config_array_plain = array(
            'prefix'   => 'wpcsb_',
            'tabs'     => true,
            'menu'     => array(
            'page_title' => __( 'Scrollbar Customizer Settings', 'scrollbar-customizer' ),
            'menu_title' => __( 'Scrollbar Customizer', 'scrollbar-customizer' ),
            'capability' => 'manage_options',
            'slug'       => 'wp_customscrollbar_settings',
            'icon'       => 'dashicons-admin-appearance',
            'position'   => 10,
            'parent'     => 'themes.php',
            'submenu'    => true,
        ),
            'sections' => array( array(
            'id'    => 'dimension_section',
            'title' => __( 'Dimension', 'scrollbar-customizer' ),
            'desc'  => __( 'These are dimension settings for scroll bar', 'scrollbar-customizer' ),
        ), array(
            'id'    => 'styling_section',
            'title' => __( 'Styling', 'scrollbar-customizer' ),
            'desc'  => __( 'These are styling settings for scroll bar', 'scrollbar-customizer' ),
        ), array(
            'id'    => 'advanced_section',
            'title' => __( 'Advanced', 'scrollbar-customizer' ),
            'desc'  => __( 'These are advanced settings for scroll bar', 'scrollbar-customizer' ),
        ) ),
            'fields'   => static::$fields,
            'links'    => array(
            'plugin_basename' => plugin_basename( __FILE__ ),
            'action_links'    => true,
        ),
        );
        $settings_helper = new Helper\Settings( $config_array_plain );
    }
    
    public static function setFields()
    {
        // build fields list
        static::$fields = [];
        static::$fields['dimension_section'] = array(
            array(
            'id'      => 'min_bar_length',
            'label'   => __( 'Minimum Dragger Height (px)', 'scrollbar-customizer' ),
            'options' => array(
            'min'  => 0,
            'max'  => 600,
            'step' => '1',
        ),
            'desc'    => __( 'unit in px', 'scrollbar-customizer' ),
            'type'    => 'number',
            'default' => '30',
        ),
            array(
            'id'      => 'max_bar_length',
            'label'   => __( 'Maximum Dragger Height (px)', 'scrollbar-customizer' ),
            'desc'    => __( 'unit in px', 'scrollbar-customizer' ),
            'options' => array(
            'min'  => 0,
            'max'  => 600,
            'step' => '1',
        ),
            'type'    => 'number',
            'default' => '100',
        ),
            array(
            'id'      => 'bar_width',
            'label'   => __( 'Bar Width (px)', 'scrollbar-customizer' ),
            'desc'    => __( 'unit in px', 'scrollbar-customizer' ),
            'options' => array(
            'min'  => 0,
            'max'  => 100,
            'step' => '1',
        ),
            'type'    => 'number',
            'default' => '15',
        ),
            array(
            'id'      => 'bar_side_space',
            'label'   => __( 'Bar Side Space (px)', 'scrollbar-customizer' ),
            'desc'    => __( 'unit in px', 'scrollbar-customizer' ),
            'options' => array(
            'min'  => 0,
            'max'  => 50,
            'step' => '1',
        ),
            'type'    => 'number',
            'default' => '4',
        )
        );
        static::$fields['styling_section'] = array( array(
            'id'    => 'separator2',
            'label' => __( 'Light Mode Theme', 'scrollbar-customizer' ),
            'type'  => 'separator',
        ), array(
            'id'      => 'bar_bg_color',
            'label'   => __( 'Background Color', 'scrollbar-customizer' ),
            'type'    => 'color',
            'default' => '#f0f0f1',
        ), array(
            'id'      => 'dragger_color',
            'label'   => __( 'Dragger Color', 'scrollbar-customizer' ),
            'type'    => 'color',
            'default' => '#1d2327',
        ) );
        /* border more fields */
        static::$fields['styling_section'][] = array(
            'id'    => 'separator3',
            'label' => __( 'More', 'scrollbar-customizer' ),
            'type'  => 'separator',
        );
        static::$fields['styling_section'][] = array(
            'id'      => 'bar_border_radius',
            'label'   => __( 'Border Radius (px)', 'scrollbar-customizer' ),
            'desc'    => __( 'unit in px', 'scrollbar-customizer' ),
            'options' => array(
            'min'  => 0,
            'max'  => 500,
            'step' => '1',
        ),
            'type'    => 'number',
            'default' => '4',
        );
        // custom css
        static::$fields['advanced_section'][] = array(
            'id'      => 'custom_css',
            'label'   => __( 'Custom CSS', 'scrollbar-customizer' ),
            'desc'    => __( 'Add your custom CSS code here', 'scrollbar-customizer' ),
            'type'    => 'textarea',
            'default' => '',
        );
    }
    
    public static function getOptions()
    {
        // set settings array
        self::setFields();
        // get settings array
        $tabs = static::$fields;
        $options = [];
        foreach ( $tabs as $fields ) {
            foreach ( $fields as $field ) {
                if ( $field['type'] == 'separator' ) {
                    continue;
                }
                $options[$field['id']] = get_option( 'wpcsb_' . $field['id'], $field['default'] );
            }
        }
        /* If some some settings doesn't exist use default */
        self::makeSureAllOptionsExist( $options );
        return $options;
    }
    
    public static function makeSureAllOptionsExist( &$options )
    {
        // advanced options
        $options['wheel_speed'] = ( isset( $options['wheel_speed'] ) ? $options['wheel_speed'] : 1 );
        $options['animation_on_hover'] = ( isset( $options['animation_on_hover'] ) ? $options['animation_on_hover'] : 0 );
        // gradient options
        $options['second_dragger_color'] = ( isset( $options['second_dragger_color'] ) ? $options['second_dragger_color'] : $options['dragger_color'] );
        $options['darkmode_second_dragger_color'] = ( isset( $options['darkmode_second_dragger_color'] ) ? $options['darkmode_second_dragger_color'] : $options['dragger_color'] );
        // darkmode options
        $options['darkmode_bar_bg_color'] = ( isset( $options['darkmode_bar_bg_color'] ) ? $options['darkmode_bar_bg_color'] : $options['bar_bg_color'] );
        $options['darkmode_dragger_color'] = ( isset( $options['darkmode_dragger_color'] ) ? $options['darkmode_dragger_color'] : $options['dragger_color'] );
    }
    
    public static function getInstance()
    {
        if ( !isset( self::$instance ) && !self::$instance instanceof self ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

}