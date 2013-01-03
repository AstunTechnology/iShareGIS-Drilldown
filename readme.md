iShareGIS Drilldown Plugin
==========================

The Drilldown plugin for iShareGIS allows the administrator to configure a predetermined set of layers that will be queried for info once the user has drawn a feature on the map. The original use case was for planning admin users who regularly need to perform searches for a given location against various planning constraint layers.

Installation
------------

The plugin requires [iShareGIS](http://astuntechnology.com/ishare/modules/ishare-gis/) v5.0 or above.

* Copy the entire Drilldown folder into your plugins folder (Astun\iShareGIS\5.0\WebApps\Web\plugins\);
* Open Drilldown\Drilldown.js in a text editor and add an entry for each Profile you would like the Drilldown plugin to be enabled for the includes the name of the Profile (MapSource in Studio) and the layers that should be queried when the tool is used.
* To enable the plugin edit iShareGIS.xml and add a line for the Drilldown plugin: <Plugin>Drilldown</Plugin>
* That’s it. You might need to clear the browser cache for the Drilldown button to appear

Support
-------

You can get support via the [Astun Technology Help Desk](http://support.astuntechnology.com/)

