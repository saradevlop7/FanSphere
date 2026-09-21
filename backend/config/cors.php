<?php

return [


    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    /* Définissez l'URL exacte de votre application React */
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],

    'allowed_origins_patterns' => [],

    /* Autorisez les en-têtes nécessaires, notamment Authorization pour le Token Bearer */
    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Indispensable si vous utilisez les cookies de session Sanctum



];
