# web-app-class-maps

A collection of scripts for easier and future-proof web app theming.

## Usage

```
$ bun i @web-app-class-maps/scripts
$ bun x @web-app-class-maps/scripts <app> <script> <page>
```

Note that running the `build-class-modules` and `make-readable-classes` scripts in Steam require the app running with the `-cef-enable-debugging` launch option, or with Millennium and the `-dev` launch option.

## Scripts

| Name                  | Description                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| build-class-modules   | Generates a class map file for usage with other scripts.                                                                                   |
| make-readable-classes | Adds readable versions of classes to the focused window/page. ![Preview][classes-preview]                                                  |
| migrate               | _Try to_ migrate to using readable class names. Other rules that can't be sorted/found go in `_UNSORTED.css`/`_NOTFOUND.css` respectively. |
| replace-old-classes   | Replaces old classes with new ones for themes not using the [template][template].                                                          |

## Pages

| Name                    | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| steamapppage            | Related items & controller info in https://store.steampowered.com/app/666220 |
| steamaccountpreferences | https://store.steampowered.com/account                                       |
| steamclient             | The Steam client                                                             |
| steamnotificationspage  | https://steamcommunity.com/my/notifications                                  |
| steamprofileedit        | https://steamcommunity.com/my/edit                                           |
| steamshoppingcart       | https://store.steampowered.com/cart                                          |
| steamstoremenu          | https://store.steampowered.com (or any Steam store page)                     |

Note that, for Steam, directories have to be named `apppage` instead of `steamapppage`, etc.

## Errors

| Name                      | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| #ClassName is undefined   | Typo or that class either got renamed or removed, and so you will have to update it yourself.     |
| [mod_name] no such module | Typo or that module either got renamed or removed, see diffs [here][diffs] depending on the page. |
| [map_name] no such map    | Use `bun x @web-app-class-maps/scripts <app> build-class-modules map_name` to create it.          |

## Config

Configured through a `web-app-class-maps.config.js` (or the one from [here][config-files]) file that must `export default` an [object][config-docs]. It's optional and has defaults listed [here][config-defaults].

[classes-preview]: ./assets/classes-preview.png
[config-defaults]: https://github.com/ricewind012/web-app-class-maps/blob/master/packages/web-app-class-maps/constants.ts#L14-L17
[config-docs]: https://github.com/ricewind012/web-app-class-maps/blob/master/packages/web-app-class-maps/api.ts#L7-L19
[config-files]: https://github.com/cosmiconfig/cosmiconfig#usage-for-end-users
[diffs]: https://github.com/ricewind012/web-app-class-maps/tree/master/packages/web-app-class-maps/cdp/db
[template]: https://github.com/ricewind012/more-advanced-theme-template
