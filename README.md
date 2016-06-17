# Platform UI Search Prototype Bundle

PlatformUISearchPrototypeBundle is a Platform UI extension prototype
that provides full text search capabilities to editors.


## Installation

1. From your eZ Platform installation, run composer:

  ```
  $ composer require ezsystems/platform-ui-search-prototype-bundle
  ```

2. Enable the bundle by adding:

  ```
  new EzSystems\EzContentOnTheFlyBundle\EzSystemsEzContentOnTheFlyBundle()
  ```

  to `app/AppKernel.php`.

3. Clear cache and setup assets with `composer run-script post-update-cmd`

   *(if you use prod env make sure that is set with `export SYMFONY_ENV=prod` first)*.
