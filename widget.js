/*global WAF, $, L */

'use strict';

WAF.define('Leaflet', ['waf-core/widget'], function (widget) {

    var Leaflet = widget.create('Leaflet', {
        
        zoom: widget.property({
            type: 'number',
            defaultValue: 9
        }),

        items: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'lat'
            }, {
                name: 'lan'
            },{
                name: 'popups'
            }]
        }),

        init: function () {
            var self = this,
                marker,
                map = L.map(this.node),
                osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                osmAttrib = 'Map data &copy; OpenStreetMap contributors',
                osm = new L.TileLayer(osmUrl, {
                    attribution: osmAttrib
                });

                var lan, lat,popups;

            map.addLayer(osm);


            if (this.items()) {
                this.items().addListener('currentElementChange', function (elements) {
                    var items = self.items();
                    
                    popups = self.items.attributeFor('popups');
                    lan = self.items.attributeFor('lan');
                    lat = self.items.attributeFor('lat');

                    if (marker) {
                        map.removeLayer(marker);
                    }

                    if (items[lat]) {
                        marker = L.marker([items[lan], items[lat]]).addTo(map);
                        marker.bindPopup(items[popups]);
                        map.setView(new L.LatLng(items[lan], items[lat]), self.zoom());
                    }
                });
            }
        }
    });

    return Leaflet;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */