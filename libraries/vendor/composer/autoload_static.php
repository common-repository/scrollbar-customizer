<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit059e583d2c7b0cd5dd53d0b9c7ffa040
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Scrollbarcustomizer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Scrollbarcustomizer\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'D' => 
        array (
            'Detection' => 
            array (
                0 => __DIR__ . '/..' . '/mobiledetect/mobiledetectlib/namespaced',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Mobile_Detect' => __DIR__ . '/..' . '/mobiledetect/mobiledetectlib/Mobile_Detect.php',
        'Scrollbarcustomizer\\Entrypoint' => __DIR__ . '/../..' . '/src/Entrypoint.php',
        'Scrollbarcustomizer\\Helper\\Plugin' => __DIR__ . '/../..' . '/src/Helper/Plugin.php',
        'Scrollbarcustomizer\\Helper\\Settings' => __DIR__ . '/../..' . '/src/Helper/Settings.php',
        'Scrollbarcustomizer\\Scrollbar' => __DIR__ . '/../..' . '/src/Scrollbar.php',
        'Scrollbarcustomizer\\Settings' => __DIR__ . '/../..' . '/src/Settings.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit059e583d2c7b0cd5dd53d0b9c7ffa040::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit059e583d2c7b0cd5dd53d0b9c7ffa040::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit059e583d2c7b0cd5dd53d0b9c7ffa040::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit059e583d2c7b0cd5dd53d0b9c7ffa040::$classMap;

        }, null, ClassLoader::class);
    }
}
