jQuery( document ).ready( function ($) {
    jQuery(document).ready(function($) {
        if($('#custom_css').length > 0){
            wp.codeEditor.initialize($('#custom_css'), ScrollbarcustomizerSettings);
        }
    })
} );