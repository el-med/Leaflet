/*global WAF, $, L */

'use strict';

WAF.define('Leaflet', ['waf-core/widget'], function (widget) {

    var Leaflet = widget.create('Leaflet', {

        items: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'lat'
            }, {
                name: 'lan'
            }]
        }),

        init: function () {
            var self = this,
                map = L.map(this.node),
                osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                osmAttrib = 'Map data &copy; OpenStreetMap contributors',
                osm = new L.TileLayer(osmUrl, {
                    attribution: osmAttrib
                });

            map.addLayer(osm);


            if (this.items()) {
                this.items().addListener('currentElementChange', function () {
                    var marker,
                        items = self.items();

                    if (items.lat) {
                        marker = L.marker([items.lan, items.lat]).addTo(map);
                        marker.bindPopup('a marker for ' + items.name.toUpperCase());
                        map.setView(new L.LatLng(items.lan, items.lat), 9);
                    }
                });
            }
        }
    });

    return Leaflet;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */