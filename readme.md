iShareGIS Drilldown Plugin
==========================

The Drilldown plugin for iShareGIS allows the administrator to configure a predetermined set of layers that will be queried for info once the user has drawn a feature on the map. The original use case was for planning admin users who regularly need to perform searches for a given location against various planning constraint layers.

Installation
------------

The plugin requires [iShareGIS](http://astuntechnology.com/ishare/modules/ishare-gis/) v5.0 or above.

* Download the plugin files by clicking the "ZIP" button on the [project page](https://github.com/AstunTechnology/iShareGIS-Drilldown)
* Open the zip file and copy the entire iShareGIS-Drilldown-master folder into your plugins folder (Astun\iShareGIS\5.0\WebApps\Web\plugins\) and rename it to Drilldown
* Open Drilldown\Drilldown.js in a text editor and add an entry for each Profile you would like the Drilldown plugin to be enabled for the includes the name of the Profile (MapSource in Studio) and the layers that should be queried when the tool is used. See the configuration notes in the file for more details
* To enable the plugin edit iShareGIS.xml and add a line for the Drilldown plugin like so: <Plugin>Drilldown</Plugin>
* That’s it. You might need to clear the browser cache for the Drilldown button to appear

Support
-------

You can get support via the [Astun Technology Help Desk](http://support.astuntechnology.com/).

Thanks
------

Thanks to James Rutter at [Surrey Heath Borough Council](http://www.surreyheath.gov.uk/) for coming up with the idea and funding the origial development.

