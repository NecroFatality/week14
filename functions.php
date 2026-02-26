<?php
// Enqueue parent theme styles
add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
function enqueue_parent_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// --------------------
// REST API Endpoints
// --------------------
add_action( 'rest_api_init', function () {
    register_rest_route( 'myplugin/v1', '/breakfast', array(
        'methods'  => 'GET',
        'callback' => 'get_all_breakfast',
        'permission_callback' => '__return_true',
    ));

    register_rest_route( 'myplugin/v1', '/lunch', array(
        'methods'  => 'GET',
        'callback' => 'get_all_lunch',
        'permission_callback' => '__return_true',
    ));

    register_rest_route( 'myplugin/v1', '/dinner', array(
        'methods'  => 'GET',
        'callback' => 'get_all_dinner',
        'permission_callback' => '__return_true',
    ));
    register_rest_route( 'myplugin/v1', '/dessert', array(
        'methods'  => 'GET',
        'callback' => 'get_all_dessert',
        'permission_callback' => '__return_true',
    ));
});

// --------------------
// SQL Query: BREAKFAST
// --------------------
function get_all_breakfast() {
    global $wpdb;

    $results = $wpdb->get_results(
        "SELECT 
            p.ID, 
            p.post_title, 
            p.post_name AS slug,
            p.post_content,
            pm1.meta_value AS recipe_name, 
            pm2.meta_value AS ingredients,
            pm3.meta_value AS steps,
            pm4.meta_value AS difficulty,
            pm5.meta_value AS video_link
         FROM {$wpdb->posts} p
         LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'recipe_name'
         LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'ingredients'
         LEFT JOIN {$wpdb->postmeta} pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'steps'
         LEFT JOIN {$wpdb->postmeta} pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'difficulty'
         LEFT JOIN {$wpdb->postmeta} pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'link'
         WHERE p.post_type = 'breakfast' AND p.post_status = 'publish'",
        ARRAY_A
    );

    return $results;
}

// --------------------
// SQL Query: LUNCH
// --------------------
function get_all_lunch() {
    global $wpdb;

    $results = $wpdb->get_results(
        "SELECT 
            p.ID, 
            p.post_title, 
            p.post_name AS slug,
            p.post_content,
            pm1.meta_value AS recipe_name, 
            pm2.meta_value AS ingredients,
            pm3.meta_value AS steps,
            pm4.meta_value AS difficulty,
            pm5.meta_value AS video_link
         FROM {$wpdb->posts} p
         LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'recipe_name'
         LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'ingredients'
         LEFT JOIN {$wpdb->postmeta} pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'steps'
         LEFT JOIN {$wpdb->postmeta} pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'difficulty'
         LEFT JOIN {$wpdb->postmeta} pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'link'
         WHERE p.post_type = 'lunch' AND p.post_status = 'publish'",
        ARRAY_A
    );

    return $results;
}

// --------------------
// SQL Query: DINNER
// --------------------
function get_all_dinner() {
    global $wpdb;

    $results = $wpdb->get_results(
        "SELECT 
            p.ID, 
            p.post_title, 
            p.post_name AS slug,
            p.post_content,
            pm1.meta_value AS recipe_name, 
            pm2.meta_value AS ingredients,
            pm3.meta_value AS steps,
            pm4.meta_value AS difficulty,
            pm5.meta_value AS video_link
         FROM {$wpdb->posts} p
         LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'recipe_name'
         LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'ingredients'
         LEFT JOIN {$wpdb->postmeta} pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'steps'
         LEFT JOIN {$wpdb->postmeta} pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'difficulty'
         LEFT JOIN {$wpdb->postmeta} pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'link'
         WHERE p.post_type = 'dinner' AND p.post_status = 'publish'",
        ARRAY_A
    );

    return $results;
}

// --------------------
// SQL Query: DESSERT
// --------------------
function get_all_dessert() {
    global $wpdb;

    $results = $wpdb->get_results(
        "SELECT 
            p.ID, 
            p.post_title, 
            p.post_name AS slug,
            p.post_content,
            pm1.meta_value AS recipe_name, 
            pm2.meta_value AS ingredients,
            pm3.meta_value AS steps,
            pm4.meta_value AS difficulty,
            pm5.meta_value AS video_link
         FROM {$wpdb->posts} p
         LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'recipe_name'
         LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'ingredients'
         LEFT JOIN {$wpdb->postmeta} pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'steps'
         LEFT JOIN {$wpdb->postmeta} pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'difficulty'
         LEFT JOIN {$wpdb->postmeta} pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'link'
         WHERE p.post_type = 'dessert' AND p.post_status = 'publish'",
        ARRAY_A
    );

    return $results;
}